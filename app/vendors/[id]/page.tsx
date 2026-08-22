"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  MapPin,
  Package,
  ShoppingBag,
  Star,
  Store,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function VendorStorePage() {
  const params = useParams();

  const vendorId = params.id;

  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* BACK */}
        <Link
          href="/vendors"
          className="mb-8 inline-flex items-center gap-2 text-xs text-white/30 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to vendors
        </Link>

        {/* STORE HERO */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035] p-8 md:p-12"
        >
          {/* Background glow */}
          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.08, 0.15, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"
          />

          <div className="relative">

            <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

              {/* Vendor identity */}
              <div className="flex items-center gap-5">

                <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[2rem] bg-white text-black shadow-2xl">
                  <Store size={38} />
                </div>

                <div>

                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/25">
                    Vendora marketplace
                  </p>

                  <h1 className="mt-2 text-4xl font-black md:text-5xl">
                    Test Vendor Store
                  </h1>

                  <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-white/30">

                    <span className="flex items-center gap-1.5">
                      <Star
                        size={13}
                        className="fill-white text-white"
                      />
                      4.8
                    </span>

                    <span className="flex items-center gap-1.5">
                      <Package size={13} />
                      24 products
                    </span>

                    <span className="flex items-center gap-1.5">
                      <MapPin size={13} />
                      India
                    </span>

                  </div>

                </div>

              </div>

              {/* Vendor ID */}
              <div className="rounded-2xl border border-white/10 bg-black/30 px-5 py-4">
                <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                  Vendor ID
                </p>

                <p className="mt-1 text-sm font-bold">
                  #{vendorId}
                </p>
              </div>

            </div>

          </div>
        </motion.section>

        {/* STORE STATS */}
        <section className="mt-5 grid gap-4 sm:grid-cols-3">

          <Stat
            icon={<Package size={16} />}
            label="Products"
            value="24"
          />

          <Stat
            icon={<Star size={16} />}
            label="Rating"
            value="4.8 / 5"
          />

          <Stat
            icon={<ShoppingBag size={16} />}
            label="Orders"
            value="1,240+"
          />

        </section>

        {/* PRODUCTS */}
        <section className="mt-12">

          <div className="mb-6 flex items-end justify-between">

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Vendor collection
              </p>

              <h2 className="mt-2 text-2xl font-bold">
                Products
              </h2>
            </div>

            <Link
              href="/products"
              className="text-xs text-white/30 transition hover:text-white"
            >
              Browse marketplace →
            </Link>

          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

            {[
              "Featured Product",
              "Premium Collection",
              "Everyday Essential",
              "Latest Arrival",
            ].map((product, index) => (

              <motion.div
                key={product}
                initial={{
                  opacity: 0,
                  y: 20,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.025]"
              >

                <div className="flex h-64 items-center justify-center bg-white">

                  <ShoppingBag
                    size={70}
                    className="text-black/10 transition duration-500 group-hover:scale-110"
                  />

                </div>

                <div className="p-5">

                  <p className="text-sm font-semibold">
                    {product}
                  </p>

                  <p className="mt-2 text-xs text-white/25">
                    Premium vendor product
                  </p>

                  <div className="mt-4 flex items-center justify-between">

                    <span className="text-sm font-bold">
                      ₹2,499
                    </span>

                    <Link
                      href="/products"
                      className="rounded-xl bg-white px-3 py-2 text-[9px] font-bold text-black"
                    >
                      View
                    </Link>

                  </div>

                </div>

              </motion.div>

            ))}

          </div>

        </section>

      </div>
    </main>
  );
}

function Stat({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.025] p-5">

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
        {icon}
      </div>

      <div>
        <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
          {label}
        </p>

        <p className="mt-1 text-sm font-bold">
          {value}
        </p>
      </div>

    </div>
  );
}