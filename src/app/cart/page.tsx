'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HeaderNav from '@/components/HeaderNav';
import Footer from '@/components/Footer';
import { CartItem } from '@/types/product';

// Demo cart items - replace with real cart state management
const DEMO_CART: CartItem[] = [
  {
    product: {
      id: '1',
      sellerId: 'user1',
      sellerName: 'John Doe',
      sellerTikTok: '@johndoe',
      title: 'iPhone 15 Pro Max 256GB',
      description: 'Brand new, sealed iPhone 15 Pro Max',
      price: 45000,
      category: 'Electronics',
      images: ['/placeholder-product.jpg'],
      stock: 2,
      condition: 'new',
      deliveryOptions: ['Local delivery', 'Shipping available'],
      createdAt: '2025-10-01',
      status: 'active'
    },
    quantity: 1
  }
];

export default function CartPage() {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>(DEMO_CART);

  const updateQuantity = (productId: string, newQuantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.product.id === productId
          ? { ...item, quantity: Math.max(1, Math.min(item.product.stock, newQuantity)) }
          : item
      )
    );
  };

  const removeItem = (productId: string) => {
    setCartItems(items => items.filter(item => item.product.id !== productId));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const deliveryFee = 200; // Fixed delivery fee for demo
  const total = subtotal + deliveryFee;

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderNav />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
          Shopping Cart
        </h1>

        {cartItems.length === 0 ? (
          <div className="bg-slate-900 rounded-2xl p-12 text-center">
            <svg className="w-24 h-24 mx-auto text-slate-700 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <h2 className="text-2xl font-semibold text-white mb-2">Your cart is empty</h2>
            <p className="text-slate-400 mb-6">Add some products to get started!</p>
            <Link
              href="/products"
              className="inline-block px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
            >
              Browse Products
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map(item => (
                <div key={item.product.id} className="bg-slate-900 rounded-xl p-6">
                  <div className="flex gap-6">
                    {/* Image */}
                    <div className="w-24 h-24 bg-slate-800 rounded-lg flex items-center justify-center flex-shrink-0">
                      <span className="text-slate-600 text-xs">Image</span>
                    </div>

                    {/* Details */}
                    <div className="flex-1">
                      <Link
                        href={`/product/${item.product.id}`}
                        className="text-lg font-semibold text-white hover:text-pink-400 transition"
                      >
                        {item.product.title}
                      </Link>
                      <p className="text-slate-400 text-sm mt-1">
                        By {item.product.sellerName} • {item.product.category}
                      </p>
                      <p className="text-pink-400 font-semibold mt-2">
                        MUR {item.product.price.toLocaleString()}
                      </p>
                    </div>

                    {/* Quantity & Remove */}
                    <div className="flex flex-col items-end justify-between">
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="text-slate-400 hover:text-red-400 transition"
                      >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 flex items-center justify-center bg-slate-800 text-white rounded hover:bg-slate-700 transition"
                        >
                          -
                        </button>
                        <span className="w-12 text-center text-white font-medium">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 flex items-center justify-center bg-slate-800 text-white rounded hover:bg-slate-700 transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-slate-900 rounded-xl p-6 sticky top-24">
                <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between text-slate-300">
                    <span>Subtotal ({cartItems.length} items)</span>
                    <span>MUR {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-slate-300">
                    <span>Delivery Fee</span>
                    <span>MUR {deliveryFee}</span>
                  </div>
                  <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-semibold text-lg">
                    <span>Total</span>
                    <span className="text-pink-400">MUR {total.toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={() => router.push('/checkout')}
                  className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
                >
                  Proceed to Checkout
                </button>

                <Link
                  href="/products"
                  className="block text-center text-slate-400 hover:text-white mt-4 transition"
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}