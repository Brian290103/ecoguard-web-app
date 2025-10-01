import { relations } from "drizzle-orm";
import {
  pgEnum,
  pgTable,
  primaryKey,
  text,
  timestamp,
  uuid,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { user } from "./auth";

export const community = pgTable("community", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  streamChannelId: text("stream_channel_id").unique(),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const communityUserRoleEnum = pgEnum("community_user_role", [
  "admin",
  "member",
]);

export const communityUser = pgTable(
  "community_user",
  {
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    communityId: uuid("community_id")
      .notNull()
      .references(() => community.id, { onDelete: "cascade" }),
    role: communityUserRoleEnum("role").default("member").notNull(),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
  },
  (table) => ({
    pk: primaryKey({ columns: [table.userId, table.communityId] }),
  }),
);

export const communityRelations = relations(community, ({ many }) => ({
  communityUsers: many(communityUser),
}));

export const communityUserRelations = relations(communityUser, ({ one }) => ({
  community: one(community, {
    fields: [communityUser.communityId],
    references: [community.id],
  }),
  user: one(user, {
    fields: [communityUser.userId],
    references: [user.id],
  }),
}));

export const insertCommunitySchema = createInsertSchema(community);
export const selectCommunitySchema = createSelectSchema(community);

export const insertCommunityUserSchema = createInsertSchema(communityUser);
export const selectCommunityUserSchema = createSelectSchema(communityUser);
