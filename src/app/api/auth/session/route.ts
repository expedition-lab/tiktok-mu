import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  const raw = cookies().get("session")?.value;
  if (!raw) return NextResponse.json({ user: null });
  try {
    const decoded = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    return NextResponse.json({ user: decoded.user || null });
  } catch {
    return NextResponse.json({ user: null });
  }
}
