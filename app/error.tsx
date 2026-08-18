"use client";

import { useEffect } from "react";
import ErrorState from "@/components/ui/ErrorState";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-black text-white">
      <ErrorState
        title="Oops! Something broke"
        message="Vendora couldn't load this page correctly. Try refreshing the experience."
        onRetry={reset}
      />
    </main>
  );
}