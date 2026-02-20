"use client";
import React from "react";

export default function InvestorNav() {
  const link: React.CSSProperties = {
    textDecoration: "none",
    color: "inherit",
    fontWeight: 900,
    opacity: 0.85,
    padding: "8px 10px",
    borderRadius: 10,
    border: "1px solid rgba(0,0,0,0.10)",
  };

  const strong: React.CSSProperties = {
    ...link,
    background: "#0b0f19",
    color: "white",
    border: "1px solid rgba(0,0,0,0.0)",
    opacity: 1,
  };

  return (
    <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
      <a href="/investors" style={strong}>Investors</a>
      <a href="/investors/model" style={link}>Model</a>
      <a href="/vc" style={link}>VC Hub</a>
      <a href="/vc/packet" style={link}>Packet</a>
      <a href="/vc/checklist" style={link}>Checklist</a>
      <a href="/reports/sf" style={link}>SF Report</a>
      <a href="/case-studies/sf-pilot" style={link}>Case Study</a>
    </div>
  );
}
