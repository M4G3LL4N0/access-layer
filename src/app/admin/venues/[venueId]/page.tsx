export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function AdminVenueEdit({
  params,
  searchParams,
}: {
  params: Promise<{ venueId: string }>;
  searchParams?: Promise<{ token?: string; ok?: string }>;
}) {
  const { venueId } = await params;
  const sp = (await searchParams) || {};
  const token = sp.token || "";
  const ok = sp.ok === "1";

  const { data: venue, error: vErr } = await supabaseServer
    .from("venues")
    .select("id,name,status,category,city,region,address")
    .eq("id", venueId)
    .maybeSingle();

  const { data: rule, error: rErr } = await supabaseServer
    .from("access_rules")
    .select("id,rule_name,is_enabled,access_mode,start_time,end_time,max_grants_per_user_per_day,min_minutes_between_grants")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  return (
    <main style={{ padding: 24, fontFamily: "system-ui", maxWidth: 980, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <h1 style={{ fontSize: 26, fontWeight: 950 }}>Admin · Edit Venue</h1>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <Link href={`/admin/venues?token=${encodeURIComponent(token)}`} style={{ opacity: 0.8 }}>← Venues</Link>
          <Link href={`/v/${venueId}`} style={{ opacity: 0.8 }}>View</Link>
        </div>
      </div>

      {ok && (
        <div style={{ marginTop: 14, padding: 12, borderRadius: 12, background: "#f0fff4", border: "1px solid #c9f2d3", fontWeight: 900 }}>
          Saved.
        </div>
      )}

      {(vErr || !venue) && (
        <pre style={{ marginTop: 12, padding: 12, background: "#fee", borderRadius: 10 }}>
          Venue error: {vErr?.message || "Not found"}
        </pre>
      )}

      {venue && (
        <div style={{ marginTop: 14, padding: 14, border: "1px solid var(--card-border)", borderRadius: 14 }}>
          <div style={{ fontWeight: 950, fontSize: 18 }}>{venue.name}</div>
          <div style={{ marginTop: 6, opacity: 0.85 }}>
            {venue.address} — {venue.city}, {venue.region}
          </div>
          <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
            {venue.category} · status: {venue.status}
          </div>
        </div>
      )}

      {/* Venue status */}
      <h2 style={{ marginTop: 18, fontSize: 18, fontWeight: 950 }}>Venue Status</h2>
      <form action={`/api/admin/venue-status?token=${encodeURIComponent(token)}`} method="post" style={{ marginTop: 10, maxWidth: 520 }}>
        <input type="hidden" name="venueId" value={venueId} />
        <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Status</label>
        <select name="status" defaultValue={venue?.status || "active"} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }}>
          <option value="active">active</option>
          <option value="inactive">inactive</option>
        </select>
        <button style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "black", color: "white", border: "none", fontWeight: 950 }}>
          Save status
        </button>
      </form>

      {/* Rule editor */}
      <h2 style={{ marginTop: 22, fontSize: 18, fontWeight: 950 }}>Rule Editor (Admin)</h2>
      {rErr && (
        <pre style={{ marginTop: 10, padding: 12, background: "#fee", borderRadius: 10 }}>
          Rule error: {rErr.message}
        </pre>
      )}
<section style={{ marginTop: 22, padding: 16, border: "1px solid var(--card-border)", borderRadius: 16 }}>
  <div style={{ fontWeight: 950, fontSize: 18 }}>Invite an owner</div>
  <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.6 }}>
    Enter an email. You’ll get a one-time token you can send them. They log in and redeem it.
  </p>

  <form
    action={`/api/admin/create-invite?token=${encodeURIComponent(token)}`}
    method="post"
    style={{ marginTop: 10, maxWidth: 520 }}
    onSubmit={(e) => {
      // leave as normal submit; token will appear as JSON response in browser
    }}
  >
    <input type="hidden" name="venueId" value={venueId} />
    <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Owner email</label>
    <input
      name="email"
      type="email"
      required
      placeholder="owner@venue.com"
      style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }}
    />
    <button style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "black", color: "white", border: "none", fontWeight: 950 }}>
      Create invite
    </button>
  </form>

  <div style={{ marginTop: 10, fontSize: 12, opacity: 0.7 }}>
    After submit, your browser will show JSON containing the invite token. Copy it into an email.
  </div>
</section>
      <form action={`/api/admin/rule-update?token=${encodeURIComponent(token)}`} method="post" style={{ marginTop: 10, maxWidth: 520 }}>
        <input type="hidden" name="venueId" value={venueId} />

        <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Rule name</label>
        <input name="rule_name" defaultValue={rule?.rule_name || "Default Pilot Rule"} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }} />

        <label style={{ display: "block", fontWeight: 900, marginTop: 12, marginBottom: 6 }}>Enabled</label>
        <select name="is_enabled" defaultValue={(rule?.is_enabled ?? true) ? "true" : "false"} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }}>
          <option value="true">true</option>
          <option value="false">false</option>
        </select>

        <label style={{ display: "block", fontWeight: 900, marginTop: 12, marginBottom: 6 }}>Mode</label>
        <select name="access_mode" defaultValue={rule?.access_mode || "show_pass"} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }}>
          <option value="show_pass">show_pass</option>
          <option value="deny">deny</option>
        </select>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Start</label>
            <input name="start_time" defaultValue={rule?.start_time || "08:00"} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>End</label>
            <input name="end_time" defaultValue={rule?.end_time || "18:00"} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }} />
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Max/day</label>
            <input name="max_per_day" defaultValue={String(rule?.max_grants_per_user_per_day ?? 3)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }} />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: "block", fontWeight: 900, marginBottom: 6 }}>Cooldown (min)</label>
            <input name="cooldown_min" defaultValue={String(rule?.min_minutes_between_grants ?? 30)} style={{ width: "100%", padding: 10, borderRadius: 10, border: "1px solid var(--card-border)" }} />
          </div>
        </div>

        <button style={{ marginTop: 12, padding: "10px 14px", borderRadius: 10, background: "black", color: "white", border: "none", fontWeight: 950 }}>
          Save rule
        </button>

        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>
          This is admin-only for now. Owner verification comes next.
        </div>
      </form>
    </main>
  );
}
