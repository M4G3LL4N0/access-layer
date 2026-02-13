export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export default async function VenuePage({
  params,
  searchParams,
}: {
  params: Promise<{ venueId: string }>;
  searchParams?: Promise<{ error?: string }>;
}) {
  const { venueId } = await params;
  const sp = (await searchParams) || {};
  const error = sp.error || "";

  if (!UUID_RE.test(venueId)) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 22, fontWeight: 950 }}>Venue error</h1>
        <p style={{ marginTop: 10 }}>Invalid venue id.</p>
        <Link href="/venues" style={{ opacity: 0.8 }}>
          ← Back to directory
        </Link>
      </main>
    );
  }

  // Venue
  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .select("id,name,address,city,region,category,status,created_at")
    .eq("id", venueId)
    .maybeSingle();

  // Rules
  const { data: rules, error: rErr } = await supabaseServer
    .from("access_rules")
    .select(
      "id,rule_name,is_enabled,access_mode,start_time,end_time,max_grants_per_user_per_day,min_minutes_between_grants,created_at"
    )
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false });

  // ----- Pilot Analytics -----
  const now = new Date();
  const startOfDay = new Date(now);
  startOfDay.setHours(0, 0, 0, 0);
  const dayISO = startOfDay.toISOString();

  const start7 = new Date(now);
  start7.setDate(start7.getDate() - 7);
  start7.setHours(0, 0, 0, 0);
  const weekISO = start7.toISOString();

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

  const tokens7d = await supabaseServer
    .from("access_tokens")
    .select("id", { count: "exact", head: true })
    .eq("venue_id", venueId)
    .gte("issued_at", weekISO);

  const leadsTotal = await supabaseServer
    .from("owner_leads")
    .select("id", { count: "exact", head: true })
    .eq("venue_id", venueId);

  const analyticsError =
    requestsToday.error || requests7d.error || tokens7d.error || leadsTotal.error;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <Link href="/venues" style={{ opacity: 0.85 }}>
          ← Directory
        </Link>
        <Link href="/owners" style={{ opacity: 0.85 }}>
          For Owners
        </Link>
      </div>

      {error === "cooldown" && (
        <div
          style={{
            marginTop: 14,
            padding: 12,
            borderRadius: 12,
            background: "#fff7ed",
            border: "1px solid #fed7aa",
            fontWeight: 800,
          }}
        >
          Cooldown active. Try again later.
        </div>
      )}

      {(vErr || !venue) && (
        <div style={{ marginTop: 14, padding: 14, borderRadius: 14, border: "1px solid var(--card-border)" }}>
          <h1 style={{ fontSize: 22, fontWeight: 950 }}>Venue error</h1>
          <div style={{ marginTop: 8, opacity: 0.85 }}>
            {vErr?.message || "Venue not found."}
          </div>
          <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
            Tip: confirm the venue id exists in Supabase.
          </div>
        </div>
      )}

      {venue && (
        <>
          <h1 style={{ marginTop: 14, fontSize: 28, fontWeight: 950 }}>{venue.name}</h1>
          <div style={{ marginTop: 6, opacity: 0.85 }}>
            {venue.address} — {venue.city} {venue.region}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
            {venue.category} · {venue.status}
          </div>

          {/* Analytics */}
          <div style={{ marginTop: 18, padding: 14, border: "1px solid var(--card-border)", borderRadius: 14 }}>
            <div style={{ fontWeight: 950, fontSize: 16 }}>Pilot Analytics</div>

            {analyticsError ? (
              <div style={{ marginTop: 10, opacity: 0.85 }}>
                Analytics unavailable (query error). Safe to ignore for now.
              </div>
            ) : (
              <div style={{ marginTop: 12, display: "flex", gap: 14, flexWrap: "wrap" }}>
                <div style={{ padding: 10, border: "1px solid var(--card-border)", borderRadius: 12 }}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>Requests today</div>
                  <div style={{ fontSize: 20, fontWeight: 950 }}>{requestsToday.count ?? 0}</div>
                </div>

                <div style={{ padding: 10, border: "1px solid var(--card-border)", borderRadius: 12 }}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>Requests (7d)</div>
                  <div style={{ fontSize: 20, fontWeight: 950 }}>{requests7d.count ?? 0}</div>
                </div>

                <div style={{ padding: 10, border: "1px solid var(--card-border)", borderRadius: 12 }}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>Tokens issued (7d)</div>
                  <div style={{ fontSize: 20, fontWeight: 950 }}>{tokens7d.count ?? 0}</div>
                </div>

                <div style={{ padding: 10, border: "1px solid var(--card-border)", borderRadius: 12 }}>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>Owner leads</div>
                  <div style={{ fontSize: 20, fontWeight: 950 }}>{leadsTotal.count ?? 0}</div>
                </div>
              </div>
            )}

            <div style={{ marginTop: 8, fontSize: 12, opacity: 0.65 }}>
              Rule-based access layer · no codes published.
            </div>
          </div>

          {/* Rules */}
          <h2 style={{ marginTop: 18, fontSize: 18, fontWeight: 950 }}>Access Rules</h2>

          {rErr && (
            <pre style={{ marginTop: 10, padding: 12, background: "#fee", borderRadius: 10 }}>
              Rules error: {rErr.message}
            </pre>
          )}

          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            {(rules || []).map((r: any) => (
              <div key={r.id} style={{ padding: 14, border: "1px solid var(--card-border)", borderRadius: 14 }}>
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
              <div style={{ padding: 14, border: "1px solid var(--card-border)", borderRadius: 14, opacity: 0.8 }}>
                No rules found yet.
              </div>
            )}
          </div>

          {/* CTAs */}
          <div style={{ marginTop: 18, display: "flex", gap: 12, flexWrap: "wrap" }}>
            <Link
              href={`/request/${venue.id}`}
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 10,
                background: "black",
                color: "white",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Request Access
            </Link>

            <a
              href={`/manage/${venue.id}`}
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid var(--card-border)",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Manage (stub)
            </a>

            <a
              href={`/claim/${venue.id}`}
              style={{
                display: "inline-block",
                padding: "10px 14px",
                borderRadius: 10,
                border: "1px solid var(--card-border)",
                textDecoration: "none",
                fontWeight: 900,
              }}
            >
              Claim venue
            </a>
          </div>
        </>
      )}
    </main>
  );
}
