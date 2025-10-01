import { desc, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { reportHistory } from "@/db/schemas/report-history";
import { publicProcedure, router } from "../trpc";

export const reportHistoryRouter = router({
  getReportHistory: publicProcedure
    .input(z.object({ reportId: z.string().uuid() }))
    .query(async ({ input }) => {
      const histories = await db
        .select()
        .from(reportHistory)
        .where(eq(reportHistory.reportId, input.reportId))
        .orderBy(desc(reportHistory.createdAt));
      return histories;
    }),
});

export type ReportHistoryRouter = typeof reportHistoryRouter;
