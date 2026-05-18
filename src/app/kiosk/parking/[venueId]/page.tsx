import { supabaseServer } from "@/lib/supabaseServer";
import { SubpageVisual } from "@/components/SubpageVisual";

export const dynamic = "force-dynamic";

export default async function ParkingKioskPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params?.venueId || "";

  if (!venueId) {
    return (
      <main style={{ padding: 40 }}>
      <SubpageVisual variant="default" />
        <h1>Missing venueId (route param).</h1>
      </main>
    );
  }

  const supabase = await supabaseServer();

  const { data, error } = await supabase
    .from("venues")
    .select("id,name,city,region,status")
    .eq("id", venueId)
    .limit(1);

  if (error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Database error</h1>
        <pre>{JSON.stringify(error, null, 2)}</pre>
      </main>
    );
  }

  if (!data || data.length === 0) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Venue not found</h1>
        <div>Requested ID: {venueId}</div>
      </main>
    );
  }

  const venue = data[0];

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28 }}>
        Parking Kiosk — {venue.name}
      </h1>

      <div style={{ marginTop: 10, opacity: 0.7 }}>
        {venue.city}, {venue.region}
      </div>

      <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a
          href={`/api/parking/issue?venueId=${venueId}&minutes=120`}
          style={btn()}
        >
          Issue 2 Hour Validation
        </a>

        <a
          href={`/operator/${venueId}`}
          style={btnGhost()}
        >
          Back to Operator
        </a>
      </div>
    </main>
  );
}

function btn() {
  return {
    padding: "10px 14px",
    borderRadius: 12,
    background: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 700,
  };
}

function btnGhost() {
  return {
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid black",
    textDecoration: "none",
    fontWeight: 700,
  };
}
