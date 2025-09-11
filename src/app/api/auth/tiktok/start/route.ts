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

  // PKCE
  const codeVerifier = b64url(crypto.getRandomValues(new Uint8Array(32)));
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(codeVerifier)
  );
  const codeChallenge = b64url(digest);

  const state = crypto.randomUUID();

  const auth = new URL("https://www.tiktok.com/v2/auth/authorize/");
  auth.searchParams.set("client_key", clientKey);
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("scope", "user.info.basic");
  auth.searchParams.set("redirect_uri", redirectUri);
  auth.searchParams.set("state", state);
  auth.searchParams.set("code_challenge", codeChallenge);
  auth.searchParams.set("code_challenge_method", "S256");

  const res = NextResponse.redirect(auth.toString());
  res.cookies.set("t_state", state, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });
  res.cookies.set("t_verifier", codeVerifier, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });
  return res;
}
