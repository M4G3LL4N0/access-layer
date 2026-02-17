import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function VenuePage({ params }: any) {
  const { venueId } = params;

  const supabase = supabaseServer;

  const { data: venue, error } = await supabase
    .from("venues")
    .select("*")
    .eq("id", venueId)
    .single();

  if (!venue || error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Venue error</h1>
        <p>Venue not found.</p>
        <Link href="/venues">Back to directory</Link>
      </main>
    );
  }

  const { data: spaces } = await supabase
    .from("spaces")
    .select("*")
    .eq("venue_id", venueId)
    .eq("is_active", true);

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <Link href="/venues" style={{ opacity: 0.6 }}>
        ← Back to directory
      </Link>

      <h1 style={{ fontSize: 32, marginTop: 20 }}>
        {venue.name}
      </h1>

      <p>
        {venue.city}, {venue.region}
      </p>

      <hr style={{ margin: "30px 0" }} />

      <h2>Available Spaces</h2>

      {spaces && spaces.length > 0 ? (
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {spaces.map((s: any) => (
            <div
              key={s.id}
              style={{
                padding: 12,
                borderRadius: 10,
                border: "1px solid rgba(0,0,0,0.2)",
                fontWeight: 800,
              }}
            >
              {s.name} ({s.type})
            </div>
          ))}
        </div>
      ) : (
        <p>No public spaces listed yet.</p>
      )}

      <div style={{ marginTop: 30 }}>
        <Link href={`/request/${venueId}`}>
          Request Access →
        </Link>
      </div>
    </main>
  );
}
