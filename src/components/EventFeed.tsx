import React from "react";

export default function EventFeed({
  events,
  title = "Live event feed",
}: {
  events: any[];
  title?: string;
}) {
  return (
    <section
      style={{
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 18,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 950, fontSize: 18 }}>{title}</div>

      {!events.length ? (
        <div style={{ marginTop: 12, color: "#666", fontSize: 13 }}>
          No events yet. Once issue / verify / revoke is wired into real usage, this becomes the live operational ledger.
        </div>
      ) : (
        <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
          {events.map((event) => (
            <div
              key={event.id}
              style={{
                border: "1px solid #eee",
                borderRadius: 14,
                padding: 12,
                background: "#fafafa",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                <div style={{ fontWeight: 900, fontSize: 13 }}>
                  {String(event.action).toUpperCase()} · {String(event.result).toUpperCase()}
                </div>
                <div style={{ fontSize: 12, color: "#666" }}>
                  {event.created_at ? new Date(event.created_at).toLocaleString() : "—"}
                </div>
              </div>

              <div style={{ marginTop: 8, fontSize: 12, color: "#666", lineHeight: 1.5 }}>
                venue_id: {event.venue_id || "—"} · device_id: {event.device_id || "—"} · entrypoint_id: {event.entrypoint_id || "—"}
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
