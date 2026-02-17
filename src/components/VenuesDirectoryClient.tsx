"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

export type Venue = {
  id: string;
  name: string;
  address?: string | null;
  city?: string | null;
  region?: string | null;
  country?: string | null;
  category?: string | null;
  status?: string | null;
  lat?: number | null;
  lng?: number | null;
};

export default function VenuesDirectoryClient(props: {
  venues: Venue[];

  // Optional props used by /parking or other filtered directories
  initialCategory?: string;
  title?: string;
  subtitle?: string;
  showCategoryTabs?: boolean;
}) {
  const {
    venues,
    initialCategory,
    title,
    subtitle,
    showCategoryTabs = true,
  } = props;

  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>(initialCategory || "all");

  const categories = useMemo(() => {
    const set = new Set<string>();
    for (const v of venues) {
      if (v.category) set.add(v.category);
    }
    return ["all", ...Array.from(set).sort()];
  }, [venues]);

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    return venues.filter((v) => {
      if (cat !== "all" && (v.category || "") !== cat) return false;

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
  }, [q, venues, cat]);

  return (
    <div style={{ width: "100%" }}>
      {title ? (
        <div style={{ marginBottom: 10 }}>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 950 }}>{title}</h1>
          {subtitle ? (
            <p style={{ marginTop: 6, opacity: 0.8, maxWidth: 900, lineHeight: 1.5 }}>
              {subtitle}
            </p>
          ) : null}
        </div>
      ) : null}

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          marginBottom: 12,
        }}
      >
        <div style={{ fontWeight: 900 }}>
          Showing {filtered.length} of {venues.length}
        </div>

        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search venues (name, neighborhood, city)…"
          style={{
            width: 360,
            maxWidth: "100%",
            padding: "10px 12px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.14)",
            outline: "none",
          }}
        />
      </div>

      {showCategoryTabs && categories.length > 1 ? (
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              style={{
                padding: "8px 10px",
                borderRadius: 999,
                border: "1px solid rgba(0,0,0,0.14)",
                background: c === cat ? "black" : "white",
                color: c === cat ? "white" : "black",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {c}
            </button>
          ))}
        </div>
      ) : null}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: 12,
        }}
      >
        {filtered.map((v) => (
          <div
            key={v.id}
            style={{
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              padding: 14,
              background: "white",
              overflow: "hidden",
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div
                style={{
                  fontWeight: 950,
                  fontSize: 16,
                  lineHeight: 1.2,
                  wordBreak: "break-word",
                }}
              >
                {v.name}
              </div>

              {/* MOBILE OVERLAP PERMA-FIX:
                  a wrapping flex line that can NEVER overlap. */}
              <div
                style={{
                  marginTop: 6,
                  fontSize: 13,
                  opacity: 0.85,
                  lineHeight: 1.3,
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 6,
                  alignItems: "baseline",
                }}
              >
                <span style={{ fontWeight: 800 }}>{(v.city || "—").toString()}</span>
                <span style={{ opacity: 0.55 }}>—</span>
                <span style={{ fontWeight: 800 }}>{(v.region || "—").toString()}</span>
                {v.country ? (
                  <>
                    <span style={{ opacity: 0.55 }}>·</span>
                    <span style={{ fontWeight: 700 }}>{v.country}</span>
                  </>
                ) : null}
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                <Tag text={(v.category || "venue").toString()} />
                <Tag text={(v.status || "unknown").toString()} />
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <LinkButton href={`/v/${v.id}`} primary>
                Open
              </LinkButton>
              <LinkButton href={`/request/${v.id}`}>Request</LinkButton>
              <LinkButton href={`/signage/${v.id}`}>Signage</LinkButton>
              <LinkButton href={`/kiosk/${v.id}`}>Kiosk</LinkButton>
              <LinkButton href={`/kiosk/parking/${v.id}`}>Parking</LinkButton>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ marginTop: 16, opacity: 0.7 }}>No venues match your search.</div>
      ) : null}
    </div>
  );
}

function Tag({ text }: { text: string }) {
  return (
    <span
      style={{
        fontSize: 12,
        fontWeight: 900,
        padding: "6px 10px",
        borderRadius: 999,
        background: "rgba(0,0,0,0.06)",
        display: "inline-flex",
        alignItems: "center",
      }}
    >
      {text}
    </span>
  );
}

function LinkButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        background: primary ? "black" : "white",
        color: primary ? "white" : "black",
        border: primary ? "1px solid black" : "1px solid rgba(0,0,0,0.14)",
        textDecoration: "none",
        fontWeight: 950,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}
