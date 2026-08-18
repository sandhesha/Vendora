"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Bell,
  BellRing,
  Check,
  CheckCheck,
  ChevronRight,
  Gift,
  Package,
  ShoppingBag,
  Star,
  Tag,
  Trash2,
  Truck,
  X,
} from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

type NotificationType =
  | "order"
  | "shipping"
  | "offer"
  | "review"
  | "system";

type Notification = {
  id: number;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  unread: boolean;
};

const initialNotifications: Notification[] = [
  {
    id: 1,
    type: "shipping",
    title: "Your order is out for delivery",
    message:
      "Order #VND-20481 is arriving today between 2:00 PM and 6:00 PM.",
    time: "10 min ago",
    unread: true,
  },
  {
    id: 2,
    type: "order",
    title: "Order confirmed",
    message:
      "Your order #VND-20481 has been successfully confirmed.",
    time: "2 hours ago",
    unread: true,
  },
  {
    id: 3,
    type: "offer",
    title: "20% off selected sneakers",
    message:
      "Your exclusive Vendora offer expires tonight.",
    time: "5 hours ago",
    unread: true,
  },
  {
    id: 4,
    type: "review",
    title: "How was your Aero Runner X?",
    message:
      "Share your experience and help other shoppers.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 5,
    type: "offer",
    title: "New arrivals are here",
    message:
      "Discover this week's newest products from top vendors.",
    time: "Yesterday",
    unread: false,
  },
  {
    id: 6,
    type: "system",
    title: "Welcome to Vendora",
    message:
      "Your customer account is ready. Start exploring the marketplace.",
    time: "2 days ago",
    unread: false,
  },
];

const filters = [
  "All",
  "Orders",
  "Shipping",
  "Offers",
  "Reviews",
];

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(
    initialNotifications,
  );

  const [filter, setFilter] = useState("All");

  const unreadCount = notifications.filter(
    (notification) => notification.unread,
  ).length;

  const visibleNotifications = useMemo(() => {
    if (filter === "All") {
      return notifications;
    }

    const typeMap: Record<string, NotificationType> = {
      Orders: "order",
      Shipping: "shipping",
      Offers: "offer",
      Reviews: "review",
    };

    return notifications.filter(
      (notification) =>
        notification.type === typeMap[filter],
    );
  }, [notifications, filter]);

  const markAsRead = (id: number) => {
    setNotifications((current) =>
      current.map((notification) =>
        notification.id === id
          ? {
              ...notification,
              unread: false,
            }
          : notification,
      ),
    );
  };

  const markAllAsRead = () => {
    setNotifications((current) =>
      current.map((notification) => ({
        ...notification,
        unread: false,
      })),
    );
  };

  const removeNotification = (id: number) => {
    setNotifications((current) =>
      current.filter(
        (notification) => notification.id !== id,
      ),
    );
  };

  return (
    <main className="min-h-screen bg-black pb-24 pt-24 text-white">
      <div className="mx-auto max-w-5xl px-5 md:px-8">

        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Marketplace
          </Link>

          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/20">
            <BellRing size={12} />
            Notification center
          </div>

        </div>

        {/* HERO */}

        <section className="relative mb-6 overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.025] p-7 md:p-9">

          <div
            className="pointer-events-none absolute inset-0 opacity-[0.035]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          <div className="relative flex flex-col gap-7 md:flex-row md:items-center md:justify-between">

            <div className="flex items-center gap-5">

              {/* 3D BELL */}

              <motion.div
                animate={{
                  rotate: [0, -8, 8, -5, 5, 0],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatDelay: 4,
                }}
                className="relative flex h-20 w-20 shrink-0 items-center justify-center rounded-[1.7rem] bg-white text-black shadow-[0_20px_60px_rgba(255,255,255,.08)]"
              >

                <Bell size={30} />

                {unreadCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-7 w-7 items-center justify-center rounded-full border-4 border-black bg-white text-[8px] font-black">
                    {unreadCount}
                  </span>
                )}

              </motion.div>

              <div>

                <p className="text-[8px] uppercase tracking-[0.3em] text-white/20">
                  Vendora updates
                </p>

                <h1 className="mt-2 text-3xl font-black md:text-4xl">
                  Notifications
                </h1>

                <p className="mt-3 max-w-lg text-[9px] leading-5 text-white/25">
                  Stay updated with orders, deliveries,
                  offers and everything happening around
                  your Vendora account.
                </p>

              </div>

            </div>

            <button
              onClick={markAllAsRead}
              className="flex items-center justify-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-[8px] font-bold uppercase tracking-[0.15em] text-white/30 transition hover:border-white/25 hover:text-white"
            >
              <CheckCheck size={12} />
              Mark all as read
            </button>

          </div>

        </section>

        {/* FILTERS */}

        <div className="mb-5 flex gap-2 overflow-x-auto pb-1">

          {filters.map((item) => (

            <button
              key={item}
              onClick={() => setFilter(item)}
              className={`shrink-0 rounded-full border px-4 py-2 text-[8px] uppercase tracking-[0.15em] transition ${
                filter === item
                  ? "border-white bg-white text-black"
                  : "border-white/10 text-white/25 hover:border-white/25 hover:text-white"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

        {/* NOTIFICATIONS */}

        <section className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">

          <div className="flex items-center justify-between border-b border-white/10 px-6 py-5">

            <div>

              <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                Activity
              </p>

              <p className="mt-1 text-[10px] font-bold">
                {visibleNotifications.length} notifications
              </p>

            </div>

            <span className="text-[8px] text-white/20">
              {unreadCount} unread
            </span>

          </div>

          <div>

            <AnimatePresence mode="popLayout">

              {visibleNotifications.length > 0 ? (
                visibleNotifications.map(
                  (notification, index) => (

                    <NotificationCard
                      key={notification.id}
                      notification={notification}
                      index={index}
                      onRead={() =>
                        markAsRead(notification.id)
                      }
                      onDelete={() =>
                        removeNotification(notification.id)
                      }
                    />

                  ),
                )
              ) : (
                <EmptyNotifications />
              )}

            </AnimatePresence>

          </div>

        </section>

        {/* PREFERENCES */}

        <section className="mt-5 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">

          <div className="flex items-center justify-between gap-5">

            <div className="flex items-center gap-4">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.05] text-white/40">
                <Bell size={15} />
              </div>

              <div>

                <p className="text-[10px] font-bold">
                  Notification preferences
                </p>

                <p className="mt-1 text-[8px] leading-4 text-white/20">
                  Manage how Vendora keeps you informed.
                </p>

              </div>

            </div>

            <button className="flex items-center gap-2 text-[8px] uppercase tracking-[0.15em] text-white/25 hover:text-white">

              Manage

              <ChevronRight size={12} />

            </button>

          </div>

        </section>

      </div>
    </main>
  );
}

/* ============================= */
/* NOTIFICATION CARD */
/* ============================= */

function NotificationCard({
  notification,
  index,
  onRead,
  onDelete,
}: {
  notification: Notification;
  index: number;
  onRead: () => void;
  onDelete: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        x: 40,
        height: 0,
      }}
      transition={{
        delay: index * 0.04,
      }}
      className={`group relative border-b border-white/5 p-5 transition md:p-6 ${
        notification.unread
          ? "bg-white/[0.035]"
          : "bg-transparent"
      }`}
    >

      {/* UNREAD INDICATOR */}

      {notification.unread && (
        <span className="absolute left-0 top-0 h-full w-[2px] bg-white" />
      )}

      <div className="flex gap-4">

        {/* ICON */}

        <motion.div
          whileHover={{
            rotate: 8,
            scale: 1.08,
          }}
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
            notification.unread
              ? "bg-white text-black"
              : "bg-white/[0.05] text-white/30"
          }`}
        >
          <NotificationIcon
            type={notification.type}
          />
        </motion.div>

        {/* CONTENT */}

        <div className="min-w-0 flex-1">

          <div className="flex flex-col justify-between gap-2 sm:flex-row">

            <div className="flex items-center gap-2">

              <h2
                className={`text-[10px] font-bold ${
                  notification.unread
                    ? "text-white"
                    : "text-white/60"
                }`}
              >
                {notification.title}
              </h2>

              {notification.unread && (
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
              )}

            </div>

            <span className="shrink-0 text-[7px] text-white/15">
              {notification.time}
            </span>

          </div>

          <p className="mt-2 max-w-2xl text-[9px] leading-5 text-white/25">
            {notification.message}
          </p>

          <div className="mt-4 flex flex-wrap items-center gap-2">

            {notification.type === "shipping" && (
              <Link
                href="/orders"
                className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-[7px] font-black uppercase tracking-[0.1em] text-black"
              >
                Track order
                <ChevronRight size={10} />
              </Link>
            )}

            {notification.type === "order" && (
              <Link
                href="/orders"
                className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-[7px] font-bold text-white/40 hover:text-white"
              >
                View order
                <ChevronRight size={10} />
              </Link>
            )}

            {notification.type === "offer" && (
              <Link
                href="/products"
                className="flex items-center gap-1 rounded-lg bg-white px-3 py-2 text-[7px] font-black uppercase tracking-[0.1em] text-black"
              >
                Shop offer
                <ChevronRight size={10} />
              </Link>
            )}

            {notification.type === "review" && (
              <Link
                href="/reviews"
                className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-[7px] font-bold text-white/40 hover:text-white"
              >
                Review product
                <ChevronRight size={10} />
              </Link>
            )}

            {notification.unread && (
              <button
                onClick={onRead}
                className="flex items-center gap-1 rounded-lg border border-white/10 px-3 py-2 text-[7px] text-white/30 hover:text-white"
              >
                <Check size={10} />
                Mark read
              </button>
            )}

            <button
              onClick={onDelete}
              className="ml-auto flex items-center gap-1 rounded-lg border border-transparent px-3 py-2 text-[7px] text-white/15 transition hover:border-white/10 hover:text-white/50"
            >
              <Trash2 size={10} />
              Remove
            </button>

          </div>

        </div>

      </div>

    </motion.article>
  );
}

/* ============================= */
/* ICON */
/* ============================= */

function NotificationIcon({
  type,
}: {
  type: NotificationType;
}) {
  if (type === "order") {
    return <ShoppingBag size={17} />;
  }

  if (type === "shipping") {
    return <Truck size={17} />;
  }

  if (type === "offer") {
    return <Tag size={17} />;
  }

  if (type === "review") {
    return <Star size={17} />;
  }

  return <Gift size={17} />;
}

/* ============================= */
/* EMPTY STATE */
/* ============================= */

function EmptyNotifications() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.95,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="flex flex-col items-center justify-center px-6 py-24 text-center"
    >

      <div className="flex h-20 w-20 items-center justify-center rounded-[1.7rem] border border-white/10 bg-white/[0.03]">

        <Bell
          size={28}
          className="text-white/20"
        />

      </div>

      <h2 className="mt-6 text-lg font-black">
        Nothing here
      </h2>

      <p className="mt-2 max-w-xs text-[9px] leading-5 text-white/20">
        There are no notifications in this category
        right now.
      </p>

    </motion.div>
  );
}