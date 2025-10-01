import { eq } from "drizzle-orm";
import { db } from "@/db/drizzle";
import { oneSignalSubscriptions } from "@/db/schemas/one-signal-subscriptions";

export async function createOrUpdateSubscription(
  userId: string,
  playerId: string,
) {
  const existingSubscription = await db
    .select()
    .from(oneSignalSubscriptions)
    .where(eq(oneSignalSubscriptions.playerId, playerId))
    .limit(1);

  if (existingSubscription[0]) {
    const updatedSubscription = await db
      .update(oneSignalSubscriptions)
      .set({ userId })
      .where(eq(oneSignalSubscriptions.playerId, playerId))
      .returning();
    return updatedSubscription[0];
  } else {
    const newSubscription = await db
      .insert(oneSignalSubscriptions)
      .values({ userId, playerId })
      .returning();
    return newSubscription[0];
  }
}

export async function getSubscriptionsByUserId(userId: string) {
  const subscriptions = await db
    .select()
    .from(oneSignalSubscriptions)
    .where(eq(oneSignalSubscriptions.userId, userId));
  return subscriptions;
}

export async function deleteSubscription(playerId: string) {
  const deletedSubscription = await db
    .delete(oneSignalSubscriptions)
    .where(eq(oneSignalSubscriptions.playerId, playerId))
    .returning();
  return deletedSubscription[0];
}
