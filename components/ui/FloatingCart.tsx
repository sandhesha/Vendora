"use client";

import { motion } from "framer-motion";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function FloatingCart({
  count = 0,
}: {
  count?: number;
}) {
  if (!count) return null;

  return (
    <Link
      href="/cart"
      className="fixed bottom-24 right-5 z-40 md:hidden"
    >
      <motion.div
        initial={{
          scale: 0,
          rotate: -15,
        }}
        animate={{
          scale: 1,
          rotate: 0,
        }}
        whileTap={{
          scale: 0.9,
        }}
        className="relative flex h-14 w-14 items-center justify-center rounded-full bg-white text-black shadow-[0_15px_50px_rgba(255,255,255,.15)]"
      >
        <ShoppingCart size={20} />

        <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-black text-[8px] font-black text-white">
          {count}
        </span>
      </motion.div>
    </Link>
  );
}