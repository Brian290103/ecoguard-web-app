import { notificationPreferences, oneSignalSubscriptions } from "@/db/schema";
import { embeddingsRouter } from "./routers/embeddings.router";
import { notificationRouter } from "./routers/notification.router";
import { notificationPreferencesRouter } from "./routers/notification-preferences.router";
import { oneSignalSubscriptionsRouter } from "./routers/one-signal-subscriptions.router";
import { reportRouter } from "./routers/report.router";
import { reportHistoryRouter } from "./routers/report-history.router";
import { resolutionReportRouter } from "./routers/resolution-report.router";
import { router } from "./trpc";

export const appRouter = router({
  report: reportRouter,
  notification: notificationRouter,
  notificationPreferences: notificationPreferencesRouter,
  oneSignalSubscriptions: oneSignalSubscriptionsRouter,
  embeddings: embeddingsRouter,
  resolutionReport: resolutionReportRouter,
  reportHistory: reportHistoryRouter,
});

// Export type router type signature,
// NOT the router itself.
export type AppRouter = typeof appRouter;
