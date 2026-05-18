import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import StatsStrip from "@/components/StatsStrip";
import EventFeed, { EventFeedProps } from "@/components/EventFeed";
import { getVenueStats, getVenuesList, getRecentEvents } from "@/lib/axw/data";

import type { 
  VenueStats, 
  VenueItem, 
  RecentEventsResult
} from "@/lib/axw/data";

interface ExtendedVenueItem extends VenueItem {
  region?: string | null;
  country?: string | null;
  events?: number | null;
  status: string;
  city?: string;
  state?: string;
}


export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function VenuesPage() {
  const stats = await getVenueStats().catch(() => ({
    venues: 0,
    entrypoints: 0,
    devices: 0,
    events: 0
  }));
  const venues: ExtendedVenueItem[] = await getVenuesList().catch(() => []);
  const events: RecentEventsResult = await getRecentEvents().catch(() => ({ events: [] }));

  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>VENUES</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 52, letterSpacing: -1.4, fontWeight: 950 }}>
        Spaces that operate like a network.
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 980 }}>
        Venues is where AXW shows up as an operating advantage: faster throughput, cleaner proof, and more scalable permissions across locations.
      </p>

      <div style={{ marginTop: 22 }}>
        <StatsStrip
          items={[
            { 
              label: "Venues", 
              value: stats.venues.toString(), 
              sub: "Onboarded operators" 
            },
            { 
              label: "Entrypoints", 
              value: stats.entrypoints.toString(), 
              sub: "Access points" 
            },
            { 
              label: "Devices", 
              value: stats.devices.toString(), 
              sub: "Verification hardware" 
            },
            { 
              label: "Events", 
              value: stats.events.toString(), 
              sub: "Proof of control" 
            },
          ]}
        />
      </div>

      <section
        style={{
          marginTop: 22,
          border: "1px solid #eee",
          borderRadius: 18,
          padding: 18,
          background: "white",
        }}
      >
        <div style={{ fontWeight: 950, fontSize: 18 }}>Live venues</div>

        {!venues.length ? (
          <div style={{ marginTop: 12, color: "#666", fontSize: 13 }}>
            No venues yet. Seed or create venues in the admin flow, then this becomes the live commercial surface.
          </div>
        ) : (
          <div
            style={{
              marginTop: 14,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 12,
            }}
          >
            {venues.map((venue) => (
              <div
                key={venue.id}
                style={{
                  border: "1px solid #eee",
                  borderRadius: 16,
                  padding: 14,
                  background: "#fafafa",
                }}
              >
                <div style={{ fontWeight: 950, fontSize: 15 }}>{venue.name}</div>
                <div style={{ marginTop: 8, color: "#666", fontSize: 13, lineHeight: 1.5 }}>
                  {[venue.city, venue.region, venue.country].filter(Boolean).join(", ") || "Location pending"}
                </div>
                <div style={{ marginTop: 10, fontSize: 12, color: "#666" }}>
                  status: {venue.status || "active"}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      <div style={{ marginTop: 22 }}>
        <EventFeed events={events.events} title="Recent venue activity" />
      </div>
    </MarketingShell>
  </>
  )
}
