export async function sendEmailNotification({
  to,
  subject,
  text,
}: {
  to: string;
  subject: string;
  text: string;
}) {
  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "ecoguard-notifications@uisen-global.com",
        to,
        subject,
        text,
      }),
    });
    console.log("Email notification sent:", {
      subject,
      text,
      email: to,
    });
  } catch (error) {
    console.error(
      "Failed to send email notification via Resend REST API:",
      error,
    );
  }
}

export async function sendPushNotification({
  playerIds,
  title,
  message,
}: {
  playerIds: string[];
  title: string;
  message: string;
}) {
  if (playerIds.length === 0) return;
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.ONE_SIGNAL_API_KEY}`,
      },
      body: JSON.stringify({
        app_id: process.env.NEXT_PUBLIC_ONE_SIGNAL_APP_ID,
        include_player_ids: playerIds,
        headings: {
          en: title,
        },
        contents: {
          en: message,
        },
        url: process.env.NEXT_PUBLIC_URL,
      }),
    };

    await fetch("https://onesignal.com/api/v1/notifications", options);
    console.log("Push notification sent via OneSignal:", {
      title,
      message,
      playerIds,
    });
  } catch (error) {
    console.error("Failed to send push notification via OneSignal:", error);
  }
}

export async function sendSmsNotification({
  mobile,
  message,
}: {
  mobile: string;
  message: string;
}) {
  // Skip actual SMS sending in test mode
  console.log("SMS notification would have been sent:", {
    message,
    mobile,
    status: "success (test mode)",
  });
  // return;

  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        apikey: process.env.TEXT_SMS_API_KEY,
        partnerID: process.env.TEXT_SMS_PARTNER_ID,
        message,
        shortcode: process.env.TEXT_SMS_SHORT_CODE,
        mobile,
      }),
    };

    const response = await fetch(
      "https://sms.textsms.co.ke/api/services/sendsms/",
      options,
    );
    const result = await response.json();

    console.log("SMS notification sent:", {
      message,
      mobile,
      result,
    });
  } catch (error) {
    console.error("Failed to send SMS notification:", error);
  }
}
