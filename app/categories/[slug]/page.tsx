"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Grid3X3,
  Sparkles,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  getCategories,
  type Category,
} from "@/lib/api/categories";
import {
  getProducts,
  type Product as ApiProduct,
} from "@/lib/api/products";

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const [loading, setLoading] = useState(true);
const [error, setError] = useState("");
  const [slug, setSlug] = useState("shoes");
  const [liked, setLiked] = useState<number[]>([]);

  const [apiProducts, setApiProducts] = useState<ApiProduct[]>([]);
  const [apiCategories, setApiCategories] = useState<Category[]>([]);
  const [productsLoading, setProductsLoading] = useState(true);

useEffect(() => {
  params.then(({ slug }) => {
    setSlug(slug.toLowerCase());
  });
}, [params]);


  useEffect(() => {
    let mounted = true;

    async function loadSlug() {
      const { slug: routeSlug } = await params;

      if (mounted) {
        setSlug(routeSlug);
      }
    }

    loadSlug();

    return () => {
      mounted = false;
    };
  }, [params]);

  // your existing product/category useEffect continues here...



const currentCategory = apiCategories.find(
  (item) =>
    item.name.toLowerCase().replace(/\s+/g, "-") ===
    slug.toLowerCase(),
);

const categoryProducts = apiProducts.filter(
  (product) =>
    currentCategory &&
    product.category_id === currentCategory.id,
);


useEffect(() => {
  let mounted = true;

  async function loadProducts() {
    try {
      setProductsLoading(true);

      const data = await getProducts();

      if (mounted) {
        setApiProducts(data);
      }
    } catch (error) {
      console.error("Failed to load category products:", error);
    } finally {
      if (mounted) {
        setProductsLoading(false);
      }
    }
  }

  loadProducts();

  return () => {
    mounted = false;
  };
}, []);

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        setLoading(true);
        setError("");

        const data = await getCategories();

        if (mounted) {
          setApiCategories(data.filter((category) => category.is_active));
        }
      } catch (err) {
        console.error("Failed to load categories:", err);

        if (mounted) {
          setError("Failed to load categories.");
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCategories();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <div className="mb-12">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.35em] text-white/30">
            <Sparkles size={13} />
            Explore Vendora
          </div>

          <h1 className="mt-5 text-5xl font-black tracking-tight md:text-7xl">
            Categories
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-7 text-white/35">
            Explore products across our marketplace and discover
            something made for you.
          </p>
        </div>

        {/* LOADING */}

        {loading && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-[2rem] border border-white/10 bg-white/[0.03]"
              />
            ))}
          </div>
        )}

        {/* ERROR */}

        {!loading && error && (
          <div className="rounded-[2rem] border border-red-500/20 bg-red-500/5 p-8 text-center">
            <p className="text-sm text-red-300">{error}</p>

            <button
              onClick={() => window.location.reload()}
              className="mt-5 rounded-xl bg-white px-5 py-3 text-xs font-bold text-black"
            >
              Try again
            </button>
          </div>
        )}

        {/* EMPTY */}

        {!loading && !error && apiCategories.length === 0 && (
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-12 text-center">
            <Grid3X3
              size={32}
              className="mx-auto text-white/20"
            />

            <h2 className="mt-5 text-xl font-bold">
              No categories yet
            </h2>

            <p className="mt-2 text-sm text-white/30">
              Categories will appear here once they are added.
            </p>
          </div>
        )}

        {/* CATEGORY GRID */}

        {!loading && !error && apiCategories.length > 0 && (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {apiCategories.map((category, index) => (
              <motion.div
                key={category.id}
                initial={{
                  opacity: 0,
                  y: 25,
                }}
                animate={{
                  opacity: 1,
                  y: 0,
                }}
                transition={{
                  delay: index * 0.08,
                }}
                whileHover={{
                  y: -8,
                }}
              >
                <Link
                  href={`/categories/${category.name
                    .toLowerCase()
                    .replace(/\s+/g, "-")}`}
                  className="group relative block min-h-64 overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.025] p-7 transition hover:border-white/20"
                >
                  {/* NUMBER */}

                  <div className="absolute right-6 top-6 text-[10px] text-white/20">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  {/* ICON */}

                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                    <Grid3X3
                      size={22}
                      className="text-white/60"
                    />
                  </div>

                  {/* CONTENT */}

                  <div className="absolute bottom-7 left-7 right-7">
                    <h2 className="text-2xl font-bold">
                      {category.name}
                    </h2>

                    {category.description && (
                      <p className="mt-2 line-clamp-2 text-xs leading-6 text-white/30">
                        {category.description}
                      </p>
                    )}

                    <div className="mt-5 flex items-center gap-2 text-[10px] font-semibold uppercase tracking-wider text-white/40 transition group-hover:text-white">
                      Explore
                      <ArrowRight
                        size={13}
                        className="transition group-hover:translate-x-1"
                      />
                    </div>
                  </div>

                  {/* BACKGROUND GLOW */}

                  <div className="pointer-events-none absolute -bottom-24 -right-24 h-48 w-48 rounded-full bg-white/[0.04] blur-3xl transition group-hover:bg-white/[0.08]" />
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}