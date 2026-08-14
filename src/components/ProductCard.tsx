import React from 'react';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';

interface ProductCardProps {
  product: Product;
  priority?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, priority = false }) => {
  const { navigateTo, addToCart, openQuickView, toggleWishlist, isInWishlist } = useStore();
  const isSaved = isInWishlist(product.id);

  const handleCardClick = () => {
    navigateTo('product', product.slug);
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (product.allowsCakeMessage || (product.sizes && product.sizes.length > 1)) {
      // If product has size choices or cake message, open Quick View for quick configuration
      openQuickView(product);
    } else {
      addToCart(product, 1, {
        size: product.sizes ? product.sizes[0] : undefined,
        flavor: product.flavors ? product.flavors[0] : undefined,
      });
    }
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleQuickViewClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    openQuickView(product);
  };

  // Badge styles
  const getBadgeClass = (badge?: string) => {
    switch (badge) {
      case 'Bestseller':
        return 'bg-[#c99558] text-[#0c0c0e] font-semibold';
      case '15% Off':
        return 'bg-[#ef4444] text-white font-semibold';
      case 'New':
        return 'bg-[#3b82f6] text-white font-medium';
      case 'Fresh Today':
        return 'bg-[#10b981] text-white font-medium';
      case 'Chef Special':
        return 'bg-[#8b5cf6] text-white font-medium';
      default:
        return 'bg-[#292938] text-[#dedbd4]';
    }
  };

  return (
    <article
      onClick={handleCardClick}
      className="group relative bg-[#131318] border border-[#242430] hover:border-[#3d3d4e] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.5)] cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] sm:aspect-[1/1] w-full overflow-hidden bg-[#181820]">
        <img
          src={product.images[0]}
          alt={product.name}
          loading={priority ? 'eager' : 'lazy'}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Secondary image hover effect if exists */}
        {product.images.length > 1 && (
          <img
            src={product.images[1]}
            alt={`${product.name} detail`}
            loading="lazy"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 ease-out hidden sm:block"
          />
        )}

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 z-10">
          {product.badge && (
            <span className={`text-[11px] px-2.5 py-0.5 rounded-full shadow-sm tracking-wide ${getBadgeClass(product.badge)}`}>
              {product.badge}
            </span>
          )}
          {product.isEgglessOption && (
            <span className="text-[10px] bg-[#1a1a24]/90 backdrop-blur-xs text-[#a8d5ba] border border-[#3b5e47] px-2 py-0.5 rounded-full font-medium shadow-sm">
              Eggless Option
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          type="button"
          onClick={handleWishlistClick}
          className={`absolute top-2.5 right-2.5 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isSaved
              ? 'bg-[#c99558] text-[#0c0c0e] shadow-md'
              : 'bg-[#0f0f14]/80 backdrop-blur-xs text-[#dedbd4] hover:text-[#c99558] hover:bg-[#1a1a22]'
          }`}
          aria-label={isSaved ? 'Remove from wishlist' : 'Save to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button - Desktop hover overlay / Mobile pill */}
        <div className="absolute inset-x-2 bottom-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hidden sm:flex justify-center">
          <button
            type="button"
            onClick={handleQuickViewClick}
            className="w-full py-2 px-3 rounded-lg bg-[#0e0e12]/90 backdrop-blur-md hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] border border-[#333342] hover:border-transparent text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-lg"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-3.5 sm:p-4 flex-1 flex flex-col justify-between gap-3">
        <div>
          {/* Category & Rating */}
          <div className="flex items-center justify-between text-xs text-[#8c8983] mb-1">
            <span className="uppercase tracking-wider text-[10px] font-medium text-[#c99558]">
              {product.categoryName}
            </span>
            <div className="flex items-center gap-1 text-[#f5f3ef]">
              <Star className="w-3 h-3 text-[#c99558] fill-[#c99558]" />
              <span className="text-xs font-semibold">{product.rating}</span>
              <span className="text-[10px] text-[#73716d]">({product.reviewCount})</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-base sm:text-lg font-semibold text-[#f5f3ef] group-hover:text-[#c99558] transition-colors line-clamp-1 leading-snug">
            {product.name}
          </h3>

          {/* Short description */}
          <p className="text-xs text-[#8c8983] line-clamp-2 mt-1 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#22222c] flex items-center justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base sm:text-lg font-bold text-[#f5f3ef] font-sans">
                ৳{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-[#6e6c66] line-through font-sans">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.sizes && (
              <span className="text-[10px] text-[#73716d] block font-sans">
                {product.sizes[0]}
              </span>
            )}
          </div>

          <button
            type="button"
            onClick={handleQuickAdd}
            className="py-1.5 px-3 rounded-lg bg-[#1c1c25] hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] border border-[#2f2f3e] hover:border-transparent text-xs font-semibold flex items-center gap-1.5 transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label={`Add ${product.name} to cart`}
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span className="hidden xs:inline sm:inline">Add</span>
          </button>
        </div>
      </div>
    </article>
  );
};
