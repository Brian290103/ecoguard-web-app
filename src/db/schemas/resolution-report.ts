import { jsonb, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./auth";
import { report } from "./report";

export const resolutionReport = pgTable("resolution_report", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportId: uuid("report_id")
    .notNull()
    .references(() => report.id, { onDelete: "cascade" }),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  imageUrls: jsonb("image_urls").$type<string[]>(),
  videoUrls: jsonb("video_urls").$type<string[]>(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const insertResolutionReportSchema = createInsertSchema(
  resolutionReport,
  {
    imageUrls: z.array(z.string()).optional(),
    videoUrls: z.array(z.string()).optional(),
  },
);
export const selectResolutionReportSchema = createSelectSchema(
  resolutionReport,
  {
    imageUrls: z.array(z.string()).optional(),
    videoUrls: z.array(z.string()).optional(),
  },
);
