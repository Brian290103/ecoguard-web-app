import { desc, eq, inArray } from "drizzle-orm";
import { headers } from "next/headers";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { NOTIFICATION_TYPES } from "@/db/schemas/notification";
import { insertReportSchema, report } from "@/db/schemas/report";
import { reportHistory } from "@/db/schemas/report-history";
import { reportOrganizationMatch } from "@/db/schemas/report-organization-match";
import { resolutionReport } from "@/db/schemas/resolution-report";
import { auth } from "@/lib/auth";
import { getDistanceInKm } from "@/utils/distance-difference";
import { createNotificationReportSubmitted } from "../services/create-notification-report-submitted";
import { createNotificationReportUpdated } from "../services/create-notification-report-updated";
import { generateEmbeddings } from "../services/embeddings";
import { createReportHistory } from "../services/report-history";
import { publicProcedure, router } from "../trpc";

// Input schema for updating a report (derived from insert schema)
const updateReportInput = insertReportSchema.partial().extend({
  id: z.string().uuid(),
});

export const reportRouter = router({
  createReport: publicProcedure
    .input(insertReportSchema) // Input validation temporarily disabled for testing
    .mutation(async ({ input }) => {
      // Log the received input values instead of pushing to DB
      console.log("Received report values:", input);

      const newReport = await db.insert(report).values(input).returning();

      if (newReport[0]) {
        await createReportHistory({
          reportId: newReport[0].id,
          userId: newReport[0].submittedByUserId,
          status: "submitted",
          notes: "Report created.",
        });

        if (newReport[0].description) {
          await generateEmbeddings(newReport[0].description, newReport[0].id);
        }

        await createNotificationReportSubmitted(newReport[0]);
      }

      return newReport[0];
    }),
  getReportById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const foundReport = await db
        .select({
          report: report,
          resolutionReport: resolutionReport,
        })
        .from(report)
        .leftJoin(resolutionReport, eq(report.id, resolutionReport.reportId))
        .where(eq(report.id, input.id));

      if (!foundReport[0]) {
        return undefined;
      }

      const history = await db
        .select()
        .from(reportHistory)
        .where(eq(reportHistory.reportId, input.id))
        .orderBy(desc(reportHistory.createdAt));

      return {
        ...foundReport[0].report,
        history,
        resolutionReport: foundReport[0].resolutionReport,
      };
    }),

  getAllReports: publicProcedure.query(async () => {
    const session = await auth.api.getSession({
      headers: await headers(), // you need to pass the headers object.
    });

    if (!session?.user) {
      return [];
    }

    const addHistoryAndResolutionToReports = async (
      reportsWithResolution: (typeof report.$inferSelect & {
        resolutionReport: typeof resolutionReport.$inferSelect | null;
      })[],
    ) => {
      if (reportsWithResolution.length === 0) {
        return [];
      }
      const reportIds = reportsWithResolution.map((r) => r.id);
      const histories = await db
        .select()
        .from(reportHistory)
        .where(inArray(reportHistory.reportId, reportIds))
        .orderBy(desc(reportHistory.createdAt));

      return reportsWithResolution.map((r) => ({
        ...r,
        history: histories.filter((h) => h.reportId === r.id),
      }));
    };

    // if user is authority, filter reports by distance < 1km
    if (session.user.role === "authority" && session.user.location) {
      const allReports = await db
        .select({
          report: report,
          resolutionReport: resolutionReport,
        })
        .from(report)
        .leftJoin(resolutionReport, eq(report.id, resolutionReport.reportId));
      const filteredReports = allReports
        .filter((r) => {
          if (!r.report.location) return false;

          return session.user.location && r.report.location
            ? getDistanceInKm(session.user.location, r.report.location) < 1
            : false; // only keep if < 1km
        })
        .map((r) => ({ ...r.report, resolutionReport: r.resolutionReport })) // Flatten the object
        .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime()) // Sort by newest first
        .slice(0, 5);

      console.log(filteredReports.length);
      return addHistoryAndResolutionToReports(filteredReports);
    }

    if (session.user.role === "org") {
      const orgReportMatches = await db
        .select()
        .from(reportOrganizationMatch)
        .where(eq(reportOrganizationMatch.organizationId, session.user.id));

      const reportIds = orgReportMatches.map((match) => match.reportId);

      if (reportIds.length === 0) {
        return [];
      }

      const orgReports = await db
        .select({
          report: report,
          resolutionReport: resolutionReport,
        })
        .from(report)
        .leftJoin(resolutionReport, eq(report.id, resolutionReport.reportId))
        .where(inArray(report.id, reportIds));

      return addHistoryAndResolutionToReports(
        orgReports.map((r) => ({
          ...r.report,
          resolutionReport: r.resolutionReport,
        })),
      );
    }

    const allReports = await db
      .select({
        report: report,
        resolutionReport: resolutionReport,
      })
      .from(report)
      .leftJoin(resolutionReport, eq(report.id, resolutionReport.reportId));
    return addHistoryAndResolutionToReports(
      allReports.map((r) => ({
        ...r.report,
        resolutionReport: r.resolutionReport,
      })),
    );
  }),
  updateReport: publicProcedure
    .input(updateReportInput)
    .mutation(async ({ input }) => {
      const { id, ...fields } = input;
      const updatedReport = await db
        .update(report)
        .set(fields)
        .where(eq(report.id, id))
        .returning();

      if (updatedReport[0] && fields.status) {
        const session = await auth.api.getSession({
          headers: await headers(),
        });

        if (session?.user) {
          await createReportHistory({
            reportId: updatedReport[0].id,
            userId: session.user.id,
            status: fields.status,
            notes: `Status updated to ${fields.status}`,
          });

          if (fields.status) {
            await createNotificationReportUpdated({
              userId: updatedReport[0].submittedByUserId,
              title: "Report Status Updated",
              message: `The status of report #${updatedReport[0].reportNumber} has been updated to ${fields.status}.`,
              type: NOTIFICATION_TYPES.REPORT_UPDATE,
              referenceId: updatedReport[0].id,
            });
          }
        }
      }

      return updatedReport[0];
    }),

  deleteReport: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const deletedReport = await db
        .delete(report)
        .where(eq(report.id, input.id))
        .returning();
      return deletedReport[0];
    }),
});
