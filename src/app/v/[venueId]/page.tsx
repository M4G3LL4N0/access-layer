export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function VenuePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .select("*")
    .eq("id", venueId)
    .single();

// ----- Pilot Analytics -----

const now = new Date();

const startOfDay = new Date(now);
startOfDay.setHours(0, 0, 0, 0);
const dayISO = startOfDay.toISOString();

const start7 = new Date(now);
start7.setDate(start7.getDate() - 7);
start7.setHours(0, 0, 0, 0);
const weekISO = start7.toISOString();

// Requests
const requestsToday = await supabaseServer
  .from("access_requests")
  .select("id", { count: "exact", head: true })
  .eq("venue_id", venueId)
  .gte("requested_at", dayISO);

const requests7d = await supabaseServer
  .from("access_requests")
  .select("id", { count: "exact", head: true })
  .eq("venue_id", venueId)
  .gte("requested_at", weekISO);

// Tokens issued
const tokensToday = await supabaseServer
  .from("access_tokens")
  .select("id", { count: "exact", head: true })
  .eq("venue_id", venueId)
  .gte("issued_at", dayISO);

const tokens7d = await supabaseServer
  .from("access_tokens")
  .select("id", { count: "exact", head: true })
  .eq("venue_id", venueId)
  .gte("issued_at", weekISO);

// Owner leads
const leadsTotal = await supabaseServer
  .from("owner_leads")
  .select("id", { count: "exact", head: true })
  .eq("venue_id", venueId);

  const { data: rules, error: rErr } = await supabaseServer
    .from("access_rules")
    .select("*")
    .eq("venue_id", venueId)
    .eq("is_enabled", true)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <Link href="/" style={{ opacity: 0.8 }}>← Back</Link>

      {vErr || !venue ? (
        <pre style={{ marginTop: 16, padding: 12, background: "#fee", borderRadius: 8 }}>
          Venue error: {vErr?.message || "Not found"}
        </pre>
      ) : (
        <>
          <h1 style={{ fontSize: 26, fontWeight: 800, marginTop: 12 }}>{venue.name}</h1>
          <div style={{ opacity: 0.8 }}>
            {venue.address || ""} {venue.city ? `— ${venue.city}` : ""} {venue.region ? venue.region : ""}
          </div>

          <h2 style={{ marginTop: 20, fontSize: 18, fontWeight: 800 }}>Access Rules</h2>

          {rErr && (
            <pre style={{ marginTop: 12, padding: 12, background: "#fee", borderRadius: 8 }}>
              Rules error: {rErr.message}
            </pre>
          )}

          {rules?.length ? (
            <ul style={{ paddingLeft: 18 }}>
              {rules.map((r) => (
                <li key={r.id} style={{ marginBottom: 8 }}>
                  <strong>{r.rule_name}</strong> — {r.start_time || "00:00"} to {r.end_time || "23:59"} ·
                  max/day {r.max_grants_per_user_per_day ?? "—"} · cooldown {r.min_minutes_between_grants ?? "—"} min ·
                  mode: {r.access_mode}
                </li>
              ))}
            </ul>
          ) : (
            <p style={{ opacity: 0.8 }}>No active rules set.</p>
          )}
<div style={{ marginTop: 18, padding: 14, border: "1px solid #eee", borderRadius: 14 }}>
  <div style={{ fontWeight: 950, fontSize: 16 }}>Pilot Analytics</div>

  <div style={{ marginTop: 12, display: "flex", gap: 14, flexWrap: "wrap" }}>

    <div style={{ padding: 10, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Requests today</div>
      <div style={{ fontSize: 20, fontWeight: 950 }}>
        {requestsToday.count ?? 0}
      </div>
    </div>

    <div style={{ padding: 10, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Requests (7d)</div>
      <div style={{ fontSize: 20, fontWeight: 950 }}>
        {requests7d.count ?? 0}
      </div>
    </div>

    <div style={{ padding: 10, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Tokens issued (7d)</div>
      <div style={{ fontSize: 20, fontWeight: 950 }}>
        {tokens7d.count ?? 0}
      </div>
    </div>

    <div style={{ padding: 10, border: "1px solid #eee", borderRadius: 12 }}>
      <div style={{ fontSize: 12, opacity: 0.7 }}>Owner leads</div>
      <div style={{ fontSize: 20, fontWeight: 950 }}>
        {leadsTotal.count ?? 0}
      </div>
    </div>

  </div>

  <div style={{ marginTop: 8, fontSize: 12, opacity: 0.65 }}>
    Rule-based access layer · no codes published.
  </div>
</div>
          <div style={{ marginTop: 18 }}>
            <Link
              href={`/request/${venue.id}`}
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 10,
                background: "black",
                color: "white",
                textDecoration: "none",
                fontWeight: 700,
              }}
            >
              Request Access
            </Link>
          </div>

          <div style={{ marginTop: 12 }}>
            <a
              href={`/claim/${venue.id}`}
              style={{
                opacity: 0.85,
                textDecoration: "underline",
                fontWeight: 700,
              }}
            >
              Claim & manage this venue →
            </a>
          </div>
<div style={{ marginTop: 12 }}>
  <a
    href={`/manage/${venue.id}`}
    style={{ opacity: 0.85, textDecoration: "underline", fontWeight: 700 }}
  >
    Manage venue (stub) →
  </a>
</div>
        </>
      )}
    </main>
  );
}

