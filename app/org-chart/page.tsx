import type { Metadata } from "next";
import { Fragment } from "react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { OrgDivisions, type Division } from "@/components/OrgDivisions";
import { OwnershipTier } from "@/components/OwnershipTier";
import { ExecutiveTier } from "@/components/ExecutiveTier";

export const metadata: Metadata = {
  title: "Org Chart — Premier Mortgage",
  description:
    "The Premier Mortgage company structure — executive leadership and every division, from Retail and Wholesale to Operations, Capital Markets, and Branch Support.",
};

const EXEC = [
  { name: "Cory Swain", role: "Founder & CEO", lead: true },
  { name: "Mandi Feely", role: "Co-Founder", lead: false },
];

const DIRECT_REPORTS = [
  { name: "TBD", role: "Chief Operating Officer", to: "Cory Swain" },
  { name: "John Bianchi", role: "President, Origination", to: "Cory Swain" },
];

const DIVISIONS: Division[] = [
  {
    name: "Retail",
    reportsTo: "John Bianchi",
    root: {
      title: "President, Retail",
      children: [{ title: "EVP, Divisional Manager / Division President", note: "DBA · $500M+", children: [{ title: "SVP, Regional Manager", children: [{ title: "VP, Branch Manager", children: [{ title: "VP, Origination", note: "5+ years", children: [{ title: "Senior Loan Officer", note: "2+ years", children: [{ title: "Loan Officer", note: "New" }] }] }] }] }] }],
    },
  },
  {
    name: "Wholesale",
    reportsTo: "John Bianchi",
    root: {
      title: "President, Wholesale",
      person: "Blake Bianchi",
      children: [{ title: "EVP, Account Manager", note: "5+ years", children: [{ title: "Senior Account Manager", note: "2+ years", children: [{ title: "Account Executive", note: "New" }] }] }],
    },
  },
  {
    name: "Direct",
    reportsTo: "John Bianchi",
    root: {
      title: "President, Direct Lending",
      children: [{ title: "VP, Origination", note: "5+ years", children: [{ title: "Senior Loan Officer", note: "2+ years", children: [{ title: "Loan Officer", note: "New" }] }] }],
    },
  },
  {
    name: "Operations & Credit",
    reportsTo: "TBD",
    root: {
      title: "Chief Operating Officer",
      person: "TBD",
      children: [
        { title: "EVP, Operations", children: [{ title: "Operations Manager", children: [{ title: "Processing" }, { title: "Closing" }, { title: "Funding" }, { title: "Post-Closing" }] }] },
        { title: "Chief Credit Officer", children: [{ title: "EVP, Underwriting", children: [{ title: "VP / Director, Underwriting" }] }] },
      ],
    },
  },
  {
    name: "Capital Markets",
    reportsTo: "Cory Swain",
    root: {
      title: "Chief Capital Markets Officer",
      children: [{ title: "Chief Investment Officer", children: [{ title: "VP, Capital Markets", children: [{ title: "Secondary Marketing" }, { title: "Lock Desk" }, { title: "Investor Relations" }] }] }],
    },
  },
  {
    name: "Finance",
    reportsTo: "Cory Swain",
    root: {
      title: "Chief Financial Officer",
      children: [{ title: "Controller", children: [{ title: "VP / Director, Finance", children: [{ title: "Accounting" }, { title: "Payroll" }, { title: "Commissions / AP / AR" }] }] }],
    },
  },
  {
    name: "Compliance & Risk",
    reportsTo: "TBD",
    root: {
      title: "Chief Compliance Officer",
      children: [{ title: "VP, Compliance", children: [{ title: "Licensing & Regulatory" }, { title: "Quality Control" }, { title: "Audit" }] }],
    },
  },
  {
    name: "AI & Innovation",
    reportsTo: "Cory Swain",
    root: {
      title: "Chief Innovation Officer",
      person: "Blake Bianchi",
      children: [
        {
          title: "Chief Technology Officer",
          person: "Ben Bengoetxea",
          children: [
            { title: "AI / Automation" },
            { title: "Engineering" },
            { title: "Product" },
          ],
        },
      ],
    },
  },
  {
    name: "IT Technology",
    reportsTo: "Cory Swain",
    root: {
      title: "Chief Information Officer",
      person: "Jeremy Swain",
      children: [
        { title: "IT / Infrastructure / Security" },
        { title: "Director, Infrastructure" },
      ],
    },
  },
  {
    name: "Marketing & Growth",
    reportsTo: "John Bianchi",
    root: {
      title: "Chief Marketing Officer",
      children: [{ title: "VP, Marketing", children: [{ title: "Brand" }, { title: "Digital Marketing" }, { title: "Content / Social" }, { title: "Sales Marketing" }, { title: "Recruiting Marketing" }] }],
    },
  },
  {
    name: "People & Administration",
    reportsTo: "TBD",
    root: {
      title: "Chief People Officer",
      children: [
        { title: "Director of Human Resources", children: [{ title: "Recruiting / Talent" }, { title: "HR / Benefits" }, { title: "Training / Employee Experience" }] },
        { title: "Director of Administration" },
      ],
    },
  },
  {
    name: "Branch Support",
    reportsTo: "John Bianchi",
    root: {
      title: "SVP, Branch Support",
      children: [{ title: "Director of Branch Support", children: [{ title: "Branch Onboarding" }, { title: "Licensing Support" }, { title: "LO Support" }, { title: "Branch Administration" }] }],
    },
  },
  {
    name: "Growth",
    reportsTo: "John Bianchi",
    root: {
      title: "VP, Growth",
      children: [{ title: "Talent Acquisition" }],
    },
  },
];

const TRACKS = [
  { badge: "New", title: "Entry level", desc: "Loan Officer · Account Executive", tone: "bg-gold text-white" },
  { badge: "2+ yrs", title: "Experienced", desc: "Senior LO · Senior Account Mgr", tone: "bg-ink/10 text-ink" },
  { badge: "5+ yrs", title: "Senior", desc: "VP, Origination · EVP", tone: "bg-forest text-paper" },
];

function TrackArrow() {
  return (
    <div className="flex shrink-0 items-center justify-center self-center py-1 text-muted sm:px-3 sm:py-0">
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="rotate-90 sm:rotate-0">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

export default function OrgChartPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />

      {/* hero */}
      <section className="mx-auto max-w-6xl px-5 pb-4 pt-40 text-center sm:px-8 sm:pt-48">
        <p className="eyebrow text-gold">Company structure</p>
        <h1 className="display mx-auto mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          How Premier is organized.
        </h1>
        <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Every division reports into executive leadership — click any division
          to see its full reporting structure.
        </p>
      </section>

      {/* executive / ownership */}
      <section className="mx-auto max-w-6xl px-5 pt-10 sm:px-8">
        <div className="flex flex-col items-center">
          <span className="eyebrow text-muted">Executive / Ownership</span>
          <ExecutiveTier people={EXEC} leaders={DIRECT_REPORTS} divisions={DIVISIONS} />
          <div className="mt-2 h-8 w-px bg-line" aria-hidden />
          <span className="eyebrow text-muted">Reports to ownership</span>
          <OwnershipTier people={DIRECT_REPORTS} divisions={DIVISIONS} />
          <div className="mt-2 h-10 w-px bg-line" aria-hidden />
          <span className="rounded-full border border-line bg-paper-2 px-4 py-1.5 text-xs font-medium text-muted">
            {`${DIVISIONS.length} divisions report to the CEO, President & COO`}
          </span>
        </div>
      </section>

      {/* divisions (clickable) */}
      <section className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
        <OrgDivisions
          divisions={DIVISIONS}
          groups={[
            { name: "Cory Swain", role: "Founder & CEO" },
            { name: "TBD", role: "Chief Operating Officer" },
            { name: "John Bianchi", role: "President, Origination" },
          ]}
        />
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-6 rounded-3xl border border-line bg-paper-2 px-7 py-10 sm:flex-row sm:items-center sm:px-10">
          <div>
            <h2 className="display text-2xl sm:text-3xl">See where you fit.</h2>
            <p className="mt-2 text-muted">
              We&apos;re hiring across every division on this chart.
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

      {/* career tracks */}
      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="rounded-2xl border border-line bg-card p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <span className="eyebrow text-gold">Career tracks</span>
            <span className="text-xs text-muted">Every production ladder promotes from within</span>
          </div>
          <div className="mt-5 flex flex-col sm:flex-row sm:items-center">
            {TRACKS.map((t, i) => (
              <Fragment key={t.badge}>
                <div className="flex flex-1 items-center gap-3 rounded-xl border border-line bg-paper-2 px-4 py-3">
                  <span className={`shrink-0 rounded-md px-2 py-1 text-[11px] font-semibold ${t.tone}`}>
                    {t.badge}
                  </span>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-ink">{t.title}</div>
                    <div className="truncate text-xs text-muted">{t.desc}</div>
                  </div>
                </div>
                {i < TRACKS.length - 1 && <TrackArrow />}
              </Fragment>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
