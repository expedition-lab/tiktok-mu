'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function HeaderNav() {
  const pathname = usePathname() ?? ""; // normalize null → ""

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(`${href}/`);

  const base = "text-white/80 hover:text-cyan-400";
  const active = "text-white font-semibold";

  return (
    <nav className="flex items-center gap-6">
      <Link className={`${base} ${isActive("/") ? active : ""}`} href="/">Home</Link>
      <Link className={`${base} ${isActive("/marketplace") ? active : ""}`} href="/marketplace">Marketplace</Link>
      <Link className={`${base} ${isActive("/creators") ? active : ""}`} href="/creators">Creators</Link>
      <Link className={`${base} ${isActive("/packages") ? active : ""}`} href="/packages">Packages</Link>
      <Link className={`${base} ${isActive("/contact") ? active : ""}`} href="/contact">Contact</Link>
    </nav>
  );
}
