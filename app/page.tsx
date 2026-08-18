"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  Search,
  ShoppingBag,
  Sparkles,
  User,
} from "lucide-react";

import HeroScene from "./components/3d/HeroScene";
import Category3D from "./components/Category3D";
import FeaturedProducts from "./components/FeaturedProducts";




export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      {/* Background glow */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/4 top-0 h-[500px] w-[500px] rounded-full bg-purple-600/10 blur-[140px]" />
        <div className="absolute right-0 top-1/3 h-[500px] w-[500px] rounded-full bg-blue-500/10 blur-[160px]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-50 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.15)]">
            <ShoppingBag size={20} />
          </div>

          <span className="text-xl font-semibold tracking-tight">
            Vendora
          </span>
        </motion.div>

        {/* Navigation */}
        <div className="hidden items-center gap-8 text-sm text-white/60 md:flex">
          <a
            href="#"
            className="transition hover:text-white"
          >
            Home
          </a>

          <a
            href="#products"
            className="transition hover:text-white"
          >
            Products
          </a>

          <a
            href="#categories"
            className="transition hover:text-white"
          >
            Categories
          </a>

          <a
            href="#vendors"
            className="transition hover:text-white"
          >
            Vendors
          </a>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 sm:flex">
            <Search size={18} />
          </button>

          <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 sm:flex">
            <Heart size={18} />
          </button>

          <button className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10">
            <ShoppingBag size={18} />

            <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-white px-1 text-[9px] font-bold text-black">
              0
            </span>
          </button>

          <button className="hidden h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 transition hover:bg-white/10 sm:flex">
            <User size={18} />
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-90px)] max-w-7xl items-center px-6 pb-20 pt-8 lg:grid-cols-2 lg:px-10">
        {/* Hero text */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-20 max-w-2xl"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-xs text-white/70 backdrop-blur-xl"
          >
            <Sparkles size={14} />

            <span>THE NEXT GENERATION MARKETPLACE</span>
          </motion.div>

          {/* Heading */}
          <h1 className="text-5xl font-semibold leading-[0.95] tracking-[-0.05em] sm:text-6xl lg:text-8xl">
            Shop
            <br />

            <span className="bg-gradient-to-r from-white via-white/80 to-white/30 bg-clip-text text-transparent">
              beyond
            </span>

            <br />

            <span className="text-white/30">
              ordinary.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-7 max-w-lg text-base leading-7 text-white/50 sm:text-lg">
            Discover exceptional products from independent
            vendors, all in one beautifully designed marketplace.
          </p>

          {/* Buttons */}
          <div className="mt-9 flex flex-wrap gap-4">
            <motion.a
              href="#products"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="group flex items-center gap-3 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black shadow-[0_10px_40px_rgba(255,255,255,0.12)]"
            >
              Explore products

              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </motion.a>

            <motion.a
              href="#categories"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-full border border-white/10 bg-white/[0.04] px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition hover:bg-white/[0.08]"
            >
              Browse categories
            </motion.a>
          </div>

          {/* Stats */}
          <div className="mt-12 flex gap-10 border-t border-white/10 pt-7">
            <div>
              <p className="text-2xl font-semibold">10K+</p>
              <p className="mt-1 text-xs text-white/40">
                Products
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold">500+</p>
              <p className="mt-1 text-xs text-white/40">
                Vendors
              </p>
            </div>

            <div>
              <p className="text-2xl font-semibold">50K+</p>
              <p className="mt-1 text-xs text-white/40">
                Customers
              </p>
            </div>
          </div>
        </motion.div>

        {/* 3D scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="relative -mx-10 mt-4 h-[500px] lg:-mr-20 lg:mt-0 lg:h-[650px]"
        >
          <div className="absolute inset-0 rounded-full bg-purple-500/10 blur-[100px]" />

          <HeroScene />
        </motion.div>
      </section>

      {/* Bottom glow */}
      <div className="pointer-events-none absolute bottom-0 left-1/2 h-40 w-[70%] -translate-x-1/2 rounded-full bg-white/[0.03] blur-[100px]" />
    <Category3D />
    <FeaturedProducts />
  </main>
  );
}
