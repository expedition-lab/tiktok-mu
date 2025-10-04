'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function HeaderNav() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-xl border-b border-white/10">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-pink-500 to-cyan-500 bg-clip-text text-transparent">
              TokMarket
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <Link 
              href="/marketplace" 
              className="text-slate-300 hover:text-white transition"
            >
              Creators
            </Link>
            <Link 
              href="/products" 
              className="text-slate-300 hover:text-white transition"
            >
              Products
            </Link>
            <Link 
              href="/#how" 
              className="text-slate-300 hover:text-white transition"
            >
              How it Works
            </Link>
            <Link 
              href="/#pricing" 
              className="text-slate-300 hover:text-white transition"
            >
              Pricing
            </Link>
            <Link 
              href="/#faq" 
              className="text-slate-300 hover:text-white transition"
            >
              FAQ
            </Link>
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              href="/sell-product"
              className="px-4 py-2 text-slate-300 hover:text-white transition"
            >
              Sell Product
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-medium hover:opacity-90 transition"
            >
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <Link
              href="/marketplace"
              className="block text-slate-300 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Creators
            </Link>
            <Link
              href="/products"
              className="block text-slate-300 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link
              href="/#how"
              className="block text-slate-300 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              How it Works
            </Link>
            <Link
              href="/#pricing"
              className="block text-slate-300 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pricing
            </Link>
            <Link
              href="/#faq"
              className="block text-slate-300 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              FAQ
            </Link>
            <Link
              href="/sell-product"
              className="block text-slate-300 hover:text-white transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sell Product
            </Link>
            <Link
              href="/login"
              className="block px-4 py-2 rounded-lg bg-white/10 text-white hover:bg-white/20 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="block px-4 py-2 rounded-lg bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-medium hover:opacity-90 transition text-center"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sign Up
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}