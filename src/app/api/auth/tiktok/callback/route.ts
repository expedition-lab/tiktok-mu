import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type TokenResp = {
  access_token?: string;
  open_id?: string;
  error?: string;
  message?: string;
};

export async function GET(req: Request) {
  const site = process.env.SITE_URL || "http://localhost:3000";
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const incomingState = url.searchParams.get("state");
  const jar = await cookies();
  const savedState = jar.get("t_state")?.value;
  const verifier = jar.get("t_verifier")?.value;

  if (!code || !incomingState || !verifier || incomingState !== savedState) {
    return NextResponse.redirect(`${site}?auth=error`);
  }

  const body = new URLSearchParams({
    client_key: process.env.TIKTOK_CLIENT_KEY!,
    client_secret: process.env.TIKTOK_CLIENT_SECRET!,
    code,
    grant_type: "authorization_code",
    code_verifier: verifier,
    redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
  });

  const tRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body,
  });

  const tJson = (await tRes.json()) as TokenResp;

  if (!tJson.access_token) {
    return NextResponse.redirect(`${site}?auth=error`);
  }

  // (Optional) get user info
  let openId: string | undefined = undefined;
  try {
    const uRes = await fetch(
      "https://open.tiktokapis.com/v2/user/info/?fields=open_id,display_name,avatar_url",
      { headers: { Authorization: `Bearer ${tJson.access_token}` } }
    );
    const uJson = await uRes.json();
    openId = uJson?.data?.user?.open_id;
  } catch {}

  const res = NextResponse.redirect(`${site}?auth=ok`, 302);
  res.cookies.set("tk_token", tJson.access_token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 });
  if (openId) res.cookies.set("tk_user", openId, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 });
  res.cookies.delete("t_state");
  res.cookies.delete("t_verifier");
  return res;
}
