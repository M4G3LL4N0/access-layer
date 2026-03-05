import React from "react";

type LinkItem = { label: string; href: string };

const links: LinkItem[] = [
  { label: "Investors", href: "/investors" },
  { label: "Case Study", href: "/case-studies/sf-pilot" },
  { label: "Pricing", href: "/pricing" },
  { label: "Network", href: "/network" },
  { label: "Contact", href: "/contact" },
];

export default function MarketingHeader() {
  return (
    <div style={wrap}>
      <div style={bar}>
        <a href="/" style={brand}>
          <div style={logoBox} aria-hidden="true">
            <img
              src="/axw-icon.png"
              alt=""
              style={{ width: 18, height: 18, display: "block" }}
            />
          </div>
          <div style={{ lineHeight: 1.05 }}>
            <div style={brandTop}>AXW</div>
            <div style={brandSub}>Access × World</div>
          </div>
        </a>

        <nav style={nav}>
          {links.map((l) => (
            <a key={l.href} href={l.href} style={navLink}>
              {l.label}
            </a>
          ))}
        </nav>

        <div style={right}>
          <a href="https://app.accessxworld.com" style={openAppBtn}>
            <span>Open App</span>
            <span style={{ marginLeft: 8, fontSize: 18, lineHeight: "18px" }}>→</span>
          </a>
        </div>
      </div>
    </div>
  );
}

const wrap: React.CSSProperties = {
  position: "sticky",
  top: 0,
  zIndex: 50,
  background: "rgba(255,255,255,0.92)",
  backdropFilter: "blur(10px)",
  borderBottom: "1px solid #eee",
};

const bar: React.CSSProperties = {
  maxWidth: 1120,
  margin: "0 auto",
  padding: "14px 16px",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
};

const brand: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: 12,
  textDecoration: "none",
  color: "black",
  minWidth: 220,
};

const logoBox: React.CSSProperties = {
  width: 36,
  height: 36,
  borderRadius: 12,
  border: "1px solid #e8e8e8",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  background: "white",
};

const brandTop: React.CSSProperties = {
  fontWeight: 800,
  letterSpacing: -0.3,
  fontSize: 15,
};

const brandSub: React.CSSProperties = {
  fontSize: 12,
  color: "#666",
  marginTop: 2,
};

const nav: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 22,
  flex: 1,
  minWidth: 320,
};

const navLink: React.CSSProperties = {
  textDecoration: "none",
  color: "#111",
  fontSize: 14,
  fontWeight: 600,
  padding: "8px 6px",
};

const right: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  minWidth: 220,
};

const openAppBtn: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 8,
  padding: "10px 16px",
  borderRadius: 999,
  border: "1px solid #d9d9d9",
  background: "white",
  textDecoration: "none",
  color: "black",
  fontWeight: 700,
  fontSize: 14,
  boxShadow: "0 1px 0 rgba(0,0,0,0.02)",
};
