"use client";

import { useEffect, useState } from "react";
import { getProducts, Product } from "@/lib/api/products";

export default function ApiTestPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    getProducts()
      .then(setProducts)
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <main className="min-h-screen bg-black p-10 text-white">
      <h1 className="mb-8 text-3xl font-bold">
        API Test
      </h1>

      {error && (
        <p className="text-red-400">
          {error}
        </p>
      )}

      {products.map((product) => (
        <div
          key={product.id}
          className="mb-4 rounded-xl border border-white/10 p-5"
        >
          <h2 className="text-xl font-semibold">
            {product.name}
          </h2>

          <p className="text-white/50">
            SKU: {product.sku}
          </p>

          <p className="mt-2">
            ₹{product.price}
          </p>

          <p className="text-white/50">
            Stock: {product.stock}
          </p>
        </div>
      ))}
    </main>
  );
}