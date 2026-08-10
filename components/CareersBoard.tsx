"use client";

import { useMemo, useState } from "react";

const DEPARTMENTS = [
  "Branch Managers",
  "Loan Officers",
  "Processors",
  "Underwriters",
  "Closers",
] as const;

type Job = {
  title: string;
  dept: (typeof DEPARTMENTS)[number];
  location: string;
  type: string;
  blurb: string;
};

const JOBS: Job[] = [
  { title: "Branch Manager", dept: "Branch Managers", location: "Boise, ID", type: "Full-time", blurb: "Build and lead a production team in a growing market." },
  { title: "Branch Manager", dept: "Branch Managers", location: "Austin, TX", type: "Full-time", blurb: "Own a P&L, recruit loan officers, and grow the branch." },
  { title: "Loan Officer", dept: "Loan Officers", location: "Remote · Nationwide", type: "Full-time", blurb: "Originate purchase and refinance loans with full support." },
  { title: "Loan Officer", dept: "Loan Officers", location: "Phoenix, AZ", type: "Full-time", blurb: "Serve local buyers with competitive pricing and fast closings." },
  { title: "Loan Officer", dept: "Loan Officers", location: "Dallas, TX", type: "Full-time", blurb: "Grow your book with marketing and operational support behind you." },
  { title: "Loan Processor", dept: "Processors", location: "Meridian, ID", type: "Full-time", blurb: "Move files from application to clear-to-close with precision." },
  { title: "Senior Loan Processor", dept: "Processors", location: "Remote", type: "Full-time", blurb: "Handle complex files and mentor junior processors." },
  { title: "Mortgage Underwriter", dept: "Underwriters", location: "Remote", type: "Full-time", blurb: "Underwrite conventional and government loans to agency guidelines." },
  { title: "Senior Underwriter", dept: "Underwriters", location: "Denver, CO", type: "Full-time", blurb: "Own the toughest files and help refine our credit policy." },
  { title: "Closing Specialist", dept: "Closers", location: "Meridian, ID", type: "Full-time", blurb: "Prepare docs and coordinate closings that stay on schedule." },
  { title: "Closer", dept: "Closers", location: "Tampa, FL", type: "Full-time", blurb: "Own the final mile — accurate docs, on-time fundings." },
];

const LOCATIONS = ["All locations", ...Array.from(new Set(JOBS.map((j) => j.location)))];

export function CareersBoard() {
  const [dept, setDept] = useState<string>("");
  const [loc, setLoc] = useState<string>("All locations");

  const results = useMemo(
    () =>
      JOBS.filter((j) => {
        if (dept && j.dept !== dept) return false;
        if (loc !== "All locations" && j.location !== loc) return false;
        return true;
      }),
    [dept, loc]
  );

  return (
    <div>
      {/* department pills */}
      <div className="flex flex-wrap gap-2">
        <FilterPill active={dept === ""} onClick={() => setDept("")}>
          All roles
        </FilterPill>
        {DEPARTMENTS.map((d) => (
          <FilterPill key={d} active={dept === d} onClick={() => setDept(d)}>
            {d}
          </FilterPill>
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-muted">
          <span className="font-medium text-ink">{results.length}</span>{" "}
          open {results.length === 1 ? "position" : "positions"}
        </p>
        <label className="relative">
          <span className="sr-only">Location</span>
          <select
            value={loc}
            onChange={(e) => setLoc(e.target.value)}
            className="h-11 appearance-none rounded-xl border border-line bg-paper px-4 pr-10 text-sm text-ink outline-none transition-colors focus:border-ink/50"
          >
            {LOCATIONS.map((l) => (
              <option key={l} value={l}>{l}</option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>
      </div>

      {/* listings */}
      {results.length === 0 ? (
        <div className="mt-6 rounded-2xl border border-dashed border-line bg-paper-2 p-10 text-center">
          <p className="font-medium text-ink">No openings match that filter right now.</p>
          <p className="mt-1 text-sm text-muted">We&apos;re always meeting great people — send us a general application.</p>
          <a href="#general" className="mt-5 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-2">
            General application
          </a>
        </div>
      ) : (
        <div className="mt-6 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-card">
          {results.map((j, i) => (
            <div key={i} className="group flex flex-col gap-4 p-6 transition-colors hover:bg-paper-2 sm:flex-row sm:items-center sm:justify-between">
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="eyebrow text-gold">{j.dept}</span>
                </div>
                <h3 className="display mt-1.5 text-xl">{j.title}</h3>
                <p className="mt-1 text-sm text-muted">{j.blurb}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Chip>{j.location}</Chip>
                  <Chip>{j.type}</Chip>
                </div>
              </div>
              <a
                href="#apply"
                className="shrink-0 rounded-full border border-line px-6 py-2.5 text-center text-sm font-medium text-ink transition-colors group-hover:border-ink/40 hover:bg-forest hover:text-paper"
              >
                Apply
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function FilterPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "border-forest bg-forest text-paper"
          : "border-line bg-paper text-ink-soft hover:border-ink/40 hover:text-ink"
      }`}
    >
      {children}
    </button>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-ink-soft">
      {children}
    </span>
  );
}
