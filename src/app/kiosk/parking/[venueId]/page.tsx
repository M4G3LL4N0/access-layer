"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";

export default function ParkingKiosk() {
  const { venueId } = useParams() as { venueId: string };

  const [entryToken, setEntryToken] = useState("");
  const [exitToken, setExitToken] = useState("");
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
        setStatusMsg("Issued parking validation.");
      }
    } catch (e: any) {
      setStatusMsg(String(e?.message || e));
    }
  }

  async function verifyParkingToken() {
    if (!exitToken) {
      setStatusMsg("Enter token to verify.");
      return;
    }

    try {
      const res = await fetch(`/api/parking/verify?token=${encodeURIComponent(exitToken)}`);
      const j = await res.json();

      setStatusMsg(JSON.stringify(j, null, 2));
    } catch (e: any) {
      setStatusMsg(String(e?.message || e));
    }
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>Parking Kiosk – {venueId || "(no venue)"}</h1>

      <section style={{ marginTop: 18 }}>
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
          Issue Parking Validation
        </button>
      </section>

      {entryToken && (
        <div style={{ marginTop: 14 }}>
          <div><b>Parking token:</b> {entryToken}</div>
          <div style={{ marginTop: 8 }}>
            Copy or scan this token to exit:
            <div
              style={{
                padding: 10,
                fontFamily: "ui-monospace, Menlo, monospace",
                background: "#f0f0f0",
                borderRadius: 6,
                marginTop: 6,
              }}
            >
              {entryToken}
            </div>
          </div>
        </div>
      )}

      <section style={{ marginTop: 24 }}>
        <h3>Verify / Exit Token</h3>
        <input
          value={exitToken}
          onChange={(e) => setExitToken(e.target.value)}
          placeholder="Paste token here"
          style={{
            padding: "8px 10px",
            border: "1px solid #ccc",
            borderRadius: 6,
            width: "100%",
            marginBottom: 8,
          }}
        />
        <button
          onClick={verifyParkingToken}
          style={{
            padding: "10px 14px",
            background: "#0056b3",
            color: "white",
            fontWeight: 900,
            borderRadius: 8,
            cursor: "pointer",
          }}
        >
          Verify Parking Token
        </button>
      </section>

      {statusMsg && (
        <pre
          style={{
            marginTop: 16,
            padding: 12,
            border: "1px solid #ddd",
            borderRadius: 8,
            background: "#fafafa",
            fontSize: 12,
          }}
        >
          {statusMsg}
        </pre>
      )}
    </main>
  );
}
