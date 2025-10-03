export default function Categories() {
  const cats = ["Fashion", "Beauty", "Food", "Travel", "Tech", "Music"];
  return (
    <section className="bg-slate-950 border-t border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-16">
        <h2 className="text-2xl md:text-3xl font-bold text-white text-center">Browse by category</h2>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {cats.map((c) => (
            <a
              key={c}
              href={`/creators?category=${encodeURIComponent(c)}`}
              className="rounded-xl px-4 py-2 bg-slate-900 text-slate-200 border border-white/10 hover:border-cyan-400/40"
            >
              {c}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
