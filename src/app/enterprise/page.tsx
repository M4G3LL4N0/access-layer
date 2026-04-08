import MarketingShell from "@/components/MarketingShell";
import React from "react";

export default function EnterprisePage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900 }}>ENTERPRISE</div>
      <h1 style={{ fontSize: 48, fontWeight: 950, letterSpacing: -1.2, marginBottom: 16 }}>Enterprise access, without operational chaos.</h1>
      <p style={{ color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        AXW gives enterprise operators a policy-defined way to manage access, verification, and proof across locations.
      </p>
    </MarketingShell>
  );
}
