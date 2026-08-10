"use client";

import { useState } from "react";
import type { Division } from "./OrgDivisions";
import { DivisionListPopup } from "./DivisionListPopup";

type Person = { name: string; role: string; to: string };

export function OwnershipTier({
  people,
  divisions,
}: {
  people: Person[];
  divisions: Division[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const reportsFor = (name: string) => divisions.filter((d) => d.reportsTo === name);

  return (
    <>
      <div className="mt-4 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
        {people.map((p) => {
          const count = reportsFor(p.name).length;
          return (
            <div
              key={p.name}
              className="rounded-2xl border border-line bg-card px-6 py-5 text-center"
            >
              <div className="display text-lg">{p.name}</div>
              <div className="mt-0.5 text-sm text-muted">{p.role}</div>
              <div className="mt-3 flex flex-wrap items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-muted">
                  <span className="text-gold" aria-hidden>→</span> {p.to}
                </span>
                {count > 0 && (
                  <button
                    onClick={() => setActive(p.name)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-xs font-medium text-ink transition-colors hover:border-ink/40 hover:bg-paper-2"
                  >
                    {count} {count === 1 ? "division" : "divisions"}
                    <span className="text-gold" aria-hidden>→</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <DivisionListPopup
        name={active}
        divisions={active ? reportsFor(active) : []}
        onClose={() => setActive(null)}
      />
    </>
  );
}
