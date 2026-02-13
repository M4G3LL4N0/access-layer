export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function SignagePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const supabase = supabaseAdmin();

  const { data: venue, error } = await supabase
    .from("venues")
    .select("id,name,address,city,region,country,category,status")
    .eq("id", venueId)
    .maybeSingle();

  const shell: React.CSSProperties = {
    padding: 24,
    fontFamily: "system-ui",
    maxWidth: 900,
    margin: "0 auto",
    background: "#fafafa",
    minHeight: "100vh",
    color: "#111",
  };

  if (!venue) {
    return (
      <main style={shell}>
        <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>Signage</h1>
        <p style={{ marginTop: 10, opacity: 0.9 }}>
          Venue not found.
          {error ? (
            <span style={{ display: "block", marginTop: 8 }}>
              Debug: {error.message}
            </span>
          ) : null}
        </p>
        <Link href="/venues" style={{ fontWeight: 900, color: "#111" }}>
          Back to directory →
        </Link>
      </main>
    );
  }

  const base =
    process.env.NEXT_PUBLIC_APP_URL || "https://access-layer-five.vercel.app";
  const requestUrl = `${base}/request/${venue.id}`;

  const line1 = [venue.address].filter(Boolean).join("");
  const line2 = [venue.city, venue.region, venue.country].filter(Boolean).join(" · ");
  const meta = [venue.category, venue.status].filter(Boolean).join(" · ");

  return (
    <main style={shell}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <div>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 950 }}>Printable Signage</h1>
          <div style={{ marginTop: 6, opacity: 0.85, fontWeight: 800 }}>
            Print and place near the entrance / access point
          </div>
        </div>
        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link href={`/v/${venue.id}`} style={{ fontWeight: 950, color: "#111" }}>Venue →</Link>
          <Link href="/venues" style={{ fontWeight: 950, color: "#111" }}>Directory →</Link>
        </div>
      </div>

      <div
        style={{
          marginTop: 16,
          border: "2px solid #111",
          borderRadius: 18,
          padding: 22,
          background: "white",
        }}
      >
        <div style={{ fontSize: 12, letterSpacing: 1.2, fontWeight: 950, opacity: 0.75 }}>
          ACCESS ↔ SPACE · NO CODES PUBLISHED
        </div>

        <div style={{ marginTop: 10, fontSize: 32, fontWeight: 950 }}>
          {venue.name}
        </div>

        {line1 ? <div style={{ marginTop: 4, opacity: 0.9, fontWeight: 800 }}>{line1}</div> : null}
        {line2 ? <div style={{ marginTop: 4, opacity: 0.85, fontWeight: 800 }}>{line2}</div> : null}
        {meta ? <div style={{ marginTop: 6, opacity: 0.85, fontWeight: 800 }}>{meta}</div> : null}

        <div style={{ marginTop: 16, display: "grid", gap: 12 }}>
          <div style={{ padding: 16, borderRadius: 16, border: "1px solid #eee" }}>
            <div style={{ fontWeight: 950, fontSize: 18 }}>Need access?</div>
            <div style={{ marginTop: 6, opacity: 0.95, lineHeight: 1.6 }}>
              Visit the link to request a time-limited access pass.
              <br />
              <b>No keypad codes displayed.</b>
            </div>

            <div style={{ marginTop: 12 }}>
              <a
                href={requestUrl}
                style={{
                  display: "inline-block",
                  padding: "10px 14px",
                  borderRadius: 12,
                  background: "black",
                  color: "white",
                  fontWeight: 950,
                  textDecoration: "none",
                  wordBreak: "break-all",
                }}
              >
                {requestUrl}
              </a>
            </div>

            <div style={{ marginTop: 10, opacity: 0.8, fontSize: 12 }}>
              Print tip: browser print → disable headers/footers.
            </div>
          </div>

          <div style={{ padding: 16, borderRadius: 16, border: "1px solid #eee" }}>
            <div style={{ fontWeight: 950, fontSize: 18 }}>Venue staff</div>
            <div style={{ marginTop: 6, opacity: 0.95, lineHeight: 1.6 }}>
              This pilot reduces friction when staff are busy. The pass confirms a visitor
              was granted access during a time window.
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
