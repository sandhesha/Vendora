"use client";

import { Canvas } from "@react-three/fiber";
import { Float, OrbitControls, Environment } from "@react-three/drei";
import { motion } from "framer-motion";
import { Suspense } from "react";

function FloatingOrb() {
  return (
    <Float
      speed={2}
      rotationIntensity={1.2}
      floatIntensity={1.5}
    >
      <mesh>
        <icosahedronGeometry args={[1.8, 2]} />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.12}
        />
      </mesh>
    </Float>
  );
}

export default function Hero3D() {
  return (
    <section className="relative min-h-[calc(100vh-80px)] overflow-hidden bg-black">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.04] blur-[120px]" />

      <div className="mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl grid-cols-1 items-center px-6 lg:grid-cols-2 lg:px-10">

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 pt-20 lg:pt-0"
        >
          <div className="mb-6 inline-flex rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-white/70 backdrop-blur-xl">
            ✦ The future of shopping
          </div>

          <h1 className="max-w-2xl text-5xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            Shop beyond
            <span className="block bg-gradient-to-r from-white via-white/70 to-white/30 bg-clip-text text-transparent">
              imagination.
            </span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-7 text-white/50 sm:text-lg">
            Discover products from trusted vendors through a premium
            marketplace designed for the next generation of shopping.
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <button className="rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-black transition hover:scale-105">
              Explore products →
            </button>

            <button className="rounded-full border border-white/15 bg-white/[0.04] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-xl transition hover:bg-white/[0.08]">
              Discover vendors
            </button>
          </div>

          <div className="mt-12 flex gap-10">
            <div>
              <p className="text-2xl font-semibold text-white">10K+</p>
              <p className="mt-1 text-xs text-white/40">Products</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-white">500+</p>
              <p className="mt-1 text-xs text-white/40">Vendors</p>
            </div>

            <div>
              <p className="text-2xl font-semibold text-white">50K+</p>
              <p className="mt-1 text-xs text-white/40">Customers</p>
            </div>
          </div>
        </motion.div>

        {/* 3D object */}
        <motion.div
          initial={{ opacity: 0, scale: 0.7 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative h-[500px] lg:h-[700px]"
        >
          <Canvas camera={{ position: [0, 0, 7], fov: 45 }}>
            <Suspense fallback={null}>
              <ambientLight intensity={0.6} />

              <directionalLight
                position={[4, 5, 5]}
                intensity={3}
              />

              <pointLight
                position={[-4, -2, 3]}
                intensity={8}
              />

              <FloatingOrb />

              <Environment preset="city" />

              <OrbitControls
                enableZoom={false}
                enablePan={false}
                autoRotate
                autoRotateSpeed={0.8}
              />
            </Suspense>
          </Canvas>

          {/* Floating card */}
          <motion.div
            animate={{ y: [0, -12, 0] }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute bottom-16 right-2 rounded-2xl border border-white/10 bg-white/[0.06] px-5 py-4 shadow-2xl backdrop-blur-2xl sm:right-10"
          >
            <p className="text-xs text-white/40">Featured</p>
            <p className="mt-1 text-sm font-semibold text-white">
              Premium Collection
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}