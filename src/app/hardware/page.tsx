import Link from "next/link";
import { supabaseServer } from "@/lib/supabaseServer";

export const dynamic = "force-dynamic";

export default async function HardwareConsolePage() {
  // IMPORTANT: supabaseServer is a client instance, NOT a function.
  const supabase = supabaseServer;

  const { data: venues, error } = await supabase
    .from("venues")
    .select("id,name,city,region,category,status,created_at")
    .order("created_at", { ascending: false })
    .limit(25);

  const list = venues || [];
  const first = list[0];

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ maxWidth: 1050, margin: "0 auto" }}>
        <header style={{ marginBottom: 14 }}>
          <h1 style={{ margin: 0, fontSize: 26, fontWeight: 950 }}>
            Hardware / Operator Console
          </h1>
          <p style={{ marginTop: 8, opacity: 0.8, lineHeight: 1.5 }}>
            Operate real-world access: kiosk issuance, pass verification, scanning,
            signage, and parking validation.
          </p>
        </header>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
            gap: 12,
            marginBottom: 14,
          }}
        >
          <Card title="Venues Directory" desc="Public directory + map view.">
            <LinkButton href="/venues" primary>
              Open /venues
            </LinkButton>
          </Card>

          <Card title="Verify Pass" desc="Staff verify a token (valid/expired).">
            <LinkButton href="/verify" primary>
              Open /verify
            </LinkButton>
          </Card>

          <Card title="Scan QR" desc="Camera QR scanner for passes.">
            <LinkButton href="/scan" primary>
              Open /scan
            </LinkButton>
          </Card>

          <Card title="Admin" desc="Seed, venues, metrics, leads.">
            <LinkButton href="/admin" primary>
              Open /admin
            </LinkButton>
            <div style={{ marginTop: 8 }}>
              <LinkButton href="/admin/leads">Leads dashboard</LinkButton>
            </div>
          </Card>
        </div>

        <section
          style={{
            border: "1px solid rgba(0,0,0,0.12)",
            borderRadius: 16,
            padding: 14,
            background: "white",
          }}
        >
          <h2 style={{ margin: 0, fontSize: 16, fontWeight: 950 }}>
            Quick launch (pick a venue)
          </h2>

          {error ? (
            <div style={{ marginTop: 10, color: "crimson", fontWeight: 900 }}>
              Error loading venues: {String((error as any)?.message || error)}
            </div>
          ) : null}

          {list.length === 0 ? (
            <div style={{ marginTop: 10, opacity: 0.75 }}>
              No venues found. Seed a venue from{" "}
              <Link href="/admin/seed" style={{ fontWeight: 900 }}>
                /admin/seed
              </Link>
              .
            </div>
          ) : (
            <div style={{ marginTop: 10, display: "grid", gap: 10 }}>
              {list.map((v) => (
                <div
                  key={v.id}
                  style={{
                    border: "1px solid rgba(0,0,0,0.10)",
                    borderRadius: 14,
                    padding: 12,
                    display: "flex",
                    justifyContent: "space-between",
                    gap: 12,
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ minWidth: 240 }}>
                    <div style={{ fontWeight: 950 }}>{v.name}</div>
                    <div style={{ marginTop: 4, opacity: 0.8, fontSize: 13 }}>
                      {(v.city || "—")} — {(v.region || "—")} · {(v.category || "venue")} ·{" "}
                      {(v.status || "unknown")}
                    </div>
                    <div style={{ marginTop: 6, opacity: 0.7, fontSize: 12 }}>
                      id: {v.id}
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    <LinkButton href={`/kiosk/${v.id}`} primary>
                      Kiosk
                    </LinkButton>
                    <LinkButton href={`/kiosk/parking/${v.id}`}>
                      Parking
                    </LinkButton>
                    <LinkButton href={`/signage/${v.id}`}>
                      Signage
                    </LinkButton>
                    <LinkButton href={`/v/${v.id}`}>
                      Venue page
                    </LinkButton>
                  </div>
                </div>
              ))}
            </div>
          )}

          {first ? (
            <div style={{ marginTop: 14, opacity: 0.85, fontSize: 13 }}>
              Fast test links for newest venue:
              <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <LinkButton href={`/kiosk/${first.id}`} primary>
                  Kiosk ({first.name})
                </LinkButton>
                <LinkButton href={`/kiosk/parking/${first.id}`}>
                  Parking ({first.name})
                </LinkButton>
                <LinkButton href={`/signage/${first.id}`}>
                  Signage ({first.name})
                </LinkButton>
              </div>
            </div>
          ) : null}
        </section>
      </div>
    </main>
  );
}

function Card({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <div
      style={{
        border: "1px solid rgba(0,0,0,0.12)",
        borderRadius: 16,
        padding: 14,
        background: "white",
      }}
    >
      <div style={{ fontWeight: 950, fontSize: 16 }}>{title}</div>
      <div style={{ marginTop: 6, opacity: 0.8, fontSize: 13, lineHeight: 1.4 }}>
        {desc}
      </div>
      <div style={{ marginTop: 12 }}>{children}</div>
    </div>
  );
}

function LinkButton({
  href,
  children,
  primary,
}: {
  href: string;
  children: React.ReactNode;
  primary?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "inline-block",
        padding: "10px 12px",
        borderRadius: 12,
        background: primary ? "black" : "white",
        color: primary ? "white" : "black",
        border: primary ? "1px solid black" : "1px solid rgba(0,0,0,0.14)",
        textDecoration: "none",
        fontWeight: 950,
        whiteSpace: "nowrap",
      }}
    >
      {children}
    </Link>
  );
}
