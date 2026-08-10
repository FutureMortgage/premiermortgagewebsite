import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "News & Articles — Premier Mortgage",
  description:
    "Company news, market insight, and homebuyer guides from Premier Mortgage.",
};

const CATEGORIES = ["All", "Market insight", "Homebuyer guides", "Company news", "Rates"];

const ARTICLES = [
  { cat: "Market insight", title: "Where rates go from here: what buyers should watch", date: "Aug 8, 2026", read: "5 min" },
  { cat: "Homebuyer guides", title: "The 6 documents that get you pre-approved faster", date: "Aug 1, 2026", read: "4 min" },
  { cat: "Company news", title: "Premier expands into three new states", date: "Jul 24, 2026", read: "2 min" },
  { cat: "Rates", title: "Points, credits, and the break-even math that matters", date: "Jul 18, 2026", read: "6 min" },
  { cat: "Homebuyer guides", title: "FHA vs. Conventional: which fits your situation?", date: "Jul 9, 2026", read: "7 min" },
  { cat: "Market insight", title: "Why inventory — not just rates — decides your budget", date: "Jun 30, 2026", read: "5 min" },
  { cat: "Company news", title: "Our teams gave back 4,000 volunteer hours this quarter", date: "Jun 21, 2026", read: "3 min" },
  { cat: "Rates", title: "Should you lock now or float? A simple framework", date: "Jun 12, 2026", read: "4 min" },
];

export default function NewsPage() {
  const [featured, ...rest] = ARTICLES;
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <PageHero
        eyebrow="News & Articles"
        title="News & market insight."
        intro="Straight talk on rates, homebuying, and what's happening at Premier — written to help, not to sell."
      />

      {/* category chips */}
      <section className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex flex-wrap gap-2 border-b border-line pb-6">
          {CATEGORIES.map((c, i) => (
            <span
              key={c}
              className={`rounded-full border px-4 py-2 text-sm font-medium ${
                i === 0
                  ? "border-forest bg-forest text-paper"
                  : "border-line bg-paper text-ink-soft"
              }`}
            >
              {c}
            </span>
          ))}
        </div>
      </section>

      {/* featured */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <a href="#" className="group grid overflow-hidden rounded-3xl border border-line bg-card transition-shadow hover:shadow-lg md:grid-cols-2">
          <div className="flex aspect-[16/10] items-center justify-center bg-paper-2 md:aspect-auto">
            <span className="display text-4xl text-muted/30">Featured</span>
          </div>
          <div className="flex flex-col justify-center p-8 sm:p-10">
            <span className="eyebrow text-gold">{featured.cat}</span>
            <h2 className="display mt-3 text-3xl">{featured.title}</h2>
            <div className="mt-4 text-xs text-muted">{featured.date} · {featured.read} read</div>
            <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-transform group-hover:gap-2.5">
              Read article <span aria-hidden>→</span>
            </span>
          </div>
        </a>
      </section>

      {/* grid */}
      <section className="mx-auto max-w-6xl px-5 pb-10 sm:px-8">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((a) => (
            <a key={a.title} href="#" className="group flex flex-col rounded-2xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:shadow-md">
              <span className="eyebrow text-gold">{a.cat}</span>
              <h3 className="display mt-3 flex-1 text-lg leading-snug">{a.title}</h3>
              <div className="mt-6 border-t border-line pt-4 text-xs text-muted">
                {a.date} · {a.read} read
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* newsletter */}
      <section className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl bg-forest-deep px-7 py-12 text-paper sm:flex-row sm:items-center sm:px-12">
          <div>
            <p className="eyebrow text-gold-soft">Stay in the loop</p>
            <h2 className="display mt-3 text-2xl sm:text-3xl">Rate moves & guides, no spam.</h2>
          </div>
          <form className="flex w-full max-w-md gap-2 sm:w-auto">
            <input
              type="email"
              required
              placeholder="you@email.com"
              className="h-12 w-full rounded-full border border-paper/20 bg-white/5 px-5 text-sm text-paper outline-none placeholder:text-paper/40 focus:border-gold sm:w-64"
            />
            <button type="submit" className="h-12 shrink-0 rounded-full bg-gold px-6 text-sm font-semibold text-forest-deep transition-colors hover:bg-gold-soft">
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <Footer />
    </main>
  );
}
