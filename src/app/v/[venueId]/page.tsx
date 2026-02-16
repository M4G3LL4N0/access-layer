import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

type Venue = {
  id: string;
  name: string;
  address: string | null;
  city: string | null;
  region: string | null;
  country: string | null;
  category: string | null;
  status: string | null;
  lat: number | null;
  lng: number | null;
};

type Rule = {
  id: string;
  rule_name: string | null;
  is_enabled: boolean | null;
  start_time: string | null;
  end_time: string | null;
  days_of_week: number[] | null;
  max_grants_per_user_per_day: number | null;
  min_minutes_between_grants: number | null;
  access_mode: string | null;
  requires_payment: boolean | null;
  price_cents: number | null;
  require_login: boolean | null;
};

function fmtTime(t?: string | null) {
  if (!t) return "—";
  return t.slice(0, 5);
}

function fmtDays(d?: number[] | null) {
  if (!d || d.length === 0) return "Any day";
  const map = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return d.map((x) => map[x] || String(x)).join(", ");
}

export default async function VenuePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const supabase = supabaseServer;

  const { data: venue, error: vErr } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,category,status,lat,lng")
    .eq("id", venueId)
    .limit(1)
    .maybeSingle();

  if (vErr) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>Venue error</h1>
        <pre style={{ whiteSpace: "pre-wrap" }}>{vErr.message}</pre>
        <Link href="/venues">Back</Link>
      </main>
    );
  }

  if (!venue) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 22, fontWeight: 900 }}>Venue error</h1>
        <p>Venue not found.</p>
        <p style={{ opacity: 0.75 }}>
          Tip: confirm the venue id exists in Supabase.
        </p>
        <Link href="/venues">Back</Link>
      </main>
    );
  }

  const { data: rules } = await supabase
    .from("access_rules")
    .select(
      "id,rule_name,is_enabled,start_time,end_time,days_of_week,max_grants_per_user_per_day,min_minutes_between_grants,access_mode,requires_payment,price_cents,require_login"
    )
    .eq("venue_id", venue.id)
    .order("created_at", { ascending: false })
    .limit(5);

  const rule = (rules && rules[0]) as Rule | undefined;

  const line = [
    venue.address,
    venue.city,
    venue.region,
    venue.country,
  ]
    .filter(Boolean)
    .join(" — ");

  const pillStyle: React.CSSProperties = {
    display: "inline-block",
    padding: "6px 10px",
    borderRadius: 999,
    border: "1px solid rgba(0,0,0,0.12)",
    fontSize: 12,
    fontWeight: 800,
    opacity: 0.9,
  };

  const cardStyle: React.CSSProperties = {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 16,
    padding: 16,
    background: "white",
  };

  const btnBlack: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    background: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 900,
  };

  const btnOutline: React.CSSProperties = {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.14)",
    color: "black",
    textDecoration: "none",
    fontWeight: 900,
  };

  return (
    <main
      style={{
        padding: 24,
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#f7f7f8",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Link href="/venues" style={{ opacity: 0.8 }}>
            ← Back to directory
          </Link>
          <a href="/contact" style={{ opacity: 0.8 }}>
            Contact
          </a>
        </div>

        <h1 style={{ marginTop: 12, fontSize: 28, fontWeight: 950 }}>
          {venue.name}
        </h1>

        <div style={{ marginTop: 8, opacity: 0.8 }}>{line || "—"}</div>

        <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <span style={pillStyle}>{venue.category || "venue"}</span>
          <span style={pillStyle}>{venue.status || "unknown"}</span>
        </div>

        {/* Access Rules */}
        <section style={{ marginTop: 18 }}>
          <div style={cardStyle}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950 }}>
              Access Rules
            </h2>

            {rule ? (
              <div style={{ marginTop: 10, lineHeight: 1.65 }}>
                <div style={{ fontWeight: 900 }}>
                  {rule.rule_name || "Default Rule"}
                </div>
                <div style={{ opacity: 0.85 }}>
                  {fmtDays(rule.days_of_week)} · {fmtTime(rule.start_time)} to{" "}
                  {fmtTime(rule.end_time)} · max/day{" "}
                  {rule.max_grants_per_user_per_day ?? "—"} · cooldown{" "}
                  {rule.min_minutes_between_grants ?? "—"} min · mode:{" "}
                  {rule.access_mode || "—"}
                </div>
              </div>
            ) : (
              <div style={{ marginTop: 10, opacity: 0.8 }}>
                No rules configured yet.
              </div>
            )}

            <div style={{ marginTop: 14, display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={`/request/${venue.id}`} style={btnBlack}>
                Request Access
              </Link>

              <Link href={`/verify?venueId=${venue.id}`} style={btnOutline}>
                Staff Verify
              </Link>
            </div>

            <div style={{ marginTop: 10 }}>
              <Link
                href={`/manage/${venue.id}`}
                style={{ opacity: 0.85, textDecoration: "underline", fontWeight: 800 }}
              >
                Claim & manage this venue →
              </Link>
            </div>
          </div>
        </section>

        {/* Parking Validation */}
        <section style={{ marginTop: 14 }}>
          <div style={cardStyle}>
            <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950 }}>
              Parking Validation (Pilot)
            </h2>
            <p style={{ marginTop: 8, opacity: 0.85, lineHeight: 1.55 }}>
              Issue time-bounded parking validations (like Target / garages). This is a
              controlled token system — no shared codes.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <Link href={`/kiosk/parking/${venue.id}`} style={btnBlack}>
                Open Parking Kiosk
              </Link>

              <a
                href={`/api/parking/latest?venueId=${venue.id}`}
                style={btnOutline}
              >
                View latest validations (debug)
              </a>
            </div>

            <div style={{ marginTop: 10, fontSize: 13, opacity: 0.7 }}>
              Demo workflow: kiosk issues token → driver exits gate → staff/edge verifies token.
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
