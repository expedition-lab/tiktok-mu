// middleware.ts (project root)
import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const sp = req.nextUrl.searchParams;

  const c = sp.get("c");
  const ttclid = sp.get("ttclid");

  if (c) res.cookies.set("creator", c, { path: "/", maxAge: 60 * 60 * 24 * 30 });
  if (ttclid) res.cookies.set("ttclid", ttclid, { path: "/", maxAge: 60 * 60 * 24 * 30 });

  return res;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
