import MarketingShell from "@/components/MarketingShell";
import { SubpageVisual } from "@/components/SubpageVisual";
import React from "react";

export const dynamic = "force-static";

export default function LoginPage() {
  return (
    <>
    <SubpageVisual variant="default" />
      <MarketingShell maxWidth={760}>
      <div style={{ fontSize: 12, color: "#777", fontWeight: 900, letterSpacing: 0.4 }}>LOGIN</div>

      <h1 style={{ marginTop: 10, marginBottom: 10, fontSize: 44, letterSpacing: -1.2, fontWeight: 950 }}>
        Enter the AXW system.
      </h1>

      <p style={{ marginTop: 0, color: "#333", lineHeight: 1.65, maxWidth: 720 }}>
        Login is the bridge between identity and space. Keep the experience simple, fast, and trustworthy.
      </p>

      <div style={{ marginTop: 18, border: "1px solid #eee", borderRadius: 18, padding: 18, background: "linear-gradient(180deg, #fff, #fafafa)" }}>
        <div style={{ fontWeight: 950, fontSize: 16 }}>Authentication</div>
        <div style={{ marginTop: 8, color: "#666", fontSize: 13, lineHeight: 1.6 }}>
          This page is positioned for auth flows. You can wire magic link or email login here without changing the site shell.
        </div>

        <div style={{ marginTop: 14, display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="/account"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.14)",
              background: "white",
              color: "black",
              textDecoration: "none",
              fontWeight: 950,
            }}
          >
            Account <span>→</span>
          </a>
          <a
            href="https://app.accessxworld.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 10,
              padding: "12px 16px",
              borderRadius: 999,
              border: "1px solid rgba(0,0,0,0.10)",
              background: "black",
              color: "white",
              textDecoration: "none",
              fontWeight: 950,
            }}
          >
            Open App <span>→</span>
          </a>
        </div>
      </div>
    </MarketingShell>
  </>
  )
}
