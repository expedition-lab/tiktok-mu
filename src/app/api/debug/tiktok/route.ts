// app/api/debug/tiktok/route.ts
export async function GET() {
  return new Response(JSON.stringify({
    clientKeyStartsWith: process.env.TIKTOK_CLIENT_KEY?.slice(0,6),
    redirect: process.env.TIKTOK_REDIRECT_URI,
    site: process.env.NEXT_PUBLIC_SITE_URL,
  }), { headers: { "content-type": "application/json" } });
}
// app/api/debug/tiktok/route.ts
export async function GET() {
  return new Response(
    JSON.stringify({
      clientKeyStartsWith: process.env.TIKTOK_CLIENT_KEY?.slice(0, 6) ?? null,
      redirect: process.env.TIKTOK_REDIRECT_URI ?? null,
      site: process.env.NEXT_PUBLIC_SITE_URL ?? null,
      env: process.env.VERCEL_ENV, // should be "production" on the live site
    }),
    { headers: { "content-type": "application/json" } }
  );
}
