"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Heart,
  Search,
  Share2,
  ShieldCheck,
  Sparkles,
  Star,
  Store,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import Link from "next/link";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  emoji: string;
  badge?: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Aero Runner X",
    category: "Footwear",
    price: 8499,
    oldPrice: 9999,
    rating: 4.9,
    reviews: 284,
    emoji: "👟",
    badge: "Best Seller",
  },
  {
    id: 2,
    name: "Aero Street Pro",
    category: "Footwear",
    price: 6999,
    rating: 4.7,
    reviews: 142,
    emoji: "🥾",
    badge: "New",
  },
  {
    id: 3,
    name: "Motion Core Tee",
    category: "Apparel",
    price: 2499,
    oldPrice: 2999,
    rating: 4.8,
    reviews: 97,
    emoji: "👕",
  },
  {
    id: 4,
    name: "Velocity Jacket",
    category: "Apparel",
    price: 5999,
    oldPrice: 7499,
    rating: 4.6,
    reviews: 76,
    emoji: "🧥",
  },
  {
    id: 5,
    name: "Aero Sport Pack",
    category: "Accessories",
    price: 3299,
    rating: 4.8,
    reviews: 119,
    emoji: "🎒",
  },
  {
    id: 6,
    name: "Run Pro Cap",
    category: "Accessories",
    price: 1299,
    rating: 4.5,
    reviews: 53,
    emoji: "🧢",
  },
];

const categories = [
  "All",
  "Footwear",
  "Apparel",
  "Accessories",
];

export default function VendorStorefront() {
  const [category, setCategory] =
    useState("All");

  const [search, setSearch] =
    useState("");

  const [following, setFollowing] =
    useState(false);

  const [sort, setSort] =
    useState("Featured");

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (product) => {
        const categoryMatch =
          category === "All" ||
          product.category === category;

        const searchMatch =
          product.name
            .toLowerCase()
            .includes(search.toLowerCase());

        return (
          categoryMatch && searchMatch
        );
      },
    );

    if (sort === "Price: Low") {
      result.sort(
        (a, b) => a.price - b.price,
      );
    }

    if (sort === "Price: High") {
      result.sort(
        (a, b) => b.price - a.price,
      );
    }

    if (sort === "Rating") {
      result.sort(
        (a, b) => b.rating - a.rating,
      );
    }

    return result;
  }, [category, search, sort]);

  return (
    <main className="min-h-screen bg-black pb-28 pt-20 text-white">

      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* BACK */}

        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25 transition hover:text-white"
        >
          <ArrowLeft size={12} />
          Marketplace
        </Link>

        {/* ================================= */}
        {/* 3D VENDOR HERO */}
        {/* ================================= */}

        <section className="relative min-h-[440px] overflow-hidden rounded-[3rem] border border-white/10 bg-white/[0.025]">

          {/* GRID */}

          <div
            className="absolute inset-0 opacity-[0.055]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          {/* GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.25, 1],
              opacity: [0.04, 0.12, 0.04],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
            }}
            className="absolute left-[-150px] top-[-200px] h-[500px] w-[500px] rounded-full bg-white blur-[150px]"
          />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
            }}
            className="absolute bottom-[-250px] right-[-100px] h-[500px] w-[500px] rounded-full bg-white blur-[160px] opacity-[0.06]"
          />

          <div className="relative z-10 grid min-h-[440px] items-center gap-12 px-7 py-12 md:grid-cols-[1fr_380px] md:px-14">

            {/* VENDOR INFO */}

            <div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-white/25">
                <Store size={12} />
                Official storefront
              </div>

              <div className="mt-7 flex items-center gap-4">

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-2xl text-black shadow-[0_15px_50px_rgba(255,255,255,.1)]">
                  A
                </div>

                <div>

                  <div className="flex items-center gap-2">

                    <h1 className="text-4xl font-black md:text-5xl">
                      Aero Labs
                    </h1>

                    <CheckCircle2
                      size={19}
                      fill="currentColor"
                      className="text-white"
                    />

                  </div>

                  <p className="mt-2 text-[9px] uppercase tracking-[0.25em] text-white/20">
                    Performance gear · Since 2019
                  </p>

                </div>

              </div>

              <p className="mt-7 max-w-xl text-sm leading-7 text-white/30">
                Designed for movement. Built for
                everyday performance. Discover
                premium footwear, apparel and
                accessories from Aero Labs.
              </p>

              {/* STATS */}

              <div className="mt-8 flex flex-wrap gap-7">

                <VendorStat
                  value="4.9"
                  label="Rating"
                  icon={<Star size={11} />}
                />

                <VendorStat
                  value="12.8K"
                  label="Followers"
                  icon={<Users size={11} />}
                />

                <VendorStat
                  value="98%"
                  label="Positive"
                  icon={
                    <ShieldCheck size={11} />
                  }
                />

              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex gap-2">

                <motion.button
                  whileTap={{
                    scale: 0.95,
                  }}
                  onClick={() =>
                    setFollowing(!following)
                  }
                  className={`flex items-center gap-2 rounded-xl px-5 py-3 text-[9px] font-bold ${
                    following
                      ? "border border-white/10 bg-white/[0.04] text-white"
                      : "bg-white text-black"
                  }`}
                >
                  <Heart
                    size={12}
                    fill={
                      following
                        ? "currentColor"
                        : "none"
                    }
                  />

                  {following
                    ? "Following"
                    : "Follow store"}
                </motion.button>

                <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-white/30 transition hover:bg-white/10 hover:text-white">
                  <Share2 size={13} />
                </button>

              </div>

            </div>

            {/* 3D STORE OBJECT */}

            <div className="relative flex items-center justify-center">

              <motion.div
                animate={{
                  rotateY: [0, 18, -18, 0],
                  rotateX: [0, -8, 8, 0],
                  y: [0, -15, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-64 w-64 items-center justify-center rounded-[4rem] border border-white/10 bg-white/[0.04] shadow-[0_40px_100px_rgba(255,255,255,.08)]"
                style={{
                  transformStyle:
                    "preserve-3d",
                }}
              >

                <div
                  className="absolute inset-8 rounded-[3rem] border border-white/10"
                  style={{
                    transform:
                      "translateZ(30px)",
                  }}
                />

                <div
                  className="absolute inset-16 flex items-center justify-center rounded-[2rem] bg-white text-6xl text-black"
                  style={{
                    transform:
                      "translateZ(55px)",
                  }}
                >
                  A
                </div>

                <Sparkles
                  className="absolute right-8 top-8 text-white/30"
                  size={18}
                  style={{
                    transform:
                      "translateZ(70px)",
                  }}
                />

              </motion.div>

              {/* FLOATING TAGS */}

              <FloatingTag
                text="Verified seller"
                className="left-0 top-8"
              />

              <FloatingTag
                text="4.9 ★"
                className="bottom-10 right-0"
              />

            </div>

          </div>

        </section>

        {/* ================================= */}
        {/* PRODUCT SECTION */}
        {/* ================================= */}

        <section className="mt-12">

          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">

            <div>

              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Aero Labs collection
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Shop products
              </h2>

            </div>

            {/* SEARCH + SORT */}

            <div className="flex gap-2">

              <div className="relative">

                <Search
                  size={13}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search store..."
                  className="w-48 rounded-xl border border-white/10 bg-white/[0.025] py-3 pl-9 pr-3 text-[9px] outline-none placeholder:text-white/15"
                />

              </div>

              <div className="relative">

                <select
                  value={sort}
                  onChange={(e) =>
                    setSort(e.target.value)
                  }
                  className="appearance-none rounded-xl border border-white/10 bg-black py-3 pl-3 pr-8 text-[9px] text-white/40 outline-none"
                >
                  <option>
                    Featured
                  </option>
                  <option>
                    Price: Low
                  </option>
                  <option>
                    Price: High
                  </option>
                  <option>
                    Rating
                  </option>
                </select>

                <ChevronDown
                  size={11}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/20"
                />

              </div>

            </div>

          </div>

          {/* CATEGORY TABS */}

          <div className="mt-7 flex gap-2 overflow-x-auto pb-1">

            {categories.map(
              (item) => (
                <button
                  key={item}
                  onClick={() =>
                    setCategory(item)
                  }
                  className={`whitespace-nowrap rounded-xl px-5 py-3 text-[9px] transition ${
                    category === item
                      ? "bg-white font-bold text-black"
                      : "border border-white/10 bg-white/[0.02] text-white/30 hover:text-white"
                  }`}
                >
                  {item}
                </button>
              ),
            )}

          </div>

          {/* PRODUCT GRID */}

          <motion.div
            layout
            className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >

            {filteredProducts.map(
              (product, index) => (
                <VendorProductCard
                  key={product.id}
                  product={product}
                  index={index}
                />
              ),
            )}

          </motion.div>

          {filteredProducts.length ===
            0 && (
            <div className="mt-6 rounded-[2rem] border border-dashed border-white/10 py-24 text-center">

              <Search
                size={30}
                className="mx-auto text-white/15"
              />

              <p className="mt-5 text-sm font-semibold">
                No products found
              </p>

              <p className="mt-2 text-[9px] text-white/20">
                Try another search or category.
              </p>

            </div>
          )}

        </section>

        {/* ================================= */}
        {/* STORE PROMISE */}
        {/* ================================= */}

        <section className="mt-14 grid gap-3 md:grid-cols-3">

          <PromiseCard
            icon={
              <ShieldCheck size={18} />
            }
            title="Verified seller"
            text="Every Aero Labs product is backed by Vendora seller verification."
          />

          <PromiseCard
            icon={<Truck size={18} />}
            title="Fast delivery"
            text="Reliable shipping with real-time order tracking."
          />

          <PromiseCard
            icon={
              <CheckCircle2 size={18} />
            }
            title="Quality guaranteed"
            text="Shop confidently with Vendora's customer protection."
          />

        </section>

      </div>

    </main>
  );
}

/* ================================= */
/* PRODUCT CARD */
/* ================================= */

function VendorProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const [liked, setLiked] =
    useState(false);

  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.06,
      }}
      whileHover={{
        y: -7,
      }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]"
    >

      {/* PRODUCT VISUAL */}

      <div className="relative flex h-72 items-center justify-center overflow-hidden">

        <motion.div
          whileHover={{
            rotateY: 18,
            rotateX: -8,
            scale: 1.08,
          }}
          transition={{
            type: "spring",
            stiffness: 220,
          }}
          className="flex h-44 w-44 items-center justify-center rounded-[3rem] bg-white text-7xl shadow-[0_30px_80px_rgba(255,255,255,.08)]"
          style={{
            transformStyle:
              "preserve-3d",
          }}
        >
          {product.emoji}
        </motion.div>

        {/* BADGE */}

        {product.badge && (
          <span className="absolute left-4 top-4 rounded-lg bg-white px-3 py-2 text-[7px] font-bold uppercase tracking-[0.15em] text-black">
            {product.badge}
          </span>
        )}

        {/* LIKE */}

        <button
          onClick={() =>
            setLiked(!liked)
          }
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-white/40 backdrop-blur-md transition hover:text-white"
        >
          <Heart
            size={14}
            fill={
              liked
                ? "currentColor"
                : "none"
            }
          />
        </button>

      </div>

      {/* INFO */}

      <div className="p-5">

        <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
          {product.category}
        </p>

        <h3 className="mt-2 font-semibold">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center gap-2">

          <div className="flex items-center gap-1">
            <Star
              size={11}
              fill="currentColor"
            />

            <span className="text-[9px]">
              {product.rating}
            </span>
          </div>

          <span className="text-[8px] text-white/20">
            ({product.reviews})
          </span>

        </div>

        <div className="mt-4 flex items-end justify-between">

          <div>

            <span className="text-lg font-black">
              ₹
              {product.price.toLocaleString(
                "en-IN",
              )}
            </span>

            {product.oldPrice && (
              <span className="ml-2 text-[9px] text-white/20 line-through">
                ₹
                {product.oldPrice.toLocaleString(
                  "en-IN",
                )}
              </span>
            )}

          </div>

          <Link
            href={`/product/${product.id}`}
            className="flex h-9 items-center gap-1 rounded-xl bg-white px-3 text-[8px] font-bold text-black transition group-hover:scale-105"
          >
            View
            <ChevronRight size={11} />
          </Link>

        </div>

      </div>

    </motion.article>
  );
}

/* ================================= */
/* STAT */
/* ================================= */

function VendorStat({
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

/* ================================= */
/* FLOATING TAG */
/* ================================= */

function FloatingTag({
  text,
  className,
}: {
  text: string;
  className: string;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -8, 0],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
      }}
      className={`absolute ${className} rounded-xl border border-white/10 bg-black/70 px-3 py-2 text-[8px] text-white/50 shadow-xl backdrop-blur-xl`}
    >
      {text}
    </motion.div>
  );
}

/* ================================= */
/* PROMISE CARD */
/* ================================= */

function PromiseCard({
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
        y: -4,
      }}
      className="rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-6"
    >

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
        {icon}
      </div>

      <h3 className="mt-5 text-sm font-bold">
        {title}
      </h3>

      <p className="mt-2 text-[9px] leading-5 text-white/20">
        {text}
      </p>

    </motion.div>
  );
}

/* Needed for the PromiseCard Truck icon */
function Truck({
  size,
}: {
  size: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10 17h4V5H2v12h2" />
      <path d="M14 8h4l4 4v5h-2" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <circle cx="17.5" cy="17.5" r="2.5" />
    </svg>
  );
}