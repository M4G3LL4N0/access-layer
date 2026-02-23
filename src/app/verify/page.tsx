"use client";

import { useEffect, useRef, useState } from "react";

type VerifyResult =
  | {
      ok: boolean;
      valid?: boolean;
      reason?: string;
      pass?: {
        token: string;
        status: string;
        issued_at: string;
        expires_at: string;
        venue_id: string;
      };
      error?: string;
    }
  | null;

export default function VerifyPage() {
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<VerifyResult>(null);

  const [cameraOn, setCameraOn] = useState(false);
  const [camErr, setCamErr] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const scannerRef = useRef<any>(null);

  async function runVerify(t: string) {
    const trimmed = (t || "").trim();
    if (!trimmed) return;

    setLoading(true);
    setResult(null);

    try {
      const res = await fetch("/api/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: trimmed }),
      });

      const json = await res.json();
      setResult(json);
    } catch (e: any) {
      setResult({ ok: false, error: String(e?.message || e) });
    } finally {
      setLoading(false);
    }
  }

  async function startCamera() {
    setCamErr(null);
    setCameraOn(true);

    try {
      const QrScanner = (await import("qr-scanner")).default;

      if (!videoRef.current) throw new Error("Video element missing");

      // Stop any previous scanner
      if (scannerRef.current) {
        try {
          await scannerRef.current.stop();
        } catch {}
        scannerRef.current = null;
      }

      const scanner = new QrScanner(
        videoRef.current,
        (scanResult: any) => {
          const data = String(scanResult?.data || "").trim();
          if (!data) return;

          // Accept either:
          // 1) raw token
          // 2) full pass URL like https://.../pass/<token>
          let extracted = data;
          const m = data.match(/\/pass\/([A-Za-z0-9_-]{10,})/);
          if (m?.[1]) extracted = m[1];

          setToken(extracted);
          runVerify(extracted);

          // Optional: stop camera after first scan
          stopCamera();
        },
        {
          returnDetailedScanResult: true,
          highlightScanRegion: true,
          highlightCodeOutline: true,
        }
      );

      scannerRef.current = scanner;
      await scanner.start();
    } catch (e: any) {
      setCamErr(String(e?.message || e));
      setCameraOn(false);
    }
  }

  async function stopCamera() {
    setCameraOn(false);
    if (scannerRef.current) {
      try {
        await scannerRef.current.stop();
      } catch {}
      scannerRef.current = null;
    }
  }

  useEffect(() => {
    return () => {
      // cleanup on unmount
      if (scannerRef.current) {
        try {
          scannerRef.current.stop();
        } catch {}
        scannerRef.current = null;
      }
    };
  }, []);

  const valid = result?.valid === true;

  return (
    <main
      style={{
        fontFamily: "system-ui",
        minHeight: "100vh",
        background: "#0b0b0c",
        color: "white",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
      }}
    >
      <div style={{ width: "100%", maxWidth: 820 }}>
        <h1 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Verify Access Pass</h1>
        <p style={{ opacity: 0.8, marginTop: 8 }}>
          Staff verifier. Scan a QR code or paste a token to confirm validity (active + not expired).
        </p>

        {/* Controls */}
        <div style={{ marginTop: 16, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <input
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="Paste token (or scan)…"
            style={{
              flex: 1,
              minWidth: 260,
              padding: "12px 14px",
              borderRadius: 14,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
              outline: "none",
              fontWeight: 700,
            }}
          />

          <button
            onClick={() => runVerify(token)}
            disabled={loading || !token.trim()}
            style={{
              padding: "12px 16px",
              borderRadius: 14,
              border: "none",
              background: "white",
              color: "black",
              fontWeight: 900,
              cursor: "pointer",
              opacity: loading || !token.trim() ? 0.6 : 1,
            }}
          >
            {loading ? "Checking..." : "Verify"}
          </button>

          {!cameraOn ? (
            <button
              onClick={startCamera}
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Scan QR
            </button>
          ) : (
            <button
              onClick={stopCamera}
              style={{
                padding: "12px 16px",
                borderRadius: 14,
                border: "1px solid rgba(255,255,255,0.18)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
                fontWeight: 900,
                cursor: "pointer",
              }}
            >
              Stop Camera
            </button>
          )}
        </div>

        {/* Camera */}
        {cameraOn && (
          <div style={{ marginTop: 14 }}>
            <div style={{ opacity: 0.75, fontSize: 12, marginBottom: 8 }}>
              Point camera at the QR code shown on the pass screen.
            </div>

            <div
              style={{
                borderRadius: 18,
                overflow: "hidden",
                border: "1px solid rgba(255,255,255,0.12)",
                background: "black",
              }}
            >
              <video
                ref={videoRef}
                style={{ width: "100%", height: "auto", display: "block" }}
                muted
                playsInline
              />
            </div>
          </div>
        )}

        {camErr && (
          <div
            style={{
              marginTop: 12,
              padding: 12,
              borderRadius: 14,
              border: "1px solid rgba(239,68,68,0.35)",
              background: "rgba(239,68,68,0.12)",
              fontWeight: 800,
            }}
          >
            Camera error: {camErr}
          </div>
        )}

        {/* Result */}
        {result && (
          <div
            style={{
              marginTop: 18,
              padding: 16,
              borderRadius: 16,
              border: "1px solid rgba(255,255,255,0.12)",
              background: valid ? "rgba(34,197,94,0.12)" : "rgba(239,68,68,0.12)",
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 900 }}>
              {valid ? "✅ VALID PASS" : "❌ INVALID PASS"}
            </div>

            <div style={{ marginTop: 8, opacity: 0.9 }}>
              Reason: <b>{String((result as any).reason || (result as any).error || "unknown")}</b>
            </div>

            {(result as any).pass && (
              <div
                style={{
                  marginTop: 10,
                  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 13,
                }}
              >
                <div>venue_id: {(result as any).pass.venue_id}</div>
                <div>status: {(result as any).pass.status}</div>
                <div>issued_at: {(result as any).pass.issued_at}</div>
                <div>expires_at: {(result as any).pass.expires_at}</div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: 18, opacity: 0.65, fontSize: 12 }}>
          Tip: Generate a token from a kiosk page, then scan it here.
        </div>
      </div>
    </main>
  );
}
