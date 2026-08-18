import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      channel,
      event,
      recipient,
      data,
    } = body;

    if (!channel || !event || !recipient) {
      return NextResponse.json(
        {
          success: false,
          message:
            "Missing notification information.",
        },
        {
          status: 400,
        },
      );
    }

    /*
     * IMPORTANT:
     *
     * This is the integration boundary.
     *
     * Later this route will call:
     *
     * Email    → your email provider
     * SMS      → your SMS provider
     * WhatsApp → WhatsApp provider
     *
     * Never expose provider API keys
     * inside client-side code.
     */

    console.log(
      "Notification request:",
      {
        channel,
        event,
        recipient,
        data,
      },
    );

    return NextResponse.json({
      success: true,
      channel,
      event,
      message:
        "Notification request accepted.",
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        message:
          "Invalid notification request.",
      },
      {
        status: 500,
      },
    );
  }
}