import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export default function TermsPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell maxWidth={900}>
      <h1 style={{ fontSize: 40, fontWeight: 950 }}>Terms</h1>
      <p style={{ color: "#555", lineHeight: 1.7 }}>
        Placeholder terms page for AXW. Replace with finalized legal copy.
      </p>
    </MarketingShell>
  </>
  )
}
