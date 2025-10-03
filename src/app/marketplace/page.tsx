'use client';

import React, { useMemo, useState } from 'react';
import Link from 'next/link';

type Product = {
  id: string;
  title: string;
  image: string;
  priceMur: number;
  seller: string;
  category: 'Beauty' | 'Clothing' | 'Snacks' | 'Tech';
  featured?: boolean;
};

// ====== CONFIG (edit anytime) ======
const PAYPAL_BUSINESS_EMAIL = 'peeroosuhail047@gmail.com';
const JUICE_NUMBER = '23054960101';
const MUR_TO_USD = 0.022; // quick static conversion for PayPal (can refine later)

// Simple PayPal “Buy Now” link generator (no SDK needed)
function paypalBuyLink({
  business,
  itemName,
  amountUsd,
}: {
  business: string;
  itemName: string;
  amountUsd: number;
}) {
  const url = new URL('https://www.paypal.com/cgi-bin/webscr');
  url.searchParams.set('cmd', '_xclick');
  url.searchParams.set('business', business);
  url.searchParams.set('item_name', itemName);
  url.searchParams.set('amount', amountUsd.toFixed(2));
  url.searchParams.set('currency_code', 'USD');
  return url.toString();
}

// Demo products (swap with real later)
const DEMO_PRODUCTS: Product[] = [
  {
    id: 'p1',
    title: 'Island Glow Face Serum',
    image:
      'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?q=80&w=1200&auto=format&fit=crop',
    priceMur: 990,
    seller: '@beauty.mu',
    category: 'Beauty',
    featured: true,
  },
  {
    id: 'p2',
    title: 'Street Style Oversize Tee',
    image:
      'https://images.unsplash.com/photo-1520975693416-35e1b530f2ff?q=80&w=1200&auto=format&fit=crop',
    priceMur: 1200,
    seller: '@urbanwear.mu',
    category: 'Clothing',
  },
  {
    id: 'p3',
    title: 'Spicy Snack Box (10pcs)',
    image:
      'https://images.unsplash.com/photo-1604909052743-88d6b09a2be0?q=80&w=1200&auto=format&fit=crop',
    priceMur: 550,
    seller: '@snacks.mu',
    category: 'Snacks',
  },
  {
    id: 'p4',
    title: 'True Wireless Earbuds',
    image:
      'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?q=80&w=1200&auto=format&fit=crop',
    priceMur: 1890,
    seller: '@gadget.mu',
    category: 'Tech',
  },
];

export default function MarketplacePage() {
  const [juiceOpen, setJuiceOpen] = useState<null | Product>(null);
  const [filter, setFilter] = useState<'All' | Product['category']>('All');

  const products = useMemo(() => {
    if (filter === 'All') return DEMO_PRODUCTS;
    return DEMO_PRODUCTS.filter((p) => p.category === filter);
  }, [filter]);

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      {/* Top strip: trust badges */}
      <div className="w-full bg-slate-900 border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-2 text-sm flex items-center justify-center gap-6">
          <span className="opacity-90">✅ PayPal Secure</span>
          <span className="opacity-90">✅ Juice Payments</span>
          <span className="opacity-90">✅ Dispute Support</span>
        </div>
      </div>

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/10">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            background:
              'radial-gradient(60% 60% at 50% 40%, rgba(34,211,238,0.35), transparent 60%)',
          }}
        />
        <div className="max-w-6xl mx-auto px-4 py-14 relative">
          <h1 className="text-3xl md:text-5xl font-bold tracking-tight">
            Mauritius’ TikTok Marketplace
          </h1>
          <p className="mt-3 text-white/80 max-w-2xl">
            Shop creator-promoted products or list yours in minutes. Secure checkout via PayPal or Juice.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#grid"
              className="rounded-2xl px-5 py-3 bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 font-semibold"
            >
              Browse Products
            </a>
            <Link
              href="#sell"
              className="rounded-2xl px-5 py-3 border border-white/20 hover:border-white/40"
            >
              Sell Your Product
            </Link>
          </div>
        </div>
      </section>

      {/* Category filters */}
      <section className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center gap-2 flex-wrap">
          {(['All', 'Beauty', 'Clothing', 'Snacks', 'Tech'] as const).map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-4 py-2 rounded-xl border ${
                filter === c ? 'bg-white text-slate-900 border-white' : 'border-white/20 hover:border-white/40'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Product grid */}
      <section id="grid" className="max-w-6xl mx-auto px-4 pb-12">
        {products.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} onJuice={() => setJuiceOpen(p)} />
            ))}
          </div>
        )}
      </section>

      {/* Sell section (simple nudge for now) */}
      <section id="sell" className="max-w-6xl mx-auto px-4 pb-20">
        <div className="rounded-3xl border border-white/10 p-6 md:p-8 bg-gradient-to-b from-slate-900 to-slate-950">
          <h2 className="text-2xl font-bold">Be a Featured Seller this week</h2>
          <p className="mt-2 text-white/80">
            Limited slots available. List your product and get promoted by creators.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link
              href="https://wa.me/23054960101?text=Hi%20TokMarket,%20I%20want%20to%20list%20my%20product."
              target="_blank"
              className="rounded-xl px-5 py-3 bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 font-semibold"
            >
              Chat on WhatsApp
            </Link>
            <Link
              href="/packages"
              className="rounded-xl px-5 py-3 border border-white/20 hover:border-white/40"
            >
              See Promotion Packages
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="max-w-6xl mx-auto px-4 py-10 text-sm text-white/70">
          <div className="flex flex-col md:flex-row justify-between gap-6">
            <div>
              <div className="font-semibold text-white">TokMarket.Live</div>
              <div>Shop creator-promoted products in Mauritius.</div>
            </div>
            <div className="space-y-1">
              <Link href="/about" className="hover:text-white">About</Link><br />
              <Link href="/contact" className="hover:text-white">Contact</Link><br />
              <Link href="/policy" className="hover:text-white">Refund & Dispute Policy</Link>
            </div>
            <div>
              Support: <a className="hover:text-white" href="mailto:hello@tokmarket.live">hello@tokmarket.live</a>
              <div>WhatsApp: <a className="hover:text-white" href="https://wa.me/23054960101" target="_blank">+230 5496 0101</a></div>
            </div>
          </div>
        </div>
      </footer>

      {/* Juice Modal */}
      {juiceOpen && (
        <JuiceModal
          product={juiceOpen}
          onClose={() => setJuiceOpen(null)}
          juiceNumber={JUICE_NUMBER}
        />
      )}

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/23054960101?text=Hi%20TokMarket,%20I%20need%20help%20with%20a%20purchase."
        target="_blank"
        className="fixed bottom-4 right-4 z-50 rounded-full shadow-lg bg-green-500/90 hover:bg-green-500 text-white px-5 py-3 font-semibold"
        aria-label="Chat on WhatsApp"
      >
        WhatsApp
      </a>
    </main>
  );
}

function ProductCard({
  product,
  onJuice,
}: {
  product: Product;
  onJuice: () => void;
}) {
  const usd = product.priceMur * MUR_TO_USD;
  const payUrl = paypalBuyLink({
    business: PAYPAL_BUSINESS_EMAIL,
    itemName: product.title,
    amountUsd: usd,
  });

  return (
    <div className="group rounded-3xl overflow-hidden border border-white/10 bg-slate-900/60 hover:bg-slate-900 transition">
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-cover group-hover:scale-[1.02] transition"
        />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold">{product.title}</h3>
          {product.featured && (
            <span className="text-xs px-2 py-1 rounded-full bg-cyan-500/20 border border-cyan-400/40 text-cyan-300">
              Featured
            </span>
          )}
        </div>
        <div className="mt-1 text-sm text-white/70">Seller: {product.seller}</div>
        <div className="mt-2 flex items-baseline gap-2">
          <div className="text-xl font-bold">Rs {product.priceMur}</div>
          <div className="text-white/60 text-sm">(~${(usd).toFixed(2)})</div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <a
            href={payUrl}
            target="_blank"
            className="text-center rounded-xl px-3 py-2 bg-white text-slate-900 font-semibold hover:opacity-90"
          >
            Buy with PayPal
          </a>
          <button
            onClick={onJuice}
            className="rounded-xl px-3 py-2 border border-white/20 hover:border-white/40"
          >
            Pay with Juice
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-3xl border border-white/10 p-10 text-center bg-slate-900/60">
      <div className="text-2xl font-semibold">No products yet</div>
      <p className="mt-2 text-white/70">
        Be the first to sell your product on TokMarket. Get featured this week.
      </p>
      <a
        href="#sell"
        className="inline-block mt-5 rounded-2xl px-5 py-3 bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 font-semibold"
      >
        List your product
      </a>
    </div>
  );
}

function JuiceModal({
  product,
  onClose,
  juiceNumber,
}: {
  product: Product;
  onClose: () => void;
  juiceNumber: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(juiceNumber);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900">
        <div className="p-5 border-b border-white/10 flex items-center justify-between">
          <div className="font-semibold">Pay with Juice</div>
          <button onClick={onClose} className="text-white/70 hover:text-white">✕</button>
        </div>
        <div className="p-5 space-y-4">
          <div className="text-white/80 text-sm">
            To purchase <span className="font-semibold text-white">{product.title}</span>, send a Juice payment to:
          </div>
          <div className="flex items-center justify-between rounded-xl border border-white/20 p-3">
            <div>
              <div className="text-xs text-white/60">Juice Number</div>
              <div className="text-lg font-bold">{juiceNumber}</div>
            </div>
            <button onClick={copy} className="rounded-lg px-3 py-2 border border-white/20 hover:border-white/40">
              {copied ? 'Copied ✓' : 'Copy'}
            </button>
          </div>
          <ol className="list-decimal list-inside text-white/70 text-sm space-y-1">
            <li>Open your MCB Juice app.</li>
            <li>Send amount: <span className="text-white font-semibold">Rs {product.priceMur}</span>.</li>
            <li>Reference: <span className="text-white font-semibold">{product.title}</span>.</li>
            <li>Send screenshot on WhatsApp to verify & receive confirmation.</li>
          </ol>
          <a
            target="_blank"
            href={`https://wa.me/23054960101?text=Hi%20TokMarket,%20I%20paid%20with%20Juice%20for:%20${encodeURIComponent(
              product.title
            )}%20(Rs%20${product.priceMur}).%20Here%27s%20my%20screenshot.`}
            className="block text-center rounded-xl px-4 py-3 bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 font-semibold"
          >
            Send Proof on WhatsApp
          </a>
          <div className="text-xs text-white/50">
            Note: Orders paid via Juice are manually verified. You’ll receive a WhatsApp confirmation shortly.
          </div>
        </div>
      </div>
    </div>
  );
}
