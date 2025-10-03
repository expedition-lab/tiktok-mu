import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import NextImage from "next/image";

/** ---------- Types (no `any`) ---------- */
type ApiProduct = {
  id: string;
  title: string;
  image_url?: string;
  img?: string;
  price_mur?: number;
  priceMUR?: number;
  cat?: string;
  seller_name?: string;
};

/** Page component */
export default function MarketplacePage() {
  useEffect(() => {
    // Footer year
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());

    // Load PayPal after interactive (no beforeInteractive)
    const script = document.createElement("script");
    script.src = "https://www.paypal.com/sdk/js?client-id=sb&currency=USD";
    script.async = true;
    document.body.appendChild(script);

    // Minimal product fallback so grid isn’t empty if /api/products is not ready
    (async () => {
      const grid = document.getElementById("market-grid");
      const empty = document.getElementById("empty");
      if (!grid || !empty) return;

      try {
        const r = await fetch("/api/products");
        if (!r.ok) throw new Error("No API");
        const { products } = (await r.json()) as { products: ApiProduct[] };
        if (!products || !products.length) throw new Error("Empty");

        empty.classList.add("hidden");
        grid.innerHTML = products
          .map(
            (p) => `
          <article class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
            <img src="${p.image_url || p.img || "/products/serum.jpg"}" alt="${p.title}" class="w-full h-44 object-cover"/>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">${p.title}</h3>
                <span class="text-xs rounded-full bg-cyan-500/10 text-indigo-600 px-2 py-1">${p.cat || ""}</span>
              </div>
              <p class="text-slate-600 text-sm">Seller: ${p.seller_name || "Creator"}</p>
              <p class="text-slate-900 font-medium mt-1">Rs ${Number(
                p.price_mur ?? p.priceMUR ?? 0
              ).toLocaleString()}</p>
            </div>
          </article>`
          )
          .join("");
      } catch {
        // Demo placeholders if API not wired yet
        empty.classList.add("hidden");
        grid.innerHTML = `
          <article class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/products/serum.jpg" class="w-full h-44 object-cover" alt="Glow Serum"/>
            <div class="p-4"><h3 class="font-semibold">Glow Serum 30ml</h3><p>Rs 1200</p></div>
          </article>
          <article class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/products/tee.jpg" class="w-full h-44 object-cover" alt="Island Tee"/>
            <div class="p-4"><h3 class="font-semibold">Island Tee — L size</h3><p>Rs 950</p></div>
          </article>
          <article class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm">
            <img src="/products/protein.jpg" class="w-full h-44 object-cover" alt="Protein Bar"/>
            <div class="p-4"><h3 class="font-semibold">Protein Bar (12x)</h3><p>Rs 1500</p></div>
          </article>`;
      }
    })();

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      <Head>
        <title>Marketplace — TokMarket.Live</title>
        <meta
          name="description"
          content="Buy and sell products promoted by TikTok creators on TokMarket.Live. Secure checkout via PayPal or Juice."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/90 text-white backdrop-blur border-b border-slate-800">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <NextImage src="/logo.png" alt="TokMarket.Live logo" width={32} height={32} />
              <span>TokMarket.Live</span>
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/#how" className="text-white/80 hover:text-cyan-400">
                How it works
              </Link>
              <Link href="/#creators" className="text-white/80 hover:text-cyan-400">
                Creators
              </Link>
              <Link href="/marketplace" className="text-white hover:text-cyan-400 font-semibold">
                Market
              </Link>
              <Link href="/#pricing" className="text-white/80 hover:text-cyan-400">
                Pricing
              </Link>
              <Link href="/#faq" className="text-white/80 hover:text-cyan-400">
                FAQ
              </Link>
            </nav>
            <div className="flex items-center gap-3">
              <button
                id="btn-cart"
                className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/20 hover:bg-white/10"
                aria-label="Open cart"
              >
                <span>Cart</span>
                <span className="inline-flex items-center justify-center text-xs min-w-5 h-5 rounded-full bg-pink-500 text-white px-1">
                  0
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-slate-950 text-slate-100">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">Marketplace</h1>
              <p className="mt-3 text-slate-400 text-lg">
                Shop creator-promoted products. Secure checkout via PayPal or Juice.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#sell"
                  className="rounded-xl text-white px-5 py-3"
                  style={{ background: "linear-gradient(90deg,#ff0050,#00f2ea)" }}
                >
                  Sell a product
                </a>
                <a
                  href="#grid"
                  className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/10 text-white"
                >
                  Browse products
                </a>
              </div>
              <p className="mt-3 text-xs text-slate-500">
                🔒 Escrow payouts • 💳 Juice & PayPal • 🛡️ Dispute support
              </p>
            </div>
            <div className="relative">
              <div className="rounded-2xl shadow-[0_8px_30px_rgba(2,8,23,.08)] bg-[rgba(255,255,255,.65)] backdrop-blur p-4">
                <NextImage
                  src="/hero-live.jpg"
                  alt="Marketplace preview"
                  width={1200}
                  height={800}
                  className="rounded-xl w-full h-auto object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-slate-200">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold">Products</h2>
                <p className="text-slate-600 text-sm">Real listings appear automatically when creators submit.</p>
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto">
                <input
                  id="q"
                  type="search"
                  placeholder="Search products…"
                  className="w-full sm:w-72 rounded-xl border border-slate-300 px-4 py-2"
                />
                <select id="cat" className="rounded-xl border border-slate-300 px-3 py-2">
                  <option value="">All categories</option>
                  <option>Beauty</option>
                  <option>Fashion</option>
                  <option>Food</option>
                  <option>Tech</option>
                  <option>Fitness</option>
                </select>
              </div>
            </div>
          </div>
        </section>

        {/* Grid */}
        <section id="grid" className="py-10">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div id="market-grid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6" />
            <div id="empty" className="hidden text-slate-500">
              No products yet.
            </div>
          </div>
        </section>

        {/* Sell panel (UI only; POST handled by /api/products on your server) */}
        <section id="sell" className="py-10 bg-slate-50 border-y border-slate-200">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
            <div className="rounded-2xl bg-white border border-slate-200 p-5">
              <h3 className="font-semibold mb-2">Sell a product</h3>
              <p className="text-slate-600 text-sm mb-4">
                Upload with image, price and stock. Appears instantly.
              </p>
              <form id="sell-form" className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    id="sell-title"
                    className="rounded-xl border border-slate-300 px-3 py-2"
                    placeholder="Title"
                    required
                  />
                  <select id="sell-cat" className="rounded-xl border border-slate-300 px-3 py-2" required>
                    <option value="">Category…</option>
                    <option>Beauty</option>
                    <option>Fashion</option>
                    <option>Food</option>
                    <option>Tech</option>
                    <option>Fitness</option>
                  </select>
                </div>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input
                    id="sell-price"
                    type="number"
                    min={1}
                    step={1}
                    className="rounded-xl border border-slate-300 px-3 py-2"
                    placeholder="Price (MUR)"
                    required
                  />
                  <input
                    id="sell-stock"
                    type="number"
                    min={1}
                    step={1}
                    className="rounded-xl border border-slate-300 px-3 py-2"
                    placeholder="Stock"
                    required
                  />
                </div>
                <input id="sell-image" type="file" accept="image/png, image/jpeg" />
                <textarea
                  id="sell-desc"
                  rows={3}
                  className="w-full rounded-xl border border-slate-300 px-3 py-2"
                  placeholder="Short details…"
                />
                <div className="flex gap-3 items-center">
                  <button
                    className="rounded-xl text-white px-5 py-2"
                    style={{ background: "linear-gradient(90deg,#ff0050,#00f2ea)" }}
                    type="submit"
                  >
                    Submit product
                  </button>
                  <div id="sell-status" className="text-sm text-slate-600" />
                </div>
              </form>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-500 py-8">
          © <span id="year" /> TokMarket.Live • Mauritius
        </footer>
      </div>
    </>
  );
}
