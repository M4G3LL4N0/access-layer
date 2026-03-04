"use client";

import React from "react";
import { usePathname } from "next/navigation";

export default function SiteHeader() {
  const pathname = usePathname() || "/";

  const HIDE_ON = new Set<string>([
    "/",
    "/home-v1",
    "/home-v2",
    "/pricing",
    "/venues",
    "/operators",
    "/investors",
    "/network",
    "/contact",
    "/enterprise",
    "/government",
    "/press",
    "/sdk",
    "/owners",
    "/legal/terms",
    "/legal/privacy",
  ]);

  if (HIDE_ON.has(pathname)) return null;

  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        background: "white",
        borderBottom: "1px solid #eee",
      }}
    >
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "12px 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 14,
        }}
      >
        <a
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            textDecoration: "none",
            color: "black",
            fontWeight: 800,
            letterSpacing: 0.2,
          }}
        >
          <img src="/icon.png" alt="AXW" width={22} height={22} style={{ display: "block" }} />
          <span style={{ fontSize: 18 }}>AXW</span>
        </a>

        <nav style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
          <A href="/pricing">Pricing</A>
          <A href="/venues">Venues</A>
          <A href="/operators">Operators</A>
          <A href="/investors">Investors</A>
          <A href="/login">Login</A>
        </nav>
      </div>
    </header>
  );
}

function A({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      style={{
        textDecoration: "none",
        color: "black",
        fontSize: 14,
        padding: "8px 10px",
        borderRadius: 10,
      }}
    >
      {children}
    </a>
  );
}
