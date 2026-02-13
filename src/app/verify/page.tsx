"use client";

import { useEffect, useMemo, useState } from "react";
import { QRCodeCanvas } from "qrcode.react";

type ApiPass = {
  token: string;
  status: string;
  venue_id: string;
  issued_at: string;
  expires_at: string;
  created_at?: string;
};

type ApiResponse =
  | { ok: true; pass: ApiPass }
  | { ok: false; error: string };

function secondsLeft(expiresAtIso?: string, nowMs?: number) {
  if (!expiresAtIso || !nowMs) return 0;
  const exp = new Date(expiresAtIso).getTime();
  return Math.max(0, Math.floor((exp - nowMs) / 1000));
}

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [resp, setResp] = useState<ApiResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [nowMs, setNowMs] = useState(Date.now());

  const origin = useMemo(() => {
    if (typeof window === "undefined") return "";
    return window.location.origin;
  }, []);

  // Tick every 1s so countdown updates
  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  // Auto-load token from URL ?token=...
  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    const t = url.searchParams.get("token");
    if (t) {
      setToken(t);
      void verify(t);
    }
  }, []);

  async function verify(t: string) {
    const clean = (t || "").trim();
    if (!clean) return;

    setLoading(true);
    setResp(null);
    try {
      const r = await fetch(`/api/pass/${encodeURIComponent(clean)}`, {
        cache: "no-store",
      });
      const j = (await r.json()) as any;

      // Your API currently returns:
      // OK:   { ok:true, pass:{...} }
      // FAIL: { ok:false, error:"..." }
      setResp(j as ApiResponse);
    } catch (e: any) {
      setResp({ ok: false, error: e?.message || "Unknown error" });
    } finally {
      setLoading(false);
    }
  }

  const pass = resp && (resp as any).pass ? ((resp as any).pass as ApiPass) : null;

  const left = secondsLeft(pass?.expires_at, nowMs);
  const isActive = !!pass && pass.status === "active" && left > 0;

  const verifyUrl = token ? `${origin}/verify?token=${encodeURIComponent(token)}` : "";
  const apiUrl = token ? `${origin}/api/pass/${encodeURIComponent(token)}` : "";

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0b0b0d",
        color: "#fff",
        fontFamily: "system-ui",
        padding: 24,
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div style={{ width: "100%", maxWidth: 980 }}>
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <h1 style={{ margin: 0, fontSize: 30, fontWeight: 950 }}>Verify Access Pass</h1>
          <div style={{ opacity: 0.75, fontWeight: 800 }}>Staff verifier</div>
        </div>

        <div style={{ marginTop: 14, opacity: 0.8, lineHeight: 1.5 }}>
          Paste a token or open this page with <code style={{ background: "#15151a", padding: "2px 6px", borderRadius: 6 }}>?token=...</code>
        </div>

        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste token…"
            style={{
              flex: "1 1 420px",
              padding: "12px 14px",
              borderRadius: 12,
              border: "1px solid #2b2b33",
              background: "#111118",
              color: "white",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
            }}
          />
          <button
            onClick={() => verify(token)}
            disabled={!token.trim() || loading}
            style={{
              padding: "12px 16px",
              borderRadius: 12,
              border: "none",
              background: "#2563eb",
              color: "white",
              fontWeight: 950,
              cursor: "pointer",
            }}
          >
            {loading ? "Checking…" : "Verify"}
          </button>
        </div>

        {token ? (
          <div style={{ marginTop: 18, display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-start" }}>
            <div style={{ background: "#0f0f14", border: "1px solid #23232a", borderRadius: 18, padding: 16 }}>
              <div style={{ fontWeight: 950, marginBottom: 10 }}>QR (Human verify)</div>
              {origin ? <QRCodeCanvas value={verifyUrl} size={190} includeMargin /> : null}
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75, maxWidth: 260, wordBreak: "break-all" }}>
                {verifyUrl}
              </div>

              <div style={{ height: 12 }} />

              <div style={{ fontWeight: 950, marginBottom: 10 }}>QR (API JSON)</div>
              {origin ? <QRCodeCanvas value={apiUrl} size={190} includeMargin /> : null}
              <div style={{ marginTop: 10, fontSize: 12, opacity: 0.75, maxWidth: 260, wordBreak: "break-all" }}>
                {apiUrl}
              </div>
            </div>

            <div style={{ flex: "1 1 420px" }}>
              {!resp && !loading ? null : (
                <div
                  style={{
                    padding: 18,
                    borderRadius: 18,
                    border: "1px solid #23232a",
                    background: isActive ? "#052e1a" : "#2a0b0b",
                  }}
                >
                  <div style={{ fontSize: 26, fontWeight: 999 }}>
                    {loading ? "CHECKING…" : isActive ? "✅ VALID" : "❌ INVALID / EXPIRED"}
                  </div>

                  {pass ? (
                    <div style={{ marginTop: 10, opacity: 0.9, lineHeight: 1.7 }}>
                      <div>
                        <b>Expires in:</b> {left}s
                      </div>
                      <div>
                        <b>Status:</b> {pass.status}
                      </div>
                      <div>
                        <b>Venue:</b> {pass.venue_id}
                      </div>
                      <div style={{ marginTop: 10, fontSize: 12, opacity: 0.85 }}>
                        <b>Token:</b>{" "}
                        <span style={{ fontFamily: "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace" }}>
                          {pass.token}
                        </span>
                      </div>
                    </div>
                  ) : null}

                  {resp && !pass ? (
                    <div style={{ marginTop: 10, opacity: 0.9 }}>
                      {(resp as any).error ? (resp as any).error : "No pass returned."}
                    </div>
                  ) : null}

                  <details style={{ marginTop: 14 }}>
                    <summary style={{ cursor: "pointer", fontWeight: 900, opacity: 0.85 }}>
                      Raw response (debug)
                    </summary>
                    <pre
                      style={{
                        marginTop: 10,
                        padding: 12,
                        borderRadius: 12,
                        background: "#0b0b0d",
                        overflowX: "auto",
                        fontSize: 12,
                      }}
                    >
{JSON.stringify(resp, null, 2)}
                    </pre>
                  </details>
                </div>
              )}
            </div>
          </div>
        ) : null}
      </div>
    </main>
  );
}
