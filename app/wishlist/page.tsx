"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Heart,
  ShoppingBag,
  Star,
  Trash2,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};

const initialProducts: Product[] = [
  {
    id: 1,
    name: "Aero Runner X",
    category: "Footwear",
    price: 8499,
    rating: 4.8,
    image: "👟",
  },
  {
    id: 2,
    name: "Nova Pro Headphones",
    category: "Electronics",
    price: 12499,
    rating: 4.9,
    image: "🎧",
  },
  {
    id: 3,
    name: "Urban Core Backpack",
    category: "Bags",
    price: 4999,
    rating: 4.7,
    image: "🎒",
  },
  {
    id: 4,
    name: "Minimal One",
    category: "Accessories",
    price: 6999,
    rating: 4.6,
    image: "⌚",
  },
];

export default function WishlistPage() {
  const [products, setProducts] =
    useState<Product[]>(initialProducts);

  const [cart, setCart] = useState<number[]>([]);

  const removeProduct = (id: number) => {
    setProducts((current) =>
      current.filter(
        (product) => product.id !== id,
      ),
    );
  };

  const addToCart = (id: number) => {
    setCart((current) =>
      current.includes(id)
        ? current
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-black pb-28 pt-24 text-white">

      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* ================================= */}
        {/* HERO */}
        {/* ================================= */}

        <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-white/[0.025] px-7 py-14 md:px-14">

          {/* GRID */}

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          {/* GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.08, 0.16, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-[130px]"
          />

          <div className="relative z-10 grid items-center gap-10 md:grid-cols-[1fr_300px]">

            <div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-white/25">
                <Sparkles size={11} />
                Your collection
              </div>

              <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
                Wishlist
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/30">
                Keep the products you love close.
                Your saved collection is waiting for
                you.
              </p>

              <div className="mt-7 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                  <Heart size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {products.length}
                  </p>

                  <p className="text-[9px] text-white/25">
                    Saved products
                  </p>
                </div>

              </div>

            </div>

            {/* 3D HEART */}

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 15, -15, 0],
              }}
              transition={{
                duration: 5,
                repeat: Infinity,
              }}
              className="mx-auto flex h-52 w-52 items-center justify-center rounded-[3.5rem] bg-white text-black shadow-[0_30px_100px_rgba(255,255,255,.12)]"
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              <Heart
                size={90}
                strokeWidth={1}
                className="fill-black"
              />
            </motion.div>

          </div>
        </section>

        {/* ================================= */}
        {/* COLLECTION HEADER */}
        {/* ================================= */}

        <section className="mt-12">

          <div className="flex items-end justify-between">

            <div>
              <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                Saved for later
              </p>

              <h2 className="mt-3 text-3xl font-bold">
                Your picks
              </h2>
            </div>

            {products.length > 0 && (
              <span className="text-[9px] text-white/20">
                {products.length} items
              </span>
            )}

          </div>

          {/* ================================= */}
          {/* PRODUCT GRID */}
          {/* ================================= */}

          {products.length > 0 ? (
            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-4">

              <AnimatePresence mode="popLayout">

                {products.map(
                  (product, index) => (
                    <motion.article
                      key={product.id}
                      layout
                      initial={{
                        opacity: 0,
                        y: 30,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        scale: 0.7,
                        y: -20,
                      }}
                      transition={{
                        delay: index * 0.06,
                      }}
                      whileHover={{
                        y: -8,
                      }}
                      className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.025]"
                    >

                      {/* PRODUCT VISUAL */}

                      <div className="relative flex h-64 items-center justify-center overflow-hidden">

                        {/* orbit */}

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

                        {/* product */}

                        <motion.div
                          whileHover={{
                            scale: 1.15,
                            rotateY: 15,
                            rotateX: -8,
                          }}
                          className="relative z-10 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-white text-6xl shadow-2xl"
                          style={{
                            transformStyle:
                              "preserve-3d",
                          }}
                        >
                          {product.image}
                        </motion.div>

                        {/* heart */}

                        <button
                          onClick={() =>
                            removeProduct(
                              product.id,
                            )
                          }
                          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/60 backdrop-blur-xl transition hover:bg-white hover:text-black"
                          aria-label="Remove from wishlist"
                        >
                          <Heart
                            size={14}
                            className="fill-white"
                          />
                        </button>

                      </div>

                      {/* INFO */}

                      <div className="p-4">

                        <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                          {product.category}
                        </p>

                        <h3 className="mt-2 text-xs font-semibold">
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

                        {/* ACTIONS */}

                        <div className="mt-4 flex gap-2">

                          <button
                            onClick={() =>
                              addToCart(
                                product.id,
                              )
                            }
                            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[9px] font-bold text-black transition hover:scale-[1.02]"
                          >
                            <ShoppingBag
                              size={11}
                            />

                            {cart.includes(
                              product.id,
                            )
                              ? "Added"
                              : "Add to cart"}
                          </button>

                          <button
                            onClick={() =>
                              removeProduct(
                                product.id,
                              )
                            }
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-white/30 transition hover:border-red-400/30 hover:text-red-300"
                            aria-label="Delete"
                          >
                            <Trash2 size={12} />
                          </button>

                        </div>

                      </div>
                    </motion.article>
                  ),
                )}

              </AnimatePresence>

            </div>
          ) : (
            /* ================================= */
            /* EMPTY STATE */
            /* ================================= */

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.96,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="mt-7 flex min-h-[430px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] px-6 text-center"
            >

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                }}
                className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03]"
              >
                <Heart
                  size={35}
                  strokeWidth={1}
                  className="text-white/25"
                />
              </motion.div>

              <h3 className="mt-7 text-xl font-bold">
                Your wishlist is empty
              </h3>

              <p className="mt-3 max-w-sm text-xs leading-6 text-white/25">
                Discover products you love and
                save them here for later.
              </p>

              <button className="mt-7 flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[10px] font-bold text-black">
                Explore products
                <ArrowRight size={13} />
              </button>

            </motion.div>
          )}

        </section>

        {/* ================================= */}
        {/* TRUST STRIP */}
        {/* ================================= */}

        <section className="mt-16 grid grid-cols-2 gap-3 md:grid-cols-4">

          <TrustItem
            title="Secure shopping"
            text="Protected checkout"
          />

          <TrustItem
            title="Easy returns"
            text="Simple return process"
          />

          <TrustItem
            title="Verified vendors"
            text="Trusted sellers"
          />

          <TrustItem
            title="Fast delivery"
            text="Track every order"
          />

        </section>

      </div>
    </main>
  );
}

function TrustItem({
  title,
  text,
}: {
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{
        y: -4,
      }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-5"
    >
      <div className="h-1.5 w-1.5 rounded-full bg-white" />

      <h3 className="mt-5 text-[11px] font-semibold">
        {title}
      </h3>

      <p className="mt-2 text-[9px] text-white/20">
        {text}
      </p>
    </motion.div>
  );
}