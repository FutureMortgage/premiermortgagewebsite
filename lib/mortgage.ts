export type MortgageInputs = { price: number; downPercent: number; annualRate: number; termYears: number };
export const DEFAULT_MORTGAGE: MortgageInputs = { price: 450000, downPercent: 20, annualRate: 6.5, termYears: 30 };

export function estimateMortgage({ price, downPercent, annualRate, termYears }: MortgageInputs) {
  if (![price, downPercent, annualRate, termYears].every(Number.isFinite) || price < 50000 || price > 5000000 || downPercent < 0 || downPercent > 100 || annualRate < 0 || annualRate > 20 || ![15, 20, 30].includes(termYears)) {
    throw new Error("Use a home price of $50,000–$5,000,000, 0–100% down, a 0–20% rate, and a 15-, 20-, or 30-year term.");
  }
  const downAmount = price * downPercent / 100;
  const loanAmount = price - downAmount;
  const monthlyRate = annualRate / 1200;
  const payments = termYears * 12;
  const principalAndInterest = monthlyRate === 0 ? loanAmount / payments : loanAmount * monthlyRate / -Math.expm1(-payments * Math.log1p(monthlyRate));
  return { principalAndInterest, loanAmount, downAmount };
}
