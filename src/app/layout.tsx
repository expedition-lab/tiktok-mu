import "./globals.css";
import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

export const metadata: Metadata = {
  title: "TikTok Live Marketplace — Mauritius (Demo)",
  description: "Search & book creators. Demo build.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <Analytics />       {/* page views */}
        <SpeedInsights />   {/* performance metrics */}
      </body>
    </html>
  );
}
