import Link from "next/link";

export const dynamic = "force-dynamic";
export const revalidate = 0;

type StatsResp =
  | {
      ok: true;
      venueId: string;
      venue: { id: string; name: string };
      total: number;
      today: number;
      latest: { token: string; created_at: string; expires_at: string; status: string } | null;
    }
  | { ok: false; error: string; where?: string; venueId?: string };

export default async function KioskPage({
  params,
}: {
  params: Promise<{ venueId: string }>;
}) {
  const { venueId } = await params;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/api/kiosk/stats?venueId=${encodeURIComponent(
      venueId
    )}`,
    { cache: "no-store" }
  );

  let stats: StatsResp;
  try {
    stats = (await res.json()) as StatsResp;
  } catch {
    stats = { ok: false, error: `Stats error: HTTP ${res.status} (non-JSON response)` };
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <div style={{ marginBottom: 10 }}>
        <Link href="/venues" style={{ opacity: 0.85 }}>
          ← Back to directory
        </Link>
      </div>

      <h1 style={{ fontSize: 26, fontWeight: 950, margin: "6px 0" }}>Kiosk Mode</h1>
      <div style={{ opacity: 0.75, marginBottom: 14 }}>
        Venue ID: <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>{venueId}</span>
      </div>

      {!stats.ok ? (
        <div style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd", background: "#fff5f5" }}>
          <div style={{ fontWeight: 900 }}>Stats error</div>
          <div style={{ marginTop: 6, opacity: 0.85 }}>
            HTTP {res.status}
            <br />
            {stats.error}
            {stats.where ? (
              <>
                <br />
                <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                  where={stats.where}
                </span>
              </>
            ) : null}
          </div>
        </div>
      ) : (
        <div style={{ padding: 12, borderRadius: 12, border: "1px solid #ddd" }}>
          <div style={{ fontWeight: 950, fontSize: 18 }}>{stats.venue?.name}</div>
          <div style={{ marginTop: 8, display: "flex", gap: 10, flexWrap: "wrap" }}>
            <div style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid #ddd", fontWeight: 900 }}>
              Total passes: {stats.total}
            </div>
            <div style={{ padding: "6px 10px", borderRadius: 999, border: "1px solid #ddd", fontWeight: 900 }}>
              Today: {stats.today}
            </div>
          </div>

          <div style={{ marginTop: 12, opacity: 0.85 }}>
            Latest:{" "}
            {stats.latest ? (
              <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                {stats.latest.token}
              </span>
            ) : (
              "none"
            )}
          </div>
        </div>
      )}

      <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
        <form action="/api/kiosk/issue-pass" method="post">
          <input type="hidden" name="venueId" value={venueId} />
          <button
            style={{
              padding: "10px 14px",
              borderRadius: 12,
              background: "black",
              color: "white",
              fontWeight: 950,
              border: "none",
              cursor: "pointer",
            }}
          >
            Issue Access Pass
          </button>
        </form>

        <a
          href={`/verify?venueId=${encodeURIComponent(venueId)}`}
          style={{
            padding: "10px 14px",
            borderRadius: 12,
            border: "1px solid rgba(0,0,0,0.15)",
            textDecoration: "none",
            fontWeight: 950,
            color: "black",
          }}
        >
          Staff Verify
        </a>
      </div>
    </main>
  );
}
