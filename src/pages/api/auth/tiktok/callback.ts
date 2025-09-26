import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code, state } = req.query;
  if (!code || !state || typeof code !== "string" || typeof state !== "string")
    return res.writeHead(302, { Location: "/login?error=state" }).end();

  const stateCookie = req.cookies?.tk_state;
  if (!stateCookie || stateCookie !== state)
    return res.writeHead(302, { Location: "/login?error=state" }).end();

  const client_key = process.env.TIKTOK_CLIENT_KEY!;
  const client_secret = process.env.TIKTOK_CLIENT_SECRET!;
  const redirect_uri = process.env.TIKTOK_REDIRECT_URI!;

  const tokenRes = await fetch("https://open.tiktokapis.com/v2/oauth/token/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ client_key, client_secret, code, grant_type: "authorization_code", redirect_uri }),
  });
  if (!tokenRes.ok) return res.writeHead(302, { Location: "/login?error=token" }).end();
  const token = await tokenRes.json();
  const access = token?.data?.access_token || token?.access_token;
  if (!access) return res.writeHead(302, { Location: "/login?error=no_token" }).end();

  const infoRes = await fetch("https://open.tiktokapis.com/v2/user/info/", {
    headers: { Authorization: `Bearer ${access}` },
  });
  if (!infoRes.ok) return res.writeHead(302, { Location: "/login?error=user" }).end();
  const info = await infoRes.json();

  const open_id = info?.data?.user?.open_id ?? info?.data?.open_id ?? "unknown";
  const name = info?.data?.user?.display_name ?? info?.data?.display_name ?? "User";

  res.setHeader("Set-Cookie", [
    `tk_user=${encodeURIComponent(JSON.stringify({ open_id, name }))}; Path=/; Max-Age=${60*60*24*30}; Secure; SameSite=Lax`,
    "tk_state=; Path=/; Max-Age=0; Secure; SameSite=Lax",
  ]);
  res.writeHead(302, { Location: "/dashboard" });
  res.end();
}
