import {
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";
import { user } from "./auth"; // Assuming user schema is in auth.ts
import { organization } from "./organization"; // Import organization schema

export const reportPriorityEnum = pgEnum("report_priority", [
  "high",
  "medium",
  "low",
]);
export const reportStatusEnum = pgEnum("report_status", [
  "submitted",
  "acknowledged",
  "inprogress",
  "escalated",
  "claimed",
  "resolved",
]);

export const report = pgTable("report", {
  id: uuid("id").primaryKey().defaultRandom(),
  reportNumber: text("report_number").unique().notNull(), // Automatically incrementing unique report number
  title: text("title").notNull(),
  submittedByUserId: text("submitted_by_user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  location: jsonb("location").notNull().$type<{ lat: number; long: number }>(), // GeoJSON type can be stored as JSONB, with lat and long attributes
  categories: jsonb("categories").notNull().$type<string[]>(), // Array of strings for categories, stored in lowercase
  description: text("description").notNull(),
  priority: reportPriorityEnum("priority").notNull(),
  status: reportStatusEnum("status").default("submitted"),
  imageUrls: jsonb("image_urls").$type<string[]>(), // Separate array for image URLs
  videoUrls: jsonb("video_urls").$type<string[]>(), // Separate array for video URLs
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const insertReportSchema = createInsertSchema(report, {
  reportNumber: z
    .string()
    .regex(/^RP_\d+\d{3}$/, "Invalid report number format"), // Matches timestamp + 3 random digits
  location: z.object({
    lat: z.number(),
    long: z.number(),
  }),
  categories: z.array(z.string()),
  imageUrls: z.array(z.string()).optional(),
  videoUrls: z.array(z.string()).optional(),
});

export const selectReportSchema = createSelectSchema(report, {
  location: z.object({
    lat: z.number(),
    long: z.number(),
  }),
  categories: z.array(z.string()),
  imageUrls: z.array(z.string()).optional(),
  videoUrls: z.array(z.string()).optional(),
});
