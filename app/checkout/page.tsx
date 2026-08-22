"use client";

import { createOrders, type Order } from "@/lib/api/orders";
import {
  getMyAddresses,
  type Address,
} from "@/lib/api/profile";
import { useAuth } from "@/lib/auth/auth-context";

import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  ShieldCheck,
  Tag,
  Truck,
  X,
} from "lucide-react";

import Link from "next/link";
import { useEffect, useState } from "react";

/* =========================================================
   DEMO CART ITEMS
   ========================================================= */

const items = [
  {
    id: 1,
    name: "Aero Runner X",
    variant: "Black / Size 9",
    price: 8499,
    quantity: 1,
    emoji: "👟",
  },
  {
    id: 2,
    name: "Motion Core Tee",
    variant: "White / Large",
    price: 2499,
    quantity: 1,
    emoji: "👕",
  },
];

const subtotal = items.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0,
);

const shipping = 0;
const tax = Math.round(subtotal * 0.18);
const total = subtotal + shipping + tax;

/* =========================================================
   CHECKOUT PAGE
   ========================================================= */

export default function CheckoutPage() {
  const { user, isLoading } = useAuth();

  /* -------------------------------------------------------
     Payment
     ------------------------------------------------------- */

  const [payment, setPayment] = useState("cod");

  /* -------------------------------------------------------
     Address
     ------------------------------------------------------- */

  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddressId, setSelectedAddressId] =
    useState<number | null>(null);

  const [loadingAddresses, setLoadingAddresses] =
    useState(true);

  /* -------------------------------------------------------
     Order
     ------------------------------------------------------- */

  const [placingOrder, setPlacingOrder] =
    useState(false);

  const [orderError, setOrderError] =
    useState("");

  const [createdOrders, setCreatedOrders] =
    useState<Order[]>([]);

  const [ordered, setOrdered] =
    useState(false);

  /* -------------------------------------------------------
     Coupon
     ------------------------------------------------------- */

  const [coupon, setCoupon] = useState("");
  const [couponApplied, setCouponApplied] =
    useState(false);

  /* =======================================================
     LOAD ADDRESSES
     ======================================================= */

  useEffect(() => {
    async function loadAddresses() {
      if (isLoading) {
        return;
      }

      if (!user) {
        setLoadingAddresses(false);
        return;
      }

      try {
        setLoadingAddresses(true);
        setOrderError("");

        const data = await getMyAddresses();

        setAddresses(data);

        const defaultAddress =
          data.find((address) => address.is_default) ||
          data[0];

        if (defaultAddress) {
          setSelectedAddressId(defaultAddress.id);
        }
      } catch (error) {
        console.error(
          "Failed to load addresses:",
          error,
        );

        setOrderError(
          "Unable to load your delivery addresses.",
        );
      } finally {
        setLoadingAddresses(false);
      }
    }

    loadAddresses();
  }, [user, isLoading]);

  /* =======================================================
     PLACE ORDER
     ======================================================= */

  async function handlePlaceOrder() {
    setOrderError("");

    if (isLoading) {
      return;
    }

    if (!user) {
      setOrderError(
        "Please log in before placing your order.",
      );
      return;
    }

    if (!selectedAddressId) {
      setOrderError(
        "Please select a delivery address.",
      );
      return;
    }

    try {
      setPlacingOrder(true);

      const orders = await createOrders(user.id, {
        address_id: selectedAddressId,
        payment_method: payment,
      });

      setCreatedOrders(orders);
      setOrdered(true);
    } catch (error) {
      console.error(
        "Failed to place order:",
        error,
      );

      setOrderError(
        error instanceof Error
          ? error.message
          : "Failed to place order.",
      );
    } finally {
      setPlacingOrder(false);
    }
  }

  /* =======================================================
     SELECTED ADDRESS
     ======================================================= */

  const selectedAddress =
    addresses.find(
      (address) =>
        address.id === selectedAddressId,
    ) || null;

  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <main className="min-h-screen bg-black pb-24 pt-24 text-white">
      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* =================================================
            HEADER
            ================================================= */}

        <div className="mb-10 flex items-center justify-between">

          <Link
            href="/cart"
            className="flex items-center gap-2 text-[9px] uppercase tracking-[0.25em] text-white/25 transition hover:text-white"
          >
            <ArrowLeft size={13} />
            Back to cart
          </Link>

          <div className="flex items-center gap-2 text-[9px] uppercase tracking-[0.2em] text-white/25">
            <Lock size={11} />
            Secure checkout
          </div>

        </div>

        {/* =================================================
            PROGRESS
            ================================================= */}

        <div className="mb-10 flex items-center justify-center gap-3">

          <Step
            number="01"
            label="Cart"
            done
          />

          <div className="h-px w-12 bg-white/10" />

          <Step
            number="02"
            label="Checkout"
            active
          />

          <div className="h-px w-12 bg-white/10" />

          <Step
            number="03"
            label="Complete"
          />

        </div>

        {/* =================================================
            TITLE
            ================================================= */}

        <div className="mb-10">

          <p className="text-[9px] uppercase tracking-[0.35em] text-white/20">
            Vendora checkout
          </p>

          <h1 className="mt-3 text-4xl font-black md:text-5xl">
            Complete your order
          </h1>

          <p className="mt-3 text-sm text-white/25">
            Secure payment. Fast delivery.
            Zero unnecessary friction.
          </p>

        </div>

        {/* =================================================
            ERROR
            ================================================= */}

        {orderError && (
          <motion.div
            initial={{
              opacity: 0,
              y: -10,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            className="mb-5 rounded-2xl border border-red-500/20 bg-red-500/5 p-4 text-sm text-red-300"
          >
            {orderError}
          </motion.div>
        )}

        {/* =================================================
            MAIN GRID
            ================================================= */}

        <div className="grid gap-5 lg:grid-cols-[1fr_390px]">

          {/* =================================================
              LEFT
              ================================================= */}

          <div className="space-y-5">

            {/* =================================================
                ADDRESS
                ================================================= */}

            <CheckoutCard
              number="01"
              title="Delivery address"
              icon={<MapPin size={17} />}
            >

              {loadingAddresses ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                  <p className="text-[9px] text-white/30">
                    Loading your addresses...
                  </p>
                </div>
              ) : addresses.length === 0 ? (
                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">

                  <div className="flex items-center gap-3">

                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                      <MapPin size={15} />
                    </div>

                    <div>
                      <p className="text-xs font-bold">
                        No delivery address
                      </p>

                      <p className="mt-1 text-[9px] text-white/25">
                        Please add an address before
                        placing your order.
                      </p>
                    </div>

                  </div>

                  <Link
                    href="/profile"
                    className="mt-4 flex w-full items-center justify-center rounded-xl bg-white py-3 text-[8px] font-bold uppercase tracking-[0.15em] text-black"
                  >
                    Add address
                  </Link>

                </div>
              ) : (
                <div className="space-y-3">

                  {addresses.map((address) => {
                    const selected =
                      address.id ===
                      selectedAddressId;

                    return (
                      <button
                        key={address.id}
                        type="button"
                        onClick={() =>
                          setSelectedAddressId(
                            address.id,
                          )
                        }
                        className={`w-full rounded-2xl border p-5 text-left transition ${
                          selected
                            ? "border-white/30 bg-white/[0.05]"
                            : "border-white/10 bg-white/[0.025] hover:border-white/20"
                        }`}
                      >

                        <div className="flex items-start justify-between gap-4">

                          <div className="flex gap-3">

                            <div
                              className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                                selected
                                  ? "bg-white text-black"
                                  : "bg-white/[0.05] text-white/30"
                              }`}
                            >
                              <MapPin size={15} />
                            </div>

                            <div>

                              <div className="flex items-center gap-2">

                                <p className="text-xs font-bold">
                                  {address.full_name}
                                </p>

                                {address.is_default && (
                                  <span className="rounded-full border border-white/10 px-2 py-1 text-[6px] uppercase tracking-[0.15em] text-white/30">
                                    Default
                                  </span>
                                )}

                              </div>

                              <p className="mt-2 text-[9px] leading-5 text-white/30">
                                {address.address_line}
                                <br />
                                {address.city},{" "}
                                {address.state}
                                <br />
                                {address.postal_code},{" "}
                                {address.country}
                              </p>

                              <p className="mt-2 text-[8px] text-white/20">
                                {address.phone}
                              </p>

                            </div>

                          </div>

                          <div
                            className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                              selected
                                ? "border-white bg-white"
                                : "border-white/20"
                            }`}
                          >
                            {selected && (
                              <Check
                                size={11}
                                className="text-black"
                              />
                            )}
                          </div>

                        </div>

                      </button>
                    );
                  })}

                </div>
              )}

              <Link
                href="/profile"
                className="mt-3 flex w-full items-center justify-center rounded-xl border border-dashed border-white/10 py-3 text-[9px] text-white/25 transition hover:border-white/30 hover:text-white"
              >
                + Add another address
              </Link>

            </CheckoutCard>

            {/* =================================================
                SHIPPING
                ================================================= */}

            <CheckoutCard
              number="02"
              title="Shipping method"
              icon={<Truck size={17} />}
            >

              <div className="grid gap-3 sm:grid-cols-2">

                <ShippingOption
                  title="Standard delivery"
                  subtitle="3–5 business days"
                  price="FREE"
                  active
                />

                <ShippingOption
                  title="Express delivery"
                  subtitle="1–2 business days"
                  price="₹149"
                />

              </div>

            </CheckoutCard>

            {/* =================================================
                PAYMENT
                ================================================= */}

            <CheckoutCard
              number="03"
              title="Payment method"
              icon={<CreditCard size={17} />}
            >

              <div className="space-y-3">

                <PaymentOption
                  id="card"
                  selected={
                    payment === "card"
                  }
                  onClick={() =>
                    setPayment("card")
                  }
                  icon={
                    <CreditCard size={15} />
                  }
                  title="Credit / Debit Card"
                  subtitle="Visa, Mastercard, RuPay"
                />

                <PaymentOption
                  id="upi"
                  selected={
                    payment === "upi"
                  }
                  onClick={() =>
                    setPayment("upi")
                  }
                  icon={
                    <span className="text-[9px] font-black">
                      UPI
                    </span>
                  }
                  title="UPI"
                  subtitle="Google Pay, PhonePe, Paytm"
                />

                <PaymentOption
                  id="cod"
                  selected={
                    payment === "cod"
                  }
                  onClick={() =>
                    setPayment("cod")
                  }
                  icon={
                    <Package size={15} />
                  }
                  title="Cash on delivery"
                  subtitle="Pay when your order arrives"
                />

              </div>

              <AnimatePresence mode="wait">

                {payment === "card" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      height: 0,
                    }}
                    animate={{
                      opacity: 1,
                      height: "auto",
                    }}
                    exit={{
                      opacity: 0,
                      height: 0,
                    }}
                    className="overflow-hidden"
                  >
                    <CardForm />
                  </motion.div>
                )}

                {payment === "upi" && (
                  <motion.div
                    initial={{
                      opacity: 0,
                      y: 10,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
                  >

                    <label className="text-[8px] uppercase tracking-[0.2em] text-white/20">
                      UPI ID
                    </label>

                    <input
                      placeholder="yourname@upi"
                      className="mt-3 w-full rounded-xl border border-white/10 bg-black px-4 py-3 text-xs outline-none placeholder:text-white/15 focus:border-white/30"
                    />

                  </motion.div>
                )}

              </AnimatePresence>

            </CheckoutCard>

            {/* =================================================
                PROTECTION
                ================================================= */}

            <div className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-black">
                <ShieldCheck size={17} />
              </div>

              <div>

                <p className="text-[10px] font-bold">
                  Protected checkout
                </p>

                <p className="mt-1 text-[8px] leading-4 text-white/20">
                  Your payment information is encrypted
                  and securely processed.
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SUMMARY
              ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025]">

              {/* TOTAL */}

              <div className="relative overflow-hidden border-b border-white/10 p-6">

                <div
                  className="absolute inset-0 opacity-[0.04]"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
                    backgroundSize:
                      "35px 35px",
                  }}
                />

                <div className="relative">

                  <p className="text-[8px] uppercase tracking-[0.25em] text-white/20">
                    Order total
                  </p>

                  <motion.p
                    animate={{
                      scale: [1, 1.02, 1],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                    className="mt-3 text-4xl font-black"
                  >
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </motion.p>

                  <div className="mt-4 flex items-center gap-2 text-[8px] text-white/25">
                    <Lock size={10} />
                    Encrypted transaction
                  </div>

                </div>

              </div>

              {/* ITEMS */}

              <div className="p-6">

                <div className="mb-5 flex items-center justify-between">

                  <p className="text-[9px] uppercase tracking-[0.2em] text-white/20">
                    Your items
                  </p>

                  <span className="text-[9px] text-white/20">
                    {items.length} items
                  </span>

                </div>

                <div className="space-y-4">

                  {items.map((item) => (
                    <div
                      key={item.id}
                      className="flex gap-3"
                    >

                      <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white text-2xl">
                        {item.emoji}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-[10px] font-semibold">
                          {item.name}
                        </p>

                        <p className="mt-1 text-[8px] text-white/20">
                          {item.variant}
                        </p>

                        <p className="mt-2 text-[9px] font-bold">
                          ₹
                          {item.price.toLocaleString(
                            "en-IN",
                          )}
                        </p>

                      </div>

                    </div>
                  ))}

                </div>

                {/* COUPON */}

                <div className="mt-6">

                  <div className="flex items-center gap-2">

                    <div className="relative flex-1">

                      <Tag
                        size={12}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
                      />

                      <input
                        value={coupon}
                        onChange={(e) =>
                          setCoupon(
                            e.target.value,
                          )
                        }
                        placeholder="Promo code"
                        className="w-full rounded-xl border border-white/10 bg-black py-3 pl-9 pr-3 text-[9px] outline-none placeholder:text-white/15"
                      />

                    </div>

                    <button
                      type="button"
                      onClick={() =>
                        setCouponApplied(
                          Boolean(
                            coupon.trim(),
                          ),
                        )
                      }
                      className="rounded-xl bg-white px-4 py-3 text-[8px] font-bold text-black"
                    >
                      Apply
                    </button>

                  </div>

                  {couponApplied && (
                    <motion.p
                      initial={{
                        opacity: 0,
                        y: -5,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      className="mt-2 text-[8px] text-white/40"
                    >
                      ✓ Promo code applied
                    </motion.p>
                  )}

                </div>

                {/* BREAKDOWN */}

                <div className="mt-6 space-y-3 border-t border-white/5 pt-5">

                  <PriceRow
                    label="Subtotal"
                    value={`₹${subtotal.toLocaleString(
                      "en-IN",
                    )}`}
                  />

                  <PriceRow
                    label="Shipping"
                    value="FREE"
                  />

                  <PriceRow
                    label="Tax (18%)"
                    value={`₹${tax.toLocaleString(
                      "en-IN",
                    )}`}
                  />

                </div>

                <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-5">

                  <span className="text-[10px] text-white/30">
                    Total
                  </span>

                  <span className="text-2xl font-black">
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                </div>

                {/* SELECTED ADDRESS INFO */}

                {selectedAddress && (
                  <div className="mt-5 rounded-xl border border-white/10 bg-white/[0.02] p-4">

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={12}
                        className="text-white/30"
                      />

                      <span className="text-[8px] uppercase tracking-[0.15em] text-white/30">
                        Delivering to
                      </span>

                    </div>

                    <p className="mt-2 text-[9px] font-semibold">
                      {selectedAddress.full_name}
                    </p>

                    <p className="mt-1 text-[8px] leading-4 text-white/20">
                      {selectedAddress.city},{" "}
                      {selectedAddress.state}{" "}
                      {selectedAddress.postal_code}
                    </p>

                  </div>
                )}

                {/* ORDER BUTTON */}

                <motion.button
                  type="button"
                  whileHover={{
                    scale: placingOrder
                      ? 1
                      : 1.015,
                  }}
                  whileTap={{
                    scale: placingOrder
                      ? 1
                      : 0.97,
                  }}
                  disabled={
                    placingOrder ||
                    loadingAddresses ||
                    !selectedAddressId
                  }
                  onClick={handlePlaceOrder}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-white py-4 text-[9px] font-black uppercase tracking-[0.2em] text-black shadow-[0_15px_50px_rgba(255,255,255,.08)] disabled:cursor-not-allowed disabled:opacity-40"
                >

                  {placingOrder ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                      Placing order...
                    </>
                  ) : (
                    <>
                      Place order
                      <ChevronRight size={13} />
                    </>
                  )}

                </motion.button>

                <p className="mt-4 text-center text-[7px] leading-4 text-white/15">
                  By placing your order, you agree
                  to Vendora's terms and policies.
                </p>

              </div>

            </div>

          </aside>

        </div>

      </div>

      {/* =================================================
          SUCCESS MODAL
          ================================================= */}

      <AnimatePresence>
        {ordered && (
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-5 backdrop-blur-xl"
          >

            <motion.div
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 30,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#090909] p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,.8)]"
            >

              <button
                type="button"
                onClick={() =>
                  setOrdered(false)
                }
                className="absolute right-5 top-5 text-white/20 hover:text-white"
              >
                <X size={15} />
              </button>

              <motion.div
                animate={{
                  rotateY: [0, 360],
                }}
                transition={{
                  duration: 1,
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-white text-black"
              >
                <Check size={32} />
              </motion.div>

              <p className="mt-7 text-[9px] uppercase tracking-[0.3em] text-white/20">
                Order confirmed
              </p>

              <h2 className="mt-3 text-3xl font-black">
                You're all set.
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-[10px] leading-5 text-white/25">
                Your Vendora order has been placed
                successfully. We'll keep you updated
                throughout the delivery.
              </p>

              {/* CREATED ORDERS */}

              {createdOrders.length > 0 && (
                <div className="mt-7 space-y-2">

                  {createdOrders.map(
                    (order) => (
                      <div
                        key={order.id}
                        className="rounded-2xl border border-white/10 bg-white/[0.025] p-4"
                      >

                        <div className="flex justify-between text-[9px]">

                          <span className="text-white/20">
                            Order ID
                          </span>

                          <span className="font-bold">
                            {order.order_number}
                          </span>

                        </div>

                        <div className="mt-2 flex justify-between text-[9px]">

                          <span className="text-white/20">
                            Total
                          </span>

                          <span className="font-bold">
                            ₹
                            {Number(
                              order.total,
                            ).toLocaleString(
                              "en-IN",
                            )}
                          </span>

                        </div>

                        <div className="mt-2 flex justify-between text-[9px]">

                          <span className="text-white/20">
                            Payment
                          </span>

                          <span className="font-bold uppercase">
                            {
                              order.payment_method
                            }
                          </span>

                        </div>

                      </div>
                    ),
                  )}

                </div>
              )}

              <Link
                href="/orders"
                className="mt-5 flex w-full items-center justify-center rounded-2xl bg-white py-4 text-[9px] font-black uppercase tracking-[0.2em] text-black"
              >
                Track order
              </Link>

            </motion.div>

          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

/* =========================================================
   STEP
   ========================================================= */

function Step({
  number,
  label,
  active = false,
  done = false,
}: {
  number: string;
  label: string;
  active?: boolean;
  done?: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-2 text-[8px] uppercase tracking-[0.15em] ${
        active || done
          ? "text-white"
          : "text-white/20"
      }`}
    >

      <span
        className={`flex h-7 w-7 items-center justify-center rounded-full border ${
          active
            ? "border-white bg-white text-black"
            : done
              ? "border-white/40"
              : "border-white/10"
        }`}
      >

        {done ? (
          <Check size={11} />
        ) : (
          number
        )}

      </span>

      <span className="hidden sm:block">
        {label}
      </span>

    </div>
  );
}

/* =========================================================
   CHECKOUT CARD
   ========================================================= */

function CheckoutCard({
  number,
  title,
  icon,
  children,
}: {
  number: string;
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      whileHover={{
        borderColor:
          "rgba(255,255,255,.16)",
      }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-6"
    >

      <div className="flex items-center gap-3">

        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
          {icon}
        </div>

        <div>

          <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
            Step {number}
          </p>

          <h2 className="mt-1 text-sm font-bold">
            {title}
          </h2>

        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </motion.section>
  );
}

/* =========================================================
   SHIPPING OPTION
   ========================================================= */

function ShippingOption({
  title,
  subtitle,
  price,
  active = false,
}: {
  title: string;
  subtitle: string;
  price: string;
  active?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-4 ${
        active
          ? "border-white/30 bg-white/[0.05]"
          : "border-white/10"
      }`}
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[10px] font-semibold">
            {title}
          </p>

          <p className="mt-2 text-[8px] text-white/20">
            {subtitle}
          </p>

        </div>

        <span className="text-[9px] font-bold">
          {price}
        </span>

      </div>

      {active && (
        <div className="mt-3 flex items-center gap-1 text-[7px] text-white/30">
          <Check size={10} />
          Selected
        </div>
      )}

    </div>
  );
}

/* =========================================================
   PAYMENT OPTION
   ========================================================= */

function PaymentOption({
  id,
  selected,
  onClick,
  icon,
  title,
  subtitle,
}: {
  id: string;
  selected: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${
        selected
          ? "border-white/30 bg-white/[0.05]"
          : "border-white/10 hover:bg-white/[0.025]"
      }`}
    >

      <div
        className={`flex h-9 w-9 items-center justify-center rounded-lg ${
          selected
            ? "bg-white text-black"
            : "bg-white/[0.05] text-white/30"
        }`}
      >
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-[10px] font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[8px] text-white/20">
          {subtitle}
        </p>

      </div>

      <div
        className={`flex h-4 w-4 items-center justify-center rounded-full border ${
          selected
            ? "border-white bg-white"
            : "border-white/20"
        }`}
      >
        {selected && (
          <div className="h-1.5 w-1.5 rounded-full bg-black" />
        )}
      </div>

    </button>
  );
}

/* =========================================================
   CARD FORM
   ========================================================= */

function CardForm() {
  return (
    <div className="mt-4 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.02] p-5">

      <div>

        <label className="text-[8px] uppercase tracking-[0.2em] text-white/20">
          Card number
        </label>

        <div className="relative mt-2">

          <CreditCard
            size={13}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/20"
          />

          <input
            type="text"
            placeholder="1234 5678 9012 3456"
            className="w-full rounded-xl border border-white/10 bg-black py-3 pl-9 pr-3 text-xs outline-none placeholder:text-white/15 focus:border-white/30"
          />

        </div>

      </div>

      <div className="grid grid-cols-2 gap-3">

        <Input
          label="Expiry"
          placeholder="MM / YY"
        />

        <Input
          label="CVV"
          placeholder="•••"
        />

      </div>

      <Input
        label="Cardholder name"
        placeholder="Name on card"
      />

    </div>
  );
}

/* =========================================================
   INPUT
   ========================================================= */

function Input({
  label,
  placeholder,
}: {
  label: string;
  placeholder: string;
}) {
  return (
    <div>

      <label className="text-[8px] uppercase tracking-[0.2em] text-white/20">
        {label}
      </label>

      <input
        type="text"
        placeholder={placeholder}
        className="mt-2 w-full rounded-xl border border-white/10 bg-black px-3 py-3 text-xs outline-none placeholder:text-white/15 focus:border-white/30"
      />

    </div>
  );
}

/* =========================================================
   PRICE ROW
   ========================================================= */

function PriceRow({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between text-[9px]">

      <span className="text-white/25">
        {label}
      </span>

      <span className="text-white/60">
        {value}
      </span>

    </div>
  );
}