export function PageHero({
  eyebrow,
  title,
  intro,
  stats,
}: {
  eyebrow: string;
  title: string;
  intro?: string;
  stats?: [string, string][];
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 pb-4 pt-40 sm:px-8 sm:pt-48">
      <p className="eyebrow text-gold">{eyebrow}</p>
      <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">{title}</h1>
      {intro && (
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">{intro}</p>
      )}
      {stats && stats.length > 0 && (
        <div className="mt-10 grid max-w-xl grid-cols-3 gap-6 border-t border-line pt-8">
          {stats.map(([big, small]) => (
            <div key={small}>
              <div className="display text-3xl text-ink">{big}</div>
              <div className="mt-1 text-xs text-muted">{small}</div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export function PageCTA({
  title,
  body,
  ctaLabel,
  ctaHref,
  dark = false,
}: {
  title: string;
  body: string;
  ctaLabel: string;
  ctaHref: string;
  dark?: boolean;
}) {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 sm:px-8">
      <div
        className={`flex flex-col items-start justify-between gap-6 rounded-3xl px-7 py-12 sm:flex-row sm:items-center sm:px-12 ${
          dark ? "bg-forest-deep text-paper" : "border border-line bg-paper-2"
        }`}
      >
        <div>
          <h2 className="display text-2xl sm:text-3xl">{title}</h2>
          <p className={`mt-2 max-w-md ${dark ? "text-paper/60" : "text-muted"}`}>{body}</p>
        </div>
        <a
          href={ctaHref}
          className={`shrink-0 rounded-full px-7 py-3.5 text-sm font-semibold transition-colors ${
            dark
              ? "bg-gold text-forest-deep hover:bg-gold-soft"
              : "bg-forest text-paper hover:bg-forest-2"
          }`}
        >
          {ctaLabel}
        </a>
      </div>
    </section>
  );
}
