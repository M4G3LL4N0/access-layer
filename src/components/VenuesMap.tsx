"use client";

import React from "react";

type Venue = {
  id: string;
  name?: string | null;
  city?: string | null;
  region?: string | null;
  lat?: number | null;
  lng?: number | null;
};

export default function VenuesMap(props: { venues: Venue[] }) {
  const venues = props.venues ?? [];

  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 12, padding: 12 }}>
      <div style={{ fontWeight: 700, marginBottom: 8 }}>Map</div>
      <div style={{ fontSize: 13, opacity: 0.75, marginBottom: 10 }}>
        Minimal placeholder. Wire real map later.
      </div>
      <div style={{ display: "grid", gap: 8 }}>
        {venues.slice(0, 20).map((v) => (
          <div key={v.id} style={{ padding: 10, borderRadius: 10, background: "rgba(0,0,0,0.04)" }}>
            <div style={{ fontWeight: 700 }}>{v.name ?? "Unnamed venue"}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {(v.city ?? "") + (v.region ? `, ${v.region}` : "")}
            </div>
          </div>
        ))}
        {venues.length === 0 ? <div style={{ opacity: 0.7 }}>No venues to display.</div> : null}
      </div>
    </div>
  );
}
