"use client";

import { useEffect } from "react";
import OneSignal from "react-onesignal";
import { trpc } from "@/app/_trpc/client";

export function OneSignalWrapper({
  children,
  userId,
}: {
  children: React.ReactNode;
  userId: string;
}) {
  const { mutate: createOrUpdateSubscription } =
    trpc.oneSignalSubscriptions.createOrUpdateSubscription.useMutation();

  useEffect(() => {
    async function initOneSignal() {
      try {
        await OneSignal.init({
          appId: `${process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID!}`,
          allowLocalhostAsSecureOrigin: true,
          notifyWhenAppInFocus: true,
          notifyButton: {
            enable: true,
          },
        });

        // Send playerId when available
        const sendPlayerId = () => {
          const playerId = OneSignal.User?.PushSubscription?.id;
          if (playerId) {
            createOrUpdateSubscription({ userId, playerId });
            console.log("OneSignalLog Sent", playerId);
          }
        };

        // Initial send
        sendPlayerId();

        // Listen to subscription changes
        OneSignal.User.PushSubscription.addEventListener(
          "change",
          sendPlayerId,
        );
      } catch (err) {
        console.error("OneSignal init failed:", err);
      }
    }

    initOneSignal();
  }, [userId, createOrUpdateSubscription]);

  return <>{children}</>;
}
