import Link from "next/link";

export default async function RequestPage({
  params,
  searchParams,
}: {
  params: Promise<{ venueId: string }>;
  searchParams?: Promise<{ error?: string }>;
}) {
  const { venueId } = await params;
  const sp = (await searchParams) || {};
  const err = sp.error;

  const msg =
    err === "cooldown"
      ? "Cooldown active — please wait a bit before requesting again."
      : err === "daily_limit"
      ? "Daily limit reached — try again later."
      : err === "venue_not_found"
      ? "Venue not found."
      : err === "venue_inactive"
      ? "This venue is not active."
      : err
      ? "Request failed — please try again."
      : null;

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <Link href={`/v/${venueId}`} style={{ opacity: 0.8 }}>
        ← Back to venue
      </Link>

      <h1 style={{ marginTop: 12, fontSize: 24, fontWeight: 800 }}>
        Request Access
      </h1>

      <p style={{ opacity: 0.8 }}>
        This issues a time-limited access pass (no codes). Guests allowed with rate limits.
      </p>

      {msg && (
        <div
          style={{
            marginTop: 12,
            padding: 12,
            borderRadius: 10,
            background: "#fff6d6",
            border: "1px solid #f2d27a",
            fontWeight: 700,
          }}
        >
          {msg}
        </div>
      )}

      <form action="/api/request-access" method="post" style={{ marginTop: 16 }}>
        <input type="hidden" name="venueId" value={venueId} />
        <button
          style={{
            padding: "10px 14px",
            borderRadius: 10,
            background: "black",
            color: "white",
            fontWeight: 700,
            border: "none",
            cursor: "pointer",
          }}
        >
          Request Now
        </button>
      </form>
    </main>
  );
}

