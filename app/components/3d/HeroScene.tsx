"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import {
  ArrowUpRight,
  Heart,
  ShoppingBag,
  Star,
  Zap,
} from "lucide-react";
import { useRef, useState } from "react";

export default function HeroScene() {
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  const springX = useSpring(rotateX, {
    stiffness: 180,
    damping: 18,
    mass: 0.8,
  });

  const springY = useSpring(rotateY, {
    stiffness: 180,
    damping: 18,
    mass: 0.8,
  });

  const [dragging, setDragging] = useState(false);

  const startX = useRef(0);
  const startY = useRef(0);
  const startRotateX = useRef(0);
  const startRotateY = useRef(0);

  function handlePointerDown(
    e: React.PointerEvent<HTMLDivElement>,
  ) {
    e.preventDefault();

    setDragging(true);

    startX.current = e.clientX;
    startY.current = e.clientY;

    startRotateX.current = rotateX.get();
    startRotateY.current = rotateY.get();

    e.currentTarget.setPointerCapture(e.pointerId);
  }

  function handlePointerMove(
    e: React.PointerEvent<HTMLDivElement>,
  ) {
    if (!dragging) return;

    const deltaX = e.clientX - startX.current;
    const deltaY = e.clientY - startY.current;

    rotateY.set(startRotateY.current + deltaX * 0.55);
    rotateX.set(startRotateX.current - deltaY * 0.55);
  }

  function handlePointerUp(
    e: React.PointerEvent<HTMLDivElement>,
  ) {
    setDragging(false);

    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {
      // Pointer capture may already be released.
    }
  }

  function resetRotation() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <div className="relative h-full w-full overflow-hidden select-none">

      {/* =====================================================
          AMBIENT GLOW
      ====================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/20 blur-[110px]" />

      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/10 blur-[90px]" />

      {/* =====================================================
          OUTER ROTATING RINGS
      ====================================================== */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[470px] w-[470px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.07]"
      />

      <motion.div
        animate={{
          rotate: -360,
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-dashed border-white/[0.1]"
      />

      {/* =====================================================
          PRODUCT AREA
      ====================================================== */}

      <div
        className="absolute left-1/2 top-1/2 z-20 h-[430px] w-[340px] -translate-x-1/2 -translate-y-1/2"
        style={{
          perspective: "1200px",
        }}
      >

        {/* Product shadow */}

        <motion.div
          animate={{
            scale: dragging ? 0.85 : 1,
            opacity: dragging ? 0.35 : 0.55,
          }}
          className="pointer-events-none absolute bottom-[15px] left-1/2 h-12 w-56 -translate-x-1/2 rounded-full bg-black blur-2xl"
        />

        {/* =================================================
            DRAGGABLE PRODUCT
        ================================================== */}

        <motion.div
          style={{
            rotateX: springX,
            rotateY: springY,
            transformStyle: "preserve-3d",
          }}
          animate={{
            y: dragging ? 0 : [0, -12, 0],
          }}
          transition={{
            y: {
              duration: 4,
              repeat: dragging ? 0 : Infinity,
              ease: "easeInOut",
            },
          }}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          onDoubleClick={resetRotation}
          className={`absolute left-1/2 top-1/2 h-[350px] w-[255px] -translate-x-1/2 -translate-y-1/2 ${
            dragging ? "cursor-grabbing" : "cursor-grab"
          }`}
        >

          {/* =================================================
              3D BACK SIDE
          ================================================== */}

          <div
            className="absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-violet-900 via-purple-950 to-black shadow-2xl"
            style={{
              transform: "translateZ(-35px)",
            }}
          />

          {/* =================================================
              MAIN PRODUCT CARD
          ================================================== */}

          <div
            className="absolute inset-0 overflow-hidden rounded-[2.5rem] border border-white/20 bg-gradient-to-br from-white/[0.24] via-white/[0.08] to-white/[0.025] shadow-[0_40px_100px_rgba(0,0,0,0.6)] backdrop-blur-2xl"
            style={{
              transform: "translateZ(35px)",
            }}
          >

            {/* Shine */}

            <motion.div
              animate={{
                x: ["-180%", "180%"],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                repeatDelay: 2,
                ease: "easeInOut",
              }}
              className="pointer-events-none absolute inset-y-0 z-30 w-24 rotate-12 bg-gradient-to-r from-transparent via-white/25 to-transparent blur-md"
            />

            {/* Header */}

            <div className="absolute left-6 right-6 top-6 z-20 flex items-center justify-between">

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <ShoppingBag size={15} />
              </div>

              <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/10">
                <Heart size={15} />
              </div>

            </div>

            {/* =================================================
                PRODUCT VISUAL
            ================================================== */}

            <div
              className="absolute left-1/2 top-[75px] h-[170px] w-[170px] -translate-x-1/2"
              style={{
                transformStyle: "preserve-3d",
              }}
            >

              {/* Product glow */}

              <div className="absolute inset-0 rounded-[2.5rem] bg-white/10 blur-2xl" />

              {/* Product */}

              <motion.div
                animate={{
                  scale: [1, 1.04, 1],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="relative flex h-full w-full items-center justify-center rounded-[2.5rem] bg-gradient-to-br from-white via-white/80 to-white/30 shadow-[0_20px_70px_rgba(255,255,255,0.15)]"
                style={{
                  transform: "translateZ(20px)",
                }}
              >

                {/* Product inner surface */}

                <div className="absolute inset-4 rounded-[2rem] border border-black/10" />

                {/* Bag icon */}

                <ShoppingBag
                  size={72}
                  strokeWidth={1.1}
                  className="relative z-10 text-black"
                />

                {/* Product shine */}

                <div className="absolute left-8 top-7 h-6 w-16 rotate-[-25deg] rounded-full bg-white blur-md" />

                {/* Product badge */}

                <div className="absolute bottom-5 right-5 rounded-full bg-black px-2.5 py-1 text-[8px] font-semibold uppercase tracking-wider text-white">
                  VENDORA
                </div>

              </motion.div>

            </div>

            {/* =================================================
                PRODUCT DETAILS
            ================================================== */}

            <div className="absolute bottom-7 left-7 right-7">

              <p className="text-[9px] uppercase tracking-[0.25em] text-white/40">
                Vendora exclusive
              </p>

              <h3 className="mt-2 text-xl font-semibold text-white">
                Premium Collection
              </h3>

              <div className="mt-4 flex items-center justify-between">

                <div>
                  <p className="text-[9px] text-white/35">
                    Starting from
                  </p>

                  <p className="mt-1 text-lg font-semibold text-white">
                    ₹1,299
                  </p>
                </div>

                <div className="flex items-center gap-1 rounded-full bg-white px-3 py-2 text-black">
                  <Star
                    size={11}
                    className="fill-black"
                  />

                  <span className="text-[10px] font-semibold">
                    4.9
                  </span>
                </div>

              </div>

            </div>
          </div>

          {/* =================================================
              3D SIDE
          ================================================== */}

          <div
            className="absolute left-0 top-0 h-full w-[35px] rounded-l-[2.5rem] bg-gradient-to-b from-white/20 to-black/30"
            style={{
              transform: "rotateY(-90deg) translateZ(17px)",
              transformOrigin: "left center",
            }}
          />

          <div
            className="absolute right-0 top-0 h-full w-[35px] rounded-r-[2.5rem] bg-gradient-to-b from-white/10 to-black/40"
            style={{
              transform: "rotateY(90deg) translateZ(17px)",
              transformOrigin: "right center",
            }}
          />

        </motion.div>
      </div>

      {/* =====================================================
          DRAG INSTRUCTION
      ====================================================== */}

      <motion.div
        animate={{
          opacity: dragging ? 0 : [0.45, 0.8, 0.45],
        }}
        transition={{
          duration: 2.5,
          repeat: Infinity,
        }}
        className="pointer-events-none absolute bottom-[5%] left-1/2 z-40 -translate-x-1/2 rounded-full border border-white/10 bg-black/40 px-4 py-2 backdrop-blur-xl"
      >
        <p className="whitespace-nowrap text-[10px] uppercase tracking-[0.2em] text-white/50">
          Drag product to rotate
        </p>
      </motion.div>

      {/* =====================================================
          TRENDING CARD
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, -10, 0],
          rotate: [2, 0, 2],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute left-[2%] top-[18%] z-40 rounded-2xl border border-white/10 bg-black/60 px-4 py-3 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-black">
            <Zap size={16} />
          </div>

          <div>
            <p className="text-[9px] uppercase tracking-widest text-white/35">
              Trending
            </p>

            <p className="mt-1 text-xs font-semibold text-white">
              New arrivals
            </p>
          </div>

        </div>
      </motion.div>

      {/* =====================================================
          RATING CARD
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, 9, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute right-[2%] top-[25%] z-40 rounded-2xl border border-white/10 bg-white/[0.07] px-4 py-3 shadow-2xl backdrop-blur-xl"
      >
        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-black">
            <Star
              size={15}
              className="fill-black"
            />
          </div>

          <div>
            <p className="text-[9px] text-white/35">
              Customer rating
            </p>

            <p className="mt-1 text-xs font-semibold text-white">
              4.9 / 5.0
            </p>
          </div>

        </div>
      </motion.div>

      {/* =====================================================
          ARROW
      ====================================================== */}

      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[13%] right-[6%] z-40 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white text-black shadow-2xl"
      >
        <ArrowUpRight size={22} />
      </motion.div>

      {/* =====================================================
          ORBIT DOTS
      ====================================================== */}

      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2"
      >
        <div className="absolute left-1/2 top-0 h-2 w-2 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)]" />

        <div className="absolute bottom-8 right-16 h-1.5 w-1.5 rounded-full bg-violet-300 shadow-[0_0_15px_rgba(167,139,250,0.8)]" />

        <div className="absolute bottom-20 left-10 h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_15px_rgba(147,197,253,0.8)]" />
      </motion.div>
    </div>
  );
}