export const dynamic = "force-dynamic";

import Link from "next/link";
import { headers } from "next/headers";

export default async function PassPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  // Build the correct base URL for whatever domain you’re on (works on Vercel + localhost)
  const h = await headers();
  const proto = h.get("x-forwarded-proto") || "https";
  const host =
    h.get("x-forwarded-host") ||
    h.get("host") ||
    "access-layer-five.vercel.app";

  const base = `${proto}://${host}`;

  const res = await fetch(`${base}/api/pass/${encodeURIComponent(token)}`, {
    cache: "no-store",
  });

  const shell: React.CSSProperties = {
    padding: 24,
    fontFamily: "system-ui",
    maxWidth: 900,
    margin: "0 auto",
    background: "#fafafa",
    minHeight: "100vh",
    color: "#111",
  };

  if (!res.ok) {
    let msg = "Pass not found or expired.";
    try {
      const j = await res.json();
      if (j?.error) msg = `Pass not available: ${j.error}`;
    } catch {}
    return (
      <main style={shell}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Access Pass</h1>
        <p style={{ marginTop: 10, opacity: 0.9 }}>{msg}</p>
        <Link href="/venues" style={{ fontWeight: 950 }}>
          Back to directory →
        </Link>
      </main>
    );
  }

  const json = (await res.json()) as any;
  const pass = json?.pass;

  const issued = pass?.issued_at ? new Date(pass.issued_at) : null;
  const expires = pass?.expires_at ? new Date(pass.expires_at) : null;

  return (
    <main style={shell}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
          flexWrap: "wrap",
        }}
      >
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Access Pass</h1>
        <div style={{ display: "flex", gap: 10 }}>
          <Link href={`/v/${pass.venue_id}`} style={{ fontWeight: 950 }}>
            Venue →
          </Link>
          <Link href="/venues" style={{ fontWeight: 950 }}>
            Directory →
          </Link>
        </div>
      </div>

      <div
        style={{
          marginTop: 14,
          padding: 18,
          borderRadius: 16,
          border: "1px solid #e6e6e6",
          background: "white",
          color: "#111",
        }}
      >
        <div style={{ fontWeight: 950, fontSize: 16 }}>Status: {pass.status}</div>
        <div style={{ marginTop: 8, opacity: 0.9 }}>
          Issued: {issued ? issued.toLocaleString() : "—"}
        </div>
        <div style={{ marginTop: 4, opacity: 0.9 }}>
          Expires: {expires ? expires.toLocaleString() : "—"}
        </div>

        <div
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 14,
            border: "1px solid #efefef",
            background: "#f7f7f7",
            color: "#111",
          }}
        >
          <div style={{ fontWeight: 950 }}>Token:</div>
          <div
            style={{
              marginTop: 6,
              fontFamily:
                "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
              fontSize: 16,
              wordBreak: "break-all",
            }}
          >
            {pass.token}
          </div>
        </div>

        <div style={{ marginTop: 12, opacity: 0.9, lineHeight: 1.6 }}>
          Show this pass to confirm you were granted access during the active window.{" "}
          <b>(No codes displayed.)</b>
        </div>
      </div>
    </main>
  );
}
