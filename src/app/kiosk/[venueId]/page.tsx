"use client";

import { useState } from "react";

export default function KioskPage({ params }: { params: { venueId: string } }) {
  const { venueId } = params;

  const [token, setToken] = useState<string | null>(null);
  const [expires, setExpires] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function issuePass() {
    setLoading(true);
    setToken(null);

    const res = await fetch("/api/kiosk/issue-pass", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ venueId }),
    });

    const json = await res.json();
    setLoading(false);

    if (json.ok) {
      setToken(json.token);
      setExpires(json.expires_at);
    } else {
      alert(json.error || "Error issuing pass");
    }
  }

  const passUrl = token
    ? `${process.env.NEXT_PUBLIC_APP_BASE_URL}/pass/${token}`
    : null;

  return (
    <main
      style={{
        fontFamily: "system-ui",
        background: "#000",
        color: "white",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        textAlign: "center",
      }}
    >
      <div style={{ maxWidth: 600 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900 }}>Venue Kiosk</h1>
        <p style={{ opacity: 0.8 }}>
          Tap to issue a 15-minute access pass.
        </p>

        <button
          onClick={issuePass}
          disabled={loading}
          style={{
            marginTop: 20,
            padding: "14px 20px",
            fontWeight: 900,
            borderRadius: 16,
            background: "white",
            color: "black",
            border: "none",
            fontSize: 16,
            cursor: "pointer",
          }}
        >
          {loading ? "Issuing..." : "Issue Access Pass"}
        </button>

        {token && (
          <div style={{ marginTop: 30 }}>
            <div
              style={{
                background: "white",
                color: "black",
                padding: 16,
                borderRadius: 16,
                wordBreak: "break-all",
                fontWeight: 800,
              }}
            >
              {token}
            </div>

            <p style={{ marginTop: 12, opacity: 0.7 }}>
              Expires: {new Date(expires!).toLocaleTimeString()}
            </p>

            <a
              href={passUrl!}
              target="_blank"
              style={{
                display: "inline-block",
                marginTop: 12,
                color: "white",
                textDecoration: "underline",
              }}
            >
              Open Pass →
            </a>
          </div>
        )}
      </div>
    </main>
  );
}
