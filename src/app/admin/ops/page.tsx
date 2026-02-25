import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function AdminOpsPage() {
  const supabase = await supabaseServer();

  const { data: venues } = await supabase
    .from("venues")
    .select("id,name,city,region,status,category,created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  const since = new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString();
  const { data: events } = await supabase
    .from("security_events")
    .select("id,event_type,venue_id,device_id,created_at")
    .gte("created_at", since)
    .order("created_at", { ascending: false })
    .limit(100);

  const { data: devices } = await supabase
    .from("devices")
    .select("id,venue_id,name,device_type,status,created_at")
    .order("created_at", { ascending: false })
    .limit(100);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 26, fontWeight: 900 }}>Admin — Ops Console</h1>
      <p style={{ opacity: 0.75 }}>Enterprise-style multi-site view: venues, devices, and security events.</p>

      <div style={{ marginTop: 14 }}>
        <Link href="/admin" style={{ opacity: 0.8 }}>← Back to Admin</Link>
      </div>

      <h2 style={{ marginTop: 22 }}>Venues</h2>
      <div style={{ display: "grid", gap: 10 }}>
        {(venues || []).map((v) => (
          <div key={v.id} style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
            <div style={{ fontWeight: 900 }}>{v.name}</div>
            <div style={{ opacity: 0.75, fontSize: 13 }}>
              {v.city} · {v.region} · {v.category} · {v.status}
            </div>
            <div style={{ marginTop: 8, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <a href={`/v/${v.id}`} style={{ fontWeight: 800 }}>View</a>
              <a href={`/manage/${v.id}`} style={{ fontWeight: 800 }}>Manage</a>
              <a href={`/kiosk/${v.id}`} style={{ fontWeight: 800 }}>Kiosk</a>
              <a href={`/signage/${v.id}`} style={{ fontWeight: 800 }}>Signage</a>
            </div>

            <div style={{ marginTop: 10, fontSize: 13, opacity: 0.85 }}>
              Devices: {(devices || []).filter((d) => d.venue_id === v.id).length}
            </div>
          </div>
        ))}
      </div>

      <h2 style={{ marginTop: 22 }}>Security events (last 24h)</h2>
      <div style={{ border: "1px solid #ddd", borderRadius: 12, padding: 12 }}>
        {(events || []).length === 0 ? (
          <div style={{ opacity: 0.7 }}>No events.</div>
        ) : (
          <div style={{ display: "grid", gap: 8 }}>
            {(events || []).map((e) => (
              <div key={e.id} style={{ fontSize: 13 }}>
                <b>{e.event_type}</b> · {e.created_at} · venue {String(e.venue_id || "").slice(0, 8)}
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
