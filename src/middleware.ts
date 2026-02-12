import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname, searchParams } = req.nextUrl;

  // Only protect /admin routes
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  const token = searchParams.get("token") || "";
  const expected = process.env.ADMIN_SEED_TOKEN || "";

  // If no expected token configured, block access in prod
  if (!expected) return NextResponse.redirect(new URL("/venues", req.url));

  if (token !== expected) {
    return NextResponse.redirect(new URL("/venues", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
