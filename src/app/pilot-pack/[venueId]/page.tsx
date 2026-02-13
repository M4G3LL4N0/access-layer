export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function PilotPackPage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const supabase = supabaseServer;

  const { data: rows, error } = await supabase
    .from("venues")
    .select("id, name, city, region, category, status")
    .eq("id", venueId)
    .limit(1);

  const venue = rows?.[0];

  if (error || !venue) {
    return (
      <main style={{ padding: 28, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 28, fontWeight: 1000 }}>Pilot Pack</h1>
        <p style={{ color: "crimson" }}>Venue not found.</p>
        <Link href="/venues" style={{ textDecoration: "underline" }}>
          Back to directory →
        </Link>
      </main>
    );
  }

  const origin = "https://access-layer-five.vercel.app";

  const links = {
    venue: `${origin}/v/${venue.id}`,
    request: `${origin}/request/${venue.id}`,
    verify: `${origin}/verify`,
    signage: `${origin}/signage/${venue.id}`,
    manage: `${origin}/manage/${venue.id}`,
    metrics: `${origin}/admin/metrics`,
  };

  const box: React.CSSProperties = {
    background: "white",
    border: "1px solid #e5e7eb",
    borderRadius: 16,
    padding: 16,
  };

  const a: React.CSSProperties = {
    fontWeight: 900,
    textDecoration: "underline",
    display: "inline-block",
    marginTop: 8,
  };

  return (
    <main
      style={{
        padding: 28,
        fontFamily: "system-ui",
        background: "#f6f7fb",
        minHeight: "100vh",
      }}
    >
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 1000 }}>Pilot Pack</h1>
            <div style={{ marginTop: 6, opacity: 0.85 }}>
              <b>{venue.name}</b> — {venue.city} {venue.region} · {venue.category} · {venue.status}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href={`/v/${venue.id}`} style={{ textDecoration: "underline", fontWeight: 900 }}>
              Venue Page →
            </Link>
            <Link href="/venues" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Directory →
            </Link>
          </div>
        </div>

        <section style={{ ...box, marginTop: 16 }}>
          <div style={{ fontWeight: 1000, fontSize: 18 }}>What this is</div>
          <p style={{ marginTop: 10, lineHeight: 1.7, opacity: 0.9 }}>
            A lightweight pilot that issues <b>time-limited access passes</b> (no codes published). Patrons request
            a pass, staff verifies on a phone in seconds.
          </p>
          <ol style={{ marginTop: 8, lineHeight: 1.8 }}>
            <li>Patron opens the request page and taps “Request”.</li>
            <li>They receive an active pass for a short window.</li>
            <li>Staff verifies token/QR at /verify.</li>
          </ol>
        </section>

        <section style={{ ...box, marginTop: 12 }}>
          <div style={{ fontWeight: 1000, fontSize: 18 }}>Core links</div>

          <div style={{ marginTop: 8 }}>
            <a href={links.request} style={a}>
              Request Page
            </a>
            <br />
            <a href={links.verify} style={a}>
              Staff Verify Page
            </a>
            <br />
            <a href={links.signage} style={a}>
              Printable Signage
            </a>
            <br />
            <a href={links.venue} style={a}>
              Public Venue Page
            </a>
            <br />
            <a href={links.manage} style={a}>
              Owner Manage (WIP)
            </a>
            <br />
            <a href={links.metrics} style={a}>
              Pilot Metrics (Demo)
            </a>
          </div>

          <p style={{ marginTop: 12, opacity: 0.75, fontSize: 13 }}>
            Tip: print signage and place near door + front desk. Staff keeps /verify open.
          </p>
        </section>

        <section style={{ ...box, marginTop: 12 }}>
          <div style={{ fontWeight: 1000, fontSize: 18 }}>1-minute demo script</div>
          <ol style={{ marginTop: 10, lineHeight: 1.8 }}>
            <li>Open Request Page → Request a pass.</li>
            <li>Copy the token from the pass page.</li>
            <li>Open Staff Verify → paste token → show “valid”.</li>
            <li>Open Metrics → show today’s pass count.</li>
          </ol>
        </section>

        <div style={{ marginTop: 14 }}>
          <Link href="/venues" style={{ textDecoration: "underline", fontWeight: 900 }}>
            Back to directory →
          </Link>
        </div>
      </div>
    </main>
  );
}
