"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Heart, ShoppingCart, ArrowUpRight, Star } from "lucide-react";

const products = [
  {
    id: 1,
    name: "Aero Runner X",
    category: "Sneakers",
    price: "₹4,999",
    rating: "4.8",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 2,
    name: "Nova Headphones",
    category: "Audio",
    price: "₹7,499",
    rating: "4.9",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 3,
    name: "Vision Smartwatch",
    category: "Wearables",
    price: "₹5,999",
    rating: "4.7",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=80",
  },
  {
    id: 4,
    name: "Urban Backpack",
    category: "Accessories",
    price: "₹2,999",
    rating: "4.6",
    image:
      "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=900&q=80",
  },
];

export default function FeaturedProducts() {
  return (
    <section className="relative overflow-hidden px-6 py-28">
      {/* Background glow */}
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
              <span className="text-white/40">Products</span>
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

        {/* Product Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProductCard({
  product,
  index,
}: {
  product: (typeof products)[number];
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.1,
      }}
      whileHover={{
        y: -10,
      }}
      className="group relative"
    >
      {/* Product Image */}
      <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.04]">
        <Link href={`/products/${product.id}`}>
          <motion.div
            whileHover={{
              scale: 1.08,
            }}
            transition={{ duration: 0.5 }}
            className="aspect-square"
          >
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-cover"
            />
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
          {product.category}
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
              <Star size={13} fill="currentColor" />
              {product.rating}
            </div>
          </div>

          <span className="font-semibold text-white">
            {product.price}
          </span>
        </div>

        {/* Add to Cart */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/10 py-3 text-sm font-medium text-white transition hover:bg-white hover:text-black"
        >
          <ShoppingCart size={17} />
          Add to Cart
        </motion.button>
      </div>
    </motion.div>
  );
}