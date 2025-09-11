// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname.startsWith("/.well-known") ||           // allow verification under .well-known
    pathname === "/PASTE_EXACT_FILENAME_FROM_TIKTOK" // allow if file is at root (update to your real filename)
  ) {
    return NextResponse.next();
  }

  return NextResponse.next(); // your passcode logic can stay here if you’re using it
}

