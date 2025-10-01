import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "@/db/drizzle";
import {
  type insertNotificationPreferencesSchema,
  notificationPreferences,
} from "@/db/schemas/notification-preferences";

type CreatePreferencesInput = z.infer<
  typeof insertNotificationPreferencesSchema
>;
type UpdatePreferencesInput = Partial<CreatePreferencesInput>;

export async function getNotificationPreferences(userId: string) {
  const preferences = await db
    .select()
    .from(notificationPreferences)
    .where(eq(notificationPreferences.userId, userId));
  return preferences[0];
}

export async function createNotificationPreferences(
  input: CreatePreferencesInput,
) {
  const newPreferences = await db
    .insert(notificationPreferences)
    .values(input)
    .returning();
  return newPreferences[0];
}

export async function updateNotificationPreferences(
  userId: string,
  input: UpdatePreferencesInput,
) {
  const updatedPreferences = await db
    .update(notificationPreferences)
    .set(input)
    .where(eq(notificationPreferences.userId, userId))
    .returning();
  return updatedPreferences[0];
}
