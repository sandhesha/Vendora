"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Filter,
  Heart,
  Search,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import {
  getProducts,
  type Product as ApiProduct,
} from "@/lib/api/products";

import {
  getCategories,
  type Category,
} from "@/lib/api/categories";

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
};



const categories = [
  "All",
  "Shoes",
  "Electronics",
  "Fashion",
  "Home",
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");
  const [mobileFilters, setMobileFilters] =
    useState(false);

  const [wishlist, setWishlist] = useState<number[]>(
    [],
  );
  useEffect(() => {
  let mounted = true;

  async function loadData() {
    try {
      setLoading(true);
      setError("");

      const [productData, categoryData] =
        await Promise.all([
          getProducts(),
          getCategories(),
        ]);

      if (!mounted) return;

      const mappedProducts: Product[] =
        productData.map((product) => {
          const category = categoryData.find(
            (item) => item.id === product.category_id,
          );

          return {
            id: product.id,
            name: product.name,
            category:
              category?.name || "Uncategorized",
            price: product.price,
            rating: 4.5,
            reviews: 0,
            image:
              product.image_url ||
              "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80",
          };
        });

      setProducts(mappedProducts);
      setCategories(categoryData);
    } catch (err) {
      if (!mounted) return;

      console.error(
        "Failed to load products/categories:",
        err,
      );

      setError("Failed to load products.");
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }
  }

  loadData();

  return () => {
    mounted = false;
  };
}, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category === category;

      const matchesSearch = product.name
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesPrice =
        product.price <= maxPrice;

      const matchesRating =
        product.rating >= minRating;

      return (
        matchesCategory &&
        matchesSearch &&
        matchesPrice &&
        matchesRating
      );
    });

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
    category,
    search,
    maxPrice,
    minRating,
    sort,
  ]);

  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  return (
    <main className="min-h-screen bg-black px-5 pb-28 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
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
          <p className="text-sm uppercase tracking-[0.35em] text-white/30">
            Explore
          </p>

          <h1 className="mt-3 text-5xl font-bold md:text-7xl">
            Products
          </h1>

          <p className="mt-4 max-w-xl text-white/40">
            Discover products from independent vendors
            across Vendora.
          </p>
        </motion.header>

        {/* Search */}
        <motion.div
          initial={{
            opacity: 0,
            y: 20,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.1,
          }}
          className="mt-10 flex flex-col gap-3 md:flex-row"
        >
          <div className="relative flex-1">
            <Search
              size={19}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-white/25"
            />

            <input
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search products..."
              className="h-14 w-full rounded-2xl border border-white/10 bg-white/[0.04] pl-12 pr-5 text-sm outline-none transition placeholder:text-white/20 focus:border-white/25"
            />
          </div>

          <div className="relative">
            <select
              value={sort}
              onChange={(event) =>
                setSort(event.target.value)
              }
              className="h-14 w-full appearance-none rounded-2xl border border-white/10 bg-white/[0.04] px-5 pr-12 text-sm text-white outline-none md:w-52"
            >
              <option value="featured">
                Featured
              </option>
              <option value="price-low">
                Price: Low to High
              </option>
              <option value="price-high">
                Price: High to Low
              </option>
              <option value="rating">
                Highest Rated
              </option>
            </select>

            <ChevronDown
              size={17}
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/30"
            />
          </div>

          <button
            onClick={() => setMobileFilters(true)}
            className="flex h-14 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.04] px-5 text-sm md:hidden"
          >
            <Filter size={17} />
            Filters
          </button>
        </motion.div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[240px_1fr]">

          {/* Desktop filters */}
          <aside className="hidden lg:block">
            <FilterPanel
              category={category}
              setCategory={setCategory}
              maxPrice={maxPrice}
              setMaxPrice={setMaxPrice}
              minRating={minRating}
              setMinRating={setMinRating}
              categories={categories}
            />
            <FilterPanel
  category={category}
  setCategory={setCategory}
  categories={categories}
  maxPrice={maxPrice}
  setMaxPrice={setMaxPrice}
  minRating={minRating}
  setMinRating={setMinRating}
/>
          </aside>

          {/* Products */}
          <section>
            <div className="mb-5 flex items-center justify-between">
              <p className="text-sm text-white/35">
                {filteredProducts.length} products
              </p>

              <div className="flex items-center gap-2 text-xs text-white/25">
                <SlidersHorizontal size={14} />
                Filtered results
              </div>
            </div>

            <AnimatePresence mode="popLayout">
              {filteredProducts.length > 0 ? (
                <motion.div
                  layout
                  className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3"
                >
                  {filteredProducts.map(
                    (product, index) => (
                      <ProductCard
                        key={product.id}
                        product={product}
                        index={index}
                        liked={wishlist.includes(
                          product.id,
                        )}
                        onWishlist={() =>
                          toggleWishlist(product.id)
                        }
                      />
                    ),
                  )}
                </motion.div>
              ) : (
                <EmptyState
                  onReset={() => {
                    setSearch("");
                    setCategory("All");
                    setMaxPrice(50000);
                    setMinRating(0);
                  }}
                />
              )}
            </AnimatePresence>
          </section>
        </div>
      </div>

      {/* Mobile filter drawer */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileFilters(false)}
              className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
            />

            <motion.aside
              initial={{
                x: "100%",
              }}
              animate={{
                x: 0,
              }}
              exit={{
                x: "100%",
              }}
              transition={{
                type: "spring",
                damping: 28,
              }}
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto border-l border-white/10 bg-black p-6 lg:hidden"
            >
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">
                  Filters
                </h2>

                <button
                  onClick={() =>
                    setMobileFilters(false)
                  }
                  className="rounded-xl border border-white/10 p-2"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-8">
                <FilterPanel
                  category={category}
                  setCategory={setCategory}
                  categories={categories}
                  maxPrice={maxPrice}
                  setMaxPrice={setMaxPrice}
                  minRating={minRating}
                  setMinRating={setMinRating}
                />
                <FilterPanel
  category={category}
  setCategory={setCategory}
  categories={categories}
  maxPrice={maxPrice}
  setMaxPrice={setMaxPrice}
  minRating={minRating}
  setMinRating={setMinRating}
/>
              </div>

              <button
                onClick={() =>
                  setMobileFilters(false)
                }
                className="mt-10 w-full rounded-xl bg-white py-3 text-sm font-semibold text-black"
              >
                Show products
              </button>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </main>
  );
}

function FilterPanel({
  category,
  setCategory,
  categories,
  maxPrice,
  setMaxPrice,
  minRating,
  setMinRating,
}: {
  category: string;
  setCategory: (value: string) => void;
  categories: Category[];
  maxPrice: number;
  setMaxPrice: (value: number) => void;
  minRating: number;
  setMinRating: (value: number) => void;
}) {
  return (
    <div className="sticky top-24 rounded-[2rem] border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center gap-2">
        <Filter size={17} />
        <h2 className="font-semibold">
          Filters
        </h2>
      </div>

      {/* Categories */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-wider text-white/25">
          Category
        </p>

        <div className="mt-4 space-y-1">
          {[
  { id: 0, name: "All" },
  ...categories,
].map((item) => (
            <button
              key={item.id}
              onClick={() => setCategory(item.name)}
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm transition ${
                category === item.name
                  ? "bg-white text-black"
                  : "text-white/40 hover:bg-white/[0.05] hover:text-white"
              }`}
            >
              {item.name}

              {category === item.name && (
                <span>✓</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Price */}
      <div className="mt-8">
        <div className="flex justify-between">
          <p className="text-xs uppercase tracking-wider text-white/25">
            Maximum price
          </p>

          <span className="text-xs text-white/50">
            ₹{maxPrice.toLocaleString("en-IN")}
          </span>
        </div>

        <input
          type="range"
          min="1000"
          max="50000"
          step="500"
          value={maxPrice}
          onChange={(event) =>
            setMaxPrice(Number(event.target.value))
          }
          className="mt-5 w-full"
        />
      </div>

      {/* Rating */}
      <div className="mt-8">
        <p className="text-xs uppercase tracking-wider text-white/25">
          Minimum rating
        </p>

        <div className="mt-4 space-y-2">
          {[4, 3, 2, 1, 0].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(rating)}
              className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-sm transition ${
                minRating === rating
                  ? "bg-white/10 text-white"
                  : "text-white/40 hover:bg-white/[0.04]"
              }`}
            >
              <div className="flex">
                {[1, 2, 3, 4, 5].map(
                  (star) => (
                    <Star
                      key={star}
                      size={13}
                      fill={
                        star <= rating
                          ? "currentColor"
                          : "transparent"
                      }
                    />
                  ),
                )}
              </div>

              {rating === 0
                ? "Any rating"
                : `${rating}+`}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function ProductCard({
  product,
  index,
  liked,
  onWishlist,
}: {
  product: Product;
  index: number;
  liked: boolean;
  onWishlist: () => void;
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
        scale: 0.95,
      }}
      transition={{
        delay: index * 0.06,
      }}
      whileHover={{
        y: -7,
      }}
      className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.035]"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-white/[0.04]">
        <motion.img
          src={product.image}
          alt={product.name}
          whileHover={{
            scale: 1.08,
            rotate: 1,
          }}
          transition={{
            duration: 0.5,
          }}
          className="h-full w-full object-cover"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Wishlist */}
        <motion.button
          whileTap={{ scale: 0.8 }}
          onClick={onWishlist}
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/40 backdrop-blur-md"
        >
          <Heart
            size={17}
            fill={
              liked ? "currentColor" : "transparent"
            }
          />
        </motion.button>

        {/* Category */}
        <span className="absolute bottom-4 left-4 rounded-full border border-white/10 bg-black/50 px-3 py-1.5 text-[10px] uppercase tracking-wider backdrop-blur-md">
          {product.category}
        </span>
      </div>

      {/* Details */}
      <div className="p-5">
        <h2 className="font-semibold">
          {product.name}
        </h2>

        <div className="mt-3 flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Star
              size={14}
              fill="currentColor"
            />

            <span className="text-xs">
              {product.rating}
            </span>
          </div>

          <span className="text-xs text-white/25">
            ({product.reviews})
          </span>
        </div>

        <div className="mt-5 flex items-center justify-between">
          <p className="text-lg font-bold">
            ₹{product.price.toLocaleString("en-IN")}
          </p>

          <motion.button
            whileHover={{
              scale: 1.05,
            }}
            whileTap={{
              scale: 0.95,
            }}
            className="rounded-xl bg-white px-4 py-2 text-xs font-semibold text-black"
          >
            View
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

function EmptyState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0.96,
      }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      className="rounded-[2rem] border border-white/10 bg-white/[0.03] px-6 py-24 text-center"
    >
      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-white/[0.06]">
        <Search
          size={25}
          className="text-white/30"
        />
      </div>

      <h2 className="mt-6 text-xl font-semibold">
        No products found
      </h2>

      <p className="mt-2 text-sm text-white/30">
        Try changing your search or filters.
      </p>

      <button
        onClick={onReset}
        className="mt-6 rounded-xl bg-white px-5 py-3 text-sm font-semibold text-black"
      >
        Reset filters
      </button>
    </motion.div>
  );
}
