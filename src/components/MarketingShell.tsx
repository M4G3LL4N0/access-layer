"use client";

import React from "react";
import MarketingHeader from "./MarketingHeader";

export default function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ minHeight: "100vh", background: "white" }}>
      <MarketingHeader />
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "28px 16px 80px" }}>
        {children}
      </div>
      <footer style={{ borderTop: "1px solid #eee", padding: "18px 16px", color: "#666", fontSize: 12 }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img src="/axw-icon.png" alt="AXW" style={{ width: 16, height: 16, display: "block" }} />
            <span>AXW — Access × World</span>
          </div>
          <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
            <a href="/legal/terms" style={{ color: "inherit", textDecoration: "none" }}>Terms</a>
            <a href="/legal/privacy" style={{ color: "inherit", textDecoration: "none" }}>Privacy</a>
            <a href="/contact" style={{ color: "inherit", textDecoration: "none" }}>Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
