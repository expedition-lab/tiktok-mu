import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET() {
  // In Next 15, cookies() is read-only and should be awaited
  const c = await cookies();
  const raw = c.get("session")?.value;

  if (!raw) {
    return NextResponse.json({ user: null });
  }

  try {
    const decoded = JSON.parse(Buffer.from(raw, "base64").toString("utf8"));
    return NextResponse.json({ user: decoded });
  } catch {
    // Bad/expired cookie -> treat as signed out
    return NextResponse.json({ user: null }, { status: 400 });
  }
}
