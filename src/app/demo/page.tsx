import Link from "next/link";
import { supabaseAdmin } from "@/lib/supabaseAdmin";

export const dynamic = "force-dynamic";

export default async function DemoPage() {
  const supa = supabaseAdmin();

  const { data: venues } = await supa
    .from("venues")
    .select("id,name,city,region,category,status,created_at")
    .eq("status", "active")
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: latestPass } = await supa
    .from("access_passes")
    .select("token,venue_id,created_at,expires_at,status")
    .order("created_at", { ascending: false })
    .limit(1);

  const pass = latestPass?.[0];

  return (
    <main style={{ padding: 28, fontFamily: "system-ui", minHeight: "100vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
        <h1 style={{ margin: 0, fontSize: 34, fontWeight: 950 }}>VC Demo Flow</h1>
        <div style={{ opacity: 0.75, fontWeight: 800 }}>Access ↔ Space (MVP)</div>
      </div>

      <p style={{ marginTop: 10, opacity: 0.8, lineHeight: 1.6, maxWidth: 860 }}>
        This product does <b>not</b> publish codes. It issues <b>time-limited access passes</b> governed by venue rules
        (hours, cooldown, daily limits). Staff verifies passes via QR. Owners can later claim & manage venues.
      </p>

      <section style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 14 }}>
        <Card title="Step 1 — Pick a venue">
          <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
            Go to the directory and open any venue page.
          </div>
          <div style={{ marginTop: 12 }}>
            <LinkButton href="/venues">Open directory →</LinkButton>
          </div>
        </Card>

        <Card title="Step 2 — Request access">
          <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
            Request an access pass (no codes). You’ll receive a token with an expiry window.
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ opacity: 0.75, fontSize: 12 }}>
              Tip: open a venue and click <b>Request Access</b>.
            </div>
          </div>
        </Card>

        <Card title="Step 3 — Verify with staff QR">
          <div style={{ opacity: 0.85, lineHeight: 1.6 }}>
            Staff verifies the pass at <code style={codeStyle}>/verify</code>. QR can encode a human verify URL.
          </div>
          <div style={{ marginTop: 12 }}>
            <LinkButton href="/verify">Open verifier →</LinkButton>
          </div>
        </Card>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 950, marginBottom: 10 }}>Active venues (sample)</h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12 }}>
          {(venues || []).map((v) => (
            <div
              key={v.id}
              style={{
                border: "1px solid #23232a",
                background: "#111118",
                borderRadius: 16,
                padding: 14,
              }}
            >
              <div style={{ fontWeight: 950, fontSize: 16 }}>{v.name}</div>
              <div style={{ opacity: 0.75, marginTop: 6 }}>
                {v.city} {v.region} · {v.category} · {v.status}
              </div>
              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <LinkButton href={`/v/${v.id}`}>Venue →</LinkButton>
                <LinkButton href={`/request/${v.id}`}>Request →</LinkButton>
                <LinkButton href={`/claim/${v.id}`}>Claim →</LinkButton>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 950, marginBottom: 10 }}>Latest pass (for demo)</h2>

        <div style={{ border: "1px solid #23232a", background: "#111118", borderRadius: 16, padding: 14 }}>
          {pass ? (
            <>
              <div style={{ opacity: 0.85 }}>
                Status: <b>{pass.status}</b>
              </div>
              <div style={{ opacity: 0.85 }}>
                Expires: <b>{new Date(pass.expires_at).toLocaleString()}</b>
              </div>

              <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <LinkButton href={`/pass/${pass.token}`}>Open pass page →</LinkButton>
                <LinkButton href={`/verify?token=${pass.token}`}>Verify (human) →</LinkButton>
                <LinkButton href={`/api/pass/${pass.token}`}>API JSON →</LinkButton>
              </div>

              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.8, wordBreak: "break-all" }}>
                Token: <span style={monoStyle}>{pass.token}</span>
              </div>
            </>
          ) : (
            <div style={{ opacity: 0.85 }}>
              No passes yet. Generate one by requesting access from a venue.
            </div>
          )}
        </div>
      </section>

      <section style={{ marginTop: 18 }}>
        <h2 style={{ fontSize: 22, fontWeight: 950, marginBottom: 10 }}>Next: investor narrative</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <LinkButton href="/investors">Open investors page →</LinkButton>
          <LinkButton href="/admin/metrics">Open metrics →</LinkButton>
          <LinkButton href="/reports/sf">Open SF report →</LinkButton>
        </div>
      </section>
    </main>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ border: "1px solid #23232a", background: "#111118", borderRadius: 18, padding: 16 }}>
      <div style={{ fontWeight: 999, fontSize: 18 }}>{title}</div>
      <div style={{ marginTop: 10 }}>{children}</div>
    </div>
  );
}

function LinkButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        background: "black",
        color: "white",
        textDecoration: "none",
        fontWeight: 900,
        border: "1px solid #23232a",
      }}
    >
      {children}
    </Link>
  );
}

const monoStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
};

const codeStyle: React.CSSProperties = {
  ...monoStyle,
  background: "#0b0b0d",
  padding: "2px 6px",
  borderRadius: 8,
  border: "1px solid #23232a",
};
