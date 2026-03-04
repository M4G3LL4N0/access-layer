"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import React from "react";

type NavItem = { label: string; href: string };

const NAV: NavItem[] = [
  { label: "Pricing", href: "/pricing" },
  { label: "Venues", href: "/venues" },
  { label: "Operators", href: "/operators" },
  { label: "Network", href: "/network" },
  { label: "Investors", href: "/investors" },
  { label: "Case Study", href: "/case-studies/sf-pilot" },
  { label: "Contact", href: "/contact" },
  { label: "Login", href: "/login" },
];

export default function MarketingHeader() {
  const pathname = usePathname();

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "rgba(255,255,255,0.92)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "14px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "black",
            minWidth: 220,
          }}
        >
          <span
            style={{
              width: 34,
              height: 34,
              borderRadius: 10,
              border: "1px solid #eee",
              background: "white",
              display: "grid",
              placeItems: "center",
              overflow: "hidden",
            }}
          >
            <Image
              src="/icon.png"
              alt="AXW"
              width={24}
              height={24}
              priority
              style={{ display: "block" }}
            />
          </span>

          <span style={{ display: "flex", flexDirection: "column", lineHeight: 1.05 }}>
            <span style={{ fontWeight: 700, letterSpacing: 0.2 }}>AXW</span>
            <span style={{ fontSize: 12, color: "#666" }}>Access × World</span>
          </span>
        </Link>

        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            flexWrap: "wrap",
            justifyContent: "flex-end",
          }}
        >
          {NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: 14,
                  padding: "8px 10px",
                  borderRadius: 10,
                  border: "1px solid transparent",
                  background: active ? "rgba(0,0,0,0.06)" : "transparent",
                }}
              >
                {item.label}
              </Link>
            );
          })}

          <Link
            href="https://app.accessxworld.com"
            style={{
              marginLeft: 6,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              textDecoration: "none",
              color: "black",
              padding: "9px 12px",
              borderRadius: 999,
              border: "1px solid #ddd",
              background: "white",
              fontSize: 14,
              fontWeight: 600,
              whiteSpace: "nowrap",
            }}
          >
            Open App <span aria-hidden style={{ fontSize: 16 }}>→</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}
