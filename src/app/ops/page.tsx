import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import StatsStrip from "@/components/StatsStrip";
import EventFeed from "@/components/EventFeed";
import { getVenueStats, getRecentEvents } from "@/lib/axw/data";
import React from "react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OpsPage() {
  const stats = await getVenueStats();
  const events = await getRecentEvents(20);

  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>OPS CONSOLE</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Operator console
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        The operator console is where AXW becomes operational leverage: live activity, verification health, incident proof, and rollout control.
      </p>

      <div style={{ marginTop: 22 }}>
        <StatsStrip
          items={[
            { label: "Venues", value: stats.venues, sub: "Operational spaces in graph" },
            { label: "Entrypoints", value: stats.entrypoints, sub: "Doors, gates, access nodes" },
            { label: "Devices", value: stats.devices, sub: "Scanners, kiosks, readers" },
            { label: "Events", value: stats.events, sub: "Audit-grade activity ledger" },
          ]}
        />
      </div>

      <div style={{ marginTop: 22 }}>
        <EventFeed events={events.events} title="Recent operational events" />
      </div>
    </MarketingShell>
  </>
  )
}
