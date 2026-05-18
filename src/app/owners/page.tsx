import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export default function OwnersPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900 }}>OWNERS</div>
      <h1 style={{ fontSize: 48, fontWeight: 950, letterSpacing: -1.2 }}>The control layer owners wish they had earlier.</h1>
      <p style={{ color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        AXW gives owners the ability to prove control, roll out policy changes faster, and reduce downstream operational mess.
      </p>
    </MarketingShell>
  </>
  )
}
