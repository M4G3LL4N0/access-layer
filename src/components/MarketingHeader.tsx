"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const nav = [
  { label: "Investors", href: "/investors" },
  { label: "Case Study", href: "/case-studies/sf-pilot" },
  { label: "Pricing", href: "/pricing" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

function isActive(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(href + "/");
}

export default function MarketingHeader() {
  const pathname = usePathname();

  return (
    <div style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,0.92)", backdropFilter: "blur(10px)", borderBottom: "1px solid #eee" }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", color: "black" }}>
          <div style={{ width: 38, height: 38, borderRadius: 12, border: "1px solid #eee", display: "grid", placeItems: "center", background: "white" }}>
            <img src="/axw-icon.png" alt="AXW" style={{ width: 22, height: 22, display: "block" }} />
          </div>
          <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
            <div style={{ fontWeight: 800, letterSpacing: -0.2 }}>AXW</div>
            <div style={{ fontSize: 12, color: "#666" }}>Access × World</div>
          </div>
        </Link>

        <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <nav style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
            {nav.map((n) => {
              const active = isActive(pathname, n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  style={{
                    textDecoration: "none",
                    color: active ? "black" : "#333",
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "8px 10px",
                    borderRadius: 999,
                    background: active ? "#f4f4f4" : "transparent",
                    border: active ? "1px solid #eaeaea" : "1px solid transparent",
                  }}
                >
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <a
            href="https://app.accessxworld.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: "10px 14px",
              borderRadius: 999,
              border: "1px solid #e6e6e6",
              background: "white",
              textDecoration: "none",
              color: "black",
              fontWeight: 800,
              fontSize: 14,
              boxShadow: "0 1px 0 rgba(0,0,0,0.03)",
              whiteSpace: "nowrap",
            }}
          >
            Open App <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </div>
  );
}
