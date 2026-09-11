"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(e: FormEvent) {
    e.preventDefault();
    if (!username.trim() || !password.trim()) {
      setError("Please enter both username/email and password.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: username.trim(), password: password.trim() }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok || !data?.ok) {
        setError(data?.error || "Invalid username or password.");
        setLoading(false);
        return;
      }

      // Success, go to admin dashboard
      router.push("/admin");
      router.refresh();
    } catch {
      setError("Unable to connect to the authentication service. Please try again.");
      setLoading(false);
    }
  }

  return (
    <section className="flex min-h-[85vh] items-center justify-center bg-paper px-4 py-16 sm:px-6">
      <div className="w-full max-w-md">
        {/* Header Branding */}
        <div className="text-center">
          <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-line bg-white shadow-xs">
            <svg
              className="h-6 w-6 text-indigo"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.75}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
          <p className="mono-tag mt-4 text-slate">Chromatus Consulting</p>
          <h1 className="mt-1 font-display text-3xl font-semibold tracking-tight text-ink">
            Admin Access
          </h1>
          <p className="mt-2 text-sm text-slate">
            Sign in to access client inquiries, newsletter subscribers, and portal management.
          </p>
        </div>

        {/* Login Card */}
        <div className="mt-8 rounded-2xl border border-line bg-white p-6 shadow-sm sm:p-8">
          {error && (
            <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-xs font-medium text-red-800">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="mono-tag block text-slate" htmlFor="username">
                Username or Email
              </label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
                className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-indigo"
                placeholder="Enter your username or email"
              />
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label className="mono-tag block text-slate" htmlFor="password">
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-xs text-indigo hover:text-indigo-light"
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
                className="mt-2 w-full rounded-lg border border-line bg-paper px-4 py-3 text-sm text-ink outline-none transition focus:border-indigo"
                placeholder="Enter your password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 flex w-full items-center justify-center rounded-lg bg-indigo px-6 py-3.5 text-sm font-semibold text-paper transition hover:bg-indigo-light disabled:opacity-50"
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <svg
                    className="h-4 w-4 animate-spin text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    />
                  </svg>
                  Authenticating…
                </span>
              ) : (
                "Sign in to Dashboard"
              )}
            </button>
          </form>

          <div className="mt-6 border-t border-line pt-4 text-center">
            <p className="text-xs text-slate">
              Authorized personnel only. Protected by TLS encryption.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
