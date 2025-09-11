import { NextResponse } from "next/server";

export async function GET() {
  const site = process.env.SITE_URL || "http://localhost:3000";
  const res = NextResponse.redirect(site, 302);
  res.cookies.delete("tk_user");
  res.cookies.delete("tk_token");
  res.cookies.delete("t_state");
  res.cookies.delete("t_verifier");
  return res;
}
