"use client";

import { useMemo, useState } from "react";
import Link from "next/link";

type CredentialType = "qr-pass" | "plate" | "badge" | "pin";
type Step = "credential" | "issue" | "verify" | "done";

const types: { id: CredentialType; label: string; detail: string }[] = [
  { id: "qr-pass", label: "QR pass", detail: "Guest link for venue entry" },
  { id: "plate", label: "License plate", detail: "Parking and gate lanes" },
  { id: "badge", label: "Staff badge", detail: "Operator-issued credential" },
  { id: "pin", label: "PIN", detail: "Kiosk or lane fallback" },
];

function mockToken(type: CredentialType) {
  const base = type.toUpperCase().replace("-", "");
  return `DEMO-${base}-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;
}

export function AccessLayerDemoWorkspace() {
  const [step, setStep] = useState<Step>("credential");
  const [credential, setCredential] = useState<CredentialType>("qr-pass");
  const [token, setToken] = useState<string | null>(null);
  const [venue, setVenue] = useState("Riverside Garage — Lot B");

  const verifyResult = useMemo(() => {
    if (!token) return null;
    return {
      allowed: true,
      reason: "DEMO: Credential matches pilot ruleset (sample data only).",
      lane: credential === "plate" ? "ANPR-02" : "Gate-01",
    };
  }, [token, credential]);

  return (
    <div style={{ marginTop: 24 }}>
      <p
        style={{
          display: "inline-block",
          fontSize: 12,
          fontWeight: 700,
          padding: "4px 10px",
          borderRadius: 8,
          background: "#fff7ed",
          color: "#9a3412",
          marginBottom: 16,
        }}
      >
        DEMO workspace — not production security
      </p>

      {step === "credential" && (
        <section>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>1. Choose credential type</h2>
          <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6 }}>
            Pick what the guest or vehicle presents at the lane.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 12,
              margin: "16px 0",
            }}
          >
            {types.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setCredential(t.id)}
                style={{
                  textAlign: "left",
                  padding: 14,
                  borderRadius: 12,
                  border:
                    credential === t.id ? "2px solid #111" : "1px solid rgba(0,0,0,0.12)",
                  background: credential === t.id ? "#f8fafc" : "#fff",
                  cursor: "pointer",
                }}
              >
                <strong style={{ display: "block" }}>{t.label}</strong>
                <span style={{ fontSize: 13, opacity: 0.75 }}>{t.detail}</span>
              </button>
            ))}
          </div>
          <label style={{ display: "block", marginBottom: 16 }}>
            <span style={{ fontSize: 13, fontWeight: 600 }}>Venue (demo)</span>
            <input
              value={venue}
              onChange={(e) => setVenue(e.target.value)}
              style={{
                display: "block",
                width: "100%",
                maxWidth: 420,
                marginTop: 6,
                padding: "10px 12px",
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.15)",
              }}
            />
          </label>
          <button type="button" onClick={() => setStep("issue")} style={primaryBtn()}>
            Continue to issue
          </button>
        </section>
      )}

      {step === "issue" && (
        <section>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>2. Issue credential</h2>
          <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6 }}>
            Simulates issuing a pass for <strong>{venue}</strong> using{" "}
            <strong>{types.find((t) => t.id === credential)?.label}</strong>.
          </p>
          <button
            type="button"
            onClick={() => {
              setToken(mockToken(credential));
              setStep("verify");
            }}
            style={{ ...primaryBtn(), marginTop: 16 }}
          >
            Issue demo token
          </button>
        </section>
      )}

      {step === "verify" && token && verifyResult && (
        <section>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>3. Verify at lane</h2>
          <p style={{ fontFamily: "monospace", fontSize: 14 }}>Token: {token}</p>
          <div
            style={{
              marginTop: 16,
              padding: 16,
              borderRadius: 12,
              background: "#ecfdf5",
              border: "1px solid #6ee7b7",
            }}
          >
            <p style={{ fontWeight: 700 }}>Access granted</p>
            <p style={{ marginTop: 8 }}>{verifyResult.reason}</p>
            <p style={{ fontSize: 13, opacity: 0.7, marginTop: 8 }}>Lane: {verifyResult.lane}</p>
          </div>
          <button
            type="button"
            onClick={() => setStep("done")}
            style={{ ...primaryBtn(), marginTop: 16 }}
          >
            Finish walkthrough
          </button>
        </section>
      )}

      {step === "done" && (
        <section>
          <h2 style={{ fontSize: 22, marginBottom: 8 }}>Walkthrough complete</h2>
          <p className="muted" style={{ maxWidth: 720, lineHeight: 1.6 }}>
            Explore production-shaped routes next. All flows above use sample rules only.
          </p>
          <ul style={{ margin: "16px 0", paddingLeft: 20, lineHeight: 1.8 }}>
            <li>
              <Link href="/v2/credentials">Credentials (v2)</Link>
            </li>
            <li>
              <Link href="/verify">Verify console</Link>
            </li>
            <li>
              <Link href="/ops">Ops dashboard</Link>
            </li>
          </ul>
          <button
            type="button"
            onClick={() => {
              setStep("credential");
              setToken(null);
            }}
            style={secondaryBtn()}
          >
            Restart demo
          </button>
        </section>
      )}
    </div>
  );
}

function primaryBtn() {
  return {
    padding: "10px 18px",
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  } as const;
}

function secondaryBtn() {
  return {
    padding: "10px 18px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.2)",
    background: "#fff",
    fontWeight: 600,
    cursor: "pointer",
  } as const;
}
