"use client";

import MarketingShell from "@/components/MarketingShell";
import React, { useState } from "react";

export default function PoliciesPage() {
  const [policyName, setPolicyName] = useState("VIP Night Access");
  const [hours, setHours] = useState("18:00-03:00");
  const [cooldown, setCooldown] = useState("300");
  const [dailyLimit, setDailyLimit] = useState("1");
  const [preview, setPreview] = useState("");

  function buildPreview() {
    const json = {
      name: policyName,
      rules: {
        allowed_hours: hours,
        cooldown_seconds: Number(cooldown),
        daily_limit: Number(dailyLimit),
      },
      active: true,
    };

    setPreview(JSON.stringify(json, null, 2));
  }

  return (
    <MarketingShell maxWidth={920}>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>POLICIES</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 44, letterSpacing: -1.2, fontWeight: 950 }}>
        Policy engine UI
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 860 }}>
        Define the operating logic once, then apply it across spaces, devices, and credentials.
      </p>

      <div style={{ marginTop: 18, display: "grid", gap: 12 }}>
        <input value={policyName} onChange={(e) => setPolicyName(e.target.value)} placeholder="Policy name" style={inputStyle} />
        <input value={hours} onChange={(e) => setHours(e.target.value)} placeholder="18:00-03:00" style={inputStyle} />
        <input value={cooldown} onChange={(e) => setCooldown(e.target.value)} placeholder="300" style={inputStyle} />
        <input value={dailyLimit} onChange={(e) => setDailyLimit(e.target.value)} placeholder="1" style={inputStyle} />

        <button
          onClick={buildPreview}
          style={{
            padding: "12px 16px",
            borderRadius: 999,
            border: "1px solid rgba(0,0,0,0.10)",
            background: "black",
            color: "white",
            fontWeight: 950,
            cursor: "pointer",
          }}
        >
          Generate policy preview
        </button>

        <pre
          style={{
            border: "1px solid #eee",
            borderRadius: 18,
            padding: 14,
            background: "#fafafa",
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
            fontSize: 12,
          }}
        >
          {preview || "Generate a preview to see the policy structure."}
        </pre>
      </div>
    </MarketingShell>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 12px",
  borderRadius: 14,
  border: "1px solid rgba(0,0,0,0.12)",
  background: "white",
  fontSize: 14,
  outline: "none",
};
