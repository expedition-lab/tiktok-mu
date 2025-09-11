import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const jar = await cookies();
  const tk = jar.get("tk_token")?.value || null;
  const uid = jar.get("tk_user")?.value || null;
  return NextResponse.json({ loggedIn: Boolean(tk), openId: uid });
}
