"use client";

import { useState } from "react";
import {
  Bell,
  Mail,
  MessageCircle,
  Smartphone,
  Check,
} from "lucide-react";

type Channel = "email" | "sms" | "whatsapp";

type Preference = {
  email: boolean;
  sms: boolean;
  whatsapp: boolean;
};

const initialPreferences: Record<string, Preference> = {
  orders: {
    email: true,
    sms: true,
    whatsapp: true,
  },
  delivery: {
    email: true,
    sms: true,
    whatsapp: true,
  },
  promotions: {
    email: true,
    sms: false,
    whatsapp: true,
  },
  reviews: {
    email: true,
    sms: false,
    whatsapp: false,
  },
};

const channels: {
  id: Channel;
  label: string;
  icon: typeof Mail;
}[] = [
  {
    id: "email",
    label: "Email",
    icon: Mail,
  },
  {
    id: "sms",
    label: "SMS",
    icon: Smartphone,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    icon: MessageCircle,
  },
];

const notificationTypes = [
  {
    id: "orders",
    title: "Order Updates",
    description:
      "Order confirmation, payment and order status changes.",
  },
  {
    id: "delivery",
    title: "Delivery Updates",
    description:
      "Shipping, out-for-delivery and delivery notifications.",
  },
  {
    id: "promotions",
    title: "Promotions",
    description:
      "Offers, discounts and special deals.",
  },
  {
    id: "reviews",
    title: "Review Reminders",
    description:
      "Reminders to review products you've purchased.",
  },
];

export default function NotificationPreferencesPage() {
  const [preferences, setPreferences] =
    useState(initialPreferences);

  const [saved, setSaved] = useState(false);

  function toggle(
    type: string,
    channel: Channel,
  ) {
    setPreferences((current) => ({
      ...current,
      [type]: {
        ...current[type],
        [channel]:
          !current[type][channel],
      },
    }));

    setSaved(false);
  }

  function savePreferences() {
    localStorage.setItem(
      "vendora-notification-preferences",
      JSON.stringify(preferences),
    );

    setSaved(true);

    setTimeout(() => {
      setSaved(false);
    }, 2500);
  }

  return (
    <main className="min-h-screen bg-black px-4 pb-28 pt-24 text-white md:px-8">
      <div className="mx-auto max-w-4xl">

        {/* Header */}

        <div className="mb-10">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
            <Bell size={22} />
          </div>

          <h1 className="text-3xl font-semibold tracking-tight md:text-5xl">
            Notification Preferences
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-white/50">
            Choose how Vendora should keep you
            updated about your orders, deliveries,
            offers and reviews.
          </p>
        </div>

        {/* Preferences */}

        <div className="space-y-4">
          {notificationTypes.map((type) => (
            <section
              key={type.id}
              className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl"
            >
              <div className="border-b border-white/10 p-5 md:p-6">
                <h2 className="text-lg font-medium">
                  {type.title}
                </h2>

                <p className="mt-1 text-xs text-white/40">
                  {type.description}
                </p>
              </div>

              <div className="divide-y divide-white/5">
                {channels.map((channel) => {
                  const Icon = channel.icon;
                  const enabled =
                    preferences[type.id][
                      channel.id
                    ];

                  return (
                    <button
                      key={channel.id}
                      type="button"
                      onClick={() =>
                        toggle(
                          type.id,
                          channel.id,
                        )
                      }
                      className="flex w-full items-center justify-between px-5 py-4 text-left transition hover:bg-white/[0.04] md:px-6"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5">
                          <Icon size={17} />
                        </div>

                        <span className="text-sm">
                          {channel.label}
                        </span>
                      </div>

                      <div
                        className={`flex h-7 w-7 items-center justify-center rounded-full border transition ${
                          enabled
                            ? "border-white bg-white text-black"
                            : "border-white/20 bg-transparent"
                        }`}
                      >
                        {enabled && (
                          <Check size={14} />
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          ))}
        </div>

        {/* Save */}

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/30">
            You can change these preferences
            anytime.
          </p>

          <button
            type="button"
            onClick={savePreferences}
            className="rounded-2xl bg-white px-6 py-3 text-sm font-medium text-black transition hover:bg-white/90 active:scale-95"
          >
            {saved
              ? "✓ Preferences Saved"
              : "Save Preferences"}
          </button>
        </div>

      </div>
    </main>
  );
}
