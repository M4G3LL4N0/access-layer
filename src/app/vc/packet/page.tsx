import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function VcPacketPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>VC PACKET</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        AXW 4.0 investor packet
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        AXW is building the coordination layer between access and space. The company wins by reducing friction, reducing liability,
        and creating the proof infrastructure that operators retain and expand.
      </p>

      <div style={{ marginTop: 22, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
        <Card title="Category" body="Programmable access infrastructure" />
        <Card title="Wedge" body="Venues, parking, and high-frequency operating environments" />
        <Card title="Expansion" body="Property ops, enterprise, government, infrastructure" />
        <Card title="Moat" body="Policy engine + verification + audit ledger + operator embed" />
        <Card title="Why now" body="Rising liability, fragmented tooling, and increasing demand for proof" />
        <Card title="Why big" body="The layer that proves access becomes the standard others build around" />
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
  );
}
