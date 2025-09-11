<<<<<<< HEAD
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const res = NextResponse.redirect(new URL("/", req.url));
  res.cookies.set("session", "", { path: "/", maxAge: 0 });
  return res;
=======
import { cookies } from "next/headers";

export async function GET() {
  cookies().delete("tk_user");
  cookies().delete("tk_token");
  const site = process.env.SITE_URL || "http://localhost:3000";
  return Response.redirect(site, 302);
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
}
