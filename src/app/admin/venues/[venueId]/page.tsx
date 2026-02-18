import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const font = 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';

function Btn({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.14)",
        textDecoration: "none",
        fontWeight: 950,
        color: "#111",
        background: "white",
      }}
    >
      {label}
    </Link>
  );
}

function Pill({ children }: { children: any }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,0.12)",
        fontSize: 12,
        fontWeight: 800,
        background: "white",
      }}
    >
      {children}
    </span>
  );
}

export default async function AdminVenueDetailPage({
  params,
  searchParams,
}: {
  params: { venueId: string } | Promise<{ venueId: string }>;
  searchParams: { ok?: string } | Promise<{ ok?: string }>;
}) {
  const p = await params;
  const sp = await searchParams;
  const ok = sp?.ok === "1";
  const venueId = p?.venueId || "";

  if (!venueId) {
    return (
      <main style={{ fontFamily: font, background: "white", color: "#111" }}>
        <div style={{ maxWidth: 980, margin: "0 auto", padding: 28 }}>
          <div style={{ fontWeight: 950, fontSize: 22 }}>Admin — Venue</div>
          <div style={{ marginTop: 10 }}>Missing venueId param.</div>
          <div style={{ marginTop: 14 }}>
            <Btn href="/admin/venues" label="← Back to venues" />
          </div>
        </div>
      </main>
    );
  }

  // ✅ IMPORTANT: await the query then destructure
  const { data: venue, error: vErr } = await supabaseServer()
    .from("venues")
    .select("id,name,status,category,city,region,address,created_at")
    .eq("id", venueId)
    .maybeSingle();

  // Pull latest rule + recent pass activity (optional, safe if tables exist)
  const { data: rules, error: rErr } = await supabaseServer()
    .from("access_rules")
    .select("id,rule_name,is_enabled,access_mode,start_time,end_time,days_of_week,require_login,requires_payment,price_cents")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(25);

  const { data: latestPass, error: pErr } = await supabaseServer()
    .from("access_passes")
    .select("token,status,issued_at,expires_at,created_at")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(1);

  const pass = (latestPass || [])[0] || null;

  return (
    <main style={{ fontFamily: font, background: "white", color: "#111" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px 64px" }}>
        <header style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 950 }}>Admin — Venue</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>Detail view + quick links for operators.</div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn href="/admin/venues" label="← Back to venues" />
            <Btn href="/admin" label="Admin home" />
          </div>
        </header>

        {ok && (
          <div
            style={{
              marginTop: 14,
              border: "1px solid rgba(0,0,0,0.12)",
              background: "white",
              borderRadius: 16,
              padding: 12,
              fontWeight: 900,
            }}
          >
            ✅ Updated.
          </div>
        )}

        <section style={{ marginTop: 16, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 950, marginBottom: 10 }}>Venue</div>

          {vErr ? (
            <div>
              <div style={{ fontWeight: 900 }}>Error loading venue</div>
              <pre style={{ fontSize: 12, overflowX: "auto", marginTop: 8 }}>{String(vErr.message || vErr)}</pre>
            </div>
          ) : !venue ? (
            <div>
              <div style={{ fontWeight: 900 }}>Venue not found</div>
              <div style={{ marginTop: 6, opacity: 0.75, fontSize: 13 }}>
                ID: <code>{venueId}</code>
              </div>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <div style={{ fontSize: 18, fontWeight: 950 }}>{venue.name}</div>
                <Pill>{venue.status}</Pill>
                {venue.category ? <Pill>{venue.category}</Pill> : null}
                {venue.city ? <Pill>{venue.city}</Pill> : null}
                {venue.region ? <Pill>{venue.region}</Pill> : null}
              </div>

              <div style={{ fontSize: 13, opacity: 0.75 }}>
                <div>
                  <b>ID:</b> <code>{venue.id}</code>
                </div>
                {venue.address ? (
                  <div>
                    <b>Address:</b> {venue.address}
                  </div>
                ) : null}
              </div>

              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginTop: 6 }}>
                <Btn href={`/v/${venue.id}`} label="Public venue page" />
                <Btn href={`/kiosk/${venue.id}`} label="Kiosk" />
                <Btn href={`/kiosk/parking/${venue.id}`} label="Parking kiosk" />
                <Btn href={`/signage/${venue.id}`} label="Signage" />
                <Btn href={`/pilot-pack/${venue.id}`} label="Pilot pack" />
                <Btn href={`/ops/${venue.id}`} label="Ops console" />
              </div>
            </div>
          )}
        </section>

        <section style={{ marginTop: 16, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 950, marginBottom: 10 }}>Rules</div>

          {rErr ? (
            <pre style={{ fontSize: 12, overflowX: "auto" }}>{String(rErr.message || rErr)}</pre>
          ) : (rules || []).length === 0 ? (
            <div style={{ opacity: 0.75 }}>No rules found for this venue yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {(rules || []).map((r: any) => (
                <div key={r.id} style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                    <div style={{ fontWeight: 950 }}>{r.rule_name || "Rule"}</div>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                      <Pill>{r.is_enabled ? "enabled" : "disabled"}</Pill>
                      {r.access_mode ? <Pill>{r.access_mode}</Pill> : null}
                      {r.require_login ? <Pill>login</Pill> : <Pill>no-login</Pill>}
                      {r.requires_payment ? <Pill>${(Number(r.price_cents || 0) / 100).toFixed(2)}</Pill> : <Pill>free</Pill>}
                    </div>
                  </div>

                  <div style={{ fontSize: 13, opacity: 0.8, marginTop: 6, lineHeight: 1.6 }}>
                    <div>
                      <b>Window:</b> {r.start_time || "—"} → {r.end_time || "—"}
                    </div>
                    <div>
                      <b>Days:</b> {Array.isArray(r.days_of_week) ? r.days_of_week.join(", ") : "—"}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        <section style={{ marginTop: 16, border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 950, marginBottom: 10 }}>Latest access pass</div>

          {pErr ? (
            <pre style={{ fontSize: 12, overflowX: "auto" }}>{String(pErr.message || pErr)}</pre>
          ) : !pass ? (
            <div style={{ opacity: 0.75 }}>No access passes yet.</div>
          ) : (
            <div style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
                <Pill>{pass.status}</Pill>
                <Pill>expires {new Date(pass.expires_at).toLocaleString()}</Pill>
              </div>

              <div style={{ fontSize: 13 }}>
                <div>
                  <b>Token:</b> <code>{pass.token}</code>
                </div>
                <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
                  <Btn href={`/pass/${pass.token}`} label="View pass" />
                  <Btn href={`/verify?token=${pass.token}`} label="Verify" />
                </div>
              </div>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
