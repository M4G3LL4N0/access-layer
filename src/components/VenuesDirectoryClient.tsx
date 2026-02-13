"use client";

import { useMemo, useState } from "react";

type VenueRow = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  region: string | null;
  category: string | null;
  status: string;
};

export default function VenuesDirectoryClient({
  venues,
}: {
  venues: VenueRow[];
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return venues;
    return venues.filter((v) => {
      const hay = [
        v.name,
        v.address ?? "",
        v.city ?? "",
        v.region ?? "",
        v.category ?? "",
      ]
        .join(" ")
        .toLowerCase();
      return hay.includes(s);
    });
  }, [q, venues]);

  return (
    <div style={{ marginTop: 16 }}>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search venues (name, neighborhood, city)…"
        style={{
          width: "100%",
          maxWidth: 520,
          padding: "10px 12px",
          borderRadius: 10,
          border: "1px solid var(--card-border)",
          outline: "none",
        }}
      />

      <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>
        Showing {filtered.length} of {venues.length}
      </div>

      <ul style={{ paddingLeft: 18, marginTop: 14 }}>
        {filtered.map((v) => (
          <li key={v.id} style={{ marginBottom: 14 }}>
            <a href={`/v/${v.id}`} style={{ fontWeight: 900 }}>
              {v.name}
            </a>
            <div style={{ opacity: 0.85 }}>
              {v.address || ""} {v.city ? `— ${v.city}` : ""} {v.region || ""}
            </div>
            <div style={{ fontSize: 12, opacity: 0.65 }}>
              {v.category || "venue"} · {v.status}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

