
"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  Heart,
  Search,
  ShoppingCart,
  Sparkles,
  User,
} from "lucide-react";
import Link from "next/link";

import HeroScene from "./components/3d/HeroScene";
import Category3D from "./components/Category3D";
import FeaturedProducts from "./components/FeaturedProducts";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* =========================================================
          BACKGROUND
      ========================================================== */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-40 -top-40 h-[600px] w-[600px] rounded-full bg-violet-600/[0.08] blur-[140px]" />

        <div className="absolute right-[-200px] top-[20%] h-[600px] w-[600px] rounded-full bg-blue-500/[0.07] blur-[160px]" />

        <div className="absolute bottom-[-200px] left-[30%] h-[500px] w-[500px] rounded-full bg-purple-500/[0.05] blur-[140px]" />
      </div>

      {/* =========================================================
          HERO
      ========================================================== */}

      <section className="relative mx-auto max-w-7xl px-6 pb-24 pt-28 lg:px-10 lg:pt-32">
        <div className="grid min-h-[720px] items-center lg:grid-cols-[0.95fr_1.05fr]">
          {/* =====================================================
              HERO CONTENT
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative z-20 max-w-2xl"
          >
            {/* Badge */}

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
              className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 backdrop-blur-xl"
            >
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-black">
                <Sparkles size={11} />
              </span>

              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-white/60">
                The modern marketplace
              </span>
            </motion.div>

            {/* Heading */}

            <h1 className="max-w-3xl text-[3.7rem] font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl lg:text-[6.8rem]">
              Everything
              <br />

              <span className="bg-gradient-to-r from-white via-white/80 to-white/30 bg-clip-text text-transparent">
                you want.
              </span>

              <br />

              <span className="text-white/25">
                One place.
              </span>
            </h1>

            {/* Description */}

            <p className="mt-8 max-w-xl text-base leading-7 text-white/45 sm:text-lg">
              Discover exceptional products from trusted independent
              vendors. Shop fashion, electronics, lifestyle and more —
              all through one seamless marketplace.
            </p>

            {/* Actions */}

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-[0_15px_50px_rgba(255,255,255,0.12)]"
                >
                  Explore products

                  <ArrowRight
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.div>
              </Link>

              <Link href="/categories">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/75 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                >
                  Browse categories

                  <ArrowUpRight size={16} />
                </motion.div>
              </Link>
            </div>

            {/* Trust */}

            <div className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-5 border-t border-white/10 pt-7">
              <Stat value="10K+" label="Products" />
              <Stat value="500+" label="Vendors" />
              <Stat value="50K+" label="Customers" />
            </div>
          </motion.div>

          {/* =====================================================
              3D HERO
          ====================================================== */}

          <motion.div
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: 1.1,
              delay: 0.15,
              ease: "easeOut",
            }}
            className="relative -mx-6 mt-8 h-[520px] sm:h-[600px] lg:-mr-24 lg:mt-0 lg:h-[720px]"
          >
            {/* Glow */}

            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.12] blur-[100px]" />

            <HeroScene />

            {/* Floating product card */}

            <motion.div
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.7 }}
              className="absolute bottom-14 right-2 w-[190px] rounded-2xl border border-white/10 bg-black/50 p-4 shadow-2xl backdrop-blur-2xl sm:right-8"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] uppercase tracking-[0.18em] text-white/35">
                  Featured
                </span>

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                  <ArrowUpRight size={13} />
                </div>
              </div>

              <p className="text-sm font-semibold text-white">
                Premium Collection
              </p>

              <p className="mt-1 text-xs leading-5 text-white/40">
                Curated products from our top vendors.
              </p>
            </motion.div>

            {/* Floating rating */}

            <motion.div
              animate={{ y: [0, -7, 0] }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute left-3 top-24 rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-3 backdrop-blur-2xl sm:left-10"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white text-black">
                  <Sparkles size={13} />
                </div>

                <div>
                  <p className="text-[10px] text-white/35">
                    Marketplace
                  </p>

                  <p className="text-xs font-medium text-white">
                    Built for discovery
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4 }}
          className="hidden items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-white/25 lg:flex"
        >
          <span className="h-px w-10 bg-white/20" />
          Scroll to explore
        </motion.div>
      </section>

      {/* =========================================================
          CATEGORIES
      ========================================================== */}

      <section id="categories" className="scroll-mt-24">
        <Category3D />
      </section>

      {/* =========================================================
          FEATURED PRODUCTS
      ========================================================== */}

      <section id="products" className="scroll-mt-24">
        <FeaturedProducts />
      </section>

      {/* =========================================================
          MARKETPLACE CTA
      ========================================================== */}

      <section className="px-6 py-24 lg:px-10">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035] px-7 py-16 text-center backdrop-blur-xl sm:px-12">
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[100px]" />

          <div className="relative">
            <p className="text-xs uppercase tracking-[0.3em] text-white/35">
              Join Vendora
            </p>

            <h2 className="mx-auto mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Discover something
              <span className="text-white/30"> extraordinary.</span>
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-white/40">
              Explore thousands of products from independent vendors
              and discover your next favorite thing.
            </p>

            <div className="mt-8 flex justify-center">
              <Link href="/products">
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black"
                >
                  Start shopping
                  <ArrowRight size={16} />
                </motion.div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function Stat({
  value,
  label,
}: {
  value: string;
  label: string;
}) {
  return (
    <div>
      <p className="text-xl font-semibold tracking-tight text-white sm:text-2xl">
        {value}
      </p>

      <p className="mt-1 text-[11px] uppercase tracking-[0.14em] text-white/30">
        {label}
      </p>
    </div>
  );
}
