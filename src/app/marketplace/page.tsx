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

/** TopBar Component */
function TopBar({ canGoBack, onBack }: { canGoBack: boolean; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-[#0e0f12]/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-4">
          {canGoBack && (
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-sm text-slate-300 hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </button>
          )}
          <h1 className="text-xl font-bold">
            TikTok Live Marketplace{" "}
            <span className="rounded bg-gradient-to-r from-pink-500 to-cyan-500 px-2 py-1 text-xs">
              MAURITIUS
            </span>
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button className="text-sm text-slate-300 hover:text-white">Logout</button>
          <button className="flex items-center gap-2 rounded-full border border-white/20 px-4 py-2 text-sm">
            <MessageCircle className="h-4 w-4" />
            Support
          </button>
        </div>
      </div>
    </div>
  );
}

/** HomeView Component */
function HomeView({
  results,
  q,
  setQ,
  niche,
  setNiche,
  minFollowers,
  setMinFollowers,
  openCreator,
}: {
  results: Creator[];
  q: string;
  setQ: (v: string) => void;
  niche: string;
  setNiche: (v: string) => void;
  minFollowers: number;
  setMinFollowers: (v: number) => void;
  openCreator: (id: string) => void;
}) {
  return (
    <div className="mx-auto max-w-7xl px-6 py-8">
      <Hero />
      <div className="mt-8 flex flex-col gap-4 md:flex-row md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search creators (handle, name)"
            className="w-full rounded-xl border border-white/10 bg-white/5 py-3 pl-11 pr-4 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
            value={q}
            onChange={(e) => setQ(e.target.value)}
          />
        </div>
        <select
          value={niche}
          onChange={(e) => setNiche(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white focus:border-cyan-500 focus:outline-none"
        >
          <option value="all">All niches</option>
          <option value="Fashion">Fashion</option>
          <option value="Beauty">Beauty</option>
          <option value="Food">Food</option>
          <option value="Lifestyle">Lifestyle</option>
          <option value="Travel">Travel</option>
          <option value="Adventure">Adventure</option>
        </select>
        <div className="flex items-center gap-2">
          <span className="text-sm text-slate-300">Min followers</span>
          <input
            type="number"
            min="0"
            step="1000"
            value={minFollowers}
            onChange={(e) => setMinFollowers(Number(e.target.value))}
            className="w-24 rounded-xl border border-white/10 bg-white/5 px-3 py-3 text-white focus:border-cyan-500 focus:outline-none"
          />
        </div>
      </div>
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <CreatorCard key={c.id} creator={c} onClick={() => openCreator(c.id)} />
        ))}
      </div>
      {results.length === 0 && (
        <div className="mt-12 text-center text-slate-400">
          No creators found. Try adjusting your filters.
        </div>
      )}
    </div>
  );
}

/** Hero Component */
function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-pink-500/20 via-purple-500/20 to-cyan-500/20 p-8">
      <div className="relative z-10">
        <h2 className="text-3xl font-bold">Hire TikTok creators in Mauritius. Book LIVE promos in minutes.</h2>
        <p className="mt-3 text-slate-300">
          Search, book, and pay creators for TikTok Lives, shoutouts, and collabs. Built for businesses, loved by creators.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Badge icon={<Calendar className="h-4 w-4" />} label="15–20% commission" />
          <Badge icon={<Wallet className="h-4 w-4" />} label="Juice • MyT • Card" />
          <Badge icon={<Gift className="h-4 w-4" />} label="Gift → MUR tracker" />
        </div>
      </div>
    </div>
  );
}

/** Badge Component */
function Badge({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-4 py-2 text-sm">
      {icon}
      <span>{label}</span>
    </div>
  );
}

/** CreatorCard Component */
function CreatorCard({ creator, onClick }: { creator: Creator; onClick: () => void }) {
  return (
    <div
      onClick={onClick}
      className="group relative cursor-pointer overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-all hover:border-cyan-500/50 hover:bg-white/10"
    >
      <div className="absolute right-2 top-2 z-10 rounded-full bg-gradient-to-r from-pink-500 to-cyan-500 px-3 py-1 text-xs font-medium">
        LIVE-Friendly
      </div>
      <div className="relative h-64 w-full overflow-hidden">
        <Image
          src={creator.thumb}
          alt={creator.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            {creator.niche.map((n) => (
              <span key={n}>{n}</span>
            ))}
          </div>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-bold">{creator.name}</h3>
            <p className="text-sm text-slate-400">{creator.handle}</p>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <Users className="h-4 w-4 text-cyan-400" />
            <span className="font-medium">{formatFollowers(creator.followers)}</span>
          </div>
        </div>
        <div className="mt-3 flex items-center justify-between text-sm">
          <div className="text-slate-300">
            Engagement {creator.engagement}% • {creator.city}
          </div>
        </div>
        <div className="mt-4 space-y-2">
          {creator.packages.slice(0, 2).map((pkg) => (
            <div key={pkg.id} className="text-sm text-slate-400">
              {pkg.title}
            </div>
          ))}
        </div>
        <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 py-2.5 text-sm font-medium transition-opacity hover:opacity-90">
          <Play className="h-4 w-4" />
          Open Profile
        </button>
        <button className="mt-2 w-full rounded-xl border border-white/20 py-2.5 text-sm font-medium transition-colors hover:bg-white/5">
          Details
          <ChevronRight className="ml-1 inline h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

/** CreatorPage Component */
function CreatorPage({
  creator,
  onBack,
  onBook,
  onWatchLive,
}: {
  creator: Creator;
  onBack: () => void;
  onBook: (pkg: Pkg) => void;
  onWatchLive: () => void;
}) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </button>
      <div className="grid gap-8 lg:grid-cols-2">
        <div>
          <div className="relative aspect-square overflow-hidden rounded-2xl">
            <Image src={creator.thumb} alt={creator.name} fill className="object-cover" />
          </div>
          <button
            onClick={onWatchLive}
            className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 py-3 font-medium transition-opacity hover:opacity-90"
          >
            <Video className="h-5 w-5" />
            Watch LIVE now
          </button>
        </div>
        <div>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold">{creator.name}</h1>
              <p className="mt-1 text-slate-400">{creator.handle}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {creator.niche.map((n) => (
                  <span key={n} className="rounded-full bg-white/10 px-3 py-1 text-xs">
                    {n}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div>
              <div className="text-2xl font-bold">{formatFollowers(creator.followers)}</div>
              <div className="text-sm text-slate-400">Followers</div>
            </div>
            <div>
              <div className="text-2xl font-bold">{creator.engagement}%</div>
              <div className="text-sm text-slate-400">Engagement</div>
            </div>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-bold">Available packages</h2>
            <div className="mt-4 space-y-3">
              {creator.packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4"
                >
                  <div>
                    <div className="font-medium">{pkg.title}</div>
                    <div className="mt-1 text-sm text-slate-400">{formatCurrency(pkg.price)}</div>
                  </div>
                  <button
                    onClick={() => onBook(pkg)}
                    className="rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90"
                  >
                    Book now
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6 rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-medium">Sample video</h3>
            <div className="mt-3 aspect-video overflow-hidden rounded-lg">
              <iframe
                src={creator.sampleVideo}
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** LivePage Component */
function LivePage({ creator, onBack }: { creator: Creator; onBack: () => void }) {
  const [msgs, setMsgs] = useState<ChatMsg[]>([
    { id: 1, user: "Sarah_M", text: "Love this!" },
    { id: 2, user: "Brand_X", text: "Can we book you?" },
  ]);
  const [giftSent, setGiftSent] = useState<string | null>(null);

  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to profile
      </button>
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-video overflow-hidden rounded-2xl border border-white/10 bg-black">
            <iframe
              src={creator.sampleVideo}
              className="h-full w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
          <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={creator.thumb} alt={creator.name} fill className="object-cover" />
              </div>
              <div>
                <div className="font-medium">{creator.name}</div>
                <div className="text-sm text-slate-400">{creator.handle} • LIVE now</div>
              </div>
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-medium">Live chat</h3>
            <div className="mt-3 space-y-2">
              {msgs.map((m) => (
                <div key={m.id} className="text-sm">
                  <span className="font-medium text-cyan-400">{m.user}</span>
                  <span className="ml-2 text-slate-300">{m.text}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <h3 className="font-medium">Send a gift</h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {GIFTS.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGiftSent(g.name)}
                  className="rounded-lg border border-white/10 bg-white/5 p-3 text-sm transition-colors hover:bg-white/10"
                >
                  <Gift className="mx-auto h-6 w-6 text-pink-400" />
                  <div className="mt-1 font-medium">{g.name}</div>
                  <div className="text-xs text-slate-400">{g.coins} coins</div>
                </button>
              ))}
            </div>
            {giftSent && (
              <div className="mt-3 rounded-lg bg-cyan-500/20 p-2 text-center text-sm text-cyan-300">
                Sent {giftSent}! ≈ {formatCurrency(GIFTS.find((g) => g.name === giftSent)!.coins * COIN_TO_MUR)}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** CheckoutModal Component */
function CheckoutModal({
  booking,
  paymentFlow,
  setPaymentFlow,
  proofFileName,
  setProofFileName,
  externalLink,
  onClose,
  onConfirm,
  onPending,
}: {
  booking: BookingState;
  paymentFlow: "idle" | "card" | "juice" | "myt";
  setPaymentFlow: (v: "idle" | "card" | "juice" | "myt") => void;
  proofFileName: string;
  setProofFileName: (v: string) => void;
  externalLink: string;
  onClose: () => void;
  onConfirm: () => void;
  onPending: () => void;
}) {
  const [cardNum, setCardNum] = useState("");
  const [cardValid, setCardValid] = useState(false);

  useEffect(() => {
    setCardValid(luhnCheck(cardNum));
  }, [cardNum]);

  const total = computeTotal(booking.pkg.price);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4">
      <div className="w-full max-w-lg rounded-2xl border border-white/10 bg-[#0e0f12] p-6">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl font-bold">Checkout</h2>
            <p className="mt-1 text-sm text-slate-400">Complete your booking</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white">
            ✕
          </button>
        </div>
        <div className="mt-6 space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full">
                <Image src={booking.creator.thumb} alt={booking.creator.name} fill className="object-cover" />
              </div>
              <div>
                <div className="font-medium">{booking.creator.name}</div>
                <div className="text-sm text-slate-400">{booking.pkg.title}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-4">
              <div className="text-sm text-slate-400">Total (incl. 15% commission)</div>
              <div className="text-xl font-bold">{formatCurrency(total)}</div>
            </div>
          </div>
          {paymentFlow === "idle" && (
            <div className="space-y-3">
              <button
                onClick={() => setPaymentFlow("card")}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="h-5 w-5" />
                  <span>Credit/Debit Card</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPaymentFlow("juice")}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <Wallet className="h-5 w-5" />
                  <span>JUICE Mobile Money</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
              <button
                onClick={() => setPaymentFlow("myt")}
                className="flex w-full items-center justify-between rounded-xl border border-white/10 bg-white/5 p-4 transition-colors hover:bg-white/10"
              >
                <div className="flex items-center gap-3">
                  <ExternalLink className="h-5 w-5" />
                  <span>MyT Money</span>
                </div>
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
          {paymentFlow === "card" && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Card Number</label>
                <input
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  className="mt-2 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder:text-slate-400 focus:border-cyan-500 focus:outline-none"
                  value={cardNum}
                  onChange={(e) => setCardNum(e.target.value)}
                />
                {cardNum && (
                  <div className="mt-2 text-sm">
                    {cardValid ? (
                      <span className="text-green-400">✓ Valid card</span>
                    ) : (
                      <span className="text-red-400">✗ Invalid card</span>
                    )}
                  </div>
                )}
              </div>
              <button
                onClick={onConfirm}
                disabled={!cardValid}
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 py-3 font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Pay {formatCurrency(total)}
              </button>
            </div>
          )}
          {paymentFlow === "juice" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-500/50 bg-cyan-500/10 p-4">
                <div className="flex items-start gap-3">
                  <AlertTriangle className="h-5 w-5 text-cyan-400" />
                  <div className="text-sm text-cyan-100">
                    <p className="font-medium">Transfer {formatCurrency(total)} via JUICE</p>
                    <p className="mt-1 text-cyan-200">Then upload proof of payment below.</p>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium">Upload proof</label>
                <div className="mt-2 flex items-center gap-3">
                  <label className="flex cursor-pointer items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 transition-colors hover:bg-white/10">
                    <Upload className="h-5 w-5" />
                    <span className="text-sm">Choose file</span>
                    <input
                      type="file"
                      className="hidden"
                      onChange={(e) => setProofFileName(e.target.files?.[0]?.name ?? "")}
                    />
                  </label>
                  {proofFileName && <span className="text-sm text-slate-400">{proofFileName}</span>}
                </div>
              </div>
              <button
                onClick={onPending}
                disabled={!proofFileName}
                className="w-full rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 py-3 font-medium transition-opacity hover:opacity-90 disabled:opacity-50"
              >
                Submit for review
              </button>
            </div>
          )}
          {paymentFlow === "myt" && (
            <div className="space-y-4">
              <div className="rounded-xl border border-cyan-500/50 bg-cyan-500/10 p-4">
                <div className="flex items-start gap-3">
                  <ExternalLink className="h-5 w-5 text-cyan-400" />
                  <div className="text-sm text-cyan-100">
                    <p className="font-medium">You will be redirected to MyT Money</p>
                    <p className="mt-1 text-cyan-200">Complete payment on their secure platform.</p>
                  </div>
                </div>
              </div>
              <a
                href={externalLink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-pink-500 to-cyan-500 py-3 font-medium transition-opacity hover:opacity-90"
              >
                Continue to MyT Money
                <ExternalLink className="h-5 w-5" />
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/** Dashboard Component */
function Dashboard({ onBack, extra }: { onBack: () => void; extra: BookingRow[] }) {
  return (
    <div className="mx-auto max-w-5xl px-6 py-8">
      <button onClick={onBack} className="mb-6 flex items-center gap-2 text-slate-300 hover:text-white">
        <ArrowLeft className="h-4 w-4" />
        Back to marketplace
      </button>
      <h1 className="text-3xl font-bold">Brand Dashboard</h1>
      <p className="mt-2 text-slate-400">Manage your bookings and campaigns</p>
      <div className="mt-8 rounded-xl border border-white/10 bg-white/5">
        <div className="border-b border-white/10 p-4">
          <h2 className="font-medium">Recent bookings</h2>
        </div>
        <div className="divide-y divide-white/10">
          {extra.length === 0 && (
            <div className="p-8 text-center text-slate-400">No bookings yet</div>
          )}
          {extra.map((b) => (
            <div key={b.id} className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium">{b.creator}</div>
                <div className="text-sm text-slate-400">{b.title}</div>
                <div className="text-xs text-slate-500">{b.date}</div>
              </div>
              <div className="text-right">
                <div className="font-medium">{formatCurrency(b.total)}</div>
                <div
                  className={cx(
                    "mt-1 text-xs",
                    b.status === "Confirmed" ? "text-green-400" : "text-yellow-400"
                  )}
                >
                  {b.status}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/** PAGE COMPONENT */
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
      <TopBar
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
