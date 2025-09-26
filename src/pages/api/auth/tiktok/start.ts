import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const clientKey = process.env.TIKTOK_CLIENT_KEY;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI;
  if (!clientKey || !redirectUri) return res.status(500).send("Missing TikTok env vars");

  const state = crypto.randomUUID().replace(/-/g, "");
  const params = new URLSearchParams({
    client_key: clientKey,
    response_type: "code",
    scope: "user.info.basic",
    redirect_uri: redirectUri,
    state,
  });

  res.setHeader("Set-Cookie", `tk_state=${state}; Max-Age=600; Path=/; HttpOnly; Secure; SameSite=Lax`);
  res.writeHead(302, { Location: `https://www.tiktok.com/v2/auth/authorize/?${params.toString()}` });
  res.end();
}
