"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

type Venue = {
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

function pillStyle(active: boolean): React.CSSProperties {
  return {
    padding: "8px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.14)",
    background: active ? "black" : "white",
    color: active ? "white" : "black",
    fontWeight: 900,
    fontSize: 13,
    cursor: "pointer",
    userSelect: "none",
    whiteSpace: "nowrap",
  };
}

function cardStyle(): React.CSSProperties {
  return {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 16,
    padding: 14,
    background: "white",
  };
}

export default function VenuesDirectoryClient({
  venues,
  initialCategory,
  title = "Public Venue Directory",
  subtitle = "Active venues participating in the Access ↔ Space pilot.",
  showCategoryTabs = true,
}: {
  venues: Venue[];
  initialCategory?: string;
  title?: string;
  subtitle?: string;
  showCategoryTabs?: boolean;
}) {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState((initialCategory || "all").toLowerCase());

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const v of venues || []) {
      const c = (v.category || "").trim().toLowerCase();
      if (c) set.add(c);
    }
    const arr = Array.from(set).sort();
    // Keep “parking” near front if present
    arr.sort((a, b) => {
      if (a === "parking") return -1;
      if (b === "parking") return 1;
      return a.localeCompare(b);
    });
    return ["all", ...arr];
  }, [venues]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();

    return (venues || []).filter((v) => {
      const vcat = (v.category || "").toLowerCase();
      if (cat !== "all" && vcat !== cat) return false;

      if (!query) return true;

      const hay = [
        v.name,
        v.address,
        v.city,
        v.region,
        v.country,
        v.category,
        v.status,
      ]
        .filter(Boolean)
        .join(" ")
        .toLowerCase();

      return hay.includes(query);
    });
  }, [venues, q, cat]);

  return (
    <section style={{ ...cardStyle(), overflow: "hidden" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontWeight: 1000, fontSize: 18, marginBottom: 4 }}>{title}</div>
          <div style={{ opacity: 0.75, fontSize: 13, lineHeight: 1.4 }}>{subtitle}</div>
        </div>

        <div style={{ flexShrink: 0, display: "flex", gap: 8 }}>
          <Link
            href="/"
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.14)",
              textDecoration: "none",
              fontWeight: 900,
              color: "black",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            Home
          </Link>
          <Link
            href="/contact"
            style={{
              padding: "8px 10px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.14)",
              textDecoration: "none",
              fontWeight: 900,
              color: "black",
              fontSize: 13,
              whiteSpace: "nowrap",
            }}
          >
            Contact
          </Link>
        </div>
      </div>

      <div style={{ marginTop: 12 }}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search venues (name, neighborhood, city)…"
          style={{
            width: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.14)",
            outline: "none",
            fontSize: 14,
          }}
        />
      </div>

      {showCategoryTabs && (
        <div
          style={{
            marginTop: 12,
            display: "flex",
            gap: 8,
            overflowX: "auto",
            paddingBottom: 4,
            WebkitOverflowScrolling: "touch",
          }}
        >
          {categories.map((c) => (
            <div key={c} style={pillStyle(cat === c)} onClick={() => setCat(c)}>
              {c === "all" ? "All" : c}
            </div>
          ))}
        </div>
      )}

      <div style={{ marginTop: 12, opacity: 0.75, fontSize: 13 }}>
        Showing <b>{filtered.length}</b> of <b>{venues?.length || 0}</b>
        {cat !== "all" ? (
          <>
            {" "}
            · category: <b>{cat}</b>
          </>
        ) : null}
      </div>

      <div
        style={{
          marginTop: 12,
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {filtered.map((v) => {
          const city = (v.city || "").trim();
          const region = (v.region || "").trim();
          const where = [city, region].filter(Boolean).join(" — ");

          return (
            <div key={v.id} style={cardStyle()}>
              <div style={{ fontWeight: 1000, marginBottom: 6, lineHeight: 1.25 }}>{v.name}</div>

              <div style={{ opacity: 0.75, fontSize: 13, lineHeight: 1.35 }}>
                {where || "—"}
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.14)",
                    fontWeight: 900,
                    fontSize: 12,
                    whiteSpace: "nowrap",
                  }}
                >
                  {(v.category || "venue").toLowerCase()}
                </span>

                <span
                  style={{
                    padding: "6px 10px",
                    borderRadius: 999,
                    border: "1px solid rgba(0,0,0,0.14)",
                    fontWeight: 900,
                    fontSize: 12,
                    opacity: 0.8,
                    whiteSpace: "nowrap",
                  }}
                >
                  {(v.status || "unknown").toLowerCase()}
                </span>
              </div>

              <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Link
                  href={`/v/${v.id}`}
                  style={{
                    padding: "9px 12px",
                    borderRadius: 12,
                    background: "black",
                    color: "white",
                    textDecoration: "none",
                    fontWeight: 900,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                  }}
                >
                  Open
                </Link>

                <Link
                  href={`/request/${v.id}`}
                  style={{
                    padding: "9px 12px",
                    borderRadius: 12,
                    border: "1px solid rgba(0,0,0,0.14)",
                    color: "black",
                    textDecoration: "none",
                    fontWeight: 900,
                    fontSize: 13,
                    whiteSpace: "nowrap",
                  }}
                >
                  Request pass
                </Link>

                {(v.category || "").toLowerCase().includes("parking") && (
                  <Link
                    href={`/kiosk/parking/${v.id}`}
                    style={{
                      padding: "9px 12px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.14)",
                      color: "black",
                      textDecoration: "none",
                      fontWeight: 900,
                      fontSize: 13,
                      whiteSpace: "nowrap",
                    }}
                  >
                    Parking kiosk
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
