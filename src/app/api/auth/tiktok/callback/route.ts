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

  // READ ONLY: use await cookies()
  const c = await cookies();
  const expectedState = c.get("t_state")?.value;
  const verifier = c.get("t_verifier")?.value;

  const site = process.env.SITE_URL || "http://localhost:3000";

  // If anything is off, redirect and clear temp cookies on the response
  if (!code || !state || !expectedState || state !== expectedState || !verifier) {
    const fail = NextResponse.redirect(`${site}?auth=failed`, 302);
    fail.cookies.set("t_state", "", { maxAge: 0, path: "/" });
    fail.cookies.set("t_verifier", "", { maxAge: 0, path: "/" });
    return fail;
  }

  const client_key = process.env.TIKTOK_CLIENT_KEY!;
  const client_secret = process.env.TIKTOK_CLIENT_SECRET!;
  const redirect_uri = process.env.TIKTOK_REDIRECT_URI!;

  try {
    const resp = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8" },
      body: new URLSearchParams({
        client_key,
        client_secret,
        code,
        grant_type: "authorization_code",
        code_verifier: verifier,
        redirect_uri,
      }),
    });

    const data = (await resp.json()) as TokenResp;

    // Build the final response first so we can mutate cookies on it
    const res = NextResponse.redirect(site, 302);

    // Always clear temp cookies
    res.cookies.set("t_state", "", { maxAge: 0, path: "/" });
    res.cookies.set("t_verifier", "", { maxAge: 0, path: "/" });

    if (!data.access_token || !data.open_id) {
      return NextResponse.redirect(`${site}?auth=failed`, 302);
    }

    // Persist short-lived demo cookies
    const opts = { httpOnly: true as const, sameSite: "lax" as const, path: "/", maxAge: 60 * 60 * 24 * 7 };
    res.cookies.set("tk_user", data.open_id, opts);
    res.cookies.set("tk_token", data.access_token, opts);

    return res;
  } catch {
    const fail = NextResponse.redirect(`${site}?auth=failed`, 302);
    fail.cookies.set("t_state", "", { maxAge: 0, path: "/" });
    fail.cookies.set("t_verifier", "", { maxAge: 0, path: "/" });
    return fail;
  }
}
