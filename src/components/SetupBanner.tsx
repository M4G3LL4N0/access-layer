import React from "react";

export default function SetupBanner({
  title = "Setup mode",
  items,
}: {
  title?: string;
  items: { label: string; value?: string; ok: boolean }[];
}) {
  return (
    <div
      style={{
        marginTop: 18,
        border: "1px solid #eee",
        borderRadius: 18,
        padding: 16,
        background: "linear-gradient(180deg, #fff, #fafafa)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
        <div style={{ fontWeight: 950, fontSize: 14 }}>{title}</div>
        <span
          style={{
            fontSize: 12,
            padding: "6px 10px",
            borderRadius: 999,
            border: "1px solid #ddd",
            background: "#fff",
            fontWeight: 900,
          }}
        >
          ACTION REQUIRED
        </span>
      </div>

      <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 10 }}>
        {items.map((it) => (
          <div
            key={it.label}
            style={{
              border: "1px solid #eee",
              borderRadius: 14,
              padding: 12,
              background: "white",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10 }}>
              <div style={{ fontSize: 12, color: "#777", fontWeight: 900 }}>{it.label}</div>
              <span
                style={{
                  fontSize: 11,
                  padding: "5px 9px",
                  borderRadius: 999,
                  border: "1px solid #e3e3e3",
                  background: it.ok ? "#f3fff6" : "#fff5f5",
                  fontWeight: 900,
                }}
              >
                {it.ok ? "OK" : "MISSING"}
              </span>
            </div>
            {it.value ? (
              <div style={{ marginTop: 8, fontSize: 13, color: "#333", fontWeight: 800 }}>{it.value}</div>
            ) : (
              <div style={{ marginTop: 8, fontSize: 13, color: "#666", lineHeight: 1.5 }}>
                Add the missing value in Vercel environment variables.
              </div>
            )}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, fontSize: 12, color: "#666", lineHeight: 1.55 }}>
        This page stays live and investor-ready even before data is connected. Once env is added, it automatically upgrades to
        real-time metrics.
      </div>
    </div>
  );
}
