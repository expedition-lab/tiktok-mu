"use client";

import React, { useMemo, useState, useEffect } from "react";
import Image from "next/image";
import {
<<<<<<< HEAD
  Search, Play, Users, Star, Calendar, Wallet, ArrowLeft, Gift,
  MessageCircle, ChevronRight, Video, Sparkles, ShoppingCart, CreditCard,
  Upload, ExternalLink, AlertTriangle,
=======
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
  Plus,
  Minus,
  Trash2,
  Store,
  PackagePlus,
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
} from "lucide-react";

/** Types */
type Pkg = { id: string; title: string; price: number };
type Creator = {
<<<<<<< HEAD
  id: string; handle: string; name: string; followers: number; engagement: number;
  niche: string[]; city: string; thumb: string; sampleVideo: string; packages: Pkg[];
};
type RouteState = { name: "home" | "creator" | "live" | "dashboard"; id: string };
type BookingRow = { id: string; creator: string; title: string; date: string; total: number; status: "Confirmed" | "Pending" };
type BookingState = { creator: Creator; pkg: Pkg };
type ChatMsg = { id: number; user: string; text: string };
type SessionUser = { open_id: string; display_name?: string; avatar_url?: string };

/** Data */
=======
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
type Product = {
  id: string;
  title: string;
  price: number;
  image: string;
  seller: string;
  stock: number;
  description?: string;
};
type CartItem = { product: Product; qty: number };

type RouteState = {
  name: "home" | "creator" | "live" | "dashboard" | "market" | "sell";
  id: string;
};
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

/** Data: Creators */
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
const CREATORS: Creator[] = [
  {
    id: "c1",
    handle: "@aisha.mu",
    name: "Aisha",
    followers: 128000,
    engagement: 7.1,
    niche: ["Fashion", "Beauty"],
    city: "Port Louis",
<<<<<<< HEAD
    thumb: "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
=======
    thumb:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=1200&auto=format&fit=crop",
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
    thumb: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop",
=======
    thumb:
      "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126?q=80&w=1200&auto=format&fit=crop",
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
    thumb: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
=======
    thumb:
      "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1200&auto=format&fit=crop",
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
    sampleVideo: "https://www.youtube.com/embed/ScMzIvxBSi4?si=demo3",
    packages: [
      { id: "p1", title: "Resort LIVE tour (15 min)", price: 6000 },
      { id: "p2", title: "Activity LIVE + Story pack", price: 8500 },
    ],
  },
];

<<<<<<< HEAD
=======
/** Data: Seed shop products */
const SEED_PRODUCTS: Product[] = [
  {
    id: "sp1",
    title: "Island Tee — Coral",
    price: 899,
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?q=80&w=1200&auto=format&fit=crop",
    seller: "@islandwear",
    stock: 12,
    description: "Soft cotton T-shirt with island vibes.",
  },
  {
    id: "sp2",
    title: "Vanilla Rum (Gift)",
    price: 1299,
    image:
      "https://images.unsplash.com/photo-1541542684-4a6d00b7feb1?q=80&w=1200&auto=format&fit=crop",
    seller: "@creolegifts",
    stock: 6,
    description: "Local infused vanilla rum — perfect gift.",
  },
  {
    id: "sp3",
    title: "Beach Hat",
    price: 499,
    image:
      "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?q=80&w=1200&auto=format&fit=crop",
    seller: "@sun&sea",
    stock: 20,
    description: "Woven hat for sunny LIVE days.",
  },
];

>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
const formatCurrency = (n: number) => new Intl.NumberFormat("en-MU", { style: "currency", currency: "MUR" }).format(n);
=======
const formatCurrency = (n: number) =>
  new Intl.NumberFormat("en-MU", { style: "currency", currency: "MUR" }).format(n);
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
    if (dbl) { d *= 2; if (d > 9) d -= 9; }
    sum += d; dbl = !dbl;
=======
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
  }
  return sum % 10 === 0;
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
<<<<<<< HEAD
  const [user, setUser] = useState<SessionUser | null>(null);

  const results = useMemo(() => filterCreators(q, niche, minFollowers), [q, niche, minFollowers]);

=======
  const results = useMemo(() => filterCreators(q, niche, minFollowers), [q, niche, minFollowers]);

  /** Marketplace state */
  const [products, setProducts] = useState<Product[]>(SEED_PRODUCTS);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartOpen, setCartOpen] = useState(false);

  const cartCount = useMemo(() => cart.reduce((acc, c) => acc + c.qty, 0), [cart]);
  const cartSum = useMemo(
    () => cart.reduce((acc, c) => acc + c.qty * c.product.price, 0),
    [cart]
  );

  const addToCart = (p: Product) => {
    setCart((prev) => {
      const i = prev.findIndex((ci) => ci.product.id === p.id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: Math.min(next[i].qty + 1, p.stock) };
        return next;
      }
      return [...prev, { product: p, qty: 1 }];
    });
  };
  const updateQty = (id: string, qty: number) => {
    setCart((prev) =>
      prev
        .map((ci) =>
          ci.product.id === id ? { ...ci, qty: Math.min(Math.max(qty, 1), ci.product.stock) } : ci
        )
        .filter((ci) => ci.qty > 0)
    );
  };
  const removeFromCart = (id: string) => setCart((prev) => prev.filter((ci) => ci.product.id !== id));
  const clearCart = () => setCart([]);

  /** Seller adds product */
  const saveProduct = (data: Omit<Product, "id" | "seller"> & { seller?: string }) => {
    const id = `p${Date.now()}`;
    const seller = data.seller ?? "@you";
    const prod: Product = { id, seller, title: data.title, price: data.price, image: data.image, stock: data.stock, description: data.description };
    setProducts((prev) => [prod, ...prev]);
    setRoute({ name: "market", id: "" });
  };

  /** External pay link for MyT demo */
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
  useEffect(() => {
    if (paymentFlow === "myt" && booking) {
      const id = `${booking.creator.id}-${booking.pkg.id}-${Date.now()}`;
      setExternalLink(`https://pay.myt.mu/demo/${id}`);
    }
  }, [paymentFlow, booking]);

<<<<<<< HEAD
  useEffect(() => {
    fetch("/api/auth/session")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => setUser(d?.user ?? null))
      .catch(() => {});
  }, []);

=======
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
        user={user}
        onLive={() => setRoute({ name: "live", id: "c1" })}
=======
        onGoMarket={() => setRoute({ name: "market", id: "" })}
        onGoSell={() => setRoute({ name: "sell", id: "" })}
        cartCount={cartCount}
        onOpenCart={() => setCartOpen(true)}
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
        <LivePage creator={currentCreator} onBack={() => setRoute({ name: "creator", id: currentCreator.id })} />
      )}

      {route.name === "dashboard" && <Dashboard onBack={() => setRoute({ name: "home", id: "" })} extra={recent} />}

<<<<<<< HEAD
=======
      {route.name === "market" && (
        <MarketPage
          products={products}
          onAdd={(p) => addToCart(p)}
        />
      )}

      {route.name === "sell" && (
        <SellPage onBack={() => setRoute({ name: "home", id: "" })} onSave={saveProduct} />
      )}

      {/* Floating demo button */}
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
      <div className="fixed bottom-5 right-5 flex flex-col gap-3">
        <button
          onClick={() => setRoute({ name: "dashboard", id: "" })}
          className="inline-flex items-center rounded-md bg-[#25F4EE] px-3 py-2 text-sm font-medium text-black shadow-lg hover:bg-[#25F4EE]/90"
        >
          <Sparkles className="mr-2 h-4 w-4" /> Brand Dashboard (Demo)
        </button>
      </div>

<<<<<<< HEAD
=======
      {/* Checkout modal (creator bookings) */}
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
=======

      {/* Cart drawer (shop) */}
      {cartOpen && (
        <CartDrawer
          items={cart}
          total={cartSum}
          onClose={() => setCartOpen(false)}
          onUpdateQty={updateQty}
          onRemove={removeFromCart}
          onClear={clearCart}
          onCheckout={() => {
            alert(`Checkout demo — total ${formatCurrency(cartSum)}`);
            clearCart();
            setCartOpen(false);
          }}
        />
      )}
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
    </div>
  );
}

/** Views & Components */
function TopBar({
  canGoBack,
  onBack,
<<<<<<< HEAD
  user,
  onLive,
}: {
  canGoBack?: boolean;
  onBack: () => void;
  user: SessionUser | null;
  onLive: () => void;
=======
  onGoMarket,
  onGoSell,
  cartCount,
  onOpenCart,
}: {
  canGoBack?: boolean;
  onBack: () => void;
  onGoMarket: () => void;
  onGoSell: () => void;
  cartCount: number;
  onOpenCart: () => void;
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
}) {
  return (
    <div className="sticky top-0 z-40 w-full border-b border-white/10 bg-[#0e0f12]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
        <div className="flex items-center gap-3">
          {canGoBack && (
            <button aria-label="Back" onClick={onBack} className="rounded-md p-2 text-white hover:bg-white/10">
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
<<<<<<< HEAD
          {user ? (
            <>
              <span className="text-sm text-white/80">Hi{user.display_name ? `, ${user.display_name}` : ""}</span>
              <button
                onClick={onLive}
                className="rounded-md bg-[#FE2C55] px-3 py-2 text-sm font-medium hover:bg-[#d81e45]"
              >
                Go Live (Demo)
              </button>
              <a
                href="/api/auth/logout"
                className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"
              >
                Logout
              </a>
            </>
          ) : (
            <a
              href="/api/auth/tiktok/start"
              className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90"
            >
              Login with TikTok
            </a>
          )}
=======
          <button onClick={onGoMarket} className="inline-flex items-center rounded-md px-3 py-2 text-sm hover:bg-white/10">
            <Store className="mr-2 h-4 w-4" /> Market
          </button>
          <button onClick={onGoSell} className="inline-flex items-center rounded-md px-3 py-2 text-sm hover:bg-white/10">
            <PackagePlus className="mr-2 h-4 w-4" /> Sell
          </button>
          <button
            onClick={onOpenCart}
            className="relative inline-flex items-center rounded-md px-3 py-2 text-sm hover:bg-white/10"
            aria-label="Open cart"
          >
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 rounded-full bg-[#FE2C55] px-1.5 text-[10px] font-bold text-black">
                {cartCount}
              </span>
            )}
          </button>
          <button className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            <MessageCircle className="mr-2 inline h-4 w-4" /> Support
          </button>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
        </div>
      </div>
    </div>
  );
}

function HomeView({
<<<<<<< HEAD
  results, q, setQ, niche, setNiche, minFollowers, setMinFollowers, openCreator,
}: {
  results: Creator[];
  q: string; setQ: (v: string) => void;
  niche: string; setNiche: (v: string) => void;
  minFollowers: number; setMinFollowers: (v: number) => void;
=======
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
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
            type="number" min={0}
=======
            type="number"
            min={0}
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
                  <Badge key={p.id} className="bg-white/10">{p.title}</Badge>
                ))}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <button onClick={() => openCreator(c.id)} className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90">
=======
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
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
          <div className="flex items-center gap-3 text-white/80"><Users className="h-5 w-5" /> 300+ creators (demo)</div>
          <div className="mt-2 flex items-center gap-3 text-white/80"><Calendar className="h-5 w-5" /> Instant booking</div>
          <div className="mt-2 flex items-center gap-3 text-white/80"><Wallet className="h-5 w-5" /> Secured payouts</div>
=======
          <div className="flex items-center gap-3 text-white/80">
            <Users className="h-5 w-5" /> 300+ creators (demo)
          </div>
          <div className="mt-2 flex items-center gap-3 text-white/80">
            <Calendar className="h-5 w-5" /> Instant booking
          </div>
          <div className="mt-2 flex items-center gap-3 text-white/80">
            <Wallet className="h-5 w-5" /> Secured payouts
          </div>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
        </div>
      </div>
    </div>
  );
}

function Badge({ className = "", children }: { className?: string; children: React.ReactNode }) {
<<<<<<< HEAD
  return <span className={cx("inline-flex items-center rounded-md border border-white/10 bg-white/10 px-2 py-0.5", className)}>{children}</span>;
}

function CreatorPage({ creator, onBack, onBook, onWatchLive }: { creator: Creator; onBack: () => void; onBook: (pkg: Pkg) => void; onWatchLive: () => void; }) {
=======
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
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
            <iframe className="h-full w-full" src={creator.sampleVideo} title="Live preview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowFullScreen />
=======
            <iframe
              className="h-full w-full"
              src={creator.sampleVideo}
              title="Live preview"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2 text-white/80">
            <Video className="h-4 w-4" /> LIVE-ready • <Users className="h-4 w-4" /> {formatFollowers(creator.followers)} • <Star className="h-4 w-4" /> {creator.engagement}% ER • {creator.city}
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl border border-white/10 bg-white/5 p-4">
<<<<<<< HEAD
            <div className="text-lg font-semibold">{creator.name} <span className="text-white/60">{creator.handle}</span></div>
=======
            <div className="text-lg font-semibold">
              {creator.name} <span className="text-white/60">{creator.handle}</span>
            </div>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
<<<<<<< HEAD
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold"><Gift className="h-4 w-4" /> Gift → MUR Earnings (Demo)</div>
=======
            <div className="mb-2 flex items-center gap-2 text-sm font-semibold">
              <Gift className="h-4 w-4" /> Gift → MUR Earnings (Demo)
            </div>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
            <div className="grid gap-2">
              <div>
                <label className="text-sm text-white/80">Gift type</label>
                <select value={giftType} onChange={(e) => setGiftType(e.target.value)} className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm">
<<<<<<< HEAD
                  {GIFTS.map((g) => (<option key={g.id} value={g.id}>{g.name} • {g.coins} coins</option>))}
=======
                  {GIFTS.map((g) => (
                    <option key={g.id} value={g.id}>
                      {g.name} • {g.coins} coins
                    </option>
                  ))}
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
                </select>
              </div>
              <div>
                <label className="text-sm text-white/80">How many gifts?</label>
                <input type="range" min={0} max={100} step={1} value={giftCount} onChange={(e) => setGiftCount(Number(e.target.value))} className="mt-2 w-full" />
<<<<<<< HEAD
                <div className="mt-1 text-sm text-white/70">{giftCount} × selected gift • Coins total ~ <span className="font-medium text-white">{coinsValue.toLocaleString()}</span></div>
                <div className="text-sm">≈ Earnings: <span className="font-semibold text-emerald-400">{formatCurrency(coinsValue * COIN_TO_MUR)}</span> <span className="text-white/60">(demo conv. {COIN_TO_MUR} MUR/coin)</span></div>
=======
                <div className="mt-1 text-sm text-white/70">
                  {giftCount} × selected gift • Coins total ~ <span className="font-medium text-white">{coinsValue.toLocaleString()}</span>
                </div>
                <div className="text-sm">
                  ≈ Earnings: <span className="font-semibold text-emerald-400">{formatCurrency(coinsValue * COIN_TO_MUR)}</span>{" "}
                  <span className="text-white/60">(demo conv. {COIN_TO_MUR} MUR/coin)</span>
                </div>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
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
            <div className="mb-2 flex items-center justify-between text-sm font-semibold">
              <span>Earnings Tracker</span>
              <span className="text-white/60">demo</span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                <div className="text-xs text-white/60">Coins</div>
                <div className="text-lg font-bold">{coins.toLocaleString()}</div>
              </div>
              <div className="rounded-lg border border-white/10 bg-black/20 p-2">
                <div className="text-xs text-white/60">Approx. MUR</div>
                <div className="text-lg font-bold text-emerald-400">{formatCurrency(coins * COIN_TO_MUR)}</div>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2">
              <button onClick={() => setCoins((c) => c + 100)} className="rounded-md bg-[#FE2C55] px-3 py-2 text-sm font-medium hover:bg-[#d81e45]">
                <Gift className="mr-2 inline h-4 w-4" /> +100 coins
              </button>
<<<<<<< HEAD
              <button onClick={() => setCoins((c) => c + 1000)} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">+1000</button>
=======
              <button onClick={() => setCoins((c) => c + 1000)} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
                +1000
              </button>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
            </div>
            <div className="mt-2 text-xs text-white/60">Tap to simulate fans sending gifts during LIVE.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function CheckoutModal({
<<<<<<< HEAD
  booking, paymentFlow, setPaymentFlow, proofFileName, setProofFileName, externalLink, onClose, onConfirm, onPending,
=======
  booking,
  paymentFlow,
  setPaymentFlow,
  proofFileName,
  setProofFileName,
  externalLink,
  onClose,
  onConfirm,
  onPending,
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
}: {
  booking: BookingState;
  paymentFlow: "idle" | "card" | "juice" | "myt";
  setPaymentFlow: (v: "idle" | "card" | "juice" | "myt") => void;
<<<<<<< HEAD
  proofFileName: string; setProofFileName: (v: string) => void;
  externalLink: string; onClose: () => void; onConfirm: () => void; onPending: () => void;
=======
  proofFileName: string;
  setProofFileName: (v: string) => void;
  externalLink: string;
  onClose: () => void;
  onConfirm: () => void;
  onPending: () => void;
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
}) {
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("4242 4242 4242 4242");
  const [expiry, setExpiry] = useState("12/29");
  const [cvc, setCvc] = useState("123");
  const [processing, setProcessing] = useState(false);
  const [cardError, setCardError] = useState<string>("");

  const maskedNumber = cardNumber.split("").filter((ch) => "0123456789 ".includes(ch)).join("");
  const monthOk = expiry.length === 5 && expiry[2] === "/" && Number(expiry.slice(0, 2)) >= 1 && Number(expiry.slice(0, 2)) <= 12;
  const cvcOk = (cvc.length === 3 || cvc.length === 4) && Array.from(cvc).every((ch) => ch >= "0" && ch <= "9");
  const canSubmit = cardName.trim().length >= 2 && luhnCheck(maskedNumber) && monthOk && cvcOk;

  const submitCard = () => {
    setCardError("");
<<<<<<< HEAD
    if (!canSubmit) { setCardError("Please check name, card number (Luhn), expiry (MM/YY), and CVC."); return; }
=======
    if (!canSubmit) {
      setCardError("Please check name, card number (Luhn), expiry (MM/YY), and CVC.");
      return;
    }
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
    setProcessing(true);
    setTimeout(() => {
      setProcessing(false);
      const digits = maskedNumber.split(" ").join("");
      const forcedDecline = digits.endsWith("0002");
      const randomDecline = Math.random() < 0.25;
      if (forcedDecline || randomDecline) {
        setCardError("Payment failed: your bank declined the transaction. Try again or switch to Juice.");
<<<<<<< HEAD
      } else { onConfirm(); }
=======
      } else {
        onConfirm();
      }
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60" onClick={onClose}>
      <div className="max-h-[90vh] w-[90vw] max-w-xl overflow-auto rounded-xl border border-white/10 bg-[#0e0f12] p-4" onClick={(e) => e.stopPropagation()}>
<<<<<<< HEAD
        <div className="mb-1 flex items-center gap-2 text-lg font-bold"><ShoppingCart className="h-5 w-5" /> Checkout</div>
        <p className="mb-3 text-sm text-white/60">Demo checkout • 15% commission included • Choose a payment method below</p>

        <div className="rounded-xl bg-white/5 p-3">
          <div className="font-medium">{booking.creator.name} {booking.creator.handle}</div>
=======
        <div className="mb-1 flex items-center gap-2 text-lg font-bold">
          <ShoppingCart className="h-5 w-5" /> Checkout
        </div>
        <p className="mb-3 text-sm text-white/60">Demo checkout • 15% commission included • Choose a payment method below</p>

        <div className="rounded-xl bg-white/5 p-3">
          <div className="font-medium">
            {booking.creator.name} {booking.creator.handle}
          </div>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
          <div className="text-sm text-white/70">{booking.pkg.title}</div>
          <div className="text-sm text-white/70">Base price: {formatCurrency(booking.pkg.price)}</div>
          <div className="text-sm text-white/70">Our commission (15%): {formatCurrency(Math.round(booking.pkg.price * COMMISSION_RATE))}</div>
          <div className="mt-1 font-semibold">Total: {formatCurrency(computeTotal(booking.pkg.price))}</div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
<<<<<<< HEAD
          <div><label className="text-sm text-white/80">Preferred date</label><input type="date" className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" /></div>
          <div><label className="text-sm text-white/80">Preferred time</label><input type="time" className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" /></div>
=======
          <div>
            <label className="text-sm text-white/80">Preferred date</label>
            <input type="date" className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
          </div>
          <div>
            <label className="text-sm text-white/80">Preferred time</label>
            <input type="time" className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm text-white" />
          </div>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
        </div>
        <div className="mt-3">
          <label className="text-sm text-white/80">Campaign brief</label>
          <textarea rows={4} className="mt-1 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm" placeholder="Key talking points, links, discount codes..." />
        </div>

        {paymentFlow === "idle" && (
          <div className="mt-3 grid gap-3 sm:grid-cols-3">
<<<<<<< HEAD
            <button onClick={() => setPaymentFlow("card")} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90"><CreditCard className="mr-2 inline h-4 w-4" /> Pay with Card</button>
            <button onClick={() => setPaymentFlow("juice")} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"><Upload className="mr-2 inline h-4 w-4" /> Pay via Juice (proof)</button>
            <button onClick={() => setPaymentFlow("myt")} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10"><ExternalLink className="mr-2 inline h-4 w-4" /> MyT Money link</button>
=======
            <button onClick={() => setPaymentFlow("card")} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90">
              <CreditCard className="mr-2 inline h-4 w-4" /> Pay with Card
            </button>
            <button onClick={() => setPaymentFlow("juice")} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
              <Upload className="mr-2 inline h-4 w-4" /> Pay via Juice (proof)
            </button>
            <button onClick={() => setPaymentFlow("myt")} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
              <ExternalLink className="mr-2 inline h-4 w-4" /> MyT Money link
            </button>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
          </div>
        )}

        {paymentFlow === "card" && (
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="mb-2 text-sm font-semibold">Card payment (mock)</div>
            {cardError && (
              <div className="mb-2 flex items-start gap-2 rounded-md border border-red-500/30 bg-red-500/10 p-2 text-sm text-red-200">
                <AlertTriangle className="mt-0.5 h-4 w-4" />
<<<<<<< HEAD
                <div>{cardError}<div className="mt-1 text-xs text-red-200/80">Tip: Use <code>4242 4242 4242 4242</code> to succeed, or <code>4000 0000 0000 0002</code> to simulate a decline.</div></div>
=======
                <div>
                  {cardError}
                  <div className="mt-1 text-xs text-red-200/80">Tip: Use <code>4242 4242 4242 4242</code> to succeed, or <code>4000 0000 0000 0002</code> to simulate a decline.</div>
                </div>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
              </div>
            )}
            <div className="grid gap-2">
              <input value={cardName} onChange={(e) => setCardName(e.target.value)} placeholder="Cardholder name" className={cx("w-full rounded-md border px-3 py-2 text-sm", cardName.trim().length >= 2 ? "border-white/10 bg-white/5" : "border-red-500/40 bg-red-500/5")} />
              <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="Card number" className={cx("w-full rounded-md border px-3 py-2 text-sm", luhnCheck(maskedNumber) ? "border-white/10 bg-white/5" : "border-yellow-500/40 bg-yellow-500/5")} />
              <div className="grid grid-cols-2 gap-2">
                <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className={cx("rounded-md border px-3 py-2 text-sm", monthOk ? "border-white/10 bg-white/5" : "border-yellow-500/40 bg-yellow-500/5")} />
                <input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="CVC" className={cx("rounded-md border px-3 py-2 text-sm", cvcOk ? "border-white/10 bg-white/5" : "border-yellow-500/40 bg-yellow-500/5")} />
              </div>
              <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
                <button onClick={() => setPaymentFlow("idle")} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">Back</button>
                <div className="flex items-center gap-2">
<<<<<<< HEAD
                  {cardError && (<button onClick={() => submitCard()} disabled={processing} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-60">Retry payment</button>)}
                  <button onClick={() => setPaymentFlow("juice")} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">Switch to Juice</button>
=======
                  {cardError && (
                    <button onClick={() => submitCard()} disabled={processing} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10 disabled:opacity-60">
                      Retry payment
                    </button>
                  )}
                  <button onClick={() => setPaymentFlow("juice")} className="rounded-md border border-white/20 bg-white/5 px-3 py-2 text-sm hover:bg-white/10">
                    Switch to Juice
                  </button>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
                  <button onClick={() => submitCard()} disabled={!canSubmit || processing} className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium hover:bg-emerald-600 disabled:opacity-50">
                    {processing ? "Processing…" : `Pay ${formatCurrency(computeTotal(booking.pkg.price))}`}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {paymentFlow === "juice" && (
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="mb-2 text-sm font-semibold">Pay via MCB Juice / MyT — upload proof</div>
            <ol className="mb-2 list-decimal pl-5 text-sm text-white/80">
              <li>Send {formatCurrency(computeTotal(booking.pkg.price))} to <b>+230 5 123 4567</b> (Demo).</li>
              <li>Upload the screenshot/receipt below.</li>
            </ol>
            <input type="file" onChange={(e) => setProofFileName(e.target.files && e.target.files[0] ? e.target.files[0].name : "")} className="block w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm" />
            {proofFileName && <div className="mt-1 text-xs text-white/60">Selected: {proofFileName}</div>}
            <div className="mt-2 flex justify-between">
              <button onClick={() => setPaymentFlow("idle")} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">Back</button>
<<<<<<< HEAD
              <button onClick={onPending} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90">Submit proof &amp; mark Pending</button>
=======
              <button onClick={onPending} className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90">
                Submit proof &amp; mark Pending
              </button>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
            </div>
          </div>
        )}

        {paymentFlow === "myt" && (
          <div className="mt-4 rounded-xl border border-white/10 bg-black/30 p-3">
            <div className="mb-2 text-sm font-semibold">MyT Money — external payment link</div>
            <p className="text-sm text-white/70">Open the link below to complete payment, then come back and click <b>I&apos;ve paid</b>.</p>
            <div className="mt-2 rounded-lg border border-white/10 bg-black/40 p-3 text-sm">
              <div className="mb-2">Amount: <b>{formatCurrency(computeTotal(booking.pkg.price))}</b></div>
              <a href={externalLink} target="_blank" rel="noreferrer" className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90">
                <ExternalLink className="mr-2 h-4 w-4" /> Open payment link
              </a>
              <div className="mt-2 text-xs text-white/60 break-all">Demo link: {externalLink}</div>
            </div>
            <div className="mt-2 flex justify-between">
              <button onClick={() => setPaymentFlow("idle")} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">Back</button>
<<<<<<< HEAD
              <button onClick={onConfirm} className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium hover:bg-emerald-600">I&apos;ve paid — Confirm</button>
=======
              <button onClick={onConfirm} className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium hover:bg-emerald-600">
                I&apos;ve paid — Confirm
              </button>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
            </div>
          </div>
        )}

        {paymentFlow === "idle" && (
          <div className="mt-4 flex justify-end gap-2">
            <button onClick={onClose} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">Cancel</button>
<<<<<<< HEAD
            <button onClick={onConfirm} className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600">Confirm (Demo)</button>
=======
            <button onClick={onConfirm} className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-600">
              Confirm (Demo)
            </button>
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
          </div>
        )}
      </div>
    </div>
  );
}

function Dashboard({ onBack, extra = [] as BookingRow[] }: { onBack: () => void; extra?: BookingRow[] }) {
  const mockBookings: BookingRow[] = [
    { id: "b1", creator: "@aisha.mu", title: "15-min LIVE shoutout", date: "2025-09-08 19:00", total: 5175, status: "Confirmed" },
    { id: "b2", creator: "@sam_beach", title: "Resort LIVE tour (15 min)", date: "2025-09-10 14:30", total: 6900, status: "Pending" },
  ];
  const rows = [...extra, ...mockBookings];

  return (
    <div className="mx-auto max-w-5xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold">Brand Dashboard (Demo)</h2>
        <button onClick={onBack} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
          <ArrowLeft className="mr-2 inline h-4 w-4" /> Back
        </button>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <div className="text-sm text-white/70">Confirmed</div>
          <div className="text-2xl font-bold">{rows.filter((r) => r.status === "Confirmed").length}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <div className="text-sm text-white/70">Spend</div>
          <div className="text-2xl font-bold">{formatCurrency(rows.reduce((a, b) => a + (b.total || 0), 0))}</div>
        </div>
        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-center">
          <div className="text-sm text-white/70">Creators</div>
          <div className="text-2xl font-bold">{new Set(rows.map((r) => r.creator)).size}</div>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
        <div className="mb-2 text-sm text-white/70">Upcoming &amp; recent</div>
        <div className="space-y-2">
          {rows.map((b) => (
            <div key={b.id} className="flex items-center justify-between rounded-lg border border-white/10 bg-black/20 p-3">
              <div>
                <div className="font-medium">{b.creator} • {b.title}</div>
                <div className="text-sm text-white/70">{b.date} • Total {formatCurrency(b.total)} • {b.status}</div>
              </div>
              <Badge className={cx("", b.status === "Confirmed" ? "text-emerald-300" : "text-yellow-300")}>{b.status}</Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
<<<<<<< HEAD
=======

/** New: Market (shop) */
function MarketPage({
  products,
  onAdd,
}: {
  products: Product[];
  onAdd: (p: Product) => void;
}) {
  return (
    <div className="mx-auto max-w-6xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold inline-flex items-center gap-2">
          <Store className="h-5 w-5" /> Market
        </h2>
        <p className="text-sm text-white/70">Sell or buy items alongside LIVE bookings.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.id} className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
            <div className="relative h-48 w-full">
              <Image
                src={p.image}
                alt={p.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover"
                priority={false}
              />
            </div>
            <div className="p-4">
              <div className="flex items-center justify-between">
                <div className="font-semibold">{p.title}</div>
                <div className="text-emerald-300 font-semibold">{formatCurrency(p.price)}</div>
              </div>
              <div className="mt-1 text-sm text-white/70">Seller: {p.seller} • Stock: {p.stock}</div>
              {p.description && <div className="mt-1 text-sm text-white/60 line-clamp-2">{p.description}</div>}
              <div className="mt-3">
                <button
                  onClick={() => onAdd(p)}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90"
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to cart
                </button>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && (
          <div className="col-span-full rounded-xl border border-white/10 bg-black/30 p-6 text-center text-white/70">
            No products yet. Be the first to add one in <b>Sell</b>!
          </div>
        )}
      </div>
    </div>
  );
}

/** New: Sell form (upload to /api/upload) */
function SellPage({
  onBack,
  onSave,
}: {
  onBack?: () => void;
  onSave: (p: Omit<Product, "id" | "seller"> & { seller?: string }) => void;
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [stock, setStock] = useState<number>(1);
  const [description, setDescription] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [imgUrl, setImgUrl] = useState<string>("");
  const [saving, setSaving] = useState(false);
  const [err, setErr] = useState<string>("");

  const upload = async (): Promise<string> => {
    if (!file) throw new Error("Please choose an image.");
    const fd = new FormData();
    fd.append("file", file);
    const res = await fetch("/api/upload", { method: "POST", body: fd });
    if (!res.ok) throw new Error("Upload failed");
    const data = (await res.json()) as { url: string };
    return data.url;
  };

  const submit = async () => {
    setErr("");
    if (!title.trim() || price <= 0 || stock <= 0) {
      setErr("Fill title, price (>0), and stock (>0).");
      return;
    }
    try {
      setSaving(true);
      const url = imgUrl || (file ? await upload() : "");
      if (!url) throw new Error("Please upload/select an image.");
      onSave({ title, price, stock, image: url, description, seller: "@you" });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl px-4 py-6">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-bold inline-flex items-center gap-2">
          <PackagePlus className="h-5 w-5" /> Add a product
        </h2>
        {onBack && (
          <button onClick={onBack} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">
            <ArrowLeft className="mr-2 inline h-4 w-4" /> Back
          </button>
        )}
      </div>

      {err && (
        <div className="mb-3 rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-200">
          {err}
        </div>
      )}

      <div className="grid gap-4">
        <div>
          <label className="text-sm text-white/80">Title</label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
            placeholder="e.g., Island Tee — Coral"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-sm text-white/80">Price (MUR)</label>
            <input
              type="number"
              min={0}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value || 0))}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
            />
          </div>
          <div>
            <label className="text-sm text-white/80">Stock</label>
            <input
              type="number"
              min={1}
              value={stock}
              onChange={(e) => setStock(Number(e.target.value || 1))}
              className="mt-1 w-full rounded-md border border-white/10 bg-white/5 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="text-sm text-white/80">Description (optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className="mt-1 w-full rounded-md border border-white/10 bg-white/5 p-2 text-sm"
            placeholder="Short details about the product..."
          />
        </div>

        <div className="grid gap-3 rounded-xl border border-white/10 bg-white/5 p-4">
          <div className="text-sm font-semibold">Product image</div>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setFile(e.target.files && e.target.files[0] ? e.target.files[0] : null)}
            className="block w-full rounded-md border border-white/10 bg-[#0e0f12] px-3 py-2 text-sm"
          />
          <div className="text-xs text-white/60">Or paste an existing image URL:</div>
          <input
            value={imgUrl}
            onChange={(e) => setImgUrl(e.target.value)}
            placeholder="https://..."
            className="w-full rounded-md border border-white/10 bg-[#0e0f12] px-3 py-2 text-sm"
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={submit}
            disabled={saving}
            className="rounded-md bg-white px-3 py-2 text-sm font-medium text-black hover:bg-white/90 disabled:opacity-60"
          >
            {saving ? "Saving…" : "Save product"}
          </button>
        </div>
      </div>
    </div>
  );
}

/** New: Cart drawer */
function CartDrawer({
  items,
  total,
  onClose,
  onUpdateQty,
  onRemove,
  onClear,
  onCheckout,
}: {
  items: CartItem[];
  total: number;
  onClose: () => void;
  onUpdateQty: (id: string, qty: number) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
  onCheckout: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-auto border-l border-white/10 bg-[#0e0f12] p-4">
        <div className="mb-3 flex items-center justify-between">
          <div className="text-lg font-bold inline-flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" /> Your Cart
          </div>
          <button onClick={onClose} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">Close</button>
        </div>

        {items.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-white/5 p-6 text-center text-white/70">
            Cart is empty.
          </div>
        ) : (
          <>
            <div className="space-y-3">
              {items.map(({ product, qty }) => (
                <div key={product.id} className="flex items-center gap-3 rounded-lg border border-white/10 bg-black/20 p-3">
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden rounded-md">
                    <Image src={product.image} alt={product.title} fill sizes="56px" className="object-cover" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium">{product.title}</div>
                    <div className="text-sm text-white/70">{formatCurrency(product.price)}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      aria-label="Decrease"
                      onClick={() => onUpdateQty(product.id, qty - 1)}
                      className="rounded-md border border-white/20 bg-white/5 p-1 hover:bg-white/10"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <div className="w-8 text-center text-sm">{qty}</div>
                    <button
                      aria-label="Increase"
                      onClick={() => onUpdateQty(product.id, qty + 1)}
                      className="rounded-md border border-white/20 bg-white/5 p-1 hover:bg-white/10"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      aria-label="Remove"
                      onClick={() => onRemove(product.id)}
                      className="ml-2 rounded-md border border-white/20 bg-white/5 p-1 hover:bg-white/10"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/5 p-4">
              <div className="flex items-center justify-between">
                <div className="text-sm text-white/70">Subtotal</div>
                <div className="font-semibold">{formatCurrency(total)}</div>
              </div>
              <div className="mt-1 text-xs text-white/60">Taxes/shipping not included (demo).</div>
              <div className="mt-3 flex justify-between gap-2">
                <button onClick={onClear} className="rounded-md px-3 py-2 text-sm hover:bg-white/10">Clear</button>
                <button onClick={onCheckout} className="rounded-md bg-emerald-500 px-3 py-2 text-sm font-medium hover:bg-emerald-600">
                  Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
>>>>>>> 929c19a4c7a7af47cd9aaec64379675864b6533f
