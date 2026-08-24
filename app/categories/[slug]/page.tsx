"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Loader2, Package, Search } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

interface Category {
  id: number;
  name: string;
  description?: string | null;
  is_active: boolean;
}

interface Subcategory {
  id: number;
  category_id: number;
  name: string;
  description?: string | null;
  is_active: boolean;
}

interface Product {
  id: number;
  name: string;
  description?: string | null;
  price?: number;
  category_id: number;
  subcategory_id?: number | null;
  category_name?: string | null;
}

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export default function CategoryDetailPage() {
  const params = useParams();

  const slug = Array.isArray(params.slug)
    ? params.slug[0]
    : String(params.slug ?? "");

  const [category, setCategory] =
    useState<Category | null>(null);

  const [subcategories, setSubcategories] =
    useState<Subcategory[]>([]);

  const [products, setProducts] =
    useState<Product[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] =
    useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) return;

    let mounted = true;

    async function loadCategory() {
      try {
        setLoading(true);
        setError("");

        const [
          categoryResponse,
          subcategoryResponse,
          productResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/categories`, {
            headers: {
              Accept: "application/json",
            },
          }),
          fetch(`${API_URL}/subcategories`, {
            headers: {
              Accept: "application/json",
            },
          }),
          fetch(`${API_URL}/products`, {
            headers: {
              Accept: "application/json",
            },
          }),
        ]);

        if (!categoryResponse.ok) {
          throw new Error(
            `Categories request failed: ${categoryResponse.status}`,
          );
        }

        const categories =
          (await categoryResponse.json()) as Category[];

        const allSubcategories =
          subcategoryResponse.ok
            ? ((await subcategoryResponse.json()) as Subcategory[])
            : [];

        const allProducts =
          productResponse.ok
            ? ((await productResponse.json()) as Product[])
            : [];

        const foundCategory =
          categories.find(
            (item) =>
              slugify(item.name) ===
              slug,
          ) ?? null;

        if (!foundCategory) {
          throw new Error(
            "Category not found.",
          );
        }

        if (mounted) {
          setCategory(foundCategory);

          setSubcategories(
            allSubcategories.filter(
              (item) =>
                item.category_id ===
                foundCategory.id,
            ),
          );

          setProducts(
            allProducts.filter(
              (item) =>
                item.category_id ===
                foundCategory.id,
            ),
          );
        }
      } catch (err) {
        console.error(
          "Failed to load category:",
          err,
        );

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load category.",
          );
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    }

    loadCategory();

    return () => {
      mounted = false;
    };
  }, [slug]);

  const filteredProducts = useMemo(() => {
    const query = search
      .trim()
      .toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) =>
      product.name
        .toLowerCase()
        .includes(query),
    );
  }, [products, search]);

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 pt-32 text-white">
        <div className="flex min-h-64 items-center justify-center">
          <div className="flex items-center gap-3 text-sm text-white/50">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading category...
          </div>
        </div>
      </main>
    );
  }

  if (error || !category) {
    return (
      <main className="min-h-screen bg-slate-950 px-4 pt-32 text-white">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/categories"
            className="mb-6 inline-flex items-center gap-2 text-sm text-white/60 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Categories
          </Link>

          <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-8">
            <h1 className="text-xl font-semibold">
              Category not found
            </h1>

            <p className="mt-2 text-sm text-white/50">
              {error ||
                "This category does not exist."}
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Back */}
        <Link
          href="/categories"
          className="mb-8 inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" />
          All Categories
        </Link>

        {/* Category header */}
        <section className="mb-10 rounded-3xl border border-white/10 bg-white/[0.04] p-6 md:p-10">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-white/30">
            Category
          </p>

          <h1 className="mt-3 text-3xl font-bold md:text-5xl">
            {category.name}
          </h1>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-white/50 md:text-base">
            {category.description ||
              `Explore products available in ${category.name}.`}
          </p>

          <div className="mt-6 flex flex-wrap gap-3 text-sm text-white/50">
            <span className="rounded-xl bg-white/5 px-4 py-2">
              {products.length} Products
            </span>

            <span className="rounded-xl bg-white/5 px-4 py-2">
              {subcategories.length} Subcategories
            </span>
          </div>
        </section>

        {/* Subcategories */}
        {subcategories.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-xl font-semibold">
              Subcategories
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {subcategories.map(
                (subcategory) => (
                  <div
                    key={subcategory.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                  >
                    <h3 className="font-medium">
                      {subcategory.name}
                    </h3>

                    <p className="mt-2 text-sm text-white/40">
                      {subcategory.description ||
                        "Browse products in this subcategory."}
                    </p>
                  </div>
                ),
              )}
            </div>
          </section>
        )}

        {/* Products */}
        <section>
          <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-xl font-semibold">
                Products
              </h2>

              <p className="mt-1 text-sm text-white/40">
                Products in {category.name}
              </p>
            </div>

            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-white/30" />

              <input
                type="search"
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search products..."
                className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-10 pr-4 text-sm outline-none placeholder:text-white/30 focus:border-white/20"
              />
            </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
              <Package className="mx-auto h-10 w-10 text-white/20" />

              <h3 className="mt-4 font-semibold">
                No products found
              </h3>

              <p className="mt-2 text-sm text-white/40">
                {search
                  ? "Try another search."
                  : "There are no products in this category yet."}
              </p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredProducts.map(
                (product) => (
                  <Link
                    key={product.id}
                    href={`/products/${product.id}`}
                    className="group"
                  >
                    <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
                      <div className="flex h-40 items-center justify-center rounded-2xl bg-white/[0.04]">
                        <Package className="h-10 w-10 text-white/20" />
                      </div>

                      <h3 className="mt-5 font-semibold">
                        {product.name}
                      </h3>

                      {product.description && (
                        <p className="mt-2 line-clamp-2 text-sm text-white/40">
                          {product.description}
                        </p>
                      )}

                      {product.price !==
                        undefined && (
                        <p className="mt-4 text-lg font-bold">
                          ₹
                          {Number(
                            product.price,
                          ).toLocaleString(
                            "en-IN",
                          )}
                        </p>
                      )}
                    </div>
                  </Link>
                ),
              )}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}