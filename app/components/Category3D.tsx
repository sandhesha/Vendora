"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shirt,
  Smartphone,
  Laptop,
  Headphones,
  Watch,
  ShoppingBag,
} from "lucide-react";

const categories = [
  {
    name: "Fashion",
    slug: "fashion",
    icon: Shirt,
    description: "Discover the latest styles",
  },
  {
    name: "Electronics",
    slug: "electronics",
    icon: Smartphone,
    description: "Smart tech for everyday life",
  },
  {
    name: "Laptops",
    slug: "laptops",
    icon: Laptop,
    description: "Power your productivity",
  },
  {
    name: "Audio",
    slug: "audio",
    icon: Headphones,
    description: "Experience every sound",
  },
  {
    name: "Watches",
    slug: "watches",
    icon: Watch,
    description: "Time meets style",
  },
  {
    name: "Accessories",
    slug: "accessories",
    icon: ShoppingBag,
    description: "Complete your look",
  },
];

export default function Category3D() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
            Explore
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Shop by{" "}
            <span className="text-white/40">Category</span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-white/50">
            Explore products from multiple vendors across every category.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-6">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
              >
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: index * 0.08,
                  }}
                  whileHover={{
                    y: -14,
                    rotateX: 8,
                    rotateY: -8,
                    scale: 1.04,
                  }}
                  whileTap={{ scale: 0.96 }}
                  style={{
                    transformStyle: "preserve-3d",
                    perspective: 1000,
                  }}
                  className="group relative h-56 cursor-pointer rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                >
                  {/* Floating glow */}
                  <motion.div
                    className="absolute inset-0 rounded-3xl bg-white/[0.03] opacity-0 blur-xl transition-opacity group-hover:opacity-100"
                  />

                  {/* Icon */}
                  <motion.div
                    whileHover={{
                      rotate: 12,
                      z: 30,
                      scale: 1.15,
                    }}
                    style={{ transformStyle: "preserve-3d" }}
                    className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-xl"
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </motion.div>

                  {/* Content */}
                  <div
                    className="relative mt-8"
                    style={{
                      transform: "translateZ(20px)",
                    }}
                  >
                    <h3 className="text-lg font-semibold text-white">
                      {category.name}
                    </h3>

                    <p className="mt-2 text-xs leading-relaxed text-white/40">
                      {category.description}
                    </p>
                  </div>

                  {/* Number */}
                  <span className="absolute bottom-4 right-5 text-xs text-white/20">
                    0{index + 1}
                  </span>

                  {/* Hover arrow */}
                  <motion.span
                    initial={{ opacity: 0, x: -5 }}
                    whileHover={{ opacity: 1, x: 0 }}
                    className="absolute bottom-4 left-5 text-white/60"
                  >
                    →
                  </motion.span>
                </motion.div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}