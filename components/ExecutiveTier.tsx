"use client";

import { useState } from "react";
import type { Division } from "./OrgDivisions";
import { DivisionListPopup } from "./DivisionListPopup";

type Exec = { name: string; role: string; lead: boolean };
type Leader = { name: string; role: string; to: string };

export function ExecutiveTier({
  people,
  leaders = [],
  divisions,
}: {
  people: Exec[];
  leaders?: Leader[];
  divisions: Division[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const divsFor = (name: string) => divisions.filter((d) => d.reportsTo === name);
  const leadersFor = (name: string) => leaders.filter((l) => l.to === name);
  const countFor = (name: string) => leadersFor(name).length + divsFor(name).length;

  return (
    <>
      <div className="mt-4 flex flex-wrap justify-center gap-4">
        {people.map((e) => {
          const count = countFor(e.name);
          const hasLeaders = leadersFor(e.name).length > 0;
          const label = hasLeaders
            ? count === 1 ? "report" : "reports"
            : count === 1 ? "division" : "divisions";
          return (
            <div
              key={e.name}
              className={`flex min-w-[220px] flex-col items-center rounded-2xl px-8 py-6 text-center ${
                e.lead ? "bg-forest text-paper" : "border border-line bg-card"
              }`}
            >
              <div className="display text-xl">{e.name}</div>
              <div className={`mt-1 text-sm ${e.lead ? "text-paper/60" : "text-muted"}`}>
                {e.role}
              </div>
              {count > 0 && (
                <button
                  onClick={() => setActive(e.name)}
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                    e.lead
                      ? "bg-white/10 text-paper hover:bg-white/20"
                      : "border border-line text-ink hover:border-ink/40 hover:bg-paper-2"
                  }`}
                >
                  {count} {label}
                  <span className={e.lead ? "text-gold-soft" : "text-gold"} aria-hidden>→</span>
                </button>
              )}
            </div>
          );
        })}
      </div>

      <DivisionListPopup
        name={active}
        leaders={active ? leadersFor(active) : []}
        divisions={active ? divsFor(active) : []}
        onClose={() => setActive(null)}
      />
    </>
  );
}
