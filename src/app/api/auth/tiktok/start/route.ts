import { NextResponse } from "next/server";

function b64url(buf: ArrayBuffer) {
  return Buffer.from(new Uint8Array(buf))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI!;
  if (!clientKey || !redirectUri) {
    return new NextResponse("TikTok env missing", { status: 500 });
  }

  // PKCE verifier + challenge
  const verifierBytes = crypto.getRandomValues(new Uint8Array(32));
  const codeVerifier = b64url(verifierBytes.buffer);
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );
  const codeChallenge = b64url(digest);

  const state = Math.random().toString(36).slice(2);
  const params = new URLSearchParams({
    client_key: clientKey,
    redirect_uri: redirectUri,
    response_type: "code",
    scope: "user.info.basic",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const res = NextResponse.redirect(
    `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`,
    302
  );
  // temp cookies for PKCE/state
  res.cookies.set("t_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  res.cookies.set("t_verifier", codeVerifier, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 600,
  });
  return res;
}
