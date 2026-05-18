import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export default function GovernmentPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900 }}>GOVERNMENT</div>
      <h1 style={{ fontSize: 48, fontWeight: 950, letterSpacing: -1.2 }}>Access infrastructure for public systems.</h1>
      <p style={{ color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        Public-sector access needs proof, accountability, and controllable rollout. AXW is built around those requirements.
      </p>
    </MarketingShell>
  </>
  )
}
