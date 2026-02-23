import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function OperatorPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params?.venueId || "";

  if (!venueId) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Missing venueId</h1>
      </main>
    );
  }

  const supabase = supabaseServer();

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

  const { data: recent } = await supabase
    .from("access_passes")
    .select("token,created_at,expires_at,status")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(25);

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28 }}>
        Operator Console — {venue.name}
      </h1>

      <div style={{ marginTop: 10, opacity: 0.7 }}>
        {venue.city}, {venue.region}
      </div>

      <div style={{ marginTop: 30, display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a href={`/kiosk/${venueId}`} style={btn()}>
          Open Kiosk
        </a>
        <a href={`/verify`} style={btn()}>
          Verify Token
        </a>
        <a href={`/kiosk/parking/${venueId}`} style={btn()}>
          Parking Kiosk
        </a>
      </div>

      <h2 style={{ marginTop: 40 }}>Recent Access Passes</h2>

      <div style={{ marginTop: 10 }}>
        {recent?.map((r) => (
          <div key={r.token} style={card()}>
            <div><strong>{r.token}</strong></div>
            <div>Status: {r.status}</div>
            <div>Expires: {new Date(r.expires_at).toLocaleString()}</div>
          </div>
        ))}
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

function card() {
  return {
    padding: 14,
    borderRadius: 12,
    border: "1px solid #ddd",
    marginBottom: 10,
  };
}
