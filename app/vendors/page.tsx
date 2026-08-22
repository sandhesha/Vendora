"use client";

import Link from "next/link";

export default function VendorsPage() {
  return (
    <main className="min-h-screen bg-black px-6 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <p className="text-sm text-white/40">
          Vendora Marketplace
        </p>

        <h1 className="mt-3 text-5xl font-bold">
          Vendors
        </h1>

        <p className="mt-4 text-white/40">
          Discover vendors on Vendora.
        </p>

        <div className="mt-10 grid gap-5 md:grid-cols-3">

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-black">
              V
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Test Vendor Store
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Vendor #1
            </p>

            <Link
              href="/vendors/1"
              className="mt-6 block rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-black"
            >
              Visit Store
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-black">
              P
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Premium Marketplace
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Vendor #2
            </p>

            <Link
              href="/vendors/2"
              className="mt-6 block rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-black"
            >
              Visit Store
            </Link>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-white text-2xl font-bold text-black">
              U
            </div>

            <h2 className="mt-6 text-xl font-bold">
              Urban Collection
            </h2>

            <p className="mt-2 text-sm text-white/40">
              Vendor #3
            </p>

            <Link
              href="/vendors/3"
              className="mt-6 block rounded-xl bg-white px-5 py-3 text-center text-sm font-bold text-black"
            >
              Visit Store
            </Link>
          </div>

        </div>
      </div>
    </main>
  );
}