"use client";

import React from "react";

type VenueLike = {
  id?: string;
  name?: string;
  lat?: number | null;
  lng?: number | null;
  [key: string]: any;
};

export default function VenuesMap({ venues }: { venues: VenueLike[] }) {
  // Minimal placeholder map so builds pass.
  // You can replace this later with Mapbox/Google Maps/etc.
  const count = Array.isArray(venues) ? venues.length : 0;

  return (
    <div
      style={{
        width: "100%",
        minHeight: 260,
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 12,
        padding: 14,
      }}
    >
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Venues Map</div>
      <div style={{ opacity: 0.8, marginBottom: 12 }}>
        Map placeholder (build-safe). Venues loaded: {count}
      </div>

      <div style={{ display: "grid", gap: 8 }}>
        {(venues || []).slice(0, 12).map((v, i) => (
          <div
            key={v?.id || String(i)}
            style={{
              padding: 10,
              border: "1px solid rgba(0,0,0,0.10)",
              borderRadius: 10,
            }}
          >
            <div style={{ fontWeight: 600 }}>{v?.name || "Unnamed venue"}</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>
              {v?.lat != null && v?.lng != null
                ? `(${v.lat}, ${v.lng})`
                : "No coordinates"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
