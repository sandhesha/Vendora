"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Loader2,
  ChevronRight,
  Folder,
} from "lucide-react";
import Link from "next/link";

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

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://127.0.0.1:8000";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [subcategories, setSubcategories] = useState<
    Subcategory[]
  >([]);

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;

    async function loadCategories() {
      try {
        setLoading(true);
        setError("");

        const [categoryResponse, subcategoryResponse] =
          await Promise.all([
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
          ]);

        if (!categoryResponse.ok) {
          throw new Error(
            `Categories request failed: ${categoryResponse.status}`,
          );
        }

        if (!subcategoryResponse.ok) {
          throw new Error(
            `Subcategories request failed: ${subcategoryResponse.status}`,
          );
        }

        const categoryData =
          (await categoryResponse.json()) as Category[];

        const subcategoryData =
          (await subcategoryResponse.json()) as Subcategory[];

        if (mounted) {
          setCategories(categoryData);
          setSubcategories(subcategoryData);
        }
      } catch (err) {
        console.error(
          "Failed to load categories:",
          err,
        );

        if (mounted) {
          setError(
            err instanceof Error
              ? err.message
              : "Failed to load categories.",
          );
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

  const filteredCategories = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) {
      return categories;
    }

    return categories.filter((category) => {
      const categorySubcategories =
        subcategories.filter(
          (subcategory) =>
            subcategory.category_id === category.id,
        );

      return (
        category.name
          .toLowerCase()
          .includes(query) ||
        (category.description ?? "")
          .toLowerCase()
          .includes(query) ||
        categorySubcategories.some((subcategory) =>
          subcategory.name
            .toLowerCase()
            .includes(query),
        )
      );
    });
  }, [categories, subcategories, search]);

  return (
    <main className="min-h-screen bg-slate-950 px-4 pb-16 pt-28 text-white md:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-white/50">
            Vendora Marketplace
          </p>

          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
            Categories
          </h1>

          <p className="mt-2 max-w-2xl text-sm text-white/60 md:text-base">
            Explore products by category and
            subcategory.
          </p>
        </div>

        {/* Search */}
        <div className="mb-8 max-w-xl">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

            <input
              type="search"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search categories..."
              className="w-full rounded-2xl border border-white/10 bg-white/5 py-3.5 pl-12 pr-4 text-sm text-white outline-none transition placeholder:text-white/30 focus:border-white/30 focus:bg-white/[0.07]"
            />
          </div>
        </div>

        {/* Error */}
        {error && (
          <div className="mb-8 rounded-2xl border border-red-500/20 bg-red-500/10 p-5 text-sm text-red-300">
            <p className="font-semibold">
              Failed to load categories
            </p>

            <p className="mt-1 text-red-300/80">
              {error}
            </p>
          </div>
        )}

        {/* Loading */}
        {loading ? (
          <div className="flex min-h-64 items-center justify-center">
            <div className="flex items-center gap-3 text-sm text-white/50">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading categories...
            </div>
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] px-6 py-16 text-center">
            <Folder className="mx-auto h-10 w-10 text-white/20" />

            <h2 className="mt-4 text-lg font-semibold">
              No categories found
            </h2>

            <p className="mt-2 text-sm text-white/50">
              {search
                ? "Try a different search."
                : "There are no categories available yet."}
            </p>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredCategories.map((category) => {
              const categorySubcategories =
                subcategories.filter(
                  (subcategory) =>
                    subcategory.category_id ===
                    category.id,
                );

              return (
                <Link
                  key={category.id}
                  href={`/categories/${encodeURIComponent(
                    category.name
                      .toLowerCase()
                      .trim()
                      .replace(/\s+/g, "-"),
                  )}`}
                  className="group"
                >
                  <div className="h-full rounded-3xl border border-white/10 bg-white/[0.04] p-5 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.07]">
                    {/* Icon */}
                    <div className="mb-5 flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-black">
                        <Folder className="h-5 w-5" />
                      </div>

                      <ChevronRight className="h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-white/70" />
                    </div>

                    {/* Name */}
                    <h2 className="text-lg font-semibold">
                      {category.name}
                    </h2>

                    {/* Description */}
                    <p className="mt-2 line-clamp-2 text-sm leading-6 text-white/50">
                      {category.description ||
                        "Explore products in this category."}
                    </p>

                    {/* Subcategories */}
                    <div className="mt-5 border-t border-white/10 pt-4">
                      <p className="mb-3 text-xs font-medium uppercase tracking-wider text-white/30">
                        Subcategories
                      </p>

                      {categorySubcategories.length >
                      0 ? (
                        <div className="flex flex-wrap gap-2">
                          {categorySubcategories
                            .slice(0, 4)
                            .map((subcategory) => (
                              <span
                                key={
                                  subcategory.id
                                }
                                className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white/60"
                              >
                                {
                                  subcategory.name
                                }
                              </span>
                            ))}

                          {categorySubcategories.length >
                            4 && (
                            <span className="rounded-lg bg-white/5 px-2.5 py-1.5 text-xs text-white/40">
                              +
                              {categorySubcategories.length -
                                4}{" "}
                              more
                            </span>
                          )}
                        </div>
                      ) : (
                        <p className="text-xs text-white/30">
                          No subcategories
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        {/* Stats */}
        {!loading && categories.length > 0 && (
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-wider text-white/30">
                Categories
              </p>

              <p className="mt-2 text-2xl font-bold">
                {categories.length}
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-xs uppercase tracking-wider text-white/30">
                Subcategories
              </p>

              <p className="mt-2 text-2xl font-bold">
                {subcategories.length}
              </p>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}