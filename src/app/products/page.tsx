'use client';

import { useState } from 'react';
import Link from 'next/link';
import HeaderNav from '@/components/HeaderNav';
import Footer from '@/components/Footer';
import { Product, PRODUCT_CATEGORIES } from '@/types/product';

// Demo products - replace with real data from database
const DEMO_PRODUCTS: Product[] = [
  {
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
  {
    id: '2',
    sellerId: 'user2',
    sellerName: 'Jane Smith',
    sellerTikTok: '@janesmith',
    title: 'Vintage Gucci Bag',
    description: 'Authentic vintage Gucci handbag in excellent condition',
    price: 12000,
    category: 'Fashion & Clothing',
    images: ['/placeholder-product.jpg'],
    stock: 1,
    condition: 'used',
    deliveryOptions: ['Pickup only'],
    createdAt: '2025-10-02',
    status: 'active'
  },
  {
    id: '3',
    sellerId: 'user3',
    sellerName: 'Mike Johnson',
    sellerTikTok: '@mikej',
    title: 'Gaming PC Setup',
    description: 'Complete gaming setup with RTX 4080, 32GB RAM',
    price: 85000,
    category: 'Electronics',
    images: ['/placeholder-product.jpg'],
    stock: 1,
    condition: 'new',
    deliveryOptions: ['Pickup only', 'Local delivery'],
    createdAt: '2025-10-03',
    status: 'active'
  }
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });

  const filteredProducts = DEMO_PRODUCTS.filter(product => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = !selectedCategory || product.category === selectedCategory;
    const matchesPrice = 
      (!priceRange.min || product.price >= Number(priceRange.min)) &&
      (!priceRange.max || product.price <= Number(priceRange.max));
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen bg-slate-950">
      <HeaderNav />
      
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Browse Products
            </h1>
            <p className="text-slate-400">
              Buy directly from TikTok sellers
            </p>
          </div>
          <Link
            href="/sell-product"
            className="mt-4 md:mt-0 px-6 py-3 bg-gradient-to-r from-pink-500 to-cyan-500 text-white font-semibold rounded-xl hover:opacity-90 transition"
          >
            Sell Your Product
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-slate-900 rounded-xl p-6 mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            {/* Search */}
            <div className="md:col-span-2">
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>

            {/* Category */}
            <div>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-4 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              >
                <option value="">All Categories</option>
                {PRODUCT_CATEGORIES.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange.min}
                onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
              <input
                type="number"
                placeholder="Max"
                value={priceRange.max}
                onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                className="w-full px-3 py-2 bg-slate-800 border border-slate-700 rounded-lg text-white text-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Results Count */}
        <p className="text-slate-400 mb-6">
          {filteredProducts.length} products found
        </p>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="bg-slate-900 rounded-xl overflow-hidden hover:ring-2 hover:ring-pink-500 transition group"
            >
              {/* Image */}
              <div className="aspect-square bg-slate-800 flex items-center justify-center">
                <span className="text-slate-600 text-sm">Product Image</span>
              </div>

              {/* Content */}
              <div className="p-5">
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-pink-400 transition">
                  {product.title}
                </h3>
                <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                  {product.description}
                </p>

                {/* Price & Category */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-2xl font-bold text-pink-400">
                    MUR {product.price.toLocaleString()}
                  </span>
                  <span className="text-xs px-2 py-1 bg-slate-800 text-slate-400 rounded-full">
                    {product.category}
                  </span>
                </div>

                {/* Seller */}
                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <span>By {product.sellerName}</span>
                  <span className="text-cyan-400">{product.sellerTikTok}</span>
                </div>

                {/* Stock & Condition */}
                <div className="mt-3 flex items-center gap-3 text-xs">
                  <span className={`px-2 py-1 rounded-full ${
                    product.stock > 0 ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : 'Out of stock'}
                  </span>
                  <span className="px-2 py-1 bg-slate-800 text-slate-400 rounded-full capitalize">
                    {product.condition}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <p className="text-slate-400 text-lg">No products found</p>
            <p className="text-slate-500 mt-2">Try adjusting your filters</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}