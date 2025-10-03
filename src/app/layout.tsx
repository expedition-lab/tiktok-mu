// src/app/layout.tsx
import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const site = process.env.NEXT_PUBLIC_SITE_URL || "https://tokmarket.live";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: { default: "TikTok Live Marketplace — Mauritius", template: "%s · TikTok Live MU" },
  description: "Search, book, and pay creators for TikTok Lives and collabs (demo).",
  alternates: { canonical: site },
  openGraph: {
    title: "TikTok Live Marketplace — Mauritius",
    description: "Book TikTok creators and LIVE shoutouts in minutes.",
    url: site,
    siteName: "TikTok Live MU",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_MU",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TikTok Live Marketplace — Mauritius",
    description: "Book TikTok creators and LIVE shoutouts in minutes.",
    images: ["/og.png"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
        {/* NEW: Global Header with Marketplace link */}
        <header className="sticky top-0 z-40 bg-slate-900/90 text-white backdrop-blur border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image src="/logo.png" alt="TokMarket.Live logo" width={32} height={32} />
              <span>TokMarket.Live</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#how" className="text-white/80 hover:text-cyan-400">How it works</Link>
              <Link href="/#creators" className="text-white/80 hover:text-cyan-400">Creators</Link>
              {/* This is the one you need */}
              <Link href="/marketplace" className="text-white hover:text-cyan-400 font-semibold">Marketplace</Link>
              <Link href="/#pricing" className="text-white/80 hover:text-cyan-400">Pricing</Link>
              <Link href="/#faq" className="text-white/80 hover:text-cyan-400">FAQ</Link>
            </nav>
          </div>
        </header>

        {children}

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
