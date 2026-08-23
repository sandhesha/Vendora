"use client";

import {
  getMyAddresses,
  createAddress,
} from "@/lib/api/profile";

import {
  getCart,
} from "@/lib/api/cart";

import {
  getProduct,
} from "@/lib/api/products";

import type {
  Address,
  AddressCreate,
} from "@/lib/api/profile";

import {
  createOrders,
} from "@/lib/api/orders";

import type {
  Order,
} from "@/lib/api/orders";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  Check,
  ChevronRight,
  CreditCard,
  Lock,
  MapPin,
  Package,
  Plus,
  ShieldCheck,
  Smartphone,
  Tag,
  Truck,
  User,
  X,
} from "lucide-react";

import Link from "next/link";

import {
  useEffect,
  useMemo,
  useState,
} from "react";

/* =========================================================
   TYPES
   ========================================================= */

type CartItem = {
  id: number;
  product_id: number;
  product_name?: string;
  name?: string;
  price: number | string;
  quantity: number;
  stock?: number | null;
  image_url?: string | null;
  emoji?: string;
  variant?: string;
};

type PaymentMethod =
  | "cod"
  | "upi"
  | "card";

type ShippingMethod =
  | "standard"
  | "express";

/* =========================================================
   EMPTY ADDRESS
   ========================================================= */

const EMPTY_ADDRESS: AddressCreate = {
  full_name: "",
  phone: "",
  address_line: "",
  city: "",
  state: "",
  postal_code: "",
  country: "India",
  is_default: false,
};

/* =========================================================
   CHECKOUT PAGE
   ========================================================= */

export default function CheckoutPage() {
  /* =======================================================
     AUTH
     ======================================================= */

  const [userId, setUserId] =
    useState<number | null>(null);

  const [authLoading, setAuthLoading] =
    useState(true);

  /* =======================================================
     CART
     ======================================================= */

  const [items, setItems] =
    useState<CartItem[]>([]);

  const [cartLoading, setCartLoading] =
    useState(true);

  /* =======================================================
     ADDRESS
     ======================================================= */

  const [addresses, setAddresses] =
    useState<Address[]>([]);

  const [
    selectedAddressId,
    setSelectedAddressId,
  ] = useState<number | null>(null);

  const [
    loadingAddresses,
    setLoadingAddresses,
  ] = useState(true);

  const [
    showAddressForm,
    setShowAddressForm,
  ] = useState(false);

  const [
    addressForm,
    setAddressForm,
  ] = useState<AddressCreate>({
    ...EMPTY_ADDRESS,
  });

  const [
    savingAddress,
    setSavingAddress,
  ] = useState(false);

  /* =======================================================
     PAYMENT
     ======================================================= */

  const [
    payment,
    setPayment,
  ] = useState<PaymentMethod>("cod");

  const [
    cardNumber,
    setCardNumber,
  ] = useState("");

  const [
    cardExpiry,
    setCardExpiry,
  ] = useState("");

  const [
    cardCvv,
    setCardCvv,
  ] = useState("");

  const [
    cardholderName,
    setCardholderName,
  ] = useState("");

  const [
    upiId,
    setUpiId,
  ] = useState("");

  /* =======================================================
     SHIPPING
     ======================================================= */

  const [
    shippingMethod,
    setShippingMethod,
  ] = useState<ShippingMethod>("standard");

  /* =======================================================
     ORDER
     ======================================================= */

  const [
    placingOrder,
    setPlacingOrder,
  ] = useState(false);

  const [
    orderError,
    setOrderError,
  ] = useState("");

  const [
    createdOrders,
    setCreatedOrders,
  ] = useState<Order[]>([]);

  const [
    ordered,
    setOrdered,
  ] = useState(false);

  /* =======================================================
     COUPON
     ======================================================= */

  const [
    coupon,
    setCoupon,
  ] = useState("");

  const [
    couponApplied,
    setCouponApplied,
  ] = useState(false);

  const VALID_COUPON = "VENDORA10";

  const [
  couponError,
  setCouponError,
] = useState("");

  /* =======================================================
     LOAD USER
     ======================================================= */

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    try {
      const token =
        localStorage.getItem("access_token");

      const rawUser =
        localStorage.getItem("vendora_user");

      console.log(
        "[Checkout] access_token:",
        token ? "present" : "missing",
      );

      console.log(
        "[Checkout] vendora_user:",
        rawUser ? "present" : "missing",
      );

      if (!token) {
        console.warn(
          "[Checkout] No access token found.",
        );

        setUserId(null);
        return;
      }

      if (!rawUser) {
        console.warn(
          "[Checkout] No vendora_user found.",
        );

        setUserId(null);
        return;
      }

      const parsed = JSON.parse(rawUser);

      const id =
        parsed?.id ??
        parsed?.user_id ??
        parsed?.userId;

      if (
        id !== undefined &&
        id !== null &&
        Number.isFinite(Number(id))
      ) {
        setUserId(Number(id));

        console.log(
          "[Checkout] Logged in user:",
          Number(id),
        );
      } else {
        console.warn(
          "[Checkout] Invalid user ID:",
          parsed,
        );

        setUserId(null);
      }
    } catch (error) {
      console.error(
        "[Checkout] Failed to read authentication:",
        error,
      );

      setUserId(null);
    } finally {
      setAuthLoading(false);
    }
  }, []);

  /* =======================================================
     LOAD CART
     ======================================================= */

  /* =======================================================
   LOAD CART FROM BACKEND
   ======================================================= */

  /* =======================================================
     LOAD CART FROM BACKEND
     ======================================================= */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!userId) {
      setItems([]);
      setCartLoading(false);
      return;
    }

    let cancelled = false;

    async function loadCart() {
      try {
        setCartLoading(true);

        console.log(
          "[Checkout] Loading backend cart for user:",
          userId,
        );

        const cart = await getCart(Number(userId));

        console.log(
          "[Checkout] Backend cart:",
          cart,
        );

        if (cancelled) {
          return;
        }

        if (
          !cart ||
          !Array.isArray(cart.items) ||
          cart.items.length === 0
        ) {
          console.log(
            "[Checkout] Backend cart is empty.",
          );

          setItems([]);
          return;
        }

        /*
         * Convert backend cart items into the format
         * required by the checkout page.
         */
        const checkoutItems: Array<CartItem | null> =
          await Promise.all(
            cart.items
              .filter((item) => {
                return (
                  item != null &&
                  item.product_id != null &&
                  Number.isFinite(
                    Number(item.product_id),
                  ) &&
                  Number(item.quantity) > 0
                );
              })
              .map(async (item) => {
                /*
                 * TypeScript now knows product_id exists
                 * because we explicitly validate it above.
                 */
                if (
                  item == null ||
                  item.product_id == null
                ) {
                  return null;
                }

                try {
                  const product =
                    await getProduct(
                      Number(item.product_id),
                    );

                  return {
                    id: Number(item.id),

                    product_id:
                      Number(item.product_id),

                    product_name:
                      product.name,

                    name:
                      product.name,

                    price:
                      product.price,

                    quantity:
                      Number(item.quantity),

                    stock:
                      product.stock ?? null,

                    image_url:
                      product.image_url ?? null,
                  } satisfies CartItem;
                } catch (error) {
                  console.error(
                    `[Checkout] Failed to load product ${item.product_id}:`,
                    error,
                  );

                  return null;
                }
              }),
          );

        if (cancelled) {
          return;
        }

        /*
         * Remove failed product requests.
         *
         * IMPORTANT:
         * This type predicate works because CartItem now
         * requires product_id: number.
         */
        const validItems =
          checkoutItems.filter(
            (item): item is CartItem =>
              item !== null,
          );

        console.log(
          "[Checkout] Checkout items:",
          validItems,
        );

        setItems(validItems);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "[Checkout] Failed to load backend cart:",
          error,
        );

        setItems([]);
      } finally {
        if (!cancelled) {
          setCartLoading(false);
        }
      }
    }

    loadCart();

    return () => {
      cancelled = true;
    };
  }, [authLoading, userId]);

  /* =======================================================
     PRICE CALCULATION
     ======================================================= */

  const subtotal = useMemo(() => {
    return items.reduce(
      (sum, item) => {
        const price =
          Number(item.price) || 0;

        const quantity =
          Number(item.quantity) || 0;

        return (
          sum +
          price * quantity
        );
      },
      0,
    );
  }, [items]);

  const shipping =
    shippingMethod === "express"
      ? 149
      : 0;

  const tax =
    Math.round(
      subtotal * 0.18,
    );

  const discount =
    couponApplied
      ? Math.round(
        subtotal * 0.1,
      )
      : 0;

  const total =
    Math.max(
      0,
      subtotal +
      shipping +
      tax -
      discount,
    );

  /* =======================================================
     LOAD ADDRESSES
     ======================================================= */

  useEffect(() => {
    if (authLoading) {
      return;
    }

    if (!userId) {
      setAddresses([]);
      setLoadingAddresses(false);
      return;
    }

    let cancelled = false;

    async function fetchAddresses() {
      console.log(
        "[Checkout] Loading addresses for user:",
        userId,
      );

      setLoadingAddresses(true);
      setOrderError("");

      try {
        const token =
          localStorage.getItem(
            "access_token",
          );

        if (!token) {
          throw new Error(
            "Your session has expired. Please sign in again.",
          );
        }

        const data =
          await getMyAddresses();

        if (cancelled) {
          return;
        }

        console.log(
          "[Checkout] Addresses loaded:",
          data,
        );

        setAddresses(
          Array.isArray(data)
            ? data
            : [],
        );

        const defaultAddress =
          data.find(
            (address) =>
              address.is_default === true,
          ) ??
          data[0] ??
          null;

        if (defaultAddress) {
          setSelectedAddressId(
            defaultAddress.id,
          );
        } else {
          setSelectedAddressId(null);
        }
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error(
          "[Checkout] Address loading failed:",
          error,
        );

        const message =
          error instanceof Error
            ? error.message
            : "Unable to load your delivery addresses.";

        setOrderError(message);

        setAddresses([]);
        setSelectedAddressId(null);
      } finally {
        if (!cancelled) {
          setLoadingAddresses(false);
        }
      }
    }

    fetchAddresses();

    return () => {
      cancelled = true;
    };
  }, [authLoading, userId]);

  /* =======================================================
     ADDRESS FIELD
     ======================================================= */

  function updateAddressField(
    field: keyof AddressCreate,
    value: string | boolean,
  ) {
    setAddressForm(
      (current) => ({
        ...current,
        [field]: value,
      }),
    );
  }

  /* =======================================================
     SAVE ADDRESS
     ======================================================= */

  async function handleSaveAddress() {
    setOrderError("");

    const requiredFields = [
      addressForm.full_name,
      addressForm.phone,
      addressForm.address_line,
      addressForm.city,
      addressForm.state,
      addressForm.postal_code,
    ];

    const hasEmptyField =
      requiredFields.some(
        (field) =>
          !String(field).trim(),
      );

    if (hasEmptyField) {
      setOrderError(
        "Please complete all required address fields.",
      );

      return;
    }

    if (
      addressForm.phone
        .replace(/\D/g, "")
        .length < 10
    ) {
      setOrderError(
        "Please enter a valid phone number.",
      );

      return;
    }

    if (
      addressForm.postal_code
        .replace(/\D/g, "")
        .length !== 6
    ) {
      setOrderError(
        "Please enter a valid 6-digit PIN code.",
      );

      return;
    }

    try {
      setSavingAddress(true);

      const newAddress =
        await createAddress(
          addressForm,
        );

      setAddresses(
        (current) => {
          if (
            addressForm.is_default
          ) {
            return [
              ...current.map(
                (address) => ({
                  ...address,
                  is_default:
                    false,
                }),
              ),
              newAddress,
            ];
          }

          return [
            ...current,
            newAddress,
          ];
        },
      );

      setSelectedAddressId(
        newAddress.id,
      );

      setAddressForm({
        ...EMPTY_ADDRESS,
      });

      setShowAddressForm(false);
    } catch (error) {
      console.error(
        "Failed to create address:",
        error,
      );

      setOrderError(
        error instanceof Error
          ? error.message
          : "Failed to save address.",
      );
    } finally {
      setSavingAddress(false);
    }
  }

  /* =======================================================
     PAYMENT VALIDATION
     ======================================================= */

  function validatePayment() {
    if (payment === "cod") {
      return true;
    }

    if (payment === "upi") {
      if (!upiId.trim()) {
        setOrderError(
          "Please enter your UPI ID.",
        );

        return false;
      }

      if (
        !upiId.includes("@")
      ) {
        setOrderError(
          "Please enter a valid UPI ID.",
        );

        return false;
      }

      return true;
    }

    const cleanCard =
      cardNumber.replace(
        /\s/g,
        "",
      );

    if (
      cleanCard.length < 12
    ) {
      setOrderError(
        "Please enter a valid card number.",
      );

      return false;
    }

    if (!cardExpiry.trim()) {
      setOrderError(
        "Please enter your card expiry date.",
      );

      return false;
    }

    if (
      cardCvv.length < 3
    ) {
      setOrderError(
        "Please enter a valid CVV.",
      );

      return false;
    }

    if (
      !cardholderName.trim()
    ) {
      setOrderError(
        "Please enter the cardholder name.",
      );

      return false;
    }

    return true;
  }

  /* =======================================================
     PLACE ORDER
     ======================================================= */

  async function handlePlaceOrder() {
    setOrderError("");

    if (!userId) {
      setOrderError(
        "Your session could not be identified. Please sign in again.",
      );
      return;
    }

    const token =
      localStorage.getItem("access_token");

    if (!token) {
      setOrderError(
        "Your session has expired. Please sign in again.",
      );
      return;
    }

    if (items.length === 0) {
      setOrderError(
        "Your cart is empty.",
      );
      return;
    }

    if (!selectedAddressId) {
      setOrderError(
        "Please select a delivery address.",
      );
      return;
    }

    if (!validatePayment()) {
      return;
    }

    try {
      setPlacingOrder(true);

      console.log(
        "[Checkout] Creating order...",
      );

      console.log(
        "[Checkout] Customer ID:",
        userId,
      );

      console.log(
        "[Checkout] Address ID:",
        selectedAddressId,
      );

      console.log(
        "[Checkout] Payment:",
        payment,
      );

      const orders =
        await createOrders(
          userId,
          {
            address_id:
              selectedAddressId,
            payment_method:
              payment,
          },
        );

      console.log(
        "[Checkout] Order response:",
        orders,
      );

      if (
        !orders ||
        orders.length === 0
      ) {
        throw new Error(
          "The order was not created. Please try again.",
        );
      }

      setCreatedOrders(orders);

      /*
       * Clear all supported cart keys
       */
      localStorage.removeItem("cart");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("vendora-cart");

      setItems([]);

      setOrdered(true);
    } catch (error) {
      console.error(
        "[Checkout] Failed to place order:",
        error,
      );

      setOrderError(
        error instanceof Error
          ? error.message
          : "Failed to place order. Please try again.",
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
        address.id ===
        selectedAddressId,
    ) || null;

  /* =======================================================
     PAGE
     ======================================================= */

  return (
    <main className="min-h-screen bg-[#f5f7fa] pb-24 pt-24 text-slate-900">

      {/* =================================================
          BACKGROUND
      ================================================= */}

      <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

        <div className="absolute -left-40 top-20 h-96 w-96 rounded-full bg-blue-200/30 blur-3xl" />

        <div className="absolute -right-40 top-80 h-96 w-96 rounded-full bg-purple-200/30 blur-3xl" />

        <div className="absolute left-1/2 top-[60%] h-80 w-80 -translate-x-1/2 rounded-full bg-cyan-100/20 blur-3xl" />

      </div>

      <div className="mx-auto max-w-7xl px-5 md:px-8">

        {/* =================================================
            HEADER
        ================================================= */}

        <div className="mb-8 flex items-center justify-between">

          <Link
            href="/cart"
            className="group flex items-center gap-2 text-xs font-semibold text-slate-500 transition hover:text-slate-950"
          >
            <ArrowLeft
              size={15}
              className="transition group-hover:-translate-x-1"
            />

            Back to cart
          </Link>

          <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-500 shadow-sm">

            <Lock size={11} />

            Secure checkout

          </div>

        </div>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div className="mb-10 flex items-center justify-center">

          <Step
            number="01"
            label="Cart"
            done
          />

          <div className="mx-3 h-px w-12 bg-slate-200 sm:w-20" />

          <Step
            number="02"
            label="Checkout"
            active
          />

          <div className="mx-3 h-px w-12 bg-slate-200 sm:w-20" />

          <Step
            number="03"
            label="Complete"
          />

        </div>

        {/* =================================================
            TITLE
        ================================================= */}

        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            duration: 0.5,
          }}
          className="mb-10"
        >

          <div className="mb-3 flex items-center gap-2">

            <span className="h-2 w-2 rounded-full bg-slate-950" />

            <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
              Vendora checkout
            </p>

          </div>

          <h1 className="text-4xl font-black tracking-tight text-slate-950 md:text-6xl">
            Complete your order
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-slate-500">
            Review your delivery details,
            choose your payment method and
            place your order securely.
          </p>

        </motion.div>

        {/* =================================================
            ERROR
        ================================================= */}

        <AnimatePresence>
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
              exit={{
                opacity: 0,
                y: -10,
              }}
              className="mb-6 flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-600"
            >

              <X
                size={17}
                className="mt-0.5 shrink-0"
              />

              <div className="flex-1">

                <p className="font-semibold">
                  Checkout error
                </p>

                <p className="mt-1 text-xs">
                  {orderError}
                </p>

              </div>

              <button
                type="button"
                onClick={() =>
                  setOrderError("")
                }
                className="rounded-full p-1 transition hover:bg-red-100"
              >
                <X size={13} />
              </button>

            </motion.div>
          )}
        </AnimatePresence>

        {/* =================================================
            AUTH WARNING
        ================================================= */}

        {!authLoading &&
          !userId && (
            <div className="mb-6 flex items-center gap-4 rounded-2xl border border-amber-200 bg-amber-50 p-4">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-amber-600">
                <User size={17} />
              </div>

              <div className="flex-1">

                <p className="text-xs font-bold text-amber-900">
                  Sign in required
                </p>

                <p className="mt-1 text-[10px] text-amber-700">
                  Please sign in before placing
                  your Vendora order.
                </p>

              </div>

              <Link
                href="/auth/login"
                className="rounded-xl bg-slate-950 px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-white"
              >
                Sign in
              </Link>

            </div>
          )}

        {/* =================================================
            MAIN
        ================================================= */}

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">

          {/* =================================================
              LEFT
          ================================================= */}

          <div className="space-y-6">

            {/* =================================================
                ADDRESS
            ================================================= */}

            <CheckoutCard
              number="01"
              title="Delivery address"
              description="Where should we deliver your order?"
              icon={<MapPin size={18} />}
            >

              {loadingAddresses ? (
                <AddressSkeleton />
              ) : addresses.length === 0 ? (
                <EmptyAddress
                  onAdd={() =>
                    setShowAddressForm(true)
                  }
                />
              ) : (
                <div className="space-y-3">

                  {addresses.map(
                    (address) => (
                      <AddressCard
                        key={
                          address.id
                        }
                        address={
                          address
                        }
                        selected={
                          address.id ===
                          selectedAddressId
                        }
                        onClick={() =>
                          setSelectedAddressId(
                            address.id,
                          )
                        }
                      />
                    ),
                  )}

                </div>
              )}

              {!showAddressForm && (
                <button
                  type="button"
                  onClick={() =>
                    setShowAddressForm(
                      true,
                    )
                  }
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-2xl border border-dashed border-slate-200 bg-slate-50 py-4 text-xs font-bold text-slate-500 transition hover:border-slate-300 hover:bg-slate-100 hover:text-slate-900"
                >
                  <Plus size={15} />

                  Add another address
                </button>
              )}

              <AnimatePresence>
                {showAddressForm && (
                  <AddressForm
                    value={addressForm}
                    saving={
                      savingAddress
                    }
                    onChange={
                      updateAddressField
                    }
                    onCancel={() => {
                      setShowAddressForm(
                        false,
                      );

                      setAddressForm({
                        ...EMPTY_ADDRESS,
                      });
                    }}
                    onSave={
                      handleSaveAddress
                    }
                  />
                )}
              </AnimatePresence>

            </CheckoutCard>

            {/* =================================================
                SHIPPING
            ================================================= */}

            <CheckoutCard
              number="02"
              title="Shipping method"
              description="Choose how quickly you want your order."
              icon={<Truck size={18} />}
            >

              <div className="grid gap-3 sm:grid-cols-2">

                <ShippingOption
                  title="Standard delivery"
                  subtitle="3–5 business days"
                  price="FREE"
                  active={
                    shippingMethod ===
                    "standard"
                  }
                  onClick={() =>
                    setShippingMethod(
                      "standard",
                    )
                  }
                />

                <ShippingOption
                  title="Express delivery"
                  subtitle="1–2 business days"
                  price="₹149"
                  active={
                    shippingMethod ===
                    "express"
                  }
                  onClick={() =>
                    setShippingMethod(
                      "express",
                    )
                  }
                />

              </div>

            </CheckoutCard>

            {/* =================================================
                PAYMENT
            ================================================= */}

            <CheckoutCard
              number="03"
              title="Payment method"
              description="Choose your preferred payment option."
              icon={
                <CreditCard
                  size={18}
                />
              }
            >

              <div className="space-y-3">

                <PaymentOption
                  selected={
                    payment === "card"
                  }
                  onClick={() => {
                    setPayment(
                      "card",
                    );
                    setOrderError("");
                  }}
                  icon={
                    <CreditCard
                      size={17}
                    />
                  }
                  title="Credit / Debit Card"
                  subtitle="Visa, Mastercard, RuPay"
                />

                <PaymentOption
                  selected={
                    payment === "upi"
                  }
                  onClick={() => {
                    setPayment(
                      "upi",
                    );
                    setOrderError("");
                  }}
                  icon={
                    <Smartphone
                      size={17}
                    />
                  }
                  title="UPI"
                  subtitle="Google Pay, PhonePe, Paytm"
                />

                <PaymentOption
                  selected={
                    payment === "cod"
                  }
                  onClick={() => {
                    setPayment(
                      "cod",
                    );
                    setOrderError("");
                  }}
                  icon={
                    <Package
                      size={17}
                    />
                  }
                  title="Cash on delivery"
                  subtitle="Pay when your order arrives"
                />

              </div>

              <AnimatePresence mode="wait">

                {payment ===
                  "card" && (
                    <CardForm
                      cardNumber={
                        cardNumber
                      }
                      expiry={
                        cardExpiry
                      }
                      cvv={cardCvv}
                      cardholderName={
                        cardholderName
                      }
                      setCardNumber={
                        setCardNumber
                      }
                      setExpiry={
                        setCardExpiry
                      }
                      setCvv={
                        setCardCvv
                      }
                      setCardholderName={
                        setCardholderName
                      }
                    />
                  )}

                {payment ===
                  "upi" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      className="mt-4 rounded-2xl border border-slate-200 bg-slate-50 p-5"
                    >

                      <label className="text-[10px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        UPI ID
                      </label>

                      <div className="relative mt-3">

                        <Smartphone
                          size={15}
                          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                        />

                        <input
                          value={
                            upiId
                          }
                          onChange={(
                            e,
                          ) =>
                            setUpiId(
                              e.target
                                .value,
                            )
                          }
                          placeholder="yourname@upi"
                          className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 pl-10 text-sm text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-slate-500"
                        />

                      </div>

                      <p className="mt-2 text-[9px] text-slate-400">
                        Enter the UPI ID linked
                        to your payment app.
                      </p>

                    </motion.div>
                  )}

                {payment ===
                  "cod" && (
                    <motion.div
                      initial={{
                        opacity: 0,
                        y: 10,
                      }}
                      animate={{
                        opacity: 1,
                        y: 0,
                      }}
                      exit={{
                        opacity: 0,
                        y: -10,
                      }}
                      className="mt-4 flex items-center gap-3 rounded-2xl border border-emerald-100 bg-emerald-50 p-4"
                    >

                      <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-emerald-600">
                        <Check
                          size={16}
                        />
                      </div>

                      <div>

                        <p className="text-xs font-bold text-emerald-900">
                          Cash on delivery selected
                        </p>

                        <p className="mt-1 text-[9px] text-emerald-700">
                          Pay when your order arrives.
                        </p>

                      </div>

                    </motion.div>
                  )}

              </AnimatePresence>

            </CheckoutCard>

            {/* =================================================
                PROTECTION
            ================================================= */}

            <div className="flex items-center gap-4 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">

              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white">
                <ShieldCheck
                  size={19}
                />
              </div>

              <div>

                <p className="text-xs font-bold text-slate-900">
                  Protected checkout
                </p>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Your account and payment details
                  are protected with secure
                  encryption.
                </p>

              </div>

            </div>

          </div>

          {/* =================================================
              RIGHT SUMMARY
          ================================================= */}

          <aside className="lg:sticky lg:top-24 lg:self-start">

            <div className="overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-[0_25px_80px_rgba(15,23,42,0.08)]">

              {/* TOTAL */}

              <div className="relative overflow-hidden border-b border-slate-100 p-7">

                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-slate-100 blur-2xl" />

                <div className="relative">

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Order total
                  </p>

                  <motion.p
                    key={total}
                    initial={{
                      opacity: 0,
                      y: 5,
                    }}
                    animate={{
                      opacity: 1,
                      y: 0,
                    }}
                    className="mt-3 text-4xl font-black tracking-tight text-slate-950"
                  >
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </motion.p>

                  <div className="mt-4 flex items-center gap-2 text-[10px] font-medium text-slate-400">
                    <Lock
                      size={11}
                    />

                    Secure transaction
                  </div>

                </div>

              </div>

              {/* ITEMS */}

              <div className="p-7">

                <div className="mb-5 flex items-center justify-between">

                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">
                    Your items
                  </p>

                  <span className="rounded-full bg-slate-100 px-3 py-1 text-[9px] font-bold text-slate-500">
                    {
                      items.length
                    }{" "}
                    items
                  </span>

                </div>

                {cartLoading ? (
                  <CartSkeleton />
                ) : items.length ===
                  0 ? (
                  <div className="rounded-2xl bg-slate-50 p-6 text-center">

                    <Package
                      size={22}
                      className="mx-auto text-slate-300"
                    />

                    <p className="mt-3 text-xs font-bold text-slate-500">
                      Your cart is empty
                    </p>

                    <Link
                      href="/products"
                      className="mt-4 inline-flex rounded-xl bg-slate-950 px-4 py-3 text-[9px] font-bold uppercase tracking-wider text-white"
                    >
                      Continue shopping
                    </Link>

                  </div>
                ) : (
                  <div className="space-y-4">

                    {items.map(
                      (item) => {
                        const itemPrice =
                          Number(
                            item.price,
                          ) || 0;

                        const itemName =
                          item.product_name ||
                          item.name ||
                          "Product";

                        return (
                          <div
                            key={
                              item.id
                            }
                            className="flex gap-3"
                          >

                            <div className="flex h-16 w-16 shrink-0 items-center justify-center overflow-hidden rounded-2xl bg-slate-100 shadow-inner">

                              {item.image_url ? (
                                <img
                                  src={
                                    item.image_url
                                  }
                                  alt={
                                    itemName
                                  }
                                  className="h-full w-full object-cover"
                                />
                              ) : (
                                <span className="text-2xl">
                                  {
                                    item.emoji ||
                                    "📦"
                                  }
                                </span>
                              )}

                            </div>

                            <div className="min-w-0 flex-1">

                              <p className="truncate text-xs font-bold text-slate-900">
                                {
                                  itemName
                                }
                              </p>

                              {item.variant && (
                                <p className="mt-1 text-[10px] text-slate-400">
                                  {
                                    item.variant
                                  }
                                </p>
                              )}

                              <div className="mt-2 flex items-center justify-between">

                                <span className="text-[10px] text-slate-400">
                                  Qty{" "}
                                  {
                                    item.quantity
                                  }
                                </span>

                                <span className="text-xs font-black text-slate-900">
                                  ₹
                                  {(
                                    itemPrice *
                                    item.quantity
                                  ).toLocaleString(
                                    "en-IN",
                                  )}
                                </span>

                              </div>

                            </div>

                          </div>
                        );
                      },
                    )}

                  </div>
                )}

                {/* COUPON */}

                <div className="mt-7">

                  <div className="flex gap-2">

                    <div className="relative flex-1">

                      <Tag
                        size={13}
                        className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300"
                      />

                      <input
                        value={
                          coupon
                        }
                        onChange={(e) => {
  setCoupon(
    e.target.value.toUpperCase(),
  );

  setCouponApplied(false);
  setCouponError("");
}}
                        placeholder="Promo code"
                        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-3 pl-9 pr-3 text-xs outline-none placeholder:text-slate-300 focus:border-slate-400"
                      />

                    </div>

                    <button
  type="button"
  onClick={() => {
    const enteredCoupon =
      coupon.trim().toUpperCase();

    setCouponError("");

    if (!enteredCoupon) {
      setCouponApplied(false);
      setCouponError(
        "Please enter a coupon code.",
      );
      return;
    }

    if (
      enteredCoupon !==
      VALID_COUPON
    ) {
      setCouponApplied(false);
      setCouponError(
        "Invalid coupon code.",
      );
      return;
    }

    setCouponApplied(true);
    setCouponError("");
  }}
                      className="rounded-xl bg-slate-950 px-5 text-[10px] font-bold uppercase tracking-wider text-white transition hover:bg-slate-800"
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
                      className="mt-2 text-[10px] font-semibold text-emerald-600"
                    >
                      ✓ 10% promotional
                      discount applied
                    </motion.p>
                  )}

                </div>

                {/* BREAKDOWN */}

                <div className="mt-7 space-y-3 border-t border-slate-100 pt-6">

                  <PriceRow
                    label="Subtotal"
                    value={`₹${subtotal.toLocaleString(
                      "en-IN",
                    )}`}
                  />

                  <PriceRow
                    label="Shipping"
                    value={
                      shipping ===
                        0
                        ? "FREE"
                        : `₹${shipping}`
                    }
                  />

                  <PriceRow
                    label="Tax (18%)"
                    value={`₹${tax.toLocaleString(
                      "en-IN",
                    )}`}
                  />

                  {discount >
                    0 && (
                      <PriceRow
                        label="Discount"
                        value={`-₹${discount.toLocaleString(
                          "en-IN",
                        )}`}
                        positive
                      />
                    )}

                </div>

                {/* TOTAL */}

                <div className="mt-6 flex items-end justify-between border-t border-slate-100 pt-6">

                  <span className="text-xs font-semibold text-slate-400">
                    Total
                  </span>

                  <span className="text-2xl font-black text-slate-950">
                    ₹
                    {total.toLocaleString(
                      "en-IN",
                    )}
                  </span>

                </div>

                {/* ADDRESS */}

                {selectedAddress && (
                  <div className="mt-6 rounded-2xl bg-slate-50 p-4">

                    <div className="flex items-center gap-2">

                      <MapPin
                        size={13}
                        className="text-slate-400"
                      />

                      <span className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
                        Delivering to
                      </span>

                    </div>

                    <p className="mt-2 text-xs font-bold text-slate-900">
                      {
                        selectedAddress.full_name
                      }
                    </p>

                    <p className="mt-1 text-[10px] leading-5 text-slate-400">
                      {
                        selectedAddress.address_line
                      }
                      <br />
                      {
                        selectedAddress.city
                      }
                      ,{" "}
                      {
                        selectedAddress.state
                      }{" "}
                      {
                        selectedAddress.postal_code
                      }
                    </p>

                  </div>
                )}

                {/* ORDER BUTTON */}

                <motion.button
                  type="button"
                  whileHover={{
                    scale:
                      placingOrder
                        ? 1
                        : 1.015,
                  }}
                  whileTap={{
                    scale:
                      placingOrder
                        ? 1
                        : 0.97,
                  }}
                  disabled={
                    placingOrder ||
                    loadingAddresses ||
                    cartLoading ||
                    !selectedAddressId ||
                    items.length ===
                    0 ||
                    !userId
                  }
                  onClick={
                    handlePlaceOrder
                  }
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-950 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white shadow-[0_15px_40px_rgba(15,23,42,0.2)] transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-40"
                >

                  {placingOrder ? (
                    <>
                      <span className="h-3 w-3 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      Placing order...
                    </>
                  ) : (
                    <>
                      Place order

                      <ChevronRight
                        size={14}
                      />
                    </>
                  )}

                </motion.button>

                <p className="mt-4 text-center text-[9px] leading-4 text-slate-400">
                  By placing your order,
                  you agree to Vendora's
                  terms and policies.
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-xl"
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
              className="relative w-full max-w-md overflow-hidden rounded-[2.5rem] bg-white p-8 text-center shadow-[0_40px_120px_rgba(0,0,0,.3)]"
            >

              <button
                type="button"
                onClick={() =>
                  setOrdered(false)
                }
                className="absolute right-5 top-5 rounded-full bg-slate-100 p-2 text-slate-400 transition hover:bg-slate-200 hover:text-slate-900"
              >
                <X size={15} />
              </button>

              <motion.div
                initial={{
                  scale: 0,
                  rotate: -20,
                }}
                animate={{
                  scale: 1,
                  rotate: 0,
                }}
                transition={{
                  type: "spring",
                  stiffness: 200,
                }}
                className="mx-auto flex h-20 w-20 items-center justify-center rounded-[1.7rem] bg-slate-950 text-white shadow-xl"
              >
                <Check
                  size={32}
                />
              </motion.div>

              <p className="mt-7 text-[10px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Order confirmed
              </p>

              <h2 className="mt-3 text-3xl font-black text-slate-950">
                You're all set.
              </h2>

              <p className="mx-auto mt-4 max-w-sm text-xs leading-6 text-slate-400">
                Your Vendora order has been
                placed successfully. We'll
                keep you updated throughout
                the delivery.
              </p>

              {createdOrders.length >
                0 && (
                  <div className="mt-7 space-y-2">

                    {createdOrders.map(
                      (order) => (
                        <div
                          key={
                            order.id
                          }
                          className="rounded-2xl bg-slate-50 p-4"
                        >

                          <div className="flex justify-between text-[10px]">

                            <span className="text-slate-400">
                              Order ID
                            </span>

                            <span className="font-bold text-slate-900">
                              {
                                order.order_number ||
                                order.id
                              }
                            </span>

                          </div>

                          <div className="mt-3 flex justify-between text-[10px]">

                            <span className="text-slate-400">
                              Total
                            </span>

                            <span className="font-bold text-slate-900">
                              ₹
                              {Number(
                                order.total,
                              ).toLocaleString(
                                "en-IN",
                              )}
                            </span>

                          </div>

                          <div className="mt-3 flex justify-between text-[10px]">

                            <span className="text-slate-400">
                              Payment
                            </span>

                            <span className="font-bold uppercase text-slate-900">
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
                className="mt-5 flex w-full items-center justify-center rounded-2xl bg-slate-950 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white transition hover:bg-slate-800"
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
      className={`flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.15em] ${active || done
          ? "text-slate-950"
          : "text-slate-300"
        }`}
    >

      <span
        className={`flex h-8 w-8 items-center justify-center rounded-full border ${active
            ? "border-slate-950 bg-slate-950 text-white"
            : done
              ? "border-slate-300 bg-white"
              : "border-slate-200 bg-white"
          }`}
      >
        {done ? (
          <Check size={12} />
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
  description,
  icon,
  children,
}: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <motion.section
      whileHover={{
        y: -2,
      }}
      transition={{
        duration: 0.2,
      }}
      className="rounded-[2rem] border border-slate-200 bg-white p-6 shadow-[0_15px_50px_rgba(15,23,42,0.04)] md:p-7"
    >

      <div className="flex items-center gap-4">

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-slate-950 text-white shadow-lg">
          {icon}
        </div>

        <div>

          <p className="text-[9px] font-bold uppercase tracking-[0.2em] text-slate-400">
            Step {number}
          </p>

          <h2 className="mt-1 text-sm font-black text-slate-950">
            {title}
          </h2>

          <p className="mt-1 text-[10px] text-slate-400">
            {description}
          </p>

        </div>

      </div>

      <div className="mt-6">
        {children}
      </div>

    </motion.section>
  );
}

/* =========================================================
   ADDRESS CARD
   ========================================================= */

function AddressCard({
  address,
  selected,
  onClick,
}: {
  address: Address;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group w-full rounded-2xl border p-5 text-left transition ${selected
          ? "border-slate-950 bg-slate-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
        }`}
    >

      <div className="flex items-start justify-between gap-4">

        <div className="flex gap-4">

          <div
            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${selected
                ? "bg-slate-950 text-white"
                : "bg-slate-100 text-slate-400"
              }`}
          >
            <MapPin size={16} />
          </div>

          <div>

            <div className="flex flex-wrap items-center gap-2">

              <p className="text-xs font-black text-slate-900">
                {
                  address.full_name
                }
              </p>

              {address.is_default && (
                <span className="rounded-full bg-slate-100 px-2 py-1 text-[7px] font-bold uppercase tracking-wider text-slate-500">
                  Default
                </span>
              )}

            </div>

            <p className="mt-2 text-[10px] leading-5 text-slate-500">

              {
                address.address_line
              }

              <br />

              {
                address.city
              }
              ,{" "}
              {
                address.state
              }

              <br />

              {
                address.postal_code
              }
              ,{" "}
              {
                address.country
              }

            </p>

            <p className="mt-2 text-[9px] font-medium text-slate-400">
              {address.phone}
            </p>

          </div>

        </div>

        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${selected
              ? "border-slate-950 bg-slate-950"
              : "border-slate-200"
            }`}
        >
          {selected && (
            <Check
              size={11}
              className="text-white"
            />
          )}
        </div>

      </div>

    </button>
  );
}

/* =========================================================
   ADDRESS FORM
   ========================================================= */

function AddressForm({
  value,
  saving,
  onChange,
  onCancel,
  onSave,
}: {
  value: AddressCreate;
  saving: boolean;
  onChange: (
    field: keyof AddressCreate,
    value: string | boolean,
  ) => void;
  onCancel: () => void;
  onSave: () => void;
}) {
  return (
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

      <div className="mt-4 rounded-3xl border border-slate-200 bg-slate-50 p-5">

        <div className="mb-5 flex items-center justify-between">

          <div className="flex items-center gap-3">

            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-950 text-white">
              <Plus size={15} />
            </div>

            <div>

              <p className="text-xs font-black">
                New delivery address
              </p>

              <p className="mt-1 text-[9px] text-slate-400">
                Add your delivery details.
              </p>

            </div>

          </div>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-full bg-white p-2 text-slate-400 transition hover:text-slate-900"
          >
            <X size={14} />
          </button>

        </div>

        <div className="grid gap-4 sm:grid-cols-2">

          <FormInput
            label="Full name"
            placeholder="Your full name"
            value={
              value.full_name
            }
            onChange={(v) =>
              onChange(
                "full_name",
                v,
              )
            }
          />

          <FormInput
            label="Phone"
            placeholder="+91 XXXXX XXXXX"
            value={
              value.phone
            }
            onChange={(v) =>
              onChange(
                "phone",
                v,
              )
            }
          />

          <div className="sm:col-span-2">

            <FormInput
              label="Address"
              placeholder="House / street / area"
              value={
                value.address_line
              }
              onChange={(v) =>
                onChange(
                  "address_line",
                  v,
                )
              }
            />

          </div>

          <FormInput
            label="City"
            placeholder="City"
            value={
              value.city
            }
            onChange={(v) =>
              onChange(
                "city",
                v,
              )
            }
          />

          <FormInput
            label="State"
            placeholder="State"
            value={
              value.state
            }
            onChange={(v) =>
              onChange(
                "state",
                v,
              )
            }
          />

          <FormInput
            label="Postal code"
            placeholder="PIN code"
            value={
              value.postal_code
            }
            onChange={(v) =>
              onChange(
                "postal_code",
                v,
              )
            }
          />

          <FormInput
            label="Country"
            placeholder="Country"
            value={
              value.country ||
              "India"
            }
            onChange={(v) =>
              onChange(
                "country",
                v,
              )
            }
          />

        </div>

        <label className="mt-5 flex cursor-pointer items-center gap-3">

          <input
            type="checkbox"
            checked={Boolean(
              value.is_default,
            )}
            onChange={(e) =>
              onChange(
                "is_default",
                e.target
                  .checked,
              )
            }
            className="h-4 w-4 rounded border-slate-300"
          />

          <span className="text-[10px] font-semibold text-slate-500">
            Make this my default address
          </span>

        </label>

        <div className="mt-5 flex gap-3">

          <button
            type="button"
            onClick={
              onCancel
            }
            disabled={
              saving
            }
            className="flex-1 rounded-xl border border-slate-200 bg-white py-3 text-[9px] font-bold uppercase tracking-wider text-slate-500"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={
              onSave
            }
            disabled={
              saving
            }
            className="flex-1 rounded-xl bg-slate-950 py-3 text-[9px] font-bold uppercase tracking-wider text-white disabled:opacity-50"
          >
            {saving
              ? "Saving..."
              : "Save address"}
          </button>

        </div>

      </div>

    </motion.div>
  );
}

/* =========================================================
   FORM INPUT
   ========================================================= */

function FormInput({
  label,
  placeholder,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (
    value: string,
  ) => void;
  type?: string;
}) {
  return (
    <div>

      <label className="text-[9px] font-bold uppercase tracking-[0.15em] text-slate-400">
        {label}
      </label>

      <input
        type={type}
        value={value}
        onChange={(e) =>
          onChange(
            e.target.value,
          )
        }
        placeholder={
          placeholder
        }
        className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-3 text-xs text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-slate-400 focus:ring-2 focus:ring-slate-100"
      />

    </div>
  );
}

/* =========================================================
   ADDRESS SKELETON
   ========================================================= */

function AddressSkeleton() {
  return (
    <div className="space-y-3">

      {[1, 2].map(
        (item) => (
          <div
            key={item}
            className="animate-pulse rounded-2xl border border-slate-100 bg-slate-50 p-5"
          >

            <div className="flex gap-4">

              <div className="h-11 w-11 rounded-xl bg-slate-200" />

              <div className="flex-1">

                <div className="h-3 w-32 rounded bg-slate-200" />

                <div className="mt-3 h-2 w-48 rounded bg-slate-200" />

                <div className="mt-2 h-2 w-32 rounded bg-slate-200" />

              </div>

            </div>

          </div>
        ),
      )}

    </div>
  );
}

/* =========================================================
   CART SKELETON
   ========================================================= */

function CartSkeleton() {
  return (
    <div className="space-y-4">

      {[1, 2].map(
        (item) => (
          <div
            key={item}
            className="flex animate-pulse gap-3"
          >

            <div className="h-16 w-16 shrink-0 rounded-2xl bg-slate-100" />

            <div className="flex-1">

              <div className="h-3 w-32 rounded bg-slate-100" />

              <div className="mt-3 h-2 w-20 rounded bg-slate-100" />

              <div className="mt-3 h-2 w-full rounded bg-slate-100" />

            </div>

          </div>
        ),
      )}

    </div>
  );
}

/* =========================================================
   EMPTY ADDRESS
   ========================================================= */

function EmptyAddress({
  onAdd,
}: {
  onAdd: () => void;
}) {
  return (
    <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-7 text-center">

      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-slate-400 shadow-sm">
        <MapPin size={20} />
      </div>

      <p className="mt-4 text-sm font-black">
        No delivery address
      </p>

      <p className="mx-auto mt-2 max-w-sm text-xs leading-5 text-slate-400">
        Add a delivery address to continue
        with your order.
      </p>

      <button
        type="button"
        onClick={onAdd}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-slate-950 px-5 py-3 text-[9px] font-bold uppercase tracking-wider text-white"
      >
        <Plus size={13} />
        Add address
      </button>

    </div>
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
  onClick,
}: {
  title: string;
  subtitle: string;
  price: string;
  active?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-2xl border p-5 text-left transition ${active
          ? "border-slate-950 bg-slate-50 shadow-sm"
          : "border-slate-200 bg-white hover:border-slate-300"
        }`}
    >

      <div className="flex items-start justify-between">

        <div>

          <p className="text-xs font-black text-slate-900">
            {title}
          </p>

          <p className="mt-2 text-[10px] text-slate-400">
            {subtitle}
          </p>

        </div>

        <span className="text-[10px] font-black text-slate-900">
          {price}
        </span>

      </div>

      {active && (
        <div className="mt-4 flex items-center gap-1 text-[9px] font-bold text-slate-500">
          <Check size={11} />
          Selected
        </div>
      )}

    </button>
  );
}

/* =========================================================
   PAYMENT OPTION
   ========================================================= */

function PaymentOption({
  selected,
  onClick,
  icon,
  title,
  subtitle,
}: {
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
      className={`flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition ${selected
          ? "border-slate-950 bg-slate-50"
          : "border-slate-200 bg-white hover:border-slate-300"
        }`}
    >

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${selected
            ? "bg-slate-950 text-white"
            : "bg-slate-100 text-slate-400"
          }`}
      >
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-xs font-bold text-slate-900">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-slate-400">
          {subtitle}
        </p>

      </div>

      <div
        className={`flex h-5 w-5 items-center justify-center rounded-full border ${selected
            ? "border-slate-950 bg-slate-950"
            : "border-slate-200"
          }`}
      >
        {selected && (
          <div className="h-1.5 w-1.5 rounded-full bg-white" />
        )}
      </div>

    </button>
  );
}

/* =========================================================
   CARD FORM
   ========================================================= */

function CardForm({
  cardNumber,
  expiry,
  cvv,
  cardholderName,
  setCardNumber,
  setExpiry,
  setCvv,
  setCardholderName,
}: {
  cardNumber: string;
  expiry: string;
  cvv: string;
  cardholderName: string;
  setCardNumber: (
    value: string,
  ) => void;
  setExpiry: (
    value: string,
  ) => void;
  setCvv: (
    value: string,
  ) => void;
  setCardholderName: (
    value: string,
  ) => void;
}) {
  function handleCardNumber(
    value: string,
  ) {
    const clean =
      value
        .replace(/\D/g, "")
        .slice(0, 16);

    const formatted =
      clean.match(
        /.{1,4}/g,
      )?.join(" ") || "";

    setCardNumber(
      formatted,
    );
  }

  function handleExpiry(
    value: string,
  ) {
    const clean =
      value
        .replace(/\D/g, "")
        .slice(0, 4);

    if (
      clean.length > 2
    ) {
      setExpiry(
        `${clean.slice(
          0,
          2,
        )} / ${clean.slice(2)}`,
      );
    } else {
      setExpiry(clean);
    }
  }

  return (
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

      <div className="mt-4 grid gap-4 rounded-2xl border border-slate-200 bg-slate-50 p-5">

        <FormInput
          label="Card number"
          placeholder="1234 5678 9012 3456"
          value={
            cardNumber
          }
          onChange={
            handleCardNumber
          }
        />

        <div className="grid grid-cols-2 gap-3">

          <FormInput
            label="Expiry"
            placeholder="MM / YY"
            value={
              expiry
            }
            onChange={
              handleExpiry
            }
          />

          <FormInput
            label="CVV"
            placeholder="•••"
            value={
              cvv
            }
            onChange={(
              value,
            ) =>
              setCvv(
                value
                  .replace(
                    /\D/g,
                    "",
                  )
                  .slice(
                    0,
                    4,
                  ),
              )
            }
            type="password"
          />

        </div>

        <FormInput
          label="Cardholder name"
          placeholder="Name on card"
          value={
            cardholderName
          }
          onChange={
            setCardholderName
          }
        />

        <div className="flex items-center gap-2 text-[9px] text-slate-400">

          <Lock size={11} />

          Card details are securely handled.

        </div>

      </div>

    </motion.div>
  );
}

/* =========================================================
   PRICE ROW
   ========================================================= */

function PriceRow({
  label,
  value,
  positive = false,
}: {
  label: string;
  value: string;
  positive?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-[10px]">

      <span className="text-slate-400">
        {label}
      </span>

      <span
        className={
          positive
            ? "font-bold text-emerald-600"
            : "font-semibold text-slate-700"
        }
      >
        {value}
      </span>

    </div>
  );
}