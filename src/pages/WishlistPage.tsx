import React from 'react';
import { Heart, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from '../components/ProductCard';

export const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist, navigateTo } = useStore();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-18 h-18 rounded-full bg-[#181824] border border-[#2d2d3e] flex items-center justify-center mx-auto text-[#73716d]">
          <Heart className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#f5f3ef]">Your Saved Favorites</h1>
        <p className="text-xs sm:text-sm text-[#a8a69e] max-w-sm mx-auto leading-relaxed">
          You haven't saved any bakery items to your wishlist yet. Tap the heart icon on any cake, pastry, or loaf to save it for your next celebration.
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="py-3 px-6 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span>Browse Bakery Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#20202c]">
        <div className="space-y-1">
          <nav className="text-xs text-[#73716d] flex items-center gap-2">
            <button onClick={() => navigateTo('home')} className="hover:text-[#c99558]">
              Home
            </button>
            <span>/</span>
            <span className="text-[#dedbd4]">Wishlist</span>
          </nav>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
            My Saved Favorites ({wishlist.length})
          </h1>
        </div>

        <button
          onClick={clearWishlist}
          className="text-xs text-[#73716d] hover:text-[#ef4444] self-start sm:self-auto underline cursor-pointer"
        >
          Clear Wishlist
        </button>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};
