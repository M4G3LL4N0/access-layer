export const dynamic = "force-dynamic";

import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export default async function PassPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const supabase = supabaseAdmin();

  // Never use single() here — if duplicates exist for any reason, it will throw.
  const { data: rows, error } = await supabase
    .from("access_passes")
    .select("id,venue_id,status,issued_at,expires_at,token,created_at")
    .eq("token", token)
    .order("created_at", { ascending: false })
    .limit(2);

  const shell: React.CSSProperties = {
    padding: 24,
    fontFamily: "system-ui",
    maxWidth: 900,
    margin: "0 auto",
    background: "#fafafa",
    minHeight: "100vh",
    color: "#111",
  };

  if (error) {
    return (
      <main style={shell}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Access Pass</h1>
        <p style={{ marginTop: 10, opacity: 0.9 }}>
          Error loading pass.
          <span style={{ display: "block", marginTop: 8 }}>
            Debug: {error.message}
          </span>
        </p>
        <Link href="/venues" style={{ fontWeight: 950 }}>
          Back to directory →
        </Link>
      </main>
    );
  }

  const pass = rows?.[0] || null;

  if (!pass) {
    return (
      <main style={shell}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Access Pass</h1>
        <p style={{ marginTop: 10, opacity: 0.9 }}>
          Pass not found or expired.
        </p>
        <Link href="/venues" style={{ fontWeight: 950 }}>
          Back to directory →
        </Link>
      </main>
    );
  }

  const issued = pass.issued_at ? new Date(pass.issued_at) : null;
  const expires = pass.expires_at ? new Date(pass.expires_at) : null;

  const hasDuplicate = (rows?.length || 0) > 1;

  return (
    <main style={shell}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
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

        {hasDuplicate ? (
          <div
            style={{
              marginTop: 14,
              padding: 12,
              borderRadius: 12,
              border: "1px solid #f0c",
              background: "#fff5fb",
              color: "#111",
              fontWeight: 900,
            }}
          >
            Debug: Multiple rows found for this token. Keeping the newest.
          </div>
        ) : null}
      </div>
    </main>
  );
}
