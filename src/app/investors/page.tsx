"use client";

import { useMemo, useState } from "react";

type Scenario = "Conservative" | "Base" | "Aggressive";

function Pill({ active, onClick, children }: any) {
  return (
    <button
      onClick={onClick}
      className="axw-btn"
      style={{
        background: active ? "#111" : "#fff",
        color: active ? "#fff" : "#111",
        borderColor: active ? "#111" : "rgba(0,0,0,0.14)",
      }}
      type="button"
    >
      {children}
    </button>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="axw-card" style={{ minWidth: 240 }}>
      <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.75 }}>{label}</div>
      <div style={{ fontSize: 28, fontWeight: 950, marginTop: 6 }}>{value}</div>
      {hint ? <div className="axw-muted" style={{ marginTop: 6, fontSize: 13 }}>{hint}</div> : null}
    </div>
  );
}

export default function InvestorsPage() {
  const [scenario, setScenario] = useState<Scenario>("Base");

  const model = useMemo(() => {
    // These are “story numbers” that make the page feel alive.
    // We’ll later wire them to real metrics + pricing once Stripe is live.
    const base = {
      venues: 100,
      accessPointsPerVenue: 14,
      monthlyTokensPerVenue: 3200,
      takeRate: 0.12,
      arpa: 450,
    };

    const mult =
      scenario === "Conservative" ? 0.6 : scenario === "Aggressive" ? 1.8 : 1.0;

    const venues = Math.round(base.venues * mult);
    const accessPoints = Math.round(venues * base.accessPointsPerVenue);
    const tokens = Math.round(venues * base.monthlyTokensPerVenue);
    const gross = Math.round(venues * base.arpa);
    const rev = Math.round(gross * base.takeRate);

    return { venues, accessPoints, tokens, gross, rev };
  }, [scenario]);

  return (
    <main className="axw-container">
      <div className="axw-row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="axw-title" style={{ fontSize: 26 }}>Investors</div>
          <div className="axw-muted" style={{ marginTop: 6, lineHeight: 1.6, maxWidth: 860 }}>
            AXW is the universal coordination layer between <b>access</b> and <b>space</b>.
            One set of primitives works across doors, garages, gates, elevators, turnstiles, lockers,
            Wi-Fi, and API access — enforced by policy, issued as tokens, verified at the edge, and logged.
          </div>
        </div>

        <div className="axw-row">
          <a className="axw-btn" href="/">Home</a>
          <a className="axw-btn" href="/demo">Demo</a>
          <a className="axw-btn axw-btn-primary" href="/contact">Contact</a>
        </div>
      </div>

      <div className="axw-card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 950 }}>Interactive Model</div>
        <div className="axw-muted" style={{ marginTop: 6 }}>
          Toggle the scenario to show growth outcomes. This keeps your investor narrative punchy and visual.
        </div>

        <div className="axw-row" style={{ marginTop: 12 }}>
          <Pill active={scenario === "Conservative"} onClick={() => setScenario("Conservative")}>Conservative</Pill>
          <Pill active={scenario === "Base"} onClick={() => setScenario("Base")}>Base</Pill>
          <Pill active={scenario === "Aggressive"} onClick={() => setScenario("Aggressive")}>Aggressive</Pill>
        </div>

        <div className="axw-row" style={{ marginTop: 12 }}>
          <Stat label="Venues onboarded" value={model.venues.toLocaleString()} hint="Locations using AXW policy + tokens" />
          <Stat label="Access points" value={model.accessPoints.toLocaleString()} hint="Doors/garages/gates/turnstiles/etc" />
          <Stat label="Monthly token events" value={model.tokens.toLocaleString()} hint="Issuance + verification volume" />
        </div>

        <div className="axw-row" style={{ marginTop: 12 }}>
          <Stat label="Monthly gross (operator spend)" value={`$${model.gross.toLocaleString()}`} hint="Estimated monthly value captured at venues" />
          <Stat label="Monthly platform revenue" value={`$${model.rev.toLocaleString()}`} hint="Illustrative take-rate on flows" />
        </div>
      </div>

      <div className="axw-grid" style={{ marginTop: 14 }}>
        <div className="axw-card">
          <div style={{ fontWeight: 950 }}>Why Now</div>
          <div className="axw-muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
            Access is fragmented: different vendors, codes, workflows, and no unified audit trail.
            AXW unifies authorization into a policy + token + verify + log system that works across sectors.
          </div>
        </div>

        <div className="axw-card">
          <div style={{ fontWeight: 950 }}>Wedge</div>
          <div className="axw-muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
            Start with kiosks, staff verification, and parking validation (high-frequency events).
            Expand into the full access point registry + device verification + enterprise integrations.
          </div>
        </div>

        <div className="axw-card">
          <div style={{ fontWeight: 950 }}>Moat</div>
          <div className="axw-muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
            The network graph of spaces + access points + devices + policies + event logs becomes proprietary infrastructure.
            This is the “access × space map” layer.
          </div>
        </div>

        <div className="axw-card">
          <div style={{ fontWeight: 950 }}>What’s Already Built</div>
          <div className="axw-muted" style={{ marginTop: 6, lineHeight: 1.6 }}>
            Pass issuance, pass pages, staff verifier, kiosk mode, parking validation tokens, leads funnel, admin panels,
            pilot pack + signage routes, and analytics.
          </div>
        </div>
      </div>

      <div className="axw-card" style={{ marginTop: 14 }}>
        <div style={{ fontWeight: 950 }}>Links</div>
        <div className="axw-row" style={{ marginTop: 10 }}>
          <a className="axw-btn" href="/vc/packet">VC Packet</a>
          <a className="axw-btn" href="/vc/checklist">Launch Checklist</a>
          <a className="axw-btn" href="/case-studies/sf-pilot">SF Pilot Case Study</a>
          <a className="axw-btn axw-btn-primary" href="/contact">Book a Call</a>
        </div>
      </div>
    </main>
  );
}
