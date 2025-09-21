import { NextResponse } from "next/server";

export const runtime = "nodejs";           // make sure cookies/Buffer work on Node
export const dynamic = "force-dynamic";    // don't cache logout responses

export async function GET() {
  // Prefer the real site; fall back to your domain
  const site =
    process.env.NEXT_PUBLIC_SITE_URL ||
    process.env.SITE_URL ||
    "https://tokmarket.live";

  const res = NextResponse.redirect(site, 302);

  // Clear all auth-related cookies
  const kill = (name: string) =>
    res.cookies.set(name, "", { path: "/", maxAge: 0, sameSite: "lax" });

  ["tk_user", "tk_token", "t_state", "t_verifier", "session"].forEach(kill);

  return res;
}
