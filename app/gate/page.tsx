"use client";

import { useState } from "react";
import { Logo } from "@/components/Logo";

export default function GatePage() {
  const [pw, setPw] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);
    const res = await fetch("/api/gate", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ password: pw }),
    });
    if (res.ok) {
      const from = new URLSearchParams(window.location.search).get("from");
      window.location.href = from && from.startsWith("/") ? from : "/";
    } else {
      setError(true);
      setLoading(false);
      setPw("");
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-forest-deep px-5 text-paper">
      <div className="w-full max-w-sm text-center">
        <div className="flex justify-center">
          <Logo light />
        </div>
        <h1 className="display mt-8 text-2xl">This site is private.</h1>
        <p className="mt-2 text-sm text-paper/60">
          Enter the password to continue.
        </p>

        <form onSubmit={submit} className="mt-7">
          <input
            type="password"
            autoFocus
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            placeholder="Password"
            aria-label="Password"
            className={`h-12 w-full rounded-xl border bg-white/5 px-4 text-center text-sm text-paper outline-none transition-colors placeholder:text-paper/30 ${
              error ? "border-red-400/70" : "border-paper/15 focus:border-gold"
            }`}
          />
          {error && (
            <p className="mt-2 text-xs text-red-300">Incorrect password. Try again.</p>
          )}
          <button
            type="submit"
            disabled={loading || !pw}
            className="mt-4 h-12 w-full rounded-full bg-gold text-sm font-semibold text-forest-deep transition-colors hover:bg-gold-soft disabled:opacity-50"
          >
            {loading ? "Checking…" : "Enter site"}
          </button>
        </form>

        <p className="mt-8 text-[11px] text-paper/30">Premier Mortgage · Authorized access only</p>
      </div>
    </main>
  );
}
