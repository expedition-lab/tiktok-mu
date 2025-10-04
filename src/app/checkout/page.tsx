'use client';

import { useState } from 'react';
import HeaderNav from '@/components/HeaderNav';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<'juice' | 'paypal'>('juice');
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    fullName: '',
    address: '',
    city: '',
    postalCode: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Payment processed via ${paymentMethod.toUpperCase()}! (Demo)`);
  };

  const subtotal = 45000; // Demo value
  const deliveryFee = 200;
  const platformFee = 500; // 5% example
  const total = subtotal + deliveryFee + platformFee;

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderNav />
      
      <div className="max-w-6xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-8">
          Checkout
        </h1>

        <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Contact Information */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="+230 5xxx xxxx"
                  />
                </div>
              </div>
            </div>

            {/* Delivery Information */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Delivery Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({...formData, fullName: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="John Doe"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Address
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({...formData, address: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                    placeholder="123 Main Street"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      City
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="Port Louis"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Postal Code
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.postalCode}
                      onChange={(e) => setFormData({...formData, postalCode: e.target.value})}
                      className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                      placeholder="11302"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-slate-900 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Payment Method</h2>
              
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="juice"
                    checked={paymentMethod === 'juice'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'juice')}
                    className="w-4 h-4 text-pink-500"
                  />
                  <div className="flex-1">
                    <span className="text-white font-medium">JUICE</span>
                    <p className="text-slate-400 text-sm">Pay with JUICE mobile money</p>
                  </div>
                  <div className="px-3 py-1 bg-pink-500/20 text-pink-400 rounded text-xs font-medium">
                    Popular
                  </div>
                </label>

                <label className="flex items-center gap-3 p-4 bg-slate-800 rounded-lg cursor-pointer hover:bg-slate-700 transition">
                  <input
                    type="radio"
                    name="payment"
                    value="paypal"
                    checked={paymentMethod === 'paypal'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                    className="w-4 h-4 text-pink-500"
                  />
                  <div>
                    <span className="text-white font-medium">PayPal</span>
                    <p className="text-slate-400 text-sm">Pay securely with PayPal</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-slate-900 rounded-xl p-6 sticky top-24">
              <h2 className="text-xl font-semibold text-white mb-4">Order Summary</h2>
              
              {/* Sample Item */}
              <div className="mb-6 pb-6 border-b border-slate-700">
                <div className="flex gap-3">
                  <div className="w-16 h-16 bg-slate-800 rounded-lg flex items-center justify-center">
                    <span className="text-slate-600 text-xs">Image</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium text-sm">iPhone 15 Pro Max 256GB</p>
                    <p className="text-slate-400 text-xs mt-1">Quantity: 1</p>
                  </div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>MUR {subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Delivery Fee</span>
                  <span>MUR {deliveryFee}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Platform Fee (1%)</span>
                  <span>MUR {platformFee}</span>
                </div>
                <div className="border-t border-slate-700 pt-3 flex justify-between text-white font-semibold text-lg">
                  <span>Total</span>
                  <span className="text-pink-400">MUR {total.toLocaleString()}</span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
              >
                Pay MUR {total.toLocaleString()}
              </button>

              <p className="text-slate-400 text-xs text-center mt-4">
                By completing your purchase, you agree to our Terms of Service
              </p>
            </div>
          </div>
        </form>
      </div>

      <Footer />
    </div>
  );
}