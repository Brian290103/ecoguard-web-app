"use server";

import { and, eq, ne } from "drizzle-orm";
import { headers } from "next/headers";
import type { z } from "zod";
import { db } from "@/db/drizzle";
import { user } from "@/db/schemas/auth";
import { NOTIFICATION_TYPES, notification } from "@/db/schemas/notification";
import type { selectReportSchema } from "@/db/schemas/report";
import { reportOrganizationMatch } from "@/db/schemas/report-organization-match";
import { auth } from "@/lib/auth";
import { getDistanceInKm } from "@/utils/distance-difference";
import {
  sendEmailNotification,
  sendPushNotification,
  sendSmsNotification,
} from "@/utils/notification";
import { findRelevantOrganizations } from "./embeddings";
import { getNotificationPreferences } from "./notification-preferences";
import { getSubscriptionsByUserId } from "./one-signal-subscriptions";

type Report = z.infer<typeof selectReportSchema>;

export async function createNotificationReportSubmitted(report: Report) {
  // 1. Notify the user who submitted the report
  const submitterUserId = report.submittedByUserId;
  const submitterPref = await getNotificationPreferences(submitterUserId);
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // Create DB notification for the submitter
  await db.insert(notification).values({
    userId: submitterUserId,
    title: "New Report Submitted",
    message: `Report #${report.reportNumber} has been successfully submitted.`,
    type: NOTIFICATION_TYPES.NEW_REPORT,
    referenceId: report.id,
  });

  // Send notifications to the submitter
  if (session && session.user.id === submitterUserId) {
    // if (submitterPref.enableEmail && session.user.email) {
    await sendEmailNotification({
      to: session.user.email,
      subject: "New Report Submitted",
      text: `Report #${report.reportNumber} has been successfully submitted.`,
    });
    // }
    // if (submitterPref.enablePush) {
    const playerIds = await getSubscriptionsByUserId(submitterUserId);
    await sendPushNotification({
      playerIds: playerIds.map((p) => p.playerId),
      title: "New Report Submitted",
      message: `Report #${report.reportNumber} has been successfully submitted.`,
    });
    // }
    // if (submitterPref.enableSms && session.user.phoneNumber) {
    await sendSmsNotification({
      mobile: session.user.phoneNumber || "254720294974",
      message: `Report #${report.reportNumber} has been successfully submitted.`,
    });
    // }
  }

  // 2. Notify nearby authorities
  const authorities = await db
    .select()
    .from(user)
    .where(and(eq(user.role, "authority"), ne(user.id, submitterUserId)));

  const nearbyAuthorities = authorities.filter((authority) => {
    if (!authority.location || !report.location) return false;
    // @ts-expect-error
    const distance = getDistanceInKm(report.location, authority.location);
    return distance < 1;
  });

  for (const authority of nearbyAuthorities) {
    // Create DB notification for the authority
    await db.insert(notification).values({
      userId: authority.id,
      title: "New Report in Your Area",
      message: `A new report #${report.reportNumber} has been submitted in your area of operation.`,
      type: NOTIFICATION_TYPES.NEW_REPORT, // Or a new type like NEW_REPORT_IN_AREA
      referenceId: report.id,
    });

    const authorityPref = await getNotificationPreferences(authority.id);

    // if (authorityPref.enableEmail && authority.email) {
    await sendEmailNotification({
      to: authority.email,
      subject: "New Report in Your Area",
      text: `A new report #${report.reportNumber} has been submitted in your area of operation.`,
    });
    // }
    // if (authorityPref.enablePush) {
    const playerIds = await getSubscriptionsByUserId(authority.id);
    await sendPushNotification({
      playerIds: playerIds.map((p) => p.playerId),
      title: "New Report in Your Area",
      message: `A new report #${report.reportNumber} has been submitted in your area of operation.`,
    });
    // }
    // if (authorityPref.enableSms && authority.phoneNumber) {
    await sendSmsNotification({
      mobile: authority.phoneNumber || "254720294974",
      message: `A new report #${report.reportNumber} has been submitted in your area of operation.`,
    });
    // }
  }

  // 3. Notify relevant organizations
  if (report.description) {
    const relevantOrgs = await findRelevantOrganizations(report.description);

    console.log("relevantOrgs", relevantOrgs);

    for (const org of relevantOrgs) {
      // Save the match
      await db.insert(reportOrganizationMatch).values({
        reportId: report.id,
        organizationId: org.organizationId,
        similarityScore: org.similarity,
      });

      // Notify the organization manager
      const orgUser = await db
        .select()
        .from(user)
        .where(eq(user.id, org.organizationId));
      if (!orgUser[0]) continue;

      await db.insert(notification).values({
        userId: org.organizationId,
        title: "New Relevant Report Submitted",
        message: `A new report, #${report.reportNumber}, that matches your organization's focus has been submitted.`,
        type: NOTIFICATION_TYPES.NEW_REPORT,
        referenceId: report.id,
      });

      const orgPref = await getNotificationPreferences(org.organizationId);

      // if (orgPref.enableEmail && orgUser[0].email) {
      await sendEmailNotification({
        to: orgUser[0].email,
        subject: "New Relevant Report Submitted",
        text: `A new report, #${report.reportNumber}, that matches your organization's focus has been submitted.`,
      });
      // }

      // if (orgPref.enablePush) {
      const playerIds = await getSubscriptionsByUserId(org.organizationId);
      await sendPushNotification({
        playerIds: playerIds.map((p) => p.playerId),
        title: "New Relevant Report Submitted",
        message: `A new report, #${report.reportNumber}, that matches your organization's focus has been submitted.`,
      });
      // }

      // if (orgPref.enableSms && orgUser[0].phoneNumber) {
      await sendSmsNotification({
        mobile: orgUser[0].phoneNumber || "254720294974",
        message: `A new report, #${report.reportNumber}, that matches your organization's focus has been submitted.`,
      });
      // }
    }
  }
}
