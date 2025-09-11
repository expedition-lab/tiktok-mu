<<<<<<< HEAD
import { NextResponse } from "next/server";

function b64url(buf: ArrayBuffer) {
  return Buffer.from(new Uint8Array(buf))
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}
=======
import { cookies } from "next/headers";
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI!;
<<<<<<< HEAD
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
=======
  const scope = "user.info.basic";
  const state = Math.random().toString(36).slice(2);

  cookies().set("tt_state", state, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    maxAge: 10 * 60,
  });

  const params = new URLSearchParams({
    client_key: clientKey,
    scope,
    response_type: "code",
    redirect_uri: redirectUri,
    state,
  });

  return Response.redirect(
    `https://www.tiktok.com/v2/auth/authorize?${params.toString()}`,
    302
  );
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
}
