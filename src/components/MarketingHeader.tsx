"use client";

import React from "react";

type LinkItem = { label: string; href: string };

const LINKS: LinkItem[] = [
  { label: "Investors", href: "/investors" },
  { label: "Case Study", href: "/case-studies/sf-pilot" },
  { label: "Pricing", href: "/pricing" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

export default function MarketingHeader() {
  return (
    <div style={{ borderBottom: "1px solid #eee", background: "white" }}>
      <div
        style={{
          maxWidth: 1180,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          flexWrap: "wrap",
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            textDecoration: "none",
            color: "black",
            minWidth: 220,
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              border: "1px solid #eee",
              display: "grid",
              placeItems: "center",
              background: "white",
              overflow: "hidden",
            }}
          >
            <img
              src="/icon.png"
              alt="AXW"
              width={28}
              height={28}
              style={{ display: "block" }}
            />
          </div>

          <div style={{ lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, letterSpacing: -0.4, fontSize: 18 }}>
              AXW
            </div>
            <div style={{ fontSize: 12, color: "#666" }}>Access × World</div>
          </div>
        </a>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 22,
            flexWrap: "wrap",
            justifyContent: "center",
            flex: "1 1 auto",
          }}
        >
          {LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              style={{
                textDecoration: "none",
                color: "#222",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: -0.2,
              }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <a
            href="https://app.accessxworld.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "white",
              color: "black",
              textDecoration: "none",
              fontWeight: 800,
              letterSpacing: -0.2,
            }}
          >
            Open App <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
