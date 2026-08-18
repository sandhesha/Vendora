"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  SlidersHorizontal,
  X,
  Star,
  ChevronDown,
  ArrowUpDown,
  Heart,
  ShoppingBag,
  Sparkles,
} from "lucide-react";
import { useMemo, useState } from "react";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  image: string;
};

const products: Product[] = [
  {
    id: 1,
    name: "Aero Runner X",
    category: "Shoes",
    price: 8499,
    rating: 4.8,
    image: "👟",
  },
  {
    id: 2,
    name: "Nova Headphones",
    category: "Electronics",
    price: 7499,
    rating: 4.7,
    image: "🎧",
  },
  {
    id: 3,
    name: "Urban Backpack",
    category: "Bags",
    price: 3299,
    rating: 4.6,
    image: "🎒",
  },
  {
    id: 4,
    name: "Minimal Watch",
    category: "Accessories",
    price: 5999,
    rating: 4.5,
    image: "⌚",
  },
  {
    id: 5,
    name: "Cloud Hoodie",
    category: "Fashion",
    price: 2899,
    rating: 4.4,
    image: "👕",
  },
  {
    id: 6,
    name: "Vision Camera",
    category: "Electronics",
    price: 18999,
    rating: 4.9,
    image: "📷",
  },
  {
    id: 7,
    name: "Street Runner",
    category: "Shoes",
    price: 6799,
    rating: 4.3,
    image: "👞",
  },
  {
    id: 8,
    name: "Travel Case",
    category: "Bags",
    price: 4199,
    rating: 4.7,
    image: "🧳",
  },
];

const categories = [
  "All",
  "Shoes",
  "Electronics",
  "Bags",
  "Accessories",
  "Fashion",
];

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] =
    useState("All");

  const [maxPrice, setMaxPrice] =
    useState(20000);

  const [minRating, setMinRating] =
    useState(0);

  const [sort, setSort] =
    useState("featured");

  const [filtersOpen, setFiltersOpen] =
    useState(false);

  const [liked, setLiked] =
    useState<number[]>([]);

  const filteredProducts = useMemo(() => {
    let result = products.filter(
      (product) => {
        const matchesQuery =
          product.name
            .toLowerCase()
            .includes(query.toLowerCase()) ||
          product.category
            .toLowerCase()
            .includes(query.toLowerCase());

        const matchesCategory =
          category === "All" ||
          product.category === category;

        const matchesPrice =
          product.price <= maxPrice;

        const matchesRating =
          product.rating >= minRating;

        return (
          matchesQuery &&
          matchesCategory &&
          matchesPrice &&
          matchesRating
        );
      },
    );

    if (sort === "price-low") {
      result = [...result].sort(
        (a, b) => a.price - b.price,
      );
    }

    if (sort === "price-high") {
      result = [...result].sort(
        (a, b) => b.price - a.price,
      );
    }

    if (sort === "rating") {
      result = [...result].sort(
        (a, b) => b.rating - a.rating,
      );
    }

    return result;
  }, [
    query,
    category,
    maxPrice,
    minRating,
    sort,
  ]);

  const toggleLike = (id: number) => {
    setLiked((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id,
          )
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* HEADER */}

        <motion.header
          initial={{
            opacity: 0,
            y: 25,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              animate={{
                rotate: [0, 8, -8, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                repeatDelay: 2,
              }}
              className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-black"
            >
              <Search size={18} />
            </motion.div>

            <span className="text-xs uppercase tracking-[0.3em] text-white/25">
              Discover
            </span>
          </div>

          <h1 className="mt-5 text-5xl font-bold md:text-7xl">
            Search
          </h1>

          <p className="mt-4 text-white/35">
            Find something worth adding to your world.
          </p>
        </motion.header>

        {/* SEARCH BAR */}

        <motion.div
          initial={{
            opacity: 0,
            y: 15,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="relative mt-9"
        >
          <Search
            size={18}
            className="absolute left-5 top-1/2 -translate-y-1/2 text-white/25"
          />

          <input
            value={query}
            onChange={(e) =>
              setQuery(e.target.value)
            }
            placeholder="Search products, categories..."
            className="h-16 w-full rounded-2xl border border-white/10 bg-white/[0.035] pl-14 pr-12 text-sm outline-none transition placeholder:text-white/20 focus:border-white/25"
          />

          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-5 top-1/2 -translate-y-1/2 text-white/25 hover:text-white"
            >
              <X size={16} />
            </button>
          )}

          {/* SEARCH SUGGESTIONS */}

          {query.length > 0 && (
            <motion.div
              initial={{
                opacity: 0,
                y: -5,
              }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              className="absolute left-0 right-0 top-[72px] z-30 rounded-2xl border border-white/10 bg-[#101010] p-2 shadow-2xl"
            >
              {products
                .filter((product) =>
                  product.name
                    .toLowerCase()
                    .includes(
                      query.toLowerCase(),
                    ),
                )
                .slice(0, 4)
                .map((product) => (
                  <button
                    key={product.id}
                    onClick={() =>
                      setQuery(product.name)
                    }
                    className="flex w-full items-center gap-3 rounded-xl p-3 text-left transition hover:bg-white/10"
                  >
                    <span className="text-xl">
                      {product.image}
                    </span>

                    <div>
                      <p className="text-xs">
                        {product.name}
                      </p>

                      <p className="mt-1 text-[9px] text-white/25">
                        {product.category}
                      </p>
                    </div>
                  </button>
                ))}
            </motion.div>
          )}
        </motion.div>

        {/* CATEGORY PILLS */}

        <div className="mt-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((item) => (
            <motion.button
              key={item}
              whileTap={{
                scale: 0.95,
              }}
              onClick={() =>
                setCategory(item)
              }
              className={`shrink-0 rounded-full border px-5 py-2.5 text-[10px] transition ${
                category === item
                  ? "border-white bg-white text-black"
                  : "border-white/10 text-white/30 hover:border-white/25 hover:text-white"
              }`}
            >
              {item}
            </motion.button>
          ))}
        </div>

        {/* TOOLBAR */}

        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-y border-white/10 py-4">

          <p className="text-xs text-white/25">
            <span className="text-white">
              {filteredProducts.length}
            </span>{" "}
            products found
          </p>

          <div className="flex gap-2">
            <button
              onClick={() =>
                setFiltersOpen(
                  !filtersOpen,
                )
              }
              className="flex items-center gap-2 rounded-xl border border-white/10 px-4 py-2.5 text-[10px] text-white/40 hover:border-white/25 hover:text-white"
            >
              <SlidersHorizontal
                size={13}
              />
              Filters
            </button>

            <div className="relative">
              <ArrowUpDown
                size={13}
                className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-white/25"
              />

              <select
                value={sort}
                onChange={(e) =>
                  setSort(e.target.value)
                }
                className="appearance-none rounded-xl border border-white/10 bg-black py-2.5 pl-9 pr-8 text-[10px] text-white/50 outline-none"
              >
                <option value="featured">
                  Featured
                </option>

                <option value="price-low">
                  Price: Low to high
                </option>

                <option value="price-high">
                  Price: High to low
                </option>

                <option value="rating">
                  Highest rated
                </option>
              </select>

              <ChevronDown
                size={12}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/25"
              />
            </div>
          </div>
        </div>

        {/* FILTER PANEL */}

        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="overflow-hidden"
            >
              <div className="grid gap-5 border-b border-white/10 py-6 md:grid-cols-2">

                {/* PRICE */}

                <div>
                  <div className="flex justify-between">
                    <p className="text-xs font-semibold">
                      Maximum price
                    </p>

                    <span className="text-xs text-white/30">
                      ₹
                      {maxPrice.toLocaleString(
                        "en-IN",
                      )}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1000"
                    max="20000"
                    step="500"
                    value={maxPrice}
                    onChange={(e) =>
                      setMaxPrice(
                        Number(
                          e.target.value,
                        ),
                      )
                    }
                    className="mt-5 w-full accent-white"
                  />
                </div>

                {/* RATING */}

                <div>
                  <p className="text-xs font-semibold">
                    Minimum rating
                  </p>

                  <div className="mt-4 flex gap-2">
                    {[0, 4, 4.5, 4.7].map(
                      (rating) => (
                        <button
                          key={rating}
                          onClick={() =>
                            setMinRating(
                              rating,
                            )
                          }
                          className={`flex items-center gap-1 rounded-xl border px-3 py-2 text-[10px] ${
                            minRating ===
                            rating
                              ? "border-white bg-white text-black"
                              : "border-white/10 text-white/30"
                          }`}
                        >
                          {rating === 0
                            ? "All"
                            : (
                                <>
                                  <Star
                                    size={10}
                                    className="fill-current"
                                  />
                                  {rating}+
                                </>
                              )}
                        </button>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* PRODUCT GRID */}

        {filteredProducts.length > 0 ? (
          <motion.div
            layout
            className="mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(
                (product, index) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    index={index}
                    liked={liked.includes(
                      product.id,
                    )}
                    onLike={() =>
                      toggleLike(product.id)
                    }
                  />
                ),
              )}
            </AnimatePresence>
          </motion.div>
        ) : (
          <EmptySearch />
        )}
      </div>
    </main>
  );
}

function ProductCard({
  product,
  index,
  liked,
  onLike,
}: {
  product: Product;
  index: number;
  liked: boolean;
  onLike: () => void;
}) {
  return (
    <motion.article
      layout
      initial={{
        opacity: 0,
        y: 25,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.9,
      }}
      transition={{
        delay: index * 0.04,
      }}
      whileHover={{
        y: -7,
      }}
      className="group relative overflow-hidden rounded-[1.5rem] border border-white/10 bg-white/[0.025]"
    >
      {/* IMAGE */}

      <div className="relative flex h-56 items-center justify-center overflow-hidden bg-white/[0.025] sm:h-64">
        <motion.div
          whileHover={{
            scale: 1.18,
            rotateY: 15,
            rotateX: -5,
          }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 15,
          }}
          className="relative z-10 flex h-32 w-32 items-center justify-center rounded-[2rem] bg-white text-6xl shadow-2xl"
          style={{
            transformStyle: "preserve-3d",
          }}
        >
          {product.image}
        </motion.div>

        {/* ORBIT */}

        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute h-44 w-44 rounded-full border border-white/[0.06]"
        />

        <motion.button
          whileTap={{
            scale: 0.8,
          }}
          onClick={onLike}
          className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-black/50 backdrop-blur-xl"
        >
          <Heart
            size={14}
            className={
              liked
                ? "fill-white text-white"
                : "text-white/40"
            }
          />
        </motion.button>

        <div className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/50 px-2.5 py-1 text-[8px] text-white/30 backdrop-blur-xl">
          3D VIEW
        </div>
      </div>

      {/* INFO */}

      <div className="p-4">
        <p className="text-[8px] uppercase tracking-[0.2em] text-white/20">
          {product.category}
        </p>

        <h3 className="mt-2 truncate text-xs font-semibold">
          {product.name}
        </h3>

        <div className="mt-3 flex items-center justify-between">
          <p className="font-bold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <div className="flex items-center gap-1 text-[9px] text-white/35">
            <Star
              size={9}
              className="fill-white"
            />
            {product.rating}
          </div>
        </div>

        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white py-2.5 text-[9px] font-bold text-black transition hover:scale-[1.02]">
          <ShoppingBag size={11} />
          View product
        </button>
      </div>
    </motion.article>
  );
}

function EmptySearch() {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.9,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="mt-10 rounded-[2rem] border border-white/10 bg-white/[0.025] px-6 py-24 text-center"
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
          rotate: [0, 5, -5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
        }}
        className="mx-auto flex h-20 w-20 items-center justify-center rounded-3xl bg-white text-black"
      >
        <Sparkles size={28} />
      </motion.div>

      <h2 className="mt-7 text-2xl font-bold">
        No products found
      </h2>

      <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-white/25">
        Try another search term or loosen your filters
        to discover more products.
      </p>
    </motion.div>
  );
}