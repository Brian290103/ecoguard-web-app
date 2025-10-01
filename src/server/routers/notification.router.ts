import { eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db/drizzle";
import {
  insertNotificationSchema,
  notification,
} from "@/db/schemas/notification";
import { publicProcedure, router } from "../trpc";

const updateNotificationInput = insertNotificationSchema.partial().extend({
  id: z.string().uuid(),
});

export const notificationRouter = router({
  createNotification: publicProcedure
    .input(insertNotificationSchema)
    .mutation(async ({ input }) => {
      const newNotification = await db
        .insert(notification)
        .values(input)
        .returning();
      return newNotification[0];
    }),

  getNotificationById: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .query(async ({ input }) => {
      const foundNotification = await db
        .select()
        .from(notification)
        .where(eq(notification.id, input.id));
      return foundNotification[0];
    }),

  getNotificationsByUserId: publicProcedure
    .input(z.object({ userId: z.string() }))
    .query(async ({ input }) => {
      const userNotifications = await db
        .select()
        .from(notification)
        .where(eq(notification.userId, input.userId));
      return userNotifications;
    }),

  getAllNotifications: publicProcedure.query(async () => {
    const allNotifications = await db.select().from(notification);
    return allNotifications;
  }),

  updateNotification: publicProcedure
    .input(updateNotificationInput)
    .mutation(async ({ input }) => {
      const { id, ...fields } = input;
      const updatedNotification = await db
        .update(notification)
        .set(fields)
        .where(eq(notification.id, id))
        .returning();
      return updatedNotification[0];
    }),

  markAsRead: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const updatedNotification = await db
        .update(notification)
        .set({ isRead: true })
        .where(eq(notification.id, input.id))
        .returning();
      return updatedNotification[0];
    }),

  deleteNotification: publicProcedure
    .input(z.object({ id: z.string().uuid() }))
    .mutation(async ({ input }) => {
      const deletedNotification = await db
        .delete(notification)
        .where(eq(notification.id, input.id))
        .returning();
      return deletedNotification[0];
    }),
});
