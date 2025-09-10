import { cookies } from "next/headers";

export async function GET() {
  cookies().delete("tk_user");
  cookies().delete("tk_token");
  const site = process.env.SITE_URL || "http://localhost:3000";
  return Response.redirect(site, 302);
}
