"use client";

import { useMemo, useState } from "react";

function fmtMoney(n: number) {
  const abs = Math.abs(n);
  if (abs >= 1e12) return `$${(n / 1e12).toFixed(2)}T`;
  if (abs >= 1e9) return `$${(n / 1e9).toFixed(2)}B`;
  if (abs >= 1e6) return `$${(n / 1e6).toFixed(2)}M`;
  if (abs >= 1e3) return `$${(n / 1e3).toFixed(2)}K`;
  return `$${n.toFixed(0)}`;
}

function pct(n: number) {
  return `${(n * 100).toFixed(2)}%`;
}

export default function InvestorModelPage() {
  // “Market” knobs (toy model, VC-friendly)
  const [globalLocations, setGlobalLocations] = useState(300_000_000); // “access points”
  const [penetration, setPenetration] = useState(0.005); // % of access points onboarded
  const [avgMonthlyRevPerLocation, setAvgMonthlyRevPerLocation] = useState(49); // blended
  const [grossMargin, setGrossMargin] = useState(0.85);
  const [opexPctOfRev, setOpexPctOfRev] = useState(0.35);
  const [evToRevMultiple, setEvToRevMultiple] = useState(20);

  // Expansion knobs
  const [attachParking, setAttachParking] = useState(true);
  const [attachKiosk, setAttachKiosk] = useState(true);
  const [attachDoors, setAttachDoors] = useState(true);

  const computed = useMemo(() => {
    const onboarded = Math.round(globalLocations * penetration);

    // Simple “attach-rate uplift”
    let uplift = 1.0;
    if (attachParking) uplift += 0.25;
    if (attachKiosk) uplift += 0.15;
    if (attachDoors) uplift += 0.20;

    const mrr = onboarded * avgMonthlyRevPerLocation * uplift;
    const arr = mrr * 12;

    const grossProfit = arr * grossMargin;
    const opex = arr * opexPctOfRev;
    const operatingIncome = grossProfit - opex;

    const impliedEV = arr * evToRevMultiple;

    return {
      onboarded,
      uplift,
      mrr,
      arr,
      grossProfit,
      operatingIncome,
      impliedEV,
    };
  }, [
    globalLocations,
    penetration,
    avgMonthlyRevPerLocation,
    grossMargin,
    opexPctOfRev,
    evToRevMultiple,
    attachParking,
    attachKiosk,
    attachDoors,
  ]);

  return (
    <main
      style={{
        padding: 24,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <header style={{ marginBottom: 18 }}>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 900 }}>
            Investor Model (Interactive)
          </h1>
          <p style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.5 }}>
            A VC-friendly sandbox to communicate scale: onboard access points,
            monetize via subscriptions + modules (parking, kiosk, doors), and
            compound into a global access infrastructure layer.
          </p>
        </header>

        {/* Top KPIs */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: 12,
            marginBottom: 16,
          }}
        >
          {[
            { k: "Onboarded locations", v: computed.onboarded.toLocaleString() },
            { k: "MRR", v: fmtMoney(computed.mrr) },
            { k: "ARR", v: fmtMoney(computed.arr) },
            { k: "Implied EV", v: fmtMoney(computed.impliedEV) },
          ].map((x) => (
            <div
              key={x.k}
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 14,
                padding: 14,
                background: "white",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 800 }}>
                {x.k}
              </div>
              <div style={{ fontSize: 22, fontWeight: 950, marginTop: 6 }}>
                {x.v}
              </div>
            </div>
          ))}
        </section>

        {/* Controls */}
        <section
          style={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 14,
            padding: 14,
            background: "white",
            marginBottom: 16,
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950 }}>
            Assumptions
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 12,
              marginTop: 12,
            }}
          >
            <SliderRow
              label="Global access points (locations)"
              value={globalLocations}
              setValue={setGlobalLocations}
              min={10_000_000}
              max={800_000_000}
              step={1_000_000}
              display={(v) => v.toLocaleString()}
            />

            <SliderRow
              label="Penetration (onboarded %)"
              value={penetration}
              setValue={setPenetration}
              min={0.0005}
              max={0.05}
              step={0.0005}
              display={(v) => pct(v)}
            />

            <SliderRow
              label="Avg monthly revenue per location (blended)"
              value={avgMonthlyRevPerLocation}
              setValue={setAvgMonthlyRevPerLocation}
              min={9}
              max={299}
              step={1}
              display={(v) => `$${v.toFixed(0)}/mo`}
            />

            <SliderRow
              label="Gross margin"
              value={grossMargin}
              setValue={setGrossMargin}
              min={0.5}
              max={0.95}
              step={0.01}
              display={(v) => pct(v)}
            />

            <SliderRow
              label="OpEx (% of revenue)"
              value={opexPctOfRev}
              setValue={setOpexPctOfRev}
              min={0.1}
              max={0.7}
              step={0.01}
              display={(v) => pct(v)}
            />

            <SliderRow
              label="EV / ARR multiple"
              value={evToRevMultiple}
              setValue={setEvToRevMultiple}
              min={3}
              max={40}
              step={1}
              display={(v) => `${v.toFixed(0)}x`}
            />
          </div>

          <div style={{ marginTop: 14 }}>
            <div style={{ fontWeight: 950, marginBottom: 8 }}>
              Expansion modules (uplift)
            </div>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Toggle
                label="Parking validation"
                checked={attachParking}
                setChecked={setAttachParking}
              />
              <Toggle
                label="Kiosk issuance"
                checked={attachKiosk}
                setChecked={setAttachKiosk}
              />
              <Toggle
                label="Door/room access"
                checked={attachDoors}
                setChecked={setAttachDoors}
              />
            </div>

            <div style={{ marginTop: 10, opacity: 0.75, fontSize: 13 }}>
              Current uplift multiplier: <b>{computed.uplift.toFixed(2)}×</b>
            </div>
          </div>
        </section>

        {/* Output breakdown */}
        <section
          style={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 14,
            padding: 14,
            background: "white",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950 }}>
            Output (one snapshot)
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 12,
              marginTop: 12,
            }}
          >
            <Stat k="Gross profit" v={fmtMoney(computed.grossProfit)} />
            <Stat k="Operating income" v={fmtMoney(computed.operatingIncome)} />
            <Stat k="Notes" v={"Toy model for narrative. Real model: cohorts + pricing tiers + churn + CAC + attach rates."} />
          </div>

          <div style={{ marginTop: 12, fontSize: 13, opacity: 0.8, lineHeight: 1.5 }}>
            This page exists to show investors you’re building an{" "}
            <b>access infrastructure layer</b> that can expand horizontally
            (more access types) and vertically (verification, devices, logs,
            compliance).
          </div>
        </section>
      </div>
    </main>
  );
}

function Stat({ k, v }: { k: string; v: string }) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 12, padding: 12 }}>
      <div style={{ fontSize: 12, opacity: 0.7, fontWeight: 900 }}>{k}</div>
      <div style={{ marginTop: 6, fontWeight: 900, lineHeight: 1.25 }}>{v}</div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  setChecked,
}: {
  label: string;
  checked: boolean;
  setChecked: (v: boolean) => void;
}) {
  return (
    <button
      onClick={() => setChecked(!checked)}
      style={{
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.14)",
        background: checked ? "black" : "white",
        color: checked ? "white" : "black",
        fontWeight: 900,
        cursor: "pointer",
      }}
    >
      {checked ? "✓ " : ""}{label}
    </button>
  );
}

function SliderRow({
  label,
  value,
  setValue,
  min,
  max,
  step,
  display,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
  display: (v: number) => string;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.10)",
        borderRadius: 12,
        padding: 12,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
        <div style={{ fontWeight: 950 }}>{label}</div>
        <div style={{ fontWeight: 950, opacity: 0.85 }}>{display(value)}</div>
      </div>

      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%", marginTop: 10 }}
      />

      <div style={{ display: "flex", justifyContent: "space-between", opacity: 0.6, fontSize: 12, marginTop: 6 }}>
        <span>{display(min)}</span>
        <span>{display(max)}</span>
      </div>
    </div>
  );
}
