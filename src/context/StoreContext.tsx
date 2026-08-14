import React, { createContext, useContext, useState, useEffect, ReactNode, useMemo } from 'react';
import { Product, CartItem, WishlistItem, Coupon, SelectedOptions, ToastMessage, Order, CategorySlug } from '../types';
import { PRODUCTS } from '../data/products';
import { COUPONS } from '../data/coupons';
import { DHAKA_DELIVERY_ZONES, DeliveryZone } from '../data/locations';

export type AppRoute =
  | 'home'
  | 'shop'
  | 'category'
  | 'product'
  | 'search'
  | 'wishlist'
  | 'cart'
  | 'checkout'
  | 'order-success'
  | 'about'
  | 'contact'
  | 'offers'
  | 'faq'
  | 'delivery'
  | 'privacy'
  | 'terms'
  | 'refunds'
  | 'account';

interface StoreContextType {
  // Navigation
  route: AppRoute;
  routeParam: string;
  navigateTo: (newRoute: AppRoute, param?: string) => void;
  
  // Cart
  cart: CartItem[];
  isCartDrawerOpen: boolean;
  setIsCartDrawerOpen: (open: boolean) => void;
  addToCart: (product: Product, quantity?: number, options?: SelectedOptions, openDrawer?: boolean) => void;
  updateCartQuantity: (cartItemId: string, delta: number) => void;
  removeFromCart: (cartItemId: string) => void;
  clearCart: () => void;
  cartCount: number;
  cartSubtotal: number;
  freeDeliveryThreshold: number;
  progressToFreeDelivery: number;
  amountNeededForFreeDelivery: number;
  
  // Wishlist
  wishlist: WishlistItem[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
  removeFromWishlist: (productId: string) => void;
  wishlistCount: number;
  
  // Quick View
  quickViewProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  
  // Search Overlay
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;

  // Mobile Menu
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
  
  // Coupon
  appliedCoupon: Coupon | null;
  couponError: string | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  discountAmount: number;
  
  // Delivery
  selectedZone: DeliveryZone;
  setSelectedZone: (zone: DeliveryZone) => void;
  deliveryFee: number;
  orderGrandTotal: number;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (title: string, message?: string, type?: 'success' | 'info' | 'warning' | 'error') => void;
  removeToast: (id: string) => void;
  
  // Orders
  latestOrder: Order | null;
  setLatestOrder: (order: Order) => void;
  ordersHistory: Order[];
  placeOrder: (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>) => Order;

  // Recently Viewed
  recentlyViewed: Product[];
}

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const STORAGE_KEYS = {
  CART: 'vc_bakery_cart_v1',
  WISHLIST: 'vc_bakery_wishlist_v1',
  COUPON: 'vc_bakery_coupon_v1',
  ORDERS: 'vc_bakery_orders_v1',
  RECENT: 'vc_bakery_recent_v1',
};

const FREE_DELIVERY_THRESHOLD = 1500; // ৳1,500 for free standard delivery

export const StoreProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Navigation State
  const [route, setRoute] = useState<AppRoute>('home');
  const [routeParam, setRouteParam] = useState<string>('');

  // Cart State
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CART);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartDrawerOpen, setIsCartDrawerOpen] = useState(false);

  // Wishlist State
  const [wishlist, setWishlist] = useState<WishlistItem[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.WISHLIST);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Search Modal
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  // Mobile Menu State
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Coupon State
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COUPON);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });
  const [couponError, setCouponError] = useState<string | null>(null);

  // Delivery Zone
  const [selectedZone, setSelectedZone] = useState<DeliveryZone>(DHAKA_DELIVERY_ZONES[0]);

  // Orders History
  const [ordersHistory, setOrdersHistory] = useState<Order[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ORDERS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [latestOrder, setLatestOrder] = useState<Order | null>(null);

  // Recently Viewed Products
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.RECENT);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Toast Notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist Cart
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CART, JSON.stringify(cart));
    } catch (e) {
      console.warn('Failed to persist cart:', e);
    }
  }, [cart]);

  // Persist Wishlist
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.WISHLIST, JSON.stringify(wishlist));
    } catch (e) {
      console.warn('Failed to persist wishlist:', e);
    }
  }, [wishlist]);

  // Persist Coupon
  useEffect(() => {
    try {
      if (appliedCoupon) {
        localStorage.setItem(STORAGE_KEYS.COUPON, JSON.stringify(appliedCoupon));
      } else {
        localStorage.removeItem(STORAGE_KEYS.COUPON);
      }
    } catch (e) {
      console.warn('Failed to persist coupon:', e);
    }
  }, [appliedCoupon]);

  // Persist Orders
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ORDERS, JSON.stringify(ordersHistory));
    } catch (e) {
      console.warn('Failed to persist orders:', e);
    }
  }, [ordersHistory]);

  // Navigation Helper with smooth scroll to top
  const navigateTo = (newRoute: AppRoute, param: string = '') => {
    setRoute(newRoute);
    setRouteParam(param);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Track recently viewed if navigating to a product
    if (newRoute === 'product' && param) {
      const prod = PRODUCTS.find((p) => p.slug === param || p.id === param);
      if (prod) {
        setRecentlyViewed((prev) => {
          const filtered = prev.filter((p) => p.id !== prod.id);
          const updated = [prod, ...filtered].slice(0, 6);
          try {
            localStorage.setItem(STORAGE_KEYS.RECENT, JSON.stringify(updated));
          } catch {}
          return updated;
        });
      }
    }
  };

  // Toast Helper
  const addToast = (title: string, message?: string, type: 'success' | 'info' | 'warning' | 'error' = 'success') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`;
    const newToast: ToastMessage = { id, title, message, type, duration: 4000 };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart Functions
  const addToCart = (
    product: Product,
    quantity = 1,
    options: SelectedOptions = {},
    openDrawer = true
  ) => {
    // Calculate unit price based on size options if multiplier applies
    let unitPrice = product.price;
    if (options.size) {
      if (options.size.includes('1 KG') || options.size.includes('Box of 6') || options.size.includes('Large Batard') || options.size.includes('Box of 8')) {
        unitPrice = Math.round(product.price * 1.8);
      } else if (options.size.includes('1.5 KG') || options.size.includes('Box of 12')) {
        unitPrice = Math.round(product.price * 2.6);
      } else if (options.size.includes('2 KG') || options.size.includes('Box of 24') || options.size.includes('Imperial')) {
        unitPrice = Math.round(product.price * 3.4);
      }
    }

    const cartItemId = `${product.id}-${options.size || 'std'}-${options.flavor || 'std'}-${options.isEggless ? 'eggless' : 'reg'}-${(options.cakeMessage || '').substring(0, 10)}`;

    setCart((prevCart) => {
      const existingIndex = prevCart.findIndex((item) => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prevCart];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      } else {
        return [
          ...prevCart,
          {
            cartItemId,
            product,
            quantity,
            unitPrice,
            selectedOptions: options,
          },
        ];
      }
    });

    addToast(
      'Added to basket',
      `${quantity}x ${product.name} ${options.size ? `(${options.size})` : ''}`,
      'success'
    );

    if (openDrawer) {
      setIsCartDrawerOpen(true);
    }
  };

  const updateCartQuantity = (cartItemId: string, delta: number) => {
    setCart((prev) => {
      return prev
        .map((item) => {
          if (item.cartItemId === cartItemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[];
    });
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
    addToast('Item removed from basket', undefined, 'info');
  };

  const clearCart = () => {
    setCart([]);
  };

  // Computed Cart values
  const cartCount = useMemo(() => cart.reduce((acc, item) => acc + item.quantity, 0), [cart]);

  const cartSubtotal = useMemo(
    () => cart.reduce((acc, item) => acc + item.unitPrice * item.quantity, 0),
    [cart]
  );

  const progressToFreeDelivery = Math.min(100, Math.round((cartSubtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeededForFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - cartSubtotal);

  // Wishlist Functions
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      const exists = prev.some((item) => item.product.id === product.id);
      if (exists) {
        addToast('Removed from wishlist', product.name, 'info');
        return prev.filter((item) => item.product.id !== product.id);
      } else {
        addToast('Saved to wishlist', product.name, 'success');
        return [...prev, { product, addedAt: new Date().toISOString() }];
      }
    });
  };

  const isInWishlist = (productId: string) => {
    return wishlist.some((item) => item.product.id === productId);
  };

  const removeFromWishlist = (productId: string) => {
    setWishlist((prev) => prev.filter((item) => item.product.id !== productId));
    addToast('Removed from wishlist', undefined, 'info');
  };

  const wishlistCount = wishlist.length;

  // Quick View Functions
  const openQuickView = (product: Product) => {
    setQuickViewProduct(product);
  };

  const closeQuickView = () => {
    setQuickViewProduct(null);
  };

  // Coupon Logic
  const applyCoupon = (code: string): boolean => {
    setCouponError(null);
    const cleanCode = code.trim().toUpperCase();
    const found = COUPONS.find((c) => c.code === cleanCode);

    if (!found) {
      setCouponError('Invalid coupon code. Try VELVET15 or SWEET500.');
      addToast('Invalid coupon code', 'Please check code and try again', 'error');
      return false;
    }

    if (found.minSpend && cartSubtotal < found.minSpend) {
      const err = `Coupon requires minimum order of ৳${found.minSpend.toLocaleString()}`;
      setCouponError(err);
      addToast('Minimum spend not met', err, 'warning');
      return false;
    }

    setAppliedCoupon(found);
    addToast('Coupon applied!', found.description, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    setCouponError(null);
    addToast('Coupon removed', undefined, 'info');
  };

  const discountAmount = useMemo(() => {
    if (!appliedCoupon || cartSubtotal === 0) return 0;
    if (appliedCoupon.discountType === 'percentage') {
      return Math.round((cartSubtotal * appliedCoupon.discountValue) / 100);
    } else {
      return Math.min(appliedCoupon.discountValue, cartSubtotal);
    }
  }, [appliedCoupon, cartSubtotal]);

  // Delivery Fee computation
  const deliveryFee = useMemo(() => {
    if (cartSubtotal === 0) return 0;
    if (cartSubtotal >= FREE_DELIVERY_THRESHOLD) return 0;
    return selectedZone.deliveryFee;
  }, [cartSubtotal, selectedZone]);

  const orderGrandTotal = Math.max(0, cartSubtotal - discountAmount + deliveryFee);

  // Place Order
  const placeOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order => {
    const orderNumber = `VC-${Math.floor(100000 + Math.random() * 900000)}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    setLatestOrder(newOrder);
    setOrdersHistory((prev) => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    setIsCartDrawerOpen(false);

    return newOrder;
  };

  return (
    <StoreContext.Provider
      value={{
        route,
        routeParam,
        navigateTo,

        cart,
        isCartDrawerOpen,
        setIsCartDrawerOpen,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        cartCount,
        cartSubtotal,
        freeDeliveryThreshold: FREE_DELIVERY_THRESHOLD,
        progressToFreeDelivery,
        amountNeededForFreeDelivery,

        wishlist,
        toggleWishlist,
        isInWishlist,
        removeFromWishlist,
        wishlistCount,

        quickViewProduct,
        openQuickView,
        closeQuickView,

        isSearchOpen,
        setIsSearchOpen,
        searchQuery,
        setSearchQuery,

        isMobileMenuOpen,
        setIsMobileMenuOpen,

        appliedCoupon,
        couponError,
        applyCoupon,
        removeCoupon,
        discountAmount,

        selectedZone,
        setSelectedZone,
        deliveryFee,
        orderGrandTotal,

        toasts,
        addToast,
        removeToast,

        latestOrder,
        setLatestOrder,
        ordersHistory,
        placeOrder,

        recentlyViewed,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};
