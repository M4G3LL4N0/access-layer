import MarketingHeader from "@/components/MarketingHeader";
import React from "react";

export const dynamic = "force-static";

const BUILD_STAMP = "NETWORK_OK_2026-02-26_1907PST";

export default function NetworkPage() {
  return (
    <main style={{ background: "#fff" }}>
      <MarketingHeader />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 16px 70px" }}>
        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, color: "#777", fontWeight: 800, letterSpacing: 0.4 }}>AXW NETWORK</div>
            <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 48, letterSpacing: -1.2, fontWeight: 950 }}>
              Network
            </h1>
            <p style={{ marginTop: 0, color: "#333", lineHeight: 1.6, maxWidth: 760 }}>
              This is your live coordination layer: visibility, accountability, and controlled access across every space you operate.
              Next step: connect Supabase-backed topology + live metrics.
            </p>
          </div>

          <div
            style={{
              padding: "10px 12px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "#fafafa",
              fontSize: 12,
              fontWeight: 900,
            }}
          >
            ONLINE
          </div>
        </div>

        <div
          style={{
            marginTop: 18,
            border: "1px solid #eee",
            borderRadius: 18,
            padding: 18,
            background: "linear-gradient(180deg, #fff, #fafafa)",
          }}
        >
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
            <Card title="Routing health" value="OK" sub="Traffic resolves correctly" />
            <Card title="Render health" value="OK" sub="Pages are serving" />
            <Card title="Data plane" value="Not connected" sub="Supabase wiring next" />
            <Card title="Next milestone" value="Wire topology" sub="Spaces, edges, rules" />
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <A href="/venues">Venues</A>
            <A href="/analytics">Analytics</A>
            <A href="/admin">Admin</A>
          </div>
        </div>

        <div style={{ marginTop: 14, fontSize: 12, color: "#666" }}>
          Build stamp: <code style={{ fontWeight: 900 }}>{BUILD_STAMP}</code>
        </div>
      </div>
    </main>
  );
}

function Card({ title, value, sub }: { title: string; value: string; sub: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 16, padding: 14, background: "white" }}>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 800 }}>{title}</div>
      <div style={{ marginTop: 10, fontSize: 22, fontWeight: 950, letterSpacing: -0.4 }}>{value}</div>
      <div style={{ marginTop: 6, fontSize: 13, color: "#666", lineHeight: 1.45 }}>{sub}</div>
    </div>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "10px 14px",
        border: "1px solid #ddd",
        borderRadius: 999,
        textDecoration: "none",
        color: "black",
        background: "white",
        fontWeight: 900,
        fontSize: 13,
      }}
    >
      {children} <span style={{ marginLeft: 8 }}>→</span>
    </a>
  );
}
