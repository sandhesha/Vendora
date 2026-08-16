import Building3D from "@/components/Building3D";
import {
  ShieldCheck,
  Store,
  UserRound,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-[#DCE6F1] via-[#E3EAF2] to-[#C9D8E8]">
      {/* Soft background effects */}
      <div className="pointer-events-none fixed inset-0">
        <div className="absolute left-1/2 top-[-180px] h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-200/40 blur-[140px]" />
        <div className="absolute bottom-[-200px] left-[-150px] h-[450px] w-[450px] rounded-full bg-blue-200/30 blur-[130px]" />
      </div>

      {/* Navigation */}
      <nav className="relative z-10 flex items-center justify-between border-b border-slate-200/70 bg-[#F8FAFC]/80 px-8 py-5 backdrop-blur-xl lg:px-16">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-cyan-200 bg-cyan-50">
            <ShieldCheck className="h-5 w-5 text-[#0F9D9A]" />
          </div>

          <div>
            <h1 className="font-semibold tracking-wide text-slate-900">
              MULTIVENDOR
            </h1>

            <p className="text-[10px] tracking-[0.3em] text-slate-400">
              IDENTITY SYSTEM
            </p>
          </div>
        </div>

        <div className="hidden text-sm text-slate-500 md:block">
          Secure Authentication Platform
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-80px)] max-w-7xl items-center px-8 pb-16 lg:grid-cols-2 lg:px-16">
        {/* Content */}
        <div className="order-2 lg:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-[#F8FAFC] px-4 py-2 text-xs text-cyan-700 shadow-sm">
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-500" />
            Secure Identity Infrastructure
          </div>

          <h2 className="max-w-2xl text-[#0F9D9A]xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
            One identity.
            <br />

            <span className="text-[#0F9D9A]">
              Every marketplace.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-base leading-7 text-slate-500 md:text-lg">
            Secure authentication and role-based access for customers,
            vendors, and administrators across the multi-vendor platform.
          </p>

          {/* Access cards */}
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <a
              href="/login"
              className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
            >
              <UserRound className="mb-4 h-6 w-6 text-[#0F9D9A]" />

              <h3 className="font-semibold text-slate-900">
                Customer
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Sign in
              </p>

              <ArrowRight className="mt-5 h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0F9D9A]" />
            </a>

            <a
              href="/vendor-register"
              className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
            >
              <Store className="mb-4 h-6 w-6 text-[#0F9D9A]" />

              <h3 className="font-semibold text-slate-900">
                Vendor
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Register
              </p>

              <ArrowRight className="mt-5 h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0F9D9A]" />
            </a>

            <a
              href="/admin"
              className="group rounded-2xl border border-slate-200 bg-[#F8FAFC] p-5 shadow-sm transition hover:-translate-y-1 hover:border-cyan-300 hover:shadow-lg"
            >
              <ShieldCheck className="mb-4 h-6 w-6 text-[#0F9D9A]" />

              <h3 className="font-semibold text-slate-900">
                Admin
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Secure access
              </p>

              <ArrowRight className="mt-5 h-4 w-4 text-slate-300 transition group-hover:translate-x-1 group-hover:text-[#0F9D9A]" />
            </a>
          </div>
        </div>

        {/* 3D Building */}
        <div className="order-1 flex items-center justify-center lg:order-2">
          <div className="w-full max-w-[620px]">
            <Building3D />
          </div>
        </div>
      </section>
    </main>
  );
}