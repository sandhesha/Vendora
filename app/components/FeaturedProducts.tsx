"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  Heart,
  ShoppingCart,
  ArrowUpRight,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  getProducts,
  type Product,
} from "@/lib/api/products";

import { addCartItem } from "@/lib/api/cart";
import { useAuth } from "@/lib/auth/auth-context";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        const data = await getProducts();

        if (mounted) {
          setProducts(
            data
              .filter((product) => product.is_active)
              .slice(0, 4)
          );
        }
      } catch (error) {
        console.error("Failed to load featured products:", error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <section className="relative overflow-hidden px-6 py-28">
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mb-14 flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="mb-3 text-sm uppercase tracking-[0.35em] text-white/40">
              Trending now
            </p>

            <h2 className="text-4xl font-bold text-white md:text-6xl">
              Featured{" "}
              <span className="text-white/40">
                Products
              </span>
            </h2>
          </motion.div>

          <Link href="/products">
            <motion.div
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-sm text-white/60 hover:text-white"
            >
              View all
              <ArrowUpRight size={17} />
            </motion.div>
          </Link>
        </div>

        {/* Loading */}
        {loading && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="aspect-square animate-pulse rounded-3xl border border-white/10 bg-white/[0.04]"
              />
            ))}
          </div>
        )}

        {/* Empty */}
        {!loading && products.length === 0 && (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <p className="text-sm text-white/40">
              No featured products available.
            </p>
          </div>
        )}

        {/* Products */}
        {!loading && products.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {products.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const { user } = useAuth();

  const [adding, setAdding] = useState(false);
  const [added, setAdded] = useState(false);
  const [error, setError] = useState("");

  async function handleAddToCart() {
    setError("");

    if (!user) {
      setError("Please login first.");
      return;
    }

    try {
      setAdding(true);

      await addCartItem(user.id, {
        product_id: product.id,
        variant_id: null,
        quantity: 1,
      });

      setAdded(true);

      setTimeout(() => {
        setAdded(false);
      }, 1500);
    } catch (err) {
      console.error("Failed to add product to cart:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to add product to cart.",
      );
    } finally {
      setAdding(false);
    }
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      whileHover={{ y: -10 }}
      className="group relative"
    >
      {/* Image */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">

        <Link href={`/products/${product.id}`}>
          <motion.div
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.5 }}
            className="aspect-square"
          >
            {product.image_url ? (
              <img
                src={product.image_url}
                alt={product.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-white/[0.03]">
                <span className="text-sm text-white/20">
                  No image
                </span>
              </div>
            )}
          </motion.div>
        </Link>

        {/* Gradient */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Wishlist */}
        <motion.button
          whileHover={{ scale: 1.15 }}
          whileTap={{ scale: 0.85 }}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 text-white backdrop-blur-md"
          aria-label={`Add ${product.name} to wishlist`}
        >
          <Heart size={18} />
        </motion.button>

        {/* Category */}
        <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/40 px-3 py-1 text-xs text-white/70 backdrop-blur-md">
          Product
        </span>
      </div>

      {/* Details */}
      <div className="px-1 pt-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="font-semibold text-white transition group-hover:text-white/70">
                {product.name}
              </h3>
            </Link>

            <div className="mt-2 flex items-center gap-1 text-xs text-white/50">
              <Star
                size={13}
                fill="currentColor"
              />
              <span>4.8</span>
            </div>
          </div>

          <span className="font-semibold text-white">
            ₹{product.price.toLocaleString("en-IN")}
          </span>
        </div>

        {/* Add to Cart */}
        <motion.button
  type="button"
  whileHover={{
    scale: 1.02,
  }}
  whileTap={{
    scale: 0.97,
  }}
  onClick={handleAddToCart}
  disabled={adding}
  className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black disabled:cursor-not-allowed disabled:opacity-50"
>
  <ShoppingCart size={17} />

  {adding
    ? "Adding..."
    : added
      ? "Added ✓"
      : "Add to Cart"}
</motion.button>

{error && (
  <p className="mt-2 text-center text-[10px] text-red-400">
    {error}
  </p>
)}
      </div>
    </motion.div>
  );
}