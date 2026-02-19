import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function AdminAccessPointsIndex({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>;
}) {
  const sp = await searchParams;
  const token = sp.token || "";
  const supabase = supabaseServer();

  const { data: venues } = await supabase
    .from("venues")
    .select("id,name,city,region,status,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ maxWidth: 1100, margin: "0 auto", padding: "28px 16px", fontFamily: "system-ui" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 22 }}>Admin — Access Points</h1>
          <div style={{ opacity: 0.7, fontSize: 13, marginTop: 6 }}>
            Define doors, garages, gates, elevators, turnstiles—everything that is an “access edge”.
          </div>
        </div>
        <Link href={`/admin?token=${encodeURIComponent(token)}`} style={{ fontWeight: 800, textDecoration: "none" }}>
          ← Back to Admin
        </Link>
      </div>

      <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 12 }}>
        {(venues || []).map((v) => (
          <Link
            key={v.id}
            href={`/admin/access-points?token=${encodeURIComponent(token)}&venueId=${encodeURIComponent(v.id)}`}
            style={{
              textDecoration: "none",
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 14,
              padding: 14,
              color: "inherit",
            }}
          >
            <div style={{ fontWeight: 900 }}>{v.name}</div>
            <div style={{ opacity: 0.7, fontSize: 13, marginTop: 6 }}>
              {v.city} · {v.region} · {v.status}
            </div>
            <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>Click to manage access points →</div>
          </Link>
        ))}
      </div>

      <div style={{ marginTop: 26, padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
        <VenueManager token={token} />
      </div>
    </main>
  );
}

async function VenueManager({ token }: { token: string }) {
  // This is a server component wrapper placeholder.
  // The interactive UI lives client-side on /admin/ops and kiosk.
  return (
    <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
      Tip: Use the URL format:
      <div style={{ marginTop: 8, padding: 10, borderRadius: 10, background: "rgba(0,0,0,0.04)", overflowX: "auto" }}>
        <code>{`/admin/access-points?token=${token}&venueId=YOUR_VENUE_ID`}</code>
      </div>
      We’ll add a full in-page editor next, but this gets the table + APIs live immediately.
    </div>
  );
}
