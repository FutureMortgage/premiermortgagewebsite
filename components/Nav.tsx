"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";
import { Banner } from "./Banner";

type MegaItem = { label: string; href: string; desc?: string };
type Featured = { eyebrow: string; title: string; body: string; cta: string; href: string };
type NavGroup = { label: string; items: MegaItem[]; featured: Featured };

const slug = (s: string) =>
  "#" + s.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
const item = (label: string, desc: string): MegaItem => ({ label, href: slug(label), desc });

const NAV: NavGroup[] = [
  {
    label: "About us",
    items: [
      item("Our Mission", "What drives Premier and who we serve."),
      { label: "Our People", href: "/leadership", desc: "Meet the team behind your loan." },
      item("Employee Reviews", "What it's like to work here."),
      item("We give back", "Our community and charitable work."),
      item("Frontline", "Stories from our loan officers."),
      item("News & Articles", "Company news and market insight."),
      { label: "Find a Loan Officer", href: "/find-a-loan-officer", desc: "Connect with a local expert." },
    ],
    featured: {
      eyebrow: "Careers",
      title: "Join the Frontline",
      body: "We're growing across 48 states. See where you fit.",
      cta: "View openings",
      href: "#careers",
    },
  },
  {
    label: "Services",
    items: [
      item("Loan Programs", "Purchase, refinance, FHA / VA, jumbo."),
      item("Loan Process", "From application to closing, step by step."),
      item("Make a Payment", "Manage and pay your mortgage online."),
    ],
    featured: {
      eyebrow: "Get started",
      title: "Pre-approved in ~10 minutes",
      body: "A soft check that won't affect your credit score.",
      cta: "Start now",
      href: "#apply",
    },
  },
];

function Chevron({ className = "" }: { className?: string }) {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function FeaturedCard({ f }: { f: Featured }) {
  return (
    <a
      href={f.href}
      className="group/f flex flex-col justify-between rounded-2xl bg-forest p-6 text-paper transition-colors hover:bg-forest-2"
    >
      <div>
        <span className="eyebrow text-gold-soft">{f.eyebrow}</span>
        <h4 className="display mt-3 text-2xl">{f.title}</h4>
        <p className="mt-2 text-sm text-paper/60">{f.body}</p>
      </div>
      <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-soft">
        {f.cta}
        <span className="transition-transform group-hover/f:translate-x-1" aria-hidden>→</span>
      </span>
    </a>
  );
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // lock body scroll when the full-screen mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
    <Banner />
    <header
      className={`fixed inset-x-0 top-9 z-50 transition-all duration-300 ${
        scrolled
          ? "border-b border-line/60 bg-paper/55 shadow-sm backdrop-blur-xl backdrop-saturate-150"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="flex h-16 w-full items-center justify-between px-6 sm:px-10 lg:px-14">
        <div className="flex items-center gap-5 lg:gap-8">
          <a href="/" aria-label="Premier Mortgage home">
            <Logo />
          </a>

          {/* desktop nav — full-width mega menu */}
          <nav className="hidden items-center gap-1 md:flex">
          {NAV.map((g) => {
            const twoCol = g.items.length > 4;
            return (
              <div key={g.label} className="group static">
                <button className="flex items-center gap-1.5 rounded-full px-3 py-2 text-sm text-ink-soft transition-colors hover:text-ink">
                  {g.label}
                  <Chevron className="mt-0.5 transition-transform duration-200 group-hover:rotate-180" />
                </button>

                {/* full-width panel */}
                <div className="invisible absolute inset-x-0 top-full opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  <div className="border-b border-line bg-paper/95 shadow-xl backdrop-blur-xl">
                    <div className="grid gap-8 px-6 py-8 sm:px-10 lg:grid-cols-[1.7fr_1fr] lg:px-14">
                      <div className={`grid gap-1 ${twoCol ? "sm:grid-cols-2" : ""}`}>
                        {g.items.map((it) => (
                          <a
                            key={it.href}
                            href={it.href}
                            className="rounded-xl px-4 py-3 transition-colors hover:bg-paper-2"
                          >
                            <div className="font-medium text-ink">{it.label}</div>
                            {it.desc && (
                              <div className="mt-0.5 text-sm text-muted">{it.desc}</div>
                            )}
                          </a>
                        ))}
                      </div>
                      <FeaturedCard f={g.featured} />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
          </nav>
        </div>

        {/* right utility */}
        <div className="hidden items-center gap-2 md:flex">
          <a
            href="/find-a-loan-officer"
            className="rounded-full border border-line px-4 py-2 text-sm font-medium text-ink-soft transition-colors hover:border-ink/40 hover:text-ink"
          >
            Find a Loan Officer
          </a>
          <a
            href="#make-a-payment"
            className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper shadow-sm transition-all hover:bg-forest-2 hover:shadow-md"
          >
            Make Payment
          </a>
        </div>

        {/* mobile toggle */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="relative z-10 flex h-10 w-10 items-center justify-center rounded-lg border border-line md:hidden"
          aria-label="Toggle menu"
        >
          <div className="space-y-1.5">
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "translate-y-2 rotate-45" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-opacity ${open ? "opacity-0" : ""}`} />
            <span className={`block h-0.5 w-5 bg-ink transition-transform ${open ? "-translate-y-2 -rotate-45" : ""}`} />
          </div>
        </button>
      </div>

      {/* full-screen mobile menu */}
      {open && (
        <div className="fixed inset-x-0 bottom-0 top-25 overflow-y-auto bg-paper px-5 py-6 md:hidden">
          <nav className="flex min-h-full flex-col gap-1">
            {NAV.map((g) => {
              const isOpen = openGroup === g.label;
              return (
                <div key={g.label} className="border-b border-line/70 pb-1">
                  <button
                    onClick={() => setOpenGroup(isOpen ? null : g.label)}
                    className="flex w-full items-center justify-between px-2 py-4 text-left text-lg font-medium text-ink"
                  >
                    {g.label}
                    <Chevron className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && (
                    <div className="pb-3 pl-2">
                      {g.items.map((it) => (
                        <a
                          key={it.href}
                          href={it.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2.5 text-ink-soft hover:bg-paper-2"
                        >
                          {it.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}

            <a
              href="/find-a-loan-officer"
              onClick={() => setOpen(false)}
              className="mt-4 rounded-full border border-line px-5 py-3 text-center text-sm font-medium text-ink"
            >
              Find a Loan Officer
            </a>
            <a
              href="#make-a-payment"
              onClick={() => setOpen(false)}
              className="mt-2 rounded-full bg-forest px-5 py-3 text-center text-sm font-medium text-paper"
            >
              Make Payment
            </a>
          </nav>
        </div>
      )}
    </header>
    </>
  );
}
