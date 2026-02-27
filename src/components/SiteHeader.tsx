import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      style={{
        textDecoration: "none",
        padding: "6px 10px",
        borderRadius: 10,
        border: "1px solid rgba(255,255,255,0.12)"
      }}
    >
      {children}
    </Link>
  );
}

export default function SiteHeader() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 12,
        flexWrap: "wrap",
        padding: "14px 16px",
        borderBottom: "1px solid rgba(255,255,255,0.10)"
      }}
    >
      <SiteLogo />

      <nav style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", fontSize: 14 }}>
        <NavLink href="/pricing">Pricing</NavLink>
        <NavLink href="/venues">Venues</NavLink>
        <NavLink href="/operators">Operators</NavLink>
        <NavLink href="/investors">Investors</NavLink>
        <NavLink href="/login">Login</NavLink>
      </nav>
    </header>
  );
}
