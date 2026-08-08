"use client";

import { useMemo, useState } from "react";

const fmt = (n: number) =>
  n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

export function Estimator() {
  const [price, setPrice] = useState(450000);
  const [down, setDown] = useState(20); // percent
  const [rate, setRate] = useState(6.25);
  const [term, setTerm] = useState(30);

  const { monthly, loanAmount, downAmount } = useMemo(() => {
    const downAmount = (price * down) / 100;
    const loanAmount = price - downAmount;
    const i = rate / 100 / 12;
    const n = term * 12;
    const monthly =
      i === 0 ? loanAmount / n : (loanAmount * i) / (1 - Math.pow(1 + i, -n));
    return { monthly, loanAmount, downAmount };
  }, [price, down, rate, term]);

  return (
    <div className="grid gap-8 rounded-3xl border border-line bg-card p-6 shadow-sm sm:p-8 md:grid-cols-2">
      <div className="space-y-6">
        <Field label="Home price" value={fmt(price)}>
          <input
            type="range"
            min={100000}
            max={2000000}
            step={10000}
            value={price}
            onChange={(e) => setPrice(+e.target.value)}
            className="accent-forest"
          />
        </Field>

        <Field label="Down payment" value={`${down}% · ${fmt(downAmount)}`}>
          <input
            type="range"
            min={3}
            max={50}
            step={1}
            value={down}
            onChange={(e) => setDown(+e.target.value)}
            className="accent-forest"
          />
        </Field>

        <Field label="Interest rate" value={`${rate.toFixed(2)}%`}>
          <input
            type="range"
            min={3}
            max={9}
            step={0.05}
            value={rate}
            onChange={(e) => setRate(+e.target.value)}
            className="accent-forest"
          />
        </Field>

        <div>
          <div className="eyebrow mb-2 text-muted">Loan term</div>
          <div className="flex gap-2">
            {[15, 20, 30].map((t) => (
              <button
                key={t}
                onClick={() => setTerm(t)}
                className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-medium transition-colors ${
                  term === t
                    ? "border-forest bg-forest text-paper"
                    : "border-line bg-paper text-ink-soft hover:border-forest/40"
                }`}
              >
                {t} yr
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-between rounded-2xl bg-forest p-6 text-paper sm:p-7">
        <div>
          <div className="eyebrow text-gold-soft">Estimated payment</div>
          <div className="mt-3 flex items-end gap-1">
            <span className="display text-5xl text-paper sm:text-6xl">
              {fmt(monthly)}
            </span>
            <span className="mb-1.5 text-paper/60">/mo</span>
          </div>
          <p className="mt-3 text-sm text-paper/60">
            Principal &amp; interest. Taxes, insurance, and HOA are not included.
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-4 border-t border-paper/15 pt-5 text-sm">
          <Stat label="Loan amount" value={fmt(loanAmount)} />
          <Stat label="Down payment" value={fmt(downAmount)} />
        </div>

        <a
          href="#apply"
          className="mt-6 rounded-full bg-paper px-5 py-3 text-center text-sm font-semibold text-ink transition-colors hover:bg-gold-soft"
        >
          Lock this rate →
        </a>
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  children,
}: {
  label: string;
  value: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="eyebrow text-muted">{label}</span>
        <span className="font-mono text-sm text-ink">{value}</span>
      </div>
      <div className="[&_input]:w-full">{children}</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-paper/50">{label}</div>
      <div className="mt-0.5 font-medium text-paper">{value}</div>
    </div>
  );
}
