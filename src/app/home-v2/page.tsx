"use client";

import React from "react";
import MarketingShell from "@/components/MarketingShell";

export const dynamic = "force-dynamic";

const chips = [
  "Fewer incidents, fewer disputes",
  "Faster entry, less friction",
  "Proof for auditors + insurers",
  "Tokens instead of shared codes",
];

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-flex",
        alignItems: "center",
        padding: "8px 12px",
        borderRadius: 999,
        border: "1px solid #e8e8e8",
        background: "white",
        fontSize: 13,
        fontWeight: 700,
        color: "#111",
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </span>
  );
}

function ButtonPrimary({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        borderRadius: 999,
        background: "black",
        color: "white",
        textDecoration: "none",
        fontWeight: 800,
        border: "1px solid black",
      }}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

function ButtonGhost({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 10,
        padding: "12px 16px",
        borderRadius: 999,
        background: "white",
        color: "black",
        textDecoration: "none",
        fontWeight: 800,
        border: "1px solid #e6e6e6",
      }}
    >
      {children} <span aria-hidden="true">→</span>
    </a>
  );
}

function Card({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        color: "black",
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 18,
        background: "white",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
      }}
    >
      <div style={{ fontWeight: 900, fontSize: 16, letterSpacing: -0.2 }}>{title}</div>
      <div style={{ color: "#444", lineHeight: 1.5, fontSize: 14 }}>{body}</div>
      <div style={{ marginTop: 6, fontWeight: 900, fontSize: 13 }}>{cta} →</div>
    </a>
  );
}

export default function HomeV2() {
  return (
    <MarketingShell>
      <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: 18, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {chips.map((c) => (
              <Pill key={c}>{c}</Pill>
            ))}
          </div>

          <h1 style={{ marginTop: 18, marginBottom: 10, fontSize: 62, lineHeight: 0.95, letterSpacing: -1.4 }}>
            Programmable access,
            <br />
            without the chaos.
          </h1>

          <p style={{ marginTop: 12, color: "#333", lineHeight: 1.6, fontSize: 18, maxWidth: 720 }}>
            AXW is the coordination layer between <b>access</b> and <b>space</b>.
            You define policy once, issue time-bounded tokens, verify at any edge, and keep audit-grade logs — so operators move faster
            and stakeholders trust the outcome.
          </p>

          <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <ButtonPrimary href="https://app.accessxworld.com">Launch app</ButtonPrimary>
            <ButtonGhost href="/investors">Investor hub</ButtonGhost>
            <ButtonGhost href="/solutions/parking">Parking</ButtonGhost>
            <ButtonGhost href="/kiosk">Kiosk mode</ButtonGhost>
          </div>

          <p style={{ marginTop: 14, color: "#666", fontSize: 13 }}>
            Built for venues · property ops · parking · enterprise · government · infrastructure partners
          </p>
        </div>

        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 18,
            padding: 16,
            background: "linear-gradient(180deg, rgba(250,250,250,1) 0%, rgba(255,255,255,1) 100%)",
          }}
        >
          <div style={{ fontWeight: 900, fontSize: 16, marginBottom: 10 }}>Why it wins</div>

          <div style={{ display: "grid", gap: 10 }}>
            <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12, background: "white" }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 800 }}>Operators</div>
              <div style={{ marginTop: 6, fontSize: 14, color: "#222", lineHeight: 1.5 }}>
                Fewer “code leaks”, less tail-risk, faster throughput at doors and kiosks.
              </div>
            </div>

            <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12, background: "white" }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 800 }}>Owners</div>
              <div style={{ marginTop: 6, fontSize: 14, color: "#222", lineHeight: 1.5 }}>
                Policy changes in minutes, not days. Clean logs when disputes happen.
              </div>
            </div>

            <div style={{ border: "1px solid #eee", borderRadius: 14, padding: 12, background: "white" }}>
              <div style={{ fontSize: 12, color: "#666", fontWeight: 800 }}>Investors</div>
              <div style={{ marginTop: 6, fontSize: 14, color: "#222", lineHeight: 1.5 }}>
                Network effects: more spaces → more credential utility → more demand.
              </div>
            </div>
          </div>

          <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
            <Card
              title="SF Pilot"
              body="Case study + rollout pack: how to deploy with minimal hardware and maximum proof."
              href="/case-studies/sf-pilot"
              cta="View"
            />
            <Card
              title="Model"
              body="Unit economics + growth loops: why coordination layers compound."
              href="/investors/model"
              cta="Open"
            />
            <Card
              title="VC Packet"
              body="Narrative, wedge, expansion, moat: ready-to-pitch."
              href="/vc/packet"
              cta="Read"
            />
          </div>
        </div>
      </div>

      <div style={{ marginTop: 26, borderRadius: 22, background: "black", color: "white", padding: 22 }}>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Pill>Universal points of access</Pill>
          <Pill>Doors · gates · garages · kiosks · APIs</Pill>
          <Pill>Edge verify</Pill>
        </div>

        <h2 style={{ marginTop: 16, marginBottom: 10, fontSize: 34, letterSpacing: -0.6 }}>
          One engine, many sectors.
        </h2>

        <p style={{ marginTop: 0, color: "rgba(255,255,255,0.82)", lineHeight: 1.6, maxWidth: 980 }}>
          AXW is designed as a neutral access-and-space coordination layer: tokenized permissions, policy rules, device verification,
          kiosk issuance, parking validation, staff scanning, and audit trails — scalable across every space type.
        </p>

        <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
          <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: 16, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Venues & Events</div>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.78)", lineHeight: 1.5, fontSize: 14 }}>
              Faster entry, fewer disputes, consistent enforcement, better incident records.
            </div>
            <div style={{ marginTop: 12 }}>
              <a href="/kiosk" style={{ color: "white", textDecoration: "none", fontWeight: 900 }}>Kiosk hub →</a>
            </div>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: 16, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Parking</div>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.78)", lineHeight: 1.5, fontSize: 14 }}>
              Validation tokens, plate-entry kiosks, operator verify tools, event trails.
            </div>
            <div style={{ marginTop: 12 }}>
              <a href="/solutions/parking" style={{ color: "white", textDecoration: "none", fontWeight: 900 }}>Parking solution →</a>
            </div>
          </div>

          <div style={{ border: "1px solid rgba(255,255,255,0.12)", borderRadius: 18, padding: 16, background: "rgba(255,255,255,0.04)" }}>
            <div style={{ fontWeight: 900, fontSize: 16 }}>Enterprise & Gov</div>
            <div style={{ marginTop: 8, color: "rgba(255,255,255,0.78)", lineHeight: 1.5, fontSize: 14 }}>
              Compliance-friendly logs, policy-based access, and clean audit narratives.
            </div>
            <div style={{ marginTop: 12 }}>
              <a href="/government" style={{ color: "white", textDecoration: "none", fontWeight: 900 }}>Public sector →</a>
            </div>
          </div>
        </div>
      </div>
    </MarketingShell>
  );
}
