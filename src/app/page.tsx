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
    sampleVideo: "https://www.youtube.com/embed/aqz-KE-bpKQ?si=demo2",
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

/** Auth UI (added) */
function AuthButtons() {
  const [user, setUser] = React.useState<null | { display_name?: string; avatar_url?: string }>(null);

  React.useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.ok ? r.json() : { user: null })
      .then((d) => setUser(d.user || null))
      .catch(() => setUser(null));
  }, []);

  if (user) {
    return (
      <div className="flex items-center gap-2">
        {user.avatar_url ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={user.avatar_url} alt="" className="h-6 w-6 rounded-full" />
        ) : null}
        <span className="text-sm">{user.display_name || "TikTok User"}</span>
        <a href="/api/auth/logout" className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
          Logout
        </a>
      </div>
    );
  }

  return (
    <a
      href="/api/auth/tiktok/start"
      className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90"
    >
      Continue with TikTok
    </a>
  );
}

/** App */
export default function App() {
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
      setExternalLink(`https://pay.myt.mu/demo/${id}`);
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
          <Sparkles className="mr-2 h-4 w-4" /> Brand Dashboard (Demo)
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

/** Views & Components */
function TopBar({ canGoBack, onBack }: { canGoBack?: boolean; onBack: () => void }) {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0e0f12]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {canGoBack && (
            <button
              aria-label="Back"
              onClick={onBack}
              className="rounded-md p-2 text-white hover:bg-white/10"
            >
              <ArrowLeft className="h-5 w-5" />
            </button>
          )}
          <div className="text-lg font-bold tracking-tight">
            <span className="text-white">TikTok Live Marketplace</span>
            <span className="ml-2 rounded bg-gradient-to-r from-[#FE2C55] to-[#25F4EE] px-2 py-0.5 text-xs font-semibold text-black">
              MAURITIUS • DEMO
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <AuthButtons />
          <button className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            <MessageCircle className="mr-2 inline h-4 w-4" /> Support
          </button>
        </div>
      </div>
    </div>
  );
}

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
    <div className="mx-auto max-w-6xl px-4 py-6">
      <Hero />
      <div className="mt-6 grid gap-3 sm:grid-cols-12">
        <div className="sm:col-span-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-white/60" />
            <input
              className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 pl-9 text-sm text-white placeholder:text-white/50"
              placeholder="Search creators (handle, name)"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
        </div>
        <div className="sm:col-span-3">
          <select
            value={niche}
            onChange={(e) => setNiche(e.target.value)}
            className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
          >
            <option value="all">All niches</option>
            <option>Fashion</option>
            <option>Beauty</option>
            <option>Food</option>
            <option>Lifestyle</option>
            <option>Travel</option>
            <option>Adventure</option>
          </select>
        </div>
        <div className="sm:col-span-3 flex items-center gap-3">
          <span className="text-sm text-white/70">Min followers</span>
          <input
            type="number"
            min={0}
            className="w-36 rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white"
            value={minFollowers}
            onChange={(e) => setMinFollowers(Number(e.target.value || 0))}
          />
        </div>
      </div>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {results.map((c) => (
          <div key={c.id} className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative h-44 w-full overflow-hidden">
              <Image
                src={c.thumb}
                alt={c.name}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0" />
              <div className="absolute left-3 top-3 flex items-center gap-2">
                <Badge className="bg-[#FE2C55]">LIVE-Friendly</Badge>
                <Badge className="bg-black/60 border border-white/10">{c.niche.join(" • ")}</Badge>
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between text-base font-semibold">
                <span>
                  {c.name} <span className="text-white/60">{c.handle}</span>
                </span>
                <span className="text-sm font-medium text-white/80">
                  <Users className="mr-1 inline h-4 w-4" /> {formatFollowers(c.followers)}
                </span>
              </div>
              <p className="mt-1 text-sm text-white/60">Engagement {c.engagement}% • {c.city}</p>
              <div className="mt-3 flex flex-wrap gap-2">
                {c.packages.slice(0, 2).map((p) => (
                  <Badge key={p.id} className="bg-white/10">
                    {p.title}
                  </Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={() => openCreator(c.id)}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90"
                >
                  <Play className="mr-2 h-4 w-4" /> Open Profile
                </button>
                <button onClick={() => openCreator(c.id)} className="text-sm text-white/80 hover:underline">
                  Details <ChevronRight className="ml-1 inline h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Hero() {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-br from-black via-[#121318] to-[#0e0f12] p-6">
      <div className="flex flex-col items-start gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight sm:text-3xl">
            Hire TikTok creators in Mauritius. Book LIVE promos in minutes.
          </h1>
          <p className="mt-2 max-w-2xl text-white/70">
            Search, book, and pay creators for TikTok Lives, shoutouts, and collabs. Built for businesses, loved by creators. (Demo)
          </p>
          <div className="mt-3 flex flex-wrap gap-2 text-xs">
            <Badge>15–20% commission</Badge>
            <Badge>Juice • MyT • Card</Badge>
            <Badge>Gift → MUR tracker</Badge>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-3 text-white/80">
            <Users className="h-5 w-5" /> 300+ creators (demo)
          </div>
          <div className="mt-2 flex items-center gap-3 text-white/80">
            <Calendar className="h-5 w-5" /> Instant booking
          </div>
          <div className="mt-2 flex items-center gap-3 text-white/80">
            <Wallet className="h-5 w-5" /> Secured payouts
          </div>
        </div>
      </div>
    </div>
  );
}

function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cx("inline-flex items-center rounded-md border border-white/10 bg-white/10 px-2 py-0.5", className)}>
      {children}
    </span>
  );
}

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
  const [giftCount, setGiftCount] = useState(0);
  const [giftType, setGiftType] = useState(GIFTS[0].id);
  const coinsValue = useMemo(() => {
    const g = GIFTS.find((x) => x.id === giftType)!;
    return giftCount * g.coins;
  }, [giftCount, giftType]);

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
            <iframe
              className="h-full w-full"
              src={creator.sampleVideo}
              title="Live preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-white/80">
            <Video className="h-4 w-4" /> LIVE-ready • <Users className="h-4 w-4" /> {formatFollowers(creator.followers)} • <Star className="h-4 w-4" /> {creator.engagement}% ER • {creator.city}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="text-lg font-semibold">
              {creator.name} <span className="text-white/60">{creator.handle}</span>
            </div>
            <div className="mt-1 text-sm text-white/70">Niches: {creator.niche.join(", ")}</div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 text-sm font-semibold">Packages</div>
            <div className="space-y-2">
              {creator.packages.map((p: Pkg) => (
                <div key={p.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-3">
                  <div>
                    <div className="font-medium">{p.title}</div>
                    <div className="text-sm text-white/70">Base: {formatCurrency(p.price)}</div>
                  </div>
                  <button onClick={() => onBook(p)} className="rounded-md bg-[#FE2C55] px-3 py-2 text-sm font-medium hover:bg-[#d81e45]">Book</button>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Gift className="h-4 w-4" /> Gift → MUR Earnings (Demo)
            </div>
            <div className="grid gap-2">
              <div>
                <label className="text-sm text-white/80">Gift type</label>
                <select value={giftType} onChange={(e) => setGiftType(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm">
                  {GIFTS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} • {g.coins} coins
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-sm text-white/80">How many gifts?</label>
                <input type="range" min={0} max={100} step={1} value={giftCount} onChange={(e) => setGiftCount(Number(e.target.value))} className="mt-2 w-full" />
                <div className="mt-1 text-sm text-white/70">
                  {giftCount} × selected gift • Coins total ~ <span className="font-medium text-white">{coinsValue.toLocaleString()}</span>
                </div>
                <div className="text-sm">
                  ≈ Earnings: <span className="font-semibold text-emerald-400">{formatCurrency(coinsValue * COIN_TO_MUR)}</span>{" "}
                  <span className="text-white/60">(demo conv. {COIN_TO_MUR} MUR/coin)</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={onWatchLive} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90">
              <Play className="mr-2 inline h-4 w-4" /> Watch LIVE (Demo)
            </button>
            <button onClick={onBack} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
              <ArrowLeft className="mr-2 inline h-4 w-4" /> Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function LivePage({ creator, onBack }: { creator: Creator; onBack: () => void }) {
  const [chat, setChat] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    { id: 1, user: "fan_001", text: "🔥 Let\u2019s go!" },
    { id: 2, user: "brand_official", text: "Use code ISLAND10 for -10%!" },
  ]);
  const [coins, setCoins] = useState(0);

  const send = () => {
    if (!chat) return;
    setMessages((m) => [...m, { id: Date.now(), user: "you", text: chat }]);
    setChat("");
  };

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-3">
        <button onClick={onBack} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
          <ArrowLeft className="mr-2 inline h-4 w-4" /> Back to creator
        </button>
      </div>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <div className="aspect-video w-full overflow-hidden rounded-xl border border-white/10 bg-black">
            <iframe className="h-full w-full" src={creator.sampleVideo} title="LIVE" allowFullScreen />
          </div>
          <div className="mt-2 text-white/70">(Demo) Embedded LIVE preview</div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
            <div className="mb-2 text-sm font-semibold">Live Chat (Demo)</div>
            <div className="h-48 overflow-auto rounded-md border border-white/10 bg-black/30 p-2 text-sm">
              {messages.map((m) => (
                <div key={m.id} className="mb-1">
                  <span className="text-[#25F4EE]">{m.user}</span>: {m.text}
                </div>
              ))}
            </div>
            <div className="mt-2 flex gap-2">
              <input value={chat} onChange={(e) => setChat(e.target.value)} placeholder="Say something…" className="w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm" />
              <button onClick={send} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90">Send</button>
            </div>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 p-3">
