import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link
      href="/"
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        textDecoration: "none",
      }}
    >
      <picture>
        <source media="(prefers-color-scheme: dark)" srcSet="/axw-logo-dark.png" />
        <img
          src="/axw-logo.png"
          width={34}
          height={34}
          alt="AXW"
          style={{ display: "block" }}
        />
      </picture>

      <span style={{ fontWeight: 700, letterSpacing: 0.4, color: "inherit" }}>
        AXW
      </span>
    </Link>
  );
}
