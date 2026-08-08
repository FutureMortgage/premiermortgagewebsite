import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Estimator } from "@/components/Estimator";
import { VideoWall } from "@/components/VideoWall";

/* ---------------- data ---------------- */

const LOANS = [
  {
    tag: "Purchase",
    title: "Buying a home",
    body: "Conventional, FHA, VA, and USDA — matched to your goals with a rate you can feel good about.",
    points: ["As little as 3% down", "First-time buyer programs", "Pre-approval in 24 hrs"],
  },
  {
    tag: "Refinance",
    title: "Refinancing",
    body: "Lower your rate, shorten your term, or tap equity. We'll show you the break-even before you commit.",
    points: ["Rate & term refinance", "Cash-out options", "No-cost refi available"],
  },
  {
    tag: "Jumbo",
    title: "Luxury & jumbo",
    body: "Financing above conforming limits with competitive pricing and white-glove handling on every file.",
    points: ["Up to $3M+", "Flexible reserves", "Dedicated jumbo desk"],
  },
];

const STEPS = [
  { n: "01", t: "Get pre-approved", d: "Answer a few questions and upload documents securely. A real loan officer reviews your file — not a black box." },
  { n: "02", t: "Shop with confidence", d: "Walk into every offer with a verified pre-approval letter that sellers and agents take seriously." },
  { n: "03", t: "Lock your rate", d: "When you're ready, we lock your rate and lay out every number in plain English. No surprises at closing." },
  { n: "04", t: "Close on schedule", d: "Our team keeps underwriting, appraisal, and title moving so you close on time — the day you were promised." },
];

const REVIEWS = [
  { q: "We closed in 19 days on our first home. Our loan officer answered texts on a Sunday. Unreal service.", n: "Marcus & Dana R.", r: "First-time buyers · Austin, TX" },
  { q: "Refinanced and dropped our payment by $380/month. They walked us through the break-even before we signed a thing.", n: "Priya S.", r: "Refinance · Seattle, WA" },
  { q: "The jumbo desk handled a complicated self-employed file without a single hiccup. I've already referred three friends.", n: "James T.", r: "Jumbo purchase · Miami, FL" },
];

/* ---------------- page ---------------- */

export default function Home() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />

      {/* ============ HERO ============ */}
      <section className="relative overflow-hidden bg-paper text-ink">
        {/* centered heading */}
        <div className="relative mx-auto max-w-4xl px-5 pb-12 pt-32 text-center sm:px-8 sm:pt-40">
          <div className="reveal flex justify-center">
            <span className="eyebrow rounded-full border border-orange-500 px-4 py-2 text-ink">
              Protecting what matters · financing what&apos;s next
            </span>
          </div>
          <h1 className="display reveal mx-auto mt-6 text-5xl text-ink sm:text-6xl md:text-7xl">
            The mortgage that
            <br />
            gets you home.
          </h1>
          <p className="reveal mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-soft">
            Competitive rates, a dedicated loan officer on every file, and
            closings that actually stay on schedule. Buying, building, or
            refinancing — Premier makes it simple.
          </p>

          <div className="reveal mt-9 flex flex-wrap items-center justify-center gap-3">
            <a
              href="#apply"
              className="rounded-full bg-ink px-6 py-3.5 text-sm font-semibold text-paper transition-colors hover:bg-forest-2"
            >
              Get pre-approved
            </a>
            <a
              href="#estimate"
              className="rounded-full border border-line px-6 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink/50"
            >
              Estimate my payment
            </a>
          </div>
        </div>

        {/* video wall */}
        <div className="reveal relative mx-auto max-w-6xl px-5 sm:px-8">
          <VideoWall />
        </div>

        {/* trust bar */}
        <div className="relative mx-auto max-w-4xl px-5 pb-20 pt-14 sm:px-8">
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 border-t border-line pt-8 text-center sm:grid-cols-4">
            {[
              ["4.9/5", "12,000+ reviews"],
              ["18 days", "avg. to close"],
              ["$14B+", "funded to date"],
              ["48 states", "we lend in"],
            ].map(([big, small]) => (
              <div key={small}>
                <div className="display text-3xl text-ink">{big}</div>
                <div className="mt-1 text-xs text-muted">{small}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ LOANS ============ */}
      <section id="loans" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">What we do</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">
            One team, every kind of loan.
          </h2>
          <p className="mt-4 text-lg text-muted">
            Whether it's your first home or your fifth, we'll match you to the
            right program and price — then handle the heavy lifting.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {LOANS.map((l) => (
            <div
              key={l.title}
              className="group flex flex-col rounded-2xl border border-line bg-card p-7 transition-all hover:-translate-y-1 hover:border-forest/30 hover:shadow-lg"
            >
              <span className="eyebrow text-gold">{l.tag}</span>
              <h3 className="display mt-3 text-2xl">{l.title}</h3>
              <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">
                {l.body}
              </p>
              <ul className="mt-6 space-y-2.5 border-t border-line pt-5">
                {l.points.map((p) => (
                  <li key={p} className="flex items-center gap-2.5 text-sm text-ink-soft">
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-forest/10 text-forest">
                      <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                        <path d="M2.5 6.5 5 9l4.5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </span>
                    {p}
                  </li>
                ))}
              </ul>
              <a
                href="#apply"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors group-hover:text-gold"
              >
                Explore {l.tag.toLowerCase()} <span aria-hidden>→</span>
              </a>
            </div>
          ))}
        </div>
      </section>

      {/* ============ ESTIMATOR ============ */}
      <section id="estimate" className="bg-paper-2 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="grid items-start gap-12 lg:grid-cols-[0.9fr_1.4fr]">
            <div className="lg:sticky lg:top-28">
              <p className="eyebrow text-gold">Payment estimator</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">
                See your number in seconds.
              </h2>
              <p className="mt-4 text-lg text-muted">
                Slide to your price and down payment for a real-time estimate.
                When you're ready for exact numbers, your loan officer takes it
                from here — no credit pull required to start.
              </p>
              <div className="mt-8 flex items-center gap-3 rounded-2xl border border-line bg-card p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-forest text-paper">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 3v18M6 8h9a3 3 0 0 1 0 6H9a3 3 0 0 0 0 6h9" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <p className="text-sm text-ink-soft">
                  <span className="font-semibold text-ink">No hidden fees.</span>{" "}
                  Every cost is on the table before you lock.
                </p>
              </div>
            </div>

            <Estimator />
          </div>
        </div>
      </section>

      {/* ============ PROCESS ============ */}
      <section id="process" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="max-w-2xl">
          <p className="eyebrow text-gold">How it works</p>
          <h2 className="display mt-3 text-4xl sm:text-5xl">
            Four steps to your keys.
          </h2>
        </div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s) => (
            <div key={s.n} className="relative rounded-2xl border border-line bg-card p-7">
              <div className="font-mono text-sm text-gold">{s.n}</div>
              <h3 className="display mt-4 text-xl">{s.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted">{s.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ WHY (bento) ============ */}
      <section id="why" className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <div className="grid gap-5 lg:grid-cols-3">
          <div className="flex flex-col justify-between rounded-3xl bg-forest p-8 text-paper lg:row-span-2">
            <div>
              <p className="eyebrow text-gold-soft">Why Premier</p>
              <h2 className="display mt-3 text-4xl">
                A lender that answers the phone.
              </h2>
              <p className="mt-4 text-paper/65">
                You get one dedicated loan officer from application to closing —
                a real person who knows your file, returns your call, and fights
                for your rate. No call-center roulette.
              </p>
            </div>
            <div className="mt-10 grid grid-cols-2 gap-6 border-t border-paper/15 pt-6">
              <div>
                <div className="display text-3xl">1:1</div>
                <div className="mt-1 text-xs text-paper/55">loan officer per file</div>
              </div>
              <div>
                <div className="display text-3xl">7-day</div>
                <div className="mt-1 text-xs text-paper/55">rate-lock guarantee</div>
              </div>
            </div>
          </div>

          {[
            { t: "Transparent pricing", d: "Every rate, point, and fee laid out up front. What you're quoted is what you close on — in writing." },
            { t: "Fast, human underwriting", d: "Real underwriters review your file, not just an algorithm. That means fewer surprises and faster clear-to-close." },
            { t: "Close on time, guaranteed", d: "We back our closing dates. If we miss ours, you get a credit toward your costs.*" },
            { t: "Local market expertise", d: "Loan officers who know your market, your programs, and the down-payment assistance you may qualify for." },
          ].map((c) => (
            <div key={c.t} className="rounded-3xl border border-line bg-card p-7">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gold/15 text-gold">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path d="M4 12l5 5L20 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <h3 className="display mt-5 text-xl">{c.t}</h3>
              <p className="mt-2.5 text-sm leading-relaxed text-muted">{c.d}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ REVIEWS ============ */}
      <section id="reviews" className="bg-paper-2 py-24">
        <div className="mx-auto max-w-6xl px-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-xl">
              <p className="eyebrow text-gold">Reviews</p>
              <h2 className="display mt-3 text-4xl sm:text-5xl">
                Homeowners who'd send a friend.
              </h2>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <svg key={i} width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-sm font-medium text-ink-soft">4.9 · 12,000+ reviews</span>
            </div>
          </div>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {REVIEWS.map((rv) => (
              <figure key={rv.n} className="flex flex-col rounded-2xl border border-line bg-card p-7">
                <div className="flex text-gold">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <svg key={i} width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2l2.9 6.3 6.9.7-5.1 4.6 1.4 6.8L12 17.8 5.9 20.4l1.4-6.8L2.2 9l6.9-.7L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-[15px] leading-relaxed text-ink-soft">
                  "{rv.q}"
                </blockquote>
                <figcaption className="mt-6 border-t border-line pt-4">
                  <div className="font-medium text-ink">{rv.n}</div>
                  <div className="mt-0.5 text-xs text-muted">{rv.r}</div>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA / APPLY ============ */}
      <section id="apply" className="mx-auto max-w-6xl px-5 py-24 sm:px-8">
        <div className="relative overflow-hidden rounded-[2rem] bg-forest-deep px-6 py-16 text-center text-paper sm:px-16 sm:py-20">
          <div
            className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full opacity-[0.12] blur-3xl"
            style={{ background: "radial-gradient(circle, #ffffff 0%, transparent 70%)" }}
          />
          <div className="relative">
            <p className="eyebrow text-gold-soft">Ready when you are</p>
            <h2 className="display mx-auto mt-4 max-w-2xl text-4xl sm:text-6xl">
              Let's get you pre-approved.
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-lg text-paper/65">
              It takes about ten minutes and won't affect your credit score.
              A loan officer will reach out the same day.
            </p>
            <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
              <a
                href="#"
                className="rounded-full bg-paper px-7 py-3.5 text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
              >
                Start my pre-approval
              </a>
              <a
                href="tel:18005550100"
                className="rounded-full border border-paper/25 px-7 py-3.5 text-sm font-medium text-paper transition-colors hover:border-paper/60"
              >
                Talk to a loan officer
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
