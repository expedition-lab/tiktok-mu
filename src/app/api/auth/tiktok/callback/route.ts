import { cookies } from "next/headers";

type TokenResp = {
  access_token: string;
  expires_in: number;
  token_type: "Bearer";
  scope?: string;
  refresh_token?: string;
  open_id?: string;
};

type UserInfoResp = {
  data?: {
    user?: {
      open_id: string;
      display_name?: string;
      avatar_url?: string;
      username?: string;
    };
  };
  error?: { code: number; message: string };
};

export async function GET(req: Request) {
  const url = new URL(req.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const savedState = cookies().get("tt_state")?.value;

  if (!code || !state || !savedState || state !== savedState) {
    return new Response("Invalid OAuth state", { status: 400 });
  }

  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const clientSecret = process.env.TIKTOK_CLIENT_SECRET!;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI!;

  const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      client_key: clientKey,
      client_secret: clientSecret,
      code,
      grant_type: "authorization_code",
      redirect_uri: redirectUri,
    }),
    cache: "no-store",
  });

  if (!tokenRes.ok) {
    const errText = await tokenRes.text();
    return new Response(`Token exchange failed: ${errText}`, { status: 400 });
  }
  const tokenJson = (await tokenRes.json()) as TokenResp;
  const accessToken = tokenJson.access_token;

  const fields = ["open_id", "display_name", "avatar_url", "username"].join(",");
  const userRes = await fetch(
    `https://open.tiktokapis.com/v2/user/info/?fields=${encodeURIComponent(fields)}`,
    {
      headers: { Authorization: `Bearer ${accessToken}` },
      cache: "no-store",
    }
  );

  if (!userRes.ok) {
    const errText = await userRes.text();
    return new Response(`User info failed: ${errText}`, { status: 400 });
  }

  const userJson = (await userRes.json()) as UserInfoResp;
  const user = userJson?.data?.user;
  if (!user?.open_id) {
    return new Response("Missing user id from TikTok", { status: 400 });
  }

  const publicUser = {
    open_id: user.open_id,
    name: user.display_name || user.username || "TikTok User",
  };

  // Readable by the client (demo)
  cookies().set("tk_user", encodeURIComponent(JSON.stringify(publicUser)), {
    httpOnly: false,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });

  // HttpOnly access token for server (demo)
  cookies().set("tk_token", accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: tokenJson.expires_in ?? 3600,
  });

  cookies().delete("tt_state");

  const site = process.env.SITE_URL || "http://localhost:3000";
  return Response.redirect(`${site}/login?ok=1`, 302);
}
