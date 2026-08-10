import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero, PageCTA } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Loan Process — Premier Mortgage",
  description:
    "How a Premier Mortgage loan works — from application and pre-approval to underwriting and closing, step by step.",
};

const STEPS = [
  { n: "01", t: "Apply", d: "Answer a few questions and upload documents securely. It takes about ten minutes and won't affect your credit to start." },
  { n: "02", t: "Get pre-approved", d: "A real loan officer reviews your file and issues a verified pre-approval letter — the kind sellers and agents take seriously." },
  { n: "03", t: "Shop & make an offer", d: "House-hunt with confidence. When you're ready, we're on call to support your offer and lock your rate." },
  { n: "04", t: "Processing", d: "We order the appraisal and title and gather everything underwriting needs — keeping every party moving in parallel." },
  { n: "05", t: "Underwriting", d: "Real underwriters review your file to agency guidelines. Fewer surprises, faster clear-to-close." },
  { n: "06", t: "Close on time", d: "We back our closing dates. Sign, get your keys, and start moving in — on the day we promised." },
];

const CHECKLIST = [
  "Recent pay stubs (last 30 days)",
  "W-2s or 1099s (last two years)",
  "Bank statements (last two months)",
  "Photo ID",
  "Tax returns (if self-employed)",
  "Details on other properties or debts",
];

const FAQ = [
  { q: "How long does the whole process take?", a: "Most purchases close in about 18 days from a complete application. Timelines vary with appraisal and title." },
  { q: "Will applying hurt my credit?", a: "Getting started is a soft check that won't affect your score. A hard pull happens only when you formally move forward." },
  { q: "What if my closing date slips?", a: "We back our closing dates — if we miss ours, you may receive a credit toward your costs.*" },
];

export default function LoanProcessPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <PageHero
        eyebrow="How it works"
        title="From application to keys."
        intro="Six clear steps, one dedicated loan officer, and no black boxes. Here's exactly what to expect."
      />

      {/* steps */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-line bg-card p-7">
              <div className="font-mono text-sm text-gold">{s.n}</div>
              <h3 className="display mt-4 text-xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* checklist */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-8 rounded-3xl border border-line bg-paper-2 p-8 sm:p-12 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="eyebrow text-gold">Come prepared</p>
            <h2 className="display mt-3 text-3xl">What you&apos;ll need.</h2>
            <p className="mt-3 text-muted">
              Have these handy and your loan officer can move fast. Don&apos;t
              have everything? Start anyway — we&apos;ll guide you.
            </p>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2">
            {CHECKLIST.map((c) => (
              <li key={c} className="flex items-center gap-3 rounded-xl border border-line bg-card px-4 py-3 text-sm text-ink-soft">
                <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                  <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                    <path d="M2.5 6.5 5 9l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
                {c}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* faq */}
      <section className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
        <div className="mb-8">
          <p className="eyebrow text-gold">Good to know</p>
          <h2 className="display mt-3 text-3xl">Common questions.</h2>
        </div>
        <div className="space-y-3">
          {FAQ.map((f) => (
            <div key={f.q} className="rounded-2xl border border-line bg-card p-6">
              <h3 className="font-medium text-ink">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{f.a}</p>
            </div>
          ))}
        </div>
      </section>

      <PageCTA
        title="Ready when you are."
        body="Start your application — about ten minutes, no credit hit to begin."
        ctaLabel="Get pre-approved"
        ctaHref="#apply"
        dark
      />
      <Footer />
    </main>
  );
}
