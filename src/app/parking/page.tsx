import VenuesDirectoryClient from "@/components/VenuesDirectoryClient";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function ParkingVenuesPage() {
  const supabase = await supabaseServer();

  const { data: venues, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,lat,lng,category,status,created_at")
    .eq("status", "active")
    .eq("category", "parking")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <SubpageVisual variant="default" />
        <h1 style={{ margin: 0, fontSize: 24, fontWeight: 900 }}>Parking Venues</h1>
        <p style={{ marginTop: 10, color: "#b91c1c", fontWeight: 800 }}>
          Error loading venues: {String((error as any)?.message || error)}
        </p>
      </main>
    );
  }

  return (
    <VenuesDirectoryClient
      venues={(venues as any) || []}
      title="Parking Venues"
      subtitle="Active venues with parking validation enabled."
      initialCategory="parking"
      showCategoryTabs={false}
    />
  );
}
