import { cookies } from "next/headers";

/**
 * Logs the user out by clearing auth cookies, then redirects to SITE_URL.
 * In Next 15, `cookies()` is async (type: Promise<ReadonlyRequestCookies>),
 * so we `await` it before calling `.delete(...)`.
 */
export async function GET() {
  const store = await cookies();
  store.delete("tk_user");
  store.delete("tk_token");

  const site = process.env.SITE_URL || "http://localhost:3000";
  return Response.redirect(site, 302);
}
