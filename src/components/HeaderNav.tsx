// src/components/HeaderNav.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname() ?? "/";

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  const base = "text-white/80 hover:text-cyan-400";
  const active = "text-white font-semibold";

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/70 backdrop-blur">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3">
        <Link href="/" className="text-xl font-bold text-white">
          TokMarket.Live
        </Link>
        <div className="flex gap-6">
          <Link href="/" className={`${base} ${isActive("/") ? active : ""}`}>
            Home
          </Link>
          <Link
            href="/creators"
            className={`${base} ${isActive("/creators") ? active : ""}`}
          >
            Creators
          </Link>
          <Link
            href="/marketplace"
            className={`${base} ${isActive("/marketplace") ? active : ""}`}
          >
            Marketplace
          </Link>
          <Link
            href="/#pricing"
            className={`${base} ${pathname.includes("#pricing") ? active : ""}`}
          >
            Pricing
          </Link>
        </div>
      </nav>
    </header>
  );
}
