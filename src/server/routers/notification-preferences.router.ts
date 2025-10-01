import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/drizzle";
import {
  insertNotificationPreferencesSchema,
  notificationPreferences,
} from "@/db/schemas/notification-preferences";
import { publicProcedure, router } from "../trpc";

const updatePreferencesInput = insertNotificationPreferencesSchema
  .partial()
  .extend({
    userId: z.string(),
  });

export const notificationPreferencesRouter = router({
  createPreferences: publicProcedure
    .input(insertNotificationPreferencesSchema)
    .mutation(async ({ input }) => {
      const newPreferences = await db
        .insert(notificationPreferences)
        .values(input)
        .returning();
      return newPreferences[0];
    }),

  getPreferencesByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const preferences = await db
        .select()
        .from(notificationPreferences)
        .where(eq(notificationPreferences.userId, input.userId));
      return preferences[0];
    }),

  getAllPreferences: publicProcedure.query(async () => {
    const allPreferences = await db.select().from(notificationPreferences);
    return allPreferences;
  }),

  updatePreferences: publicProcedure
    .input(updatePreferencesInput)
    .mutation(async ({ input }) => {
      const { userId, ...fields } = input;
      const updatedPreferences = await db
        .update(notificationPreferences)
        .set(fields)
        .where(eq(notificationPreferences.userId, userId))
        .returning();
      return updatedPreferences[0];
    }),

  deletePreferences: publicProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      const deletedPreferences = await db
        .delete(notificationPreferences)
        .where(eq(notificationPreferences.userId, input.userId))
        .returning();
      return deletedPreferences[0];
    }),
});
