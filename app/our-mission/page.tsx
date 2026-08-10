import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { PageHero, PageCTA } from "@/components/PageHero";

export const metadata: Metadata = {
  title: "Our Mission — Premier Mortgage",
  description:
    "What drives Premier Mortgage — helping people buy, build, and refinance with a team that treats every file like its own.",
};

const VALUES = [
  { t: "People, not algorithms", d: "Every loan is run by a real person who knows your file and answers the phone." },
  { t: "Radical transparency", d: "Every rate, point, and fee on the table up front — what we quote is what you close on." },
  { t: "Ownership mindset", d: "We're employee-owned, so the person helping you has real skin in the game." },
  { t: "Relentless on speed", d: "We back our closing dates and clear the busywork so you close on time." },
  { t: "Community first", d: "We give back in every market we lend in — it's part of how we operate." },
  { t: "Never settle for average", d: "A passion for getting the details right, on the smallest file and the largest." },
];

export default function OurMissionPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />
      <PageHero
        eyebrow="Our Mission"
        title="Homeownership, done the right way."
        intro="Premier exists to help people buy, build, and refinance with confidence — pairing competitive pricing with a team that treats every borrower's file like it's our own."
        stats={[["$14B+", "Funded to date"], ["48", "States we lend in"], ["100%", "Employee-owned"]]}
      />

      {/* mission statement */}
      <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="rounded-3xl border border-line bg-card p-8 sm:p-12">
          <p className="eyebrow text-gold">The promise</p>
          <p className="display mt-4 max-w-4xl text-2xl leading-snug sm:text-3xl">
            A mortgage is the biggest financial decision most people ever make. We
            think it deserves a lender that answers the phone, tells the truth
            about the numbers, and treats getting you home like the privilege it is.
          </p>
        </div>
      </section>

      {/* values */}
      <section className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <div className="mb-8 max-w-2xl">
          <p className="eyebrow text-gold">What we stand for</p>
          <h2 className="display mt-3 text-3xl sm:text-4xl">Six things we never compromise.</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {VALUES.map((v, i) => (
            <div key={v.t} className="rounded-2xl border border-line bg-card p-6">
              <div className="font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="display mt-3 text-xl">{v.t}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{v.d}</p>
            </div>
          ))}
        </div>
      </section>

      <PageCTA
        title="Ready to get started?"
        body="Get pre-approved in about ten minutes — no credit hit to begin."
        ctaLabel="Get pre-approved"
        ctaHref="#apply"
        dark
      />
      <Footer />
    </main>
  );
}
