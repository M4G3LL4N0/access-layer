"use client";

import React, { useMemo, useState } from "react";
import { SubpageVisual } from "@/components/SubpageVisual";

export const dynamic = "force-dynamic";

type SeedResult =
  | { ok: true; venueId: string; venueName: string; city: string; spaces: any[]; accessPoints: any[] }
  | { ok: false; error: string; detail?: string };

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [city, setCity] = useState("Los Angeles");
  const [venueName, setVenueName] = useState("AXW Demo Venue");
  const [result, setResult] = useState<SeedResult | null>(null);

  const pretty = useMemo(() => {
    if (!result) return "";
    return JSON.stringify(result, null, 2);
  }, [result]);

  async function runSeed() {
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/v3/seed", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ city, venueName }),
      });
      const data = (await res.json()) as SeedResult;
      setResult(data);
    } catch (e: any) {
      setResult({ ok: false, error: e?.message || "request failed" });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 980, margin: "0 auto", padding: 24, fontFamily: "ui-sans-serif, system-ui" }}>
      <SubpageVisual variant="default" />
      <h1 style={{ fontSize: 24, marginBottom: 10 }}>Seed</h1>
      <p style={{ opacity: 0.85, marginBottom: 18 }}>
        Creates (idempotent) a demo venue + spaces + access points in Supabase.
      </p>

      <div style={{ display: "grid", gap: 10, maxWidth: 520, marginBottom: 14 }}>
        <label style={label()}>
          City
          <input value={city} onChange={(e) => setCity(e.target.value)} style={input()} />
        </label>

        <label style={label()}>
          Venue name
          <input value={venueName} onChange={(e) => setVenueName(e.target.value)} style={input()} />
        </label>

        <button
          onClick={runSeed}
          disabled={loading}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "1px solid rgba(0,0,0,0.15)",
            background: loading ? "rgba(0,0,0,0.06)" : "black",
            color: loading ? "black" : "white",
            cursor: loading ? "default" : "pointer",
          }}
        >
          {loading ? "Seeding..." : "Run seed"}
        </button>
      </div>

      {result && (
        <div style={{ marginTop: 16 }}>
          <h2 style={{ fontSize: 16, marginBottom: 8 }}>Result</h2>
          <pre
            style={{
              padding: 14,
              borderRadius: 12,
              background: "rgba(0,0,0,0.04)",
              overflowX: "auto",
              fontSize: 12,
              lineHeight: 1.35,
            }}
          >
            {pretty}
          </pre>

          {"ok" in result && result.ok && (
            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={`/v/${result.venueId}`} style={linkBtn()}>View venue</a>
              <a href={`/admin/venues/${result.venueId}`} style={linkBtn()}>Admin venue</a>
              <a href={`/admin/access-points/${result.venueId}`} style={linkBtn()}>Access points</a>
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function label(): React.CSSProperties {
  return { display: "grid", gap: 6, fontSize: 13 };
}

function input(): React.CSSProperties {
  return {
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.15)",
    outline: "none",
  };
}

function linkBtn(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.15)",
    textDecoration: "none",
    color: "black",
    background: "white",
  };
}
