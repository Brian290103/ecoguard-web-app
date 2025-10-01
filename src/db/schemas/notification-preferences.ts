import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth";

export const notificationPreferences = pgTable("notification_preferences", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .unique() // Each user should have only one preferences row
    .references(() => user.id, { onDelete: "cascade" }),
  enablePush: boolean("enable_push").default(true).notNull(),
  enableEmail: boolean("enable_email").default(true).notNull(),
  enableSms: boolean("enable_sms").default(true).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const insertNotificationPreferencesSchema = createInsertSchema(
  notificationPreferences,
);
export const selectNotificationPreferencesSchema = createSelectSchema(
  notificationPreferences,
);
