import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod";

export const events = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  description: text("description"),
  posterUrl: text("poster_url"),
  startDateTime: timestamp("start_date_time", { withTimezone: true }).notNull(),
  endDateTime: timestamp("end_date_time", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const insertEventsSchema = createInsertSchema(events, {
  startDateTime: z.coerce.date(),
  endDateTime: z.coerce.date(),
});
export const selectEventsSchema = createSelectSchema(events);

// types
export type Event = typeof events.$inferSelect;
export type EventInsert = typeof events.$inferInsert;
