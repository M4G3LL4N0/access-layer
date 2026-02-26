import Image from "next/image";
import Link from "next/link";

export default function SiteLogo() {
  return (
    <Link href="/" aria-label="AXW Home" style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <Image
        src="/axw-logo.png"
        alt="AXW"
        width={34}
        height={34}
        priority
        style={{ borderRadius: 8 }}
      />
      <span style={{ fontWeight: 700, letterSpacing: 0.3 }}>AXW</span>
    </Link>
  );
}
