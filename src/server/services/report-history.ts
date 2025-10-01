"use server";

import type { z } from "zod";
import { db } from "@/db/drizzle";
import {
  type insertReportHistorySchema,
  reportHistory,
} from "@/db/schemas/report-history";

type CreateReportHistoryInput = z.infer<typeof insertReportHistorySchema>;

export async function createReportHistory(input: CreateReportHistoryInput) {
  const newHistoryEntry = await db
    .insert(reportHistory)
    .values(input)
    .returning();

  return newHistoryEntry[0];
}
