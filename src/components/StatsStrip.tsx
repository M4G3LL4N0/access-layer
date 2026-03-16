import React from "react";

export default function StatsStrip({
  items,
}: {
  items: Array<{ label: string; value: string | number; sub?: string }>;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: 12,
      }}
    >
      {items.map((item) => (
        <div
          key={item.label}
          style={{
            border: "1px solid #eee",
            borderRadius: 16,
            padding: 16,
            background: "white",
          }}
        >
          <div style={{ fontSize: 12, color: "#777", fontWeight: 900 }}>{item.label}</div>
          <div style={{ marginTop: 8, fontSize: 28, fontWeight: 950, letterSpacing: -0.7 }}>
            {item.value}
          </div>
          {item.sub ? (
            <div style={{ marginTop: 6, fontSize: 12, color: "#666", lineHeight: 1.45 }}>{item.sub}</div>
          ) : null}
        </div>
      ))}
    </div>
  );
}
