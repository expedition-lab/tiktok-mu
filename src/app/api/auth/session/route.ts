import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Use Node so Buffer is available (simplest + reliable)
export const runtime = "nodejs";
// Avoid caching responses for session state
export const dynamic = "force-dynamic";

export function GET() {
  const raw = cookies().get("session")?.value;

  if (!raw) {
    return NextResponse.json({ user: null });
  }

  try {
    // Cookie is base64-encoded JSON
    const jsonStr = Buffer.from(raw, "base64").toString("utf8");
    const user = JSON.parse(jsonStr);
    return NextResponse.json({ user });
  } catch {
    // Bad/expired cookie -> treat as signed out
    return NextResponse.json({ user: null }, { status: 400 });
  }
}
