"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAuth, type User, type UserRole } from "@/lib/auth/auth-context";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

interface LoginResponse {
  access_token: string;
  token_type: string;
}

interface ApiUser {
  id: number;
  name: string;
  email: string;
  role: string;
  is_active: boolean;
}

export default function LoginPage() {
  const router = useRouter();

  const { login, isAuthenticated, isLoading: authLoading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (loading) {
      return;
    }

    setError("");
    setLoading(true);

    const cleanEmail = email.trim().toLowerCase();

    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          email: cleanEmail,
          password,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        const message =
          data?.detail ||
          data?.message ||
          "Invalid email or password.";

        throw new Error(message);
      }

      if (!data?.access_token) {
        throw new Error("Login succeeded but no access token was returned.");
      }

      const loginData = data as LoginResponse;

      /*
       * Fetch the authenticated user after receiving the token.
       * This guarantees that the user information comes from
       * the backend rather than being guessed on the frontend.
       */
      const meResponse = await fetch(`${API_URL}/auth/me`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${loginData.access_token}`,
          Accept: "application/json",
        },
      });

      const meData = await meResponse.json().catch(() => null);

      if (!meResponse.ok) {
        throw new Error(
          meData?.detail || "Could not retrieve your account information."
        );
      }

      const backendUser = meData as ApiUser;

      const role: UserRole =
        backendUser.role === "admin" ||
        backendUser.role === "vendor" ||
        backendUser.role === "customer"
          ? backendUser.role
          : "customer";

      const user: User = {
        id: Number(backendUser.id),
        name: backendUser.name,
        email: backendUser.email,
        role,
        is_active: backendUser.is_active,
      };

      login(user, loginData.access_token);

      /*
       * Redirect according to the authenticated role.
       */
      if (role === "admin") {
        router.replace("/admin");
      } else if (role === "vendor") {
        router.replace("/vendor");
      } else {
        router.replace("/");
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to sign in. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (authLoading) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center">
        <div className="text-sm text-slate-500">
          Loading...
        </div>
      </main>
    );
  }

  if (isAuthenticated) {
    return (
      <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            You are already signed in
          </h1>

          <button
            type="button"
            onClick={() => router.replace("/")}
            className="mt-5 rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:bg-slate-800"
          >
            Continue
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-100 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">

        {/* Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900 text-white text-xl font-bold shadow-lg">
            M
          </div>

          <h1 className="mt-5 text-3xl font-bold tracking-tight text-slate-900">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Sign in to your marketplace account
          </p>
        </div>

        {/* Card */}
        <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-xl shadow-slate-200/50">

          {error && (
            <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-2 block text-sm font-medium text-slate-700"
              >
                Email address
              </label>

              <div className="relative">
                <Mail
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="mb-2 flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-slate-700"
                >
                  Password
                </label>

                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-slate-600 hover:text-slate-900"
                >
                  Forgot password?
                </Link>
              </div>

              <div className="relative">
                <Lock
                  size={19}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  disabled={loading}
                  className="w-full rounded-xl border border-slate-200 bg-white py-3.5 pl-11 pr-12 text-sm text-slate-900 outline-none transition focus:border-slate-400 focus:ring-2 focus:ring-slate-200 disabled:cursor-not-allowed disabled:opacity-60"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-400 hover:text-slate-700"
                  aria-label={
                    showPassword
                      ? "Hide password"
                      : "Show password"
                  }
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="group flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight
                    size={18}
                    className="transition-transform group-hover:translate-x-1"
                  />
                </>
              )}
            </button>
          </form>

          {/* Register */}
          <div className="mt-7 border-t border-slate-200 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Don't have an account?{" "}
              <Link
                href="/auth/register"
                className="font-semibold text-slate-900 hover:underline"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>

        {/* Vendor */}
        <p className="mt-6 text-center text-xs text-slate-500">
          Want to sell on our marketplace?{" "}
          <Link
            href="/auth/vendor-register"
            className="font-semibold text-slate-700 hover:text-slate-900"
          >
            Become a vendor
          </Link>
        </p>
      </div>
    </main>
  );
}