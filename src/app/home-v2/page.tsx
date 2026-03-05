"use client";

import MarketingHeader from "@/components/MarketingHeader";
import React, { useEffect, useMemo, useState } from "react";

export const dynamic = "force-dynamic";

export default function HomeV2() {
  return (
    <main style={{ background: "#fff" }}>
      <MarketingHeader />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "22px 16px 70px" }}>
        <Hero />
        <SectionDark />
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
            <Pill>Policy-defined access</Pill>
            <Pill>Time-bounded tokens</Pill>
            <Pill>Audit logs</Pill>
            <Pill>Parking validation</Pill>
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
            Programmable
            <br />
            access,
            <br />
            everywhere.
          </h1>

          <p style={{ marginTop: 12, fontSize: 18, lineHeight: 1.6, color: "#333", maxWidth: 640 }}>
            AXW is the universal coordination layer between <b>access</b> and <b>space</b>: define rules once, issue scoped
            tokens, verify at any edge, and log every grant + use — without publishing sensitive codes.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginTop: 18 }}>
            <a href="https://app.accessxworld.com" style={btnPrimary}>
              Launch app <span style={{ marginLeft: 8 }}>→</span>
            </a>
            <a href="/investors" style={btnGhost}>
              Investor hub <span style={{ marginLeft: 8 }}>→</span>
            </a>
            <a href="/kiosk" style={btnGhost}>
              Kiosk mode <span style={{ marginLeft: 8 }}>→</span>
            </a>
            <a href="/parking" style={btnGhost}>
              Parking <span style={{ marginLeft: 8 }}>→</span>
            </a>
          </div>

          <div style={{ marginTop: 16, fontSize: 12, color: "#777" }}>
            Built for: venues · property ops · parking · enterprise · government · infrastructure partners
          </div>
        </div>

        <LiveSnapshot />
      </div>
    </section>
  );
}

function LiveSnapshot() {
  return (
    <aside
      style={{
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 18,
        background: "linear-gradient(180deg, #fff, #fafafa)",
      }}
    >
      <div style={{ fontWeight: 800, fontSize: 16 }}>Live snapshot</div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 12 }}>
        <Stat label="Venues" value="10" />
        <Stat label="Passes issued" value="4" />
      </div>

      <div style={{ marginTop: 14, borderTop: "1px solid #eee", paddingTop: 14 }}>
        <a href="/case-studies/sf-pilot" style={snapLink}>
          <div style={{ fontWeight: 800 }}>SF Pilot</div>
          <div style={{ color: "#666", fontSize: 13 }}>Case study + rollout pack</div>
        </a>
        <a href="/investors/model" style={snapLink}>
          <div style={{ fontWeight: 800 }}>Model</div>
          <div style={{ color: "#666", fontSize: 13 }}>Unit economics + growth loops</div>
        </a>
        <a href="/vc/packet" style={snapLink}>
          <div style={{ fontWeight: 800 }}>VC Packet</div>
          <div style={{ color: "#666", fontSize: 13 }}>Pitch narrative + rollout</div>
        </a>
      </div>
    </aside>
  );
}

function SectionDark() {
  return (
    <section style={{ marginTop: 34, borderRadius: 22, overflow: "hidden", background: "#07090d", color: "white" }}>
      <div style={{ padding: "26px 18px" }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <PillDark>Universal points of access</PillDark>
          <PillDark>Doors · gates · garages · kiosks · APIs</PillDark>
          <PillDark>Edge verify</PillDark>
        </div>

        <h2 style={{ marginTop: 18, fontSize: 40, letterSpacing: -1, marginBottom: 10, fontWeight: 900 }}>
          One engine, many sectors.
        </h2>

        <p style={{ maxWidth: 900, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, fontSize: 15 }}>
          AXW is designed as a neutral access-and-space coordination layer: tokenized permissions, policy rules, device
          verification, kiosk issuance, parking validation, staff scanning, and audit trails — scalable across every space
          type.
        </p>
      </div>

      <div style={{ padding: "0 18px 22px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <DarkCard
            title="Venues & Events"
            body="Staff verification, guest tokens, time windows, rate-limits, incident logs."
            ctaLabel="Kiosk hub"
            ctaHref="/kiosk"
          />
          <DarkCard
            title="Parking"
            body="Plate-entry kiosks, validation tokens, operator verify tools, event trails."
            ctaLabel="Parking solution"
            ctaHref="/solutions/parking"
          />
        </div>
      </div>
    </section>
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
