import { NextResponse } from "next/server";
import { cookies } from "next/headers";

type TokenResp = {
  access_token?: string;
  open_id?: string;
  error?: string;
  message?: string;
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const err = url.searchParams.get("error");
  const site = process.env.SITE_URL || "http://localhost:3000";

  if (err) {
    return NextResponse.redirect(`${site}?auth=error&reason=${encodeURIComponent(err)}`);
  }

  const store = await cookies();
  const expectedState = store.get("t_state")?.value;
  const verifier = store.get("t_verifier")?.value;

  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    return NextResponse.redirect(`${site}?auth=error`);
  }

  try {
    const body = new URLSearchParams({
      client_key: process.env.TIKTOK_CLIENT_KEY!,
      client_secret: process.env.TIKTOK_CLIENT_SECRET!,
      code,
      grant_type: "authorization_code",
      redirect_uri: process.env.TIKTOK_REDIRECT_URI!,
      code_verifier: verifier,
    });

    const r = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString(),
    });
    const data = (await r.json()) as TokenResp;

    if (!r.ok || data.error || !data.access_token) {
      return NextResponse.redirect(`${site}?auth=error`);
    }

    const res = NextResponse.redirect(`${site}?auth=ok`, 302);
    res.cookies.set("tk_token", data.access_token, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    if (data.open_id) {
      res.cookies.set("tk_user", data.open_id, {
        httpOnly: true,
        secure: true,
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24,
      });
    }
    // clear temp cookies
    res.cookies.set("t_state", "", { path: "/", maxAge: 0 });
    res.cookies.set("t_verifier", "", { path: "/", maxAge: 0 });
    return res;
  } catch {
    return NextResponse.redirect(`${site}?auth=error`);
  }
}
