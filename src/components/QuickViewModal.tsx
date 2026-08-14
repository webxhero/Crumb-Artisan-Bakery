import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, ArrowRight, ShieldCheck, Truck, Check, Sparkles } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { OCCASIONS } from '../data/locations';

export const QuickViewModal: React.FC = () => {
  const {
    quickViewProduct,
    closeQuickView,
    addToCart,
    navigateTo,
    toggleWishlist,
    isInWishlist,
  } = useStore();

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [isEggless, setIsEggless] = useState<boolean>(false);
  const [cakeMessage, setCakeMessage] = useState<string>('');
  const [selectedOccasion, setSelectedOccasion] = useState<string>('');
  const [quantity, setQuantity] = useState<number>(1);

  // Initialize options when product changes
  useEffect(() => {
    if (quickViewProduct) {
      document.body.style.overflow = 'hidden';
      setActiveImageIndex(0);
      setSelectedSize(quickViewProduct.sizes ? quickViewProduct.sizes[0] : '');
      setSelectedFlavor(quickViewProduct.flavors ? quickViewProduct.flavors[0] : '');
      setIsEggless(false);
      setCakeMessage('');
      setSelectedOccasion('');
      setQuantity(1);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [quickViewProduct]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && quickViewProduct) {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [quickViewProduct, closeQuickView]);

  if (!quickViewProduct) return null;

  const isSaved = isInWishlist(quickViewProduct.id);

  // Dynamic price based on selected size
  let calculatedPrice = quickViewProduct.price;
  if (selectedSize) {
    if (selectedSize.includes('1 KG') || selectedSize.includes('Box of 6') || selectedSize.includes('Large Batard') || selectedSize.includes('Box of 8')) {
      calculatedPrice = Math.round(quickViewProduct.price * 1.8);
    } else if (selectedSize.includes('1.5 KG') || selectedSize.includes('Box of 12')) {
      calculatedPrice = Math.round(quickViewProduct.price * 2.6);
    } else if (selectedSize.includes('2 KG') || selectedSize.includes('Box of 24') || selectedSize.includes('Imperial')) {
      calculatedPrice = Math.round(quickViewProduct.price * 3.4);
    }
  }

  const handleAddToCart = (openDrawer = true) => {
    addToCart(
      quickViewProduct,
      quantity,
      {
        size: selectedSize,
        flavor: selectedFlavor,
        isEggless,
        cakeMessage: cakeMessage.trim() || undefined,
        occasion: selectedOccasion || undefined,
      },
      openDrawer
    );
    closeQuickView();
  };

  const handleBuyNow = () => {
    addToCart(
      quickViewProduct,
      quantity,
      {
        size: selectedSize,
        flavor: selectedFlavor,
        isEggless,
        cakeMessage: cakeMessage.trim() || undefined,
        occasion: selectedOccasion || undefined,
      },
      false
    );
    closeQuickView();
    navigateTo('checkout');
  };

  const handleViewFullPage = () => {
    navigateTo('product', quickViewProduct.slug);
    closeQuickView();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${quickViewProduct.name}`}
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/85 backdrop-blur-sm transition-opacity"
        onClick={closeQuickView}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#111116] border border-[#2c2c3a] rounded-2xl shadow-2xl overflow-hidden z-10 my-auto animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          onClick={closeQuickView}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#181820]/90 text-[#a8a69e] hover:text-white hover:bg-[#252532] border border-[#2f2f3e] transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 max-h-[85vh] overflow-y-auto">
          {/* Left: Gallery */}
          <div className="p-4 sm:p-6 bg-[#0c0c0f] flex flex-col gap-3 justify-between border-b md:border-b-0 md:border-r border-[#22222d]">
            <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#181820] border border-[#22222e]">
              <img
                src={quickViewProduct.images[activeImageIndex] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              {quickViewProduct.badge && (
                <span className="absolute top-3 left-3 text-xs font-semibold bg-[#c99558] text-[#0c0c0e] px-2.5 py-1 rounded-full shadow-md">
                  {quickViewProduct.badge}
                </span>
              )}
            </div>

            {/* Thumbnails */}
            {quickViewProduct.images.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg overflow-hidden border-2 shrink-0 transition-all ${
                      activeImageIndex === idx
                        ? 'border-[#c99558] opacity-100 scale-95'
                        : 'border-[#242430] opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust highlights */}
            <div className="pt-3 border-t border-[#1e1e28] grid grid-cols-2 gap-2 text-[11px] text-[#8c8983]">
              <div className="flex items-center gap-1.5">
                <Truck className="w-3.5 h-3.5 text-[#c99558]" />
                <span>Express Dhaka delivery</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c99558]" />
                <span>100% Artisan crafted</span>
              </div>
            </div>
          </div>

          {/* Right: Product Customizer & Order Controls */}
          <div className="p-4 sm:p-6 space-y-4">
            {/* Header info */}
            <div>
              <div className="flex items-center justify-between text-xs text-[#8c8983] mb-1">
                <span className="uppercase tracking-wider text-[#c99558] font-medium">
                  {quickViewProduct.categoryName}
                </span>
                <span className="text-[#686661]">SKU: {quickViewProduct.sku}</span>
              </div>

              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#f5f3ef] leading-snug">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mt-2">
                <div className="flex items-center gap-1 text-[#c99558]">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-sm font-semibold text-[#f5f3ef]">{quickViewProduct.rating}</span>
                </div>
                <span className="text-xs text-[#716f6b]">({quickViewProduct.reviewCount} customer reviews)</span>
                <span className="text-xs text-[#38b273] bg-[#38b273]/10 px-2 py-0.5 rounded font-medium ml-auto">
                  In Stock ({quickViewProduct.stock} available)
                </span>
              </div>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-2">
                <span className="text-2xl font-bold text-[#f5f3ef] font-sans">
                  ৳{calculatedPrice.toLocaleString()}
                </span>
                {quickViewProduct.originalPrice && selectedSize === quickViewProduct.sizes?.[0] && (
                  <span className="text-sm text-[#716f6b] line-through font-sans">
                    ৳{quickViewProduct.originalPrice.toLocaleString()}
                  </span>
                )}
                <span className="text-xs text-[#8c8983]">VAT included</span>
              </div>

              <p className="text-xs text-[#a8a69e] mt-2 leading-relaxed">
                {quickViewProduct.shortDescription}
              </p>
            </div>

            {/* Size Options */}
            {quickViewProduct.sizes && quickViewProduct.sizes.length > 0 && (
              <div className="space-y-1.5 pt-2 border-t border-[#22222d]">
                <label className="text-xs font-semibold text-[#dedbd4] block">
                  Select Size / Quantity: <span className="text-[#c99558] font-normal">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                        selectedSize === size
                          ? 'bg-[#c99558] text-[#0c0c0e] border-[#c99558] font-semibold'
                          : 'bg-[#181822] text-[#dedbd4] border-[#292938] hover:border-[#3d3d50]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Flavor Options */}
            {quickViewProduct.flavors && quickViewProduct.flavors.length > 0 && (
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#dedbd4] block">
                  Flavor Profile: <span className="text-[#c99558] font-normal">{selectedFlavor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {quickViewProduct.flavors.map((flavor) => (
                    <button
                      key={flavor}
                      type="button"
                      onClick={() => setSelectedFlavor(flavor)}
                      className={`px-3 py-1.5 rounded-md text-xs font-medium border transition-all ${
                        selectedFlavor === flavor
                          ? 'bg-[#c99558] text-[#0c0c0e] border-[#c99558] font-semibold'
                          : 'bg-[#181822] text-[#dedbd4] border-[#292938] hover:border-[#3d3d50]'
                      }`}
                    >
                      {flavor}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Eggless Option Toggle */}
            {quickViewProduct.isEgglessOption && (
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#16161f] border border-[#262634]">
                <div>
                  <span className="text-xs font-medium text-[#f5f3ef] block">100% Eggless Preparation</span>
                  <span className="text-[10px] text-[#8c8983]">Baked with cultured yogurt and flaxseed base</span>
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

            {/* Cake Customization (Message & Occasion) */}
            {quickViewProduct.allowsCakeMessage && (
              <div className="space-y-2 p-3 rounded-lg bg-[#14141c] border border-[#242432]">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#dedbd4] flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[#c99558]" />
                    Custom Piped Message
                  </span>
                  <span className="text-[10px] text-[#787670]">Max 35 chars</span>
                </div>
                <input
                  type="text"
                  maxLength={35}
                  value={cakeMessage}
                  onChange={(e) => setCakeMessage(e.target.value)}
                  placeholder='e.g. "Happy 30th Birthday Arefin!"'
                  className="w-full bg-[#0d0d12] border border-[#2c2c3b] rounded-md px-3 py-1.5 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:border-[#c99558] focus:outline-none"
                />

                <div className="pt-1">
                  <label className="text-[11px] text-[#8c8983] block mb-1">Occasion (Optional):</label>
                  <select
                    value={selectedOccasion}
                    onChange={(e) => setSelectedOccasion(e.target.value)}
                    className="w-full bg-[#0d0d12] border border-[#2c2c3b] rounded-md px-2.5 py-1.5 text-xs text-[#dedbd4] focus:border-[#c99558] focus:outline-none cursor-pointer"
                  >
                    <option value="">Select Occasion</option>
                    {OCCASIONS.map((occ) => (
                      <option key={occ} value={occ}>
                        {occ}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Quantity + Actions */}
            <div className="pt-2 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity Control */}
                <div className="flex items-center border border-[#2d2d3d] rounded-lg bg-[#161620] overflow-hidden">
                  <button
                    type="button"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-sm text-[#dedbd4] hover:bg-[#222230] transition-colors"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 text-xs font-semibold text-[#f5f3ef] min-w-[28px] text-center">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-sm text-[#dedbd4] hover:bg-[#222230] transition-colors"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                {/* Add to Cart Button */}
                <button
                  type="button"
                  onClick={() => handleAddToCart(true)}
                  className="flex-1 py-2.5 px-4 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Basket • ৳{(calculatedPrice * quantity).toLocaleString()}</span>
                </button>

                {/* Wishlist Button */}
                <button
                  type="button"
                  onClick={() => toggleWishlist(quickViewProduct)}
                  className={`p-2.5 rounded-lg border transition-colors ${
                    isSaved
                      ? 'bg-[#c99558]/20 border-[#c99558] text-[#c99558]'
                      : 'bg-[#181822] border-[#2d2d3d] text-[#dedbd4] hover:text-[#c99558]'
                  }`}
                  aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
                >
                  <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
                </button>
              </div>

              {/* Buy Now Direct Button */}
              <button
                type="button"
                onClick={handleBuyNow}
                className="w-full py-2.5 px-4 rounded-lg bg-[#1f1f2a] hover:bg-[#2a2a3a] text-[#dedbd4] border border-[#333346] text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
              >
                <span>Express Buy Now (Proceed to Checkout)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>

              {/* View Full Product Page */}
              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={handleViewFullPage}
                  className="text-xs text-[#8c8983] hover:text-[#c99558] underline underline-offset-4 transition-colors cursor-pointer"
                >
                  View complete product specifications & allergen details →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
