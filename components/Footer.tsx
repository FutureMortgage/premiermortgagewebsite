import { Logo } from "./Logo";

const COLS = [
  {
    title: "Loans",
    links: ["Purchase", "Refinance", "FHA & VA", "Jumbo", "Home equity"],
  },
  {
    title: "Company",
    links: ["About us", "Loan officers", "Careers", "Newsroom", "Contact"],
  },
  {
    title: "Resources",
    links: ["Rate calculator", "First-time buyers", "Loan glossary", "FAQ", "Blog"],
  },
];

export function Footer() {
  return (
    <footer className="bg-forest-deep text-paper">
      <div className="w-full px-6 py-16 sm:px-10 lg:px-14">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
          <div>
            <Logo light />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/55">
              Home financing built around you — competitive rates, a real loan
              officer on every file, and closings that stay on schedule.
            </p>
            <div className="mt-5 flex gap-3">
              {["in", "X", "f"].map((s) => (
                <a
                  key={s}
                  href="#"
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-paper/15 text-sm text-paper/60 transition-colors hover:border-gold hover:text-gold"
                >
                  {s}
                </a>
              ))}
            </div>
          </div>

          {COLS.map((col) => (
            <div key={col.title}>
              <div className="eyebrow text-gold-soft">{col.title}</div>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm text-paper/60 transition-colors hover:text-paper"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-14 border-t border-paper/10 pt-8">
          <p className="text-xs leading-relaxed text-paper/40">
            Premier Mortgage, LLC · NMLS #000000 · Equal Housing Lender. This is
            not a commitment to lend. All loans subject to credit approval,
            income verification, and property appraisal. Rates and terms shown
            are illustrative and for demonstration only. Programs, rates, and
            terms are subject to change without notice.
          </p>
          <div className="mt-6 flex flex-col justify-between gap-3 text-xs text-paper/50 sm:flex-row">
            <span>© {new Date().getFullYear()} Premier Mortgage, LLC. All rights reserved.</span>
            <div className="flex gap-5">
              <a href="#" className="hover:text-paper">Privacy</a>
              <a href="#" className="hover:text-paper">Terms</a>
              <a href="#" className="hover:text-paper">Licensing</a>
              <a href="#" className="hover:text-paper">Accessibility</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
