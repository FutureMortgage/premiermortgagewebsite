"use client";

import { useState } from "react";
import type { Division } from "./OrgDivisions";
import { DivisionListPopup } from "./DivisionListPopup";

type Exec = { name: string; role: string; lead: boolean };
type Leader = { name: string; role: string; to: string };

const MODES = ["Current", "Scale"] as const;
type Mode = (typeof MODES)[number];

const PRESIDENT = { name: "President", role: "Enterprise Operator" };

export function ReportingTop({
  mode,
  setMode,
  exec,
  leaders,
  divisions,
  divisionCount,
}: {
  mode: Mode;
  setMode: (m: Mode) => void;
  exec: Exec[];
  leaders: Leader[];
  divisions: Division[];
  divisionCount: number;
}) {
  const [active, setActive] = useState<string | null>(null);
  const scale = mode === "Scale";

  // In Scale, the two operating leaders (COO + President, Origination) AND the
  // CEO's divisions report to the new President; the President reports to the CEO.
  const opTo = scale ? PRESIDENT.name : "Cory Swain";
  const effTo = (d: Division) =>
    scale && d.reportsTo === "Cory Swain" ? PRESIDENT.name : d.reportsTo;

  const divsFor = (name: string) => divisions.filter((d) => effTo(d) === name);

  // People (leaders) reporting to a given person, given the current mode.
  const leadersReportingTo = (name: string): { name: string; role: string }[] => {
    if (scale && name === "Cory Swain") return [PRESIDENT];
    if (scale && name === PRESIDENT.name)
      return leaders.map((l) => ({ name: l.name, role: l.role }));
    if (!scale && name === "Cory Swain")
      return leaders.map((l) => ({ name: l.name, role: l.role }));
    return [];
  };

  const countFor = (name: string) =>
    leadersReportingTo(name).length + divsFor(name).length;

  const popupLeaders = active ? leadersReportingTo(active) : [];
  const popupDivisions = active ? divsFor(active) : [];

  const CountButton = ({ name, dark }: { name: string; dark?: boolean }) => {
    const count = countFor(name);
    if (count <= 0) return null;
    const hasLeaders = leadersReportingTo(name).length > 0;
    const noun = hasLeaders
      ? count === 1 ? "report" : "reports"
      : count === 1 ? "division" : "divisions";
    return (
      <button
        onClick={() => setActive(name)}
        className={`mt-3 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-colors ${
          dark
            ? "bg-white/10 text-paper hover:bg-white/20"
            : "border border-line text-ink hover:border-ink/40 hover:bg-paper-2"
        }`}
      >
        {count} {noun}
        <span className={dark ? "text-gold-soft" : "text-gold"} aria-hidden>→</span>
      </button>
    );
  };

  const Connector = ({ h = 8 }: { h?: number }) => (
    <div className={`mt-2 w-px bg-line ${h === 8 ? "h-8" : "h-10"}`} aria-hidden />
  );

  return (
    <>
      {/* toggle */}
      <div className="flex flex-col items-center gap-2">
        <span className="eyebrow text-muted">Reporting model</span>
        <div className="inline-flex rounded-full border border-line bg-paper-2 p-1">
          {MODES.map((m) => (
            <button
              key={m}
              onClick={() => setMode(m)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                mode === m ? "bg-forest text-paper shadow-sm" : "text-ink-soft hover:text-ink"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>

      {/* hierarchy */}
      <div className="mt-10 flex flex-col items-center">
        <span className="eyebrow text-muted">Executive / Ownership</span>
        <div className="mt-4 flex flex-wrap justify-center gap-4">
          {exec.map((e) => (
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
              {e.name === "Cory Swain" && <CountButton name="Cory Swain" dark={e.lead} />}
            </div>
          ))}
        </div>

        {/* Scale-only President tier */}
        {scale && (
          <>
            <Connector />
            <span className="eyebrow text-muted">Office of the President</span>
            <div className="mt-4 flex flex-col items-center rounded-2xl border border-dashed border-line bg-card px-10 py-6 text-center">
              <div className="display text-xl">{PRESIDENT.name}</div>
              <div className="mt-1 text-sm text-muted">{PRESIDENT.role} · Name TBD</div>
              <div className="mt-3 flex items-center justify-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-muted">
                  <span className="text-gold" aria-hidden>→</span> Cory Swain
                </span>
                <CountButton name={PRESIDENT.name} />
              </div>
            </div>
          </>
        )}

        <Connector />
        <span className="eyebrow text-muted">
          {scale ? "Reports to the President" : "Reports to ownership"}
        </span>
        <div className="mt-4 grid w-full max-w-2xl gap-4 sm:grid-cols-2">
          {leaders.map((l) => {
            const count = divsFor(l.name).length;
            return (
              <div
                key={l.name}
                className="rounded-2xl border border-line bg-card px-6 py-5 text-center"
              >
                <div className="display text-lg">{l.name}</div>
                <div className="mt-0.5 text-sm text-muted">{l.role}</div>
                <div className="mt-3 flex items-center justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-paper-2 px-3 py-1 text-xs font-medium text-muted">
                    <span className="text-gold" aria-hidden>→</span> {opTo}
                  </span>
                  {count > 0 && (
                    <button
                      onClick={() => setActive(l.name)}
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

        <Connector h={10} />
        <span className="rounded-full border border-line bg-paper-2 px-4 py-1.5 text-xs font-medium text-muted">
          {`${divisionCount} divisions report to the CEO, President & COO`}
        </span>
      </div>

      <DivisionListPopup
        name={active}
        leaders={popupLeaders}
        divisions={popupDivisions}
        onClose={() => setActive(null)}
      />
    </>
  );
}
