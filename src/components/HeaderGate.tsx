"use client";

import React from "react";
import { usePathname } from "next/navigation";
import MarketingHeader from "@/components/MarketingHeader";

const APP_PREFIXES = ["/admin", "/ops", "/operator", "/manage", "/kiosk", "/crm", "/api"];

export default function HeaderGate() {
  const pathname = usePathname() || "/";
  const isApp = APP_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));
  if (isApp) return null;
  return <MarketingHeader />;
}
