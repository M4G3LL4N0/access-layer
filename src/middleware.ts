import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const host = request.headers.get("host") || "";
  const url = request.nextUrl;

  // If the user is on app.accessxworld.com and they visit the homepage,
  // send them into the platform at /venues.
  if (host.startsWith("app.") && url.pathname === "/") {
    url.pathname = "/venues";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

// Only run this middleware on the homepage route.
export const config = {
  matcher: ["/"],
};
