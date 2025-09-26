// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only run on these routes (lets Next skip static assets fast)
export const config = {
  matcher: ["/:path*"],
};

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // ----- Always allow these paths (your existing allowlist) -----
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/.well-known") ||
    pathname === "/PASTE_EXACT_FILENAME_FROM_TIKTOK" // replace with your real filename if needed
  ) {
    return NextResponse.next();
  }

  // ----- Protect admin & seller dashboards -----
  if (pathname.startsWith("/admin") || pathname.startsWith("/seller")) {
    const hasSession = req.cookies.get("session")?.value;
    if (!hasSession) {
      const loginUrl = new URL("/login", req.url); // change if your login route differs
      return NextResponse.redirect(loginUrl);
    }
  }

  // (Optional) keep any passcode/extra logic you had here

  return NextResponse.next();
}
