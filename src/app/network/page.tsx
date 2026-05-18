import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import NetworkGraph from "@/components/NetworkGraph";
import React from "react";

export const dynamic = "force-static";

export default function Network() {
  const data = {
    nodes: [
      { id: "AXW", group: "core" },
      { id: "Venue A", group: "venue" },
      { id: "Venue B", group: "venue" },
      { id: "Device 1", group: "device" },
      { id: "Device 2", group: "device" },
      { id: "Credential", group: "credential" },
    ],
    links: [
      { source: "AXW", target: "Venue A" },
      { source: "AXW", target: "Venue B" },
      { source: "Venue A", target: "Device 1" },
      { source: "Venue B", target: "Device 2" },
      { source: "Device 1", target: "Credential" },
    ],
  };

  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>NETWORK</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Richer network graph UI
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        The graph is the moat: venues, devices, credentials, and proofs connected inside one operating layer.
      </p>

      <div style={{ marginTop: 22 }}>
        <NetworkGraph data={data} />
      </div>
    </MarketingShell>
  </>
  )
}
