'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function HeaderNav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + '/');
  const base = "text-white/80 hover:text-cyan-400";
  const active = "text-white font-semibold";

  return (
    <nav aria-label="Primary" className="hidden md:flex items-center gap-6 text-sm">
      <Link href="/#how" className={base}>How it works</Link>
      <Link href="/#creators" className={base}>Creators</Link>
      <Link href="/marketplace" className={isActive('/marketplace') ? active : "text-white hover:text-cyan-400 font-semibold"}>
        Marketplace
      </Link>
      <Link href="/#pricing" className={base}>Pricing</Link>
      <Link href="/#faq" className={base}>FAQ</Link>
    </nav>
  );
}
