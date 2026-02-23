import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function asClient(maybeFn: any) {
  return typeof maybeFn === "function" ? maybeFn() : maybeFn;
}

function box(): React.CSSProperties {
  return {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 16,
    padding: 16,
    background: "#fff",
  };
}

function btnPrimary(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    background: "black",
    color: "white",
    textDecoration: "none",
    fontWeight: 950,
  };
}

function btn(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 14px",
    borderRadius: 12,
    border: "1px solid rgba(0,0,0,0.14)",
    color: "inherit",
    textDecoration: "none",
    fontWeight: 950,
    background: "#fff",
  };
}

export default async function PilotPackPage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const supabase = await asClient(supabaseServer);

  const { data: venue, error: vErr } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,category,status")
    .eq("id", venueId)
    .limit(1)
    .maybeSingle();

  if (vErr || !venue) {
    return (
      <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
        <div style={{ maxWidth: 980, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1000 }}>Pilot Pack</h1>
          <div style={{ marginTop: 10, ...box() }}>
            <div style={{ fontWeight: 950 }}>Venue not found.</div>
            <div style={{ opacity: 0.8, marginTop: 8 }}>
              Debug: confirm venue id exists in Supabase.
            </div>
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

  const links = {
    venue: `${base}/v/${venue.id}`,
    request: `${base}/request/${venue.id}`,
    signage: `${base}/signage/${venue.id}`,
    verify: `${base}/verify`,
    manage: `${base}/manage/${venue.id}`,
    report: `${base}/reports/sf`,
    contact: `${base}/contact`,
  };

  const line = [
    venue.address || "",
    venue.city || "",
    venue.region || "",
    venue.country || "",
  ]
    .filter(Boolean)
    .join(" · ");

  return (
    <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
      <div style={{ maxWidth: 980, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 28, fontWeight: 1000, letterSpacing: -0.4 }}>
              Pilot Pack
            </h1>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              One-link kit for onboarding staff + proving value fast.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center" }}>
            <Link href="/venues" style={btn()}>Directory</Link>
            <a href={links.report} style={btn()} target="_blank" rel="noreferrer">SF Report</a>
            <a href={links.contact} style={btn()} target="_blank" rel="noreferrer">Contact</a>
          </div>
        </div>

        <div style={{ marginTop: 14, ...box() }}>
          <div style={{ fontWeight: 1000, fontSize: 20 }}>{venue.name}</div>
          <div style={{ marginTop: 6, opacity: 0.8 }}>
            {line || `${venue.city || ""} ${venue.region || ""}`.trim() || "—"}
            {venue.category ? ` · ${venue.category}` : ""}
            {venue.status ? ` · ${venue.status}` : ""}
          </div>
        </div>

        <div style={{ marginTop: 12, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div style={box()}>
            <div style={{ fontWeight: 1000, marginBottom: 10 }}>Core links</div>
            <div style={{ display: "grid", gap: 8 }}>
              <a href={links.venue} style={btn()} target="_blank" rel="noreferrer">Venue Page</a>
              <a href={links.request} style={btnPrimary()} target="_blank" rel="noreferrer">Request Access</a>
              <a href={links.signage} style={btn()} target="_blank" rel="noreferrer">Print Signage</a>
              <a href={links.verify} style={btn()} target="_blank" rel="noreferrer">Staff Verify</a>
            </div>
          </div>

          <div style={box()}>
            <div style={{ fontWeight: 1000, marginBottom: 10 }}>What to tell staff (15 seconds)</div>
            <div style={{ lineHeight: 1.6, opacity: 0.92 }}>
              Guests show a <b>time-limited pass</b> (QR/token). Staff checks validity on{" "}
              <b>/verify</b>. Passes expire automatically. No codes are published.
            </div>

            <div style={{ marginTop: 12, fontWeight: 1000 }}>Pilot checklist</div>
            <ol style={{ margin: "8px 0 0", paddingLeft: 18, lineHeight: 1.7 }}>
              <li>Confirm hours + caps + cooldown.</li>
              <li>Print signage + brief staff.</li>
              <li>Run 7 days, watch issuance + denials.</li>
              <li>Expand to another workflow if it helps.</li>
            </ol>
          </div>
        </div>

        <div style={{ marginTop: 12, ...box() }}>
          <div style={{ fontWeight: 1000, marginBottom: 10 }}>Owner controls (optional)</div>
          <div style={{ opacity: 0.85 }}>
            If you’re invited as an owner you can manage rules and venue details:
          </div>
          <div style={{ marginTop: 10 }}>
            <a href={links.manage} style={btn()} target="_blank" rel="noreferrer">
              Manage Venue →
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
