import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function chip(t: string) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,0.12)",
        fontSize: 12,
        fontWeight: 800,
        opacity: 0.85,
      }}
    >
      {t}
    </span>
  );
}

export default async function AdminAccessPointsIndex() {
  const supabase = supabaseServer();

  const { data: venues, error } = await supabase
    .from("venues")
    .select("id,name,city,region,status,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main className="axw-container">
      <div className="axw-row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="axw-title" style={{ fontSize: 22 }}>Admin — Access Points</div>
          <div className="axw-muted" style={{ marginTop: 6 }}>
            Manage “every access surface” per venue: doors, garages, gates, elevators, turnstiles, lockers, Wi-Fi, APIs.
          </div>
        </div>

        <div className="axw-row">
          <Link className="axw-btn" href="/admin">← Back to Admin</Link>
          <Link className="axw-btn axw-btn-primary" href="/venues">Directory</Link>
        </div>
      </div>

      <div className="axw-card" style={{ marginTop: 16 }}>
        <div style={{ fontWeight: 900, marginBottom: 8 }}>Venues</div>
        <div className="axw-muted" style={{ fontSize: 13, marginBottom: 10 }}>
          Click a venue to add/list access points.
        </div>

        {error ? (
          <div style={{ color: "crimson", fontWeight: 800 }}>Error: {error.message}</div>
        ) : (
          <div style={{ display: "grid", gap: 10 }}>
            {(venues || []).map((v) => (
              <div
                key={v.id}
                style={{
                  border: "1px solid rgba(0,0,0,0.10)",
                  borderRadius: 14,
                  padding: 12,
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 10,
                  flexWrap: "wrap",
                  alignItems: "center",
                }}
              >
                <div>
                  <div style={{ fontWeight: 950 }}>{v.name}</div>
                  <div className="axw-muted" style={{ fontSize: 13, marginTop: 4 }}>
                    {v.city} · {v.region} · {v.status}
                  </div>
                </div>

                <div className="axw-row">
                  {chip("doors")}
                  {chip("garages")}
                  {chip("gates")}
                  {chip("turnstiles")}
                  <Link className="axw-btn axw-btn-primary" href={`/admin/access-points/${v.id}`}>
                    Manage →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
