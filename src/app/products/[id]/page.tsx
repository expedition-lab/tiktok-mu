'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import HeaderNav from '@/components/HeaderNav';
import Footer from '@/components/Footer';
import { Product } from '@/types/product';

// Demo data - replace with real data from database
const DEMO_PRODUCT: Product = {
  id: '1',
  sellerId: 'user1',
  sellerName: 'John Doe',
  sellerTikTok: '@johndoe',
  title: 'iPhone 15 Pro Max 256GB',
  description: 'Brand new, sealed iPhone 15 Pro Max in Titanium Blue. Never opened, comes with full Apple warranty. Perfect condition with all original accessories included.',
  price: 45000,
  category: 'Electronics',
  images: ['/placeholder-product.jpg'],
  stock: 2,
  condition: 'new',
  deliveryOptions: ['Local delivery', 'Shipping available'],
  createdAt: '2025-10-01',
  status: 'active'
};

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const product = DEMO_PRODUCT; // Replace with actual data fetch

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    // TODO: Add to cart logic
    setTimeout(() => {
      alert(`Added ${quantity} item(s) to cart!`);
      setIsAddingToCart(false);
    }, 500);
  };

  const handleBuyNow = () => {
    // TODO: Direct checkout logic
    alert('Redirecting to checkout... (Demo)');
    router.push('/checkout');
  };

  const handleContactSeller = () => {
    window.open(`https://tiktok.com/${product.sellerTikTok}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderNav />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white mb-8 transition"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Products
        </button>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            <div className="aspect-square bg-slate-900 rounded-2xl flex items-center justify-center mb-4">
              <span className="text-slate-600">Product Image</span>
            </div>
            <div className="grid grid-cols-4 gap-3">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="aspect-square bg-slate-900 rounded-lg flex items-center justify-center">
                  <span className="text-slate-700 text-xs">{i}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <span className="text-4xl font-bold text-pink-400">
                MUR {product.price.toLocaleString()}
              </span>
              <span className="px-3 py-1 bg-slate-800 text-slate-400 rounded-full text-sm capitalize">
                {product.condition}
              </span>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              {product.stock > 0 ? (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/20 text-green-400 rounded-lg">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  {product.stock} in stock
                </span>
              ) : (
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-red-500/20 text-red-400 rounded-lg">
                  Out of stock
                </span>
              )}
            </div>

            {/* Description */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Description</h2>
              <p className="text-slate-300 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Delivery Options */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-3">Delivery Options</h2>
              <div className="flex flex-wrap gap-2">
                {product.deliveryOptions.map(option => (
                  <span key={option} className="px-3 py-1 bg-slate-800 text-slate-300 rounded-full text-sm">
                    {option}
                  </span>
                ))}
              </div>
            </div>

            {/* Category */}
            <div className="mb-8">
              <span className="text-sm text-slate-400">Category: </span>
              <span className="text-cyan-400">{product.category}</span>
            </div>

            {/* Quantity & Actions */}
            {product.stock > 0 && (
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Math.min(product.stock, Number(e.target.value))))}
                      className="w-20 px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-center focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="w-10 h-10 flex items-center justify-center bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <button
                    onClick={handleAddToCart}
                    disabled={isAddingToCart}
                    className="py-3 px-6 bg-slate-800 text-white font-semibold rounded-xl hover:bg-slate-700 transition disabled:opacity-50"
                  >
                    {isAddingToCart ? 'Adding...' : 'Add to Cart'}
                  </button>
                  <button
                    onClick={handleBuyNow}
                    className="py-3 px-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            )}

            {/* Seller Info */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Seller Information</h2>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-white font-medium">{product.sellerName}</p>
                  <p className="text-cyan-400">{product.sellerTikTok}</p>
                </div>
                <button
                  onClick={handleContactSeller}
                  className="px-4 py-2 bg-slate-800 text-white rounded-lg hover:bg-slate-700 transition"
                >
                  Contact Seller
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}