import { cookies } from "next/headers";

export async function GET() {
  const clientKey = process.env.TIKTOK_CLIENT_KEY!;
  const redirectUri = process.env.TIKTOK_REDIRECT_URI!;
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
}
