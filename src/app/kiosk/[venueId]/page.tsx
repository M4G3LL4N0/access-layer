export const dynamic = "force-dynamic";

export default async function KioskPage({
  params,
}: {
  params: { venueId: string };
}) {
  const venueId = params?.venueId || "";

  const statsUrl = `/api/kiosk/stats?venueId=${encodeURIComponent(venueId)}`;
  const issueUrl = `/api/kiosk/issue-pass`;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 10 }}>
        Kiosk Mode
      </h1>

      <div style={{ opacity: 0.8, marginBottom: 14 }}>
        <b>venueId</b> = {venueId ? venueId : "(missing)"} · <b>statsUrl</b> ={" "}
        {statsUrl}
      </div>

      <hr style={{ margin: "14px 0" }} />

      <section style={{ marginBottom: 18 }}>
        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>
          Issue an Access Pass
        </h2>

        <form action={issueUrl} method="post">
          <input type="hidden" name="venueId" value={venueId} />
          <button
            type="submit"
            style={{
              padding: "10px 14px",
              borderRadius: 10,
              background: "black",
              color: "white",
              fontWeight: 900,
              border: "none",
              cursor: "pointer",
            }}
          >
            Issue access pass
          </button>
        </form>

        <div style={{ fontSize: 12, opacity: 0.7, marginTop: 8 }}>
          This posts venueId to <code>{issueUrl}</code>.
        </div>
      </section>

      <hr style={{ margin: "14px 0" }} />

      <section>
        <h2 style={{ fontSize: 18, fontWeight: 900, marginBottom: 8 }}>
          Kiosk Stats
        </h2>

        <StatsBlock statsUrl={statsUrl} venueId={venueId} />
      </section>
    </main>
  );
}

async function StatsBlock({
  statsUrl,
  venueId,
}: {
  statsUrl: string;
  venueId: string;
}) {
  if (!venueId) {
    return (
      <div
        style={{
          padding: 12,
          borderRadius: 10,
          border: "1px solid #ddd",
          background: "#fff7ed",
          fontWeight: 800,
        }}
      >
        Stats error: Missing venueId (page param).
      </div>
    );
  }

  const res = await fetch(statsUrl, { cache: "no-store" });
  const text = await res.text();

  return (
    <pre
      style={{
        whiteSpace: "pre-wrap",
        padding: 12,
        borderRadius: 10,
        border: "1px solid #ddd",
        background: "#f8fafc",
        fontSize: 12,
        lineHeight: 1.4,
      }}
    >
      {`HTTP ${res.status}\n\n${text}`}
    </pre>
  );
}
