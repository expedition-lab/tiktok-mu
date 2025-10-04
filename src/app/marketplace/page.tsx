"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import {
  Search,
  Play,
  Users,
  Star,
  Calendar,
  Wallet,
  ArrowLeft,
  Gift,
  MessageCircle,
  ChevronRight,
  Video,
  Sparkles,
  ShoppingCart,
  CreditCard,
  Upload,
  ExternalLink,
  AlertTriangle,
} from "lucide-react";

/** Types */
type Pkg = { id: string; title: string; price: number };
type Creator = {
  id: string;
  handle: string;
  name: string;
  followers: number;
  engagement: number;
  niche: string[];
  city: string;
  thumb: string;
  sampleVideo: string;
  packages: Pkg[];
};
type RouteState = { name: "home" | "creator" | "live" | "dashboard"; id: string };
type BookingRow = {
  id: string;
  creator: string;
  title: string;
  date: string;
  total: number;
  status: "Confirmed" | "Pending";
};
type BookingState = { creator: Creator; pkg: Pkg };
type ChatMsg = { id: number; user: string; text: string };

/** Data */
const CREATORS: Creator[] = [
  {
    id: "c1",
    handle: "@aisha.mu",
    name: "Aisha",
    followers: 128000,
    engagement: 7.1,
    niche: ["Fashion", "Beauty"],
    city: "Port Louis",
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
    sampleVideo: "https://www.youtube.com/embed/ysz5S6PUM-U?si=demo1",
    packages: [
      { id: "p1", title: "15-min LIVE shoutout", price: 4500 },
      { id: "p2", title: "Product review (LIVE)", price: 6500 },
      { id: "p3", title: "1x TikTok video + LIVE mention", price: 8000 },
    ],
  },
  {
    id: "c2",
    handle: "@kevin.mu",
    name: "Kevin",
    followers: 94000,
    engagement: 5.8,
    niche: ["Food", "Lifestyle"],
    city: "Curepipe",
    thumb: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop",
    sampleVideo: "https://www.youtube.com/embed/aqz-KE-bpKQ?si=2",
    packages: [
      { id: "p1", title: "Restaurant LIVE promo (20 min)", price: 5200 },
      { id: "p2", title: "Menu tasting + LIVE", price: 7800 },
    ],
  },
  {
    id: "c3",
    handle: "@sam_beach",
    name: "Sam",
    followers: 156000,
    engagement: 6.2,
    niche: ["Travel", "Adventure"],
    city: "Flic-en-Flac",
    thumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
    sampleVideo: "https://www.youtube.com/embed/ScMzIvxBSi4?si=demo3",
    packages: [
      { id: "p1", title: "Resort LIVE tour (15 min)", price: 6000 },
      { id: "p2", title: "Activity LIVE + Story pack", price: 8500 },
    ],
  },
];

/** Utils */
const COIN_TO_MUR = 0.55;
const COMMISSION_RATE = 0.15;
const computeTotal = (base: number) => Math.round(base * (1 + COMMISSION_RATE));
const GIFTS = [
  { id: "rose", name: "Rose", coins: 1 },
  { id: "perfume", name: "Perfume", coins: 20 },
  { id: "lion", name: "Lion", coins: 2999 },
  { id: "castle", name: "Castle", coins: 20000 },
];
const cx = (...c: Array<string | false | null | undefined>) => c.filter(Boolean).join(" ");
const formatCurrency = (n: number) => new Intl.NumberFormat("en-MU", { style: "currency", currency: "MUR" }).format(n);
const formatFollowers = (n: number) => (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n));

function filterCreators(q: string, niche: string, minFollowers: number): Creator[] {
  const query = q.trim().toLowerCase();
  return CREATORS.filter(
    (c) =>
      (niche === "all" || c.niche.includes(niche)) &&
      c.followers >= minFollowers &&
      (c.name.toLowerCase().includes(query) || c.handle.toLowerCase().includes(query))
  );
}

function luhnCheck(card: string): boolean {
  const s = card.split("").filter((ch) => "0123456789 ".includes(ch)).join("");
  const digitsOnly = s.split(" ").join("");
  if (digitsOnly.length < 12) return false;
  let sum = 0;
  let dbl = false;
  for (let i = digitsOnly.length - 1; i >= 0; i--) {
    let d = Number(digitsOnly[i]);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

/** PAGE COMPONENT — name changed to MarketplacePage */
export default function MarketplacePage() {
  const [route, setRoute] = useState<RouteState>({ name: "home", id: "" });
  const [q, setQ] = useState("");
  const [niche, setNiche] = useState("all");
  const [minFollowers, setMinFollowers] = useState(0);
  const [booking, setBooking] = useState<null | BookingState>(null);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [paymentFlow, setPaymentFlow] = useState<"idle" | "card" | "juice" | "myt">("idle");
  const [proofFileName, setProofFileName] = useState<string>("");
  const [externalLink, setExternalLink] = useState<string>("");
  const [recent, setRecent] = useState<BookingRow[]>([]);

  const results = useMemo(() => filterCreators(q, niche, minFollowers), [q, niche, minFollowers]);

  useEffect(() => {
    if (paymentFlow === "myt" && booking) {
      const id = `${booking.creator.id}-${booking.pkg.id}-${Date.now()}`;
      setExternalLink(`https://pay.myt.mu/${id}`);
    }
  }, [paymentFlow, booking]);

  const finalizeBooking = (status: "Confirmed" | "Pending") => {
    if (!booking) return;
    const payload: BookingRow = {
      id: `b${Date.now()}`,
      creator: booking.creator.handle,
      title: booking.pkg.title,
      date: new Date().toISOString().slice(0, 16).replace("T", " "),
      total: computeTotal(booking.pkg.price),
      status,
    };
    setRecent((r) => [payload, ...r]);
    setCheckoutOpen(false);
    setPaymentFlow("idle");
    setProofFileName("");
    alert(`Booking ${status.toLowerCase()}!`);
  };

  const currentCreator: Creator | null =
    route.name !== "home" ? CREATORS.find((c) => c.id === route.id) ?? null : null;

  return (
    <div className="min-h-screen w-full bg-[#0e0f12] text-white">

        canGoBack={route.name !== "home"}
        onBack={() => setRoute({ name: "home", id: "" })}
      />

      {route.name === "home" && (
        <HomeView
          results={results}
          q={q}
          setQ={setQ}
          niche={niche}
          setNiche={setNiche}
          minFollowers={minFollowers}
          setMinFollowers={setMinFollowers}
          openCreator={(id) => setRoute({ name: "creator", id })}
        />
      )}

      {route.name === "creator" && currentCreator && (
        <CreatorPage
          creator={currentCreator}
          onBack={() => setRoute({ name: "home", id: "" })}
          onBook={(pkg) => {
            setBooking({ creator: currentCreator, pkg });
            setCheckoutOpen(true);
            setPaymentFlow("idle");
          }}
          onWatchLive={() => setRoute({ name: "live", id: currentCreator.id })}
        />
      )}

      {route.name === "live" && currentCreator && (
        <LivePage
          creator={currentCreator}
          onBack={() => setRoute({ name: "creator", id: currentCreator.id })}
        />
      )}

      {route.name === "dashboard" && (
        <Dashboard onBack={() => setRoute({ name: "home", id: "" })} extra={recent} />
      )}

      <div className="fixed bottom-5 right-5 flex flex-col gap-3">
        <button
          onClick={() => setRoute({ name: "dashboard", id: "" })}
          className="inline-flex items-center rounded-md bg-[#25F4EE] px-3 py-2 text-sm font-medium text-black shadow-lg hover:bg-[#25F4EE]/90"
        >
          <Sparkles className="mr-2 h-4 w-4" /> Brand Dashboard 
        </button>
      </div>

      {checkoutOpen && booking && (
        <CheckoutModal
          booking={booking}
          paymentFlow={paymentFlow}
          setPaymentFlow={setPaymentFlow}
          proofFileName={proofFileName}
          setProofFileName={setProofFileName}
          externalLink={externalLink}
          onClose={() => setCheckoutOpen(false)}
          onConfirm={() => finalizeBooking("Confirmed")}
          onPending={() => finalizeBooking("Pending")}
        />
      )}
    </div>
  );
}

/** … keep ALL your subcomponents exactly as you sent (TopBar, HomeView, Hero, Badge, CreatorPage, LivePage, CheckoutModal, Dashboard) … */
// (PASTE the rest of your original component code here, unchanged)
