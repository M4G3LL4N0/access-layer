import React from "react";

export default function BenefitsBlock() {
  return (
    <section style={{ marginTop: 26 }}>
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Pill>Lower liability</Pill>
        <Pill>Higher throughput</Pill>
        <Pill>Audit-grade proof</Pill>
        <Pill>Faster rollout</Pill>
      </div>

      <h2 style={{ marginTop: 14, fontSize: 34, letterSpacing: -1, fontWeight: 950, marginBottom: 10 }}>
        Benefits that compound.
      </h2>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 920 }}>
        AXW turns access into an operating advantage: fewer incidents, faster entry, clean permissions at scale, and the proof
        you need when something goes wrong — without publishing sensitive codes.
      </p>

      <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card
          title="Reduce incidents + disputes"
          body="Know exactly who had access, when, and why. When there’s a claim or a conflict, you have the audit trail."
        />
        <Card
          title="Speed throughput"
          body="Verification flows that reduce bottlenecks at doors, kiosks, garages, and staff checkpoints."
        />
        <Card
          title="Operate at scale"
          body="One policy system across every location. Roll out new spaces like software, not bespoke ops."
        />
        <Card
          title="Build trust"
          body="Enterprise-grade accountability for partners, insurers, and governments — without leaking codes."
        />
      </div>
    </section>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "7px 12px",
        borderRadius: 999,
        border: "1px solid #e3e3e3",
        background: "#fff",
        fontWeight: 800,
      }}
    >
      {children}
    </span>
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
