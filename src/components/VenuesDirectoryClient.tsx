"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

export type Venue = {
  id: string;
  name: string;
  address?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  lat?: number | null;
  lng?: number | null;
  category?: string | null;
  status?: string | null;
};

type Props = {
  venues: Venue[];
  title?: string;
  subtitle?: string;
  initialCategory?: string;
  showCategoryTabs?: boolean;
};

const CATEGORIES = ["all", "restroom", "workspace", "office", "parking"];

export default function VenuesDirectoryClient({
  venues,
  title = "Public Venue Directory",
  subtitle = "Active venues participating in the Access ↔ Space pilot.",
  initialCategory = "all",
  showCategoryTabs = true,
}: Props) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState(initialCategory);

  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    return (venues || [])
      .filter((v) => (v.status || "active") === "active")
      .filter((v) => {
        if (!term) return true;
        const blob = [
          v.name,
          v.city,
          v.region,
          v.address,
          v.category,
          v.country,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return blob.includes(term);
      })
      .filter((v) => {
        if (cat === "all") return true;
        return (v.category || "").toLowerCase() === cat;
      });
  }, [venues, q, cat]);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 1100, margin: "0 auto" }}>
      <header style={{ marginBottom: 14 }}>
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900 }}>{title}</h1>
        <p style={{ margin: "8px 0 0", opacity: 0.75 }}>{subtitle}</p>
      </header>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", marginBottom: 12 }}>
        <Link href="/" style={{ opacity: 0.85, textDecoration: "none", fontWeight: 800 }}>
          Home
        </Link>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search venues (name, neighborhood, city)…"
          style={{
            flex: "1 1 320px",
            minWidth: 220,
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
          }}
        />
      </div>

      {showCategoryTabs && (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
          {CATEGORIES.map((c) => {
            const active = c === cat;
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                style={{
                  padding: "8px 10px",
                  borderRadius: 999,
                  border: "1px solid rgba(0,0,0,0.12)",
                  background: active ? "black" : "white",
                  color: active ? "white" : "black",
                  cursor: "pointer",
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                {c}
              </button>
            );
          })}
        </div>
      )}

      <div style={{ marginBottom: 10, opacity: 0.75, fontSize: 13 }}>
        Showing {filtered.length} of {filtered.length}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {filtered.map((v) => (
          <Link
            key={v.id}
            href={`/v/${v.id}`}
            style={{
              textDecoration: "none",
              color: "inherit",
              border: "1px solid rgba(0,0,0,0.12)",
              background: "white",
              borderRadius: 16,
              padding: 14,
              display: "block",
            }}
          >
            <div style={{ fontWeight: 900, fontSize: 15 }}>{v.name}</div>

            {/* FIX: mobile overlap -> always wrap city/region line */}
            <div
              style={{
                marginTop: 6,
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                alignItems: "baseline",
                opacity: 0.78,
                fontSize: 13,
                lineHeight: 1.25,
              }}
            >
              <span>{[v.city, v.region].filter(Boolean).join(" — ") || "—"}</span>
            </div>

            <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "center" }}>
              <span style={pill}>{(v.category || "venue").toLowerCase()}</span>
              <span style={pill}>{(v.status || "active").toLowerCase()}</span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}

const pill: React.CSSProperties = {
  fontSize: 12,
  padding: "4px 8px",
  borderRadius: 999,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "#fafafa",
  fontWeight: 800,
};
