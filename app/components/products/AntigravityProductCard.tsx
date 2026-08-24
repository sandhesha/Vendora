"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag, Star } from "lucide-react";

interface Product {
  id: string | number;
  name: string;
  price: number;
  image?: string;
  rating?: number;
  category?: string;
}

interface Props {
  product: Product;
}

export default function AntigravityProductCard({ product }: Props) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(
    useTransform(mouseY, [-0.5, 0.5], [8, -8]),
    {
      stiffness: 180,
      damping: 20,
    }
  );

  const rotateY = useSpring(
    useTransform(mouseX, [-0.5, 0.5], [-8, 8]),
    {
      stiffness: 180,
      damping: 20,
    }
  );

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    const rect = e.currentTarget.getBoundingClientRect();

    const x =
      (e.clientX - rect.left) / rect.width - 0.5;

    const y =
      (e.clientY - rect.top) / rect.height - 0.5;

    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      whileHover={{
        y: -14,
        scale: 1.02,
      }}
      transition={{
        type: "spring",
        stiffness: 180,
        damping: 18,
      }}
      className="
        group
        relative
        overflow-visible
        rounded-[28px]
        border
        border-slate-200/70
        bg-white/75
        p-3
        shadow-[0_20px_60px_rgba(15,23,42,0.08)]
        backdrop-blur-xl
        hover:shadow-[0_35px_90px_rgba(15,23,42,0.14)]
      "
    >

      {/* Floating image layer */}
      <Link href={`/products/${product.id}`}>
        <motion.div
          style={{
            transform: "translateZ(35px)",
            transformStyle: "preserve-3d",
          }}
          className="
            relative
            aspect-square
            overflow-hidden
            rounded-[22px]
            bg-gradient-to-br
            from-slate-100
            via-white
            to-blue-50
          "
        >

          {product.image && (
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="
                object-cover
                transition-transform
                duration-700
                group-hover:scale-110
              "
            />
          )}

          {/* Floating shine */}
          <div
            className="
              absolute
              inset-0
              bg-gradient-to-tr
              from-transparent
              via-white/20
              to-transparent
              opacity-0
              transition-opacity
              duration-500
              group-hover:opacity-100
            "
          />

          {/* Category */}
          {product.category && (
            <div
              className="
                absolute
                left-3
                top-3
                rounded-full
                border
                border-white/70
                bg-white/75
                px-3
                py-1
                text-xs
                font-medium
                text-slate-700
                backdrop-blur-md
              "
            >
              {product.category}
            </div>
          )}
        </motion.div>
      </Link>

      {/* Content */}
      <div
        style={{
          transform: "translateZ(20px)",
          transformStyle: "preserve-3d",
        }}
        className="px-2 pb-2 pt-4"
      >

        <div className="flex items-start justify-between gap-3">

          <div className="min-w-0">

            <Link href={`/products/${product.id}`}>
              <h3
                className="
                  line-clamp-1
                  text-base
                  font-semibold
                  text-slate-900
                  transition-colors
                  group-hover:text-blue-600
                "
              >
                {product.name}
              </h3>
            </Link>

            <div className="mt-2 flex items-center gap-1">

              <Star
                size={14}
                className="fill-amber-400 text-amber-400"
              />

              <span className="text-xs font-medium text-slate-600">
                {product.rating ?? 4.5}
              </span>

            </div>

          </div>

          <button
            className="
              flex
              h-9
              w-9
              shrink-0
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              bg-white
              text-slate-500
              shadow-sm
              transition-all
              hover:scale-110
              hover:border-red-200
              hover:text-red-500
            "
          >
            <Heart size={16} />
          </button>

        </div>

        <div className="mt-4 flex items-center justify-between">

          <span className="text-xl font-bold text-slate-950">
            ₹{product.price.toLocaleString("en-IN")}
          </span>

          <button
            className="
              flex
              items-center
              gap-2
              rounded-full
              bg-slate-950
              px-4
              py-2.5
              text-xs
              font-semibold
              text-white
              shadow-lg
              transition-all
              hover:-translate-y-1
              hover:bg-blue-600
              hover:shadow-blue-200
            "
          >
            <ShoppingBag size={15} />

            Add
          </button>

        </div>

      </div>

    </motion.div>
  );
}