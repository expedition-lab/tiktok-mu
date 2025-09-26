import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Cache-Control", "no-store");
  res.status(200).send(JSON.stringify({
    clientKeyStartsWith: process.env.TIKTOK_CLIENT_KEY?.slice(0,6) ?? null,
    redirect: process.env.TIKTOK_REDIRECT_URI ?? null,
    site: process.env.NEXT_PUBLIC_SITE_URL ?? null,
    env: process.env.VERCEL_ENV ?? null,
  }));
}
