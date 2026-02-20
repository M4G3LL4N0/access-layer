"use client";
import React from "react";
import InvestorNav from "@/components/InvestorNav";

export const dynamic = "force-dynamic";

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{
      border: "1px solid rgba(0,0,0,0.12)",
      borderRadius: 16,
      padding: 14,
      marginTop: 12,
      background: "#fff",
    }}>
      <div style={{ fontWeight: 1000, fontSize: 18, letterSpacing: -0.4 }}>{title}</div>
      <div style={{ marginTop: 8, lineHeight: 1.7, opacity: 0.9 }}>{children}</div>
    </section>
  );
}

export default function InvestorsMega() {
  return (
    <main style={{
      background: "#fff",
      color: "#0b0f19",
      minHeight: "100vh",
      fontFamily: "system-ui,-apple-system,Segoe UI,Roboto,Helvetica,Arial",
    }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "22px 14px 42px" }}>
        <InvestorNav />

        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 28, fontWeight: 1100, letterSpacing: -0.8 }}>AXW — Investor Mega Page</div>
            <div style={{ opacity: 0.75 }}>Everything in one place. We add only. We cross-link everything.</div>
          </div>
          <a href="/investors" style={{
            textDecoration: "none", color: "#fff", background: "#0b0f19",
            padding: "10px 14px", borderRadius: 12, fontWeight: 1000
          }}>Back to Investors</a>
        </div>

        <Section title="The Universal Access × Space Layer">
          AXW is the coordination layer between access and space: policy-defined permissions, time-bounded tokens,
          verification at the edge, and auditable logs — unified across every access point.
        </Section>

        <Section title="Verticals we dominate (fast)">
          <ul style={{ margin: 0, paddingLeft: 18 }}>
            <li><b>Parking</b>: plate/kiosk validation, operator workflows, time-based exits, enforcement logs.</li>
            <li><b>Workspaces & offices</b>: guests, staff, deliveries, conference rooms, after-hours rules.</li>
            <li><b>Venues & events</b>: entry lanes, staff scanning, token rotation, revocation, incident logs.</li>
            <li><b>Residential & property ops</b>: vendors, showings, maintenance windows, audit trails.</li>
            <li><b>Logistics</b>: loading docks, cages, equipment rooms, chain-of-custody logs.</li>
            <li><b>Government / education / healthcare</b>: compliance-first access with audit guarantees.</li>
          </ul>
        </Section>

        <Section title="2 Trillion Dollar Path (Narrative)">
          <ol style={{ margin: 0, paddingLeft: 18 }}>
            <li><b>Prove</b> the token + verify + log loop in one workflow.</li>
            <li><b>Expand</b> inside the venue: more doors, more roles, more edge points.</li>
            <li><b>Standardize</b> across categories: parking, office, venue, logistics.</li>
            <li><b>Partner</b> with access vendors: become the network layer.</li>
            <li><b>Own</b> the global standard for access permissions + space coordination.</li>
          </ol>
        </Section>

        <Section title="Links (investor mini-site)">
          <div style={{ display: "grid", gap: 10 }}>
            <a href="/investors" style={{ fontWeight: 1000 }}>Investors (Main)</a>
            <a href="/investors/model" style={{ fontWeight: 1000 }}>Investors (Model)</a>
            <a href="/vc" style={{ fontWeight: 1000 }}>VC Hub</a>
            <a href="/vc/packet" style={{ fontWeight: 1000 }}>VC Packet</a>
            <a href="/vc/checklist" style={{ fontWeight: 1000 }}>VC Checklist</a>
            <a href="/reports/sf" style={{ fontWeight: 1000 }}>SF Report</a>
            <a href="/case-studies/sf-pilot" style={{ fontWeight: 1000 }}>SF Pilot Case Study</a>
          </div>
        </Section>

        <Section title="Next build (14-day launch roadmap)">
          If you say “go”, I’ll generate a new page: <b>/launch/14-day</b> with the full day-by-day execution plan
          AND links to every route we already built (kiosk, verify, pilot pack, signage, onboarding, CRM, admin).
        </Section>

        <div style={{ marginTop: 18, opacity: 0.7, fontSize: 12 }}>
          © {new Date().getFullYear()} AXW — Access × World
        </div>
      </div>
    </main>
  );
}
