import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { test } from "node:test";
const require = createRequire(import.meta.url);
const ts = require("typescript");
const source = readFileSync(new URL("../lib/mortgage.ts", import.meta.url), "utf8");
const js = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } }).outputText;
const { estimateMortgage, DEFAULT_MORTGAGE } = await import(`data:text/javascript;base64,${Buffer.from(js).toString("base64")}`);

test("standard amortization agrees with independently calculated payment", () => {
  const result = estimateMortgage(DEFAULT_MORTGAGE);
  assert.equal(result.loanAmount, 360000);
  assert.equal(result.downAmount, 90000);
  assert.ok(Math.abs(result.principalAndInterest - 2275.444884574676) < 0.00001);
});
test("zero interest and full down payment stay finite", () => {
  assert.equal(estimateMortgage({ ...DEFAULT_MORTGAGE, annualRate: 0 }).principalAndInterest, 1000);
  assert.equal(estimateMortgage({ ...DEFAULT_MORTGAGE, downPercent: 100 }).principalAndInterest, 0);
});
test("a shorter term raises the payment and reduces lifetime interest", () => {
  const long = estimateMortgage(DEFAULT_MORTGAGE);
  const short = estimateMortgage({ ...DEFAULT_MORTGAGE, termYears: 15 });
  assert.ok(short.principalAndInterest > long.principalAndInterest);
  assert.ok(short.principalAndInterest * 180 < long.principalAndInterest * 360);
});
test("invalid estimates are rejected", () => {
  for (const bad of [{ price: NaN }, { annualRate: -1 }, { downPercent: 101 }, { price: 0 }, { termYears: 0 }, { termYears: 25 }, { price: Infinity }]) assert.throws(() => estimateMortgage({ ...DEFAULT_MORTGAGE, ...bad }));
});
