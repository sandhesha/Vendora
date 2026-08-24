import Link from "next/link";

export default function UnauthorizedPage() {
  return (
    <main className="min-h-screen bg-[#DCE6F1] flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="text-7xl mb-6">🔒</div>

        <h1 className="text-4xl font-bold text-[#172033]">
          Access Restricted
        </h1>

        <p className="mt-4 text-[#52647A]">
          You don't have permission to access this page.
        </p>

        <Link
          href="/auth/login"
          className="inline-block mt-7 rounded-xl bg-[#1E3A5F] px-6 py-3 font-semibold text-[#E8EEF5] hover:bg-[#294D78]"
        >
          Back to Login
        </Link>
      </div>
    </main>
  );
}