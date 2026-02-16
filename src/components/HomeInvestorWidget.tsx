"use client";

import { useMemo, useState } from "react";

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

function fmtMoney(n: number) {
  if (n >= 1_000_000_000_000) return `$${(n / 1_000_000_000_000).toFixed(2)}T`;
  if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
  if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `$${(n / 1_000).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

export default function HomeInvestorWidget() {
  const [venues, setVenues] = useState(10);
  const [monthlyARPA, setMonthlyARPA] = useState(250); // avg revenue per venue per month
  const [grossMargin, setGrossMargin] = useState(85); // %
  const [multiple, setMultiple] = useState(20); // revenue multiple (rough VC heuristic)

  const metrics = useMemo(() => {
    const v = clamp(venues, 1, 1_000_000);
    const arpa = clamp(monthlyARPA, 10, 50_000);
    const gm = clamp(grossMargin, 10, 99) / 100;
    const mult = clamp(multiple, 1, 80);

    const mrr = v * arpa;
    const arr = mrr * 12;
    const grossProfit = arr * gm;
    const impliedVal = arr * mult;

    return { v, arpa, gm, mult, mrr, arr, grossProfit, impliedVal };
  }, [venues, monthlyARPA, grossMargin, multiple]);

  return (
    <section
      id="investor"
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 18,
        padding: 18,
        background: "rgba(255,255,255,0.7)",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h2 style={{ margin: 0, fontSize: 22, letterSpacing: -0.2 }}>Investor preview</h2>
        <div style={{ fontSize: 13, opacity: 0.75 }}>
          Adjust assumptions → see how fast this scales.
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
          gap: 12,
          marginTop: 14,
        }}
      >
        <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Operating assumptions</div>

          <label style={{ display: "block", fontWeight: 800, marginTop: 10 }}>Venues onboarded: {metrics.v.toLocaleString()}</label>
          <input
            type="range"
            min={1}
            max={50000}
            value={venues}
            onChange={(e) => setVenues(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          <label style={{ display: "block", fontWeight: 800, marginTop: 10 }}>Monthly ARPA: {fmtMoney(metrics.arpa)}</label>
          <input
            type="range"
            min={10}
            max={5000}
            value={monthlyARPA}
            onChange={(e) => setMonthlyARPA(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          <label style={{ display: "block", fontWeight: 800, marginTop: 10 }}>Gross margin: {Math.round(metrics.gm * 100)}%</label>
          <input
            type="range"
            min={10}
            max={99}
            value={grossMargin}
            onChange={(e) => setGrossMargin(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          <label style={{ display: "block", fontWeight: 800, marginTop: 10 }}>Revenue multiple: {metrics.mult}×</label>
          <input
            type="range"
            min={1}
            max={80}
            value={multiple}
            onChange={(e) => setMultiple(Number(e.target.value))}
            style={{ width: "100%" }}
          />

          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75 }}>
            This is a *demo model* for narrative + direction (not financial advice).
          </div>
        </div>

        <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Outputs</div>

          <div style={{ display: "grid", gap: 8, marginTop: 10 }}>
            <Metric label="MRR" value={fmtMoney(metrics.mrr)} />
            <Metric label="ARR" value={fmtMoney(metrics.arr)} />
            <Metric label="Gross Profit (ARR × GM)" value={fmtMoney(metrics.grossProfit)} />
            <Metric label="Implied Valuation (ARR × multiple)" value={fmtMoney(metrics.impliedVal)} />
          </div>

          <div style={{ marginTop: 12, padding: 12, borderRadius: 12, background: "rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Narrative</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, opacity: 0.9 }}>
              AXW scales by turning access into a standardized coordination primitive:
              rules → token → verification → logs. Every new venue is the same playbook.
              Expansion is horizontal (more venues) and vertical (more workflows: bathrooms,
              coworking, deliveries, contractors, equipment rooms).
            </div>
          </div>
        </div>

        <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Proof-of-work links</div>

          <div style={{ display: "grid", gap: 10, marginTop: 10 }}>
            <a href="/demo" style={aStyle}>Live Demo →</a>
            <a href="/venues" style={aStyle}>Public Venue Directory →</a>
            <a href="/sf-pilot" style={aStyle}>SF Pilot Brief →</a>
            <a href="/onboarding" style={aStyle}>7-Day Pilot Onboarding →</a>
            <a href="/investors" style={aStyle}>Investor Page →</a>
          </div>

          <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
            These pages are designed to work for walk-in venue onboarding + investor diligence.
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
      <div style={{ fontSize: 13, opacity: 0.8 }}>{label}</div>
      <div style={{ fontWeight: 900 }}>{value}</div>
    </div>
  );
}

const aStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: 12,
  border: "1px solid rgba(0,0,0,0.14)",
  textDecoration: "none",
  color: "inherit",
  fontWeight: 900,
};
