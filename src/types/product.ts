// src/types/product.ts

export interface Product {
  id: string;
  sellerId: string;
  sellerName: string;
  sellerTikTok: string;
  title: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  stock: number;
  condition?: 'new' | 'used' | 'refurbished';
  deliveryOptions: string[];
  createdAt: string;
  status: 'active' | 'sold' | 'draft';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const PRODUCT_CATEGORIES = [
  'Electronics',
  'Fashion & Clothing',
  'Beauty & Health',
  'Home & Garden',
  'Sports & Outdoors',
  'Toys & Games',
  'Books & Media',
  'Services',
  'Digital Products',
  'Other'
] as const;

export const DELIVERY_OPTIONS = [
  'Pickup only',
  'Local delivery',
  'Shipping available',
  'Digital delivery'
] as const;