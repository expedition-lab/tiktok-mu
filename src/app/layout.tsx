import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TikTok Live Marketplace — Mauritius (Demo)",
  description: "Search & book creators. Demo build.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
