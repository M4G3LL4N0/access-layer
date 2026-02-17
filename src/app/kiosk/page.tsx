"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Venue = {
  id: string;
  name: string;
};

export default function KioskIndex() {
  const [venues, setVenues] = useState<Venue[]>([]);
  const [err, setErr] = useState<string | null>(null);

  async function loadVenues() {
    try {
      const res = await fetch("/api/debug/venues");
      const j = await res.json();

      if (!res.ok) throw new Error(j.error || res.statusText);
      setVenues(j);
    } catch (e: any) {
      setErr(String(e?.message || e));
    }
  }

  useEffect(() => {
    loadVenues();
  }, []);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>
        Kiosk Mode — Select Venue
      </h1>

      {err && (
        <div style={{ marginTop: 12, color: "red" }}>
          Error loading venues: {err}
        </div>
      )}

      {!venues.length && !err && <div>Loading venues…</div>}

      {venues.map((v) => (
        <div
          key={v.id}
          style={{
            border: "1px solid #ddd",
            padding: 16,
            borderRadius: 10,
            marginBottom: 12,
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700 }}>{v.name}</div>

          <div
            style={{
              marginTop: 8,
              display: "flex",
              gap: 8,
              flexWrap: "wrap",
            }}
          >
            <Link
              href={`/kiosk/${v.id}`}
              style={{
                padding: "8px 12px",
                background: "black",
                color: "white",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Standard Kiosk
            </Link>

            <Link
              href={`/kiosk/parking/${v.id}`}
              style={{
                padding: "8px 12px",
                background: "#0066cc",
                color: "white",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Parking Kiosk
            </Link>

            <Link
              href={`/kiosk/${v.id}`}
              style={{
                padding: "8px 12px",
                background: "#444",
                color: "white",
                borderRadius: 6,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              View Stats
            </Link>
          </div>
        </div>
      ))}
    </main>
  );
}
