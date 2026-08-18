"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Check,
  ChevronDown,
  Minus,
  Plus,
  ShoppingBag,
  Sparkles,
  Tag,
  Trash2,
  Truck,
  ShieldCheck,
} from "lucide-react";
import { useMemo, useState } from "react";

type CartItem = {
  id: number;
  name: string;
  vendor: string;
  price: number;
  quantity: number;
  image: string;
};

const initialCart: CartItem[] = [
  {
    id: 1,
    name: "Aero Runner X",
    vendor: "Aero Labs",
    price: 8499,
    quantity: 1,
    image: "👟",
  },
  {
    id: 2,
    name: "Nova Pro",
    vendor: "Nova Tech",
    price: 12499,
    quantity: 1,
    image: "🎧",
  },
  {
    id: 3,
    name: "Urban Core",
    vendor: "Urban Supply",
    price: 4999,
    quantity: 2,
    image: "🎒",
  },
];

export default function CartPage() {
  const [items, setItems] =
    useState<CartItem[]>(initialCart);

  const [coupon, setCoupon] =
    useState("");

  const [couponApplied, setCouponApplied] =
    useState(false);

  const [couponOpen, setCouponOpen] =
    useState(false);

  const updateQuantity = (
    id: number,
    change: number,
  ) => {
    setItems((current) =>
      current
        .map((item) =>
          item.id === id
            ? {
                ...item,
                quantity: Math.max(
                  1,
                  item.quantity + change,
                ),
              }
            : item,
        ),
    );
  };

  const removeItem = (id: number) => {
    setItems((current) =>
      current.filter(
        (item) => item.id !== id,
      ),
    );
  };

  const subtotal = useMemo(
    () =>
      items.reduce(
        (total, item) =>
          total +
          item.price * item.quantity,
        0,
      ),
    [items],
  );

  const delivery =
    subtotal >= 2000 || subtotal === 0
      ? 0
      : 99;

  const discount = couponApplied
    ? Math.round(subtotal * 0.1)
    : 0;

  const total =
    subtotal + delivery - discount;

  return (
    <main className="min-h-screen bg-black pb-28 pt-24 text-white">

      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* ================================= */}
        {/* HERO */}
        {/* ================================= */}

        <section className="relative overflow-hidden rounded-[2.7rem] border border-white/10 bg-white/[0.025] px-7 py-14 md:px-14">

          <div
            className="absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
              backgroundSize: "55px 55px",
            }}
          />

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

          <div className="relative z-10 grid items-center gap-12 md:grid-cols-[1fr_300px]">

            <div>

              <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.35em] text-white/25">
                <Sparkles size={11} />
                Shopping bag
              </div>

              <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
                Your Cart
              </h1>

              <p className="mt-5 max-w-lg text-sm leading-7 text-white/30">
                Everything you've selected,
                ready for the next step.
              </p>

              <div className="mt-7 flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                  <ShoppingBag size={17} />
                </div>

                <div>
                  <p className="text-sm font-bold">
                    {items.length}
                  </p>

                  <p className="text-[9px] text-white/25">
                    Product types
                  </p>
                </div>

              </div>

            </div>

            {/* 3D CART */}

            <motion.div
              animate={{
                y: [0, -16, 0],
                rotateY: [0, 12, -12, 0],
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
              <ShoppingBag
                size={92}
                strokeWidth={1}
              />
            </motion.div>

          </div>
        </section>

        {/* ================================= */}
        {/* FREE SHIPPING BAR */}
        {/* ================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          className="mt-7 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4"
        >
          <Truck
            size={16}
            className="text-white/40"
          />

          <div className="flex-1">
            <div className="flex justify-between text-[9px]">
              <span className="text-white/40">
                {subtotal >= 2000
                  ? "Free delivery unlocked"
                  : "Add ₹2,000 for free delivery"}
              </span>

              <span className="text-white/20">
                ₹
                {subtotal.toLocaleString(
                  "en-IN",
                )}
              </span>
            </div>

            <div className="mt-2 h-1 overflow-hidden rounded-full bg-white/10">
              <motion.div
                initial={{
                  width: 0,
                }}
                animate={{
                  width: `${Math.min(
                    100,
                    (subtotal / 2000) *
                      100,
                  )}%`,
                }}
                className="h-full bg-white"
              />
            </div>
          </div>

          {subtotal >= 2000 && (
            <Check size={15} />
          )}
        </motion.div>

        {/* ================================= */}
        {/* MAIN CART */}
        {/* ================================= */}

        {items.length > 0 ? (
          <div className="mt-10 grid gap-7 lg:grid-cols-[1fr_390px]">

            {/* ITEMS */}

            <section>

              <div className="flex items-end justify-between">

                <div>
                  <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                    Selected products
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    Shopping bag
                  </h2>
                </div>

                <span className="text-[9px] text-white/20">
                  {items.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0,
                  )}{" "}
                  items
                </span>

              </div>

              <div className="mt-7 space-y-3">

                <AnimatePresence>
                  {items.map((item) => (
                    <motion.article
                      key={item.id}
                      layout
                      initial={{
                        opacity: 0,
                        x: -20,
                      }}
                      animate={{
                        opacity: 1,
                        x: 0,
                      }}
                      exit={{
                        opacity: 0,
                        x: 30,
                        scale: 0.96,
                      }}
                      className="group rounded-[1.7rem] border border-white/10 bg-white/[0.025] p-4"
                    >

                      <div className="flex gap-4">

                        {/* PRODUCT */}

                        <div className="relative flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-white/[0.04]">

                          <motion.div
                            whileHover={{
                              scale: 1.15,
                              rotateY: 15,
                            }}
                            className="flex h-16 w-16 items-center justify-center rounded-xl bg-white text-3xl shadow-xl"
                            style={{
                              transformStyle:
                                "preserve-3d",
                            }}
                          >
                            {item.image}
                          </motion.div>

                          <div className="absolute inset-0 rounded-2xl border border-white/[0.05]" />

                        </div>

                        {/* DETAILS */}

                        <div className="min-w-0 flex-1">

                          <div className="flex justify-between gap-3">

                            <div>
                              <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                                {item.vendor}
                              </p>

                              <h3 className="mt-2 text-sm font-semibold">
                                {item.name}
                              </h3>
                            </div>

                            <button
                              onClick={() =>
                                removeItem(
                                  item.id,
                                )
                              }
                              className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-white/20 transition hover:bg-white/10 hover:text-red-300"
                            >
                              <Trash2
                                size={13}
                              />
                            </button>

                          </div>

                          <div className="mt-5 flex items-center justify-between">

                            {/* QUANTITY */}

                            <div className="flex items-center gap-1 rounded-xl border border-white/10 p-1">

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    -1,
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:bg-white/10 hover:text-white"
                              >
                                <Minus
                                  size={11}
                                />
                              </button>

                              <span className="w-7 text-center text-[10px]">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    1,
                                  )
                                }
                                className="flex h-7 w-7 items-center justify-center rounded-lg text-white/30 hover:bg-white/10 hover:text-white"
                              >
                                <Plus
                                  size={11}
                                />
                              </button>

                            </div>

                            {/* PRICE */}

                            <p className="text-sm font-bold">
                              ₹
                              {(
                                item.price *
                                item.quantity
                              ).toLocaleString(
                                "en-IN",
                              )}
                            </p>

                          </div>

                        </div>

                      </div>

                    </motion.article>
                  ))}
                </AnimatePresence>

              </div>
            </section>

            {/* ================================= */}
            {/* SUMMARY */}
            {/* ================================= */}

            <aside>

              <div className="sticky top-28 rounded-[2rem] border border-white/10 bg-white/[0.025] p-6">

                <p className="text-[9px] uppercase tracking-[0.3em] text-white/20">
                  Order summary
                </p>

                <h2 className="mt-3 text-2xl font-bold">
                  Checkout
                </h2>

                {/* COUPON */}

                <div className="mt-7">

                  <button
                    onClick={() =>
                      setCouponOpen(
                        !couponOpen,
                      )
                    }
                    className="flex w-full items-center justify-between rounded-xl border border-white/10 px-4 py-3 text-[10px] text-white/40"
                  >
                    <span className="flex items-center gap-2">
                      <Tag size={12} />
                      Have a coupon?
                    </span>

                    <ChevronDown
                      size={13}
                      className={
                        couponOpen
                          ? "rotate-180"
                          : ""
                      }
                    />
                  </button>

                  <AnimatePresence>
                    {couponOpen && (
                      <motion.div
                        initial={{
                          height: 0,
                          opacity: 0,
                        }}
                        animate={{
                          height: "auto",
                          opacity: 1,
                        }}
                        exit={{
                          height: 0,
                          opacity: 0,
                        }}
                        className="overflow-hidden"
                      >
                        <div className="flex gap-2 pt-3">

                          <input
                            value={coupon}
                            onChange={(e) =>
                              setCoupon(
                                e.target.value,
                              )
                            }
                            placeholder="VEN10"
                            className="min-w-0 flex-1 rounded-xl border border-white/10 bg-transparent px-3 py-3 text-[10px] outline-none placeholder:text-white/15 focus:border-white/30"
                          />

                          <button
                            onClick={() => {
                              if (
                                coupon.trim()
                              ) {
                                setCouponApplied(
                                  true,
                                );
                              }
                            }}
                            className="rounded-xl bg-white px-4 text-[9px] font-bold text-black"
                          >
                            Apply
                          </button>

                        </div>

                        {couponApplied && (
                          <p className="mt-2 text-[9px] text-white/40">
                            ✓ 10% discount applied
                          </p>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>

                </div>

                {/* PRICES */}

                <div className="mt-7 space-y-4 border-t border-white/10 pt-6">

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
                        : `₹${delivery}`
                    }
                  />

                  {discount > 0 && (
                    <SummaryRow
                      label="Discount"
                      value={`-₹${discount.toLocaleString(
                        "en-IN",
                      )}`}
                    />
                  )}

                </div>

                <div className="mt-6 flex items-end justify-between border-t border-white/10 pt-6">

                  <span className="text-xs text-white/40">
                    Total
                  </span>

                  <span className="text-2xl font-black">
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                </div>

                {/* CHECKOUT */}

                <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-[10px] font-bold text-black transition hover:scale-[1.02]">
                  Proceed to checkout
                  <ArrowRight size={13} />
                </button>

                {/* TRUST */}

                <div className="mt-5 grid grid-cols-2 gap-2">

                  <MiniTrust
                    icon={ShieldCheck}
                    text="Secure payment"
                  />

                  <MiniTrust
                    icon={Truck}
                    text="Tracked delivery"
                  />

                </div>

              </div>
            </aside>

          </div>
        ) : (
          /* ================================= */
          /* EMPTY CART */
          /* ================================= */

          <motion.section
            initial={{
              opacity: 0,
              scale: 0.97,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            className="mt-10 flex min-h-[450px] flex-col items-center justify-center rounded-[2rem] border border-dashed border-white/10 bg-white/[0.02] text-center"
          >

            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 3, -3, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
              }}
              className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03]"
            >
              <ShoppingBag
                size={38}
                strokeWidth={1}
                className="text-white/25"
              />
            </motion.div>

            <h2 className="mt-7 text-xl font-bold">
              Your cart is empty
            </h2>

            <p className="mt-3 max-w-sm text-xs leading-6 text-white/25">
              Looks like you haven't added
              anything yet. Let's find something
              you'll love.
            </p>

            <button className="mt-7 flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-[10px] font-bold text-black">
              Continue shopping
              <ArrowRight size={13} />
            </button>

          </motion.section>
        )}

      </div>
    </main>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex justify-between text-[10px]">
      <span className="text-white/25">
        {label}
      </span>

      <span className="text-white/60">
        {value}
      </span>
    </div>
  );
}

function MiniTrust({
  icon: Icon,
  text,
}: {
  icon: typeof ShieldCheck;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-white/10 p-3">
      <Icon
        size={12}
        className="text-white/30"
      />

      <span className="text-[8px] text-white/25">
        {text}
      </span>
    </div>
  );
}