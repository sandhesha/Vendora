"use client";

import { motion } from "framer-motion";

export default function AntigravityBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">

      {/* Main ambient glow */}
      <motion.div
        className="
          absolute
          left-[8%]
          top-[10%]
          h-72
          w-72
          rounded-full
          bg-blue-200/30
          blur-3xl
        "
        animate={{
          x: [0, 40, 0],
          y: [0, -30, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Purple glow */}
      <motion.div
        className="
          absolute
          right-[5%]
          top-[18%]
          h-80
          w-80
          rounded-full
          bg-violet-200/25
          blur-3xl
        "
        animate={{
          x: [0, -35, 0],
          y: [0, 45, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Cyan glow */}
      <motion.div
        className="
          absolute
          bottom-[5%]
          left-[40%]
          h-64
          w-64
          rounded-full
          bg-cyan-200/20
          blur-3xl
        "
        animate={{
          x: [0, -50, 0],
          y: [0, -25, 0],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating spheres */}

      <motion.div
        className="
          absolute
          left-[15%]
          top-[35%]
          h-5
          w-5
          rounded-full
          bg-white
          shadow-[0_10px_30px_rgba(59,130,246,0.25)]
        "
        animate={{
          y: [0, -30, 0],
          x: [0, 12, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="
          absolute
          right-[20%]
          top-[45%]
          h-3
          w-3
          rounded-full
          bg-white
          shadow-[0_10px_25px_rgba(139,92,246,0.3)]
        "
        animate={{
          y: [0, 25, 0],
          x: [0, -15, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

    </div>
  );
}