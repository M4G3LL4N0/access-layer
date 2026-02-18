"use client";

import { useEffect, useState } from "react";

type Metrics = {
  venues: number;
  passes: number;
  parkingEvents?: number;
};

export default function LiveMetrics() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/metrics/global");
        const json = await res.json();

        if (!json.ok) {
          setError("Failed to load metrics");
          return;
        }

        setMetrics(json.metrics);
      } catch (e: any) {
        setError(e?.message || "Error loading metrics");
      }
    }

    load();
  }, []);

  if (error) {
    return <div style={{ color: "red" }}>{error}</div>;
  }

  if (!metrics) {
    return <div>Loading network metrics…</div>;
  }

  return (
    <div
      style={{
        display: "flex",
        gap: 40,
        flexWrap: "wrap",
        marginTop: 20,
      }}
    >
      <MetricBox label="Active Venues" value={metrics.venues} />
      <MetricBox label="Passes Issued" value={metrics.passes} />
      <MetricBox label="Parking Events" value={metrics.parkingEvents || 0} />
    </div>
  );
}

function MetricBox({ label, value }: { label: string; value: number }) {
  return (
    <div
      style={{
        minWidth: 140,
        padding: 20,
        borderRadius: 16,
        border: "1px solid rgba(0,0,0,0.1)",
        background: "white",
        boxShadow: "0 4px 14px rgba(0,0,0,0.05)",
      }}
    >
      <div style={{ fontSize: 28, fontWeight: 800 }}>{value}</div>
      <div style={{ fontSize: 13, opacity: 0.6 }}>{label}</div>
    </div>
  );
}
