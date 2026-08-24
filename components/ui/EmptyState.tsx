"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Heart,
  PackageOpen,
  Search,
  ShoppingBag,
  Star,
} from "lucide-react";
import Link from "next/link";

type EmptyStateType =
  | "search"
  | "cart"
  | "wishlist"
  | "orders"
  | "reviews"
  | "products";

const config = {
  search: {
    icon: Search,
    title: "Nothing found",
    message:
      "We couldn't find anything matching your search. Try different keywords.",
    action: "Explore products",
    href: "/products",
  },

  cart: {
    icon: ShoppingBag,
    title: "Your cart is empty",
    message:
      "Looks like you haven't added anything to your cart yet.",
    action: "Start shopping",
    href: "/products",
  },

  wishlist: {
    icon: Heart,
    title: "Your wishlist is empty",
    message:
      "Save products you love and they'll appear here.",
    action: "Discover products",
    href: "/products",
  },

  orders: {
    icon: PackageOpen,
    title: "No orders yet",
    message:
      "Your orders will appear here once you make your first purchase.",
    action: "Browse marketplace",
    href: "/products",
  },

  reviews: {
    icon: Star,
    title: "No reviews yet",
    message:
      "Be the first to share your experience with this product.",
    action: "Explore products",
    href: "/products",
  },

  products: {
    icon: PackageOpen,
    title: "No products available",
    message:
      "This vendor hasn't added any products yet.",
    action: "Back to marketplace",
    href: "/products",
  },
};

export default function EmptyState({
  type = "search",
}: {
  type?: EmptyStateType;
}) {
  const item = config[type];
  const Icon = item.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 25 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotateY: [0, 8, -8, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(255,255,255,.04)]"
      >
        <Icon size={34} className="text-white/25" />
      </motion.div>

      <p className="mt-7 text-[8px] uppercase tracking-[0.3em] text-white/20">
        Vendora marketplace
      </p>

      <h2 className="mt-3 text-2xl font-black">
        {item.title}
      </h2>

      <p className="mt-3 max-w-sm text-[9px] leading-5 text-white/25">
        {item.message}
      </p>

      <Link
        href={item.href}
        className="mt-7 flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[8px] font-black uppercase tracking-[0.15em] text-black transition hover:scale-105"
      >
        {item.action}
        <ArrowRight size={12} />
      </Link>
    </motion.div>
  );
}