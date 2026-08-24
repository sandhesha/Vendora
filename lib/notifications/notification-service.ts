export type NotificationChannel =
  | "email"
  | "sms"
  | "whatsapp";

export type NotificationEvent =
  | "order_confirmed"
  | "payment_success"
  | "order_shipped"
  | "out_for_delivery"
  | "order_delivered"
  | "refund_processed"
  | "review_reminder"
  | "promotion";

export interface NotificationPayload {
  event: NotificationEvent;
  recipient: {
    name?: string;
    email?: string;
    phone?: string;
  };
  data?: Record<string, string | number>;
}

export interface NotificationResult {
  success: boolean;
  channel: NotificationChannel;
  message: string;
}

export async function sendNotification(
  channel: NotificationChannel,
  payload: NotificationPayload,
): Promise<NotificationResult> {
  /*
   * Frontend intentionally does NOT send directly
   * to email/SMS/WhatsApp providers.
   *
   * This function will call your backend API.
   */

  try {
    const response = await fetch(
      "/api/notifications/send",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          channel,
          ...payload,
        }),
      },
    );

    if (!response.ok) {
      throw new Error(
        "Notification request failed",
      );
    }

    const result = await response.json();

    return {
      success: true,
      channel,
      message:
        result.message ??
        "Notification sent successfully.",
    };
  } catch (error) {
    console.error(
      "Notification error:",
      error,
    );

    return {
      success: false,
      channel,
      message:
        "Notification could not be sent.",
    };
  }
}