import Head from "next/head";
import Script from "next/script";
import React, { useEffect } from "react";

export default function Marketplace() {
  useEffect(() => {
    // ===== Your original inline JS, moved into useEffect =====

    // Tailwind runtime config (same as your <script> block)
    // @ts-ignore
    if (typeof window !== "undefined" && (window as any).tailwind) {
      // nothing to do; CDN script handles it
    }

    const MUR_TO_USD = 0.022;
    const BUYER_FEE_RATE = 0.02;
    const MIN_BUYER_FEE_MUR = 20;
    const computeBuyerFee = (subtotalMur: number) =>
      !subtotalMur ? 0 : Math.max(Math.round(subtotalMur * BUYER_FEE_RATE), MIN_BUYER_FEE_MUR);

    const marketGrid = document.getElementById("market-grid") as HTMLDivElement | null;
    const emptyEl = document.getElementById("empty") as HTMLDivElement | null;
    const q = document.getElementById("q") as HTMLInputElement | null;
    const cat = document.getElementById("cat") as HTMLSelectElement | null;

    const cart: Array<any> = [];
    const cartCount = document.getElementById("cart-count");
    const cartDrawer = document.getElementById("cart-drawer");
    const cartBackdrop = document.getElementById("cart-backdrop");
    const cartClose = document.getElementById("cart-close");
    const cartBtn = document.getElementById("btn-cart");
    const cartItems = document.getElementById("cart-items");
    const cartSubtotal = document.getElementById("cart-subtotal");

    let products: Array<any> = [];

    function productMatches(p: any) {
      const qq = (q?.value || "").toLowerCase();
      if (qq && !p.title.toLowerCase().includes(qq)) return false;
      if (cat?.value && p.cat !== cat.value) return false;
      return true;
    }

    function renderProducts() {
      if (!marketGrid) return;
      const visible = products.filter(productMatches);
      if (emptyEl) emptyEl.classList.toggle("hidden", visible.length !== 0);
      marketGrid.innerHTML = visible
        .map(
          (p) => `
        <article class="rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-md transition">
          <img src="${p.img}" alt="${p.title}" class="w-full h-44 object-cover" loading="lazy" decoding="async"/>
          <div class="p-4">
            <div class="flex items-center justify-between">
              <h3 class="font-semibold">${p.title}</h3>
              <span class="text-xs rounded-full bg-brand-cyan/10 text-brand-indigo px-2 py-1">${p.cat}</span>
            </div>
            <p class="text-slate-600 text-sm">Seller: ${p.seller || "Creator"}</p>
            <p class="text-slate-900 font-medium mt-1">Rs ${Number(p.priceMUR).toLocaleString()}</p>
            <button class="mt-3 w-full rounded-xl btn-primary px-4 py-2" onclick='window.addToCart("${p.id}")'>Add to cart</button>
          </div>
        </article>`
        )
        .join("");
    }

    async function loadProducts() {
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw 0;
        const { products: rows } = await res.json();
        products = (rows || []).map((r: any) => ({
          id: r.id,
          title: r.title,
          cat: r.cat,
          priceMUR: Number(r.price_mur || r.priceMUR || 0),
          seller: r.seller_name || "Creator",
          img: r.image_url || r.img,
        }));
      } catch {
        products = [
          { id: "p1", title: "Glow Serum 30ml", cat: "Beauty", priceMUR: 1200, seller: "Aisha", img: "/products/serum.jpg" },
          { id: "p2", title: "Island Tee — L size", cat: "Fashion", priceMUR: 950, seller: "Kevin", img: "/products/tee.jpg" },
          { id: "p3", title: "Protein Bar (12x)", cat: "Fitness", priceMUR: 1500, seller: "Rai", img: "/products/protein.jpg" },
        ];
      }
      renderProducts();
    }

    function openCart() { cartDrawer?.classList.remove("hidden"); }
    function closeCart() { cartDrawer?.classList.add("hidden"); }

    function updateCart() {
      const count = cart.reduce((n, i) => n + i.qty, 0);
      if (cartCount) cartCount.textContent = String(count);
      if (!cartItems) return;
      cartItems.innerHTML = cart
        .map(
          (i) => `
        <div class="py-3 flex gap-3 items-center">
          <img src="${i.img}" alt="${i.title}" class="w-16 h-16 rounded-lg object-cover" loading="lazy"/>
          <div class="flex-1">
            <div class="font-medium">${i.title}</div>
            <div class="text-xs text-slate-500">Seller: ${i.seller || "Creator"}</div>
            <div class="mt-1 text-sm">Rs ${(i.priceMUR * i.qty).toLocaleString()}</div>
          </div>
          <div class="flex items-center gap-2">
            <button class="rounded-lg border px-2" onclick='window.changeQty("${i.id}",-1)'>−</button>
            <span>${i.qty}</span>
            <button class="rounded-lg border px-2" onclick='window.changeQty("${i.id}",1)'>+</button>
            <button class="ml-2 text-brand-indigo" onclick='window.removeFromCart("${i.id}")'>Remove</button>
          </div>
        </div>`
        )
        .join("");

      const subtotalMur = cart.reduce((n, i) => n + i.priceMUR * i.qty, 0);
      if (cartSubtotal) cartSubtotal.textContent = `Rs ${subtotalMur.toLocaleString()}`;
      const buyerFee = computeBuyerFee(subtotalMur);
      const totalMur = subtotalMur + buyerFee;
      const elBuyer = document.getElementById("cart-buyer-fee");
      const elTotal = document.getElementById("cart-total");
      if (elBuyer) elBuyer.textContent = `Rs ${buyerFee.toLocaleString()}`;
      if (elTotal) elTotal.textContent = `Rs ${totalMur.toLocaleString()}`;
      renderPayPal(totalMur);
    }

    // expose handlers for inline onclick strings we inject
    (window as any).addToCart = (id: string) => {
      const p = products.find((x: any) => x.id === id);
      if (!p) return;
      const existing = cart.find((x: any) => x.id === id);
      if (existing) existing.qty += 1;
      else cart.push({ ...p, qty: 1 });
      updateCart(); openCart();
    };
    (window as any).removeFromCart = (id: string) => {
      const i = cart.findIndex((x: any) => x.id === id);
      if (i > -1) cart.splice(i, 1);
      updateCart();
    };
    (window as any).changeQty = (id: string, delta: number) => {
      const item = cart.find((x: any) => x.id === id);
      if (!item) return;
      item.qty = Math.max(1, item.qty + delta);
      updateCart();
    };

    function renderPayPal(amountMUR: number) {
      // @ts-ignore
      const paypal = (window as any).paypal;
      const usd = Math.max(1, Math.round(amountMUR * MUR_TO_USD));
      const el = document.getElementById("paypal-container");
      if (!el || typeof paypal === "undefined") return;
      el.innerHTML = "";
      paypal
        .Buttons({
          createOrder: (_data: any, actions: any) =>
            actions.order.create({ purchase_units: [{ amount: { value: String(usd) } }] }),
          onApprove: async (data: any, actions: any) => {
            try {
              await actions.order.capture();
              const subtotalMur = cart.reduce((n: number, i: any) => n + i.priceMUR * i.qty, 0);
              const buyer_fee = computeBuyerFee(subtotalMur);
              const payload = {
                items: cart.map((i: any) => ({ product_id: i.id, qty: i.qty, price_mur: i.priceMUR })),
                payment_method: "paypal",
                external_ref: data.orderID,
                status: "paid",
                buyer_fee_mur: buyer_fee,
              };
              const r = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
              });
              const j = await r.json();
              if (!r.ok) throw new Error(j.error || "Order create failed");
              alert("Payment successful via PayPal. Order " + (j.id || data.orderID) + " created.");
              cart.splice(0, cart.length);
              updateCart();
              closeCart();
            } catch (err) {
              console.error("PayPal onApprove failed", err);
              alert(
                "Payment succeeded but we could not save your order automatically. Please contact support with PayPal ID " +
                  // @ts-ignore
                  (data?.orderID || "") +
                  ". Items remain in your cart."
              );
            }
          },
        })
        .render("#paypal-container");
    }

    // Juice submit
    const juiceBtn = document.getElementById("juice-paid");
    juiceBtn?.addEventListener("click", async () => {
      const refEl = document.getElementById("juice-ref") as HTMLInputElement | null;
      const ref = refEl?.value.trim() || "";
      if (!ref) {
        alert("Enter your Juice reference.");
        return;
      }

      const subtotalMur = cart.reduce((n, i) => n + i.priceMUR * i.qty, 0);
      const buyer_fee = computeBuyerFee(subtotalMur);

      const payload = {
        items: cart.map((i) => ({ product_id: i.id, qty: i.qty, price_mur: i.priceMUR })),
        payment_method: "juice",
        external_ref: ref,
        status: "awaiting_payment",
        buyer_fee_mur: buyer_fee,
      };

      try {
        const r = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const j = await r.json();
        if (!r.ok) throw new Error(j.error || "Order create failed");
        alert("Juice reference submitted. Order " + j.id + " awaiting review.");
        cart.splice(0, cart.length);
        updateCart();
        closeCart();
      } catch (e) {
        alert("Could not create order. Please try again.");
      }
    });

    // Sell form
    const sellForm = document.getElementById("sell-form") as HTMLFormElement | null;
    const sellImg = document.getElementById("sell-image") as HTMLInputElement | null;
    const sellPreview = document.getElementById("sell-preview") as HTMLImageElement | null;
    const sellStatus = document.getElementById("sell-status") as HTMLDivElement | null;

    sellImg?.addEventListener("change", () => {
      const file = sellImg.files?.[0];
      if (!file) return;
      if (!/^image\/(png|jpe?g)$/.test(file.type)) {
        alert("Only JPG/PNG allowed");
        sellImg.value = "";
        return;
      }
      if (file.size > 2 * 1024 * 1024) {
        alert("Max 2MB");
        sellImg.value = "";
        return;
      }
      const url = URL.createObjectURL(file);
      if (sellPreview) {
        sellPreview.src = url;
        sellPreview.classList.remove("hidden");
      }
    });

    sellForm?.addEventListener("submit", async (e) => {
      e.preventDefault();
      if (!sellStatus) return;
      sellStatus.textContent = "";
      const title = (document.getElementById("sell-title") as HTMLInputElement).value.trim();
      const category = (document.getElementById("sell-cat") as HTMLSelectElement).value;
      const price = parseInt((document.getElementById("sell-price") as HTMLInputElement).value, 10);
      const stock = parseInt((document.getElementById("sell-stock") as HTMLInputElement).value, 10);
      const desc = (document.getElementById("sell-desc") as HTMLTextAreaElement).value.trim();
      const file = sellImg?.files?.[0] || null;
      if (!title || !category || !price || !stock || !file) {
        sellStatus.textContent = "Please complete all required fields.";
        return;
      }
      const form = new FormData();
      form.append("title", title);
      form.append("cat", category);
      form.append("priceMUR", String(price));
      form.append("stock", String(stock));
      form.append("description", desc);
      form.append("image", file);

      try {
        const res = await fetch("/api/products", { method: "POST", body: form });
        const data = await res.json().catch(() => ({}));
        if (!res.ok) throw new Error((data as any).error || "Upload failed");
        sellStatus.textContent = "✅ Product submitted.";
        (e.target as HTMLFormElement).reset();
        sellPreview?.classList.add("hidden");
        await loadProducts();
      } catch (err) {
        console.error(err);
        sellStatus.textContent = "❌ Failed to submit. Please try again.";
      }
    });

    // Init
    const yearEl = document.getElementById("year");
    if (yearEl) yearEl.textContent = String(new Date().getFullYear());
    loadProducts();

    // Self-tests
    try {
      console.assert(computeBuyerFee(0) === 0, "fee: 0");
      console.assert(computeBuyerFee(500) === 20, "fee: min");
      console.assert(computeBuyerFee(10000) === 200, "fee: 2%");
    } catch (e) {
      console.warn("Self-test fail", e);
    }
  }, []);

  return (
    <>
      <Head>
        <title>Marketplace — TokMarket.Live</title>
        <meta
          name="description"
          content="Buy and sell products promoted by TikTok creators on TokMarket.Live. Secure checkout via PayPal or Juice."
        />
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#ff0050" />
      </Head>

      {/* Tailwind CDN and runtime config */}
      <Script src="https://cdn.tailwindcss.com" strategy="beforeInteractive" />
      <Script id="tw-config" strategy="beforeInteractive">{`
        tailwind.config = {
          theme: { extend: { colors: { brand: { DEFAULT:"#0f172a", pink:"#ff0050", cyan:"#00f2ea", indigo:"#4f46e5" } }, boxShadow: { soft: "0 8px 30px rgba(2,8,23,.08)" } } }
        };
      `}</Script>

      {/* PayPal SDK */}
      <Script src="https://www.paypal.com/sdk/js?client-id=sb&currency=USD" strategy="afterInteractive" />

      {/* === HTML (same structure as your static page) === */}
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-slate-900/90 text-white backdrop-blur border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between">
            <a href="/" className="flex items-center gap-2 font-semibold">
              <img src="/logo.png" alt="TokMarket.Live logo" className="w-8 h-8" />
              <span>TokMarket.Live</span>
            </a>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <a href="/#how" className="text-white/80 hover:text-brand-cyan">How it works</a>
              <a href="/#creators" className="text-white/80 hover:text-brand-cyan">Creators</a>
              <a href="/marketplace" className="text-white hover:text-brand-cyan font-semibold">Market</a>
              <a href="/#pricing" className="text-white/80 hover:text-brand-cyan">Pricing</a>
              <a href="/#faq" className="text-white/80 hover:text-brand-cyan">FAQ</a>
            </nav>
            <div className="flex items-center gap-3">
              <button id="btn-cart" className="relative inline-flex items-center gap-2 rounded-xl px-3 py-2 border border-white/20 hover:bg-white/10" aria-label="Open cart">
                <span>Cart</span>
                <span id="cart-count" className="inline-flex items-center justify-center text-xs min-w-5 h-5 rounded-full bg-brand-pink text-white px-1">0</span>
              </button>
            </div>
          </div>
        </header>

        {/* Hero */}
        <section className="bg-slate-950 text-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 lg:py-16 grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h1 className="text-3xl sm:text-5xl font-extrabold leading-tight">Marketplace</h1>
              <p className="mt-3 text-slate-400 text-lg">Shop creator-promoted products. Secure checkout via PayPal or Juice. Sellers get paid after delivery.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href="#sell" className="rounded-xl btn-primary px-5 py-3">Sell a product</a>
                <a href="#grid" className="rounded-xl border border-white/20 px-5 py-3 hover:bg-white/10 text-white">Browse products</a>
              </div>
              <p className="mt-3 text-xs text-slate-500">🔒 Escrow payouts • 💳 Juice & PayPal • 🛡️ Dispute support</p>
            </div>
            <div className="relative">
              <div className="rounded-2xl shadow-[0_8px_30px_rgba(2,8,23,.08)] bg-[rgba(255,255,255,.65)] backdrop-blur p-4">
                <img src="/hero-live.jpg" alt="Marketplace preview" className="rounded-xl w-full object-cover" loading="lazy" decoding="async"/>
              </div>
            </div>
          </div>
        </section>

        {/* Filters */}
        <section className="py-6 border-b border-slate-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div id="market-grid" className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"></div>
            <div id="empty" className="hidden text-slate-500">No products yet.</div>
          </div>
        </section>

        {/* Sell panel */}
        <section id="sell" className="py-10 bg-slate-50 border-y border-slate-200">
          <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
            <details className="rounded-2xl bg-white border border-slate-200">
              <summary className="list-none cursor-pointer px-5 py-4 flex items-center justify-between">
                <div>
                  <h3 className="font-semibold">Sell a product</h3>
                  <p className="text-slate-600 text-sm">Upload with image, price and stock. Appears instantly.</p>
                </div>
                <span className="transition-transform">⌃</span>
              </summary>
              <div className="px-5 pb-5 space-y-4">
                <form id="sell-form" className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Title</label>
                      <input id="sell-title" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Glow Serum 30ml" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Category</label>
                      <select id="sell-cat" className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" required>
                        <option value="">Select…</option>
                        <option>Beauty</option>
                        <option>Fashion</option>
                        <option>Food</option>
                        <option>Tech</option>
                        <option>Fitness</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">Price (MUR)</label>
                      <input id="sell-price" type="number" min={1} step={1} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="1200" required />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">Stock</label>
                      <input id="sell-stock" type="number" min={1} step={1} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="100" required />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Cover image (JPG/PNG, max 2MB)</label>
                    <input id="sell-image" type="file" accept="image/png, image/jpeg" className="mt-1" required />
                    <div className="mt-3">
                      <img id="sell-preview" className="hidden w-full max-h-56 object-cover rounded-xl border" alt="Preview" loading="lazy" decoding="async" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium">Description</label>
                    <textarea id="sell-desc" rows={4} className="mt-1 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Short details…"></textarea>
                  </div>
                  <div className="flex gap-3 items-center">
                    <button className="rounded-xl btn-primary px-5 py-2" type="submit">Submit product</button>
                    <div id="sell-status" className="text-sm text-slate-600"></div>
                  </div>
                </form>
              </div>
            </details>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center text-xs text-slate-500 py-8">
          © <span id="year"></span> TokMarket.Live • Mauritius
        </footer>

        {/* Cart Drawer */}
        <div id="cart-drawer" className="fixed inset-0 z-50 hidden">
          <div className="absolute inset-0 bg-black/40" id="cart-backdrop"></div>
          <aside className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl p-5 flex flex-col">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Your cart</h3>
              <button id="cart-close" className="rounded-lg border px-2 py-1">Close</button>
            </div>
            <div id="cart-items" className="mt-4 flex-1 overflow-auto divide-y"></div>
            <div className="pt-4 border-t mt-4">
              <div className="flex items-center justify-between text-sm">
                <span>Subtotal</span>
                <span id="cart-subtotal" className="font-semibold">Rs 0</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span>Buyer fee</span>
                <span id="cart-buyer-fee" className="font-semibold">Rs 0</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-1">
                <span className="font-medium">Total</span>
                <span id="cart-total" className="font-bold">Rs 0</span>
              </div>
              <p className="text-xs text-slate-500 mt-1">For demo, PayPal uses USD. Juice uses MUR. Live FX later.</p>
              <div className="mt-3 grid gap-3">
                <div id="paypal-container"></div>
                <div className="rounded-2xl border border-slate-300 p-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold">Pay with Juice</div>
                      <p className="text-xs text-slate-500">Scan & send. Enter ref to confirm.</p>
                    </div>
                    <img src="/juice-qr.png" alt="Juice QR" className="w-16 h-16 object-contain" loading="lazy" />
                  </div>
                  <input id="juice-ref" className="mt-2 w-full rounded-xl border border-slate-300 px-3 py-2" placeholder="Enter Juice reference" />
                  <button id="juice-paid" className="mt-2 w-full rounded-xl btn-primary px-4 py-2">Mark as paid (Juice)</button>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  );
}
