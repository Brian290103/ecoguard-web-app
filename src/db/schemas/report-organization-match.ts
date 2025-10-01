import { pgTable, real, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth";
import { report } from "./report";

export const reportOrganizationMatch = pgTable("report_organization_match", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportId: uuid("report_id")
    .notNull()
    .references(() => report.id, { onDelete: "cascade" }),
  organizationId: text("organization_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  similarityScore: real("similarity_score").notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const insertReportOrganizationMatchSchema = createInsertSchema(
  reportOrganizationMatch,
);
export const selectReportOrganizationMatchSchema = createSelectSchema(
  reportOrganizationMatch,
);
