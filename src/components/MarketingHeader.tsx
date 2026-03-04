import React from "react";

type Item = { label: string; href: string };

export default function MarketingHeader({
  items,
  ctaHref = "https://app.accessxworld.com",
  ctaLabel = "Open App",
}: {
  items?: Item[];
  ctaHref?: string;
  ctaLabel?: string;
}) {
  const nav: Item[] =
    items ??
    [
      { label: "Pricing", href: "/pricing" },
      { label: "Venues", href: "/venues" },
      { label: "Operators", href: "/operators" },
      { label: "Investors", href: "/investors" },
      { label: "Network", href: "/network" },
      { label: "Contact", href: "/contact" },
      { label: "Login", href: "/login" },
    ];

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
          padding: "14px 16px",
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
            gap: 12,
            textDecoration: "none",
            color: "black",
          }}
        >
          <span
            style={{
              width: 40,
              height: 40,
              borderRadius: 12,
              border: "1px solid #eee",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "white",
            }}
          >
            <img src="/icon.png" alt="AXW" width={20} height={20} style={{ display: "block" }} />
          </span>

          <div style={{ lineHeight: 1.05 }}>
            <div style={{ fontWeight: 800, letterSpacing: 0.2 }}>AXW</div>
            <div style={{ fontSize: 12, color: "#666" }}>Access × World</div>
          </div>
        </a>

        <div style={{ display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <nav style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center" }}>
            {nav.map((i) => (
              <a key={i.href} href={i.href} style={link}>
                {i.label}
              </a>
            ))}
          </nav>

          <a href={ctaHref} style={cta}>
            <span style={{ fontWeight: 650 }}>{ctaLabel}</span>
            <span style={{ opacity: 0.9 }}>→</span>
          </a>
        </div>
      </div>
    </header>
  );
}

const link: React.CSSProperties = {
  fontSize: 14,
  color: "black",
  textDecoration: "none",
  padding: "8px 10px",
  borderRadius: 10,
};

const cta: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 10,
  padding: "10px 14px",
  borderRadius: 999,
  border: "1px solid #ddd",
  background: "white",
  color: "black",
  textDecoration: "none",
  fontSize: 14,
};
