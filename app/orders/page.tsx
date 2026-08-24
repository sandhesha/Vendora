"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  Clock3,
  MapPin,
  Package,
  RotateCcw,
  Truck,
  XCircle,
} from "lucide-react";
import Link from "next/link";

const timeline = [
  {
    title: "Order placed",
    description: "Your order has been confirmed",
    time: "Aug 17 · 10:24 AM",
    done: true,
    icon: Check,
  },
  {
    title: "Packed",
    description: "Seller packed your items",
    time: "Aug 17 · 01:42 PM",
    done: true,
    icon: Package,
  },
  {
    title: "Shipped",
    description: "Package left the seller facility",
    time: "Aug 18 · 08:15 AM",
    done: true,
    icon: Truck,
  },
  {
    title: "Out for delivery",
    description: "Your package is on the way",
    time: "Today · 09:20 AM",
    done: true,
    active: true,
    icon: Truck,
  },
  {
    title: "Delivered",
    description: "Package will arrive at your address",
    time: "Expected today",
    done: false,
    icon: Check,
  },
];

const products = [
  {
    name: "Aero Runner X",
    variant: "Black / Size 9",
    price: "₹8,499",
    emoji: "👟",
  },
  {
    name: "Motion Core Tee",
    variant: "White / Large",
    price: "₹2,499",
    emoji: "👕",
  },
];

export default function OrdersPage() {
  return (
    <main className="min-h-screen bg-black pb-24 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* HEADER */}

        <div className="mb-10 flex items-center justify-between">

          <Link
            href="/"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Continue shopping
          </Link>

          <div className="flex items-center gap-2 text-[8px] uppercase tracking-[0.2em] text-white/20">
            <Truck size={12} />
            Live tracking
          </div>

        </div>

        {/* TITLE */}

        <div className="mb-10">

          <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">
            Vendora orders
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-6xl">
            Track your order.
          </h1>

          <p className="mt-4 max-w-xl text-sm leading-6 text-white/25">
            Follow your package from warehouse to
            your doorstep with real-time delivery
            updates.
          </p>

        </div>

        {/* MAIN GRID */}

        <div className="grid gap-5 lg:grid-cols-[1fr_380px]">

          {/* LEFT */}

          <div className="space-y-5">

            {/* ACTIVE ORDER */}

            <motion.section
              whileHover={{
                y: -3,
              }}
              className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
            >

              {/* GRID BACKGROUND */}

              <div
                className="pointer-events-none absolute inset-0 opacity-[0.035]"
                style={{
                  backgroundImage:
                    "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                }}
              />

              <div className="relative p-6 md:p-8">

                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">

                  <div>

                    <div className="flex items-center gap-2">

                      <span className="h-2 w-2 animate-pulse rounded-full bg-white" />

                      <span className="text-[8px] uppercase tracking-[0.25em] text-white/40">
                        Out for delivery
                      </span>

                    </div>

                    <h2 className="mt-4 text-2xl font-black">
                      Arriving today
                    </h2>

                    <p className="mt-2 text-[9px] text-white/20">
                      Expected between 2:00 PM – 6:00 PM
                    </p>

                  </div>

                  <div className="rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">

                    <p className="text-[7px] uppercase tracking-[0.2em] text-white/20">
                      Order ID
                    </p>

                    <p className="mt-1 text-[10px] font-bold">
                      #VND-20481
                    </p>

                  </div>

                </div>

                {/* 3D DELIVERY ORB */}

                <div className="my-10 flex justify-center">

                  <div className="relative">

                    <motion.div
                      animate={{
                        scale: [1, 1.08, 1],
                        rotate: [0, 3, -3, 0],
                      }}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="flex h-36 w-36 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] shadow-[0_0_100px_rgba(255,255,255,.05)]"
                    >

                      <div className="flex h-24 w-24 items-center justify-center rounded-full bg-white text-black shadow-[0_0_50px_rgba(255,255,255,.15)]">

                        <Truck size={34} />

                      </div>

                    </motion.div>

                    <motion.div
                      animate={{
                        rotate: 360,
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="absolute -inset-5 rounded-full border border-dashed border-white/10"
                    />

                    <motion.div
                      animate={{
                        y: [-4, 4, -4],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                      className="absolute -right-5 top-1/2 flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black shadow-xl"
                    >
                      <MapPin size={15} />

                    </motion.div>

                  </div>

                </div>

                {/* DELIVERY PROGRESS */}

                <div className="grid grid-cols-5 gap-1">

                  {timeline.map((item, index) => (

                    <div
                      key={item.title}
                      className="relative"
                    >

                      <div className="mb-3 flex items-center">

                        <motion.div
                          animate={
                            item.active
                              ? {
                                  scale: [1, 1.15, 1],
                                }
                              : {}
                          }
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                          }}
                          className={`flex h-7 w-7 items-center justify-center rounded-full border ${
                            item.done
                              ? "border-white bg-white text-black"
                              : "border-white/10 bg-black text-white/20"
                          }`}
                        >
                          <item.icon size={11} />
                        </motion.div>

                        {index < timeline.length - 1 && (
                          <div
                            className={`h-px flex-1 ${
                              timeline[index + 1].done
                                ? "bg-white/30"
                                : "bg-white/10"
                            }`}
                          />
                        )}

                      </div>

                      <p
                        className={`text-[7px] leading-3 ${
                          item.active
                            ? "font-bold text-white"
                            : "text-white/30"
                        }`}
                      >
                        {item.title}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            </motion.section>

            {/* TIMELINE */}

            <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-8">

              <div className="mb-8">

                <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                  Shipment activity
                </p>

                <h2 className="mt-2 text-xl font-black">
                  Delivery timeline
                </h2>

              </div>

              <div className="relative">

                <div className="absolute bottom-5 left-[15px] top-5 w-px bg-white/10" />

                <div className="space-y-7">

                  {timeline.map((item, index) => {

                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.title}
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.12,
                        }}
                        className="relative flex gap-5"
                      >

                        <div
                          className={`relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border ${
                            item.done
                              ? "border-white bg-white text-black"
                              : "border-white/10 bg-black text-white/20"
                          }`}
                        >
                          <Icon size={12} />
                        </div>

                        <div className="flex-1 pb-1">

                          <div className="flex flex-col justify-between gap-1 sm:flex-row">

                            <h3 className="text-[10px] font-bold">
                              {item.title}
                            </h3>

                            <span className="text-[8px] text-white/20">
                              {item.time}
                            </span>

                          </div>

                          <p className="mt-2 text-[8px] leading-4 text-white/20">
                            {item.description}
                          </p>

                        </div>

                      </motion.div>
                    );

                  })}

                </div>

              </div>

            </section>

            {/* PRODUCTS */}

            <section className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6 md:p-8">

              <div className="mb-6 flex items-center justify-between">

                <div>

                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                    Order contents
                  </p>

                  <h2 className="mt-2 text-xl font-black">
                    Your items
                  </h2>

                </div>

                <span className="text-[8px] text-white/20">
                  2 items
                </span>

              </div>

              <div className="space-y-3">

                {products.map((product) => (

                  <div
                    key={product.name}
                    className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-3"
                  >

                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl bg-white text-3xl">
                      {product.emoji}
                    </div>

                    <div className="flex-1">

                      <h3 className="text-[10px] font-bold">
                        {product.name}
                      </h3>

                      <p className="mt-1 text-[8px] text-white/20">
                        {product.variant}
                      </p>

                    </div>

                    <p className="text-[10px] font-bold">
                      {product.price}
                    </p>

                  </div>

                ))}

              </div>

            </section>

          </div>

          {/* RIGHT */}

          <aside className="space-y-5 lg:sticky lg:top-24 lg:self-start">

            {/* DELIVERY CARD */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                  <MapPin size={16} />
                </div>

                <div>

                  <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                    Delivering to
                  </p>

                  <p className="mt-1 text-[11px] font-bold">
                    Home
                  </p>

                </div>

              </div>

              <div className="mt-5 rounded-xl border border-white/10 bg-black p-4">

                <p className="text-[9px] leading-5 text-white/30">
                  Sandesh
                  <br />
                  Kunjathur, Manjeshwar
                  <br />
                  Kerala, India
                </p>

              </div>

            </div>

            {/* SHIPPING INFO */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">

              <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                Shipment
              </p>

              <div className="mt-5 space-y-4">

                <InfoRow
                  icon={<Truck size={13} />}
                  label="Courier"
                  value="Vendora Express"
                />

                <InfoRow
                  icon={<Package size={13} />}
                  label="Tracking ID"
                  value="VEX-884219"
                />

                <InfoRow
                  icon={<Clock3 size={13} />}
                  label="Estimated delivery"
                  value="Today"
                />

              </div>

            </div>

            {/* ACTIONS */}

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">

              <button className="flex w-full items-center justify-center gap-2 rounded-xl bg-white py-3 text-[8px] font-black uppercase tracking-[0.2em] text-black">

                Track shipment

                <ChevronRight size={12} />

              </button>

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-[8px] font-bold uppercase tracking-[0.15em] text-white/40 hover:text-white">

                <RotateCcw size={12} />

                Return item

              </button>

              <button className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 py-3 text-[8px] font-bold uppercase tracking-[0.15em] text-white/30 hover:text-white">

                <XCircle size={12} />

                Cancel order

              </button>

            </div>

          </aside>

        </div>

      </div>

    </main>
  );
}

/* ============================= */
/* INFO ROW */
/* ============================= */

function InfoRow({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3">

      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/[0.05] text-white/40">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-[7px] uppercase tracking-[0.15em] text-white/15">
          {label}
        </p>

        <p className="mt-1 text-[9px] font-semibold">
          {value}
        </p>

      </div>

    </div>
  );
}