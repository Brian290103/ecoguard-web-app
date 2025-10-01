import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth";

export const oneSignalSubscriptions = pgTable("one_signal_subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  playerId: text("player_id").notNull().unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const insertOneSignalSubscriptionSchema = createInsertSchema(
  oneSignalSubscriptions,
);
export const selectOneSignalSubscriptionSchema = createSelectSchema(
  oneSignalSubscriptions,
);
