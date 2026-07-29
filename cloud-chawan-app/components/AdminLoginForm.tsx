"use client";

import { useState } from "react";
import { createSupabaseClient } from "@/lib/supabase";

export function AdminLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    const supabase = createSupabaseClient();

    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    window.location.assign("/admin");
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(239,192,203,0.28),_transparent_34%),linear-gradient(135deg,_#FFFEFD_0%,_#F4F9EE_100%)] px-4 py-6 text-[#334155] sm:px-6 lg:px-8 lg:py-8">
      <section className="mx-auto flex max-w-md flex-col rounded-[2rem] border border-[#EAEAEA]/80 bg-[#FFFEFD]/90 p-6 shadow-[0_24px_80px_rgba(51,65,85,0.08)] sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-[#334155]/60">Cloud Chawan admin</p>
        <h1 className="mt-2 text-3xl font-semibold text-[#334155]">Sign in</h1>
        <p className="mt-2 text-sm leading-7 text-[#334155]/70">
          Use your Supabase admin account to access the read-only wishlist dashboard.
        </p>

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          <label className="block text-sm font-medium text-[#334155]">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#334155]/60">Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="w-full rounded-full border border-[#EAEAEA] bg-[#FCFCFA] px-4 py-3 text-sm text-[#334155] outline-none"
            />
          </label>

          <label className="block text-sm font-medium text-[#334155]">
            <span className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.32em] text-[#334155]/60">Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
              className="w-full rounded-full border border-[#EAEAEA] bg-[#FCFCFA] px-4 py-3 text-sm text-[#334155] outline-none"
            />
          </label>

          {error ? <p className="text-sm text-[#b91c1c]">{error}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-[#C5D9B8] px-5 py-3 text-sm font-semibold text-[#334155] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </section>
    </main>
  );
}
