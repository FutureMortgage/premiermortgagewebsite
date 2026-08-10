/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Leadership — Premier Mortgage",
  description:
    "Meet the leadership team behind Premier — experienced operators across lending, finance, operations, technology, and people.",
};

type Person = {
  name: string;
  title: string;
  photo?: string;
  comingSoon?: boolean;
};
type Group = { name: string; blurb: string; people: Person[] };

const p = (name: string, title: string, slug: string): Person => ({
  name,
  title,
  photo: `/team/${slug}.png`,
});

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");

const GROUPS: Group[] = [
  {
    name: "Executive Leadership",
    blurb: "Setting strategy and standards across the company.",
    people: [
      p("Cory Swain", "President & CEO", "cory-swain"),
      { name: "Coming soon", title: "Chief Operating Officer", comingSoon: true },
      p("John Bianchi", "Chief Production Officer", "john-bianchi"),
      p("Blake Bianchi", "Chief Innovation Officer", "blake-bianchi"),
      p("Mandi Feely Swain", "EVP, Retail", "mandi-feely-swain"),
    ],
  },
  {
    name: "Finance & Capital Markets",
    blurb: "Stewarding the company's capital and financial health.",
    people: [
      p("James Hagen", "Chief Financial Officer", "james-hagen"),
      p("David Dysert", "Chief Capital Markets Officer", "david-dysert"),
      p("Judi Jenkins", "Controller", "judi-jenkins"),
    ],
  },
  {
    name: "Operations & Compliance",
    blurb: "Keeping every file accurate, compliant, and on schedule.",
    people: [
      p("Amy Packer", "EVP, Underwriting", "amy-packer"),
      p("Crystal Barylski", "Operations Manager", "crystal-barylski"),
      p("Summertyme Shriner", "Director of Branch Support", "summertyme-shriner"),
      p("Tracy Reece", "Chief Compliance Officer", "tracy-reece"),
      p("Kim Scott", "Director of Administration", "kim-scott"),
    ],
  },
  {
    name: "Technology, Marketing & People",
    blurb: "Building the platform, the brand, and the team behind it.",
    people: [
      p("Jeremy Swain", "Chief Information Officer", "jeremy-swain"),
      p("Salvatore Cirrito", "Director of Technology", "salvatore-cirrito"),
      p("Candace Ellington", "Chief Marketing Officer", "candace-ellington"),
      p("Lisa Sampson", "Director of Human Resources", "lisa-sampson"),
    ],
  },
  {
    name: "Production",
    blurb: "Leading the loan officers who serve borrowers every day.",
    people: [
      p("Marty Luckenbach", "VP, Production", "marty-luckenbach"),
      p("Bryce Gonser", "VP, Production", "bryce-gonser"),
      p("Dave Shumard", "Executive Vice President, Production", "dave-shumard"),
      p("Brian Neville", "VP of Production", "brian-neville"),
      p("Corey Cantrell", "VP of Production", "corey-cantrell"),
    ],
  },
];

function PersonCard({ person }: { person: Person }) {
  const { name, title, photo, comingSoon } = person;
  return (
    <div className="group">
      <div
        className={`relative aspect-[4/5] overflow-hidden rounded-2xl ${
          comingSoon
            ? "border-2 border-dashed border-line bg-paper"
            : "border border-line bg-paper-2"
        }`}
      >
        {comingSoon ? (
          <div className="absolute inset-0 flex items-center justify-center text-muted/50">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" aria-hidden>
              <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="1.5" />
              <path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </div>
        ) : photo ? (
          <img
            src={photo}
            alt={name}
            className="h-full w-full object-cover object-top grayscale transition-all duration-500 group-hover:grayscale-0"
            loading="lazy"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="display text-5xl text-muted/30">{initials(name)}</span>
          </div>
        )}
      </div>
      <div className="mt-4">
        <div className="font-medium text-ink">{name}</div>
        <div className="mt-0.5 text-sm text-muted">{title}</div>
      </div>
    </div>
  );
}

export default function LeadershipPage() {
  const count = (people: Person[]) => people.filter((x) => !x.comingSoon).length;
  const total = GROUPS.reduce((n, g) => n + count(g.people), 0);

  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />

      {/* page header */}
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-36 sm:px-8 sm:pt-44">
        <p className="eyebrow text-gold">Leadership</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          The team behind every Premier loan.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Premier is led by experienced operators across lending, finance,
          operations, technology, and people — aligned around one standard:
          treat every borrower&apos;s file like it&apos;s our own.
        </p>

        <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
          {[
            [`${total}`, "Leaders"],
            ["48", "States served"],
            ["$14B+", "Funded to date"],
          ].map(([big, small]) => (
            <div key={small}>
              <div className="display text-3xl text-ink">{big}</div>
              <div className="mt-1 text-xs text-muted">{small}</div>
            </div>
          ))}
        </div>
      </section>

      {/* groups */}
      {GROUPS.map((g) => (
        <section key={g.name} className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-line pb-5">
            <div>
              <h2 className="display text-2xl">{g.name}</h2>
              <p className="mt-1 text-sm text-muted">{g.blurb}</p>
            </div>
            <span className="eyebrow text-muted">
              {String(count(g.people)).padStart(2, "0")} members
            </span>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3 lg:grid-cols-4">
            {g.people.map((person) => (
              <PersonCard key={person.name} person={person} />
            ))}
          </div>
        </section>
      ))}

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-paper-2 px-7 py-10 sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="display text-2xl sm:text-3xl">Want to work with us?</h2>
            <p className="mt-2 text-muted">
              We&apos;re always looking for people who take the work seriously.
            </p>
          </div>
          <a
            href="/careers"
            className="shrink-0 rounded-full bg-forest px-6 py-3.5 text-sm font-medium text-paper transition-colors hover:bg-forest-2"
          >
            View open roles
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
