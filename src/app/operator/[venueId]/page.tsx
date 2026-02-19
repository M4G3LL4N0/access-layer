import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function OperatorPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params.venueId;

  const supabase = supabaseServer();

  const { data: venue } = await supabase
    .from("venues")
    .select("id,name,city,region")
    .eq("id", venueId)
    .maybeSingle();

  const { data: recent } = await supabase
    .from("access_passes")
    .select("token,created_at,expires_at,status")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(25);

  if (!venue) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Venue not found</h1>
      </main>
    );
  }

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28 }}>
        Operator Console — {venue.name}
      </h1>

      <div style={{ marginTop: 20, display: "flex", gap: 12, flexWrap: "wrap" }}>
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

      <h2 style={{ marginTop: 40 }}>Recent Passes</h2>

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
