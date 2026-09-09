"use client";

import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { DEFAULT_MORTGAGE, estimateMortgage, type MortgageInputs } from "@/lib/mortgage";
import styles from "./premier.module.css";

const money = (value: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(value);
type ModelTool = { name: string; title: string; description: string; inputSchema: object; annotations: { readOnlyHint: boolean; untrustedContentHint: boolean }; execute: (input: unknown) => unknown };
type ModelDocument = Document & { modelContext?: { registerTool: (tool: ModelTool, options: { signal: AbortSignal }) => void | Promise<void> } };

export function MortgageCalculator() {
  const [input, setInput] = useState(DEFAULT_MORTGAGE);
  const estimate = estimateMortgage(input);
  useEffect(() => {
    const context = (document as ModelDocument).modelContext;
    if (!context?.registerTool) return;
    const lifecycle = new AbortController();
    try {
      void Promise.resolve(context.registerTool({
        name: "configure_mortgage_estimate", title: "Configure mortgage estimate",
        description: "Update the visible payment calculator and return monthly principal and interest. Does not apply for credit or quote a current rate. Excludes taxes, insurance, mortgage insurance, and HOA fees.",
        inputSchema: { type: "object", properties: { price: { type: "number", minimum: 50000, maximum: 5000000 }, downPercent: { type: "number", minimum: 0, maximum: 100 }, annualRate: { type: "number", minimum: 0, maximum: 20 }, termYears: { type: "number", enum: [15, 20, 30] } }, required: ["price", "downPercent", "annualRate", "termYears"], additionalProperties: false },
        annotations: { readOnlyHint: false, untrustedContentHint: false },
        execute(value) {
          if (!value || typeof value !== "object" || Array.isArray(value)) throw new Error("Mortgage inputs must be an object.");
          const data = value as Record<string, unknown>;
          const keys = ["price", "downPercent", "annualRate", "termYears"];
          if (Object.keys(data).length !== keys.length || keys.some(key => typeof data[key] !== "number")) throw new Error("Provide exactly four numeric mortgage inputs.");
          const next = data as MortgageInputs;
          const result = estimateMortgage(next);
          flushSync(() => setInput({ ...next }));
          return { ...result, currency: "USD", excludes: ["property taxes", "homeowners insurance", "mortgage insurance", "HOA fees"], isRateQuote: false };
        },
      }, { signal: lifecycle.signal })).catch(() => console.warn("Mortgage agent tools are unavailable in this browser."));
    } catch { console.warn("Mortgage agent tools are unavailable in this browser."); }
    return () => lifecycle.abort();
  }, []);
  return <div className={styles.calculator}>
    <div className={styles.calculatorInputs}>
      <div className={styles.calculatorTop}><h3>Your home, your budget.</h3><button type="button" onClick={() => setInput(DEFAULT_MORTGAGE)}>Reset</button></div>
      <div className={styles.calculatorField}><div><label htmlFor="home-price">Home price</label><output htmlFor="home-price">{money(input.price)}</output></div><input id="home-price" type="range" min="50000" max="5000000" step="10000" value={input.price} aria-valuetext={money(input.price)} onChange={e => setInput({ ...input, price: Number(e.target.value) })} /><div className={styles.rangeLabels}><span>$50,000</span><span>$5,000,000</span></div></div>
      <div className={styles.calculatorField}><div><label htmlFor="down-payment">Down payment</label><output htmlFor="down-payment">{input.downPercent}% <span>· {money(estimate.downAmount)}</span></output></div><input id="down-payment" type="range" min="0" max="100" step="1" value={input.downPercent} aria-valuetext={`${input.downPercent} percent, ${money(estimate.downAmount)}`} onChange={e => setInput({ ...input, downPercent: Number(e.target.value) })} /><div className={styles.rangeLabels}><span>0%</span><span>100%</span></div></div>
      <div className={styles.calculatorField}><div><label htmlFor="interest-rate">Interest rate</label><output htmlFor="interest-rate">{input.annualRate.toFixed(2)}%</output></div><input id="interest-rate" type="range" min="0" max="20" step="0.125" value={input.annualRate} aria-describedby="rate-note" aria-valuetext={`${input.annualRate} percent`} onChange={e => setInput({ ...input, annualRate: Number(e.target.value) })} /><p id="rate-note" className={styles.inputNote}>Choose an assumption. This is not a current rate quote.</p></div>
      <fieldset className={styles.termPicker}><legend>Loan term</legend><div>{[15, 20, 30].map(years => <label key={years} className={input.termYears === years ? styles.selectedTerm : ""}><input type="radio" name="loan-term" value={years} checked={input.termYears === years} onChange={() => setInput({ ...input, termYears: years })} /><span>{years} years</span></label>)}</div></fieldset>
    </div>
    <div className={styles.calculatorResult}>
      <span className={styles.eyebrow}>A STARTING POINT FOR YOUR PLANS</span><p className={styles.paymentLabel}>Estimated monthly principal &amp; interest</p>
      <div className={styles.monthly} aria-live="polite" aria-atomic="true"><span>{money(estimate.principalAndInterest)}</span><span>/ month</span></div>
      <p className={styles.resultNote}>Taxes, homeowners insurance, mortgage insurance, and HOA fees are additional.</p>
      <dl className={styles.loanBreakdown}><div><dt>Home price</dt><dd>{money(input.price)}</dd></div><div><dt>Down payment</dt><dd>{money(estimate.downAmount)}</dd></div><div><dt>Loan amount</dt><dd>{money(estimate.loanAmount)}</dd></div><div><dt>Loan term</dt><dd>{input.termYears} years, fixed</dd></div></dl>
      <a href="/find-a-loan-officer/" className={styles.primary}>Let’s talk about your numbers <span aria-hidden="true">↗</span></a>
      <p className={styles.calculatorDisclosure}>Illustrative estimate only. Not a loan offer, approval, or rate lock. Actual terms and eligibility vary.</p>
    </div>
  </div>;
}
