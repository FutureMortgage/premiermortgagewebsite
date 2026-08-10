import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero, PageCTA } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Loan Programs — Premier Mortgage",
  description:
    "Explore Premier Mortgage loan programs — Conventional, FHA, VA, USDA, Jumbo, refinance, and first-time buyer options.",
};

const PROGRAMS = [
  { tag: "Most popular", title: "Conventional", body: "Flexible terms for buyers with solid credit. As little as 3% down.", points: ["3–20%+ down", "Fixed & ARM", "No PMI at 20% down"] },
  { tag: "Low down payment", title: "FHA", body: "Government-backed loans built for lower down payments and flexible credit.", points: ["As low as 3.5% down", "Flexible credit", "Gift funds allowed"] },
  { tag: "For veterans", title: "VA", body: "For active-duty service members, veterans, and eligible spouses.", points: ["0% down", "No monthly PMI", "Competitive rates"] },
  { tag: "Rural & suburban", title: "USDA", body: "Zero-down financing for eligible homes in qualifying areas.", points: ["0% down", "Income limits apply", "Lower mortgage insurance"] },
  { tag: "High balance", title: "Jumbo", body: "Financing above conforming limits with white-glove handling.", points: ["Up to $3M+", "Flexible reserves", "Dedicated jumbo desk"] },
  { tag: "Lower your rate", title: "Refinance", body: "Rate-and-term or cash-out — we show you the break-even before you commit.", points: ["Rate & term", "Cash-out", "No-cost options"] },
  { tag: "Tap equity", title: "Home equity / HELOC", body: "Access your home's equity for renovations, debt, or big expenses.", points: ["Fixed or line", "Keep your first mortgage", "Fast funding"] },
  { tag: "New to buying", title: "First-time buyer", body: "Down-payment assistance and programs made for your first purchase.", points: ["Assistance programs", "Buyer education", "Low down options"] },
];

export default function LoanProgramsPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <PageHero
        eyebrow="Loan Programs"
        title="A loan for every path home."
        intro="Whether it's your first home or your fifth, we'll match you to the right program and price — then handle the heavy lifting."
      />

      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {PROGRAMS.map((p) => (
            <div key={p.title} className="group flex flex-col rounded-2xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg">
              <span className="eyebrow text-gold">{p.tag}</span>
              <h3 className="display mt-3 text-2xl">{p.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{p.body}</p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {p.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6.5 5 9l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
              <a href="#apply" className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors group-hover:text-gold">
                Get started <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-6 sm:px-8">
        <p className="max-w-3xl text-xs leading-relaxed text-muted">
          Program availability, rates, and terms vary by state, property, and
          borrower eligibility, and are subject to change. All loans subject to
          credit approval, income verification, and property appraisal. This is
          not a commitment to lend.
        </p>
      </section>

      <PageCTA
        title="Not sure which fits?"
        body="A loan officer will match you to the right program in minutes."
        ctaLabel="Talk to a loan officer"
        ctaHref="/find-a-loan-officer"
        dark
      />
      <Footer />
    </main>
  );
}
