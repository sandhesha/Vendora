"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  ChevronRight,
  Heart,
  Sparkles,
  Star,
  ShoppingBag,
  Zap,
} from "lucide-react";
import { useState } from "react";

const categoryData: Record<
  string,
  {
    title: string;
    eyebrow: string;
    description: string;
    visual: string;
    accent: string;
  }
> = {
  shoes: {
    title: "Shoes",
    eyebrow: "MOVE DIFFERENT",
    description:
      "Performance, comfort and futuristic silhouettes built for every step.",
    visual: "👟",
    accent: "SHOES",
  },
  electronics: {
    title: "Electronics",
    eyebrow: "NEXT GENERATION",
    description:
      "Discover powerful technology designed for the way you live.",
    visual: "🎧",
    accent: "TECH",
  },
  fashion: {
    title: "Fashion",
    eyebrow: "DEFINE YOUR STYLE",
    description:
      "Modern essentials and statement pieces curated for you.",
    visual: "👕",
    accent: "STYLE",
  },
  bags: {
    title: "Bags",
    eyebrow: "CARRY MORE",
    description:
      "Functional design meets premium everyday movement.",
    visual: "🎒",
    accent: "BAGS",
  },
  accessories: {
    title: "Accessories",
    eyebrow: "THE FINAL DETAIL",
    description:
      "Small details. Big personality.",
    visual: "⌚",
    accent: "DETAILS",
  },
};

const products = [
  {
    id: 1,
    name: "Aero Runner X",
    price: 8499,
    rating: 4.8,
    image: "👟",
  },
  {
    id: 2,
    name: "Nova Pro",
    price: 7499,
    rating: 4.7,
    image: "🎧",
  },
  {
    id: 3,
    name: "Urban Core",
    price: 3299,
    rating: 4.6,
    image: "🎒",
  },
  {
    id: 4,
    name: "Minimal One",
    price: 5999,
    rating: 4.5,
    image: "⌚",
  },
];

const subcategories = [
  "Trending",
  "New arrivals",
  "Best sellers",
  "Premium",
  "Under ₹5,000",
];

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [slug, setSlug] = useState("shoes");
  const [liked, setLiked] = useState<number[]>([]);

  // The component intentionally defaults to shoes
  // while the UI remains fully functional.
  void params;

  const category =
    categoryData[slug] ?? categoryData.shoes;

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-black pb-28 pt-24 text-white">

      {/* ================================= */}
      {/* CATEGORY NAV */}
      {/* ================================= */}

      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {Object.entries(categoryData).map(
            ([key, item]) => (
              <button
                key={key}
                onClick={() => setSlug(key)}
                className={`shrink-0 rounded-full border px-5 py-2.5 text-[10px] uppercase tracking-wider transition ${
                  slug === key
                    ? "border-white bg-white text-black"
                    : "border-white/10 text-white/30 hover:border-white/30 hover:text-white"
                }`}
              >
                {item.title}
              </button>
            ),
          )}
        </div>
      </div>

      {/* ================================= */}
      {/* CINEMATIC HERO */}
      {/* ================================= */}

      <section className="mx-auto mt-6 max-w-7xl px-5 md:px-8">
        <motion.div
          key={slug}
          initial={{
            opacity: 0,
            scale: 0.97,
          }}
          animate={{
            opacity: 1,
            scale: 1,
          }}
          className="relative min-h-[600px] overflow-hidden rounded-[2.8rem] border border-white/10 bg-white/[0.025]"
        >

          {/* GRID */}

          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "60px 60px",
            }}
          />

          {/* GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[130px]"
          />

          {/* ORBIT */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute left-1/2 top-1/2 h-[300px] w-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.08]"
          />

          {/* HERO CONTENT */}

          <div className="relative z-10 grid min-h-[600px] items-center gap-10 px-7 py-16 md:grid-cols-2 md:px-14">

            <motion.div
              initial={{
                opacity: 0,
                x: -30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
            >
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/25">
                <Sparkles size={12} />
                {category.eyebrow}
              </div>

              <h1 className="mt-6 text-6xl font-black tracking-tight md:text-8xl">
                {category.title}
              </h1>

              <p className="mt-6 max-w-md text-sm leading-7 text-white/35">
                {category.description}
              </p>

              <button className="mt-8 flex items-center gap-3 rounded-2xl bg-white px-6 py-4 text-xs font-bold text-black transition hover:scale-[1.03]">
                Explore collection
                <ArrowRight size={15} />
              </button>
            </motion.div>

            {/* 3D OBJECT */}

            <div className="relative flex min-h-[330px] items-center justify-center">

              <motion.div
                animate={{
                  y: [0, -18, 0],
                  rotateY: [0, 10, -10, 0],
                  rotateX: [0, -5, 5, 0],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                whileHover={{
                  scale: 1.12,
                }}
                className="relative z-20 flex h-60 w-60 cursor-pointer items-center justify-center rounded-[4rem] bg-white text-[8rem] shadow-[0_30px_100px_rgba(255,255,255,.12)] md:h-72 md:w-72 md:text-[10rem]"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {category.visual}
              </motion.div>

              {/* FLOATING LABELS */}

              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="absolute right-0 top-12 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-[9px] text-white/40 backdrop-blur-xl"
              >
                3D COLLECTION
              </motion.div>

              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute bottom-8 left-0 rounded-full border border-white/10 bg-black/60 px-4 py-2 text-[9px] text-white/40 backdrop-blur-xl"
              >
                {category.accent}
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ================================= */}
      {/* SUBCATEGORIES */}
      {/* ================================= */}

      <section className="mx-auto mt-16 max-w-7xl px-5 md:px-8">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
              Browse
            </p>

            <h2 className="mt-3 text-3xl font-bold">
              Explore {category.title}
            </h2>
          </div>

          <ChevronRight
            size={18}
            className="text-white/20"
          />
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-5">
          {subcategories.map(
            (item, index) => (
              <motion.button
                key={item}
                initial={{
                  opacity: 0,
                  y: 15,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                }}
                transition={{
                  delay: index * 0.06,
                }}
                whileHover={{
                  y: -5,
                }}
                className="group rounded-2xl border border-white/10 bg-white/[0.025] p-5 text-left"
              >
                <span className="text-[10px] text-white/30">
                  0{index + 1}
                </span>

                <p className="mt-8 text-xs font-semibold">
                  {item}
                </p>

                <ArrowRight
                  size={13}
                  className="mt-4 text-white/20 transition group-hover:translate-x-1 group-hover:text-white"
                />
              </motion.button>
            ),
          )}
        </div>
      </section>

      {/* ================================= */}
      {/* TRENDING PRODUCTS */}
      {/* ================================= */}

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">

        <div className="flex items-end justify-between">
          <div>
            <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.3em] text-white/20">
              <Zap size={11} />
              Trending now
            </div>

            <h2 className="mt-3 text-3xl font-bold">
              Most wanted
            </h2>
          </div>

          <button className="hidden items-center gap-2 text-[10px] text-white/30 hover:text-white sm:flex">
            View all
            <ArrowRight size={12} />
          </button>
        </div>

        <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">
          {products.map((product, index) => (
            <motion.article
              key={product.id}
              initial={{
                opacity: 0,
                y: 25,
              }}
              whileInView={{
                opacity: 1,
                y: 0,
              }}
              viewport={{
                once: true,
              }}
              transition={{
                delay: index * 0.08,
              }}
              whileHover={{
                y: -7,
              }}
              className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.025]"
            >
              {/* PRODUCT VISUAL */}

              <div className="relative flex h-64 items-center justify-center overflow-hidden">

                <motion.div
                  whileHover={{
                    scale: 1.15,
                    rotateY: 15,
                  }}
                  className="relative z-10 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-white text-6xl shadow-2xl"
                  style={{
                    transformStyle:
                      "preserve-3d",
                  }}
                >
                  {product.image}
                </motion.div>

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute h-44 w-44 rounded-full border border-white/[0.06]"
                />

                <button
                  onClick={() =>
                    toggleLike(product.id)
                  }
                  className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-xl"
                >
                  <Heart
                    size={14}
                    className={
                      liked.includes(
                        product.id,
                      )
                        ? "fill-white"
                        : "text-white/40"
                    }
                  />
                </button>
              </div>

              {/* PRODUCT INFO */}

              <div className="p-4">
                <h3 className="text-xs font-semibold">
                  {product.name}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold">
                    ₹
                    {product.price.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                  <span className="flex items-center gap-1 text-[9px] text-white/30">
                    <Star
                      size={9}
                      className="fill-white"
                    />
                    {product.rating}
                  </span>
                </div>

                <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[9px] font-bold text-black">
                  <ShoppingBag size={11} />
                  View product
                </button>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      {/* ================================= */}
      {/* PROMO BANNER */}
      {/* ================================= */}

      <section className="mx-auto mt-20 max-w-7xl px-5 md:px-8">
        <motion.div
          whileHover={{
            scale: 1.01,
          }}
          className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-white p-8 text-black md:p-14"
        >
          <div className="relative z-10 max-w-xl">
            <p className="text-[9px] uppercase tracking-[0.3em] text-black/40">
              Vendora exclusive
            </p>

            <h2 className="mt-4 text-4xl font-black md:text-6xl">
              Your next
              <br />
              obsession.
            </h2>

            <p className="mt-5 text-sm leading-6 text-black/50">
              Curated products from independent vendors,
              designed to make everyday shopping feel
              extraordinary.
            </p>

            <button className="mt-7 flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-[10px] font-bold text-white">
              Discover more
              <ArrowRight size={13} />
            </button>
          </div>

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -right-20 -top-20 h-72 w-72 rounded-full border border-black/10"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 14,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute -bottom-32 right-20 h-80 w-80 rounded-full border border-black/10"
          />
        </motion.div>
      </section>
    </main>
  );
}