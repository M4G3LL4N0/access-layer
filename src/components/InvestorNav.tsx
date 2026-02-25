"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function InvestorNav() {
  const pathname = usePathname();

  const Item = ({ href, label }: { href: string; label: string }) => (
    <Link
      href={href}
      style={{
        padding: "8px 12px",
        borderRadius: 12,
        textDecoration: "none",
        border: "1px solid rgba(0,0,0,0.15)",
        background: pathname === href ? "rgba(0,0,0,0.08)" : "transparent",
      }}
    >
      {label}
    </Link>
  );

  return (
    <div style={{ display: "flex", gap: 10, padding: 16 }}>
      <Item href="/investors" label="Overview" />
      <Item href="/investors/mega" label="Mega" />
    </div>
  );
}
