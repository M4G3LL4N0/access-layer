export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminSeed({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string; ok?: string }>;
}) {
  const sp = (await searchParams) || {};
  const token = sp.token || "";
  const ok = sp.ok === "1";

  const { data: recent } = await supabaseServer
    .from("venues")
    .select("id,name,city,region,status,created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 950 }}>Admin · Seed Venues</h1>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/admin?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>Admin</Link>
          <Link href={`/admin/venues?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>Venues</Link>
        </div>
      </div>

      {ok && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: "#f0fff4", border: "1px solid #c9f2d3", fontWeight: 900 }}>
          Seeded.
        </div>
      )}

      <p style={{ marginTop: 12, opacity: 0.85, lineHeight: 1.6 }}>
        Paste one venue per line as: <b>Name | Neighborhood | Category</b>
        <br />
        Example: <code>Blue Bottle | Hayes Valley | restroom</code>
      </p>

      <form action={`/api/admin/seed?token=${encodeURIComponent(token)}`} method="post" style={{ marginTop: 12 }}>
        <textarea
          name="lines"
          rows={10}
          placeholder={"Pilot Venue — Hayes Valley Cafe | Hayes Valley | restroom\nPilot Venue — Mission Workspace | Mission District | workspace"}
          style={{ width: "100%", padding: 12, borderRadius: 12, border: "1px solid #ddd" }}
        />
        <button style={{ marginTop: 10, padding: "10px 14px", borderRadius: 10, background: "black", color: "white", border: "none", fontWeight: 950 }}>
          Seed now
        </button>
      </form>

      <h2 style={{ marginTop: 18, fontSize: 16, fontWeight: 950 }}>Recent venues</h2>
      <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
        {(recent || []).map((v) => (
          <div key={v.id} style={{ padding: 12, border: "1px solid #eee", borderRadius: 14 }}>
            <div style={{ fontWeight: 900 }}>{v.name}</div>
            <div style={{ fontSize: 12, opacity: 0.7 }}>
              {v.city}, {v.region} · {v.status} · {new Date(v.created_at).toLocaleString()}
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
