"use client";

import { useState } from "react";
import type { Division } from "./OrgDivisions";
import { OrgDivisions } from "./OrgDivisions";
import { ReportingTop } from "./ReportingTop";

type Exec = { name: string; role: string; lead: boolean };
type Leader = { name: string; role: string; to: string };
type Mode = "Current" | "Scale";

const PRESIDENT = "President";

export function OrgChartInteractive({
  exec,
  leaders,
  divisions,
}: {
  exec: Exec[];
  leaders: Leader[];
  divisions: Division[];
}) {
  const [mode, setMode] = useState<Mode>("Current");
  const scale = mode === "Scale";

  // At Scale, the CEO's divisions re-route up through the President.
  const adjDivisions: Division[] = scale
    ? divisions.map((d) =>
        d.reportsTo === "Cory Swain" ? { ...d, reportsTo: PRESIDENT } : d
      )
    : divisions;

  const groups = scale
    ? [
        { name: PRESIDENT, role: "Enterprise Operator" },
        { name: "TBD", role: "Chief Operating Officer" },
        { name: "John Bianchi", role: "President, Origination" },
      ]
    : [
        { name: "Cory Swain", role: "Founder & CEO" },
        { name: "TBD", role: "Chief Operating Officer" },
        { name: "John Bianchi", role: "President, Origination" },
      ];

  return (
    <>
      <section className="mx-auto max-w-6xl px-5 pt-6 sm:px-8">
        <ReportingTop
          mode={mode}
          setMode={setMode}
          exec={exec}
          leaders={leaders}
          divisions={divisions}
          divisionCount={divisions.length}
        />
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <OrgDivisions divisions={adjDivisions} groups={groups} />
      </section>
    </>
  );
}
