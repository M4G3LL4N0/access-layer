"use client";

import MarketingHeader from "@/components/MarketingHeader";
import React from "react";

export const dynamic = "force-dynamic";

export default function HomeV2() {
  return (
    <main style={{ background: "#fff" }}>
      <MarketingHeader />

      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 16px 70px" }}>
        <Hero />
        <WhyThisWins />
        <SectorGrid />
        <InvestorStrip />
      </div>
    </main>
  );
}

function Hero() {
  return (
    <section style={{ paddingTop: 18 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1.3fr 0.9fr", gap: 22, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Pill>Lower liability</Pill>
            <Pill>Higher throughput</Pill>
            <Pill>Proof over guesswork</Pill>
            <Pill>Rollout like software</Pill>
          </div>

          <h1
            style={{
              marginTop: 18,
              marginBottom: 10,
              fontSize: 64,
              lineHeight: 0.98,
              letterSpacing: -1.8,
              fontWeight: 900,
            }}
          >
            The trust and throughput
            <br />
            layer for physical access.
          </h1>

          <p style={{ marginTop: 12, fontSize: 18, lineHeight: 1.6, color: "#333", maxWidth: 720 }}>
            AXW connects identity, policy, devices, and spaces into one operational graph — so operators move people faster,
            reduce disputes, and prove control when it matters.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <a href="https://app.accessxworld.com" style={btnPrimary}>
              Launch app <span style={{ marginLeft: 8 }}>→</span>
            </a>
            <a href="/investors" style={btnGhost}>
              Investor hub <span style={{ marginLeft: 8 }}>→</span>
            </a>
            <a href="/network" style={btnGhost}>
              Network graph <span style={{ marginLeft: 8 }}>→</span>
            </a>
            <a href="/contact" style={btnGhost}>
              Start pilot <span style={{ marginLeft: 8 }}>→</span>
            </a>
          </div>
        </div>

        <Snapshot />
      </div>
    </section>
  );
}

function Snapshot() {
  return (
    <aside
      style={{
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 18,
        background: "linear-gradient(180deg, #fff, #fafafa)",
      }}
    >
      <div style={{ fontWeight: 950, fontSize: 16 }}>4.0 snapshot</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 12 }}>
        <Stat label="Outcome" value="Trust" />
        <Stat label="Engine" value="Graph" />
      </div>

      <div style={{ marginTop: 14, borderTop: "1px solid #eee", paddingTop: 14 }}>
        <SnapLink href="/pricing" title="Pricing" sub="Buy lower risk + faster ops" />
        <SnapLink href="/case-studies/sf-pilot" title="SF Pilot" sub="Rollout proof point" />
        <SnapLink href="/vc/packet" title="VC Packet" sub="Moat + market + why now" />
      </div>
    </aside>
  );
}

function WhyThisWins() {
  return (
    <section style={{ marginTop: 34 }}>
      <h2 style={{ fontSize: 36, letterSpacing: -1, fontWeight: 950, marginBottom: 10 }}>
        Benefits that compound.
      </h2>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        <Card title="Less liability" body="Prove who had access, when, and why. Lower the cost of disputes and incident response." />
        <Card title="More throughput" body="Reduce bottlenecks at doors, garages, kiosks, and checkpoints." />
        <Card title="Tighter control" body="One policy layer across many spaces. Fewer ad-hoc overrides and less chaos." />
        <Card title="Faster expansion" body="New sites become software rollout problems, not custom operations projects." />
      </div>
    </section>
  );
}

function SectorGrid() {
  return (
    <section style={{ marginTop: 34, borderRadius: 22, overflow: "hidden", background: "#07090d", color: "white" }}>
      <div style={{ padding: "26px 18px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <PillDark>Venues</PillDark>
          <PillDark>Parking</PillDark>
          <PillDark>Property</PillDark>
          <PillDark>Enterprise</PillDark>
          <PillDark>Government</PillDark>
        </div>

        <h2 style={{ marginTop: 18, fontSize: 40, letterSpacing: -1, marginBottom: 10, fontWeight: 900 }}>
          One engine, many sectors.
        </h2>

        <p style={{ maxWidth: 900, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, fontSize: 15 }}>
          AXW is designed as the neutral access-and-space coordination layer: tokens, rules, verification, logs, analytics,
          and operational proof across any physical network.
        </p>
      </div>

      <div style={{ padding: "0 18px 22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <DarkCard
            title="Venues & events"
            body="Faster entry, fewer disputes, staff accountability, and verifiable access state."
            ctaLabel="See venues"
            ctaHref="/venues"
          />
          <DarkCard
            title="Parking & property"
            body="Validation, operator tooling, access proof, and scalable multi-site rollout."
            ctaLabel="See pricing"
            ctaHref="/pricing"
          />
        </div>
      </div>
    </section>
  );
}

function InvestorStrip() {
  return (
    <section style={{ marginTop: 34 }}>
      <div
        style={{
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 18,
          background: "linear-gradient(180deg, #fff, #fafafa)",
        }}
      >
        <div style={{ fontWeight: 950, fontSize: 18 }}>Why this becomes big</div>
        <p style={{ marginTop: 10, color: "#444", lineHeight: 1.65, maxWidth: 980 }}>
          The platform that proves access and intent becomes the default integration target for devices, operators, and partners.
          That is how AXW moves from a point product to infrastructure.
        </p>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a href="/investors" style={btnGhost}>Investors →</a>
          <a href="/vc/packet" style={btnGhost}>VC Packet →</a>
          <a href="/network" style={btnGhost}>Network →</a>
        </div>
      </div>
    </section>
  );
}

function SnapLink({ href, title, sub }: { href: string; title: string; sub: string }) {
  return (
    <a href={href} style={snapLink}>
      <div style={{ fontWeight: 900 }}>{title}</div>
      <div style={{ color: "#666", fontSize: 13 }}>{sub}</div>
    </a>
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

function DarkCard(props: { title: string; body: string; ctaLabel: string; ctaHref: string }) {
  return (
    <div
      style={{
        border: "1px solid rgba(255,255,255,0.12)",
        borderRadius: 18,
        padding: 18,
        background: "rgba(255,255,255,0.04)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 18 }}>{props.title}</div>
      <div style={{ marginTop: 10, color: "rgba(255,255,255,0.78)", lineHeight: 1.6, fontSize: 13 }}>{props.body}</div>
      <a
        href={props.ctaHref}
        style={{
          marginTop: 14,
          display: "inline-flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 14px",
          borderRadius: 999,
          border: "1px solid rgba(255,255,255,0.16)",
          textDecoration: "none",
          color: "white",
          fontWeight: 800,
          fontSize: 13,
          background: "rgba(0,0,0,0.2)",
        }}
      >
        {props.ctaLabel} <span>→</span>
      </a>
    </div>
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
        fontWeight: 700,
      }}
    >
      {children}
    </span>
  );
}

function PillDark({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        fontSize: 12,
        padding: "7px 12px",
        borderRadius: 999,
        border: "1px solid rgba(255,255,255,0.16)",
        background: "rgba(255,255,255,0.06)",
        color: "rgba(255,255,255,0.9)",
        fontWeight: 800,
      }}
    >
      {children}
    </span>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 14, background: "white" }}>
      <div style={{ fontSize: 12, color: "#666" }}>{label}</div>
      <div style={{ marginTop: 8, fontSize: 28, fontWeight: 900, letterSpacing: -0.6 }}>{value}</div>
    </div>
  );
}

const snapLink: React.CSSProperties = {
  display: "block",
  textDecoration: "none",
  color: "black",
  padding: "10px 12px",
  borderRadius: 14,
  border: "1px solid #eee",
  background: "white",
  marginTop: 10,
};

const btnPrimary: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 999,
  background: "black",
  color: "white",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 14,
};

const btnGhost: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "12px 16px",
  borderRadius: 999,
  background: "white",
  color: "black",
  textDecoration: "none",
  fontWeight: 900,
  fontSize: 14,
  border: "1px solid #ddd",
};
