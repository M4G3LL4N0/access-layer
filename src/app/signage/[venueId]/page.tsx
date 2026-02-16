kimport Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function asClient(maybeFn: any) {
  return typeof maybeFn === "function" ? maybeFn() : maybeFn;
}

export default async function SignagePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;
  const supabase = await asClient(supabaseServer);

  const { data: venue, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,category,status")
    .eq("id", venueId)
    .limit(1)
    .maybeSingle();

  if (error || !venue) {
    return (
      <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1000 }}>Signage</h1>
          <div style={{ marginTop: 12, padding: 16, borderRadius: 16, border: "1px solid rgba(0,0,0,0.12)" }}>
            <div style={{ fontWeight: 950 }}>Venue not found.</div>
            <div style={{ opacity: 0.8, marginTop: 8 }}>Check venue id exists in Supabase.</div>
            <div style={{ marginTop: 12 }}>
              <Link href="/venues" style={btn()}>
                Back to directory →
              </Link>
            </div>
          </div>
        </div>
      </main>
    );
  }

  const base =
    process.env.NEXT_PUBLIC_APP_BASE_URL?.replace(/\/$/, "") ||
    "https://app.accessxworld.com";

  const requestUrl = `${base}/request/${venue.id}`;
  const verifyUrl = `${base}/verify`;

  const line = [venue.address, venue.city, venue.region, venue.country].filter(Boolean).join(" · ");

  return (
    <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 1000, letterSpacing: -0.4 }}>
              Signage (Printable)
            </h1>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              For staff + guests. No codes displayed. Time-limited passes only.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link href={`/pilot-pack/${venue.id}`} style={btn()}>
              Pilot pack →
            </Link>
            <Link href="/venues" style={btn()}>
              Directory
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 14, border: "2px solid #000", borderRadius: 18, padding: 18 }}>
          <div style={{ fontWeight: 1000, fontSize: 22 }}>{venue.name}</div>
          <div style={{ marginTop: 4, opacity: 0.8 }}>{line || "—"}</div>
          <div style={{ marginTop: 8, opacity: 0.85 }}>
            Category: <b>{venue.category || "—"}</b> · Status: <b>{venue.status || "—"}</b>
          </div>

          <hr style={{ margin: "14px 0", border: "none", borderTop: "1px solid rgba(0,0,0,0.2)" }} />

          <div style={{ fontSize: 18, fontWeight: 1000 }}>Request Access Pass</div>
          <div style={{ marginTop: 6, fontSize: 14, opacity: 0.85 }}>
            Open this link and request a time-limited pass. Passes expire automatically.
          </div>

          <div
            style={{
              marginTop: 10,
              padding: 12,
              borderRadius: 14,
              background: "rgba(0,0,0,0.05)",
              fontWeight: 900,
              wordBreak: "break-word",
            }}
          >
            {requestUrl}
          </div>

          <div style={{ marginTop: 14, fontSize: 16, fontWeight: 1000 }}>Staff verification</div>
          <div style={{ marginTop: 6, fontSize: 14, opacity: 0.85 }}>
            Staff checks pass validity here:
          </div>

          <div
            style={{
              marginTop: 10,
              padding: 12,
              borderRadius: 14,
              background: "rgba(0,0,0,0.05)",
              fontWeight: 900,
              wordBreak: "break-word",
            }}
          >
            {verifyUrl}
          </div>

          <div style={{ marginTop: 14, fontSize: 13, opacity: 0.8 }}>
            AXW Access ↔ Space pilot · Passes are time-limited and logged · No codes are published.
          </div>
        </div>

        <div style={{ marginTop: 12, opacity: 0.7, fontSize: 12 }}>
          Tip: print this page. If you need a QR version later, we’ll add it after we stabilize auth.
        </div>
      </div>
    </main>
  );
}

function btn(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.14)",
    textDecoration: "none",
    color: "inherit",
    fontWeight: 950,
    background: "#fff",
  };
}
