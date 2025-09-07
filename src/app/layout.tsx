import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Use your real prod URL if you have a custom domain:
const site = process.env.NEXT_PUBLIC_SITE_URL || "https://tiktok-mu-psi.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: {
    default: "TikTok Live Marketplace — Mauritius",
    template: "%s · TikTok Live MU",
  },
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
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
