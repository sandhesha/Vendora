"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Shirt,
  Smartphone,
  Home,
  Sparkles,
  Trophy,
  ShoppingBasket,
  BookOpen,
  Folder,
} from "lucide-react";

interface Category {
  id: number;
  name: string;
  description?: string | null;
  is_active: boolean;
  slug?: string | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

const icons = [
  Smartphone,
  Shirt,
  Home,
  Sparkles,
  Trophy,
  ShoppingBasket,
  BookOpen,
];

export default function Category3D() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCategories() {
      try {
        const response = await fetch(
          `${API_URL}/categories`,
          {
            headers: {
              Accept: "application/json",
            },
          },
        );

        if (!response.ok) {
          throw new Error(
            `Categories request failed: ${response.status}`,
          );
        }

        const data = (await response.json()) as Category[];

        setCategories(
          data.filter(
            (category) => category.is_active,
          ),
        );
      } catch (error) {
        console.error(
          "Failed to load categories:",
          error,
        );
      } finally {
        setLoading(false);
      }
    }

    loadCategories();
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-24">

      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-purple-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
            Explore
          </p>

          <h2 className="text-4xl font-bold tracking-tight text-white md:text-6xl">
            Shop by{" "}
            <span className="text-white/40">
              Category
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-white/50">
            Explore products from multiple vendors
            across every category.
          </p>
        </motion.div>

        {/* Loading */}
        {loading && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-7">
            {Array.from({ length: 7 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-56 animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
                />
              ),
            )}
          </div>
        )}

        {/* Database Categories */}
        {!loading && categories.length > 0 && (
          <div className="grid grid-cols-2 gap-5 md:grid-cols-3 lg:grid-cols-7">

            {categories.map(
              (category, index) => {

                const Icon =
                  icons[index % icons.length];

                const slug =
                  category.slug ||
                  category.name
                    .toLowerCase()
                    .trim()
                    .replace(/&/g, "and")
                    .replace(/\s+/g, "-")
                    .replace(
                      /[^a-z0-9-]/g,
                      "",
                    );

                return (
                  <Link
                    key={category.id}
                    href={`/categories/${slug}`}
                  >

                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 50,
                      }}
                      whileInView={{
                        opacity: 1,
                        y: 0,
                      }}
                      viewport={{
                        once: true,
                      }}
                      transition={{
                        duration: 0.6,
                        delay:
                          index * 0.08,
                      }}
                      whileHover={{
                        y: -14,
                        rotateX: 8,
                        rotateY: -8,
                        scale: 1.04,
                      }}
                      whileTap={{
                        scale: 0.96,
                      }}
                      style={{
                        transformStyle:
                          "preserve-3d",
                        perspective: 1000,
                      }}
                      className="group relative h-56 cursor-pointer rounded-3xl border border-white/10 bg-white/[0.04] p-5 backdrop-blur-xl transition-colors hover:border-white/20 hover:bg-white/[0.08]"
                    >

                      {/* Glow */}
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
                        style={{
                          transformStyle:
                            "preserve-3d",
                        }}
                        className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-black shadow-xl"
                      >
                        <Icon
                          size={25}
                          strokeWidth={1.8}
                        />
                      </motion.div>

                      {/* Content */}
                      <div
                        className="relative mt-8"
                        style={{
                          transform:
                            "translateZ(20px)",
                        }}
                      >
                        <h3 className="text-lg font-semibold text-white">
                          {category.name}
                        </h3>

                        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-white/40">
                          {category.description ||
                            "Explore products in this category"}
                        </p>
                      </div>

                      {/* Number */}
                      <span className="absolute bottom-4 right-5 text-xs text-white/20">
                        {String(
                          index + 1,
                        ).padStart(2, "0")}
                      </span>

                      {/* Arrow */}
                      <span className="absolute bottom-4 left-5 text-white/60 opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100">
                        →
                      </span>

                    </motion.div>

                  </Link>
                );
              },
            )}

          </div>
        )}

        {/* Empty */}
        {!loading &&
          categories.length === 0 && (
            <div className="py-16 text-center">
              <Folder
                size={40}
                className="mx-auto mb-4 text-white/30"
              />

              <p className="text-white/50">
                No categories available.
              </p>
            </div>
          )}

      </div>
    </section>
  );
}