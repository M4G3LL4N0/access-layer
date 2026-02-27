import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ALLOW_PREFIX = [
  "/api",
  "/admin",
  "/login",
  "/_next",
  "/favicon.ico",
  "/icon.png",
  "/apple-icon.png",
  "/opengraph-image.png",
  "/robots.txt",
  "/sitemap.xml",
];

const ALLOW_EXACT = [
  "/",
  "/health",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (ALLOW_EXACT.includes(pathname)) return NextResponse.next();
  for (const p of ALLOW_PREFIX) {
    if (pathname === p || pathname.startsWith(p + "/")) return NextResponse.next();
  }

  // Allow static assets in /public
  if (/\.(png|jpg|jpeg|webp|svg|ico|txt|xml|json)$/i.test(pathname)) {
    return NextResponse.next();
  }

  // Everything else: hard 404
  return NextResponse.rewrite(new URL("/_not-found", req.url));
}

export const config = {
  matcher: ["/:path*"],
};
