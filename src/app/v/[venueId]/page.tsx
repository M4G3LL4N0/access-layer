import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";
export const revalidate = 0;

function isUuid(s: string) {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(s);
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  if (!venueId || !isUuid(venueId)) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>Venue error</h1>
        <p style={{ opacity: 0.8 }}>Invalid venue id.</p>
        <div style={{ marginTop: 12 }}>
          <Link href="/venues">Back to directory →</Link>
        </div>
      </main>
    );
  }

  // IMPORTANT:
  // supabaseServer is a CLIENT INSTANCE exported from your lib
  // (not a function). Do NOT call it like supabaseServer().
  const supabase = supabaseServer;

  // Avoid .single() and avoid "Cannot coerce..." issues:
  // select + eq + limit(1) then take [0]
  const { data: rows, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,category,status,lat,lng,created_at")
    .eq("id", venueId)
    .limit(1);

  const venue = rows?.[0] || null;

  if (error || !venue) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>Venue error</h1>
        <p style={{ opacity: 0.8 }}>
          Venue not found. Tip: confirm the venue id exists in Supabase.
        </p>

        <details style={{ marginTop: 14, padding: 12, border: "1px solid #ddd", borderRadius: 12 }}>
          <summary style={{ fontWeight: 800, cursor: "pointer" }}>Debug</summary>
          <div style={{ marginTop: 8, fontSize: 13, opacity: 0.85 }}>
            <div><b>venueId:</b> {venueId}</div>
            <div><b>rows length:</b> {rows ? rows.length : 0}</div>
            <div><b>error:</b> {error ? String(error.message || error) : "none"}</div>
          </div>
        </details>

        <div style={{ marginTop: 12 }}>
          <Link href="/venues">Back to directory →</Link>
        </div>
      </main>
    );
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ marginBottom: 10 }}>
        <Link href="/venues" style={{ opacity: 0.85 }}>
          ← Back to directory
        </Link>
      </div>

      <h1 style={{ fontSize: 26, fontWeight: 950, margin: "6px 0" }}>{venue.name}</h1>

      <div style={{ opacity: 0.8, marginBottom: 14 }}>
        {(venue.address || "").toString()} · {(venue.city || "").toString()} {(venue.region || "").toString()} ·{" "}
        {(venue.country || "").toString()}
      </div>

      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 14 }}>
        <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid #ddd", fontWeight: 800 }}>
          {venue.category}
        </span>
        <span style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid #ddd", fontWeight: 800 }}>
          {venue.status}
        </span>
      </div>

      <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
        <a
          href={`/request/${venue.id}`}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            background: "black",
            color: "white",
            textDecoration: "none",
            fontWeight: 900,
          }}
        >
          Request Access
        </a>

        <a
          href={`/pass/latest?venueId=${venue.id}`}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
            fontWeight: 900,
            color: "black",
          }}
        >
          Latest Pass
        </a>

        <a
          href={`/kiosk/${venue.id}`}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
            fontWeight: 900,
            color: "black",
          }}
        >
          Kiosk
        </a>

        <a
          href={`/signage/${venue.id}`}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
            fontWeight: 900,
            color: "black",
          }}
        >
          Signage
        </a>

        <a
          href={`/manage/${venue.id}`}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
            fontWeight: 900,
            color: "black",
          }}
        >
          Manage
        </a>
      </div>

      <div style={{ marginTop: 18, fontSize: 13, opacity: 0.7 }}>
        Venue ID: <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{venue.id}</span>
      </div>
    </main>
  );
}
