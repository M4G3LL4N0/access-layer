import MarketingShell from "@/components/MarketingShell";
import React from "react";

export const dynamic = "force-static";

export default function MapPage() {
  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>GLOBAL MAP</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Global access map
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        The long-term surface area is geographic, not just venue-based. AXW is built to become the operational layer across distributed access networks.
      </p>

      <div
        style={{
          marginTop: 22,
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 18,
          background: "linear-gradient(180deg, #fff, #fafafa)",
          minHeight: 420,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontWeight: 900,
        }}
      >
        Global map layer placeholder
      </div>
    </MarketingShell>
  );
}
