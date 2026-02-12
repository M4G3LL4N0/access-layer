export const dynamic = "force-dynamic";

import Link from "next/link";
import InvestorModelClient from "@/components/InvestorModelClient";

export default function InvestorsModelPage() {
  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1100, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href="/investors" style={{ opacity: 0.8 }}>
          ← Investors
        </Link>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href="/network" style={{ opacity: 0.8 }}>
            Reliability
          </Link>
          <Link href="/pricing" style={{ opacity: 0.8 }}>
            Pricing
          </Link>
        </div>
      </div>

      <h1 style={{ marginTop: 14, fontSize: 34, fontWeight: 950 }}>
        Investor Model (Scenario-Based)
      </h1>

      <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
        This is a scenario model, not a promise. Slide assumptions, see outputs. The point is to show how
        a programmable access layer can compound across many categories of space.
      </p>

      <InvestorModelClient />
    </main>
  );
}
