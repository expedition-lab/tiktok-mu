'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function MarketplaceClient() {
  useEffect(() => {
    // Footer year
    const y = document.getElementById('year');
    if (y) y.textContent = String(new Date().getFullYear());

    // Smooth scroll for in-page anchors (avoid full navigation)
    const anchorClick = (e: Event) => {
      const a = e.currentTarget as HTMLAnchorElement;
      const href = a.getAttribute('href') || '';
      if (href.startsWith('#')) {
        e.preventDefault();
        const id = href.slice(1);
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    const anchorSelector = 'a[href^="#"]';
    const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>(anchorSelector));
    anchors.forEach((a) => a.addEventListener('click', anchorClick));

    // Load PayPal SDK at runtime (no beforeInteractive in App Router)
    const s = document.createElement('script');
    s.src = 'https://www.paypal.com/sdk/js?client-id=sb&currency=USD';
    s.async = true;
    document.body.appendChild(s);

    // Load products (API or fallback)
    (async () => {
      const grid = document.getElementById('market-grid');
      const empty = document.getElementById('empty');
      if (!grid || !empty) return;

      try {
        const r = await fetch('/api/products', { method: 'GET', cache: 'no-store' });
        if (!r.ok) throw new Error('No API');
        const { products } = (await r.json()) as { products: ApiProduct[] };
        if (!products?.length) throw new Error('Empty');

        empty.classList.add('hidden');
        grid.innerHTML = products
          .map(
            (p) => `
          <article class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
            <img src="${p.image_url || p.img || '/products/serum.jpg'}" alt="${p.title}" class="w-full h-44 object-cover"/>
            <div class="p-4">
              <div class="flex items-center justify-between">
                <h3 class="font-semibold">${p.title}</h3>
                <span class="text-xs rounded-full bg-cyan-500/10 text-indigo-600 px-2 py-1">${p.cat || ''}</span>
              </div>
              <p class="text-slate-600 text-sm">Seller: ${p.seller_name || 'Creator'}</p>
              <p class="text-slate-900 font-medium mt-1">Rs ${Number(
                p.price_mur ?? p.priceMUR ?? 0
              ).toLocaleString()}</p>
            </div>
          </article>`
          )
          .join('');
      } catch {
        // Demo fallback (no navigation)
        empty.classList.add('hidden');
        const grid = document.getElementById('market-grid');
        if (grid)
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

    // SELL form: intercept submit to avoid navigation
    const sellForm = document.getElementById('sell-form') as HTMLFormElement | null;
    const sellStatus = document.getElementById('sell-status');
    const sellImage = document.getElementById('sell-image') as HTMLInputElement | null;

    const onImageChange = () => {
      if (!sellImage) return;
      const file = sellImage.files?.[0];
      if (!file) return;
      if (!/^image\/(png|jpe?g)$/.test(file.type)) {
        alert('Only JPG/PNG allowed');
        sellImage.value = '';
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert('Max 2MB');
        sellImage.value = '';
        return;
      }
    };

    const onSubmit = async (e: Event) => {
      e.preventDefault(); // <— stop full page navigation

      const title = (document.getElementById('sell-title') as HTMLInputElement)?.value.trim();
      const category = (document.getElementById('sell-cat') as HTMLSelectElement)?.value;
      const price = parseInt((document.getElementById('sell-price') as HTMLInputElement)?.value || '0', 10);
      const stock = parseInt((document.getElementById('sell-stock') as HTMLInputElement)?.value || '0', 10);
      const desc = (document.getElementById('sell-desc') as HTMLTextAreaElement)?.value.trim();
      const file = sellImage?.files?.[0];

      if (!title || !category || !price || !stock || !file) {
        if (sellStatus) sellStatus.textContent = 'Please complete all required fields.';
        return;
      }

      const form = new FormData();
      form.append('title', title);
      form.append('cat', category);
      form.append('priceMUR', String(price));
      form.append('stock', String(stock));
      form.append('description', desc);
      form.append('image', file);

      try {
        // If your API is ready, keep this:
        const res = await fetch('/api/products', { method: 'POST', body: form });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((data as { error?: string }).error || 'Upload failed');

        if (sellStatus) sellStatus.textContent = '✅ Product submitted.';
        (sellForm as HTMLFormElement)?.reset();
        // Refresh grid (no navigation)
        const r = await fetch('/api/products', { cache: 'no-store' });
        if (r.ok) {
          const { products } = (await r.json()) as { products: ApiProduct[] };
          const grid = document.getElementById('market-grid');
          const empty = document.getElementById('empty');
          if (grid && empty) {
            empty.classList.toggle('hidden', !!products?.length);
            grid.innerHTML = (products || [])
              .map(
                (p) => `
                <article class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
                  <img src="${p.image_url || p.img || '/products/serum.jpg'}" alt="${p.title}" class="w-full h-44 object-cover"/>
                  <div class="p-4">
                    <div class="flex items-center justify-between">
                      <h3 class="font-semibold">${p.title}</h3>
                      <span class="text-xs rounded-full bg-cyan-500/10 text-indigo-600 px-2 py-1">${p.cat || ''}</span>
                    </div>
                    <p class="text-slate-600 text-sm">Seller: ${p.seller_name || 'Creator'}</p>
                    <p class="text-slate-900 font-medium mt-1">Rs ${Number(
                      p.price_mur ?? p.priceMUR ?? 0
                    ).toLocaleString()}</p>
                  </div>
                </article>`
              )
              .join('');
          }
        }
      } catch (err) {
        console.error(err);
        if (sellStatus) sellStatus.textContent = '❌ Failed to submit. Please try again.';
      }
    };

    sellImage?.addEventListener('change', onImageChange);
    sellForm?.addEventListener('submit', onSubmit);

    return () => {
      // cleanup
      document.body.removeChild(s);
      anchors.forEach((a) => a.removeEventListener('click', anchorClick));
      sellImage?.removeEventListener('change', onImageChange);
      sellForm?.removeEventListener('submit', onSubmit);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-slate-900/90 text-white backdrop-blur border-b border-slate-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Image src="/logo.png" alt="TokMarket.Live logo" width={32} height={32} />
            <span>TokMarket.Live</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm">
            <Link href="/#how" className="text-white/80 hover:text-cyan-400">How it works</Link>
            <Link href="/#creators" className="text-white/80 hover:text-cyan-400">Creators</Link>
            <Link href="/marketplace" className="text-white hover:text-cyan-400 font-semibold">Market</Link>
            <Link href="/#pricing" className="text-white/80 hover:text-cyan-400">Pricing</Link>
            <Link href="/#faq" className="text-white/80 hover:text-cyan-400">FAQ</Link>
          </nav>
          <div className="flex items-center gap-3">
            <button
              id="btn-cart"
              type="button" /* prevent implicit form submit */
              className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/20 hover:bg-white/10"
              aria-label="Open cart"
            >
              <span>Cart</span>
              <span className="inline-flex items-center justify-center text-xs min-w-5 h-5 rounded-full bg-pink-500 text-white px-1">0</span>
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
              <a href="#sell" className="rounded-xl text-white px-5 py-3" style={{ background: 'linear-gradient(90deg,#ff0050,#00f2ea)' }}>
                Sell a product
              </a>
              <a href="#grid" className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/10 text-white">
                Browse products
              </a>
            </div>
            <p className="mt-3 text-xs text-slate-500">🔒 Escrow payouts • 💳 Juice & PayPal • 🛡️ Dispute support</p>
          </div>
          <div className="relative">
            <div className="rounded-2xl shadow-[0_8px_30px_rgba(2,8,23,.08)] bg-[rgba(255,255,255,.65)] backdrop-blur p-4">
              <Image src="/hero-live.jpg" alt="Marketplace preview" width={1200} height={800} className="rounded-xl w-full h-auto object-cover" priority />
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
              <input id="q" type="search" placeholder="Search products…" className="w-full sm:w-72 rounded-xl border border-slate-300 px-4 py-2" />
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
          <div id="market-grid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
          <div id="empty" className="hidden text-slate-500">No products yet.</div>
        </div>
      </section>

      {/* Sell form */}
      <section id="sell" className="py-10 bg-slate-50 border-y border-slate-200">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-white border border-slate-200 p-5">
            <h3 className="font-semibold mb-2">Sell a product</h3>
            <p className="text-slate-600 text-sm mb-4">Upload with image, price and stock. Appears instantly.</p>
            <form id="sell-form" className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input id="sell-title" className="rounded-xl border border-slate-300 px-3 py-2" placeholder="Title" required />
                <select id="sell-cat" className="rounded-xl border border-slate-300 px-3 py-2" required>
                  <option value="">Category…</option>
                  <option>Beauty</option><option>Fashion</option><option>Food</option><option>Tech</option><option>Fitness</option>
                </select>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <input id="sell-price" type="number" min={1} step={1} className="rounded-xl border border-slate-300 px-3 py-2" placeholder="Price (MUR)" required />
                <input id="sell-stock" type="number" min={1} step={1} className="rounded-xl border border-slate-300 px-3 py-2" placeholder="Stock" required />
              </div>
              <input id="sell-image" type="file" accept="image/png, image/jpeg" />
              <textarea id="sell-desc" rows={3} className="w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Short details…" />
              <div className="flex gap-3 items-center">
                <button type="submit" className="rounded-xl text-white px-5 py-2" style={{ background: 'linear-gradient(90deg,#ff0050,#00f2ea)' }}>
                  Submit product
                </button>
                <div id="sell-status" className="text-sm text-slate-600"></div>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-8">
        © <span id="year"></span> TokMarket.Live • Mauritius
      </footer>
    </div>
  );
}
