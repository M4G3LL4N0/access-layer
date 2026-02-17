"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type Venue = {
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

export default function VenuesDirectoryClient({
  venues,
}: {
  venues: Venue[];
}) {
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return venues;

    return venues.filter((v) => {
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
  }, [q, venues]);

  return (
    <div style={{ width: "100%" }}>
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
            <div style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
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

                {/* THIS IS THE MOBILE OVERLAP FIX:
                    We render location in a wrapping line that cannot overlap. */}
                <div
                  style={{
                    marginTop: 6,
                    fontSize: 13,
                    opacity: 0.8,
                    lineHeight: 1.3,
                    display: "flex",
                    flexWrap: "wrap",
                    gap: 6,
                    alignItems: "baseline",
                  }}
                >
                  <span style={{ fontWeight: 800 }}>
                    {(v.city || "—").toString()}
                  </span>
                  <span style={{ opacity: 0.6 }}>—</span>
                  <span style={{ fontWeight: 800 }}>
                    {(v.region || "—").toString()}
                  </span>
                  {v.country ? (
                    <>
                      <span style={{ opacity: 0.6 }}>·</span>
                      <span style={{ fontWeight: 700 }}>{v.country}</span>
                    </>
                  ) : null}
                </div>

                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Tag text={(v.category || "venue").toString()} />
                  <Tag text={(v.status || "unknown").toString()} />
                </div>
              </div>
            </div>

            <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link
                href={`/v/${v.id}`}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  background: "black",
                  color: "white",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Open
              </Link>

              <Link
                href={`/request/${v.id}`}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.14)",
                  color: "black",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Request
              </Link>

              <Link
                href={`/signage/${v.id}`}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.14)",
                  color: "black",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Signage
              </Link>

              <Link
                href={`/kiosk/${v.id}`}
                style={{
                  padding: "10px 12px",
                  borderRadius: 12,
                  border: "1px solid rgba(0,0,0,0.14)",
                  color: "black",
                  textDecoration: "none",
                  fontWeight: 900,
                }}
              >
                Kiosk
              </Link>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div style={{ marginTop: 16, opacity: 0.7 }}>
          No venues match your search.
        </div>
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
