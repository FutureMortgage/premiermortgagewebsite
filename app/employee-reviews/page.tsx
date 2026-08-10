import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero, PageCTA } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Employee Reviews — Premier Mortgage",
  description:
    "What it's like to work at Premier Mortgage — an employee-owned lender built around people, growth, and doing the work right.",
};

const REVIEWS = [
  { q: "Being employee-owned isn't a slogan here — you feel it in every decision. I've grown from processor to underwriter in three years.", n: "Underwriting", r: "4 years at Premier" },
  { q: "Leadership actually answers when you reach out. The tech stack clears the busywork so I can focus on borrowers.", n: "Loan Officer", r: "2 years at Premier" },
  { q: "Best culture I've been part of in 15 years of mortgage. People genuinely help each other close.", n: "Branch Manager", r: "6 years at Premier" },
  { q: "The training is real. They invest in you before they ask anything of you.", n: "Processing", r: "1 year at Premier" },
  { q: "Fast, flat, and honest. Decisions don't get stuck in five layers of approval.", n: "Operations", r: "3 years at Premier" },
  { q: "I came for the pricing and stayed for the people. Everyone's rowing the same direction.", n: "Account Executive", r: "2 years at Premier" },
];

function Stars() {
  return (
    <div className="flex text-gold">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export default function EmployeeReviewsPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <PageHero
        eyebrow="Employee Reviews"
        title="What it's like to work here."
        intro="We're an employee-owned lender built around people, growth, and doing the work right. Here's what the team says — in their own words."
        stats={[["4.8/5", "Avg. team rating"], ["100%", "Employee-owned"], ["9 / 10", "Would refer a friend"]]}
      />

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {REVIEWS.map((rv, i) => (
            <figure key={i} className="flex flex-col rounded-2xl border border-line bg-card p-7">
              <Stars />
              <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                &ldquo;{rv.q}&rdquo;
              </blockquote>
              <figcaption className="mt-6 border-t border-line pt-4">
                <div className="font-medium text-ink">{rv.n}</div>
                <div className="mt-0.5 text-xs text-muted">{rv.r}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      <PageCTA
        title="Want to be part of it?"
        body="We're hiring across every division — see where you fit."
        ctaLabel="View open roles"
        ctaHref="/careers"
      />
      <Footer />
    </main>
  );
}
