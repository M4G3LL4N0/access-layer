import React from "react";

export default function MarketingShell({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
}) {
  return (
    <main style={{ maxWidth: 1180, margin: "0 auto", padding: "32px 16px 80px" }}>
      {eyebrow ? (
        <div style={{ fontSize: 12, letterSpacing: 1.2, color: "#777", textTransform: "uppercase" }}>
          {eyebrow}
        </div>
      ) : null}

      <h1 style={{ margin: "10px 0 0", fontSize: 52, lineHeight: 1.02, letterSpacing: -1.4, fontWeight: 900 }}>
        {title}
      </h1>

      {subtitle ? (
        <p style={{ marginTop: 12, maxWidth: 780, fontSize: 18, lineHeight: 1.6, color: "#444" }}>{subtitle}</p>
      ) : null}

      <div style={{ marginTop: 22 }}>{children}</div>
    </main>
  );
}
