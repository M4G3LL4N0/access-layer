import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export default async function PassPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const { data: pass, error } = await supabaseServer
    .from("access_tokens")
    .select("token,status,issued_at,expires_at,venue_id")
    .eq("token", token)
    .single();

  if (error || !pass) {
    return (
      <main style={{ padding: 24, fontFamily: "system-ui" }}>
        <h1 style={{ fontSize: 24, fontWeight: 800 }}>Pass Not Found</h1>
        <pre style={{ marginTop: 12, padding: 12, background: "#fee", borderRadius: 8 }}>
          {error?.message || "Unknown error"}
        </pre>
        <Link href="/" style={{ display: "inline-block", marginTop: 16 }}>
          ← Home
        </Link>
      </main>
    );
  }

  const exp = new Date(pass.expires_at).getTime();
  const isExpired = Date.now() > exp || pass.status !== "active";

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 26, fontWeight: 900 }}>
        Access Pass {isExpired ? "(Expired)" : "(Active)"}
      </h1>

      <div style={{ marginTop: 12, padding: 16, borderRadius: 12, background: isExpired ? "#fff0f0" : "#f0fff4" }}>
        <div><strong>Status:</strong> {pass.status}</div>
        <div><strong>Issued:</strong> {new Date(pass.issued_at).toLocaleString()}</div>
        <div><strong>Expires:</strong> {new Date(pass.expires_at).toLocaleString()}</div>
        <div style={{ marginTop: 8, fontSize: 12, opacity: 0.7 }}>Token: {pass.token}</div>
      </div>

      <p style={{ marginTop: 16, opacity: 0.85 }}>
        Show this pass to confirm you were granted access during the active window. (No codes displayed.)
      </p>

      <Link href="/" style={{ display: "inline-block", marginTop: 16, opacity: 0.8 }}>
        ← Home
      </Link>
    </main>
  );
}

