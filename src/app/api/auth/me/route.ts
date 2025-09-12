import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const c = await cookies(); // read-only
  return NextResponse.json({
    open_id: c.get("tk_user")?.value || null,
    token_present: Boolean(c.get("tk_token")?.value),
  });
}
