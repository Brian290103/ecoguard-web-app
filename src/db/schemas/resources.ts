import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const resources = pgTable("resources", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  posterUrl: text("poster_url"),
  websiteUrl: text("website_url"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const insertResourcesSchema = createInsertSchema(resources);
export const selectResourcesSchema = createSelectSchema(resources);

// types
export type Resource = typeof resources.$inferSelect;

// types/
export type ResourceInsert = typeof resources.$inferInsert;
