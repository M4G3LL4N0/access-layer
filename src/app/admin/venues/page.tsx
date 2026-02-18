export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminVenues({
  searchParams,
}: {
  searchParams?: Promise<{ token?: string }>;
}) {
  const sp = (await searchParams) || {};
  const token = sp.token || "";

  const { data: venues, error } = supabaseServer()
    .from("venues")
    .select("id,name,city,region,status,category,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 950 }}>Admin · Venues</h1>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/admin?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>Admin</Link>
          <Link href={`/admin/seed?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>Seed</Link>
        </div>
      </div>

      {error && (
        <pre style={{ marginTop: 12, padding: 12, background: "#fee", borderRadius: 10 }}>
          {error.message}
        </pre>
      )}

      <div style={{ marginTop: 14, display: "grid", gap: 10 }}>
        {(venues || []).map((v) => (
          <div key={v.id} style={{ padding: 14, border: "1px solid var(--card-border)", borderRadius: 14 }}>
            <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 10 }}>
              <div style={{ fontWeight: 950 }}>{v.name}</div>
              <div style={{ fontSize: 12, opacity: 0.7 }}>
                {v.category} · {v.status} · {v.city}, {v.region}
              </div>
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href={`/v/${v.id}`} style={{ opacity: 0.85 }}>View</Link>
              <Link href={`/manage/${v.id}`} style={{ opacity: 0.85 }}>Manage stub</Link>
              <Link href={`/admin/venues/${v.id}?token=${encodeURIComponent(token)}`} style={{ fontWeight: 900 }}>
                Admin edit →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
