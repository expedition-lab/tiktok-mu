import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type TokenResp = {
  access_token?: string;
  refresh_token?: string;
  open_id?: string;
  error?: string;
  message?: string;
};

type UserInfoResp = {
  data?: {
    user?: {
      open_id?: string;
      display_name?: string;
      avatar_url?: string;
    };
  };
  error?: string;
  message?: string;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const gotState = url.searchParams.get("state");

  const jar = cookies();
  const savedState = jar.get("t_state")?.value;
  const codeVerifier = jar.get("t_verifier")?.value;

  if (!code || !gotState || !savedState || gotState !== savedState || !codeVerifier) {
    return new NextResponse("Invalid OAuth state", { status: 400 });
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET!;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI!;
  if (!clientKey || !clientSecret || !redirectUri) {
    return new NextResponse("TikTok env missing", { status: 500 });
  }

  const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      grant_type: "authorization_code",
      code,
      redirect_uri: redirectUri,
      code_verifier: codeVerifier,
    }),
    cache: "no-store",
  });
  const tokenJson = (await tokenRes.json()) as TokenResp;

  if (!tokenRes.ok || !tokenJson.access_token) {
    return new NextResponse(`Token exchange failed: ${tokenJson.message || tokenJson.error || tokenRes.statusText}`, { status: 400 });
  }

  // Fetch user info (best effort)
  let display_name = "";
  let avatar_url = "";
  let open_id = tokenJson.open_id || "";

  try {
    const uiRes = await fetch("https://open.tiktokapis.com/v2/user/info/", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenJson.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ fields: ["open_id", "display_name", "avatar_url"] }),
    });
    const uiJson = (await uiRes.json()) as UserInfoResp;
    if (uiJson?.data?.user) {
      open_id = uiJson.data.user.open_id || open_id;
      display_name = uiJson.data.user.display_name || "";
      avatar_url = uiJson.data.user.avatar_url || "";
    }
  } catch {}

  const session = {
    user: { open_id, display_name, avatar_url },
  };

  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set("session", Buffer.from(JSON.stringify(session)).toString("base64"), {
    httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 60 * 60 * 24 * 7
  });
  res.cookies.set("t_state", "", { path: "/", maxAge: 0 });
  res.cookies.set("t_verifier", "", { path: "/", maxAge: 0 });
  return res;
}
