"use client";

import { useMemo, useState } from "react";

function fmtInt(n: number) {
  return Math.round(n).toLocaleString("en-US");
}
function fmtMoney(n: number) {
  if (!isFinite(n)) return "$0";
  const abs = Math.abs(n);
  if (abs >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}
function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type Slider = {
  key: string;
  label: string;
  help: string;
  min: number;
  max: number;
  step: number;
  unit?: string;
};

export default function InvestorsPage() {
  // Core sliders (kept reasonable + “shock” lever)
  const sliders: Slider[] = [
    {
      key: "venues",
      label: "Live venues / sites",
      help: "Active locations (venues, properties, facilities, campuses).",
      min: 25,
      max: 1000000,
      step: 25,
      unit: "",
    },
    {
      key: "eventsPerVenuePerDay",
      label: "Access events per venue per day",
      help: "Requests/verification events per location per day (restroom uses, door entries, kiosk grants, etc.).",
      min: 1,
      max: 500,
      step: 1,
      unit: "",
    },
    {
      key: "revPerEvent",
      label: "Revenue per access event",
      help: "Average revenue per access event (verification fee, SaaS allocation, service fee).",
      min: 0.01,
      max: 5,
      step: 0.01,
      unit: "$",
    },
    {
      key: "attachRate",
      label: "Attach rate (paid workflows)",
      help: "Percent of events that are monetized (some events may be free/ops-only).",
      min: 5,
      max: 100,
      step: 1,
      unit: "%",
    },
    {
      key: "grossMargin",
      label: "Gross margin",
      help: "Blended gross margin after infra + payment + support.",
      min: 40,
      max: 95,
      step: 1,
      unit: "%",
    },
    {
      key: "years",
      label: "Time horizon (years)",
      help: "Used for the roadmap view + scale narrative.",
      min: 1,
      max: 12,
      step: 1,
      unit: "y",
    },
    {
      key: "multiple",
      label: "Revenue multiple (valuation)",
      help: "Very simplified. Enterprise infra + network effects can trade high; use this to explore ranges.",
      min: 3,
      max: 40,
      step: 1,
      unit: "×",
    },
  ];

  // Defaults (tuned to look plausible but exciting)
  const [venues, setVenues] = useState(2500);
  const [eventsPerVenuePerDay, setEventsPerVenuePerDay] = useState(35);
  const [revPerEvent, setRevPerEvent] = useState(0.25);
  const [attachRate, setAttachRate] = useState(35);
  const [grossMargin, setGrossMargin] = useState(80);
  const [years, setYears] = useState(7);
  const [multiple, setMultiple] = useState(18);

  const state = { venues, eventsPerVenuePerDay, revPerEvent, attachRate, grossMargin, years, multiple };

  const model = useMemo(() => {
    const monetizedRate = clamp(attachRate / 100, 0, 1);
    const gm = clamp(grossMargin / 100, 0, 1);

    const eventsPerDay = venues * eventsPerVenuePerDay;
    const monetizedEventsPerDay = eventsPerDay * monetizedRate;

    const arr = monetizedEventsPerDay * revPerEvent * 365; // annual revenue (simple)
    const grossProfit = arr * gm;

    const valuation = arr * multiple;

    // Extremely simple “network narrative” index to visualize defensibility
    const networkIndex = Math.log10(Math.max(1, venues)) * (1 + monetizedRate) * (1 + gm);

    return {
      eventsPerDay,
      monetizedEventsPerDay,
      arr,
      grossProfit,
      valuation,
      networkIndex,
    };
  }, [venues, eventsPerVenuePerDay, revPerEvent, attachRate, grossMargin, multiple]);

  const roadmap = useMemo(() => {
    // A “stage-by-stage” storyline (not financial advice, just pitching narrative)
    const stages = [
      { name: "Pilot", y: 0, desc: "7-day pilots, signage + kiosk mode, pass verification, audit logs." },
      { name: "City Cluster", y: 1, desc: "Dense neighborhood coverage; referral flywheel; owner onboarding playbook." },
      { name: "Multi-Vertical", y: 2, desc: "Restrooms, coworking, offices, events, property ops, staff verification." },
      { name: "Network Effects", y: 3, desc: "Cross-venue identity + trust; shared verification + analytics layer." },
      { name: "Enterprise + Partnerships", y: 4, desc: "Controllers, access hardware, property managers, POS/workflow integrations." },
      { name: "Global Expansion", y: 5, desc: "Repeatable ops + compliance; local partnerships; multi-region reliability." },
      { name: "Category Winner", y: 6, desc: "Default standard for policy-based access + verification across spaces." },
    ];

    // Trim/extend to selected years
    const target = clamp(years, 1, 12);
    const expanded: { year: number; title: string; desc: string }[] = [];
    for (let i = 0; i < target; i++) {
      const s = stages[Math.min(i, stages.length - 1)];
      expanded.push({ year: i + 1, title: s.name, desc: s.desc });
    }
    return expanded;
  }, [years]);

  function setSlider(key: string, value: number) {
    if (key === "venues") setVenues(Math.round(value));
    if (key === "eventsPerVenuePerDay") setEventsPerVenuePerDay(Math.round(value));
    if (key === "revPerEvent") setRevPerEvent(Number(value));
    if (key === "attachRate") setAttachRate(Math.round(value));
    if (key === "grossMargin") setGrossMargin(Math.round(value));
    if (key === "years") setYears(Math.round(value));
    if (key === "multiple") setMultiple(Math.round(value));
  }

  return (
    <main style={{ padding: 22, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {/* Top */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800, letterSpacing: 0.2 }}>AXW / INVESTORS</div>
            <h1 style={{ margin: "6px 0 6px", fontSize: 40, letterSpacing: -1.2 }}>Access ↔ Space is a network.</h1>
            <p style={{ margin: 0, maxWidth: 840, opacity: 0.85, lineHeight: 1.5 }}>
              This page is a <b>VC demo model</b>. Move sliders to explore scale dynamics of policy-defined access:
              time-bounded tokens, verification, audit logs, and monetization across venues and workflows.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a
              href="/investors/model"
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Open model →
            </a>
            <a
              href="/demo"
              style={{
                padding: "10px 14px",
                borderRadius: 12,
                background: "black",
                color: "white",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              View demo →
            </a>
          </div>
        </div>

        {/* Stats strip */}
        <div
          style={{
            marginTop: 18,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          {[
            { k: "Total events/day", v: fmtInt(model.eventsPerDay) },
            { k: "Monetized events/day", v: fmtInt(model.monetizedEventsPerDay) },
            { k: "Annual revenue (simple)", v: fmtMoney(model.arr) },
            { k: "Valuation (rev multiple)", v: fmtMoney(model.valuation) },
          ].map((s) => (
            <div
              key={s.k}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 16,
                padding: 14,
                background: "white",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 900 }}>{s.k}</div>
              <div style={{ fontSize: 24, fontWeight: 950, letterSpacing: -0.6, marginTop: 4 }}>{s.v}</div>
            </div>
          ))}
        </div>

        {/* Layout: sliders + narrative */}
        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 0.9fr)", gap: 14, marginTop: 14 }}>
          {/* Sliders */}
          <section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
            <div style={{ fontWeight: 950, marginBottom: 6, letterSpacing: -0.3 }}>Interactive scale model</div>
            <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.35, marginBottom: 14 }}>
              This is intentionally simple. It’s meant to communicate the <b>shape</b> of the business and why access becomes a
              high-leverage coordination layer once you have density, verification, and trusted workflows.
            </div>

            <div style={{ display: "grid", gap: 14 }}>
              {sliders.map((s) => {
                const value =
                  s.key === "venues"
                    ? state.venues
                    : s.key === "eventsPerVenuePerDay"
                    ? state.eventsPerVenuePerDay
                    : s.key === "revPerEvent"
                    ? state.revPerEvent
                    : s.key === "attachRate"
                    ? state.attachRate
                    : s.key === "grossMargin"
                    ? state.grossMargin
                    : s.key === "years"
                    ? state.years
                    : state.multiple;

                const display =
                  s.unit === "$"
                    ? `$${Number(value).toFixed(2)}`
                    : s.unit === "%"
                    ? `${value}%`
                    : s.unit === "×"
                    ? `${value}×`
                    : s.unit === "y"
                    ? `${value}y`
                    : `${fmtInt(Number(value))}`;

                return (
                  <div key={s.key} style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ fontWeight: 950 }}>{s.label}</div>
                      <div style={{ fontWeight: 950, opacity: 0.9 }}>{display}</div>
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.72, marginTop: 3, lineHeight: 1.35 }}>{s.help}</div>
                    <input
                      type="range"
                      min={s.min}
                      max={s.max}
                      step={s.step}
                      value={value}
                      onChange={(e) => setSlider(s.key, Number(e.target.value))}
                      style={{ width: "100%", marginTop: 10 }}
                    />
                  </div>
                );
              })}
            </div>
          </section>

          {/* Narrative / Roadmap / “Why we win” */}
          <aside style={{ display: "grid", gap: 14 }}>
            <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
              <div style={{ fontWeight: 950, marginBottom: 8, letterSpacing: -0.3 }}>Why this becomes huge</div>
              <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.55, opacity: 0.92 }}>
                <li>
                  <b>Universal primitive:</b> every space has access, rules, and enforcement.
                </li>
                <li>
                  <b>Density unlocks value:</b> once venues cluster, verification + onboarding becomes a default workflow.
                </li>
                <li>
                  <b>Network effect:</b> trusted identity + logs + verification patterns compound defensibility.
                </li>
                <li>
                  <b>Monetization flexibility:</b> SaaS, per-event verification, premium rules, integrations, enterprise.
                </li>
              </ul>

              <div
                style={{
                  marginTop: 12,
                  borderRadius: 14,
                  padding: 12,
                  background: "rgba(0,0,0,0.03)",
                  border: "1px solid rgba(0,0,0,0.06)",
                }}
              >
                <div style={{ fontSize: 12, opacity: 0.75, fontWeight: 900 }}>Network defensibility index</div>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 6 }}>
                  <div style={{ flex: 1, height: 10, borderRadius: 999, background: "rgba(0,0,0,0.10)", overflow: "hidden" }}>
                    <div
                      style={{
                        width: `${clamp((model.networkIndex / 12) * 100, 2, 100)}%`,
                        height: "100%",
                        background: "black",
                      }}
                    />
                  </div>
                  <div style={{ fontWeight: 950 }}>{model.networkIndex.toFixed(2)}</div>
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
              <div style={{ fontWeight: 950, marginBottom: 8, letterSpacing: -0.3 }}>Roadmap (time horizon)</div>
              <div style={{ display: "grid", gap: 10 }}>
                {roadmap.map((r) => (
                  <div
                    key={r.year}
                    style={{
                      border: "1px solid rgba(0,0,0,0.10)",
                      borderRadius: 14,
                      padding: 12,
                      background: "white",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
                      <div style={{ fontWeight: 950 }}>
                        Year {r.year}: {r.title}
                      </div>
                    </div>
                    <div style={{ fontSize: 13, opacity: 0.82, lineHeight: 1.35, marginTop: 4 }}>{r.desc}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
              <div style={{ fontWeight: 950, marginBottom: 6, letterSpacing: -0.3 }}>Demo shortcuts</div>
              <div style={{ display: "grid", gap: 10 }}>
                <a className="quick" href="/venues" style={quickStyle()}>
                  Public directory →
                </a>
                <a className="quick" href="/sf-pilot" style={quickStyle()}>
                  SF pilot brief →
                </a>
                <a className="quick" href="/onboarding" style={quickStyle()}>
                  Onboarding →
                </a>
                <a className="quick" href="/outreach" style={quickStyle()}>
                  Outreach kit →
                </a>
              </div>
            </div>
          </aside>
        </div>

        {/* Bottom: “how to pitch this” */}
        <section style={{ marginTop: 14, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
          <div style={{ fontWeight: 950, marginBottom: 8, letterSpacing: -0.3 }}>How to pitch this in 30 seconds</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
            <PitchCard title="The problem" desc="Access is fragmented, insecure, and operationally messy. Codes leak. Staff time is wasted. There’s no universal policy layer." />
            <PitchCard title="The product" desc="AXW issues time-bounded access passes with rules. Verification is instant. Everything is logged. No codes are published." />
            <PitchCard title="The wedge" desc="SF pilots: restrooms + coworking + offices. Kiosk issuance + staff verification + signage + onboarding kit." />
            <PitchCard title="The win" desc="Once you have location density, access becomes a network. Policy + verification + analytics becomes the default infrastructure layer." />
          </div>
        </section>

        <div style={{ marginTop: 18, opacity: 0.65, fontSize: 12 }}>
          Note: This model is intentionally simplified for demo/storytelling.
        </div>
      </div>
    </main>
  );
}

function PitchCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 16, padding: 14, background: "white" }}>
      <div style={{ fontWeight: 950, marginBottom: 6 }}>{title}</div>
      <div style={{ opacity: 0.82, lineHeight: 1.45, fontSize: 14 }}>{desc}</div>
    </div>
  );
}

function quickStyle() {
  return {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    padding: "12px 14px",
    borderRadius: 14,
    border: "1px solid rgba(0,0,0,0.12)",
    background: "white",
    textDecoration: "none",
    fontWeight: 950 as const,
  };
}
