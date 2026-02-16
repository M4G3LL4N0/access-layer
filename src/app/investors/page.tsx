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

type MixKey = "restroom" | "cowork" | "office" | "event" | "enterprise" | "mixed";

type MixPreset = {
  key: MixKey;
  label: string;
  desc: string;
  // Suggested slider adjustments (still editable)
  eventsPerVenuePerDay: number;
  revPerEvent: number;
  attachRate: number; // %
  grossMargin: number; // %
  multiple: number; // x
};

const MIXES: MixPreset[] = [
  {
    key: "restroom",
    label: "Restrooms / public amenities",
    desc: "High-frequency, low $/event. Density + kiosks + staff verification.",
    eventsPerVenuePerDay: 80,
    revPerEvent: 0.12,
    attachRate: 35,
    grossMargin: 82,
    multiple: 14,
  },
  {
    key: "cowork",
    label: "Cowork / workspace",
    desc: "Moderate frequency, stronger SaaS + memberships + visitor verification.",
    eventsPerVenuePerDay: 45,
    revPerEvent: 0.35,
    attachRate: 55,
    grossMargin: 85,
    multiple: 18,
  },
  {
    key: "office",
    label: "Offices / property ops",
    desc: "Lower frequency, higher contract value, integrations and compliance.",
    eventsPerVenuePerDay: 25,
    revPerEvent: 0.60,
    attachRate: 65,
    grossMargin: 88,
    multiple: 20,
  },
  {
    key: "event",
    label: "Events / venues / festivals",
    desc: "Spiky traffic; verification at entry; QR + staff scanning is core.",
    eventsPerVenuePerDay: 180,
    revPerEvent: 0.18,
    attachRate: 40,
    grossMargin: 80,
    multiple: 16,
  },
  {
    key: "enterprise",
    label: "Enterprise / infrastructure partners",
    desc: "Low event count per site but high ACV; long contracts; strong multiples.",
    eventsPerVenuePerDay: 12,
    revPerEvent: 1.25,
    attachRate: 70,
    grossMargin: 90,
    multiple: 24,
  },
  {
    key: "mixed",
    label: "Mixed network (default)",
    desc: "Blended portfolio — the ‘universal access layer’ story.",
    eventsPerVenuePerDay: 35,
    revPerEvent: 0.25,
    attachRate: 45,
    grossMargin: 85,
    multiple: 18,
  },
];

type Scenario = {
  key: string;
  label: string;
  venues: number;
  years: number;
  note: string;
};

const SCENARIOS: Scenario[] = [
  { key: "pilot", label: "Pilot", venues: 25, years: 1, note: "7-day pilots + density wedge. Prove value." },
  { key: "city", label: "City cluster", venues: 250, years: 2, note: "Neighborhood density → onboarding flywheel." },
  { key: "regional", label: "Regional", venues: 2500, years: 4, note: "Multi-vertical expansion + integrations." },
  { key: "national", label: "National", venues: 25000, years: 6, note: "Standardize verification + policy layer." },
  { key: "global", label: "Global", venues: 250000, years: 8, note: "Partner distribution + enterprise accounts." },
];

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

function btn(kind: "primary" | "ghost") {
  const base = {
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 950 as const,
    border: "1px solid rgba(0,0,0,0.14)",
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
  };
  if (kind === "primary") return { ...base, background: "black", color: "white" };
  return { ...base, background: "white", color: "black" };
}

function Chip({
  active,
  label,
  onClick,
}: {
  active: boolean;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        borderRadius: 999,
        padding: "8px 12px",
        border: "1px solid rgba(0,0,0,0.14)",
        background: active ? "black" : "white",
        color: active ? "white" : "black",
        fontWeight: 950,
        cursor: "pointer",
      }}
    >
      {label}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 14, background: "white" }}>
      <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 950 }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 950, letterSpacing: -0.6, marginTop: 4 }}>{value}</div>
    </div>
  );
}

function Slider({
  label,
  help,
  value,
  min,
  max,
  step,
  fmt,
  onChange,
}: {
  label: string;
  help: string;
  value: number;
  min: number;
  max: number;
  step: number;
  fmt: (v: number) => string;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 950 }}>{label}</div>
        <div style={{ fontWeight: 950, opacity: 0.9 }}>{fmt(value)}</div>
      </div>
      <div style={{ fontSize: 12, opacity: 0.72, marginTop: 3, lineHeight: 1.35 }}>{help}</div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: "100%", marginTop: 10 }}
      />
    </div>
  );
}

export default function InvestorsPage() {
  const [mix, setMix] = useState<MixKey>("mixed");

  // Inputs
  const [venues, setVenues] = useState(2500);
  const [eventsPerVenuePerDay, setEventsPerVenuePerDay] = useState(35);
  const [revPerEvent, setRevPerEvent] = useState(0.25);
  const [attachRate, setAttachRate] = useState(45);
  const [grossMargin, setGrossMargin] = useState(85);
  const [years, setYears] = useState(7);
  const [multiple, setMultiple] = useState(18);

  const model = useMemo(() => {
    const monetizedRate = clamp(attachRate / 100, 0, 1);
    const gm = clamp(grossMargin / 100, 0, 1);

    const totalEventsPerDay = venues * eventsPerVenuePerDay;
    const monetizedEventsPerDay = totalEventsPerDay * monetizedRate;

    const annualRevenue = monetizedEventsPerDay * revPerEvent * 365;
    const grossProfit = annualRevenue * gm;
    const valuation = annualRevenue * multiple;

    // “2T path” readout: solve for venues needed at current assumptions to hit 2T
    const targetValuation = 2_000_000_000_000; // 2T
    const neededRevenue = targetValuation / Math.max(1, multiple);
    const neededMonetizedEventsPerDay = neededRevenue / (Math.max(0.01, revPerEvent) * 365);
    const neededTotalEventsPerDay = neededMonetizedEventsPerDay / Math.max(0.01, monetizedRate);
    const neededVenues = neededTotalEventsPerDay / Math.max(1, eventsPerVenuePerDay);

    const defensibilityIndex =
      Math.log10(Math.max(1, venues)) * (1 + monetizedRate) * (1 + gm) * (1 + Math.log10(Math.max(1, multiple)));

    return {
      totalEventsPerDay,
      monetizedEventsPerDay,
      annualRevenue,
      grossProfit,
      valuation,
      targetValuation,
      neededVenues,
      neededTotalEventsPerDay,
      defensibilityIndex,
    };
  }, [venues, eventsPerVenuePerDay, revPerEvent, attachRate, grossMargin, multiple]);

  function applyMix(key: MixKey) {
    const p = MIXES.find((x) => x.key === key) || MIXES[MIXES.length - 1];
    setMix(key);
    setEventsPerVenuePerDay(p.eventsPerVenuePerDay);
    setRevPerEvent(p.revPerEvent);
    setAttachRate(p.attachRate);
    setGrossMargin(p.grossMargin);
    setMultiple(p.multiple);
  }

  function applyScenario(key: string) {
    const s = SCENARIOS.find((x) => x.key === key);
    if (!s) return;
    setVenues(s.venues);
    setYears(s.years);
  }

  const mixPreset = MIXES.find((m) => m.key === mix) || MIXES[MIXES.length - 1];

  // Roadmap cards (simple but punchy)
  const roadmap = useMemo(() => {
    const target = clamp(years, 1, 12);
    const stages = [
      { title: "Pilot", desc: "Signage + kiosk pass issuance + staff verification + audit logs." },
      { title: "Density", desc: "Neighborhood cluster; referral + onboarding; repeatable installs." },
      { title: "Multi-vertical", desc: "Restrooms, cowork, offices, events; common policy primitives." },
      { title: "Trust graph", desc: "Cross-venue verification patterns; identity + logs compound." },
      { title: "Integrations", desc: "Property ops, access controllers, check-in workflows, payments." },
      { title: "Enterprise deals", desc: "Portfolio operators; standardized compliance; SLAs." },
      { title: "Global rollouts", desc: "Local partners; multi-region reliability; standardized onboarding." },
    ];

    const out: { year: number; title: string; desc: string }[] = [];
    for (let i = 0; i < target; i++) {
      const s = stages[Math.min(i, stages.length - 1)];
      out.push({ year: i + 1, title: s.title, desc: s.desc });
    }
    return out;
  }, [years]);

  return (
    <main style={{ padding: 18, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto" }}>
        {/* Top header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
          <div style={{ minWidth: 280, flex: 1 }}>
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 900, letterSpacing: 0.2 }}>AXW / INVESTORS</div>
            <h1 style={{ margin: "6px 0 6px", fontSize: 40, letterSpacing: -1.2, lineHeight: 1.05 }}>
              Access ↔ Space is a universal primitive.
            </h1>
            <p style={{ margin: 0, maxWidth: 860, opacity: 0.85, lineHeight: 1.5 }}>
              This is an <b>interactive pitch model</b>. Tune venue scale, access frequency, monetization, and valuation multiple
              to explore why AXW becomes a network once density and verification are standardized.
            </p>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/investors/model" style={btn("ghost")}>
              Clean model →
            </a>
            <a href="/demo" style={btn("primary")}>
              View demo →
            </a>
          </div>
        </div>

        {/* Key stats */}
        <div style={{ marginTop: 14, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 12 }}>
          <Stat label="Total events/day" value={fmtInt(model.totalEventsPerDay)} />
          <Stat label="Monetized events/day" value={fmtInt(model.monetizedEventsPerDay)} />
          <Stat label="Annual revenue (simple)" value={fmtMoney(model.annualRevenue)} />
          <Stat label="Valuation (rev multiple)" value={fmtMoney(model.valuation)} />
        </div>

        {/* Responsive two-column: sliders / narrative */}
        <div
          style={{
            marginTop: 12,
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr)",
            gap: 12,
          }}
        >
          {/* On wide screens, split */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "minmax(0, 1fr)",
              gap: 12,
            }}
          >
            {/* Use CSS-like logic via media query-ish approach: keep it simple with stacking,
                but we provide a "wide" container that still looks clean. */}
            <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: 12 }}>
              {/* Controls + narrative side-by-side on wide screens using a flexible grid */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr)",
                  gap: 12,
                }}
              >
                {/* Controls */}
                <section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
                  <div style={{ fontWeight: 950, marginBottom: 6, letterSpacing: -0.3 }}>Scenario engine</div>
                  <div style={{ fontSize: 13, opacity: 0.75, lineHeight: 1.35 }}>
                    Pick a <b>vertical mix</b> and a <b>scenario</b>, then adjust sliders.
                    This is built for demos — fast to understand, fast to update.
                  </div>

                  {/* Mix chips */}
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 950, marginBottom: 8 }}>Vertical mix</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {MIXES.map((m) => (
                        <Chip key={m.key} active={mix === m.key} label={m.label} onClick={() => applyMix(m.key)} />
                      ))}
                    </div>
                    <div style={{ marginTop: 8, fontSize: 12, opacity: 0.75, lineHeight: 1.35 }}>
                      <b>{mixPreset.label}:</b> {mixPreset.desc}
                    </div>
                  </div>

                  {/* Scenario chips */}
                  <div style={{ marginTop: 14 }}>
                    <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 950, marginBottom: 8 }}>Scale scenario</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      {SCENARIOS.map((s) => (
                        <Chip key={s.key} active={venues === s.venues && years === s.years} label={s.label} onClick={() => applyScenario(s.key)} />
                      ))}
                    </div>
                  </div>

                  {/* Sliders */}
                  <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
                    <Slider
                      label="Live venues / sites"
                      help="Active locations in the network (venues, properties, facilities)."
                      value={venues}
                      min={25}
                      max={1000000}
                      step={25}
                      fmt={(v) => fmtInt(v)}
                      onChange={(v) => setVenues(Math.round(v))}
                    />
                    <Slider
                      label="Access events per venue per day"
                      help="Requests / verifications / kiosk grants per site per day."
                      value={eventsPerVenuePerDay}
                      min={1}
                      max={500}
                      step={1}
                      fmt={(v) => fmtInt(v)}
                      onChange={(v) => setEventsPerVenuePerDay(Math.round(v))}
                    />
                    <Slider
                      label="Revenue per monetized event"
                      help="Avg revenue per monetized verification event (fee / SaaS allocation)."
                      value={revPerEvent}
                      min={0.01}
                      max={5}
                      step={0.01}
                      fmt={(v) => `$${Number(v).toFixed(2)}`}
                      onChange={(v) => setRevPerEvent(Number(v))}
                    />
                    <Slider
                      label="Attach rate (paid workflows)"
                      help="Percent of events that are monetized."
                      value={attachRate}
                      min={5}
                      max={100}
                      step={1}
                      fmt={(v) => `${fmtInt(v)}%`}
                      onChange={(v) => setAttachRate(Math.round(v))}
                    />
                    <Slider
                      label="Gross margin"
                      help="Blended GM after infra + payments + support."
                      value={grossMargin}
                      min={40}
                      max={95}
                      step={1}
                      fmt={(v) => `${fmtInt(v)}%`}
                      onChange={(v) => setGrossMargin(Math.round(v))}
                    />
                    <Slider
                      label="Time horizon (years)"
                      help="Used for the roadmap narrative below."
                      value={years}
                      min={1}
                      max={12}
                      step={1}
                      fmt={(v) => `${fmtInt(v)}y`}
                      onChange={(v) => setYears(Math.round(v))}
                    />
                    <Slider
                      label="Revenue multiple (valuation)"
                      help="Very simplified. Use this to explore ranges."
                      value={multiple}
                      min={3}
                      max={40}
                      step={1}
                      fmt={(v) => `${fmtInt(v)}×`}
                      onChange={(v) => setMultiple(Math.round(v))}
                    />
                  </div>
                </section>

                {/* Narrative + 2T solver + roadmap + shortcuts */}
                <section style={{ display: "grid", gap: 12 }}>
                  <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
                    <div style={{ fontWeight: 950, marginBottom: 8, letterSpacing: -0.3 }}>“$2T path” scenario solver</div>
                    <div style={{ fontSize: 13, opacity: 0.82, lineHeight: 1.45 }}>
                      Given your current assumptions, here’s what would need to be true to reach a{" "}
                      <b>{fmtMoney(model.targetValuation)}</b> valuation using the chosen revenue multiple.
                      This is an exploration tool — not a prediction.
                    </div>

                    <div
                      style={{
                        marginTop: 10,
                        borderRadius: 14,
                        padding: 12,
                        background: "rgba(0,0,0,0.03)",
                        border: "1px solid rgba(0,0,0,0.06)",
                      }}
                    >
                      <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 950 }}>Required scale at current assumptions</div>
                      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 10, marginTop: 8 }}>
                        <div>
                          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 950 }}>Venues needed</div>
                          <div style={{ fontSize: 20, fontWeight: 950, letterSpacing: -0.4 }}>{fmtInt(model.neededVenues)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 950 }}>Total events/day needed</div>
                          <div style={{ fontSize: 20, fontWeight: 950, letterSpacing: -0.4 }}>{fmtInt(model.neededTotalEventsPerDay)}</div>
                        </div>
                        <div>
                          <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 950 }}>Defensibility index</div>
                          <div style={{ fontSize: 20, fontWeight: 950, letterSpacing: -0.4 }}>{model.defensibilityIndex.toFixed(2)}</div>
                        </div>
                      </div>

                      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.72, lineHeight: 1.35 }}>
                        Tip: the fastest “cheat codes” are usually <b>density</b> (more venues), <b>paid attach rate</b>, and{" "}
                        <b>enterprise revenue</b> (higher $/event or contract allocation).
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
                          <div style={{ fontWeight: 950 }}>
                            Year {r.year}: {r.title}
                          </div>
                          <div style={{ fontSize: 13, opacity: 0.82, lineHeight: 1.35, marginTop: 4 }}>{r.desc}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
                    <div style={{ fontWeight: 950, marginBottom: 6, letterSpacing: -0.3 }}>Demo shortcuts</div>
                    <div style={{ display: "grid", gap: 10 }}>
                      <a href="/venues" style={quickStyle()}>
                        Public directory →
                      </a>
                      <a href="/sf-pilot" style={quickStyle()}>
                        SF pilot brief →
                      </a>
                      <a href="/onboarding" style={quickStyle()}>
                        Onboarding →
                      </a>
                      <a href="/outreach" style={quickStyle()}>
                        Outreach kit →
                      </a>
                      <a href="/verify" style={quickStyle()}>
                        Staff verify →
                      </a>
                      <a href="/scan" style={quickStyle()}>
                        QR scan →
                      </a>
                    </div>
                  </div>
                </section>
              </div>

              {/* Pitch cards */}
              <section style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16, background: "white" }}>
                <div style={{ fontWeight: 950, marginBottom: 8, letterSpacing: -0.3 }}>How to pitch this (30 seconds)</div>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 12 }}>
                  <PitchCard title="Problem" desc="Access is fragmented, insecure, and operationally expensive. Codes leak. Enforcement is inconsistent. No universal policy layer." />
                  <PitchCard title="Product" desc="AXW issues time-bounded access passes with rules. Verification is instant. Everything is logged. No codes are published." />
                  <PitchCard title="Wedge" desc="SF pilots: restrooms + cowork + offices. Kiosk issuance + staff verification + signage + onboarding kit." />
                  <PitchCard title="Why we win" desc="Once you have density, access becomes a network. Policy + verification + analytics becomes default infrastructure." />
                </div>
              </section>

              <div style={{ opacity: 0.65, fontSize: 12 }}>
                Note: This is intentionally simplified for demo/storytelling. Use it to communicate shape + leverage fast.
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tiny responsive fix: keep things readable on dark mode by forcing white background */}
      <style>{`
        :global(html, body) { background: #fff; color: #000; }
        @media (min-width: 980px) {
          /* On wide screens, make controls + narrative two columns */
          main > div > div:nth-child(3) > div > div > div {
            grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr);
          }
        }
      `}</style>
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
