import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero, PageCTA } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Frontline — Premier Mortgage",
  description:
    "Stories from the Premier Mortgage frontline — the loan officers and teams getting families home.",
};

const FEATURED = {
  tag: "First-time buyers",
  title: "How a 19-day close changed one family's summer",
  excerpt:
    "When the appraisal came back late on a Friday, the whole pod stayed on the file. By Monday, the clear-to-close was done — and the keys were handed over before the school year started.",
  meta: "Austin, TX · Retail",
};

const STORIES = [
  { tag: "Refinance", title: "Dropping a payment by $380 — and explaining every dollar", meta: "Seattle, WA" },
  { tag: "Self-employed", title: "Getting a small-business owner to the closing table", meta: "Denver, CO" },
  { tag: "VA loans", title: "Zero down, and a veteran home for the holidays", meta: "Tampa, FL" },
  { tag: "Jumbo", title: "A complicated file handled without a single hiccup", meta: "Miami, FL" },
  { tag: "New construction", title: "One-time close that saved a builder's timeline", meta: "Boise, ID" },
  { tag: "Down-payment help", title: "Finding assistance a buyer didn't know they qualified for", meta: "Phoenix, AZ" },
];

export default function FrontlinePage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <PageHero
        eyebrow="Frontline"
        title="Stories from the frontline."
        intro="Our business isn't run by robots — it's run by people who care about the family behind every loan. Here's the work, in their words."
      />

      {/* featured */}
      <section className="mx-auto max-w-6xl px-5 py-8 sm:px-8">
        <a href="#" className="group block overflow-hidden rounded-3xl border border-line bg-card transition-shadow hover:shadow-lg">
          <div className="grid md:grid-cols-2">
            <div className="flex aspect-[16/10] items-center justify-center bg-forest md:aspect-auto">
              <span className="display text-5xl text-paper/20">Premier</span>
            </div>
            <div className="flex flex-col justify-center p-8 sm:p-10">
              <span className="eyebrow text-gold">{FEATURED.tag}</span>
              <h2 className="display mt-3 text-3xl">{FEATURED.title}</h2>
              <p className="mt-3 text-muted">{FEATURED.excerpt}</p>
              <div className="mt-5 text-xs text-muted">{FEATURED.meta}</div>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-transform group-hover:gap-2.5">
                Read the story <span aria-hidden>→</span>
              </span>
            </div>
          </div>
        </a>
      </section>

      {/* grid */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {STORIES.map((s) => (
            <a key={s.title} href="#" className="group flex flex-col rounded-2xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-md">
              <span className="eyebrow text-gold">{s.tag}</span>
              <h3 className="display mt-3 flex-1 text-xl leading-snug">{s.title}</h3>
              <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
                <span className="text-xs text-muted">{s.meta}</span>
                <span className="text-sm text-gold transition-transform group-hover:translate-x-1" aria-hidden>→</span>
              </div>
            </a>
          ))}
        </div>
      </section>

      <PageCTA
        title="Want to write the next one?"
        body="Join a team that gets families home — and shares in the win."
        ctaLabel="View open roles"
        ctaHref="/careers"
        dark
      />
      <Footer />
    </main>
  );
}
