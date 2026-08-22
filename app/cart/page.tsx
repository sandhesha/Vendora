"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Trash2,
  Truck,
  ShieldCheck,
  Package,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { useAuth } from "@/lib/auth/auth-context";

type CartItem = {
  id: number;
  product_id: number;
  product_name: string;
  price: number;
  quantity: number;
  image_url?: string | null;
  stock?: number;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80";

export default function CartPage() {
  const { user } = useAuth();

  const [items, setItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  /*
   * LOAD CART
   *
   * Keep your existing backend cart API here if your current
   * implementation already has one.
   */
  useEffect(() => {
    async function loadCart() {
      try {
        setLoading(true);

        /*
         * Replace this section with your existing getCart()
         * API call if you already have one.
         */
        setItems([]);
      } catch (error) {
        console.error("Failed to load cart:", error);
      } finally {
        setLoading(false);
      }
    }

    if (user) {
      loadCart();
    } else {
      setLoading(false);
    }
  }, [user]);

  /*
   * TOTALS
   */
  const subtotal = useMemo(() => {
    return items.reduce(
      (total, item) =>
        total + Number(item.price) * item.quantity,
      0,
    );
  }, [items]);

  const delivery = subtotal >= 20000 || subtotal === 0 ? 0 : 499;

  const total = subtotal + delivery;

  /*
   * QUANTITY
   */
  const decreaseQuantity = (id: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity: Math.max(1, item.quantity - 1),
            }
          : item,
      ),
    );
  };

  const increaseQuantity = (id: number) => {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              quantity:
                item.stock && item.quantity >= item.stock
                  ? item.quantity
                  : item.quantity + 1,
            }
          : item,
      ),
    );
  };

  /*
   * REMOVE
   */
  const removeItem = (id: number) => {
    setItems((current) =>
      current.filter((item) => item.id !== id),
    );
  };

  /*
   * NOT LOGGED IN
   */
  if (!user) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#f7f8fa] px-5 pb-24 pt-32 text-slate-900 md:px-8">

        {/* BACKGROUND 3D OBJECTS */}
        <FloatingOrb
          className="left-[5%] top-[18%]"
          size="h-24 w-24"
          delay={0}
        />

        <FloatingOrb
          className="right-[8%] top-[35%]"
          size="h-16 w-16"
          delay={1.5}
        />

        <div className="relative z-10 mx-auto flex min-h-[65vh] max-w-xl flex-col items-center justify-center text-center">

          <motion.div
            initial={{ opacity: 0, scale: 0.7, rotateX: 25 }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateX: 0,
              y: [0, -10, 0],
            }}
            transition={{
              duration: 0.8,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            className="mb-8 flex h-28 w-28 items-center justify-center rounded-[2rem] border border-white bg-white shadow-[0_30px_80px_rgba(15,23,42,0.12)]"
            style={{ transformStyle: "preserve-3d" }}
          >
            <ShoppingBag size={46} strokeWidth={1.4} />
          </motion.div>

          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            Vendora Cart
          </p>

          <h1 className="text-4xl font-bold tracking-tight md:text-5xl">
            Your cart is waiting.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
            Sign in to access your cart and continue
            shopping from Vendora vendors.
          </p>

          <Link
            href="/auth/login"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
          >
            Sign in
            <ArrowRight size={16} />
          </Link>
        </div>
      </main>
    );
  }

  /*
   * LOADING
   */
  if (loading) {
    return (
      <main className="min-h-screen bg-[#f7f8fa] px-5 pb-24 pt-32 md:px-8">
        <div className="mx-auto max-w-7xl">

          <div className="animate-pulse">

            <div className="h-4 w-28 rounded bg-slate-200" />

            <div className="mt-5 h-12 w-64 rounded-xl bg-slate-200" />

            <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_380px]">

              <div className="space-y-4">
                {[1, 2, 3].map((item) => (
                  <div
                    key={item}
                    className="h-40 rounded-[2rem] bg-white shadow-sm"
                  />
                ))}
              </div>

              <div className="h-80 rounded-[2rem] bg-white shadow-sm" />
            </div>

          </div>
        </div>
      </main>
    );
  }

  /*
   * EMPTY CART
   */
  if (items.length === 0) {
    return (
      <main className="relative min-h-screen overflow-hidden bg-[#f7f8fa] px-5 pb-24 pt-32 text-slate-900 md:px-8">

        {/* 3D BACKGROUND */}
        <FloatingOrb
          className="left-[8%] top-[20%]"
          size="h-28 w-28"
          delay={0}
        />

        <FloatingOrb
          className="right-[10%] top-[25%]"
          size="h-20 w-20"
          delay={1.2}
        />

        <FloatingCube
          className="right-[18%] bottom-[20%]"
          delay={0.8}
        />

        <div className="relative z-10 mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center text-center">

          {/* FLOATING BAG */}
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.6,
              rotateY: -25,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              rotateY: 0,
              y: [0, -14, 0],
            }}
            transition={{
              duration: 0.8,
              y: {
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              },
            }}
            whileHover={{
              rotateY: 15,
              rotateX: -8,
              scale: 1.06,
            }}
            className="relative mb-9 flex h-36 w-36 items-center justify-center rounded-[2.5rem] border border-white bg-white shadow-[0_35px_90px_rgba(15,23,42,0.14)]"
            style={{
              transformStyle: "preserve-3d",
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{
                duration: 15,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute inset-[-18px] rounded-full border border-dashed border-slate-200"
            />

            <ShoppingBag
              size={55}
              strokeWidth={1.2}
              className="text-slate-700"
            />

            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.6, 0.3],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="absolute inset-5 -z-10 rounded-full bg-slate-300 blur-2xl"
            />
          </motion.div>

          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
            <Sparkles size={13} />
            Vendora Marketplace
          </div>

          <h1 className="mt-4 text-4xl font-bold tracking-tight md:text-5xl">
            Your cart is empty.
          </h1>

          <p className="mt-4 max-w-md text-sm leading-7 text-slate-500">
            Discover something you love and bring it
            into your Vendora cart.
          </p>

          <Link
            href="/products"
            className="group mt-8 flex items-center gap-3 rounded-2xl bg-slate-950 px-7 py-4 text-sm font-semibold text-white shadow-xl transition hover:-translate-y-1 hover:shadow-2xl"
          >
            Explore products

            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
            >
              <ArrowRight size={16} />
            </motion.span>
          </Link>
        </div>
      </main>
    );
  }

  /*
   * CART
   */
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f8fa] px-5 pb-28 pt-32 text-slate-900 md:px-8">

      {/* AMBIENT 3D OBJECTS */}
      <FloatingOrb
        className="left-[2%] top-[15%]"
        size="h-20 w-20"
        delay={0}
      />

      <FloatingOrb
        className="right-[4%] top-[20%]"
        size="h-28 w-28"
        delay={1.2}
      />

      <FloatingCube
        className="right-[6%] bottom-[15%]"
        delay={0.5}
      />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* HEADER */}
        <motion.section
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <Link
            href="/products"
            className="mb-6 inline-flex items-center gap-2 text-xs font-medium text-slate-400 transition hover:text-slate-900"
          >
            <ArrowLeft size={14} />
            Continue shopping
          </Link>

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-slate-400">
                <Sparkles size={13} />
                Vendora Marketplace
              </div>

              <h1 className="mt-3 text-4xl font-bold tracking-tight md:text-6xl">
                Your cart
              </h1>

              <p className="mt-3 text-sm text-slate-500">
                {items.length}{" "}
                {items.length === 1 ? "item" : "items"}{" "}
                ready for checkout.
              </p>

            </div>

            {/* CART COUNT 3D */}
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white bg-white text-lg font-bold shadow-[0_15px_40px_rgba(15,23,42,0.08)]"
            >
              {items.length}
            </motion.div>

          </div>
        </motion.section>

        {/* CONTENT */}
        <div className="grid gap-8 lg:grid-cols-[1fr_390px]">

          {/* ITEMS */}
          <section className="space-y-4">

            <AnimatePresence mode="popLayout">

              {items.map((item, index) => (

                <motion.article
                  key={item.id}
                  layout
                  initial={{
                    opacity: 0,
                    y: 25,
                    scale: 0.97,
                  }}
                  animate={{
                    opacity: 1,
                    y: 0,
                    scale: 1,
                  }}
                  exit={{
                    opacity: 0,
                    x: -30,
                    scale: 0.95,
                  }}
                  transition={{
                    delay: index * 0.06,
                  }}
                  whileHover={{
                    y: -4,
                  }}
                  className="group relative overflow-hidden rounded-[2rem] border border-white bg-white p-4 shadow-[0_12px_40px_rgba(15,23,42,0.05)]"
                >

                  <div className="flex flex-col gap-5 sm:flex-row">

                    {/* IMAGE */}
                    <Link
                      href={`/products/${item.product_id}`}
                      className="relative shrink-0"
                    >
                      <motion.div
                        whileHover={{
                          scale: 1.04,
                          rotateY: 5,
                        }}
                        className="relative h-36 w-full overflow-hidden rounded-[1.5rem] bg-slate-100 sm:h-36 sm:w-36"
                        style={{
                          transformStyle: "preserve-3d",
                        }}
                      >

                        <img
                          src={
                            item.image_url ||
                            FALLBACK_IMAGE
                          }
                          alt={item.product_name}
                          className="h-full w-full object-contain p-5 mix-blend-multiply"
                        />

                        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent" />

                      </motion.div>
                    </Link>

                    {/* DETAILS */}
                    <div className="flex min-w-0 flex-1 flex-col justify-between py-1">

                      <div>

                        <div className="flex items-start justify-between gap-4">

                          <div>
                            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-slate-400">
                              Vendora Product
                            </p>

                            <Link
                              href={`/products/${item.product_id}`}
                              className="mt-2 block"
                            >
                              <h2 className="line-clamp-2 text-lg font-bold transition hover:text-slate-500">
                                {item.product_name}
                              </h2>
                            </Link>
                          </div>

                          {/* REMOVE */}
                          <motion.button
                            type="button"
                            whileHover={{
                              scale: 1.08,
                              rotate: 5,
                            }}
                            whileTap={{
                              scale: 0.9,
                            }}
                            onClick={() =>
                              removeItem(item.id)
                            }
                            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-slate-300 transition hover:bg-red-50 hover:text-red-500"
                            aria-label="Remove item"
                          >
                            <Trash2 size={16} />
                          </motion.button>

                        </div>

                        <p className="mt-3 text-xl font-bold">
                          ₹
                          {Number(
                            item.price,
                          ).toLocaleString("en-IN")}
                        </p>

                      </div>

                      {/* BOTTOM */}
                      <div className="mt-5 flex flex-wrap items-center justify-between gap-4">

                        {/* QUANTITY */}
                        <div className="flex items-center overflow-hidden rounded-xl border border-slate-200 bg-slate-50">

                          <button
                            type="button"
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            disabled={
                              item.quantity <= 1
                            }
                            className="flex h-10 w-10 items-center justify-center text-slate-400 transition hover:bg-white hover:text-slate-900 disabled:opacity-30"
                          >
                            <Minus size={14} />
                          </button>

                          <span className="w-10 text-center text-xs font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            disabled={
                              !!item.stock &&
                              item.quantity >=
                                item.stock
                            }
                            className="flex h-10 w-10 items-center justify-center text-slate-400 transition hover:bg-white hover:text-slate-900 disabled:opacity-30"
                          >
                            <Plus size={14} />
                          </button>

                        </div>

                        {/* ITEM TOTAL */}
                        <div className="text-right">

                          <p className="text-[10px] uppercase tracking-wider text-slate-400">
                            Item total
                          </p>

                          <p className="mt-1 text-sm font-bold">
                            ₹
                            {(
                              Number(item.price) *
                              item.quantity
                            ).toLocaleString("en-IN")}
                          </p>

                        </div>

                      </div>

                    </div>
                  </div>

                  {/* ANTIGRAVITY LIGHT */}
                  <motion.div
                    animate={{
                      x: ["-100%", "200%"],
                    }}
                    transition={{
                      duration: 5,
                      repeat: Infinity,
                      repeatDelay: 4,
                    }}
                    className="pointer-events-none absolute bottom-0 left-0 h-px w-1/3 bg-slate-300 blur-sm"
                  />

                </motion.article>

              ))}

            </AnimatePresence>

          </section>

          {/* SUMMARY */}
          <aside>

            <motion.div
              initial={{
                opacity: 0,
                x: 30,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
              className="sticky top-28 overflow-hidden rounded-[2rem] border border-white bg-white p-6 shadow-[0_20px_70px_rgba(15,23,42,0.08)]"
            >

              {/* 3D HEADER */}
              <div className="relative mb-7 overflow-hidden rounded-[1.5rem] bg-slate-950 p-5 text-white">

                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute -right-10 -top-16 h-40 w-40 rounded-full border border-white/10"
                />

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="relative z-10"
                >
                  <Package
                    size={22}
                    strokeWidth={1.5}
                  />

                  <p className="mt-4 text-xs text-white/40">
                    Vendora checkout
                  </p>

                  <h2 className="mt-1 text-xl font-bold">
                    Order summary
                  </h2>
                </motion.div>

              </div>

              {/* PRICE */}
              <div className="space-y-4">

                <SummaryRow
                  label="Subtotal"
                  value={`₹${subtotal.toLocaleString(
                    "en-IN",
                  )}`}
                />

                <SummaryRow
                  label="Delivery"
                  value={
                    delivery === 0
                      ? "FREE"
                      : `₹${delivery.toLocaleString(
                          "en-IN",
                        )}`
                  }
                />

                <div className="h-px bg-slate-100" />

                <div className="flex items-end justify-between">

                  <span className="text-sm font-semibold">
                    Total
                  </span>

                  <span className="text-2xl font-bold">
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                </div>

              </div>

              {/* CHECKOUT */}
              <Link
                href="/checkout"
                className="group mt-7 flex min-h-[56px] items-center justify-center gap-3 rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                Proceed to checkout

                <motion.span
                  animate={{
                    x: [0, 4, 0],
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                  }}
                >
                  <ArrowRight size={16} />
                </motion.span>
              </Link>

              {/* FEATURES */}
              <div className="mt-6 space-y-3">

                <MiniFeature
                  icon={Truck}
                  title="Fast delivery"
                  text="Reliable vendor shipping"
                />

                <MiniFeature
                  icon={ShieldCheck}
                  title="Secure checkout"
                  text="Protected marketplace purchase"
                />

                <MiniFeature
                  icon={Check}
                  title="Verified vendors"
                  text="Shop with confidence"
                />

              </div>

              {/* FREE DELIVERY MESSAGE */}
              {subtotal < 20000 && (
                <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                  <p className="text-xs font-semibold">
                    You're ₹
                    {(
                      20000 - subtotal
                    ).toLocaleString(
                      "en-IN",
                    )}{" "}
                    away from free delivery.
                  </p>

                  <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-slate-200">

                    <motion.div
                      initial={{ width: 0 }}
                      animate={{
                        width: `${Math.min(
                          100,
                          (subtotal /
                            20000) *
                            100,
                        )}%`,
                      }}
                      transition={{
                        duration: 1,
                      }}
                      className="h-full rounded-full bg-slate-950"
                    />

                  </div>

                </div>
              )}

              {subtotal >= 20000 && (
                <motion.div
                  initial={{
                    opacity: 0,
                    scale: 0.95,
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                  }}
                  className="mt-6 flex items-center gap-2 rounded-2xl bg-slate-50 p-4 text-xs font-semibold"
                >
                  <Check size={15} />
                  You've unlocked free delivery.
                </motion.div>
              )}

            </motion.div>

          </aside>

        </div>

      </div>
    </main>
  );
}

/*
 * SUMMARY ROW
 */
function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className="text-slate-500">
        {label}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}

/*
 * SMALL FEATURE
 */
function MiniFeature({
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
      whileHover={{ x: 3 }}
      className="flex items-center gap-3"
    >
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50">
        <Icon
          size={15}
          strokeWidth={1.6}
        />
      </div>

      <div>
        <p className="text-[11px] font-semibold">
          {title}
        </p>

        <p className="mt-0.5 text-[10px] text-slate-400">
          {text}
        </p>
      </div>
    </motion.div>
  );
}

/*
 * FLOATING 3D ORB
 */
function FloatingOrb({
  className,
  size,
  delay,
}: {
  className: string;
  size: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -22, 0],
        x: [0, 8, 0],
        rotate: [0, 8, 0],
      }}
      transition={{
        duration: 6,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute ${className} ${size} rounded-full border border-white bg-gradient-to-br from-white via-slate-100 to-slate-200 opacity-70 shadow-[0_30px_80px_rgba(15,23,42,0.12)]`}
    >
      <div className="absolute left-1/4 top-1/4 h-1/3 w-1/3 rounded-full bg-white blur-md" />
    </motion.div>
  );
}

/*
 * FLOATING 3D CUBE
 */
function FloatingCube({
  className,
  delay,
}: {
  className: string;
  delay: number;
}) {
  return (
    <motion.div
      animate={{
        y: [0, -18, 0],
        rotateX: [0, 12, 0],
        rotateY: [0, 20, 0],
        rotateZ: [0, 5, 0],
      }}
      transition={{
        duration: 7,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
      className={`pointer-events-none absolute ${className} h-14 w-14 rounded-2xl border border-white bg-white shadow-[0_25px_60px_rgba(15,23,42,0.1)]`}
      style={{
        transformStyle: "preserve-3d",
      }}
    >
      <div className="absolute inset-2 rounded-xl bg-slate-100" />
    </motion.div>
  );
}