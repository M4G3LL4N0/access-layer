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

export default function InvestorsModelPage() {
  const [venues, setVenues] = useState(2500);
  const [eventsPerVenuePerDay, setEventsPerVenuePerDay] = useState(35);
  const [revPerEvent, setRevPerEvent] = useState(0.25);
  const [attachRate, setAttachRate] = useState(35);
  const [grossMargin, setGrossMargin] = useState(80);
  const [multiple, setMultiple] = useState(18);

  const m = useMemo(() => {
    const monetizedRate = clamp(attachRate / 100, 0, 1);
    const gm = clamp(grossMargin / 100, 0, 1);

    const eventsPerDay = venues * eventsPerVenuePerDay;
    const monetizedEventsPerDay = eventsPerDay * monetizedRate;

    const annualRevenue = monetizedEventsPerDay * revPerEvent * 365;
    const grossProfit = annualRevenue * gm;
    const valuation = annualRevenue * multiple;

    return { eventsPerDay, monetizedEventsPerDay, annualRevenue, grossProfit, valuation };
  }, [venues, eventsPerVenuePerDay, revPerEvent, attachRate, grossMargin, multiple]);

  return (
    <main style={{ padding: 22, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 900 }}>AXW / MODEL</div>
            <h1 style={{ margin: "6px 0 6px", fontSize: 34, letterSpacing: -1.0 }}>Investor model (simple)</h1>
            <p style={{ margin: 0, opacity: 0.82, lineHeight: 1.5 }}>
              A clean version of the slider model. Use <a href="/investors" style={{ fontWeight: 900 }}>the investor page</a> for the full pitch narrative.
            </p>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <a href="/investors" style={btn("ghost")}>
              Investor page →
            </a>
            <a href="/demo" style={btn("primary")}>
              View demo →
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: 16,
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
          }}
        >
          <Stat label="Total events/day" value={fmtInt(m.eventsPerDay)} />
          <Stat label="Monetized events/day" value={fmtInt(m.monetizedEventsPerDay)} />
          <Stat label="Annual revenue" value={fmtMoney(m.annualRevenue)} />
          <Stat label="Valuation" value={fmtMoney(m.valuation)} />
        </div>

        <div style={{ marginTop: 14, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 18, padding: 16 }}>
          <div style={{ fontWeight: 950, marginBottom: 10 }}>Inputs</div>

          <Slider label="Venues / sites" value={venues} min={25} max={1000000} step={25} onChange={setVenues} fmt={(v) => fmtInt(v)} />
          <Slider
            label="Events per venue per day"
            value={eventsPerVenuePerDay}
            min={1}
            max={500}
            step={1}
            onChange={setEventsPerVenuePerDay}
            fmt={(v) => fmtInt(v)}
          />
          <Slider
            label="Revenue per monetized event ($)"
            value={revPerEvent}
            min={0.01}
            max={5}
            step={0.01}
            onChange={setRevPerEvent}
            fmt={(v) => `$${Number(v).toFixed(2)}`}
          />
          <Slider
            label="Attach rate (%)"
            value={attachRate}
            min={5}
            max={100}
            step={1}
            onChange={setAttachRate}
            fmt={(v) => `${fmtInt(v)}%`}
          />
          <Slider
            label="Gross margin (%)"
            value={grossMargin}
            min={40}
            max={95}
            step={1}
            onChange={setGrossMargin}
            fmt={(v) => `${fmtInt(v)}%`}
          />
          <Slider
            label="Revenue multiple (×)"
            value={multiple}
            min={3}
            max={40}
            step={1}
            onChange={setMultiple}
            fmt={(v) => `${fmtInt(v)}×`}
          />
        </div>

        <div style={{ marginTop: 12, opacity: 0.65, fontSize: 12 }}>
          This model is intentionally simplified for storytelling.
        </div>
      </div>
    </main>
  );
}

function btn(kind: "primary" | "ghost") {
  const base = {
    padding: "10px 14px",
    borderRadius: 12,
    textDecoration: "none",
    fontWeight: 950 as const,
    border: "1px solid rgba(0,0,0,0.14)",
  };
  if (kind === "primary") return { ...base, background: "black", color: "white" };
  return { ...base, background: "white", color: "black" };
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
  value,
  min,
  max,
  step,
  onChange,
  fmt,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
  fmt: (v: number) => string;
}) {
  return (
    <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 12, marginTop: 10 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 950 }}>{label}</div>
        <div style={{ fontWeight: 950, opacity: 0.9 }}>{fmt(value)}</div>
      </div>
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
