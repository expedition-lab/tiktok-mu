import { useEffect, useState } from "react";
type TikTokUser = { open_id: string; name: string };

export default function LoginPage() {
  const [user, setUser] = useState<TikTokUser | null>(null);
  useEffect(() => {
    const raw = document.cookie.split("; ").find((r) => r.startsWith("tk_user="));
    if (raw) { try { setUser(JSON.parse(decodeURIComponent(raw.split("=")[1]))); } catch {} }
  }, []);
  return (
    <main className="min-h-screen bg-[#0e0f12] text-white flex items-center justify-center p-6">
      <div className="max-w-md w-full rounded-xl border border-white/10 bg-white/5 p-6">
        <h1 className="text-xl font-bold mb-2">Account</h1>
        {user ? (
          <>
            <p className="mb-4 text-white/80">Signed in as <b>{user.name}</b></p>
            <a href="/api/auth/logout" className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">Logout</a>
          </>
        ) : (
          <>
            <p className="mb-4 text-white/80">Sign in to link your TikTok account.</p>
            <a href="/api/auth/tiktok/start" className="inline-flex items-center rounded-md bg-white px-4 py-2 text-sm font-medium text-black hover:bg-white/90">Login with TikTok</a>
          </>
        )}
        <div className="mt-6 text-sm text-white/60">Tip: after signing in, go back to the homepage.</div>
      </div>
    </main>
  );
}
