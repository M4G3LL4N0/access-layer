import MarketingHeader from "@/components/MarketingHeader";
import React from "react";

export default function MarketingShell({
  children,
  maxWidth = 1120,
}: {
  children: React.ReactNode;
  maxWidth?: number;
}) {
  return (
    <main style={{ background: "#fff" }}>
      <MarketingHeader />
      <div style={{ maxWidth, margin: "0 auto", padding: "22px 16px 70px" }}>{children}</div>
    </main>
  );
}
