"use client";

import { motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Heart,
  Minus,
  Plus,
  Rotate3D,
  ShieldCheck,
  ShoppingBag,
  Star,
  Truck,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import {
  getProduct,
  type Product as ApiProduct,
} from "@/lib/api/products";


export default function ProductDetailsPage() {
  const params = useParams();
  const router = useRouter();

  const productId = Number(params.id);

  const [product, setProduct] =
    useState<ApiProduct | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] =
    useState("Default");
  const [selectedSize, setSelectedSize] =
    useState("Standard");
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProduct() {
      try {
        setLoading(true);
        setError("");

        if (!Number.isInteger(productId)) {
          throw new Error("Invalid product ID");
        }

        const data = await getProduct(productId);

        if (!mounted) return;

        setProduct(data);
      } catch (err) {
        console.error(
          "Failed to load product:",
          err,
        );

        if (!mounted) return;

        setError("Failed to load product.");
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProduct();

    return () => {
      mounted = false;
    };
  }, [productId]);

  const addToCart = () => {
    setAdded(true);

    setTimeout(() => {
      setAdded(false);
    }, 1800);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-black px-5 pb-28 pt-28 text-white md:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="animate-pulse">
            <div className="mb-8 h-4 w-32 rounded bg-white/10" />

            <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
              <div className="h-[520px] rounded-[2.5rem] bg-white/[0.04]" />

              <div className="space-y-5 py-8">
                <div className="h-5 w-32 rounded bg-white/10" />
                <div className="h-14 w-3/4 rounded bg-white/10" />
                <div className="h-8 w-40 rounded bg-white/10" />
                <div className="h-24 w-full rounded bg-white/10" />
                <div className="h-14 w-full rounded bg-white/10" />
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  function Feature({
  icon: Icon,
  title,
  text,
}: {
  icon: typeof Truck;
  title: string;
  text: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/[0.06]">
        <Icon size={16} />
      </div>

      <div>
        <p className="text-xs font-semibold">
          {title}
        </p>

        <p className="mt-1 text-[10px] text-white/30">
          {text}
        </p>
      </div>
    </div>
  );
}

function InfoCard({
  title,
  items,
}: {
  title: string;
  items: string[];
}) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6">
      <h2 className="text-sm font-semibold">
        {title}
      </h2>

      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center gap-3 text-xs text-white/40"
          >
            <Check size={13} className="shrink-0" />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

  if (error || !product) {
    return (
      <main className="min-h-screen bg-black px-5 pb-28 pt-28 text-white md:px-8">
        <div className="mx-auto flex min-h-[60vh] max-w-2xl flex-col items-center justify-center text-center">
          <h1 className="text-3xl font-bold">
            Product not found
          </h1>

          <p className="mt-3 text-white/40">
            {error || "This product does not exist."}
          </p>

          <button
            onClick={() => router.push("/products")}
            className="mt-6 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black"
          >
            Back to products
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* BACK */}
        <motion.button
          initial={{ opacity: 0, x: -15 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => router.push("/products")}
          className="mb-8 flex items-center gap-2 text-xs text-white/30 transition hover:text-white"
        >
          <ArrowLeft size={14} />
          Back to products
        </motion.button>

        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">

          {/* PRODUCT SHOWCASE */}

          <section>
            <motion.div
              initial={{
                opacity: 0,
                scale: 0.92,
              }}
              animate={{
                opacity: 1,
                scale: 1,
              }}
              className="relative h-[520px] overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/[0.035]"
            >
              {/* ROTATING RINGS */}

              <motion.div
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 18,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[380px] w-[380px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.06]"
              />

              <motion.div
                animate={{
                  rotate: -360,
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute left-1/2 top-1/2 h-[280px] w-[280px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.07]"
              />

              {/* GLOW */}

              <motion.div
                animate={{
                  scale: [1, 1.15, 1],
                  opacity: [0.15, 0.25, 0.15],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                }}
                className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white blur-3xl"
              />

              {/* PRODUCT IMAGE */}

              <motion.div
                key={selectedImage}
                initial={{
                  opacity: 0,
                  scale: 0.75,
                  rotateY: -25,
                }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  rotateY: 0,
                  y: [0, -10, 0],
                }}
                transition={{
                  y: {
                    duration: 4,
                    repeat: Infinity,
                  },
                  opacity: {
                    duration: 0.4,
                  },
                  scale: {
                    duration: 0.5,
                  },
                }}
                whileHover={{
                  scale: 1.08,
                  rotateY: 15,
                  rotateX: -5,
                }}
                className="absolute left-1/2 top-1/2 z-10 flex h-72 w-72 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-[3rem] bg-white shadow-2xl"
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {product.image_url ? (
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="h-full w-full rounded-[3rem] object-contain p-8"
                  />
                ) : (
                  <ShoppingBag
                    size={100}
                    className="text-black/20"
                  />
                )}
              </motion.div>

              {/* BADGE */}

              <div className="absolute left-6 top-6 z-20 flex items-center gap-2 rounded-full border border-white/10 bg-black/50 px-4 py-2 backdrop-blur-xl">
                <Rotate3D size={13} />

                <span className="text-[9px] uppercase tracking-[0.2em] text-white/50">
                  Interactive product
                </span>
              </div>

              {/* WISHLIST */}

              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => setLiked(!liked)}
                className="absolute right-6 top-6 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-xl"
              >
                <Heart
                  size={17}
                  fill={
                    liked
                      ? "currentColor"
                      : "transparent"
                  }
                />
              </motion.button>
            </motion.div>
          </section>

          {/* PRODUCT INFORMATION */}

          <section className="lg:pt-4">
            <motion.div
              initial={{
                opacity: 0,
                x: 25,
              }}
              animate={{
                opacity: 1,
                x: 0,
              }}
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-white/20">
                Category #{product.category_id}
              </p>

              <h1 className="mt-4 text-4xl font-bold md:text-6xl">
                {product.name}
              </h1>

              {/* RATING */}

              <div className="mt-5 flex items-center gap-3">
                <div className="flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-black">
                  <Star
                    size={12}
                    className="fill-black"
                  />

                  <span className="text-xs font-bold">
                    4.5
                  </span>
                </div>

                <span className="text-xs text-white/25">
                  Reviews coming soon
                </span>
              </div>

              {/* PRICE */}

              <div className="mt-7">
                <span className="text-4xl font-bold">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
              </div>

              {/* DESCRIPTION */}

              <p className="mt-6 max-w-xl text-sm leading-7 text-white/35">
                {product.description ||
                  "No description available for this product."}
              </p>

              {/* STOCK */}

              <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.025] p-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-white/40">
                    Availability
                  </span>

                  <span
                    className={`text-xs font-semibold ${
                      product.stock > 0
                        ? "text-white"
                        : "text-red-400"
                    }`}
                  >
                    {product.stock > 0
                      ? `${product.stock} in stock`
                      : "Out of stock"}
                  </span>
                </div>
              </div>

              {/* PRODUCT OPTIONS */}

              <div className="mt-8">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-semibold">
                    Product
                  </p>

                  <span className="text-[10px] text-white/25">
                    Standard
                  </span>
                </div>

                <div className="mt-3">
                  <button
                    onClick={() =>
                      setSelectedColor("Default")
                    }
                    className="rounded-xl border border-white/30 bg-white px-4 py-2.5 text-[10px] text-black"
                  >
                    Standard
                  </button>
                </div>
              </div>

              {/* QUANTITY */}

              <div className="mt-7 flex items-center justify-between">
                <p className="text-xs font-semibold">
                  Quantity
                </p>

                <div className="flex items-center overflow-hidden rounded-xl border border-white/10">
                  <button
                    onClick={() =>
                      setQuantity(
                        Math.max(1, quantity - 1),
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center text-white/40 hover:bg-white hover:text-black"
                  >
                    <Minus size={13} />
                  </button>

                  <span className="w-10 text-center text-xs">
                    {quantity}
                  </span>

                  <button
                    disabled={
                      quantity >= product.stock
                    }
                    onClick={() =>
                      setQuantity(
                        Math.min(
                          product.stock,
                          quantity + 1,
                        ),
                      )
                    }
                    className="flex h-10 w-10 items-center justify-center text-white/40 hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-20"
                  >
                    <Plus size={13} />
                  </button>
                </div>
              </div>

              {/* ACTIONS */}

              <div className="mt-8 grid gap-3 sm:grid-cols-[1fr_auto]">
                <motion.button
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  disabled={product.stock <= 0}
                  onClick={addToCart}
                  className="flex items-center justify-center gap-2 rounded-2xl bg-white py-4 text-xs font-bold text-black disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {added ? (
                    <>
                      <Check size={15} />
                      Added to cart
                    </>
                  ) : (
                    <>
                      <ShoppingBag size={15} />
                      Add to cart
                    </>
                  )}
                </motion.button>

                <button
                  disabled={product.stock <= 0}
                  className="flex items-center justify-center gap-2 rounded-2xl border border-white/10 px-6 py-4 text-xs font-semibold text-white/60 transition hover:border-white/30 hover:text-white disabled:opacity-40"
                >
                  <Zap size={14} />
                  Buy now
                </button>
              </div>

              {/* DELIVERY */}

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <Feature
                  icon={Truck}
                  title="Free delivery"
                  text="On orders above ₹20,000"
                />

                <Feature
                  icon={ShieldCheck}
                  title="Secure purchase"
                  text="Buyer protection included"
                />
              </div>

              {/* VENDOR */}

              <div className="mt-5 flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.025] p-5">
                <div>
                  <p className="text-[9px] uppercase tracking-wider text-white/20">
                    Sold by
                  </p>

                  <p className="mt-1 text-xs font-semibold">
                    Vendor #{product.vendor_id}
                  </p>
                </div>

                <button className="flex items-center gap-1 text-[10px] text-white/30 hover:text-white">
                  Visit store
                  <ArrowRight size={12} />
                </button>
              </div>
            </motion.div>
          </section>
        </div>

        {/* LOWER INFORMATION */}

        <section className="mt-16 grid gap-5 lg:grid-cols-3">
          <InfoCard
            title="Product details"
            items={[
              `SKU: ${product.sku}`,
              `Stock: ${product.stock}`,
              `Category ID: ${product.category_id}`,
              "Quality checked by Vendora",
            ]}
          />

          <InfoCard
            title="Specifications"
            items={[
              "Vendor supplied product",
              "Secure marketplace purchase",
              "Product information verified",
              "Availability shown in real time",
            ]}
          />

          <InfoCard
            title="Why you'll love it"
            items={[
              "Trusted marketplace",
              "Clear product information",
              "Secure checkout",
              "Vendor-backed shopping experience",
            ]}
          />
        </section>
      </div>
    </main>
  );
}