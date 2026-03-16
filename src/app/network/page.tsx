import MarketingShell from "@/components/MarketingShell";
import StatsStrip from "@/components/StatsStrip";
import SimpleNetworkGraph from "@/components/SimpleNetworkGraph";
import { getNetworkGraph, getVenueStats } from "@/lib/axw/data";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function NetworkPage() {
  const stats = await getVenueStats();
  const graph = await getNetworkGraph();

  return (
    <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>AXW NETWORK</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        The access graph becomes the moat.
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        Every venue, entrypoint, device, credential, and event becomes part of the same coordination graph. That is what makes AXW infrastructure, not software.
      </p>

      <div style={{ marginTop: 22 }}>
        <StatsStrip
          items={[
            { label: "Venues", value: stats.venues, sub: "Root nodes" },
            { label: "Spaces", value: stats.spaces, sub: "Operational zones" },
            { label: "Entrypoints", value: stats.entrypoints, sub: "Doors, gates, checkpoints" },
            { label: "Events", value: stats.events, sub: "Verified operational history" },
          ]}
        />
      </div>

      <div style={{ marginTop: 22 }}>
        <SimpleNetworkGraph nodes={graph.nodes} edges={graph.edges} />
      </div>
    </MarketingShell>
  );
}
