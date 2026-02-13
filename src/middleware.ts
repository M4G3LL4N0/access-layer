import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "axw_admin";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pathname = url.pathname;

  // Only guard /admin routes
  if (!pathname.startsWith("/admin")) {
    return NextResponse.next();
  }

  const seed = process.env.ADMIN_SEED_TOKEN || "";
  // If no seed is configured, don't block (dev-friendly)
  if (!seed) return NextResponse.next();

  const q = url.searchParams.get("admin") || "";
  const cookieVal = req.cookies.get(ADMIN_COOKIE)?.value || "";

  // If query param matches, set cookie and allow
  if (q && q === seed) {
    const res = NextResponse.next();
    res.cookies.set(ADMIN_COOKIE, "1", {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 30, // 30 days
    });
    return res;
  }

  // If cookie exists, allow
  if (cookieVal === "1") return NextResponse.next();

  // Otherwise redirect to /venues with a hint
  const redirect = req.nextUrl.clone();
  redirect.pathname = "/venues";
  redirect.searchParams.set("error", "admin_required");
  return NextResponse.redirect(redirect);
}

// Match only /admin routes
export const config = {
  matcher: ["/admin/:path*"],
};
