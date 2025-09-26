import type { NextApiRequest, NextApiResponse } from "next";
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.setHeader("Set-Cookie", "tk_user=; Path=/; Max-Age=0; Secure; SameSite=Lax");
  res.writeHead(302, { Location: "/login" });
  res.end();
}
