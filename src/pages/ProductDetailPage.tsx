import React, { useState, useEffect } from 'react';
import {
  Star,
  Heart,
  ShoppingBag,
  ArrowRight,
  ShieldCheck,
  Truck,
  Clock,
  CheckCircle2,
  Calendar,
  Sparkles,
  ChevronRight,
  Maximize2,
  X,
  Share2,
  Flame,
  Info,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { OCCASIONS, DELIVERY_TIME_SLOTS } from '../data/locations';
import { Product } from '../types';

export const ProductDetailPage: React.FC = () => {
  const {
    routeParam,
    navigateTo,
    addToCart,
    toggleWishlist,
    isInWishlist,
    addToast,
    recentlyViewed,
  } = useStore();

  const product = PRODUCTS.find((p) => p.slug === routeParam || p.id === routeParam) || PRODUCTS[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [deliveryDate, setDeliveryDate] = useState<string>('');
  const [deliverySlot, setDeliverySlot] = useState<string>(DELIVERY_TIME_SLOTS[0]);
  const [specialInstructions, setSpecialInstructions] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<
    'description' | 'ingredients' | 'storage' | 'delivery' | 'reviews'
  >('description');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // New review state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');
  const [customReviews, setCustomReviews] = useState<any[]>([]);

  const isSaved = isInWishlist(product.id);

  // Initialize options when product changes
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setSelectedFlavor(product.flavors ? product.flavors[0] : '');
    setIsEggless(false);
    setCakeMessage('');
    setSelectedOccasion('');
    setQuantity(1);

    // Default to tomorrow or today's date formatted
    const today = new Date();
    const formatted = today.toISOString().split('T')[0];
    setDeliveryDate(formatted);
  }, [product]);

  // Calculate unit price based on size
  let calculatedUnitPrice = product.price;
  if (selectedSize) {
    if (selectedSize.includes('1 KG') || selectedSize.includes('Box of 6') || selectedSize.includes('Large Batard') || selectedSize.includes('Box of 8')) {
      calculatedUnitPrice = Math.round(product.price * 1.8);
    } else if (selectedSize.includes('1.5 KG') || selectedSize.includes('Box of 12')) {
      calculatedUnitPrice = Math.round(product.price * 2.6);
    } else if (selectedSize.includes('2 KG') || selectedSize.includes('Box of 24') || selectedSize.includes('Imperial')) {
      calculatedUnitPrice = Math.round(product.price * 3.4);
    }
  }

  const handleAddToCart = (openDrawer = true) => {
    addToCart(
      product,
      quantity,
      {
        size: selectedSize,
        flavor: selectedFlavor,
        isEggless,
        cakeMessage: cakeMessage.trim() || undefined,
        occasion: selectedOccasion || undefined,
        deliveryDate,
        deliverySlot,
        specialInstructions: specialInstructions.trim() || undefined,
      },
      openDrawer
    );
  };

  const handleBuyNow = () => {
    addToCart(
      product,
      quantity,
      {
        size: selectedSize,
        flavor: selectedFlavor,
        isEggless,
        cakeMessage: cakeMessage.trim() || undefined,
        occasion: selectedOccasion || undefined,
        deliveryDate,
        deliverySlot,
        specialInstructions: specialInstructions.trim() || undefined,
      },
      false
    );
    navigateTo('checkout');
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    addToast('Link copied to clipboard', 'Share this delicious bake with friends!', 'info');
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newEntry = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment,
      verified: true,
    };

    setCustomReviews((prev) => [newEntry, ...prev]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    addToast('Review Submitted', 'Thank you for your valuable feedback!', 'success');
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.id !== product.id && (p.category === product.category || p.isFeatured)
  ).slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
      {/* Breadcrumb */}
      <nav className="text-xs text-[#7d7a74] flex items-center gap-2">
        <button onClick={() => navigateTo('home')} className="hover:text-[#c99558]">
          Home
        </button>
        <span>/</span>
        <button onClick={() => navigateTo('shop')} className="hover:text-[#c99558]">
          Bakery
        </button>
        <span>/</span>
        <button
          onClick={() => navigateTo('category', product.category)}
          className="hover:text-[#c99558]"
        >
          {product.categoryName}
        </button>
        <span>/</span>
        <span className="text-[#dedbd4] truncate max-w-xs">{product.name}</span>
      </nav>

      {/* Main Product Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
        {/* Left Column: Gallery (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Hero Image */}
          <div className="relative aspect-square sm:aspect-[4/3] w-full rounded-2xl overflow-hidden bg-[#14141c] border border-[#262634] shadow-2xl">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />

            {/* Badges */}
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              {product.badge && (
                <span className="px-3 py-1 rounded-full bg-[#c99558] text-[#0c0c0e] font-bold text-xs shadow-md">
                  {product.badge}
                </span>
              )}
            </div>

            {/* Actions on Image (Zoom & Share) */}
            <div className="absolute top-3 right-3 flex items-center gap-2">
              <button
                onClick={handleShare}
                className="p-2 rounded-full bg-[#0c0c0e]/80 hover:bg-[#1f1f2a] text-[#dedbd4] hover:text-[#c99558] border border-[#2e2e3e] transition-colors"
                aria-label="Share product link"
              >
                <Share2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsLightboxOpen(true)}
                className="p-2 rounded-full bg-[#0c0c0e]/80 hover:bg-[#1f1f2a] text-[#dedbd4] hover:text-[#c99558] border border-[#2e2e3e] transition-colors"
                aria-label="Enlarge image"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Thumbnails */}
          {product.images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pb-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 shrink-0 transition-all ${
                    activeImageIndex === idx
                      ? 'border-[#c99558] opacity-100 scale-95 shadow-md'
                      : 'border-[#22222f] opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}

          {/* Trust Guarantee Box */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-4 rounded-xl bg-[#121217] border border-[#22222d] text-xs text-[#a8a69e]">
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c99558] shrink-0" />
              <span>Baked Fresh at 5:00 AM</span>
            </div>
            <div className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#c99558] shrink-0" />
              <span>Chilled Dhaka Express</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#c99558] shrink-0" />
              <span>100% Artisan Guaranteed</span>
            </div>
          </div>
        </div>

        {/* Right Column: Customizer & Purchase Panel (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          {/* Header & Title */}
          <div>
            <div className="flex items-center justify-between text-xs text-[#8c8983] mb-1.5">
              <span className="uppercase tracking-widest text-[#c99558] font-semibold">
                {product.categoryName}
              </span>
              <span className="text-[#6e6c66]">SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f5f3ef] leading-tight">
              {product.name}
            </h1>

            {/* Ratings & Stock */}
            <div className="flex items-center gap-3 mt-3">
              <div className="flex items-center gap-1 text-[#c99558]">
                <Star className="w-4 h-4 fill-current" />
                <span className="text-sm font-bold text-[#f5f3ef]">{product.rating}</span>
              </div>
              <span className="text-xs text-[#787670]">({product.reviewCount} verified reviews)</span>
              <span className="text-xs text-[#38b273] bg-[#38b273]/10 border border-[#38b273]/20 px-2.5 py-0.5 rounded-full font-medium ml-auto">
                In Stock ({product.stock} left)
              </span>
            </div>

            {/* Price Row */}
            <div className="mt-4 flex items-baseline gap-3">
              <span className="text-3xl font-bold text-[#f5f3ef] font-sans">
                ৳{calculatedUnitPrice.toLocaleString()}
              </span>
              {product.originalPrice && selectedSize === product.sizes?.[0] && (
                <span className="text-base text-[#6e6c66] line-through font-sans">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
              <span className="text-xs text-[#8c8983]">(VAT Included)</span>
            </div>

            <p className="text-xs sm:text-sm text-[#a8a69e] mt-3 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Size / Weight Selection */}
          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2 pt-3 border-t border-[#22222e]">
              <label className="text-xs font-semibold text-[#dedbd4] block">
                Select Size / Tier: <span className="text-[#c99558] font-normal">{selectedSize}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((sz) => (
                  <button
                    key={sz}
                    type="button"
                    onClick={() => setSelectedSize(sz)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                      selectedSize === sz
                        ? 'bg-[#c99558] text-[#0c0c0e] border-[#c99558] font-bold shadow-sm'
                        : 'bg-[#161620] text-[#dedbd4] border-[#292938] hover:border-[#3d3d52]'
                    }`}
                  >
                    {sz}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Flavor Selection */}
          {product.flavors && product.flavors.length > 0 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#dedbd4] block">
                Flavor Profile: <span className="text-[#c99558] font-normal">{selectedFlavor}</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {product.flavors.map((flv) => (
                  <button
                    key={flv}
                    type="button"
                    onClick={() => setSelectedFlavor(flv)}
                    className={`px-3.5 py-2 rounded-lg text-xs font-medium border transition-all ${
                      selectedFlavor === flv
                        ? 'bg-[#c99558] text-[#0c0c0e] border-[#c99558] font-bold shadow-sm'
                        : 'bg-[#161620] text-[#dedbd4] border-[#292938] hover:border-[#3d3d52]'
                    }`}
                  >
                    {flv}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Eggless Option Toggle */}
          {product.isEgglessOption && (
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#14141d] border border-[#262636]">
              <div>
                <span className="text-xs font-semibold text-[#f5f3ef] block">
                  100% Eggless Preparation
                </span>
                <span className="text-[11px] text-[#8c8983]">
                  Baked with cultured organic yogurt and flaxseed base
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsEggless(!isEggless)}
                className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                  isEggless ? 'bg-[#38b273]' : 'bg-[#292938]'
                }`}
                aria-label="Toggle eggless preparation"
              >
                <span
                  className={`w-5 h-5 rounded-full bg-white block transition-transform shadow-sm ${
                    isEggless ? 'translate-x-5' : 'translate-x-0'
                  }`}
                />
              </button>
            </div>
          )}

          {/* Custom Cake Message & Occasion Controls */}
          {product.allowsCakeMessage && (
            <div className="space-y-3 p-4 rounded-xl bg-[#13131b] border border-[#242432]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#dedbd4] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c99558]" />
                  Custom Piped Message on Cake
                </span>
                <span className="text-[10px] text-[#787670]">Max 35 chars</span>
              </div>

              <input
                type="text"
                maxLength={35}
                value={cakeMessage}
                onChange={(e) => setCakeMessage(e.target.value)}
                placeholder='e.g. "Happy Birthday Samira!"'
                className="w-full bg-[#0c0c10] border border-[#2c2c3b] rounded-lg px-3.5 py-2 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:border-[#c99558] focus:outline-none"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                <div>
                  <label className="text-[11px] text-[#8c8983] block mb-1">Occasion:</label>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="w-full bg-[#0c0c10] border border-[#2c2c3b] rounded-lg px-3 py-2 text-xs text-[#dedbd4] focus:border-[#c99558] focus:outline-none cursor-pointer"
                  >
                    <option value="">Select Occasion (Optional)</option>
                    {OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-[#8c8983] block mb-1">Preferred Time Slot:</label>
                  <select
                    value={deliverySlot}
                    onChange={(e) => setDeliverySlot(e.target.value)}
                    className="w-full bg-[#0c0c10] border border-[#2c2c3b] rounded-lg px-3 py-2 text-xs text-[#dedbd4] focus:border-[#c99558] focus:outline-none cursor-pointer"
                  >
                    {DELIVERY_TIME_SLOTS.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Quantity & Order Actions */}
          <div className="pt-2 space-y-3">
            <div className="flex items-center gap-3">
              {/* Quantity Selector */}
              <div className="flex items-center border border-[#2d2d3e] rounded-xl bg-[#161622] overflow-hidden">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3.5 py-3 text-sm text-[#dedbd4] hover:bg-[#222232] transition-colors"
                  aria-label="Decrease quantity"
                >
                  -
                </button>
                <span className="px-3 text-sm font-bold text-[#f5f3ef] min-w-[32px] text-center">
                  {quantity}
                </span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3.5 py-3 text-sm text-[#dedbd4] hover:bg-[#222232] transition-colors"
                  aria-label="Increase quantity"
                >
                  +
                </button>
              </div>

              {/* Add to Basket */}
              <button
                type="button"
                onClick={() => handleAddToCart(true)}
                className="flex-1 py-3.5 px-5 rounded-xl bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Basket • ৳{(calculatedUnitPrice * quantity).toLocaleString()}</span>
              </button>

              {/* Wishlist Button */}
              <button
                type="button"
                onClick={() => toggleWishlist(product)}
                className={`p-3.5 rounded-xl border transition-colors ${
                  isSaved
                    ? 'bg-[#c99558]/20 border-[#c99558] text-[#c99558]'
                    : 'bg-[#181824] border-[#2d2d3e] text-[#dedbd4] hover:text-[#c99558]'
                }`}
                aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
              >
                <Heart className={`w-5 h-5 ${isSaved ? 'fill-current' : ''}`} />
              </button>
            </div>

            {/* Express Buy Now */}
            <button
              type="button"
              onClick={handleBuyNow}
              className="w-full py-3 px-4 rounded-xl bg-[#1e1e2b] hover:bg-[#28283a] text-[#dedbd4] hover:text-white border border-[#333346] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
            >
              <span>Instant Buy (Direct to Checkout)</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="pt-8 border-t border-[#20202b]">
        {/* Tab Headers */}
        <div className="flex border-b border-[#242432] overflow-x-auto gap-4 sm:gap-8 pb-1">
          <button
            onClick={() => setActiveTab('description')}
            className={`pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
              activeTab === 'description'
                ? 'text-[#c99558]'
                : 'text-[#8c8983] hover:text-[#dedbd4]'
            }`}
          >
            Artisan Description
            {activeTab === 'description' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('ingredients')}
            className={`pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
              activeTab === 'ingredients'
                ? 'text-[#c99558]'
                : 'text-[#8c8983] hover:text-[#dedbd4]'
            }`}
          >
            Ingredients & Allergens
            {activeTab === 'ingredients' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('storage')}
            className={`pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
              activeTab === 'storage'
                ? 'text-[#c99558]'
                : 'text-[#8c8983] hover:text-[#dedbd4]'
            }`}
          >
            Storage & Serving Guide
            {activeTab === 'storage' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('delivery')}
            className={`pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
              activeTab === 'delivery'
                ? 'text-[#c99558]'
                : 'text-[#8c8983] hover:text-[#dedbd4]'
            }`}
          >
            Dhaka Delivery & Care
            {activeTab === 'delivery' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('reviews')}
            className={`pb-3 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors relative ${
              activeTab === 'reviews'
                ? 'text-[#c99558]'
                : 'text-[#8c8983] hover:text-[#dedbd4]'
            }`}
          >
            Customer Reviews ({product.reviewCount + customReviews.length})
            {activeTab === 'reviews' && (
              <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />
            )}
          </button>
        </div>

        {/* Tab Content Panel */}
        <div className="py-6 text-xs sm:text-sm text-[#a8a69e] leading-relaxed max-w-3xl">
          {activeTab === 'description' && (
            <div className="space-y-4">
              <p>{product.description}</p>
              <p>
                Each batch is made to order in our Gulshan patisserie atelier using strictly small-batch craftsmanship. We allow no artificial preservatives, emulsifiers, or shortening.
              </p>
            </div>
          )}

          {activeTab === 'ingredients' && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-[#f5f3ef] mb-1">Premium Ingredients Sourced:</h4>
                <p>{product.ingredients || 'High-grade European dairy, single-origin chocolate, unbleached flour, cane sugar, and Madagascar vanilla.'}</p>
              </div>
              <div className="pt-2">
                <h4 className="font-semibold text-[#f5f3ef] mb-1">Allergen Notice:</h4>
                <p className="text-[#ef4444]/90 bg-[#2b1717] p-3 rounded-lg border border-[#4a2424]">
                  {product.allergens || 'Contains Dairy, Gluten. Prepared in a facility handling tree nuts.'}
                </p>
              </div>
            </div>
          )}

          {activeTab === 'storage' && (
            <div className="space-y-3">
              <p>{product.storageInstructions || 'Keep chilled between 4°C to 8°C. Best enjoyed fresh within 48 to 72 hours.'}</p>
              <div className="p-3 rounded-lg bg-[#161620] border border-[#242432]">
                <strong className="text-[#c99558] block mb-1">Baker’s Serving Tip:</strong>
                For cakes, rest at room temperature for 15 minutes before slicing with a knife warmed in hot water. For pastries and croissants, warm in a preheated 170°C oven for 3 minutes for freshly baked flaky texture.
              </div>
            </div>
          )}

          {activeTab === 'delivery' && (
            <div className="space-y-3">
              <p>
                Delivered across all Dhaka zones via our temperature-controlled dedicated delivery vehicles. Orders placed before 2:00 PM are eligible for same-day evening delivery.
              </p>
              <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#dedbd4]">
                <li>Free standard delivery across Dhaka on orders over ৳1,500.</li>
                <li>Carefully packaged in insulated boxes with structural shock absorbers.</li>
                <li>Real-time SMS & WhatsApp dispatch tracking updates.</li>
              </ul>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-8">
              {/* Write Review Form */}
              <form onSubmit={handleReviewSubmit} className="p-4 sm:p-5 rounded-xl bg-[#14141c] border border-[#262636] space-y-3">
                <h4 className="font-serif text-base font-semibold text-[#f5f3ef]">
                  Leave a Review for {product.name}
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    required
                    value={newReviewAuthor}
                    onChange={(e) => setNewReviewAuthor(e.target.value)}
                    placeholder="Your Full Name"
                    className="bg-[#0c0c10] border border-[#2b2b3a] rounded-lg px-3 py-2 text-xs text-[#f5f3ef] placeholder-[#6b6964] focus:border-[#c99558] focus:outline-none"
                  />
                  <div className="flex items-center gap-2 bg-[#0c0c10] border border-[#2b2b3a] rounded-lg px-3 py-2 text-xs text-[#dedbd4]">
                    <span>Rating:</span>
                    <select
                      value={newReviewRating}
                      onChange={(e) => setNewReviewRating(Number(e.target.value))}
                      className="bg-transparent text-[#c99558] font-bold focus:outline-none cursor-pointer"
                    >
                      <option value={5}>5 Stars - Perfection</option>
                      <option value={4}>4 Stars - Very Good</option>
                      <option value={3}>3 Stars - Average</option>
                    </select>
                  </div>
                </div>
                <textarea
                  rows={3}
                  required
                  value={newReviewComment}
                  onChange={(e) => setNewReviewComment(e.target.value)}
                  placeholder="Share your feedback on taste, texture, packaging, or delivery..."
                  className="w-full bg-[#0c0c10] border border-[#2b2b3a] rounded-lg p-3 text-xs text-[#f5f3ef] placeholder-[#6b6964] focus:border-[#c99558] focus:outline-none"
                />
                <button
                  type="submit"
                  className="py-2 px-5 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] text-xs font-bold transition-all cursor-pointer"
                >
                  Submit Review
                </button>
              </form>

              {/* Reviews List */}
              <div className="space-y-4">
                {[...customReviews, ...productReviewsDemo(product.name)].map((rev) => (
                  <div key={rev.id} className="p-4 rounded-xl bg-[#121218] border border-[#22222d] space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-xs text-[#f5f3ef]">{rev.author}</span>
                        {rev.verified && (
                          <span className="text-[10px] text-[#38b273] flex items-center gap-1">
                            <CheckCircle2 className="w-3 h-3" /> Verified Customer
                          </span>
                        )}
                      </div>
                      <span className="text-[10px] text-[#73716d]">{rev.date}</span>
                    </div>
                    <div className="flex items-center gap-1 text-[#c99558]">
                      {[...Array(rev.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                    <p className="text-xs text-[#dedbd4] leading-relaxed">{rev.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products Recommendations */}
      {relatedProducts.length > 0 && (
        <div className="pt-10 border-t border-[#20202b] space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-2xl font-bold text-[#f5f3ef]">
              You May Also Savor
            </h3>
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs text-[#c99558] hover:underline"
            >
              Explore Bakery →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setIsLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-[#181822] text-[#dedbd4] hover:text-white"
          >
            <X className="w-6 h-6" />
          </button>
          <img
            src={product.images[activeImageIndex] || product.images[0]}
            alt={product.name}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            referrerPolicy="no-referrer"
          />
        </div>
      )}
    </div>
  );
};

// Helper to provide realistic reviews per product
function productReviewsDemo(productName: string) {
  return [
    {
      id: 'rev-demo-1',
      author: 'Tasneem Hossain',
      rating: 5,
      date: '3 days ago',
      comment: `Ordered this ${productName} for our celebration in Banani. Exceeded expectations in taste, balance, and presentation!`,
      verified: true,
    },
    {
      id: 'rev-demo-2',
      author: 'Imtiaz Ahmed',
      rating: 5,
      date: '1 week ago',
      comment: 'Top quality ingredients make a genuine difference. Arrived perfectly chilled in an insulated box.',
      verified: true,
    },
  ];
}
