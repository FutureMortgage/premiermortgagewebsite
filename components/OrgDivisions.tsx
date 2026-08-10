"use client";

import { useEffect, useState } from "react";

export type Node = { title: string; note?: string; person?: string; children?: Node[] };
export type Division = { name: string; root?: Node; roots?: Node[]; reportsTo?: string };
type Group = { name: string; role: string };

const rootsOf = (d: Division): Node[] => d.roots ?? (d.root ? [d.root] : []);

const countRoles = (n: Node): number =>
  1 + (n.children?.reduce((s, c) => s + countRoles(c), 0) ?? 0);

const countDivision = (d: Division): number =>
  rootsOf(d).reduce((s, r) => s + countRoles(r), 0);

const flatten = (n: Node): string[] => [
  n.title,
  ...(n.children?.flatMap(flatten) ?? []),
];

function NoteChip({ note, onDark = false }: { note: string; onDark?: boolean }) {
  const isNew = /new/i.test(note);
  const cls = isNew
    ? "bg-gold/15 text-gold"
    : onDark
    ? "bg-white/15 text-paper/80"
    : "bg-paper-2 text-muted";
  return (
    <span className={`whitespace-nowrap rounded-full px-2 py-0.5 text-[11px] font-medium ${cls}`}>
      {note}
    </span>
  );
}

function OrgNode({ node, root = false }: { node: Node; root?: boolean }) {
  return (
    <li>
      <div
        className={`inline-flex flex-col items-start gap-0.5 rounded-lg border px-3 py-2 text-sm leading-tight ${
          root ? "border-forest bg-forest font-medium text-paper" : "border-line bg-card text-ink"
        }`}
      >
        <div className="flex items-center gap-2">
          <span>{node.title}</span>
          {node.note && <NoteChip note={node.note} onDark={root} />}
        </div>
        {node.person && (
          <span className={`text-xs font-normal ${root ? "text-paper/60" : "text-muted"}`}>
            {node.person}
          </span>
        )}
      </div>
      {node.children?.length ? (
        <ul className="ml-3 mt-2.5 space-y-2.5 border-l border-line pl-5">
          {node.children.map((c, i) => (
            <OrgNode key={i} node={c} />
          ))}
        </ul>
      ) : null}
    </li>
  );
}

export function OrgDivisions({
  divisions,
  groups,
}: {
  divisions: Division[];
  groups?: Group[];
}) {
  const [active, setActive] = useState<number | null>(null);
  const selected = active === null ? null : divisions[active];

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  const card = (d: Division, idx: number, num: number, showReportsTo: boolean) => {
    const roots = rootsOf(d);
    const path = roots.flatMap((r) => flatten(r).slice(1));
    return (
      <button
        key={d.name}
        onClick={() => setActive(idx)}
        className="group flex flex-col rounded-2xl border border-line bg-card p-6 text-left transition-all hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-md"
      >
        <div className="flex w-full items-center justify-between">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs text-gold">
              {String(num).padStart(2, "0")}
            </span>
            <h2 className="display text-lg">{d.name}</h2>
          </div>
          <span className="eyebrow text-muted">{countDivision(d)} roles</span>
        </div>

        {showReportsTo && d.reportsTo && (
          <div className="mt-3 inline-flex w-fit items-center gap-1.5 rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-medium text-muted">
            <span className="text-gold" aria-hidden>↑</span> Reports to {d.reportsTo}
          </div>
        )}

        <div className="mt-4 flex flex-wrap gap-2">
          {roots.map((r, i) => (
            <span
              key={i}
              className="inline-flex items-center rounded-lg bg-forest px-3 py-2 text-sm font-medium text-paper"
            >
              {r.title}
            </span>
          ))}
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {path.join("  ·  ")}
        </p>

        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-gold transition-transform group-hover:gap-2.5">
          View structure <span aria-hidden>→</span>
        </span>
      </button>
    );
  };

  const grid = (children: React.ReactNode) => (
    <div className="grid items-start gap-5 md:grid-cols-2 xl:grid-cols-3">{children}</div>
  );

  return (
    <>
      {groups && groups.length ? (
        <div className="space-y-14">
          {(() => {
            const assigned = new Set<Division>();
            const blocks = groups
              .map((g) => {
                const gDivs = divisions.filter((d) => d.reportsTo === g.name);
                gDivs.forEach((d) => assigned.add(d));
                return { g, gDivs };
              })
              .filter((b) => b.gDivs.length > 0);
            const leftover = divisions.filter((d) => !assigned.has(d));
            return (
              <>
                {blocks.map(({ g, gDivs }) => (
                  <div key={g.name}>
                    <div className="mb-6 flex flex-wrap items-baseline gap-x-3 gap-y-1 border-b border-line pb-3">
                      <h3 className="display text-xl">Reports to {g.name}</h3>
                      <span className="text-sm text-muted">{g.role}</span>
                      <span className="eyebrow ml-auto text-muted">
                        {gDivs.length} {gDivs.length === 1 ? "division" : "divisions"}
                      </span>
                    </div>
                    {grid(
                      gDivs.map((d, i) => card(d, divisions.indexOf(d), i + 1, false))
                    )}
                  </div>
                ))}
                {leftover.length > 0 && (
                  <div>
                    <div className="mb-6 border-b border-line pb-3">
                      <h3 className="display text-xl">Other divisions</h3>
                    </div>
                    {grid(leftover.map((d, i) => card(d, divisions.indexOf(d), i + 1, true)))}
                  </div>
                )}
              </>
            );
          })()}
        </div>
      ) : (
        grid(divisions.map((d, idx) => card(d, idx, idx + 1, true)))
      )}

      {/* modal */}
      <div
        onClick={() => setActive(null)}
        className={`fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 transition-opacity duration-200 sm:p-8 ${
          selected ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {selected && (
          <div
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.name} structure`}
            className="my-auto w-full max-w-2xl rounded-2xl border border-line bg-paper shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <div className="flex flex-wrap items-center gap-3">
                <h3 className="display text-2xl">{selected.name}</h3>
                <span className="eyebrow text-muted">{countDivision(selected)} roles</span>
                {selected.reportsTo && (
                  <span className="hidden items-center gap-1 rounded-full bg-paper-2 px-2.5 py-1 text-[11px] font-medium text-muted sm:inline-flex">
                    <span className="text-gold" aria-hidden>↑</span> Reports to {selected.reportsTo}
                  </span>
                )}
              </div>
              <button
                onClick={() => setActive(null)}
                aria-label="Close"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="max-h-[70vh] overflow-y-auto px-6 py-6">
              <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-10">
                {rootsOf(selected).map((r, i) => (
                  <ul key={i} className="space-y-2.5">
                    <OrgNode node={r} root />
                  </ul>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
