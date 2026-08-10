import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero, PageCTA } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "We Give Back — Premier Mortgage",
  description:
    "Premier Mortgage gives back in every community we lend in — from housing builds to scholarships and disaster relief.",
};

const INITIATIVES = [
  { t: "Housing builds", d: "Volunteer days and sponsorships with local affordable-housing nonprofits." },
  { t: "Food security", d: "Company-matched drives and grants for regional food banks." },
  { t: "Scholarships", d: "Annual awards for first-generation students in our branch communities." },
  { t: "Disaster relief", d: "Rapid-response giving when the communities we lend in are hit hardest." },
  { t: "Financial literacy", d: "Free homebuyer education and first-time buyer workshops." },
  { t: "Employee match", d: "We match what our employee-owners give to the causes they care about." },
];

export default function WeGiveBackPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <PageHero
        eyebrow="We give back"
        title="Building up the communities we lend in."
        intro="Giving back isn't a program at Premier — it's part of how we operate. As we grow our footprint, we invest in every community we build in."
        stats={[["$2M+", "Given to date"], ["40+", "Nonprofit partners"], ["48", "States we serve"]]}
      />

      {/* statement */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="rounded-3xl bg-forest p-8 text-paper sm:p-12">
          <p className="eyebrow text-gold-soft">Why it matters</p>
          <p className="display mt-4 max-w-4xl text-2xl leading-snug sm:text-3xl">
            We only succeed when the communities we lend in do too. So we show up —
            with our time, our checkbooks, and our people — in every market we call home.
          </p>
        </div>
      </section>

      {/* initiatives */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow text-gold">How we help</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Where our people show up.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {INITIATIVES.map((it) => (
            <div key={it.t} className="rounded-2xl border border-line bg-card p-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 21s-7-4.35-9.5-8.5C.5 9 2.5 5.5 6 5.5c2 0 3.2 1 4 2 0.8-1 2-2 4-2 3.5 0 5.5 3.5 3.5 7C19 16.65 12 21 12 21z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="display mt-4 text-xl">{it.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{it.d}</p>
            </div>
          ))}
        </div>
      </section>

      <PageCTA
        title="Partner with us."
        body="Run a nonprofit in a market we serve? We'd love to hear from you."
        ctaLabel="Get in touch"
        ctaHref="#contact"
      />
      <Footer />
    </main>
  );
}
