
"use client";

import { Canvas } from "@react-three/fiber";
import {
  Float,
  Environment,
  OrbitControls,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Zap,
} from "lucide-react";

function FloatingOrb() {
  return (
    <Float
      speed={1.5}
      rotationIntensity={1.4}
      floatIntensity={1.8}
    >
      <mesh rotation={[0.2, 0.4, 0]}>
        <icosahedronGeometry args={[1.9, 3]} />

        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={0.6}
          roughness={0.08}
          transmission={1}
          ior={1.45}
          chromaticAberration={0.06}
          anisotropy={0.2}
          distortion={0.15}
          distortionScale={0.25}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black text-white">
      {/* Background gradients */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[15%] top-[20%] h-[500px] w-[500px] rounded-full bg-violet-600/10 blur-[140px]" />

        <div className="absolute right-[10%] top-[25%] h-[600px] w-[600px] rounded-full bg-blue-500/10 blur-[160px]" />

        <div className="absolute bottom-0 left-1/2 h-[300px] w-[700px] -translate-x-1/2 rounded-full bg-white/[0.025] blur-[120px]" />
      </div>

      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.5) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      <div className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-6 pb-20 pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:pt-24">
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10"
        >
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.045] px-4 py-2 text-xs font-medium tracking-wide text-white/70 backdrop-blur-xl"
          >
            <Sparkles size={14} className="text-white" />

            <span>THE NEXT GENERATION MARKETPLACE</span>

            <span className="h-1.5 w-1.5 rounded-full bg-white/70" />
          </motion.div>

          {/* Heading */}
          <h1 className="max-w-4xl text-5xl font-semibold leading-[0.94] tracking-[-0.055em] sm:text-6xl md:text-7xl lg:text-[86px]">
            Everything you want.
            <br />

            <span className="bg-gradient-to-r from-white via-white/80 to-white/30 bg-clip-text text-transparent">
              One marketplace.
            </span>
          </h1>

          {/* Description */}
          <p className="mt-8 max-w-xl text-base leading-7 text-white/45 sm:text-lg">
            Discover exceptional products from trusted independent
            vendors. Shop fashion, electronics, accessories and more
            through one beautifully connected marketplace.
          </p>

          {/* CTA */}
          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link href="/products">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="group flex items-center gap-3 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black shadow-[0_15px_50px_rgba(255,255,255,0.1)]"
              >
                Explore products

                <ArrowRight
                  size={17}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </motion.div>
            </Link>

            <Link href="/vendors">
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white/80 backdrop-blur-xl transition hover:border-white/20 hover:bg-white/[0.08]"
              >
                <ShoppingBag size={17} />

                Discover vendors
              </motion.div>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 grid max-w-xl grid-cols-3 border-y border-white/10 py-6">
            <div className="border-r border-white/10 pr-4">
              <div className="flex items-center gap-2">
                <ShieldCheck size={16} className="text-white/70" />

                <span className="text-sm font-semibold">
                  10K+
                </span>
              </div>

              <p className="mt-1 text-xs text-white/35">
                Products
              </p>
            </div>

            <div className="border-r border-white/10 px-4">
              <div className="flex items-center gap-2">
                <ShoppingBag size={16} className="text-white/70" />

                <span className="text-sm font-semibold">
                  500+
                </span>
              </div>

              <p className="mt-1 text-xs text-white/35">
                Vendors
              </p>
            </div>

            <div className="pl-4">
              <div className="flex items-center gap-2">
                <Zap size={16} className="text-white/70" />

                <span className="text-sm font-semibold">
                  50K+
                </span>
              </div>

              <p className="mt-1 text-xs text-white/35">
                Customers
              </p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT 3D AREA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.2,
          }}
          className="relative h-[500px] lg:h-[680px]"
        >
          {/* Glow */}
          <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-500/[0.08] blur-[100px]" />

          <Canvas
            camera={{
              position: [0, 0, 7],
              fov: 42,
            }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.7} />

              <directionalLight
                position={[5, 5, 5]}
                intensity={4}
              />

              <pointLight
                position={[-4, -3, 4]}
                intensity={10}
              />

              <pointLight
                position={[4, 2, -2]}
                intensity={6}
              />

              <FloatingOrb />

              <Environment preset="studio" />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.6}
              />
            </Suspense>
          </Canvas>

          {/* Floating product card */}
          <motion.div
            animate={{
              y: [0, -10, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-16 left-2 rounded-2xl border border-white/10 bg-black/50 px-5 py-4 shadow-2xl backdrop-blur-2xl sm:left-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-black">
                <ShoppingBag size={18} />
              </div>

              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/35">
                  Featured
                </p>

                <p className="mt-1 text-sm font-semibold">
                  Premium Collection
                </p>
              </div>
            </div>
          </motion.div>

          {/* Floating status card */}
          <motion.div
            animate={{
              y: [0, 8, 0],
            }}
            transition={{
              duration: 4.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute right-2 top-24 rounded-2xl border border-white/10 bg-white/[0.045] px-4 py-3 backdrop-blur-2xl sm:right-8"
          >
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400" />

              <span className="text-xs text-white/70">
                Marketplace online
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black to-transparent" />
    </section>
  );
}

