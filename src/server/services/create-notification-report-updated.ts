"use server";

import { eq } from "drizzle-orm";
import type { z } from "zod";
import { db } from "@/db/drizzle";
import { user } from "@/db/schemas/auth";
import {
  type insertNotificationSchema,
  notification,
} from "@/db/schemas/notification";
import {
  sendEmailNotification,
  sendPushNotification,
  sendSmsNotification,
} from "@/utils/notification";
import { getNotificationPreferences } from "./notification-preferences";
import { getSubscriptionsByUserId } from "./one-signal-subscriptions";

type CreateNotificationInput = z.infer<typeof insertNotificationSchema>;

export async function createNotificationReportUpdated(
  input: CreateNotificationInput,
) {
  // Save to DB
  const newNotification = await db
    .insert(notification)
    .values(input)
    .returning();

  const userToNotifyResult = await db
    .select({
      email: user.email,
      phoneNumber: user.phoneNumber,
      id: user.id,
    })
    .from(user)
    .where(eq(user.id, input.userId));

  if (userToNotifyResult.length === 0) {
    console.error("User to notify not found for id:", input.userId);
    return newNotification[0];
  }
  const userToNotify = userToNotifyResult[0];

  const pref = await getNotificationPreferences(input.userId);

  // Handle email notifications
  if (pref.enableEmail && userToNotify.email) {
    await sendEmailNotification({
      to: userToNotify.email,
      subject: input.title,
      text: input.message,
    });
  }

  // Handle push notifications
  if (pref.enablePush) {
    const playerIds = await getSubscriptionsByUserId(userToNotify.id);
    await sendPushNotification({
      playerIds: playerIds.map((p) => p.playerId),
      title: input.title,
      message: input.message,
    });
  }

  // Handle SMS notifications
  if (userToNotify.phoneNumber && pref.enableSms) {
    await sendSmsNotification({
      mobile: userToNotify.phoneNumber,
      message: input.message,
    });
  }

  return newNotification[0];
}
