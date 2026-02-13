export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function PilotPackPage({ params }: { params: Promise<{ venueId: string }> }) {
  const { venueId } = await params;

  const supabase = supabaseServer;
  const { data: venueRows, error } = await supabase
    .from("venues")
    .select("id, name, city, region, category, status")
    .eq("id", venueId)
    .limit(1);

  const venue = venueRows?.[0];

  const origin = "https://access-layer-five.vercel.app";

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

  const links = {
    venue: `${origin}/v/${venue.id}`,
    request: `${origin}/request/${venue.id}`,
    passExample: `${origin}/pass/REPLACE_WITH_TOKEN`,
    verify: `${origin}/verify`,
    signage: `${origin}/signage/${venue.id}`,
    manage: `${origin}/manage/${venue.id}`,
  };

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", background: "#f6f7fb", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 34, fontWeight: 1000 }}>Pilot Pack</h1>
            <div style={{ marginTop: 6, opacity: 0.8 }}>
              <b>{venue.name}</b> — {venue.city} {venue.region} · {venue.category} · {venue.status}
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <Link href={`/v/${venue.id}`} style={{ textDecoration: "underline", fontWeight: 900 }}>
              Venue Page →
            </Link>
            <Link href="/admin/leads" style={{ textDecoration: "underline", fontWeight: 900 }}>
              Admin →
            </Link>
          </div>
        </div>

        <section style={{ marginTop: 16, background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 1000, fontSize: 18 }}>What this does (no codes published)</div>
          <ol style={{ marginTop: 10, lineHeight: 1.8 }}>
            <li>Patron requests a time-limited access pass.</li>
            <li>Pass shows “active” for a short window (e.g., 15 minutes).</li>
            <li>Staff verifies on phone via /verify (token or QR).</li>
          </ol>
        </section>

        <section style={{ marginTop: 12, background: "white", border: "1px solid #e5e7eb", borderRadius: 16, padding: 16 }}>
          <div style={{ fontWeight: 1000, fontSize: 18 }}>Links (send to staff)</div>
          <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
            <a href={links.request} style={{ fontWeight: 900, textDecoration: "underline" }}>Request Page</a>
            <a
