import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

const font = 'system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif';

function Btn({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(0,0,0,0.14)",
        textDecoration: "none",
        fontWeight: 900,
        color: "#111",
        background: "white",
      }}
    >
      {label}
    </Link>
  );
}

export default async function AdminSeedPage({
  searchParams,
}: {
  searchParams: { token?: string; ok?: string } | Promise<{ token?: string; ok?: string }>;
}) {
  const sp = await searchParams;
  const ok = sp?.ok === "1";

  // Always await the query, then destructure.
  const { data: recent, error: recentErr } = await supabaseServer()
    .from("venues")
    .select("id,name,city,region,status,created_at")
    .order("created_at", { ascending: false })
    .limit(10);

  return (
    <main style={{ fontFamily: font, background: "white", color: "#111" }}>
      <div style={{ maxWidth: 980, margin: "0 auto", padding: "28px 16px 64px" }}>
        <header style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <div style={{ fontSize: 22, fontWeight: 950 }}>Admin — Seed</div>
            <div style={{ fontSize: 12, opacity: 0.75 }}>
              Use the seed endpoint to create demo venues/rules. This page just confirms state + shows recent venues.
            </div>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            <Btn href="/admin" label="← Back to Admin" />
            <Btn href="/venues" label="Directory" />
          </div>
        </header>

        <section
          style={{
            marginTop: 16,
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 16,
            padding: 16,
            background: "white",
          }}
        >
          <div style={{ fontWeight: 950, marginBottom: 6 }}>Status</div>
          {ok ? (
            <div style={{ fontWeight: 900 }}>✅ Seed request completed.</div>
          ) : (
            <div style={{ opacity: 0.85 }}>
              Run seeding from the API (recommended) using your admin token.
            </div>
          )}

          <div style={{ marginTop: 12, fontSize: 13, opacity: 0.85, lineHeight: 1.6 }}>
            <div style={{ fontWeight: 900, marginBottom: 6 }}>Common endpoints:</div>

            <div>
              <span style={{ fontWeight: 800 }}>/api/admin/seed</span>
              <span style={{ opacity: 0.75 }}> — seeds demo venues + rules</span>
            </div>

            <div>
              <span style={{ fontWeight: 800 }}>/api/admin/seed-venue</span>
              <span style={{ opacity: 0.75 }}> — seed one venue</span>
            </div>

            <div style={{ marginTop: 8, opacity: 0.75 }}>
              Tip: Use query params like <code>?token=YOUR_ADMIN_TOKEN</code> when calling the seed APIs.
            </div>
          </div>
        </section>

        <section style={{ marginTop: 16 }}>
          <div style={{ fontWeight: 950, marginBottom: 8 }}>Recent venues</div>

          {recentErr ? (
            <div
              style={{
                border: "1px solid rgba(0,0,0,0.12)",
                borderRadius: 16,
                padding: 14,
                background: "white",
              }}
            >
              <div style={{ fontWeight: 900 }}>Error loading venues</div>
              <pre style={{ marginTop: 8, fontSize: 12, overflowX: "auto" }}>{String(recentErr.message || recentErr)}</pre>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {(recent || []).map((v) => (
                <div
                  key={v.id}
                  style={{
                    border: "1px solid rgba(0,0,0,0.12)",
                    borderRadius: 16,
                    padding: 14,
                    background: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    flexWrap: "wrap",
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 950 }}>{v.name}</div>
                    <div style={{ fontSize: 12, opacity: 0.75 }}>
                      {v.city}, {v.region} · {v.status} · {new Date(v.created_at).toLocaleString()}
                    </div>
                    <div style={{ fontSize: 12, opacity: 0.6, marginTop: 6 }}>{v.id}</div>
                  </div>

                  <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                    <Btn href={`/v/${v.id}`} label="Venue page" />
                    <Btn href={`/kiosk/${v.id}`} label="Kiosk" />
                    <Btn href={`/signage/${v.id}`} label="Signage" />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
