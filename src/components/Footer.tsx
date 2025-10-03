export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950">
      <div className="max-w-6xl mx-auto px-6 py-10 text-sm text-slate-400">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div>© {new Date().getFullYear()} TokMarket.Live · Mauritius</div>
          <nav className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-200">Privacy</a>
            <a href="/terms" className="hover:text-slate-200">Terms</a>
            <a href="/contact" className="hover:text-slate-200">Contact</a>
          </nav>
        </div>
      </div>
    </footer>
  );
}
