"use client";

import { useEffect, useState } from "react";

const FIELDS = [
  { key: "firstName", label: "First name", type: "text", autoComplete: "given-name" },
  { key: "lastName", label: "Last name", type: "text", autoComplete: "family-name" },
  { key: "nmls", label: "NMLS #", type: "text", autoComplete: "off" },
  { key: "phone", label: "Phone", type: "tel", autoComplete: "tel" },
  { key: "email", label: "Email", type: "email", autoComplete: "email" },
] as const;

type FormState = Record<(typeof FIELDS)[number]["key"], string>;
const EMPTY: FormState = { firstName: "", lastName: "", nmls: "", phone: "", email: "" };

export function Banner() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* top banner */}
      <div className="fixed inset-x-0 top-0 z-[60] h-9 bg-black text-paper">
        <div className="flex h-full w-full items-center justify-center gap-2 px-4 text-center">
          <span className="eyebrow text-gold-soft">Loan Officers</span>
          <span className="text-xs text-paper/40" aria-hidden>·</span>
          <button
            onClick={() => setOpen(true)}
            className="link-underline text-xs font-medium text-paper sm:text-sm"
          >
            Join us live every Thursday →
          </button>
        </div>
      </div>

      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-[70] bg-black/60 transition-opacity duration-300 ${
          open ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        aria-hidden
      />

      {/* slide-out */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Loan officer sign-up"
        className={`fixed inset-y-0 right-0 z-[80] flex w-full max-w-md flex-col bg-forest-deep text-paper shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between px-7 pt-7">
          <span className="eyebrow text-gold-soft">Loan Officers · Live</span>
          <button
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-paper/70 transition-colors hover:border-paper/40 hover:text-paper"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {submitted ? (
          <div className="flex flex-1 flex-col items-center justify-center px-7 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gold text-forest-deep">
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3 className="display mt-5 text-2xl">You&apos;re on the list.</h3>
            <p className="mt-2 text-paper/60">
              We&apos;ll email the join link to {form.email || "you"} before Thursday&apos;s session.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm(EMPTY); setOpen(false); }}
              className="mt-7 rounded-full bg-paper px-6 py-3 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
            >
              Done
            </button>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="flex flex-1 flex-col overflow-y-auto px-7 pb-7"
          >
            <div className="mt-6">
              <h2 className="display text-3xl">Join us live every Thursday.</h2>
              <p className="mt-3 text-paper/60">
                A weekly live session for loan officers — pricing, tech, and what&apos;s
                working right now. Register once and we&apos;ll send the link each week.
              </p>
            </div>

            <div className="mt-7 space-y-4">
              {FIELDS.map((f) => (
                <div key={f.key}>
                  <label htmlFor={f.key} className="mb-1.5 block text-xs font-medium text-paper/60">
                    {f.label}
                  </label>
                  <input
                    id={f.key}
                    type={f.type}
                    required
                    autoComplete={f.autoComplete}
                    value={form[f.key]}
                    onChange={(e) => setForm((s) => ({ ...s, [f.key]: e.target.value }))}
                    className="h-12 w-full rounded-xl border border-paper/15 bg-white/5 px-4 text-sm text-paper outline-none transition-colors placeholder:text-paper/30 focus:border-gold"
                  />
                </div>
              ))}
            </div>

            <button
              type="submit"
              className="mt-7 rounded-full bg-gold px-6 py-3.5 text-sm font-semibold text-forest-deep transition-colors hover:bg-gold-soft"
            >
              Reserve my spot
            </button>
            <p className="mt-3 text-center text-xs text-paper/40">
              For mortgage professionals. We&apos;ll never share your info.
            </p>
          </form>
        )}
      </aside>
    </>
  );
}
