"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname() || "/"; // guard SSR null

  const LinkItem = ({ href, label }: { href: string; label: string }) => {
    const active = pathname === href || pathname.startsWith(href + "/");
    return (
      <Link
        href={href}
        className={`text-white/80 hover:text-cyan-400 transition ${
          active ? "text-white font-semibold" : ""
        }`}
      >
        {label}
      </Link>
    );
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-slate-950/80 backdrop-blur border-b border-white/10">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="text-white font-bold tracking-tight">TokMarket.Live</Link>
        <nav className="hidden md:flex items-center gap-6">
          <LinkItem href="/" label="How it works" />
          <LinkItem href="/creators" label="Creators" />
          <LinkItem href="/marketplace" label="Market" />
          <LinkItem href="/pricing" label="Pricing" />
          <LinkItem href="/faq" label="FAQ" />
        </nav>
        <Link
          href="/cart"
          className="rounded-xl px-4 py-2 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-medium"
        >
          Cart
        </Link>
      </div>
    </header>
  );
}
