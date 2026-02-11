<a href="/venues" style={{ display: "inline-block", marginBottom: 12, opacity: 0.8 }}>
  Browse Public Directory →
</a>

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function HomePage() {
  const { data: venues, error } = await supabaseServer
    .from("venues")
    .select("id,name,address,city,region,category,status,created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(50);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Access ↔ Space (MVP)</h1>
      <p style={{ marginTop: 8, opacity: 0.8 }}>
        Hayes Valley pilot — rule-based access, no codes published.
      </p>

      {error && (
        <pre style={{ marginTop: 16, padding: 12, background: "#fee", borderRadius: 8 }}>
          Error loading venues: {error.message}
        </pre>
      )}

      <div style={{ marginTop: 20 }}>
        {venues?.length ? (
          <ul style={{ display: "grid", gap: 14, paddingLeft: 18 }}>
            {venues.map((v) => (
              <li key={v.id}>
                <Link href={`/v/${v.id}`} style={{ fontWeight: 700 }}>
                  {v.name}
                </Link>
                <div style={{ opacity: 0.8 }}>
                  {v.address || ""} {v.city ? `— ${v.city}` : ""} {v.region || ""}
                </div>
                <div style={{ fontSize: 12, opacity: 0.7 }}>
                  {v.category || "venue"} · {v.status}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: 16 }}>No venues found yet.</p>
        )}
      </div>
    </main>
  );
}

