"use client";

import { useState } from "react";
import { useParams } from "next/navigation";

export default function ParkingKiosk() {
  const { venueId } = useParams() as { venueId: string };
  const [entryToken, setEntryToken] = useState("");
  const [verifyInput, setVerifyInput] = useState("");
  const [verifyResult, setVerifyResult] = useState<any>(null);
  const [statusMsg, setStatusMsg] = useState("");

  async function issueParkingValidation() {
    if (!venueId) {
      setStatusMsg("Missing venueId");
      return;
    }

    try {
      const fd = new FormData();
      fd.set("venueId", venueId);

      const res = await fetch("/api/parking/issue", {
        method: "POST",
        body: fd,
      });

      const j = await res.json();
      if (!res.ok || !j.ok) {
        setStatusMsg(`Error: ${j.error || res.statusText}`);
      } else {
        setEntryToken(j.token);
        setStatusMsg("Issued parking token. You can verify it below.");
        setVerifyResult(null);
      }
    } catch (e: any) {
      setStatusMsg(String(e?.message || e));
    }
  }

  async function handleVerify(tokenToVerify: string) {
    if (!tokenToVerify) {
      setStatusMsg("Enter a token to verify.");
      return;
    }

    try {
      const res = await fetch(
        `/api/parking/verify?token=${encodeURIComponent(tokenToVerify)}`
      );
      const j = await res.json();
      if (!res.ok || !j.ok) {
        setStatusMsg(`Verify error: ${j.error || res.statusText}`);
      } else {
        setVerifyResult(j);
        setStatusMsg("Verification complete.");
      }
    } catch (e: any) {
      setStatusMsg(String(e?.message || e));
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1 style={{ fontSize: 28, fontWeight: 900 }}>
        Parking Kiosk — {venueId}
      </h1>

      <section style={{ margin: "18px 0" }}>
        <button
          onClick={issueParkingValidation}
          style={{
            padding: "10px 14px",
            background: "black",
            color: "white",
            fontWeight: 900,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Issue Parking Validation Token
        </button>
      </section>

      {entryToken && (
        <div style={{ marginTop: 12 }}>
          <div style={{ fontWeight: 700 }}>Issued Parking Token:</div>
          <div
            style={{
              marginTop: 6,
              fontFamily: "ui-monospace, Menlo, monospace",
              padding: 10,
              background: "#f0f0f0",
              borderRadius: 6,
            }}
          >
            {entryToken}
          </div>

          <button
            onClick={() => handleVerify(entryToken)}
            style={{
              marginTop: 12,
              padding: "8px 12px",
              background: "#0072e5",
              color: "white",
              borderRadius: 8,
              fontWeight: 800,
              cursor: "pointer",
            }}
          >
            Verify This Token
          </button>
        </div>
      )}

      <section style={{ marginTop: 24 }}>
        <h2 style={{ fontSize: 20, fontWeight: 800 }}>Verify Token</h2>

        <input
          type="text"
          placeholder="Enter parking token"
          value={verifyInput}
          onChange={(e) => setVerifyInput(e.target.value)}
          style={{
            width: "100%",
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            marginBottom: 8,
          }}
        />

        <button
          onClick={() => handleVerify(verifyInput)}
          style={{
            padding: "10px 14px",
            background: "#0056b3",
            color: "white",
            fontWeight: 900,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Check Token
        </button>
      </section>

      {statusMsg && (
        <div
          style={{
            marginTop: 18,
            padding: 10,
            background: "#fff6d6",
            borderRadius: 8,
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {statusMsg}
        </div>
      )}

      {verifyResult && (
        <div
          style={{
            marginTop: 18,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#f8f9fa",
          }}
        >
          <div>
            <strong>Token:</strong> {verifyResult.token}
          </div>
          <div>
            <strong>Issued:</strong>{" "}
            {verifyResult.issued_at
              ? new Date(verifyResult.issued_at).toLocaleString()
              : "Unknown"}
          </div>

          {verifyResult.verify ? (
            <>
              <div>
                <strong>Status:</strong>{" "}
                {verifyResult.verify.meta?.status}
              </div>
              <div>
                <strong>Expires:</strong>{" "}
                {new Date(verifyResult.verify.meta?.expires_at).toLocaleString()}
              </div>
            </>
          ) : (
            <div style={{ opacity: 0.8 }}>Not yet verified.</div>
          )}

          <details style={{ marginTop: 12 }}>
            <summary>Raw events</summary>
            <pre
              style={{
                fontSize: 10,
                padding: 6,
                background: "#fff",
                borderRadius: 6,
              }}
            >
              {JSON.stringify(verifyResult.allEvents, null, 2)}
            </pre>
          </details>
        </div>
      )}
    </main>
  );
}
