"use client";
import { motion } from "framer-motion";
import ProductSkeleton from "./ProductSkeleton";

export default function PageSkeleton() {
  return (
    <main className="min-h-screen bg-black px-5 pb-24 pt-28 text-white md:px-8">

      <div className="mx-auto max-w-7xl">

        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="h-8 w-64 rounded-full bg-white/10"
        />

        <motion.div
          animate={{ opacity: [0.3, 0.7, 0.3] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: 0.1 }}
          className="mt-4 h-3 w-96 max-w-full rounded-full bg-white/10"
        />

        <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">

          {Array.from({ length: 8 }).map((_, index) => (
            <ProductSkeleton key={index} />
          ))}

        </div>

      </div>

    </main>
  );
}