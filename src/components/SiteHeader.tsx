import Link from "next/link";
import SiteLogo from "@/components/SiteLogo";

export default function SiteHeader() {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 50,
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        background: "rgba(255,255,255,0.85)",
      }}
    >
      <div
        style={{
          maxWidth: 1120,
          margin: "0 auto",
          padding: "14px 18px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
        }}
      >
        <SiteLogo />

        <nav style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 14 }}>
          <Link href="/venues">Venues</Link>
          <Link href="/pricing">Pricing</Link>
          <Link href="/investors">Investors</Link>
          <Link href="/login">Login</Link>
        </nav>
      </div>
    </header>
  );
}
