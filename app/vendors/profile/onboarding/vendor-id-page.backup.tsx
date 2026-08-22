"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  Heart,
  MapPin,
  Package,
  Share2,
  ShieldCheck,
  ShoppingBag,
  Star,
  Store,
  Truck,
  Users,
} from "lucide-react";
import { useState } from "react";

const products = [
  {
    id: 1,
    name: "Aero Runner X",
    category: "Performance",
    price: 8499,
    rating: 4.8,
    image: "👟",
  },
  {
    id: 2,
    name: "Aero Street One",
    category: "Lifestyle",
    price: 6799,
    rating: 4.7,
    image: "👞",
  },
  {
    id: 3,
    name: "Motion Pro",
    category: "Performance",
    price: 9299,
    rating: 4.9,
    image: "👟",
  },
  {
    id: 4,
    name: "Cloud Runner",
    category: "Lifestyle",
    price: 5999,
    rating: 4.6,
    image: "👟",
  },
  {
    id: 5,
    name: "Urban Flex",
    category: "Street",
    price: 4899,
    rating: 4.5,
    image: "👟",
  },
  {
    id: 6,
    name: "Velocity X",
    category: "Performance",
    price: 10999,
    rating: 4.9,
    image: "👟",
  },
];

const tabs = [
  "Products",
  "Reviews",
  "About",
  "Shipping",
];

export default function VendorStorefront() {
  const [activeTab, setActiveTab] =
    useState("Products");

  const [following, setFollowing] =
    useState(false);

  const [liked, setLiked] =
    useState<number[]>([]);

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id,
          )
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-black pb-28 pt-24 text-white">

      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* ================================= */}
        {/* STORE HERO */}
        {/* ================================= */}

        <motion.section
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="relative min-h-[480px] overflow-hidden rounded-[2.7rem] border border-white/10 bg-white/[0.025]"
        >

          {/* GRID */}

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

          {/* LARGE GLOW */}

          <motion.div
            animate={{
              scale: [1, 1.15, 1],
              opacity: [0.08, 0.16, 0.08],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
            }}
            className="absolute right-[-100px] top-[-120px] h-[500px] w-[500px] rounded-full bg-white blur-[130px]"
          />

          {/* ORBIT */}

          <motion.div
            animate={{
              rotate: 360,
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute right-20 top-1/2 hidden h-[390px] w-[390px] -translate-y-1/2 rounded-full border border-white/[0.06] md:block"
          />

          <motion.div
            animate={{
              rotate: -360,
            }}
            transition={{
              duration: 15,
              repeat: Infinity,
              ease: "linear",
            }}
            className="absolute right-32 top-1/2 hidden h-[270px] w-[270px] -translate-y-1/2 rounded-full border border-dashed border-white/[0.08] md:block"
          />

          <div className="relative z-10 flex min-h-[480px] items-center px-7 py-14 md:px-14">

            <div className="max-w-xl">

              {/* STORE ICON */}

              <motion.div
                whileHover={{
                  rotateY: 20,
                  rotateX: -10,
                  scale: 1.05,
                }}
                className="flex h-24 w-24 items-center justify-center rounded-[2rem] bg-white text-black shadow-2xl"
                style={{
                  transformStyle:
                    "preserve-3d",
                }}
              >
                <Store size={34} />
              </motion.div>

              <div className="mt-7 flex items-center gap-2">
                <span className="rounded-full bg-white/10 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-white/40">
                  Verified vendor
                </span>

                <Check
                  size={12}
                  className="rounded-full bg-white text-black"
                />
              </div>

              <h1 className="mt-4 text-5xl font-black tracking-tight md:text-7xl">
                Aero Labs
              </h1>

              <p className="mt-4 max-w-lg text-sm leading-7 text-white/35">
                Performance footwear engineered for
                movement, comfort and everyday adventure.
              </p>

              {/* STATS */}

              <div className="mt-7 flex flex-wrap gap-5">

                <Stat
                  icon={Star}
                  value="4.9"
                  label="Rating"
                />

                <Stat
                  icon={Users}
                  value="12.4K"
                  label="Followers"
                />

                <Stat
                  icon={Package}
                  value="184"
                  label="Products"
                />

              </div>

              {/* ACTIONS */}

              <div className="mt-8 flex flex-wrap gap-3">

                <motion.button
                  whileTap={{
                    scale: 0.96,
                  }}
                  onClick={() =>
                    setFollowing(!following)
                  }
                  className={`flex items-center gap-2 rounded-xl px-6 py-3 text-[10px] font-bold transition ${
                    following
                      ? "bg-white/10 text-white"
                      : "bg-white text-black"
                  }`}
                >
                  {following ? (
                    <>
                      <Check size={13} />
                      Following
                    </>
                  ) : (
                    <>
                      <Users size={13} />
                      Follow store
                    </>
                  )}
                </motion.button>

                <button className="flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-[10px] text-white/50 hover:border-white/25 hover:text-white">
                  <Share2 size={13} />
                  Share
                </button>

              </div>
            </div>

            {/* 3D PRODUCT */}

            <motion.div
              animate={{
                y: [0, -15, 0],
                rotateY: [0, 10, -10, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
              }}
              className="absolute right-24 top-1/2 hidden h-52 w-52 -translate-y-1/2 items-center justify-center rounded-[3.5rem] bg-white text-[7rem] shadow-[0_30px_100px_rgba(255,255,255,.12)] md:flex"
              style={{
                transformStyle:
                  "preserve-3d",
              }}
            >
              👟
            </motion.div>

          </div>
        </motion.section>

        {/* ================================= */}
        {/* STORE NAVIGATION */}
        {/* ================================= */}

        <div className="mt-7 flex gap-2 overflow-x-auto border-b border-white/10 pb-3">

          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() =>
                setActiveTab(tab)
              }
              className={`shrink-0 rounded-xl px-5 py-3 text-[10px] transition ${
                activeTab === tab
                  ? "bg-white text-black"
                  : "text-white/30 hover:text-white"
              }`}
            >
              {tab}
            </button>
          ))}

        </div>

        {/* ================================= */}
        {/* PRODUCTS */}
        {/* ================================= */}

        {activeTab === "Products" && (
          <section className="mt-10">

            <div className="flex items-end justify-between">

              <div>
                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Aero Labs collection
                </p>

                <h2 className="mt-3 text-3xl font-bold">
                  Latest products
                </h2>
              </div>

              <button className="hidden items-center gap-2 text-[10px] text-white/30 sm:flex">
                Sort
                <ArrowRight size={12} />
              </button>

            </div>

            <div className="mt-7 grid grid-cols-2 gap-3 md:grid-cols-3">

              {products.map(
                (product, index) => (
                  <motion.article
                    key={product.id}
                    initial={{
                      opacity: 0,
                      y: 20,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    transition={{
                      delay:
                        index * 0.05,
                    }}
                    whileHover={{
                      y: -7,
                    }}
                    className="group overflow-hidden rounded-[1.7rem] border border-white/10 bg-white/[0.025]"
                  >

                    {/* VISUAL */}

                    <div className="relative flex h-64 items-center justify-center overflow-hidden">

                      <motion.div
                        whileHover={{
                          scale: 1.15,
                          rotateY: 15,
                          rotateX: -5,
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
                          duration: 14,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="absolute h-44 w-44 rounded-full border border-white/[0.06]"
                      />

                      <button
                        onClick={() =>
                          toggleLike(
                            product.id,
                          )
                        }
                        className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-xl"
                      >
                        <Heart
                          size={14}
                          className={
                            liked.includes(
                              product.id,
                            )
                              ? "fill-white text-white"
                              : "text-white/40"
                          }
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

                      <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[9px] font-bold text-black">
                        <ShoppingBag size={11} />
                        View product
                      </button>

                    </div>
                  </motion.article>
                ),
              )}

            </div>
          </section>
        )}

        {/* ================================= */}
        {/* REVIEWS */}
        {/* ================================= */}

        {activeTab === "Reviews" && (
          <section className="mt-10">

            <h2 className="text-3xl font-bold">
              Customer reviews
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-2">

              {[
                {
                  name: "Arjun",
                  rating: 5,
                  text: "Excellent quality and very comfortable.",
                },
                {
                  name: "Meera",
                  rating: 5,
                  text: "The product looks even better in person.",
                },
                {
                  name: "Rahul",
                  rating: 4,
                  text: "Fast shipping and great packaging.",
                },
                {
                  name: "Ananya",
                  rating: 5,
                  text: "Definitely ordering from this store again.",
                },
              ].map((review) => (
                <motion.div
                  key={review.name}
                  whileHover={{
                    y: -4,
                  }}
                  className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
                >
                  <div className="flex items-center justify-between">

                    <p className="text-xs font-semibold">
                      {review.name}
                    </p>

                    <div className="flex gap-1">
                      {Array.from({
                        length: review.rating,
                      }).map((_, i) => (
                        <Star
                          key={i}
                          size={11}
                          className="fill-white"
                        />
                      ))}
                    </div>

                  </div>

                  <p className="mt-4 text-xs leading-6 text-white/30">
                    {review.text}
                  </p>

                </motion.div>
              ))}

            </div>
          </section>
        )}

        {/* ================================= */}
        {/* ABOUT */}
        {/* ================================= */}

        {activeTab === "About" && (
          <section className="mt-10 grid gap-5 md:grid-cols-2">

            <InfoCard
              icon={Store}
              title="About Aero Labs"
              text="A performance-focused independent vendor creating modern footwear for people who never stop moving."
            />

            <InfoCard
              icon={MapPin}
              title="Based in"
              text="Bengaluru, India"
            />

            <InfoCard
              icon={ShieldCheck}
              title="Verified vendor"
              text="Business information and seller identity have been verified."
            />

            <InfoCard
              icon={Users}
              title="Community"
              text="12,400+ customers and followers following the Aero Labs journey."
            />

          </section>
        )}

        {/* ================================= */}
        {/* SHIPPING */}
        {/* ================================= */}

        {activeTab === "Shipping" && (
          <section className="mt-10">

            <h2 className="text-3xl font-bold">
              Shipping & returns
            </h2>

            <div className="mt-7 grid gap-4 md:grid-cols-3">

              <ShippingCard
                icon={Truck}
                title="Fast delivery"
                text="Orders usually arrive within 3–6 business days."
              />

              <ShippingCard
                icon={Package}
                title="Secure packaging"
                text="Every order is carefully packed before dispatch."
              />

              <ShippingCard
                icon={ShieldCheck}
                title="Easy returns"
                text="Eligible products can be returned according to the seller policy."
              />

            </div>
          </section>
        )}

      </div>
    </main>
  );
}

/* ================================= */
/* COMPONENTS */
/* ================================= */

function Stat({
  icon: Icon,
  value,
  label,
}: {
  icon: typeof Star;
  value: string;
  label: string;
}) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={13} className="text-white/30" />

      <div>
        <p className="text-xs font-bold">
          {value}
        </p>

        <p className="text-[8px] text-white/20">
          {label}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Store;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
    >
      <Icon
        size={20}
        className="text-white/30"
      />

      <h3 className="mt-5 text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-6 text-white/30">
        {text}
      </p>
    </motion.div>
  );
}

function ShippingCard({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Truck;
  title: string;
  text: string;
}) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="rounded-2xl border border-white/10 bg-white/[0.025] p-6"
    >
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
        <Icon size={16} />
      </div>

      <h3 className="mt-5 text-sm font-semibold">
        {title}
      </h3>

      <p className="mt-3 text-xs leading-6 text-white/30">
        {text}
      </p>
    </motion.div>
  );
}