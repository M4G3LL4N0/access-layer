import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function VenuesDirectoryPage() {
  const { data: venues, error } = await supabaseServer
    .from("venues")
    .select("id,name,address,city,region,category,status,created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          gap: 12,
        }}
      >
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>
          Public Venue Directory
        </h1>
        <Link href="/" style={{ opacity: 0.8 }}>
          Home
        </Link>
      </div>

      <p style={{ opacity: 0.8, marginTop: 8 }}>
        Active venues participating in the Access ↔ Space pilot.
      </p>

      {error && (
        <pre
          style={{
            marginTop: 16,
            padding: 12,
            background: "#fee",
            borderRadius: 8,
          }}
        >
          Error: {error.message}
        </pre>
      )}

      <div style={{ marginTop: 18 }}>
        {venues?.length ? (
          <ul style={{ paddingLeft: 18 }}>
            {venues.map((v) => (
              <li key={v.id} style={{ marginBottom: 14 }}>
                <Link href={`/v/${v.id}`} style={{ fontWeight: 900 }}>
                  {v.name}
                </Link>
                <div style={{ opacity: 0.85 }}>
                  {v.address || ""} {v.city ? `— ${v.city}` : ""} {v.region || ""}
                </div>
                <div style={{ fontSize: 12, opacity: 0.65 }}>
                  {v.category || "venue"} · {v.status}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ marginTop: 16 }}>No active venues found yet.</p>
        )}
      </div>
    </main>
  );
}

