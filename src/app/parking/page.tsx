// src/app/parking/page.tsx
import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";
import VenuesDirectoryClient from "@/components/VenuesDirectoryClient";
import VenuesMap from "@/components/VenuesMap";

export const dynamic = "force-dynamic";

type Venue = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  lat: number | null;
  lng: number | null;
  category: string | null;
  status: string | null;
  created_at?: string | null;
};

export default async function ParkingDirectoryPage() {
  // NOTE: In this repo, supabaseServer is a client (NOT a function).
  const supabase = supabaseServer;

  const { data, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,lat,lng,category,status,created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const venues = ((data || []) as Venue[]).filter((v) => {
    const cat = (v.category || "").toLowerCase();
    return cat === "parking" || cat.includes("parking");
  });

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit", opacity: 0.8 }}>
          Home
        </Link>
        <span style={{ opacity: 0.35 }}>·</span>
        <Link href="/venues" style={{ textDecoration: "none", color: "inherit", opacity: 0.8 }}>
          Venues
        </Link>
      </div>

      <h1 style={{ margin: 0, fontSize: 26, fontWeight: 900 }}>Parking Validation Directory</h1>
      <p style={{ marginTop: 8, opacity: 0.75, maxWidth: 860 }}>
        Time-bounded parking permissions and verification. This is a filtered view of the same venue system
        (not a separate product).
      </p>

      {error && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "rgba(255,0,0,0.05)",
            fontWeight: 800,
          }}
        >
          Error loading venues: {String(error.message || error)}
        </div>
      )}

      <div style={{ marginTop: 14 }}>
        <VenuesMap venues={venues as any} />
      </div>

      <div style={{ marginTop: 14 }}>
        <VenuesDirectoryClient
          venues={venues as any}
          initialCategory="parking"
          title="Parking Venues"
          subtitle="Active venues with parking validation enabled."
          showCategoryTabs={false}
        />
      </div>
    </main>
  );
}
