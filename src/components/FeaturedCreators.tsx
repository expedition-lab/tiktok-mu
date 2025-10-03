type Card = { handle: string; niche: string; price: number; views: string };
const demo: Card[] = [
  { handle: "@aisha.mu", niche: "Beauty • Fashion", price: 1200, views: "12k avg" },
  { handle: "@sam_beach", niche: "Travel • Resorts", price: 1500, views: "18k avg" },
  { handle: "@food.mu", niche: "Food • Restaurants", price: 950, views: "9k avg" },
  { handle: "@tech.mu", niche: "Tech • Gadgets", price: 1600, views: "15k avg" },
];

export default function FeaturedCreators() {
  return (
    <section className="bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-bold text-white">Featured creators</h2>
          <a href="/creators" className="text-cyan-300 hover:text-cyan-200">View all</a>
        </div>
        <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          {demo.map((c) => (
            <div key={c.handle} className="rounded-2xl bg-slate-900 border border-white/10 overflow-hidden">
              <div className="aspect-[4/3] bg-slate-800" />
              <div className="p-4">
                <div className="text-white font-semibold">{c.handle}</div>
                <div className="text-slate-300 text-sm">{c.niche}</div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="text-white/90">from Rs {c.price}</div>
                  <div className="text-slate-400 text-sm">{c.views}</div>
                </div>
                <a
                  href={`/creators/${encodeURIComponent(c.handle.replace("@", ""))}`}
                  className="mt-3 inline-block w-full text-center rounded-xl px-4 py-2 bg-white/10 text-white ring-1 ring-white/15"
                >
                  View profile
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
