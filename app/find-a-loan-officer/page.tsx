import type { Metadata } from "next";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { LoanOfficerSearch } from "@/components/LoanOfficerSearch";

export const metadata: Metadata = {
  title: "Find a Loan Officer — Premier Mortgage",
  description:
    "Search Premier Mortgage loan officers by state, name, or city and connect with a local expert.",
};

export default function FindLoanOfficerPage() {
  return (
    <main id="top" className="bg-paper text-ink">
      <Nav />

      <section className="mx-auto max-w-6xl px-5 pb-6 pt-40 sm:px-8 sm:pt-48">
        <p className="eyebrow text-gold">Find a loan officer</p>
        <h1 className="display mt-4 max-w-3xl text-4xl sm:text-5xl md:text-6xl">
          A local expert in every state.
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted">
          Search by state, name, or city to find the Premier loan officer who
          knows your market — and can get you pre-approved.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-24 sm:px-8">
        <LoanOfficerSearch />
      </section>

      <Footer />
    </main>
  );
}
