"use client";

export const dynamic = "force-dynamic";

export default function Home() {
  return (
    <main
      style={{
        fontFamily:
          "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        padding: "40px 20px",
        maxWidth: 1100,
        margin: "0 auto",
      }}
    >
      {/* HOME V2 BANNER (ADDITIVE ONLY) */}
      <div
        style={{
          border: "1px solid rgba(0,0,0,0.10)",
          borderRadius: 16,
          padding: "14px 16px",
          background: "rgba(0,0,0,0.02)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
          marginBottom: 30,
          flexWrap: "wrap",
        }}
      >
        <div style={{ fontSize: 14, opacity: 0.75 }}>
          New: <b>Home v2</b> (Apple/Microsoft polish). Nothing removed — additive only.
        </div>

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <a
            href="/home-v2"
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.15)",
              textDecoration: "none",
              fontWeight: 800,
              color: "#111",
              background: "#fff",
            }}
          >
            Open Home v2
          </a>

          <a
            href="https://app.accessxworld.com"
            style={{
              padding: "10px 18px",
              borderRadius: 999,
              background: "#111",
              textDecoration: "none",
              fontWeight: 800,
              color: "#fff",
            }}
          >
            Open App
          </a>
        </div>
      </div>

      {/* EXISTING HOMEPAGE CONTENT BELOW */}
      <h1
        style={{
          fontSize: 42,
          fontWeight: 900,
          letterSpacing: -1,
          marginBottom: 20,
        }}
      >
        AXW — Access × World
      </h1>

      <p
        style={{
          fontSize: 18,
          lineHeight: 1.6,
          opacity: 0.8,
          maxWidth: 700,
        }}
      >
        Programmable access infrastructure for venues, parking, enterprise,
        and government systems. Define policy once. Issue tokens. Verify
        anywhere. Log everything.
      </p>

      <div style={{ marginTop: 30 }}>
        <a
          href="/investors"
          style={{
            padding: "12px 22px",
            borderRadius: 999,
            background: "#111",
            color: "#fff",
            textDecoration: "none",
            fontWeight: 800,
          }}
        >
          Investor Hub
        </a>
      </div>
    </main>
  );
}
