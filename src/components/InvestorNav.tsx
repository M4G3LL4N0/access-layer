"use client";

import Link from "next/link";

type Item = { href: string; label: string; badge?: string };

const items: Item[] = [
  { href: "/investors", label: "Investors (Main)" },
  { href: "/investors/mega", label: "Investor Hub", badge: "NEW" },
  { href: "/investors/model", label: "Model" },
  { href: "/vc", label: "VC" },
  { href: "/vc/packet", label: "VC Packet" },
  { href: "/press", label: "Press" },
  { href: "/demo", label: "Demo" },
  { href: "/analytics", label: "Analytics" },
  { href: "/enterprise", label: "Enterprise" },
  { href: "/solutions/parking", label: "Parking" },
];

export default function InvestorNav() {
  return (
    <div style={wrap}>
      <div style={row}>
        {items.map((it) => (
          <Link key={it.href} href={it.href} style={pill}>
            <span>{it.label}</span>
            {it.badge ? <span style={badge}>{it.badge}</span> : null}
          </Link>
        ))}
      </div>
      <div style={hint}>
        Tip: these links are duplicated across investor pages so it feels like its own mini-site.
      </div>
    </div>
  );
}

const wrap: React.CSSProperties = {
  marginBottom: 14,
};

const row: React.CSSProperties = {
  display: "flex",
  gap: 10,
  flexWrap: "wrap",
  alignItems: "center",
};

const pill: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  padding: "8px 12px",
  borderRadius: 999,
  border: "1px solid rgba(255,255,255,0.14)",
  background: "rgba(255,255,255,0.06)",
  color: "inherit",
  textDecoration: "none",
  fontWeight: 800,
  fontSize: 13,
};

const badge: React.CSSProperties = {
  padding: "2px 8px",
  borderRadius: 999,
  background: "rgba(255,255,255,0.14)",
  border: "1px solid rgba(255,255,255,0.18)",
  fontSize: 11,
  fontWeight: 900,
};

const hint: React.CSSProperties = {
  marginTop: 8,
  fontSize: 12,
  opacity: 0.7,
};
