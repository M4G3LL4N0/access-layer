import Link from "next/link";
import { SubpageVisual } from "@/components/SubpageVisual";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "4px 10px",
        borderRadius: 999,
        border: "1px solid rgba(0,0,0,0.14)",
        background: "rgba(0,0,0,0.03)",
        fontWeight: 900,
        fontSize: 12,
      }}
    >
      {children}
    </span>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 14 }}>
      <div style={{ fontWeight: 1000, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

function Btn({
  href,
  children,
  solid,
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        textDecoration: "none",
        fontWeight: 950,
        border: solid ? "1px solid black" : "1px solid rgba(0,0,0,0.14)",
        background: solid ? "black" : "transparent",
        color: solid ? "white" : "inherit",
      }}
    >
      {children}
    </a>
  );
}

export default async function AdminVenueDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ venueId: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { venueId } = await params;
  const sp = await searchParams;
  const token = (sp.token as string) || "";

  const supabase = await supabaseServer();

  // ✅ MUST await query then destructure.
  const { data: venue, error: vErr } = await supabase
    .from("venues")
    .select("id,name,status,category,city,region,address,created_at")
    .eq("id", venueId)
    .maybeSingle();

  // Pull rule(s) if present (safe even if none exist).
  const { data: rules } = await supabase
    .from("access_rules")
    .select("id,rule_name,is_enabled,start_time,end_time,days_of_week,access_mode,requires_payment,price_cents,require_login,created_at")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(25);

  // Owners (may be empty)
  const { data: owners } = await supabase
    .from("venue_owners")
    .select("id,user_id,role,created_at")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(25);

  // Latest passes (may be empty)
  const { data: passes } = await supabase
    .from("access_passes")
    .select("token,status,issued_at,expires_at,created_at,requester_id")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false })
    .limit(10);

  const backHref = `/admin/venues${token ? `?token=${encodeURIComponent(token)}` : ""}`;

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <SubpageVisual variant="default" />
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>Admin — Venue Detail</h1>
            <div style={{ opacity: 0.7, marginTop: 4, fontSize: 13 }}>
              Inspect venue, rules, owners, and recent passes.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href={backHref}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                textDecoration: "none",
                color: "inherit",
                fontWeight: 950,
              }}
            >
              ← Back to Venues
            </Link>

            <Btn href={`/v/${encodeURIComponent(venueId)}`} solid>
              Public venue page
            </Btn>

            <Btn href={`/kiosk/${encodeURIComponent(venueId)}`}>Kiosk</Btn>
            <Btn href={`/kiosk/parking/${encodeURIComponent(venueId)}`}>Parking kiosk</Btn>
            <Btn href={`/pilot-pack/${encodeURIComponent(venueId)}`}>Pilot pack</Btn>
            <Btn href={`/signage/${encodeURIComponent(venueId)}`}>Signage</Btn>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Pill>venueId: {venueId}</Pill>
          <Pill>token: {token ? "present" : "missing"}</Pill>
          {venue?.status ? <Pill>status: {venue.status}</Pill> : null}
          {venue?.category ? <Pill>category: {venue.category}</Pill> : null}
        </div>

        {vErr ? (
          <div
            style={{
              marginTop: 16,
              padding: 12,
              borderRadius: 12,
              border: "1px solid rgba(255,0,0,0.25)",
              background: "rgba(255,0,0,0.06)",
              color: "#7a1a1a",
              fontWeight: 900,
            }}
          >
            Error loading venue: {vErr.message}
          </div>
        ) : null}

        {!venue ? (
          <div style={{ marginTop: 16, padding: 14, borderRadius: 14, border: "1px solid rgba(0,0,0,0.12)" }}>
            Venue not found.
          </div>
        ) : (
          <div style={{ marginTop: 16, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: 14 }}>
            <Card title="Venue">
              <div style={{ fontWeight: 1000, fontSize: 16 }}>{venue.name}</div>
              <div style={{ marginTop: 6, opacity: 0.75, lineHeight: 1.45 }}>
                <div>
                  Location: <b>{venue.city || "—"}</b>, <b>{venue.region || "—"}</b>
                </div>
                <div>Address: {venue.address || "—"}</div>
                <div>Created: {venue.created_at ? new Date(venue.created_at).toLocaleString() : "—"}</div>
              </div>
            </Card>

            <Card title="Quick actions">
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <Btn href={`/api/kiosk/stats?venueId=${encodeURIComponent(venueId)}`}>Kiosk stats JSON</Btn>
                <Btn href={`/api/debug/latest-pass?venueId=${encodeURIComponent(venueId)}`}>Latest pass JSON</Btn>
                <Btn href={`/api/debug/passes?venueId=${encodeURIComponent(venueId)}`}>Passes JSON</Btn>
              </div>

              <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
                Tip: open JSON in a new tab so it displays cleanly.
              </div>
            </Card>

            <Card title={`Access rules (${(rules || []).length})`}>
              {(rules || []).length === 0 ? (
                <div style={{ opacity: 0.7 }}>No rules found.</div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {(rules || []).map((r) => (
                    <div key={r.id} style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                      <div style={{ fontWeight: 950 }}>{r.rule_name}</div>
                      <div style={{ marginTop: 6, fontSize: 13, opacity: 0.85, lineHeight: 1.45 }}>
                        <div>Enabled: <b>{r.is_enabled ? "yes" : "no"}</b></div>
                        <div>Hours: <b>{r.start_time}</b>–<b>{r.end_time}</b> · Days: <b>{JSON.stringify(r.days_of_week)}</b></div>
                        <div>Mode: <b>{r.access_mode}</b></div>
                        <div>Requires login: <b>{r.require_login ? "yes" : "no"}</b></div>
                        <div>Requires payment: <b>{r.requires_payment ? "yes" : "no"}</b> · Price: <b>{r.price_cents ?? 0}</b> cents</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card title={`Venue owners (${(owners || []).length})`}>
              {(owners || []).length === 0 ? (
                <div style={{ opacity: 0.7 }}>No owners found.</div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {(owners || []).map((o) => (
                    <div key={o.id} style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                      <div style={{ fontWeight: 950 }}>role: {o.role}</div>
                      <div style={{ marginTop: 6, fontSize: 13, opacity: 0.85 }}>
                        <div>user_id: {o.user_id}</div>
                        <div>created: {o.created_at ? new Date(o.created_at).toLocaleString() : "—"}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            <Card title={`Recent passes (${(passes || []).length})`}>
              {(passes || []).length === 0 ? (
                <div style={{ opacity: 0.7 }}>No passes found.</div>
              ) : (
                <div style={{ display: "grid", gap: 10 }}>
                  {(passes || []).map((p) => (
                    <div key={p.token} style={{ border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, padding: 12 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                        <div style={{ fontWeight: 950 }}>token: {p.token}</div>
                        <Pill>{p.status}</Pill>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 13, opacity: 0.85, lineHeight: 1.45 }}>
                        <div>Issued: {p.issued_at ? new Date(p.issued_at).toLocaleString() : "—"}</div>
                        <div>Expires: {p.expires_at ? new Date(p.expires_at).toLocaleString() : "—"}</div>
                        <div>
                          <a href={`/pass/${encodeURIComponent(p.token)}`} style={{ fontWeight: 950 }}>
                            View pass →
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>
          </div>
        )}

        <div style={{ marginTop: 18, fontSize: 12, opacity: 0.7 }}>
          Admin seed token you use: <b>everythingchangesatsomepoint</b>
        </div>
      </div>
    </main>
  );
}
