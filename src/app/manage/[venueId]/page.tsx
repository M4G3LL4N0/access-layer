import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function ManageVenue({ params }: any) {
  const { venueId } = params;

  const supabase = supabaseServer();

  const { data: venue, error } = await supabase
    .from("venues")
    .select("*")
    .eq("id", venueId)
    .single();

  if (!venue || error) {
    return (
      <main style={{ padding: 40 }}>
        <h1>Manage error</h1>
        <p>Invalid venue id.</p>
        <Link href="/venues">Back to directory</Link>
      </main>
    );
  }

  const { data: spaces } = await supabase
    .from("spaces")
    .select("*")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: 40, fontFamily: "system-ui" }}>
      <Link href={`/v/${venueId}`} style={{ opacity: 0.6 }}>
        ← Back to venue
      </Link>

      <h1 style={{ fontSize: 28, marginTop: 20 }}>
        Manage: {venue.name}
      </h1>

      <hr style={{ margin: "30px 0" }} />

      <h2 style={{ fontWeight: 900 }}>Spaces</h2>

      <form
        action="/api/owner/create-space"
        method="post"
        style={{ display: "flex", gap: 12, marginBottom: 30 }}
      >
        <input type="hidden" name="venueId" value={venueId} />
        <input name="name" placeholder="Space name" required />
        <input name="type" placeholder="Type (parking, restroom, gate...)" required />
        <button type="submit">Add Space</button>
      </form>

      {spaces && spaces.length > 0 ? (
        <div style={{ display: "grid", gap: 10 }}>
          {spaces.map((s: any) => (
            <div
              key={s.id}
              style={{
                padding: 12,
                border: "1px solid rgba(0,0,0,0.2)",
                borderRadius: 10,
              }}
            >
              <strong>{s.name}</strong> — {s.type}
            </div>
          ))}
        </div>
      ) : (
        <p>No spaces created yet.</p>
      )}
    </main>
  );
}
