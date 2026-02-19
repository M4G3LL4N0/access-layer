import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const TYPES = [
  "door",
  "garage",
  "gate",
  "elevator",
  "turnstile",
  "locker",
  "wifi",
  "api",
  "intercom",
  "kiosk",
];

function rowLabel(label: string) {
  return (
    <div style={{ fontSize: 12, fontWeight: 900, opacity: 0.75, marginBottom: 6 }}>
      {label}
    </div>
  );
}

export default async function AdminAccessPointsVenuePage({
  params,
  searchParams,
}: {
  params: { venueId: string };
  searchParams: Record<string, string | string[] | undefined>;
}) {
  const venueId = params.venueId;
  const ok = String(searchParams.ok || "") === "1";
  const err = String(searchParams.err || "");

  const supabase = supabaseServer();

  const { data: venue, error: vErr } = await supabase
    .from("venues")
    .select("id,name,city,region,status")
    .eq("id", venueId)
    .maybeSingle();

  const { data: accessPoints, error: apErr } = await supabase
    .from("access_points")
    .select("id, venue_id, name, type, external_ref, status, meta, created_at")
    .eq("venue_id", venueId)
    .order("created_at", { ascending: false });

  return (
    <main className="axw-container">
      <div className="axw-row" style={{ justifyContent: "space-between" }}>
        <div>
          <div className="axw-title" style={{ fontSize: 22 }}>
            Access Points — Venue
          </div>
          <div className="axw-muted" style={{ marginTop: 6 }}>
            {venue ? (
              <>
                <b>{venue.name}</b> · {venue.city} · {venue.region} · {venue.status}
              </>
            ) : (
              <>Venue not found.</>
            )}
          </div>
        </div>

        <div className="axw-row">
          <Link className="axw-btn" href="/admin/access-points">
            ← All Venues
          </Link>
          <Link className="axw-btn" href={`/v/${venueId}`}>
            Venue Page
          </Link>
          <Link className="axw-btn axw-btn-primary" href={`/kiosk/${venueId}`}>
            Kiosk
          </Link>
        </div>
      </div>

      {(vErr || apErr) && (
        <div className="axw-card" style={{ marginTop: 14, borderColor: "rgba(220,20,60,0.35)" }}>
          <div style={{ fontWeight: 900, color: "crimson" }}>Error</div>
          <div style={{ marginTop: 6, opacity: 0.9 }}>
            {vErr?.message || apErr?.message}
          </div>
        </div>
      )}

      {ok && (
        <div className="axw-card" style={{ marginTop: 14, borderColor: "rgba(0,140,80,0.35)" }}>
          <div style={{ fontWeight: 900 }}>✅ Created</div>
          <div className="axw-muted" style={{ marginTop: 6 }}>Access point added.</div>
        </div>
      )}

      {!!err && (
        <div className="axw-card" style={{ marginTop: 14, borderColor: "rgba(220,20,60,0.35)" }}>
          <div style={{ fontWeight: 900, color: "crimson" }}>Create failed</div>
          <div className="axw-muted" style={{ marginTop: 6 }}>{err}</div>
        </div>
      )}

      <div className="axw-grid" style={{ marginTop: 14 }}>
        <div className="axw-card">
          <div style={{ fontWeight: 950, fontSize: 16 }}>Add Access Point</div>
          <div className="axw-muted" style={{ marginTop: 6, fontSize: 13 }}>
            Every venue gets a registry of every access surface.
          </div>

          <form action={`/api/access-points/create`} method="post" style={{ marginTop: 12 }}>
            <input type="hidden" name="venueId" value={venueId} />

            {rowLabel("Name")}
            <input className="axw-input" name="name" placeholder="Front Door / Garage Lane A" required />

            <div style={{ marginTop: 12 }}>
              {rowLabel("Type")}
              <select
                name="type"
                className="axw-input"
                defaultValue="door"
                style={{ appearance: "auto" as any }}
              >
                {TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>

            <div style={{ marginTop: 12 }}>
              {rowLabel("External Ref (optional)")}
              <input className="axw-input" name="external_ref" placeholder="controller-id / lane-id" />
            </div>

            <div style={{ marginTop: 12 }}>
              {rowLabel("Status")}
              <select name="status" className="axw-input" defaultValue="active" style={{ appearance: "auto" as any }}>
                <option value="active">active</option>
                <option value="disabled">disabled</option>
              </select>
            </div>

            <div style={{ marginTop: 12 }}>
              {rowLabel("Meta (optional JSON)")}
              <textarea
                className="axw-input"
                name="meta"
                placeholder='{"lane":"A","notes":"2-hour validation"}'
                rows={4}
                style={{ resize: "vertical" }}
              />
            </div>

            <button className="axw-btn axw-btn-primary" style={{ marginTop: 12 }} type="submit">
              Create Access Point
            </button>
          </form>
        </div>

        <div className="axw-card">
          <div style={{ fontWeight: 950, fontSize: 16 }}>Existing Access Points</div>
          <div className="axw-muted" style={{ marginTop: 6, fontSize: 13 }}>
            {accessPoints?.length || 0} total
          </div>

          <div style={{ marginTop: 12, display: "grid", gap: 10 }}>
            {(accessPoints || []).map((ap) => (
              <div
                key={ap.id}
                style={{
                  border: "1px solid rgba(0,0,0,0.10)",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                <div style={{ fontWeight: 950 }}>{ap.name}</div>
                <div className="axw-muted" style={{ fontSize: 13, marginTop: 4 }}>
                  type: <b>{ap.type}</b> · status: <b>{ap.status}</b>
                </div>
                {ap.external_ref ? (
                  <div className="axw-muted" style={{ fontSize: 13, marginTop: 4 }}>
                    external_ref: <b>{ap.external_ref}</b>
                  </div>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
