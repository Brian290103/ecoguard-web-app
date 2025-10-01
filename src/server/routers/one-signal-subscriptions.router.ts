import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/drizzle";
import { oneSignalSubscriptions } from "@/db/schemas/one-signal-subscriptions";
import { publicProcedure, router } from "../trpc";

export const oneSignalSubscriptionsRouter = router({
  createOrUpdateSubscription: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        playerId: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const { userId, playerId } = input;

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
    }),

  getSubscriptionsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const subscriptions = await db
        .select()
        .from(oneSignalSubscriptions)
        .where(eq(oneSignalSubscriptions.userId, input.userId));
      return subscriptions;
    }),

  deleteSubscription: publicProcedure
    .input(z.object({ playerId: z.string() }))
    .mutation(async ({ input }) => {
      const deletedSubscription = await db
        .delete(oneSignalSubscriptions)
        .where(eq(oneSignalSubscriptions.playerId, input.playerId))
        .returning();
      return deletedSubscription[0];
    }),
});
