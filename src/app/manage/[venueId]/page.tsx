export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function ManageVenuePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  if (!UUID_RE.test(venueId)) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 22, fontWeight: 950 }}>Manage error</h1>
        <p style={{ marginTop: 10 }}>Invalid venue id.</p>
        <Link href="/venues" style={{ opacity: 0.8 }}>
          ← Back to directory
        </Link>
      </main>
    );
  }

  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .select("id,name,address,city,region,category,status,created_at")
    .eq("id", venueId)
    .maybeSingle();

  const { data: rules, error: rErr } = await supabaseServer
    .from("access_rules")
    .select(
      "id,rule_name,is_enabled,access_mode,start_time,end_time,max_grants_per_user_per_day,min_minutes_between_grants,created_at"
    )
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false });

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 920, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href={`/v/${venueId}`} style={{ opacity: 0.85 }}>
          ← Venue
        </Link>
        <Link href="/venues" style={{ opacity: 0.85 }}>
          Directory
        </Link>
      </div>

      {(vErr || !venue) && (
        <div style={{ marginTop: 14, padding: 14, borderRadius: 14, border: "1px solid #eee" }}>
          <h1 style={{ fontSize: 22, fontWeight: 950 }}>Manage error</h1>
          <div style={{ marginTop: 8, opacity: 0.85 }}>
            {vErr?.message || "Venue not found."}
          </div>
        </div>
      )}

      {venue && (
        <>
          <h1 style={{ marginTop: 14, fontSize: 28, fontWeight: 950 }}>Manage Venue</h1>

          <div style={{ marginTop: 12, padding: 14, border: "1px solid #eee", borderRadius: 14 }}>
            <div style={{ fontWeight: 950, fontSize: 18 }}>{venue.name}</div>
            <div style={{ opacity: 0.85, marginTop: 6 }}>
              {venue.address} — {venue.city} {venue.region}
            </div>
            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
              {venue.category} · {venue.status}
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <button
                disabled
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#f7f7f7",
                  fontWeight: 900,
                  cursor: "not-allowed",
                }}
              >
                Edit rules (next)
              </button>

              <button
                disabled
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  background: "#f7f7f7",
                  fontWeight: 900,
                  cursor: "not-allowed",
                }}
              >
                Export audit log (next)
              </button>

              <a
                href={`/claim/${venue.id}`}
                style={{
                  padding: "10px 12px",
                  borderRadius: 10,
                  border: "1px solid #ddd",
                  fontWeight: 900,
                  textDecoration: "none",
                }}
              >
                Owner onboarding
              </a>
            </div>
          </div>

          <h2 style={{ marginTop: 18, fontSize: 18, fontWeight: 950 }}>Access Rules</h2>

          {rErr && (
            <pre style={{ marginTop: 10, padding: 12, background: "#fee", borderRadius: 10 }}>
              Rules error: {rErr.message}
            </pre>
          )}

          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            {(rules || []).map((r: any) => (
              <div key={r.id} style={{ padding: 14, border: "1px solid #eee", borderRadius: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ fontWeight: 950 }}>{r.rule_name}</div>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {r.is_enabled ? "enabled" : "disabled"} · mode: {r.access_mode}
                  </div>
                </div>
                <div style={{ marginTop: 8, opacity: 0.85 }}>
                  {r.start_time}–{r.end_time} · max/day {r.max_grants_per_user_per_day} · cooldown{" "}
                  {r.min_minutes_between_grants} min
                </div>
              </div>
            ))}

            {(!rules || rules.length === 0) && (
              <div style={{ padding: 14, border: "1px solid #eee", borderRadius: 14, opacity: 0.8 }}>
                No rules found yet.
              </div>
            )}
          </div>
        </>
      )}
    </main>
  );
}
