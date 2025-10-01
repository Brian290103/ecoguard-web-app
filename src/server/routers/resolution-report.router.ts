import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/drizzle";
import {
  insertResolutionReportSchema,
  resolutionReport,
} from "@/db/schemas/resolution-report";
import { publicProcedure, router } from "../trpc";

const updateResolutionReportInput = insertResolutionReportSchema
  .partial()
  .extend({
    id: z.string().uuid(),
  });

export const resolutionReportRouter = router({
  createResolutionReport: publicProcedure
    .input(insertResolutionReportSchema)
    .mutation(async ({ input }) => {
      const newResolutionReport = await db
        .insert(resolutionReport)
        .values(input)
        .returning();
      return newResolutionReport[0];
    }),

  getResolutionReportById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const foundResolutionReport = await db
        .select()
        .from(resolutionReport)
        .where(eq(resolutionReport.id, input.id));
      return foundResolutionReport[0];
    }),

  getResolutionReportsByReportId: publicProcedure
    .input(z.object({ reportId: z.string().uuid() }))
    .query(async ({ input }) => {
      const userResolutionReports = await db
        .select()
        .from(resolutionReport)
        .where(eq(resolutionReport.reportId, input.reportId));
      return userResolutionReports;
    }),

  updateResolutionReport: publicProcedure
    .input(updateResolutionReportInput)
    .mutation(async ({ input }) => {
      const { id, ...fields } = input;
      const updatedResolutionReport = await db
        .update(resolutionReport)
        .set(fields)
        .where(eq(resolutionReport.id, id))
        .returning();
      return updatedResolutionReport[0];
    }),

  deleteResolutionReport: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const deletedResolutionReport = await db
        .delete(resolutionReport)
        .where(eq(resolutionReport.id, input.id))
        .returning();
      return deletedResolutionReport[0];
    }),
});
