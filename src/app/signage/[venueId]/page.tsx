import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function SignagePage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const supa = supabaseAdmin();
  const { data, error } = await supa
    .from("venues")
    .select("id,name,address,city,region,country,category,status")
    .eq("id", venueId)
    .limit(1);

  const venue = data?.[0];

  if (error || !venue) {
    return (
      <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 999 }}>Signage</h1>
        <div style={{ marginTop: 12, opacity: 0.9 }}>
          Venue not found.
        </div>
        <div style={{ marginTop: 16 }}>
          <Link href="/venues" style={btnStyle}>
            Back to directory →
          </Link>
        </div>
        <pre style={{ marginTop: 14, opacity: 0.8, whiteSpace: "pre-wrap" }}>
{JSON.stringify({ error: error?.message || "Venue missing", venueId }, null, 2)}
        </pre>
      </main>
    );
  }

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const requestUrl = `${appUrl}/request/${venue.id}`;
  const verifyUrl = `${appUrl}/verify`;

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 999 }}>Print Signage</h1>
        <Link href={`/v/${venue.id}`} style={btnStyle}>
          Venue page →
        </Link>
      </div>

      <div
        style={{
          marginTop: 18,
          border: "2px solid #23232a",
          background: "#111118",
          borderRadius: 18,
          padding: 18,
          maxWidth: 820,
        }}
      >
        <div style={{ fontSize: 16, opacity: 0.85, fontWeight: 900 }}>Access ↔ Space</div>
        <div style={{ marginTop: 6, fontSize: 28, fontWeight: 999 }}>{venue.name}</div>
        <div style={{ marginTop: 6, opacity: 0.85, lineHeight: 1.6 }}>
          {venue.address ? <div>{venue.address}</div> : null}
          <div>
            {venue.city} {venue.region} {venue.country} · <b>{venue.category}</b> · <b>{venue.status}</b>
          </div>
        </div>

        <div style={{ marginTop: 14, padding: 14, borderRadius: 16, border: "1px solid #23232a", background: "black" }}>
          <div style={{ fontSize: 20, fontWeight: 999 }}>Need access?</div>
          <div style={{ marginTop: 6, opacity: 0.9, lineHeight: 1.6 }}>
            Scan the QR / open the link to request a time-limited access pass.
            <br />
            <b>No codes displayed.</b>
          </div>

          <div style={{ marginTop: 10, opacity: 0.9, wordBreak: "break-all" }}>{requestUrl}</div>
        </div>

        <div style={{ marginTop: 12, opacity: 0.8, lineHeight: 1.6 }}>
          Staff verification: <b>{verifyUrl}</b>
        </div>

        <div style={{ marginTop: 14, opacity: 0.7, fontSize: 12 }}>
          Tip: On iPad/phone, keep the verifier page open. Paste token or scan the QR from the pass screen.
        </div>
      </div>

      <div style={{ marginTop: 18, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <Link href="/venues" style={btnStyle}>
          Directory
        </Link>
        <Link href="/verify" style={btnStyle}>
          Verifier
        </Link>
        <Link href="/demo" style={btnStyle}>
          Demo
        </Link>
      </div>
    </main>
  );
}

const btnStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 12px",
  borderRadius: 12,
  background: "black",
  color: "white",
  textDecoration: "none",
  fontWeight: 950,
  border: "1px solid #23232a",
};
