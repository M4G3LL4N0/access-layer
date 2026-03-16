import MarketingShell from "@/components/MarketingShell";
import React from "react";

export default function PressPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900 }}>PRESS</div>
      <h1 style={{ fontSize: 48, fontWeight: 950, letterSpacing: -1.2 }}>AXW is building the operating layer for physical access.</h1>
      <p style={{ color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        A benefits-first narrative for media: safer operations, better throughput, cleaner proof, and a scalable coordination model.
      </p>
    </MarketingShell>
  );
}
