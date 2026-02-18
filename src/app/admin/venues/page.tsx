import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

function Badge({ text }: { text: string }) {
  return (
    <span
      style={{
        display: "inline-block",
        padding: "3px 8px",
        borderRadius: 999,
        fontSize: 12,
        border: "1px solid rgba(0,0,0,0.14)",
        background: "rgba(0,0,0,0.03)",
      }}
    >
      {text}
    </span>
  );
}

export default async function AdminVenuesPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const sp = await searchParams;
  const token = (sp.token as string) || "";

  // ✅ In YOUR repo, supabaseServer is a FUNCTION.
  const supabase = supabaseServer();

  const { data: venues, error } = await supabase
    .from("venues")
    .select("id,name,city,region,status,category,created_at")
    .order("created_at", { ascending: false })
    .limit(200);

  return (
    <main style={{ padding: 20, fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ margin: 0, fontSize: 22 }}>Admin — Venues</h1>
            <div style={{ opacity: 0.7, marginTop: 4, fontSize: 13 }}>
              Manage venues in the pilot. Token required for write actions.
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
                fontWeight: 800,
              }}
            >
              ← Back to Admin
            </Link>

            <Link
              href={`/venues`}
              style={{
                padding: "10px 12px",
                borderRadius: 12,
                border: "1px solid rgba(0,0,0,0.14)",
                textDecoration: "none",
                color: "inherit",
                fontWeight: 800,
              }}
            >
              Public directory
            </Link>
          </div>
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <Badge text={`Total: ${(venues || []).length}`} />
          {token ? <Badge text="Token: present" /> : <Badge text="Token: missing (read-only)" />}
        </div>

        <div style={{ marginTop: 18 }}>
          {error ? (
            <div
              style={{
                padding: 14,
                borderRadius: 14,
                border: "1px solid rgba(255,0,0,0.25)",
                background: "rgba(255,0,0,0.06)",
                color: "#7a1a1a",
                fontWeight: 700,
              }}
            >
              Error loading venues: {error.message}
            </div>
          ) : null}

          <div
            style={{
              marginTop: 14,
              border: "1px solid rgba(0,0,0,0.12)",
              borderRadius: 16,
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1.3fr 0.7fr 0.7fr 0.7fr 0.6fr",
                gap: 0,
                padding: 12,
                background: "rgba(0,0,0,0.03)",
                fontWeight: 900,
                fontSize: 13,
              }}
            >
              <div>Name</div>
              <div>City</div>
              <div>Region</div>
              <div>Status</div>
              <div>Open</div>
            </div>

            {(venues || []).map((v) => (
              <div
                key={v.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "1.3fr 0.7fr 0.7fr 0.7fr 0.6fr",
                  gap: 0,
                  padding: 12,
                  borderTop: "1px solid rgba(0,0,0,0.08)",
                  alignItems: "center",
                }}
              >
                <div style={{ fontWeight: 900, lineHeight: 1.2 }}>
                  {v.name}
                  <div style={{ fontWeight: 700, opacity: 0.65, fontSize: 12, marginTop: 4 }}>
                    {v.category || "—"} · {new Date(v.created_at).toLocaleString()}
                  </div>
                </div>

                <div style={{ fontWeight: 800 }}>{v.city || "—"}</div>
                <div style={{ fontWeight: 800 }}>{v.region || "—"}</div>

                <div>
                  <Badge text={String(v.status || "—")} />
                </div>

                <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                  <Link
                    href={`/admin/venues/${v.id}${token ? `?token=${encodeURIComponent(token)}` : ""}`}
                    style={{ fontWeight: 900, textDecoration: "underline", color: "inherit" }}
                  >
                    Admin
                  </Link>
                  <Link href={`/v/${v.id}`} style={{ fontWeight: 900, textDecoration: "underline", color: "inherit" }}>
                    Venue
                  </Link>
                </div>
              </div>
            ))}

            {(venues || []).length === 0 ? <div style={{ padding: 14, opacity: 0.7 }}>No venues found.</div> : null}
          </div>
        </div>
      </div>
    </main>
  );
}
