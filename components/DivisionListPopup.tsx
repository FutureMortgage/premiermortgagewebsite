"use client";

import { useEffect } from "react";
import type { Division, Node } from "./OrgDivisions";

const rootsOf = (d: Division): Node[] => d.roots ?? (d.root ? [d.root] : []);
const countRoles = (n: Node): number =>
  1 + (n.children?.reduce((s, c) => s + countRoles(c), 0) ?? 0);
const countDivision = (d: Division): number =>
  rootsOf(d).reduce((s, r) => s + countRoles(r), 0);

export function DivisionListPopup({
  name,
  leaders = [],
  divisions,
  onClose,
}: {
  name: string | null;
  leaders?: { name: string; role: string }[];
  divisions: Division[];
  onClose: () => void;
}) {
  const total = leaders.length + divisions.length;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = name ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [name]);

  return (
    <div
      onClick={onClose}
      className={`fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto bg-black/60 p-4 transition-opacity duration-200 sm:p-8 ${
        name ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      {name && (
        <div
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-label={`Divisions reporting to ${name}`}
          className="my-auto w-full max-w-lg rounded-2xl border border-line bg-paper shadow-2xl"
        >
          <div className="flex items-center justify-between border-b border-line px-6 py-5">
            <div>
              <div className="eyebrow text-gold">Reports to {name}</div>
              <h3 className="display mt-1 text-xl">
                {leaders.length > 0
                  ? `${total} direct ${total === 1 ? "report" : "reports"}`
                  : `${divisions.length} ${divisions.length === 1 ? "division" : "divisions"}`}
              </h3>
            </div>
            <button
              onClick={onClose}
              aria-label="Close"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </div>
          <div className="max-h-[70vh] space-y-5 overflow-y-auto p-4">
            {leaders.length > 0 && (
              <div>
                <div className="eyebrow mb-2 px-1 text-muted">Leaders</div>
                <div className="space-y-2">
                  {leaders.map((l) => (
                    <div
                      key={l.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-ink">{l.name}</div>
                        <div className="mt-0.5 truncate text-xs text-muted">{l.role}</div>
                      </div>
                      <span className="eyebrow shrink-0 text-gold">Leader</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {divisions.length > 0 && (
              <div>
                {leaders.length > 0 && (
                  <div className="eyebrow mb-2 px-1 text-muted">Divisions</div>
                )}
                <div className="space-y-2">
                  {divisions.map((d) => (
                    <div
                      key={d.name}
                      className="flex items-center justify-between gap-3 rounded-xl border border-line bg-card px-4 py-3"
                    >
                      <div className="min-w-0">
                        <div className="font-medium text-ink">{d.name}</div>
                        <div className="mt-0.5 truncate text-xs text-muted">
                          {rootsOf(d).map((r) => r.title).join("  ·  ")}
                        </div>
                      </div>
                      <span className="eyebrow shrink-0 text-muted">{countDivision(d)} roles</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
