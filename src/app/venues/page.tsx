import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import VenuesDirectoryClient from "@/components/VenuesDirectoryClient";
import VenuesMap from "@/components/VenuesMap";

export default async function VenuesDirectoryPage() {
  const { data: venues, error } = await supabaseServer
    .from("venues")
    .select("id,name,address,city,region,category,status,lat,lng,created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>Public Venue Directory</h1>
        <Link href="/" style={{ opacity: 0.8 }}>Home</Link>
      </div>

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Active venues participating in the Access ↔ Space pilot.
      </p>

      {error && (
        <pre style={{ marginTop: 16, padding: 12, background: "#fee", borderRadius: 8 }}>
          Error: {error.message}
        </pre>
      )}

      {/* Map (Leaflet) */}
      <div style={{ marginTop: 16 }}>
        <VenuesMap venues={(venues || []) as any} />
      </div>

      {/* Search + list */}
      <VenuesDirectoryClient venues={(venues || []) as any} />
    </main>
  );
}

