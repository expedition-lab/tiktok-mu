// src/app/page.tsx
import type { Metadata } from "next";

import HeaderNav from "../components/HeaderNav";
import Footer from "../components/Footer";
import HowItWorks from "../components/HowItWorks";
import TrustRow from "../components/TrustRow";
import FeaturedCreators from "../components/FeaturedCreators";
import Categories from "../components/Categories";
import Pricing from "../components/Pricing";
import FAQ from "../components/FAQ";

const site = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://tokmarket.live") as string;

export const metadata: Metadata = {
  metadataBase: new URL(site),
  title: "Book TikTok Live shoutouts in minutes — TokMarket.Live",
  description:
    "Find Mauritian creators, set your budget, pay safely (JUICE / PayPal), and go LIVE the same day.",
  alternates: { canonical: site },
  openGraph: {
    title: "TokMarket.Live — TikTok Live Marketplace",
    description: "Search, book, and pay creators for TikTok Lives and collabs.",
    url: site,
    siteName: "TokMarket.Live",
    images: [{ url: "/og.png", width: 1200, height: 630 }],
    locale: "en_MU",
    type: "website",
  },
  twitter: { card: "summary_large_image", title: "TokMarket.Live" },
};

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderNav />

      <section className="relative isolate overflow-hidden">
        <div className="max-w-6xl mx-auto px-6 py-20 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-white">
            Book TikTok Live shoutouts in minutes.
          </h1>
          <p className="mt-4 text-slate-300 max-w-2xl mx-auto">
            Find Mauritian creators, set your budget, pay safely, and go LIVE the same day.
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a
              href="/creators"
              className="px-5 py-3 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-medium"
            >
              Browse creators
            </a>
            <a
              href="/marketplace"
              className="px-5 py-3 rounded-xl bg-white/10 text-white ring-1 ring-white/15"
            >
              Become a seller
            </a>
          </div>
          <div className="mt-6">
            <TrustRow />
          </div>
        </div>
      </section>

      <HowItWorks />
      <FeaturedCreators />
      <Categories />
      <Pricing />
      <FAQ />

      <Footer />
    </div>
  );
}
