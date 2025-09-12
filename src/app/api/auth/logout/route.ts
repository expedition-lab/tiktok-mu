import { NextResponse } from "next/server";

export async function GET() {
  const site = process.env.SITE_URL || "http://localhost:3000";

  // Use the response to clear cookies
  const res = NextResponse.redirect(site, 302);

  // Clear cookies by setting maxAge: 0 (works reliably across versions)
  res.cookies.set("tk_user", "", { maxAge: 0, path: "/" });
  res.cookies.set("tk_token", "", { maxAge: 0, path: "/" });
  res.cookies.set("t_state", "", { maxAge: 0, path: "/" });
  res.cookies.set("t_verifier", "", { maxAge: 0, path: "/" });

  return res;
}
