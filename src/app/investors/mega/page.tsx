import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export const dynamic = "force-static";

export default function InvestorsMegaPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>MEGA</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Why AXW could become infrastructure.
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        The company becomes massive if it wins the layer where trust, permissions, verification, and proof converge.
      </p>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card title="Not a point tool" body="A coordination layer embedded in daily operations." />
        <Card title="Not feature-bound" body="Outcomes first: lower liability, faster throughput, cleaner proof." />
        <Card title="Not venue-only" body="The same rails apply to parking, property, enterprise, and government." />
        <Card title="Not easily displaced" body="Once proof and permissions are retained in the system, replacement cost rises." />
      </div>
    </MarketingShell>
  );
}

function Card({ title, body }: { title: string; body: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 14, background: "white" }}>
      <div style={{ fontWeight: 950, fontSize: 15 }}>{title}</div>
      <div style={{ marginTop: 8, color: "#666", fontSize: 13, lineHeight: 1.55 }}>{body}</div>
    </div>
  </>
  )
}
