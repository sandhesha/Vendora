"use client";

import Link from "next/link";
import { Search, ShoppingBag, Home } from "lucide-react";

export default function NotFound() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#f7f1e3] text-[#29251f]">
      {/* Background texture */}
      <div className="pointer-events-none absolute inset-0 opacity-30">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(120,90,40,.08) 1px, transparent 1px)",
            backgroundSize: "24px 24px",
          }}
        />
      </div>

      {/* Browser Header */}
      <div className="relative z-20 h-16 border-b border-black/10 bg-[#10151d] px-5">
        <div className="mx-auto flex h-full max-w-7xl items-center">
          {/* Browser dots */}
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
            <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
            <span className="h-3 w-3 rounded-full bg-[#28c840]" />
          </div>

          {/* Logo */}
          <div className="ml-10 text-sm font-bold tracking-wide text-white">
            VENDORA
            <span className="mx-2 text-white/30">—</span>
            <span className="text-pink-400">MARKET</span>
            <span className="mx-1 text-white/30">·</span>
            <span className="text-blue-400">SHOP</span>
            <span className="mx-1 text-white/30">·</span>
            <span className="text-yellow-400">SELL</span>
          </div>

          {/* Address */}
          <div className="ml-auto hidden font-mono text-xs text-white/50 sm:block">
            vendora / 404
          </div>
        </div>
      </div>

      {/* Main content */}
      <section className="relative z-10 flex min-h-[calc(100vh-64px)] flex-col items-center overflow-hidden px-6 pt-16">
        {/* Title */}
        <div className="relative z-20 text-center">
          <h1 className="text-5xl font-black tracking-tight md:text-6xl">
            Page Not Found
          </h1>

          <p className="mt-3 text-base text-black/50">
            Nothing at this address.
          </p>

          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#c94d3d] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:bg-[#b94132] hover:shadow-xl"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        {/* Huge 404 */}
        <div className="pointer-events-none absolute bottom-16 left-1/2 z-0 flex -translate-x-1/2 items-end whitespace-nowrap select-none">
          <span className="text-[15rem] font-black leading-none tracking-[-0.08em] text-[#e9cd72]/70 md:text-[22rem]">
            404
          </span>
        </div>

        {/* Detective character */}
        <div className="absolute bottom-20 left-0 z-10 hidden w-full md:block">
          <div className="detective-walk relative h-48 w-40">
            {/* Magnifying glass */}
            <div className="absolute -right-5 -top-6 h-24 w-24 rotate-[-18deg] rounded-full border-[7px] border-[#29251f] bg-white/20 shadow-xl">
              <div className="absolute inset-2 rounded-full border border-black/10" />

              <div className="absolute left-1/2 top-1/2 h-1 w-14 -translate-y-1/2 rotate-45 bg-[#29251f]" />
            </div>

            {/* Handle */}
            <div className="absolute right-[-28px] top-[68px] h-3 w-12 rotate-[38deg] rounded-full bg-[#29251f]" />

            {/* Body */}
            <div className="absolute bottom-4 left-10 h-20 w-20 rounded-[45%] bg-[#251f1d]">
              {/* Eye */}
              <div className="absolute right-2 top-3 h-7 w-7 rounded-full bg-white">
                <div className="absolute left-3 top-2 h-3 w-3 rounded-full bg-black" />
              </div>

              {/* Beak */}
              <div className="absolute right-[-16px] top-8 border-b-[9px] border-l-[20px] border-t-[9px] border-b-transparent border-l-[#e4a12a] border-t-transparent" />

              {/* Spots */}
              <span className="absolute left-5 top-12 h-2 w-2 rounded-full bg-[#d75c5c]" />
              <span className="absolute left-10 top-15 h-2 w-2 rounded-full bg-[#d75c5c]" />
              <span className="absolute left-3 top-17 h-2 w-2 rounded-full bg-[#d75c5c]" />

              {/* Tail */}
              <div className="absolute bottom-2 left-[-20px] h-8 w-8 rotate-45 bg-[#251f1d]" />
            </div>

            {/* Head */}
            <div className="absolute bottom-16 left-7 h-16 w-16 rounded-full bg-[#251f1d]" />

            {/* Hat / hair */}
            <div className="absolute bottom-[68px] left-12 flex gap-1">
              <span className="h-6 w-3 rotate-[-25deg] rounded-t-full bg-[#d34c48]" />
              <span className="h-7 w-3 rounded-t-full bg-[#d34c48]" />
              <span className="h-6 w-3 rotate-[25deg] rounded-t-full bg-[#d34c48]" />
            </div>

            {/* Legs */}
            <div className="absolute bottom-0 left-16 h-12 w-2 rotate-[12deg] rounded-full bg-[#251f1d]" />
            <div className="absolute bottom-0 left-24 h-12 w-2 rotate-[-12deg] rounded-full bg-[#251f1d]" />

            {/* Feet */}
            <div className="absolute bottom-0 left-12 h-2 w-7 rotate-[-15deg] rounded-full bg-[#251f1d]" />
            <div className="absolute bottom-0 left-23 h-2 w-7 rotate-[15deg] rounded-full bg-[#251f1d]" />
          </div>
        </div>

        {/* Floor */}
        <div className="absolute bottom-0 left-0 h-20 w-full border-t border-black/10 bg-[#eee3c8]">
          <div className="mx-auto flex h-full max-w-7xl">
            {Array.from({ length: 18 }).map((_, index) => (
              <div
                key={index}
                className="h-full flex-1 border-r border-black/5"
              />
            ))}
          </div>

          {/* Floor dots */}
          <div className="absolute left-0 top-2 flex w-full justify-around opacity-20">
            {Array.from({ length: 12 }).map((_, index) => (
              <span
                key={index}
                className="h-2 w-2 rounded-full bg-black"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom code panels */}
      <div className="absolute bottom-4 left-1/2 z-30 hidden w-[95%] max-w-6xl -translate-x-1/2 gap-3 lg:flex">
        <CodePanel
          title="404.tsx"
          dot="bg-pink-400"
          code={
            <>
              <span className="text-pink-300">const</span>{" "}
              <span className="text-blue-300">page</span> ={" "}
              <span className="text-yellow-300">404</span>;
              <br />
              <br />
              <span className="text-white/40">
                {"// the page you're looking for"}
              </span>
              <br />
              <span className="text-pink-300">return</span>{" "}
              <span className="text-green-300">
                &quot;Nothing found&quot;
              </span>
              ;
            </>
          }
        />

        <CodePanel
          title="styles.css"
          dot="bg-blue-400"
          code={
            <>
              <span className="text-pink-300">.not-found</span>{" "}
              {"{"}
              <br />
              {"  "}
              <span className="text-blue-300">display</span>:{" "}
              <span className="text-yellow-300">flex</span>;
              <br />
              {"  "}
              <span className="text-blue-300">align-items</span>:{" "}
              <span className="text-yellow-300">center</span>;
              <br />
              {"  "}
              <span className="text-blue-300">justify-content</span>:{" "}
              <span className="text-yellow-300">center</span>;
              <br />
              {"}"}
            </>
          }
        />

        <CodePanel
          title="search.js"
          dot="bg-yellow-400"
          code={
            <>
              <span className="text-pink-300">const</span>{" "}
              <span className="text-blue-300">search</span> ={" "}
              <span className="text-pink-300">false</span>;
              <br />
              <br />
              <span className="text-white/40">
                {"// try another destination"}
              </span>
              <br />
              <span className="text-yellow-300">redirect</span>(
              <span className="text-green-300">&quot;/&quot;</span>);
            </>
          }
        />
      </div>

      {/* Small mobile icon */}
      <div className="absolute bottom-24 left-1/2 z-20 -translate-x-1/2 rounded-full bg-white/70 p-4 shadow-md lg:hidden">
        <Search className="h-7 w-7" />
      </div>
    </main>
  );
}

function CodePanel({
  title,
  dot,
  code,
}: {
  title: string;
  dot: string;
  code: React.ReactNode;
}) {
  return (
    <div className="min-h-32 flex-1 rounded-xl border border-white/10 bg-[#10151d]/95 p-4 shadow-2xl backdrop-blur">
      <div className="mb-3 flex items-center gap-2 text-xs font-semibold text-white/80">
        <span className={`h-2 w-2 rounded-full ${dot}`} />
        {title}
      </div>

      <pre className="overflow-hidden whitespace-pre-wrap font-mono text-[11px] leading-5 text-white/70">
        <code>{code}</code>
      </pre>
    </div>
  );
}