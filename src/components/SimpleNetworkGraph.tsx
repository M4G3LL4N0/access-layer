import React from "react";

export default function SimpleNetworkGraph({
  nodes,
  edges,
}: {
  nodes: Array<{ id: string; label: string; type: string; [k: string]: any }>;
  edges: Array<{ id: string; source: string; target: string; type?: string }>;
}) {
  const venues = nodes.filter((n) => n.type === "venue");
  const entrypoints = nodes.filter((n) => n.type === "entrypoint");

  return (
    <section
      style={{
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 18,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 950, fontSize: 18 }}>Network graph</div>
      <div style={{ marginTop: 8, color: "#666", fontSize: 13, lineHeight: 1.55 }}>
        Lightweight graph view for 4.0: venues as root nodes, entrypoints as operational nodes.
      </div>

      <div style={{ marginTop: 14, display: "grid", gap: 14 }}>
        {!venues.length ? (
          <div style={{ fontSize: 13, color: "#666" }}>
            No graph data yet. Create venues and entrypoints, then this becomes the live topology layer.
          </div>
        ) : (
          venues.map((venue) => {
            const venueEdges = edges.filter((e) => e.source === venue.id);
            const venueEntries = venueEdges
              .map((e) => entrypoints.find((n) => n.id === e.target))
              .filter(Boolean) as any[];

            return (
              <div
                key={venue.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 16,
                  padding: 14,
                  background: "#fafafa",
                }}
              >
                <div style={{ fontWeight: 950, fontSize: 15 }}>{venue.label}</div>
                <div style={{ marginTop: 6, color: "#666", fontSize: 12 }}>
                  {venue.city || "—"}{venue.region ? `, ${venue.region}` : ""} · {venue.status || "active"}
                </div>

                <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap" }}>
                  {venueEntries.length ? (
                    venueEntries.map((entry) => (
                      <span
                        key={entry.id}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "8px 10px",
                          borderRadius: 999,
                          border: "1px solid #ddd",
                          background: "white",
                          fontSize: 12,
                          fontWeight: 900,
                        }}
                      >
                        {entry.label}
                      </span>
                    ))
                  ) : (
                    <span style={{ fontSize: 12, color: "#777" }}>No entrypoints yet</span>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
