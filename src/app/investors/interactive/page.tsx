"use client";

import { useState } from "react";
import Link from "next/link";

export default function InteractiveInvestorPage() {

  const [venues, setVenues] = useState(2500);
  const [events, setEvents] = useState(35);
  const [revPerEvent, setRevPerEvent] = useState(0.25);
  const [attach, setAttach] = useState(45);
  const [multiple, setMultiple] = useState(18);

  const totalEventsPerDay = venues * events;
  const monetizedPerDay = totalEventsPerDay * (attach / 100);
  const annualRevenue = monetizedPerDay * revPerEvent * 365;
  const valuation = annualRevenue * multiple;

  return (
    <main style={{ padding: 40, maxWidth: 1100 }}>
      <h1 style={{ fontSize: 32, fontWeight: 800 }}>
        Access ↔ Space is a Universal Primitive
      </h1>

      <div style={{ marginTop: 30, display: "grid", gap: 20 }}>
        <Stat label="Total events/day" value={totalEventsPerDay.toLocaleString()} />
        <Stat label="Monetized/day" value={monetizedPerDay.toLocaleString()} />
        <Stat label="Annual revenue" value={`$${(annualRevenue/1000000).toFixed(2)}M`} />
        <Stat label="Valuation" value={`$${(valuation/1000000).toFixed(2)}M`} />
      </div>

      <Slider label="Live venues" value={venues} setValue={setVenues} max={200000} />
      <Slider label="Events per venue/day" value={events} setValue={setEvents} max={200} />
      <Slider label="Revenue per event ($)" value={revPerEvent} setValue={setRevPerEvent} max={5} step={0.05} />
      <Slider label="Attach rate (%)" value={attach} setValue={setAttach} max={100} />
      <Slider label="Revenue multiple" value={multiple} setValue={setMultiple} max={40} />

      <div style={{ marginTop: 40 }}>
        <Link href="/investors/2t">
          → View $2T Path Model
        </Link>
      </div>

    </main>
  );
}

function Stat({ label, value }: any) {
  return (
    <div style={{ padding: 20, border: "1px solid #ddd", borderRadius: 12 }}>
      <div style={{ fontSize: 14, color: "#666" }}>{label}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}

function Slider({ label, value, setValue, max, step=1 }: any) {
  return (
    <div style={{ marginTop: 30 }}>
      <div>{label}: {value}</div>
      <input
        type="range"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        style={{ width: "100%" }}
      />
    </div>
  );
}
