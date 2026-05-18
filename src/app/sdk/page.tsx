import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export default function SdkPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900 }}>SDK</div>
      <h1 style={{ fontSize: 48, fontWeight: 950, letterSpacing: -1.2 }}>Developer rails for access infrastructure.</h1>
      <p style={{ color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        AXW SDK and APIs let partners issue tokens, verify access, and record proof events inside their own workflows.
      </p>
    </MarketingShell>
  </>
  )
}
