import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function Btn({
  href,
  children,
  solid,
}: {
  href: string;
  children: React.ReactNode;
  solid?: boolean;
}) {
  return (
    <a
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        textDecoration: "none",
        fontWeight: 900,
        border: solid ? "1px solid black" : "1px solid rgba(0,0,0,0.14)",
        background: solid ? "black" : "transparent",
        color: solid ? "white" : "inherit",
      }}
    >
      {children}
    </a>
  );
}

function Card({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div style={{ border: "1px solid rgba(0,0,0,0.12)", borderRadius: 16, padding: 14 }}>
      <div style={{ fontWeight: 1000, marginBottom: 10 }}>{title}</div>
      {children}
    </div>
  );
}

export default async function AdminSeedPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const token = (sp.token as string) || "";
  const ok = sp.ok === "1";

  // ✅ supabaseServer() returns a client (function). Call it once.
  const supabase = supabaseServer();

  // ✅ ALWAYS await the query, THEN destructure { data, error }.
  const { data: recent, error: recentErr } = await supabase
    .from("venues")
    .select("id,name,city,region,status,created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>Admin — Seed</h1>
            <div style={{ opacity: 0.7, marginTop: 4, fontSize: 13 }}>
              Seed demo venues and rules (admin-only). Token required.
            </div>
          </div>

          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Link
              href={`/admin${token ? `?token=${encodeURIComponent(token)}` : ""}`}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                textDecoration: "none",
                color: "inherit",
                fontWeight: 900,
              }}
            >
              ← Back to Admin
            </Link>

            <Btn href={`/admin/seed${token ? `?token=${encodeURIComponent(token)}` : ""}`} solid>
              Refresh
            </Btn>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap", fontSize: 13 }}>
          <div style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.14)" }}>
            Token: {token ? "present" : "missing"}
          </div>
          <div style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.14)" }}>
            Result: {ok ? "ok=1" : "—"}
          </div>
        </div>

        <div style={{ marginTop: 18, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14 }}>
          <Card title="Seed actions">
            <div style={{ opacity: 0.75, fontSize: 13, lineHeight: 1.5 }}>
              These hit admin API routes. If token is missing, they should fail safely.
            </div>

            <div style={{ marginTop: 12, display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Btn href={`/api/admin/seed?token=${encodeURIComponent(token)}`}>Seed default dataset</Btn>
              <Btn href={`/api/admin/seed-venue?token=${encodeURIComponent(token)}`}>Seed 1 venue</Btn>
              <Btn href={`/admin/venues${token ? `?token=${encodeURIComponent(token)}` : ""}`}>Open venues admin</Btn>
            </div>

            <div style={{ marginTop: 12, fontSize: 12, opacity: 0.75 }}>
              Tip: If you want a clean URL result, open the API links in a browser tab.
            </div>
          </Card>

          <Card title="Recent venues">
            {recentErr ? (
              <div
                style={{
                  padding: 12,
                  borderRadius: 12,
                  border: "1px solid rgba(255,0,0,0.25)",
                  background: "rgba(255,0,0,0.06)",
                  color: "#7a1a1a",
                  fontWeight: 800,
                }}
              >
                Error: {recentErr.message}
              </div>
            ) : null}

            <div style={{ marginTop: 8, border: "1px solid rgba(0,0,0,0.10)", borderRadius: 14, overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.2fr 0.6fr 0.4fr 0.6fr", padding: 10, background: "rgba(0,0,0,0.03)", fontWeight: 1000, fontSize: 12 }}>
                <div>Name</div>
                <div>City</div>
                <div>Region</div>
                <div>Status</div>
              </div>

              {(recent || []).map((v) => (
                <div
                  key={v.id}
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1.2fr 0.6fr 0.4fr 0.6fr",
                    padding: 10,
                    borderTop: "1px solid rgba(0,0,0,0.08)",
                    fontSize: 13,
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <div style={{ fontWeight: 900, lineHeight: 1.2 }}>
                    {v.name}
                    <div style={{ fontWeight: 700, opacity: 0.65, fontSize: 12, marginTop: 4 }}>
                      {new Date(v.created_at).toLocaleString()}
                    </div>
                  </div>
                  <div style={{ fontWeight: 800 }}>{v.city || "—"}</div>
                  <div style={{ fontWeight: 800 }}>{v.region || "—"}</div>
                  <div style={{ fontWeight: 900 }}>
                    <span style={{ padding: "3px 8px", borderRadius: 999, border: "1px solid rgba(0,0,0,0.14)", background: "rgba(0,0,0,0.03)" }}>
                      {String(v.status || "—")}
                    </span>
                  </div>
                </div>
              ))}

              {(recent || []).length === 0 ? <div style={{ padding: 12, opacity: 0.7 }}>No venues found.</div> : null}
            </div>
          </Card>
        </div>

        <div style={{ marginTop: 18, fontSize: 12, opacity: 0.7 }}>
          Admin seed token you use: <b>everythingchangesatsomepoint</b>
        </div>
      </div>
    </main>
  );
}
