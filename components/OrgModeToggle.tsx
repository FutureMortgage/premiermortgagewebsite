"use client";

import { useState } from "react";

const MODES = ["Current", "Scale"] as const;
type Mode = (typeof MODES)[number];

export function OrgModeToggle() {
  const [mode, setMode] = useState<Mode>("Current");

  return (
    <div className="flex flex-col items-center gap-2">
      <span className="eyebrow text-muted">Reporting model</span>
      <div className="inline-flex rounded-full border border-line bg-paper-2 p-1">
        {MODES.map((m) => (
          <button
            key={m}
            onClick={() => setMode(m)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition-colors ${
              mode === m
                ? "bg-forest text-paper shadow-sm"
                : "text-ink-soft hover:text-ink"
            }`}
          >
            {m}
          </button>
        ))}
      </div>
    </div>
  );
}
