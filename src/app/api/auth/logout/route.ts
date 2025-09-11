// src/app/api/auth/logout/route.ts
import { NextResponse } from "next/server";

export async function GET() {
  const site = process.env.SITE_URL || "http://localhost:3000";

  // Create a redirect response and mutate cookies on *the response*
  const res = NextResponse.redirect(site, { status: 302 });

  // Delete cookies set during login
  res.cookies.delete("tk_user");
  res.cookies.delete("tk_token");

  return res;
}
