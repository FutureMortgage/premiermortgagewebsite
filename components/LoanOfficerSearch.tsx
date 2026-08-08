"use client";

import { useMemo, useState } from "react";

const STATES: { abbr: string; name: string }[] = [
  ["AL", "Alabama"], ["AK", "Alaska"], ["AZ", "Arizona"], ["AR", "Arkansas"],
  ["CA", "California"], ["CO", "Colorado"], ["CT", "Connecticut"], ["DE", "Delaware"],
  ["FL", "Florida"], ["GA", "Georgia"], ["HI", "Hawaii"], ["ID", "Idaho"],
  ["IL", "Illinois"], ["IN", "Indiana"], ["IA", "Iowa"], ["KS", "Kansas"],
  ["KY", "Kentucky"], ["LA", "Louisiana"], ["ME", "Maine"], ["MD", "Maryland"],
  ["MA", "Massachusetts"], ["MI", "Michigan"], ["MN", "Minnesota"], ["MS", "Mississippi"],
  ["MO", "Missouri"], ["MT", "Montana"], ["NE", "Nebraska"], ["NV", "Nevada"],
  ["NH", "New Hampshire"], ["NJ", "New Jersey"], ["NM", "New Mexico"], ["NY", "New York"],
  ["NC", "North Carolina"], ["ND", "North Dakota"], ["OH", "Ohio"], ["OK", "Oklahoma"],
  ["OR", "Oregon"], ["PA", "Pennsylvania"], ["RI", "Rhode Island"], ["SC", "South Carolina"],
  ["SD", "South Dakota"], ["TN", "Tennessee"], ["TX", "Texas"], ["UT", "Utah"],
  ["VT", "Vermont"], ["VA", "Virginia"], ["WA", "Washington"], ["WV", "West Virginia"],
  ["WI", "Wisconsin"], ["WY", "Wyoming"],
].map(([abbr, name]) => ({ abbr, name }));

type Officer = {
  name: string;
  title: string;
  nmls: string;
  city: string;
  state: string; // abbr
  phone: string;
};

// Sample directory — ready to be populated from the live loan-officer roster.
const OFFICERS: Officer[] = [
  { name: "Ryan Mitchell", title: "Sr. Loan Officer", nmls: "1985422", city: "Boise", state: "ID", phone: "(208) 555-0142" },
  { name: "Hailey Brooks", title: "Loan Officer", nmls: "2043118", city: "Meridian", state: "ID", phone: "(208) 555-0119" },
  { name: "Diego Ramirez", title: "Branch Manager", nmls: "1774903", city: "Austin", state: "TX", phone: "(512) 555-0188" },
  { name: "Whitney Cole", title: "Sr. Loan Officer", nmls: "1902244", city: "Dallas", state: "TX", phone: "(214) 555-0173" },
  { name: "Aaron Fields", title: "Loan Officer", nmls: "2110567", city: "San Diego", state: "CA", phone: "(619) 555-0126" },
  { name: "Priya Anand", title: "Sr. Loan Officer", nmls: "1668210", city: "Sacramento", state: "CA", phone: "(916) 555-0155" },
  { name: "Marcus Bell", title: "Branch Manager", nmls: "1590338", city: "Tampa", state: "FL", phone: "(813) 555-0164" },
  { name: "Sofia Nguyen", title: "Loan Officer", nmls: "2201884", city: "Orlando", state: "FL", phone: "(407) 555-0131" },
  { name: "Grant Halverson", title: "Sr. Loan Officer", nmls: "1843990", city: "Seattle", state: "WA", phone: "(206) 555-0148" },
  { name: "Emily Sorenson", title: "Loan Officer", nmls: "2098771", city: "Spokane", state: "WA", phone: "(509) 555-0117" },
  { name: "Tyler Boone", title: "Sr. Loan Officer", nmls: "1729655", city: "Phoenix", state: "AZ", phone: "(602) 555-0193" },
  { name: "Rachel Kim", title: "Loan Officer", nmls: "2155402", city: "Denver", state: "CO", phone: "(720) 555-0109" },
  { name: "Owen Pratt", title: "Branch Manager", nmls: "1655120", city: "Portland", state: "OR", phone: "(503) 555-0177" },
  { name: "Bianca Rossi", title: "Sr. Loan Officer", nmls: "1988301", city: "Salt Lake City", state: "UT", phone: "(801) 555-0152" },
  { name: "Cody Whitaker", title: "Loan Officer", nmls: "2233019", city: "Las Vegas", state: "NV", phone: "(702) 555-0138" },
  { name: "Nadia Farris", title: "Sr. Loan Officer", nmls: "1801447", city: "Atlanta", state: "GA", phone: "(404) 555-0166" },
  { name: "Jared Malone", title: "Loan Officer", nmls: "2071559", city: "Charlotte", state: "NC", phone: "(704) 555-0124" },
  { name: "Leah Cross", title: "Branch Manager", nmls: "1712088", city: "Nashville", state: "TN", phone: "(615) 555-0181" },
];

const initials = (name: string) =>
  name.split(" ").map((w) => w[0]).slice(0, 2).join("");

const stateName = (abbr: string) => STATES.find((s) => s.abbr === abbr)?.name ?? abbr;

export function LoanOfficerSearch() {
  const [state, setState] = useState("");
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    return OFFICERS.filter((o) => {
      if (state && o.state !== state) return false;
      if (query && !`${o.name} ${o.city}`.toLowerCase().includes(query)) return false;
      return true;
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [state, q]);

  const activeStates = new Set(OFFICERS.map((o) => o.state));

  return (
    <div>
      {/* controls */}
      <div className="grid gap-3 rounded-2xl border border-line bg-card p-4 sm:grid-cols-[1fr_1.4fr_auto] sm:p-5">
        <label className="relative">
          <span className="sr-only">State</span>
          <select
            value={state}
            onChange={(e) => setState(e.target.value)}
            className="h-12 w-full appearance-none rounded-xl border border-line bg-paper px-4 pr-10 text-sm text-ink outline-none transition-colors focus:border-ink/50"
          >
            <option value="">All states</option>
            {STATES.map((s) => (
              <option key={s.abbr} value={s.abbr}>
                {s.name}
                {activeStates.has(s.abbr) ? "" : " — coming soon"}
              </option>
            ))}
          </select>
          <svg className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2" width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </label>

        <label className="relative">
          <span className="sr-only">Search by name or city</span>
          <svg className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted" width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="m20 20-3-3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search by name or city"
            className="h-12 w-full rounded-xl border border-line bg-paper pl-11 pr-4 text-sm text-ink outline-none transition-colors placeholder:text-muted focus:border-ink/50"
          />
        </label>

        <button
          onClick={() => { setState(""); setQ(""); }}
          className="h-12 rounded-xl border border-line px-5 text-sm font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
        >
          Reset
        </button>
      </div>

      {/* count */}
      <div className="mt-6 flex items-baseline justify-between">
        <p className="text-sm text-muted">
          <span className="font-medium text-ink">{results.length}</span>{" "}
          {results.length === 1 ? "loan officer" : "loan officers"}
          {state ? ` in ${stateName(state)}` : " nationwide"}
        </p>
      </div>

      {/* results */}
      {results.length === 0 ? (
        <div className="mt-4 rounded-2xl border border-dashed border-line bg-paper-2 p-10 text-center">
          <p className="font-medium text-ink">No loan officers listed{state ? ` in ${stateName(state)}` : ""} yet.</p>
          <p className="mt-1 text-sm text-muted">We&apos;re licensed and expanding — call us and we&apos;ll connect you.</p>
          <a href="tel:18005550100" className="mt-5 inline-block rounded-full bg-forest px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-forest-2">
            (800) 555-0100
          </a>
        </div>
      ) : (
        <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((o) => (
            <div key={o.nmls} className="flex flex-col rounded-2xl border border-line bg-card p-6 transition-shadow hover:shadow-md">
              <div className="flex items-center gap-4">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-paper-2 text-muted">
                  <span className="display text-lg">{initials(o.name)}</span>
                </div>
                <div>
                  <div className="font-medium text-ink">{o.name}</div>
                  <div className="text-sm text-muted">{o.title}</div>
                </div>
              </div>

              <div className="mt-5 space-y-1.5 border-t border-line pt-4 text-sm">
                <div className="flex items-center gap-2 text-ink-soft">
                  <span className="text-muted">Location</span>
                  <span className="ml-auto font-medium text-ink">{o.city}, {o.state}</span>
                </div>
                <div className="flex items-center gap-2 text-ink-soft">
                  <span className="text-muted">NMLS</span>
                  <span className="ml-auto font-mono text-ink">#{o.nmls}</span>
                </div>
              </div>

              <div className="mt-5 flex gap-2">
                <a href={`tel:${o.phone.replace(/[^\d]/g, "")}`} className="flex-1 rounded-full border border-line px-4 py-2.5 text-center text-sm font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink">
                  {o.phone}
                </a>
                <a href="#apply" className="rounded-full bg-forest px-4 py-2.5 text-center text-sm font-medium text-paper transition-colors hover:bg-forest-2">
                  Apply
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
