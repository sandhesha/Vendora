"use client";

import { motion } from "framer-motion";
import {
  Bell,
  ChevronRight,
  CreditCard,
  Heart,
  Lock,
  MapPin,
  Package,
  Pencil,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Star,
  User,
} from "lucide-react";
import { useState } from "react";

export default function ProfilePage() {
  const [notifications, setNotifications] =
    useState(true);
  const [marketing, setMarketing] =
    useState(false);

  return (
    <main className="min-h-screen bg-black pb-28 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* HERO */}

        <section className="relative overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.025] p-7 md:p-12">

          <div
            className="absolute inset-0 opacity-[0.045]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.04, 0.1, 0.04],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
            className="absolute left-[-150px] top-[-180px] h-[450px] w-[450px] rounded-full bg-white blur-[150px]"
          />

          <div className="relative z-10 grid items-center gap-12 lg:grid-cols-[1fr_300px]">

            <div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-white/25">
                <Sparkles size={11} />
                Customer account
              </div>

              <div className="mt-7 flex items-center gap-5">

                <motion.div
                  whileHover={{
                    rotateY: 18,
                    scale: 1.05,
                  }}
                  className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-3xl font-black text-black shadow-[0_25px_70px_rgba(255,255,255,.12)]"
                  style={{
                    transformStyle:
                      "preserve-3d",
                  }}
                >
                  S
                </motion.div>

                <div>
                  <h1 className="text-4xl font-black md:text-5xl">
                    Sandesh
                  </h1>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                    Premium customer
                  </p>

                  <div className="mt-3 flex items-center gap-2 text-[9px] text-white/30">
                    <ShieldCheck size={12} />
                    Verified account
                  </div>
                </div>

              </div>

              <p className="mt-7 max-w-xl text-sm leading-7 text-white/30">
                Manage your personal information,
                orders, addresses, payments and
                marketplace preferences from one
                place.
              </p>

              <div className="mt-8 flex flex-wrap gap-7">

                <Stat
                  value="12"
                  label="Orders"
                  icon={<Package size={11} />}
                />

                <Stat
                  value="8"
                  label="Wishlist"
                  icon={<Heart size={11} />}
                />

                <Stat
                  value="4"
                  label="Reviews"
                  icon={<Star size={11} />}
                />

              </div>

            </div>

            {/* 3D PROFILE OBJECT */}

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 18, -18, 0],
                rotateZ: [0, 3, -3, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="mx-auto flex h-56 w-56 items-center justify-center rounded-[4rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_rgba(255,255,255,.08)]"
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >

              <div
                className="flex h-32 w-32 items-center justify-center rounded-[2.5rem] bg-white text-6xl font-black text-black"
                style={{
                  transform:
                    "translateZ(45px)",
                }}
              >
                S
              </div>

            </motion.div>

          </div>
        </section>

        {/* ACCOUNT GRID */}

        <section className="mt-10 grid gap-4 lg:grid-cols-2">

          <ProfileCard
            icon={<User size={17} />}
            title="Personal information"
            description="Name, email and account details"
          >
            <InfoRow
              label="Full name"
              value="Sandesh"
            />

            <InfoRow
              label="Email"
              value="sandesh@example.com"
            />

            <InfoRow
              label="Phone"
              value="+91 ••••• •••••"
            />

            <EditButton />
          </ProfileCard>

          <ProfileCard
            icon={<MapPin size={17} />}
            title="Saved addresses"
            description="Manage your delivery locations"
          >
            <Address
              title="Home"
              text="Primary delivery address"
              active
            />

            <Address
              title="Office"
              text="Work delivery address"
            />

            <button className="mt-3 flex w-full items-center justify-center rounded-xl border border-dashed border-white/10 py-3 text-[9px] text-white/25 hover:border-white/25 hover:text-white">
              + Add new address
            </button>
          </ProfileCard>

        </section>

        {/* QUICK ACTIONS */}

        <section className="mt-10">

          <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
            Account shortcuts
          </p>

          <h2 className="mt-3 text-3xl font-black">
            Manage account
          </h2>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">

            <ActionCard
              icon={<Package size={18} />}
              title="Orders"
              text="Track purchases"
            />

            <ActionCard
              icon={<Heart size={18} />}
              title="Wishlist"
              text="Saved products"
            />

            <ActionCard
              icon={<ShoppingBag size={18} />}
              title="Cart"
              text="Items waiting"
            />

            <ActionCard
              icon={<Star size={18} />}
              title="Reviews"
              text="Your feedback"
            />

          </div>

        </section>

        {/* PAYMENT + SECURITY */}

        <section className="mt-10 grid gap-4 lg:grid-cols-2">

          <ProfileCard
            icon={<CreditCard size={17} />}
            title="Payment methods"
            description="Manage saved payment options"
          >

            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

              <div className="flex items-center justify-between">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-14 items-center justify-center rounded-lg bg-white text-[8px] font-black text-black">
                    VISA
                  </div>

                  <div>
                    <p className="text-xs font-semibold">
                      •••• 4821
                    </p>

                    <p className="mt-1 text-[8px] text-white/20">
                      Primary card
                    </p>
                  </div>

                </div>

                <ShieldCheck
                  size={15}
                  className="text-white/30"
                />

              </div>

            </div>

            <button className="mt-3 flex w-full items-center justify-center rounded-xl border border-dashed border-white/10 py-3 text-[9px] text-white/25 hover:text-white">
              + Add payment method
            </button>

          </ProfileCard>

          <ProfileCard
            icon={<Lock size={17} />}
            title="Security"
            description="Protect your Vendora account"
          >

            <SettingRow
              title="Two-factor authentication"
              text="Add another layer of security"
              action={
                <Toggle enabled={true} />
              }
            />

            <SettingRow
              title="Login alerts"
              text="Get notified about new logins"
              action={
                <Toggle enabled={true} />
              }
            />

            <button className="mt-4 flex items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/30 hover:bg-white/10 hover:text-white">
              Change password
              <ChevronRight size={12} />
            </button>

          </ProfileCard>

        </section>

        {/* NOTIFICATIONS */}

        <section className="mt-10">

          <ProfileCard
            icon={<Bell size={17} />}
            title="Notifications"
            description="Control how Vendora communicates with you"
          >

            <SettingRow
              title="Order notifications"
              text="Shipping, delivery and order updates"
              action={
                <Toggle
                  enabled={notifications}
                  onClick={() =>
                    setNotifications(
                      !notifications,
                    )
                  }
                />
              }
            />

            <SettingRow
              title="Promotional notifications"
              text="Offers, discounts and new launches"
              action={
                <Toggle
                  enabled={marketing}
                  onClick={() =>
                    setMarketing(
                      !marketing,
                    )
                  }
                />
              }
            />

            <SettingRow
              title="Email notifications"
              text="Receive important updates by email"
              action={
                <Toggle enabled={true} />
              }
            />

          </ProfileCard>

        </section>

        {/* ACCOUNT FOOTER */}

        <section className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.02] p-7">

          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

            <div>

              <p className="text-sm font-bold">
                Account protection
              </p>

              <p className="mt-2 max-w-xl text-[9px] leading-5 text-white/20">
                Your account is protected with
                Vendora security systems and encrypted
                authentication.
              </p>

            </div>

            <div className="flex items-center gap-2 rounded-xl bg-white/[0.05] px-4 py-3 text-[9px] text-white/40">
              <ShieldCheck size={13} />
              Security status: Good
            </div>

          </div>

        </section>

      </div>
    </main>
  );
}

/* ============================= */
/* PROFILE CARD */
/* ============================= */

function ProfileCard({
  icon,
  title,
  description,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      whileHover={{
        y: -3,
      }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6"
    >

      <div className="flex items-start gap-4">

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black">
          {icon}
        </div>

        <div>
          <h3 className="text-sm font-bold">
            {title}
          </h3>

          <p className="mt-1 text-[9px] text-white/20">
            {description}
          </p>
        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </motion.div>
  );
}

/* ============================= */
/* INFO ROW */
/* ============================= */

function InfoRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-3">

      <span className="text-[9px] text-white/20">
        {label}
      </span>

      <span className="text-[10px] text-white/60">
        {value}
      </span>

    </div>
  );
}

/* ============================= */
/* ADDRESS */
/* ============================= */

function Address({
  title,
  text,
  active = false,
}: {
  title: string;
  text: string;
  active?: boolean;
}) {
  return (
    <div className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.02] p-4">

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-white/[0.05]">
          <MapPin size={14} />
        </div>

        <div>
          <p className="text-[10px] font-semibold">
            {title}
          </p>

          <p className="mt-1 text-[8px] text-white/20">
            {text}
          </p>
        </div>

      </div>

      {active && (
        <span className="rounded-md bg-white px-2 py-1 text-[7px] font-bold text-black">
          Default
        </span>
      )}

    </div>
  );
}

/* ============================= */
/* ACTION CARD */
/* ============================= */

function ActionCard({
  icon,
  title,
  text,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -5,
        scale: 1.01,
      }}
      className="group cursor-pointer rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-5 transition"
    >

      <div className="flex items-center justify-between">

        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
          {icon}
        </div>

        <ChevronRight
          size={14}
          className="text-white/15 transition group-hover:translate-x-1 group-hover:text-white"
        />

      </div>

      <h3 className="mt-5 text-sm font-bold">
        {title}
      </h3>

      <p className="mt-1 text-[9px] text-white/20">
        {text}
      </p>

    </motion.div>
  );
}

/* ============================= */
/* SETTINGS */
/* ============================= */

function SettingRow({
  title,
  text,
  action,
}: {
  title: string;
  text: string;
  action: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between border-b border-white/5 py-4">

      <div>
        <p className="text-[10px] font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[8px] text-white/20">
          {text}
        </p>
      </div>

      {action}

    </div>
  );
}

/* ============================= */
/* TOGGLE */
/* ============================= */

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full border transition ${
        enabled
          ? "border-white bg-white"
          : "border-white/10 bg-white/[0.04]"
      }`}
    >

      <motion.span
        animate={{
          x: enabled ? 20 : 2,
        }}
        className={`absolute left-0 top-1/2 h-4 w-4 -translate-y-1/2 rounded-full ${
          enabled
            ? "bg-black"
            : "bg-white/20"
        }`}
      />

    </button>
  );
}

/* ============================= */
/* STAT */
/* ============================= */

function Stat({
  value,
  label,
  icon,
}: {
  value: string;
  label: string;
  icon: React.ReactNode;
}) {
  return (
    <div>

      <div className="flex items-center gap-2">
        {icon}

        <span className="text-sm font-bold">
          {value}
        </span>
      </div>

      <p className="mt-1 text-[8px] uppercase tracking-[0.2em] text-white/20">
        {label}
      </p>

    </div>
  );
}

/* ============================= */
/* EDIT BUTTON */
/* ============================= */

function EditButton() {
  return (
    <button className="mt-4 flex items-center gap-2 rounded-xl border border-white/10 px-4 py-3 text-[9px] text-white/35 hover:bg-white hover:text-black">
      <Pencil size={11} />
      Edit information
    </button>
  );
}