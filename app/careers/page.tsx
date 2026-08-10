import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { CareersBoard } from "@/components/CareersBoard";

export const metadata: Metadata = {
  title: "Careers — Premier Mortgage",
  description:
    "Join Premier Mortgage. Open roles for Branch Managers, Loan Officers, Processors, Underwriters, and Closers across the country.",
};

const PERKS = [
  { t: "Employee-owned", d: "Everyone shares in the upside of what we build together." },
  { t: "A real growth path", d: "Clear ladders from processor to underwriter to leadership." },
  { t: "Modern tech stack", d: "Tools that clear the busywork so you can do the real work." },
  { t: "Community-first", d: "We give back in every market we lend in." },
];

export default function CareersPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />

      {/* hero */}
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-40 sm:px-8 sm:pt-48">
        <p className="eyebrow text-gold">Careers</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          Build your career on the Frontline.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          We&apos;re growing across the country and hiring Branch Managers, Loan
          Officers, Processors, Underwriters, and Closers who take the work
          seriously. Find your role below.
        </p>

        <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
          {[
            ["48", "States we lend in"],
            ["100%", "Employee-owned"],
            ["400+", "Loan officers"],
          ].map(([big, small]) => (
            <div key={small}>
              <div className="display text-3xl text-ink">{big}</div>
              <div className="mt-1 text-xs text-muted">{small}</div>
            </div>
          ))}
        </div>
      </section>

      {/* perks */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {PERKS.map((p) => (
            <div key={p.t} className="rounded-2xl border border-line bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="display mt-4 text-lg">{p.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* open roles */}
      <section id="roles" className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow text-gold">Open roles</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Find your seat.</h2>
        </div>
        <CareersBoard />
      </section>

      {/* general application CTA */}
      <section id="general" className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest-deep px-7 py-12 text-paper sm:flex-row sm:items-center sm:px-12">
          <div>
            <p className="eyebrow text-gold-soft">Don&apos;t see your role?</p>
            <h2 className="display mt-3 text-2xl sm:text-3xl">
              Send us a general application.
            </h2>
            <p className="mt-2 max-w-md text-paper/60">
              We&apos;re always meeting talented mortgage professionals. Tell us
              what you do best.
            </p>
          </div>
          <a
            href="#apply"
            className="shrink-0 rounded-full bg-gold px-7 py-3.5 text-sm font-semibold text-forest-deep transition-colors hover:bg-gold-soft"
          >
            Apply now
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
