"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  ArrowLeft,
  RefreshCw,
} from "lucide-react";

export default function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this page. Please try again.",
  onRetry,
}: {
  title?: string;
  message?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex min-h-[420px] flex-col items-center justify-center px-6 text-center">

      <motion.div
        animate={{
          rotate: [0, -5, 5, -3, 3, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 3,
        }}
        className="flex h-24 w-24 items-center justify-center rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_30px_80px_rgba(255,255,255,.04)]"
      >
        <AlertTriangle
          size={34}
          className="text-white/25"
        />
      </motion.div>

      <p className="mt-7 text-[8px] uppercase tracking-[0.3em] text-white/20">
        Vendora error
      </p>

      <h2 className="mt-3 text-2xl font-black">
        {title}
      </h2>

      <p className="mt-3 max-w-sm text-[9px] leading-5 text-white/25">
        {message}
      </p>

      <div className="mt-7 flex flex-wrap justify-center gap-3">

        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 rounded-xl bg-white px-5 py-3 text-[8px] font-black uppercase tracking-[0.15em] text-black transition hover:scale-105"
          >
            <RefreshCw size={12} />
            Try again
          </button>
        )}

        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-[8px] font-bold uppercase tracking-[0.15em] text-white/30 transition hover:border-white/25 hover:text-white"
        >
          <ArrowLeft size={12} />
          Go back
        </button>

      </div>

    </div>
  );
}