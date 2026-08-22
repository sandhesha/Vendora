
"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronDown,
  Filter,
  Heart,
  Search,
  ShoppingCart,
  SlidersHorizontal,
  Star,
  X,
} from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import {
  getProducts,
  type Product as ApiProduct,
} from "@/lib/api/products";

import { addCartItem } from "@/lib/api/cart";
import { useAuth } from "@/lib/auth/auth-context";
import { useRouter } from "next/navigation";

interface Category {
  id: number | string;
  name: string;
  is_active: boolean;
}

type Product = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  stock: number;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=80";

export default function ProductsPage() {
  const router = useRouter();
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [maxPrice, setMaxPrice] = useState(50000);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState("featured");

  const [mobileFilters, setMobileFilters] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);

  const [addingProduct, setAddingProduct] = useState<number | null>(
    null,
  );

  const [addedProduct, setAddedProduct] = useState<number | null>(
    null,
  );

  /*
   * LOAD PRODUCTS
   */
  useEffect(() => {
    let mounted = true;

    async function loadProducts() {
      try {
        setLoading(true);
        setError("");

        const productData: ApiProduct[] = await getProducts();

        if (!mounted) return;

        const mappedProducts: Product[] = productData.map(
          (product) => ({
            id: product.id,
            name: product.name,
            category:
              product.category_name || "Uncategorized",
            price: Number(product.price) || 0,
            rating: 4.5,
            reviews: 0,
            image:
              product.image_url || FALLBACK_IMAGE,
            stock: Number(product.stock) || 0,
          }),
        );

        setProducts(mappedProducts);

        /*
         * Build categories from products
         */
        const uniqueCategories = Array.from(
          new Map(
            mappedProducts.map((product) => [
              product.category.toLowerCase(),
              product.category,
            ]),
          ).values(),
        );

        setCategories(
          uniqueCategories.map((name, index) => ({
            id: index + 1,
            name,
            is_active: true,
          })),
        );
      } catch (err) {
        console.error(
          "Failed to load products:",
          err,
        );

        if (mounted) {
          setError(
            "Failed to load products from the backend.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadProducts();

    return () => {
      mounted = false;
    };
  }, []);

  /*
   * CATEGORY LIST
   */
  const categoryNames = useMemo(() => {
    const activeCategories = categories
      .filter((item) => item.is_active)
      .map((item) => item.name);

    return [
      "All",
      ...Array.from(new Set(activeCategories)),
    ];
  }, [categories]);

  /*
   * FILTER + SEARCH + SORT
   */
  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => {
      const matchesCategory =
        category === "All" ||
        product.category.toLowerCase() ===
        category.toLowerCase();

      const searchValue = search
        .trim()
        .toLowerCase();

      const matchesSearch =
        searchValue === "" ||
        product.name
          .toLowerCase()
          .includes(searchValue) ||
        product.category
          .toLowerCase()
          .includes(searchValue);

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

    if (sort === "name") {
      result = [...result].sort((a, b) =>
        a.name.localeCompare(b.name),
      );
    }

    return result;
  }, [
    products,
    category,
    search,
    maxPrice,
    minRating,
    sort,
  ]);

  /*
   * WISHLIST
   */
  const toggleWishlist = (id: number) => {
    setWishlist((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id],
    );
  };

  /*
   * ADD TO CART
   */
  const handleAddToCart = async (
    product: Product,
  ) => {
    if (product.stock <= 0) {
      return;
    }

    /*
     * User must be logged in
     */
    if (!user) {
      router.push("/auth/login");
      return;
    }

    try {
      setAddingProduct(product.id);
      setError("");

      await addCartItem(Number(user.id), {
        product_id: product.id,
        variant_id: null,
        quantity: 1,
      });

      setAddedProduct(product.id);

      setTimeout(() => {
        setAddedProduct((current) =>
          current === product.id ? null : current,
        );
      }, 1800);
    } catch (err) {
      console.error(
        "Failed to add product to cart:",
        err,
      );

      setError(
        "Failed to add product to cart.",
      );
    } finally {
      setAddingProduct(null);
    }
  };

  /*
   * RESET FILTERS
   */
  const resetFilters = () => {
    setCategory("All");
    setSearch("");
    setMaxPrice(50000);
    setMinRating(0);
    setSort("featured");
  };

  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* HEADER */}
      <section className="border-b border-gray-200 bg-gray-50">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">

            <div>
              <p className="mb-2 text-sm font-medium text-gray-500">
                Vendora Marketplace
              </p>

              <h1 className="text-4xl font-bold tracking-tight">
                Products
              </h1>

              <p className="mt-3 max-w-2xl text-gray-600">
                Discover products from independent
                vendors across our marketplace.
              </p>
            </div>

            <div className="text-sm text-gray-500">
              {loading
                ? "Loading products..."
                : `${filteredProducts.length} products`}
            </div>

          </div>
        </div>
      </section>

      {/* SEARCH */}
      <section className="mx-auto max-w-7xl px-6 pt-8">
        <div className="relative">

          <Search
            size={20}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={search}
            onChange={(event) =>
              setSearch(event.target.value)
            }
            placeholder="Search products..."
            className="w-full rounded-xl border border-gray-200 bg-white py-4 pl-12 pr-12 outline-none transition focus:border-gray-400"
          />

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-900"
              aria-label="Clear search"
            >
              <X size={18} />
            </button>
          )}

        </div>
      </section>

      {/* MOBILE FILTER BUTTON */}
      <section className="mx-auto max-w-7xl px-6 pt-6 md:hidden">
        <button
          type="button"
          onClick={() =>
            setMobileFilters(true)
          }
          className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 py-3 font-medium"
        >
          <SlidersHorizontal size={18} />
          Filters
        </button>
      </section>

      {/* MAIN CONTENT */}
      <section className="mx-auto flex max-w-7xl gap-8 px-6 py-8">

        {/* DESKTOP FILTERS */}
        <aside className="hidden w-64 shrink-0 md:block">

          <div className="sticky top-24 rounded-2xl border border-gray-200 bg-white p-5">

            {/* FILTER HEADER */}
            <div className="mb-6 flex items-center justify-between">

              <div className="flex items-center gap-2">
                <Filter size={18} />

                <h2 className="font-semibold">
                  Filters
                </h2>
              </div>

              <button
                type="button"
                onClick={resetFilters}
                className="text-xs text-gray-500 hover:text-black"
              >
                Reset
              </button>

            </div>

            {/* CATEGORY */}
            <div className="mb-7">

              <h3 className="mb-3 text-sm font-semibold">
                Category
              </h3>

              <div className="space-y-2">

                {categoryNames.map((cat) => (
                  <button
                    type="button"
                    key={cat}
                    onClick={() =>
                      setCategory(cat)
                    }
                    className={`block w-full rounded-lg px-3 py-2 text-left text-sm transition ${category === cat
                        ? "bg-black text-white"
                        : "text-gray-600 hover:bg-gray-100"
                      }`}
                  >
                    {cat}
                  </button>
                ))}

              </div>

            </div>

            {/* PRICE */}
            <div className="mb-7">

              <h3 className="mb-3 text-sm font-semibold">
                Maximum Price
              </h3>

              <div className="mb-3 text-sm text-gray-600">
                ₹{maxPrice.toLocaleString("en-IN")}
              </div>

              <input
                type="range"
                min="0"
                max="50000"
                step="500"
                value={maxPrice}
                onChange={(event) =>
                  setMaxPrice(
                    Number(event.target.value),
                  )
                }
                className="w-full"
              />

            </div>

            {/* RATING */}
            <div>

              <h3 className="mb-3 text-sm font-semibold">
                Minimum Rating
              </h3>

              <div className="space-y-2">

                {[0, 3, 4, 4.5].map(
                  (rating) => (
                    <button
                      type="button"
                      key={rating}
                      onClick={() =>
                        setMinRating(rating)
                      }
                      className={`flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm ${minRating === rating
                          ? "bg-gray-100 font-medium"
                          : "text-gray-600 hover:bg-gray-50"
                        }`}
                    >
                      <Star
                        size={15}
                        fill="currentColor"
                      />

                      {rating === 0
                        ? "All ratings"
                        : `${rating}+`}
                    </button>
                  ),
                )}

              </div>

            </div>

          </div>

        </aside>

        {/* PRODUCTS AREA */}
        <div className="min-w-0 flex-1">

          {/* TOP BAR */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

            <div className="text-sm text-gray-500">
              {loading
                ? "Loading..."
                : `${filteredProducts.length} products found`}
            </div>

            <div className="relative">

              <select
                value={sort}
                onChange={(event) =>
                  setSort(event.target.value)
                }
                className="appearance-none rounded-xl border border-gray-200 bg-white py-3 pl-4 pr-10 text-sm outline-none"
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

                <option value="name">
                  Name
                </option>
              </select>

              <ChevronDown
                size={16}
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
              />

            </div>

          </div>

          {/* ERROR */}
          {error && (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">

              <p>{error}</p>

              <button
                type="button"
                onClick={() =>
                  window.location.reload()
                }
                className="mt-2 font-semibold underline"
              >
                Retry
              </button>

            </div>
          )}

          {/* LOADING */}
          {loading && (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

              {Array.from({ length: 6 }).map(
                (_, index) => (
                  <div
                    key={index}
                    className="overflow-hidden rounded-2xl border border-gray-200"
                  >

                    <div className="aspect-square animate-pulse bg-gray-100" />

                    <div className="space-y-3 p-4">

                      <div className="h-4 animate-pulse rounded bg-gray-100" />

                      <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />

                      <div className="h-5 w-1/3 animate-pulse rounded bg-gray-100" />

                    </div>

                  </div>
                ),
              )}

            </div>
          )}

          {/* PRODUCTS */}
          {!loading &&
            !error &&
            filteredProducts.length > 0 && (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

                {filteredProducts.map(
                  (product, index) => {

                    const isWishlisted =
                      wishlist.includes(product.id);

                    const isAdding =
                      addingProduct === product.id;

                    const wasAdded =
                      addedProduct === product.id;

                    const isOutOfStock =
                      product.stock <= 0;

                    return (
                      <motion.article
                        key={product.id}
                        initial={{
                          opacity: 0,
                          y: 15,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                        }}
                        transition={{
                          delay: index * 0.03,
                        }}
                        className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-lg"
                      >

                        {/* IMAGE */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100">

                          <Link
                            href={`/products/${product.id}`}
                            className="block h-full w-full"
                          >
                            <img
                              src={
                                product.image ||
                                FALLBACK_IMAGE
                              }
                              alt={product.name}
                              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                            />
                          </Link>

                          {/* WISHLIST */}
                          <button
                            type="button"
                            onClick={() =>
                              toggleWishlist(
                                product.id,
                              )
                            }
                            className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-sm backdrop-blur transition hover:bg-white"
                            aria-label={
                              isWishlisted
                                ? "Remove from wishlist"
                                : "Add to wishlist"
                            }
                          >
                            <Heart
                              size={18}
                              fill={
                                isWishlisted
                                  ? "currentColor"
                                  : "none"
                              }
                            />
                          </button>

                          {/* CATEGORY */}
                          <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-medium backdrop-blur">
                            {product.category}
                          </span>

                        </div>

                        {/* CONTENT */}
                        <div className="p-5">

                          <Link
                            href={`/products/${product.id}`}
                          >
                            <h3 className="line-clamp-2 min-h-[48px] font-semibold transition hover:text-gray-600">
                              {product.name}
                            </h3>
                          </Link>

                          <div className="mt-2 flex items-center gap-2 text-sm text-gray-500">

                            <Star
                              size={15}
                              fill="currentColor"
                            />

                            <span>
                              {product.rating}
                            </span>

                            <span>
                              ({product.reviews})
                            </span>

                          </div>

                          <div className="mt-4 flex items-center justify-between gap-3">

                            <span className="text-xl font-bold">
                              ₹
                              {product.price.toLocaleString(
                                "en-IN",
                              )}
                            </span>

                          </div>

                          {/* ACTIONS */}
                          <div className="mt-4 grid grid-cols-2 gap-2">

                            <Link
                              href={`/products/${product.id}`}
                              className="flex items-center justify-center rounded-lg border border-gray-200 px-3 py-2.5 text-sm font-medium transition hover:bg-gray-50"
                            >
                              View
                            </Link>

                            <button
                              type="button"
                              disabled={
                                isOutOfStock ||
                                isAdding
                              }
                              onClick={() =>
                                handleAddToCart(
                                  product,
                                )
                              }
                              className="flex items-center justify-center gap-2 rounded-lg bg-black px-3 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-40"
                            >

                              {isAdding ? (
                                "Adding..."
                              ) : wasAdded ? (
                                "Added ✓"
                              ) : isOutOfStock ? (
                                "Out of stock"
                              ) : (
                                <>
                                  <ShoppingCart
                                    size={15}
                                  />
                                  Add to cart
                                </>
                              )}

                            </button>

                          </div>

                        </div>

                      </motion.article>
                    );
                  },
                )}

              </div>
            )}

          {/* EMPTY */}
          {!loading &&
            !error &&
            filteredProducts.length === 0 && (
              <div className="rounded-2xl border border-dashed border-gray-300 py-20 text-center">

                <Search
                  size={40}
                  className="mx-auto mb-4 text-gray-300"
                />

                <h2 className="text-xl font-semibold">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or
                  filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-black px-5 py-3 text-sm font-medium text-white"
                >
                  Reset filters
                </button>

              </div>
            )}

        </div>
      </section>

      {/* MOBILE FILTER DRAWER */}
      <AnimatePresence>
        {mobileFilters && (
          <>
            {/* OVERLAY */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() =>
                setMobileFilters(false)
              }
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
            />

            {/* DRAWER */}
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{
                type: "spring",
                damping: 25,
              }}
              className="fixed right-0 top-0 z-50 h-full w-[85%] max-w-sm overflow-y-auto bg-white p-6 md:hidden"
            >

              {/* HEADER */}
              <div className="mb-8 flex items-center justify-between">

                <h2 className="text-xl font-bold">
                  Filters
                </h2>

                <button
                  type="button"
                  onClick={() =>
                    setMobileFilters(false)
                  }
                  className="rounded-full p-2 hover:bg-gray-100"
                  aria-label="Close filters"
                >
                  <X size={20} />
                </button>

              </div>

              {/* CATEGORY */}
              <div className="mb-8">

                <h3 className="mb-3 font-semibold">
                  Category
                </h3>

                <div className="space-y-2">

                  {categoryNames.map((cat) => (
                    <button
                      type="button"
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setMobileFilters(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-3 text-left text-sm ${category === cat
                          ? "bg-black text-white"
                          : "bg-gray-50 hover:bg-gray-100"
                        }`}
                    >
                      {cat}
                    </button>
                  ))}

                </div>

              </div>

              {/* PRICE */}
              <div className="mb-8">

                <h3 className="mb-3 font-semibold">
                  Maximum Price
                </h3>

                <p className="mb-3 text-sm text-gray-500">
                  ₹{maxPrice.toLocaleString("en-IN")}
                </p>

                <input
                  type="range"
                  min="0"
                  max="50000"
                  step="500"
                  value={maxPrice}
                  onChange={(event) =>
                    setMaxPrice(
                      Number(event.target.value),
                    )
                  }
                  className="w-full"
                />

              </div>

              {/* RATING */}
              <div>

                <h3 className="mb-3 font-semibold">
                  Minimum Rating
                </h3>

                <div className="space-y-2">

                  {[0, 3, 4, 4.5].map(
                    (rating) => (
                      <button
                        type="button"
                        key={rating}
                        onClick={() => {
                          setMinRating(rating);
                          setMobileFilters(false);
                        }}
                        className={`flex w-full items-center gap-2 rounded-lg px-3 py-3 text-sm ${minRating === rating
                            ? "bg-gray-100 font-medium"
                            : "hover:bg-gray-50"
                          }`}
                      >
                        <Star
                          size={15}
                          fill="currentColor"
                        />

                        {rating === 0
                          ? "All ratings"
                          : `${rating}+`}
                      </button>
                    ),
                  )}

                </div>

              </div>

              {/* RESET */}
              <button
                type="button"
                onClick={() => {
                  resetFilters();
                  setMobileFilters(false);
                }}
                className="mt-10 w-full rounded-xl bg-black py-3 font-medium text-white transition hover:bg-gray-800"
              >
                Reset Filters
              </button>

            </motion.aside>
          </>
        )}
      </AnimatePresence>

    </main>
  );
}