export type CategorySlug =
  | 'all'
  | 'celebration-cakes'
  | 'birthday-cakes'
  | 'chocolate-cakes'
  | 'pastries'
  | 'croissants'
  | 'artisan-bread'
  | 'cookies'
  | 'desserts'
  | 'gift-boxes';

export interface Category {
  id: string;
  slug: CategorySlug;
  name: string;
  subtitle: string;
  image: string;
  itemCount: number;
}

export interface ProductVariant {
  id: string;
  name: string; // e.g. "0.5 KG", "1 KG", "1.5 KG", "2 KG", "Box of 6"
  priceMultiplier?: number;
  additionalPrice?: number;
  inStock?: boolean;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
  avatar?: string;
  productName?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  category: CategorySlug;
  categoryName: string;
  shortDescription: string;
  description: string;
  price: number; // In BDT ৳
  originalPrice?: number;
  images: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  sku: string;
  badge?: 'Bestseller' | 'New' | 'Fresh Today' | '15% Off' | 'Limited' | 'Chef Special';
  isBestseller?: boolean;
  isNew?: boolean;
  isFeatured?: boolean;
  isEgglessOption?: boolean;
  sizes?: string[]; // e.g. ["0.5 KG", "1 KG", "1.5 KG", "2 KG"]
  flavors?: string[]; // e.g. ["Classic Dark Chocolate", "Belgian Truffle", "Hazelnut Crunch"]
  tags: string[];
  ingredients?: string;
  allergens?: string;
  storageInstructions?: string;
  prepTimeHours?: number;
  allowsCakeMessage?: boolean;
}

export interface SelectedOptions {
  size?: string;
  flavor?: string;
  isEggless?: boolean;
  cakeMessage?: string;
  recipientName?: string;
  occasion?: string;
  deliveryDate?: string;
  deliverySlot?: string;
  specialInstructions?: string;
}

export interface CartItem {
  cartItemId: string; // generated unique id
  product: Product;
  quantity: number;
  unitPrice: number;
  selectedOptions: SelectedOptions;
}

export interface WishlistItem {
  product: Product;
  addedAt: string;
}

export interface Coupon {
  code: string;
  discountType: 'percentage' | 'fixed';
  discountValue: number;
  minSpend?: number;
  description: string;
}

export interface OrderAddress {
  fullName: string;
  phone: string;
  email: string;
  area: string;
  city: string;
  fullAddress: string;
  postalCode?: string;
  orderNotes?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  createdAt: string;
  items: CartItem[];
  subtotal: number;
  discount: number;
  deliveryFee: number;
  total: number;
  couponCode?: string;
  address: OrderAddress;
  deliveryMethod: 'express-today' | 'scheduled' | 'standard';
  deliveryDate: string;
  deliverySlot: string;
  paymentMethod: 'cod' | 'bkash' | 'nagad' | 'card';
  paymentStatus: 'pending' | 'paid' | 'verified';
  orderStatus: 'received' | 'baking' | 'decorating' | 'quality_check' | 'out_for_delivery' | 'delivered';
}

export interface ToastMessage {
  id: string;
  title: string;
  message?: string;
  type?: 'success' | 'info' | 'warning' | 'error';
  duration?: number;
}

export interface FilterOptions {
  category: CategorySlug;
  minPrice: number;
  maxPrice: number;
  flavors: string[];
  sizes: string[];
  onlyInStock: boolean;
  onlyEggless: boolean;
  minRating: number;
  searchQuery: string;
  sortBy: 'featured' | 'bestselling' | 'newest' | 'price-low' | 'price-high' | 'rating';
}
