import MarketingHeader from "@/components/MarketingHeader";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export const dynamic = "force-static";

export default function OperatorsPage() {
  return (
    <main style={{ background: "#fff" }}>
      <SubpageVisual variant="default" />
      <MarketingHeader />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 16px 70px" }}>
        <div style={{ fontSize: 12, color: "#777", fontWeight: 800, letterSpacing: 0.4 }}>AXW CONSOLE</div>
        <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 48, letterSpacing: -1.2, fontWeight: 950 }}>
          Operators
        </h1>

        <p style={{ marginTop: 0, color: "#333", lineHeight: 1.6, maxWidth: 860 }}>
          Operator tooling that reduces incidents, speeds throughput, and proves compliance — so venues run smoother and assets stay protected.
          Use Admin to pick a venue, then jump into Ops.
        </p>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <A href="/admin/ops">Admin Ops</A>
          <A href="/venues">Venues</A>
          <A href="/network">Network</A>
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
          <div style={{ fontWeight: 950, fontSize: 16 }}>Start here</div>
          <div style={{ marginTop: 6, color: "#666", fontSize: 13, lineHeight: 1.5 }}>
            The ops console is venue-scoped. Pick a venue in Admin, then open its ops page.
          </div>

          <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            <Card title="Admin → Ops" body="Select a venue, view health + controls." href="/admin/ops" />
            <Card title="Admin → Venues" body="Manage venues + status." href="/admin/venues" />
            <Card title="Ops Console (venue)" body="Venue-scoped ops lives at /ops/[venueId]." href="/ops/demo" />
          </div>

          <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Small href="/api/health">/api/health</Small>
            <Small href="/api/debug/venues">/api/debug/venues</Small>
            <Small href="/api/kiosk/stats">/api/kiosk/stats</Small>
          </div>
        </div>
      </div>
    </main>
  );
}

function Card({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <a
      href={href}
      style={{
        display: "block",
        textDecoration: "none",
        color: "black",
        border: "1px solid #eee",
        borderRadius: 16,
        padding: 14,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 950, fontSize: 15 }}>{title}</div>
      <div style={{ marginTop: 8, color: "#666", fontSize: 13, lineHeight: 1.5 }}>{body}</div>
      <div style={{ marginTop: 10, fontWeight: 900, fontSize: 13 }}>Open →</div>
    </a>
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

function Small({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 12px",
        border: "1px solid #e6e6e6",
        borderRadius: 999,
        textDecoration: "none",
        color: "black",
        background: "white",
        fontWeight: 900,
        fontSize: 12,
      }}
    >
      {children}
    </a>
  );
}
