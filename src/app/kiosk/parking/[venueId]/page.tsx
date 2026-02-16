"use client";

import { useMemo, useState } from "react";

export const dynamic = "force-dynamic";

function getVenueIdFromPath(): string {
  // Works even if Next params fail for any reason.
  if (typeof window === "undefined") return "";
  const parts = window.location.pathname.split("/").filter(Boolean);
  // expected: /kiosk/parking/:venueId
  const idx = parts.findIndex((p) => p === "parking");
  if (idx >= 0 && parts[idx + 1]) return parts[idx + 1];
  // fallback: last segment
  return parts[parts.length - 1] || "";
}

export default function ParkingKioskPage() {
  const [minutes, setMinutes] = useState<number>(120);
  const [status, setStatus] = useState<"idle" | "loading" | "ok" | "err">("idle");
  const [err, setErr] = useState<string>("");
  const [token, setToken] = useState<string>("");
  const [expiresAt, setExpiresAt] = useState<string>("");
  const [verifyUrl, setVerifyUrl] = useState<string>("");

  const venueId = useMemo(() => getVenueIdFromPath(), []);

  const issueEndpoint = "/api/parking/issue";

  async function issue() {
    setStatus("loading");
    setErr("");
    setToken("");
    setExpiresAt("");
    setVerifyUrl("");

    try {
      if (!venueId) throw new Error("Missing venueId (URL path parsing failed).");

      const res = await fetch(issueEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ venueId, minutes }),
      });

      const json = await res.json().catch(() => ({}));
      if (!res.ok) {
        throw new Error(json?.error || json?.msg || `Request failed (${res.status})`);
      }

      const t = json?.validation?.token || json?.token || "";
      const exp = json?.validation?.expires_at || json?.expires_at || "";
      const vurl = json?.verifyUrl || (t ? `/api/parking/verify?token=${encodeURIComponent(t)}` : "");

      setToken(t);
      setExpiresAt(exp);
      setVerifyUrl(vurl);
      setStatus("ok");
    } catch (e: any) {
      setErr(String(e?.message || e));
      setStatus("err");
    }
  }

  const curl = venueId
    ? `curl -s -X POST "${issueEndpoint}" -H "Content-Type: application/json" -d '{"venueId":"${venueId}","minutes":${minutes}}'`
    : "(venueId missing)";

  return (
    <main
      style={{
        minHeight: "100vh",
        padding: 24,
        fontFamily: "system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif",
        background: "#f7f7f8",
      }}
    >
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <h1 style={{ margin: 0, fontSize: 28, fontWeight: 950 }}>Parking Kiosk</h1>
        <p style={{ marginTop: 8, opacity: 0.85 }}>
          Issue time-bounded parking validations. No shared codes.
        </p>

        {/* DEBUG HEADER */}
        <div
          style={{
            marginTop: 14,
            padding: 14,
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
          }}
        >
          <div style={{ fontWeight: 900, marginBottom: 6 }}>Debug</div>
          <div style={{ fontSize: 13, opacity: 0.8, lineHeight: 1.55 }}>
            <div>
              <b>URL:</b> {typeof window !== "undefined" ? window.location.href : "—"}
            </div>
            <div>
              <b>venueId:</b> {venueId || "(missing)"}
            </div>
            <div>
              <b>issue endpoint:</b> {issueEndpoint}
            </div>
            <div style={{ marginTop: 8 }}>
              <b>curl:</b>
              <pre
                style={{
                  marginTop: 6,
                  padding: 10,
                  borderRadius: 12,
                  background: "#0b0b0c",
                  color: "white",
                  overflowX: "auto",
                  fontSize: 12,
                }}
              >
                {curl}
              </pre>
            </div>
          </div>
        </div>

        {/* CONTROLS */}
        <div
          style={{
            marginTop: 14,
            padding: 16,
            borderRadius: 16,
            border: "1px solid rgba(0,0,0,0.12)",
            background: "white",
          }}
        >
          <div style={{ fontWeight: 950, marginBottom: 10 }}>Issue validation</div>

          <label style={{ display: "block", fontWeight: 800, marginBottom: 6 }}>
            Minutes valid
          </label>
          <input
            type="number"
            min={15}
            step={15}
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value || 0))}
            style={{
              width: 160,
              padding: "10px 12px",
              borderRadius: 12,
              border: "1px solid rgba(0,0,0,0.18)",
            }}
          />

          <div style={{ marginTop: 12 }}>
            <button
              onClick={issue}
              disabled={status === "loading"}
              style={{
                padding: "12px 16px",
                borderRadius: 12,
                background: "black",
                color: "white",
                border: "none",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              {status === "loading" ? "Issuing…" : "Issue Access Pass"}
            </button>
          </div>

          {status === "err" && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                border: "1px solid #ffd1d1",
                background: "#fff5f5",
                color: "#7a0b0b",
                fontWeight: 800,
                whiteSpace: "pre-wrap",
              }}
            >
              {err}
            </div>
          )}

          {status === "ok" && (
            <div
              style={{
                marginTop: 12,
                padding: 12,
                borderRadius: 12,
                border: "1px solid #cdebd6",
                background: "#f0fff4",
              }}
            >
              <div style={{ fontWeight: 950 }}>Issued</div>
              <div style={{ marginTop: 6, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace" }}>
                Token: {token}
              </div>
              <div style={{ marginTop: 6, opacity: 0.85 }}>
                Expires: {expiresAt || "(unknown)"}
              </div>

              {verifyUrl && (
                <div style={{ marginTop: 10 }}>
                  <a
                    href={verifyUrl}
                    style={{ fontWeight: 900, textDecoration: "underline" }}
                  >
                    Verify token →
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}
