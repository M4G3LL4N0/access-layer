import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function asClient(maybeFn: any) {
  return typeof maybeFn === "function" ? maybeFn() : maybeFn;
}

export default async function PassPage({
  params,
}: {
  params: Promise<{ token: string }>;
}) {
  const { token } = await params;

  const supabase = await asClient(supabaseServer);

  // Avoid .single() coercion errors. Use limit(1) + maybeSingle().
  const { data: pass, error } = await supabase
    .from("access_passes")
    .select("token,status,issued_at,expires_at,venue_id,created_at")
    .eq("token", token)
    .order("created_at", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) {
    return (
      <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1000 }}>Access Pass</h1>
          <div style={box()}>
            <div style={{ fontWeight: 950 }}>Pass lookup error.</div>
            <div style={{ opacity: 0.8, marginTop: 8 }}>{String(error.message || error)}</div>
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

  if (!pass) {
    return (
      <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 1000 }}>Access Pass</h1>
          <div style={box()}>
            <div style={{ fontWeight: 950 }}>Pass not found or expired.</div>
            <div style={{ opacity: 0.8, marginTop: 8 }}>
              If you just created it, refresh once. Passes are time-limited by design.
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

  const now = Date.now();
  const exp = pass.expires_at ? new Date(pass.expires_at).getTime() : 0;
  const isActive = pass.status === "active" && exp > now;

  return (
    <main style={{ padding: 22, fontFamily: "system-ui", background: "#fff", color: "#0b0b0b" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 1000, letterSpacing: -0.4 }}>
          Access Pass {isActive ? "(Active)" : ""}
        </h1>

        <div style={{ marginTop: 14, ...box() }}>
          <Row label="Status" value={String(pass.status || "—")} />
          <Row label="Issued" value={pass.issued_at ? new Date(pass.issued_at).toLocaleString() : "—"} />
          <Row label="Expires" value={pass.expires_at ? new Date(pass.expires_at).toLocaleString() : "—"} />
          <Row label="Token" value={pass.token} mono />
          <Row label="Venue" value={pass.venue_id} mono />
        </div>

        <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Link href="/verify" style={btnPrimary()}>
            Staff verify →
          </Link>
          <Link href="/venues" style={btn()}>
            Directory
          </Link>
          <Link href={`/v/${pass.venue_id}`} style={btn()}>
            Venue page →
          </Link>
        </div>

        <div style={{ marginTop: 14, opacity: 0.75, fontSize: 12 }}>
          This pass page is designed to be readable in all modes (white background, dark text).
        </div>
      </div>
    </main>
  );
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", gap: 12, padding: "8px 0" }}>
      <div style={{ opacity: 0.75 }}>{label}</div>
      <div style={{ fontWeight: 950, fontFamily: mono ? "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas" : "inherit" }}>
        {value}
      </div>
    </div>
  );
}

function box(): React.CSSProperties {
  return {
    border: "1px solid rgba(0,0,0,0.12)",
    borderRadius: 16,
    padding: 16,
    background: "#fff",
  };
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

function btnPrimary(): React.CSSProperties {
  return {
    display: "inline-block",
    padding: "10px 12px",
    borderRadius: 12,
    textDecoration: "none",
    color: "white",
    fontWeight: 1000,
    background: "black",
  };
}
