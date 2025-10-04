'use client';

import { useState } from 'react';
import { PRODUCT_CATEGORIES, DELIVERY_OPTIONS } from '@/types/product';
import HeaderNav from '@/components/HeaderNav';
import Footer from '@/components/Footer';

export default function SellProductPage() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    condition: 'new',
    deliveryOptions: [] as string[],
    sellerName: '',
    sellerTikTok: '',
    images: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // TODO: Save to database/API
    console.log('Product data:', formData);
    alert('Product listed successfully! (Demo - needs backend integration)');
  };

  const handleDeliveryToggle = (option: string) => {
    setFormData(prev => ({
      ...prev,
      deliveryOptions: prev.deliveryOptions.includes(option)
        ? prev.deliveryOptions.filter(o => o !== option)
        : [...prev.deliveryOptions, option]
    }));
  };

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderNav />
      
      <div className="max-w-4xl mx-auto px-6 py-12">
        <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
          List Your Product
        </h1>
        <p className="text-slate-400 mb-8">
          Sell anything to the TikTok community
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Seller Info */}
          <div className="bg-slate-900 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Seller Information</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                required
                value={formData.sellerName}
                onChange={(e) => setFormData({...formData, sellerName: e.target.value})}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                TikTok Username
              </label>
              <input
                type="text"
                required
                value={formData.sellerTikTok}
                onChange={(e) => setFormData({...formData, sellerTikTok: e.target.value})}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="@yourusername"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="bg-slate-900 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Product Details</h2>
            
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Product Title
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="iPhone 15 Pro Max 256GB"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Description
              </label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({...formData, description: e.target.value})}
                rows={4}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                placeholder="Describe your product..."
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Price (MUR)
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="5000"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Stock Quantity
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  placeholder="1"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Category
                </label>
                <select
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="">Select category</option>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Condition
                </label>
                <select
                  value={formData.condition}
                  onChange={(e) => setFormData({...formData, condition: e.target.value as any})}
                  className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                >
                  <option value="new">New</option>
                  <option value="used">Used</option>
                  <option value="refurbished">Refurbished</option>
                </select>
              </div>
            </div>
          </div>

          {/* Delivery Options */}
          <div className="bg-slate-900 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Delivery Options</h2>
            
            <div className="space-y-2">
              {DELIVERY_OPTIONS.map(option => (
                <label key={option} className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.deliveryOptions.includes(option)}
                    onChange={() => handleDeliveryToggle(option)}
                    className="w-4 h-4 text-pink-500 bg-slate-800 border-slate-600 rounded focus:ring-pink-500"
                  />
                  <span className="text-slate-300">{option}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Images */}
          <div className="bg-slate-900 rounded-xl p-6 space-y-4">
            <h2 className="text-xl font-semibold text-white">Product Images</h2>
            <div className="border-2 border-dashed border-slate-700 rounded-lg p-8 text-center">
              <p className="text-slate-400">
                Image upload functionality coming soon
              </p>
              <p className="text-sm text-slate-500 mt-2">
                You'll be able to upload up to 5 images
              </p>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-6 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            List Product
          </button>
        </form>
      </div>

      <Footer />
    </div>
  );
}