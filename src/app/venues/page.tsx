// src/app/venues/page.tsx
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

export default async function VenuesPage() {
  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,lat,lng,category,status,created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false });

  const venues = (data || []) as Venue[];

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
        <Link href="/" style={{ textDecoration: "none", color: "inherit", opacity: 0.8 }}>
          Home
        </Link>
        <span style={{ opacity: 0.35 }}>·</span>
        <Link href="/owners" style={{ textDecoration: "none", color: "inherit", opacity: 0.8 }}>
          Owners
        </Link>
        <span style={{ opacity: 0.35 }}>·</span>
        <Link href="/parking" style={{ textDecoration: "none", color: "inherit", opacity: 0.8 }}>
          Parking
        </Link>
      </div>

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

      <div style={{ marginTop: 10 }}>
        <VenuesMap venues={venues as any} />
      </div>

      <div style={{ marginTop: 14 }}>
        <VenuesDirectoryClient venues={venues as any} />
      </div>
    </main>
  );
}
