import { NextResponse } from "next/server";

function b64urlFromArrayBuffer(buf: ArrayBuffer) {
  return Buffer.from(new Uint8Array(buf))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}
function randomString(len = 48) {
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const arr = new Uint8Array(len);
  crypto.getRandomValues(arr);
  return Array.from(arr, (n) => alphabet[n % alphabet.length]).join("");
}

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI!;
  if (!clientKey || !redirectUri) {
    return new NextResponse("TikTok env missing", { status: 500 });
  }

  const codeVerifier = randomString(64);
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(codeVerifier));
  const codeChallenge = b64urlFromArrayBuffer(digest);
  const state = randomString(20);
  const scope = "user.info.basic";

  const params = new URLSearchParams({
    client_key: clientKey,
    scope,
    response_type: "code",
    redirect_uri: redirectUri,
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });

  const authUrl = `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`;
  const res = NextResponse.redirect(authUrl, 302);
  res.cookies.set("t_state", state, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });
  res.cookies.set("t_verifier", codeVerifier, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 600 });
  return res;
}
