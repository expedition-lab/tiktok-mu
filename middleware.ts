import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = req.nextUrl;
  const pass = process.env.TEST_PASSCODE ?? "";

  // allow if no pass set
  if (!pass) return NextResponse.next();

  // ignore api/assets
  if (
    url.pathname.startsWith("/api") ||
    url.pathname.startsWith("/_next") ||
    url.pathname === "/favicon.ico" ||
    url.pathname === "/robots.txt" ||
    url.pathname === "/sitemap.xml"
  ) {
    return NextResponse.next();
  }

  const qp = url.searchParams.get("passcode");
  const cookie = req.cookies.get("passcode")?.value;

  // accept one-time pass via query, store cookie, strip query
  if (qp && qp === pass) {
    const clean = new URL(url.pathname, req.url);
    const res = NextResponse.redirect(clean);
    res.cookies.set("passcode", qp, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });
    return res;
  }

  if (cookie === pass) return NextResponse.next();

  // protect /dashboard
  if (url.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/unlock", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
