import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth";

export const NOTIFICATION_TYPES = {
  NEW_REPORT: "new_report",
  REPORT_UPDATE: "report_update",
  EVENT_REMINDER: "event_reminder",
  COMMUNITY_INVITE: "community_invite",
  BADGE_UNLOCKED: "badge_unlocked",
} as const;

export const notification = pgTable("notification", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  title: text("title").notNull(),
  type: text("type").notNull(),
  message: text("message").notNull(),
  isRead: boolean("is_read").default(false).notNull(),
  referenceId: uuid("reference_id"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
});

export const insertNotificationSchema = createInsertSchema(notification);

export const selectNotificationSchema = createSelectSchema(notification);
