"use client";

import MarketingShell from "@/components/MarketingShell";
import React, { useEffect, useRef, useState } from "react";

export default function ScannerPage() {
  const regionId = "axw-scanner-region";
  const scannerRef = useRef<any>(null);
  const [result, setResult] = useState("");
  const [status, setStatus] = useState("idle");

  useEffect(() => {
    let mounted = true;

    async function start() {
      const mod = await import("html5-qrcode");
      const Html5Qrcode = mod.Html5Qrcode;

      if (!mounted) return;

      const scanner = new Html5Qrcode(regionId);
      scannerRef.current = scanner;

      try {
        setStatus("starting");
        await scanner.start(
          { facingMode: "environment" },
          { fps: 10, qrbox: 220 },
          async (decodedText: string) => {
            setStatus("verifying");

            try {
              const res = await fetch("/api/verify", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify({ token: decodedText }),
              });

              const json = await res.json();
              setResult(JSON.stringify(json, null, 2));
              setStatus(json?.ok ? "verified" : "denied");
            } catch (err: any) {
              setResult(err?.message || "Verify failed");
              setStatus("error");
            }
          },
          () => {}
        );

        setStatus("scanning");
      } catch (err: any) {
        setResult(err?.message || "Camera start failed");
        setStatus("error");
      }
    }

    start();

    return () => {
      mounted = false;
      const scanner = scannerRef.current;
      if (scanner) {
        scanner.stop().catch(() => {});
        scanner.clear().catch(() => {});
      }
    };
  }, []);

  return (
    <MarketingShell maxWidth={900}>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>SCANNER</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 44, letterSpacing: -1.2, fontWeight: 950 }}>
        QR scanner verifier
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        Camera-based verification flow for live demos and operator workflows.
      </p>

      <div
        style={{
          marginTop: 18,
          display: "grid",
          gridTemplateColumns: "1.1fr 0.9fr",
          gap: 12,
        }}
      >
        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 18,
            padding: 14,
            background: "white",
          }}
        >
          <div id={regionId} style={{ width: "100%", minHeight: 320 }} />
        </div>

        <div
          style={{
            border: "1px solid #eee",
            borderRadius: 18,
            padding: 14,
            background: "white",
          }}
        >
          <div style={{ fontWeight: 950 }}>Status</div>
          <div style={{ marginTop: 8, fontSize: 13, color: "#666" }}>{status}</div>

          <div style={{ marginTop: 16, fontWeight: 950 }}>Result</div>
          <pre
            style={{
              marginTop: 8,
              whiteSpace: "pre-wrap",
              wordBreak: "break-word",
              fontSize: 12,
              color: "#444",
            }}
          >
            {result || "Scan a pass QR code to verify access."}
          </pre>
        </div>
      </div>
    </MarketingShell>
  );
}
