"use client";

import { useMemo, useState } from "react";

function fmtMoney(n: number) {
  if (!isFinite(n)) return "-";
  if (n >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (n >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (n >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (n >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

function Slider({
  label,
  value,
  min,
  max,
  step,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  suffix?: string;
  onChange: (v: number) => void;
}) {
  return (
    <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12 }}>
        <div style={{ fontWeight: 950 }}>{label}</div>
        <div style={{ fontVariantNumeric: "tabular-nums", opacity: 0.85 }}>
          {value.toLocaleString()}
          {suffix || ""}
        </div>
      </div>
      <input
        style={{ width: "100%", marginTop: 10 }}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
      />
      <div style={{ marginTop: 6, fontSize: 12, opacity: 0.6 }}>
        {min.toLocaleString()}
        {suffix || ""} → {max.toLocaleString()}
        {suffix || ""}
      </div>
    </div>
  );
}

function Stat({ label, value, sub }: { label: string; value: string; sub?: string }) {
  return (
    <div style={{ padding: 12, border: "1px solid #eee", borderRadius: 14, minWidth: 220 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>{label}</div>
      <div style={{ marginTop: 6, fontSize: 24, fontWeight: 950 }}>{value}</div>
      {sub && <div style={{ marginTop: 6, fontSize: 12, opacity: 0.6, lineHeight: 1.4 }}>{sub}</div>}
    </div>
  );
}

function MiniBar({ pct }: { pct: number }) {
  const p = Math.max(0, Math.min(100, pct));
  return (
    <div style={{ height: 10, borderRadius: 999, background: "#eee", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${p}%`, background: "black" }} />
    </div>
  );
}

export default function InvestorModelClient() {
  // Core assumptions
  const [venues, setVenues] = useState(10000); // active paying venues
  const [arpu, setArpu] = useState(49); // $/month per venue
  const [grossMargin, setGrossMargin] = useState(85); // %
  const [netRetention, setNetRetention] = useState(115); // % (growth)
  const [multiple, setMultiple] = useState(20); // ARR multiple

  // Expansion layer (optional paid access)
  const [paidAccessRate, setPaidAccessRate] = useState(0); // % venues that enable paid access
  const [paidAccessNet, setPaidAccessNet] = useState(200); // net $/month per enabled venue

  const model = useMemo(() => {
    const baseMRR = venues * arpu;
    const paidMRR = venues * (paidAccessRate / 100) * paidAccessNet;
    const totalMRR = baseMRR + paidMRR;

    const arr = totalMRR * 12;
    const grossProfit = arr * (grossMargin / 100);
    const impliedVal = arr * multiple;

    // “Roadmap velocity” proxy using NRR
    const yoyGrowthFactor = netRetention / 100;
    const nextYearARR = arr * yoyGrowthFactor;

    return {
      baseMRR,
      paidMRR,
      totalMRR,
      arr,
      grossProfit,
      impliedVal,
      nextYearARR,
    };
  }, [venues, arpu, grossMargin, netRetention, multiple, paidAccessRate, paidAccessNet]);

  const paidMixPct =
    model.totalMRR > 0 ? Math.round((model.paidMRR / model.totalMRR) * 100) : 0;

  return (
    <div style={{ marginTop: 16, display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        <Slider label="Active paying venues" value={venues} min={100} max={10000000} step={100} onChange={setVenues} />
        <Slider label="Owner ARPU / month" value={arpu} min={10} max={300} step={1} suffix="$" onChange={setArpu} />
        <Slider label="Gross margin" value={grossMargin} min={40} max={95} step={1} suffix="%" onChange={setGrossMargin} />
        <Slider label="Net retention (NRR)" value={netRetention} min={80} max={140} step={1} suffix="%" onChange={setNetRetention} />
        <Slider label="Valuation multiple (ARR)" value={multiple} min={5} max={40} step={1} suffix="x" onChange={setMultiple} />
      </div>

      <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Optional paid access layer (future)</div>
        <div style={{ marginTop: 10, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
          <Slider label="% venues enabling paid access" value={paidAccessRate} min={0} max={100} step={1} suffix="%" onChange={setPaidAccessRate} />
          <Slider label="Net $/month per enabled venue" value={paidAccessNet} min={0} max={2000} step={10} suffix="$" onChange={setPaidAccessNet} />
        </div>

        <div style={{ marginTop: 12, opacity: 0.85, lineHeight: 1.6 }}>
          Paid access should be opt-in, policy-driven, and defensible (verification, audit, incident controls).
          This is modeled as “net revenue per enabled venue.”
        </div>
      </div>

      <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
        <Stat label="MRR (base)" value={fmtMoney(model.baseMRR)} sub="venues × ARPU" />
        <Stat label="MRR (paid layer)" value={fmtMoney(model.paidMRR)} sub={`${paidMixPct}% of total MRR`} />
        <Stat label="ARR" value={fmtMoney(model.arr)} sub="Total MRR × 12" />
        <Stat label="Gross profit / yr" value={fmtMoney(model.grossProfit)} sub={`${grossMargin}% GM`} />
        <Stat label="Implied valuation" value={fmtMoney(model.impliedVal)} sub={`${multiple}× ARR (scenario)`} />
        <Stat label="Next-year ARR (NRR proxy)" value={fmtMoney(model.nextYearARR)} sub={`${netRetention}% NRR`} />
      </div>

      <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Mix visualization</div>
        <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
          <div style={{ opacity: 0.8 }}>Revenue mix: paid layer share</div>
          <MiniBar pct={paidMixPct} />
          <div style={{ fontSize: 12, opacity: 0.65 }}>
            Use this to show how “owner SaaS” becomes the base layer and “access marketplace” becomes an expansion layer.
          </div>
        </div>
      </div>

      <div style={{ padding: 16, border: "1px solid #eee", borderRadius: 16 }}>
        <div style={{ fontWeight: 950, fontSize: 18 }}>Roadmap to scale (credible)</div>
        <ol style={{ marginTop: 10, lineHeight: 1.9, opacity: 0.9 }}>
          <li><b>Corridor density</b>: 20–50 venues in SF corridors + consistent token volume.</li>
          <li><b>Owner controls</b>: verified owners, rule editor, audit, exports → convert to Pro.</li>
          <li><b>Multi-site</b>: chains and campuses, roles + compliance reporting.</li>
          <li><b>Integrations</b>: property management + access hardware → operational lock-in.</li>
          <li><b>Marketplace layer</b>: optional paid access + insurance-like controls.</li>
        </ol>
      </div>
    </div>
  );
}
