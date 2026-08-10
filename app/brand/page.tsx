import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";

export const metadata: Metadata = {
  title: "Brand — Premier Mortgage",
  description:
    "The Premier Mortgage brand system — logo, colors, typography, and UI components.",
};

type Swatch = { name: string; hex: string; token: string; onDark?: boolean };

const NEUTRALS: Swatch[] = [
  { name: "Ink", hex: "#0A0A0A", token: "--ink", onDark: true },
  { name: "Ink Soft", hex: "#3F3F46", token: "--ink-soft", onDark: true },
  { name: "Muted", hex: "#71717A", token: "--muted", onDark: true },
  { name: "Line", hex: "#E4E4E7", token: "--line" },
  { name: "Paper 2", hex: "#F4F4F5", token: "--paper-2" },
  { name: "Paper", hex: "#FFFFFF", token: "--paper" },
];

const DARK: Swatch[] = [
  { name: "Forest", hex: "#111113", token: "--forest", onDark: true },
  { name: "Forest Deep", hex: "#000000", token: "--forest-deep", onDark: true },
];

const ACCENT: Swatch[] = [
  { name: "Orange", hex: "#EA580C", token: "--gold", onDark: true },
  { name: "Orange Soft", hex: "#FB923C", token: "--gold-soft", onDark: true },
];

function SwatchCard({ s }: { s: Swatch }) {
  return (
    <div className="overflow-hidden rounded-xl border border-line bg-card">
      <div
        className="flex h-24 items-end p-3"
        style={{ backgroundColor: s.hex }}
      >
        <span className={`font-mono text-[11px] ${s.onDark ? "text-white/70" : "text-ink/50"}`}>
          {s.hex}
        </span>
      </div>
      <div className="px-3 py-2.5">
        <div className="text-sm font-medium text-ink">{s.name}</div>
        <div className="font-mono text-[11px] text-muted">{s.token}</div>
      </div>
    </div>
  );
}

function Section({
  n,
  title,
  children,
}: {
  n: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
      <div className="mb-8 flex items-center gap-3 border-b border-line pb-4">
        <span className="font-mono text-xs text-gold">{n}</span>
        <h2 className="display text-2xl sm:text-3xl">{title}</h2>
      </div>
      {children}
    </section>
  );
}

export default function BrandPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />

      {/* hero */}
      <section className="mx-auto max-w-6xl px-5 pb-2 pt-40 sm:px-8 sm:pt-48">
        <p className="eyebrow text-gold">Brand</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          The Premier brand system.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Our look is confident and quiet: a monochrome black-and-white base, one
          decisive orange accent, and clean typography. Use these building blocks
          consistently everywhere Premier shows up.
        </p>
      </section>

      {/* logo */}
      <Section n="01" title="Logo">
        <div className="grid gap-5 md:grid-cols-2">
          <div className="flex h-52 items-center justify-center rounded-2xl border border-line bg-paper">
            <div className="scale-150">
              <Logo />
            </div>
          </div>
          <div className="flex h-52 items-center justify-center rounded-2xl bg-forest-deep">
            <div className="scale-150">
              <Logo light />
            </div>
          </div>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          {[
            ["Clear space", "Keep padding equal to the height of the mark on all sides."],
            ["Minimum size", "Never render the wordmark below 20px tall."],
            ["Don't", "No recoloring, stretching, drop shadows, or gradients."],
          ].map(([t, d]) => (
            <div key={t} className="rounded-xl border border-line bg-card p-5">
              <div className="eyebrow text-gold">{t}</div>
              <p className="mt-2 text-sm text-muted">{d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* colors */}
      <Section n="02" title="Colors">
        <div className="space-y-8">
          <div>
            <div className="eyebrow mb-3 text-muted">Neutrals</div>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
              {NEUTRALS.map((s) => <SwatchCard key={s.token} s={s} />)}
            </div>
          </div>
          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <div className="eyebrow mb-3 text-muted">Dark surfaces</div>
              <div className="grid grid-cols-2 gap-4">
                {DARK.map((s) => <SwatchCard key={s.token} s={s} />)}
              </div>
            </div>
            <div>
              <div className="eyebrow mb-3 text-gold">Accent — Orange</div>
              <div className="grid grid-cols-2 gap-4">
                {ACCENT.map((s) => <SwatchCard key={s.token} s={s} />)}
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* typography */}
      <Section n="03" title="Typography">
        <div className="space-y-4">
          {[
            { face: "Schibsted Grotesk", role: "Display", cls: "font-display", sample: "The mortgage that gets you home.", note: "Headlines & section titles · .display", size: "text-4xl", weight: "font-semibold" },
            { face: "Geist", role: "Body", cls: "font-sans", sample: "Competitive rates, a dedicated loan officer on every file, and closings that stay on schedule.", note: "Paragraphs, UI, buttons", size: "text-xl", weight: "font-normal" },
            { face: "Departure Mono", role: "Mono", cls: "font-mono", sample: "PROTECTING WHAT MATTERS · FINANCING WHAT'S NEXT", note: "Eyebrow labels & tags · .eyebrow", size: "text-base", weight: "font-normal" },
          ].map((t) => (
            <div key={t.role} className="grid gap-4 rounded-2xl border border-line bg-card p-6 sm:grid-cols-[200px_1fr] sm:items-center">
              <div>
                <div className="eyebrow text-gold">{t.role}</div>
                <div className="mt-1 text-sm font-medium text-ink">{t.face}</div>
                <div className="mt-1 text-xs text-muted">{t.note}</div>
              </div>
              <div className={`${t.cls} ${t.size} ${t.weight} text-ink`}>{t.sample}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* components */}
      <Section n="04" title="Components">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="eyebrow mb-4 text-muted">Buttons</div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="rounded-full bg-forest px-5 py-2.5 text-sm font-medium text-paper">Primary</span>
              <span className="rounded-full border border-line px-5 py-2.5 text-sm font-medium text-ink">Secondary</span>
              <span className="rounded-full bg-gold px-5 py-2.5 text-sm font-semibold text-white">Accent</span>
            </div>
          </div>
          <div className="rounded-2xl border border-line bg-card p-6">
            <div className="eyebrow mb-4 text-muted">Tags & labels</div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="eyebrow rounded-full border border-orange-500 px-3 py-1.5 text-ink">Eyebrow pill</span>
              <span className="rounded-full bg-gold/15 px-2.5 py-1 text-xs font-medium text-gold">New</span>
              <span className="rounded-full bg-paper-2 px-2.5 py-1 text-xs font-medium text-muted">Neutral</span>
            </div>
          </div>
        </div>
      </Section>

      <Footer />
    </main>
  );
}
