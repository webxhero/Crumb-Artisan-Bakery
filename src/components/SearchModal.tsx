import React, { useState, useEffect, useRef } from 'react';
import { Search, X, ChevronRight, Sparkles, Tag, ArrowRight } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { Product } from '../types';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, navigateTo } = useStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const POPULAR_SEARCHES = [
    'Belgian Chocolate Cake',
    'Butter Croissant',
    'Red Velvet',
    'Artisan Sourdough',
    'Macarons',
    'Birthday Cake',
    'Gift Box',
    'Eggless',
  ];

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = '';
      setSearchTerm('');
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isSearchOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isSearchOpen) {
        setIsSearchOpen(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(!isSearchOpen);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, setIsSearchOpen]);

  // Simulate quick responsive typing filter
  const filteredProducts: Product[] = React.useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase().trim();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query)) ||
        (p.flavors && p.flavors.some((f) => f.toLowerCase().includes(query)))
    ).slice(0, 6);
  }, [searchTerm]);

  const matchedCategories = React.useMemo(() => {
    if (!searchTerm.trim()) return [];
    const query = searchTerm.toLowerCase().trim();
    return CATEGORIES.filter(
      (c) => c.name.toLowerCase().includes(query) || c.subtitle.toLowerCase().includes(query)
    ).slice(0, 3);
  }, [searchTerm]);

  if (!isSearchOpen) return null;

  const handleSelectProduct = (product: Product) => {
    navigateTo('product', product.slug);
    setIsSearchOpen(false);
  };

  const handleSelectCategory = (categorySlug: string) => {
    navigateTo('category', categorySlug);
    setIsSearchOpen(false);
  };

  const handleViewAllResults = () => {
    navigateTo('shop', searchTerm);
    setIsSearchOpen(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 pb-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Search"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[#111116] border border-[#2c2c3a] rounded-xl shadow-2xl overflow-hidden z-10 animate-in fade-in zoom-in-95 duration-200">
        {/* Search Input Bar */}
        <div className="relative border-b border-[#242430] p-4 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#c99558] shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search cakes, pastries, sourdough, croissants..."
            className="w-full bg-transparent text-[#f5f3ef] placeholder-[#73716d] text-base focus:outline-none"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="text-[#88857e] hover:text-[#f5f3ef] p-1 rounded transition-colors"
              aria-label="Clear search"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="text-xs text-[#8e8c86] bg-[#1a1a22] hover:bg-[#252530] px-2 py-1 rounded border border-[#2f2f3e] transition-colors"
          >
            ESC
          </button>
        </div>

        {/* Results / Default State */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-6">
          {/* If no search term, show popular searches & curated categories */}
          {!searchTerm.trim() ? (
            <div className="space-y-5">
              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#7e7c77] mb-2.5 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#c99558]" />
                  <span>Popular Inquiries</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {POPULAR_SEARCHES.map((query) => (
                    <button
                      key={query}
                      onClick={() => setSearchTerm(query)}
                      className="px-3 py-1.5 rounded-full bg-[#181820] hover:bg-[#232330] border border-[#282836] hover:border-[#c99558]/50 text-xs text-[#dedbd4] hover:text-[#c99558] transition-all flex items-center gap-1.5"
                    >
                      <Tag className="w-3 h-3 text-[#8a8882]" />
                      <span>{query}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="text-xs font-semibold uppercase tracking-wider text-[#7e7c77] mb-2.5">
                  Top Categories
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {CATEGORIES.slice(0, 6).map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleSelectCategory(cat.slug)}
                      className="flex items-center gap-2.5 p-2 rounded-lg bg-[#16161e] hover:bg-[#20202c] border border-[#252533] text-left transition-colors group"
                    >
                      <img
                        src={cat.image}
                        alt={cat.name}
                        className="w-10 h-10 rounded object-cover shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="overflow-hidden">
                        <div className="text-xs font-medium text-[#f5f3ef] group-hover:text-[#c99558] transition-colors truncate">
                          {cat.name}
                        </div>
                        <div className="text-[10px] text-[#7d7a74]">{cat.itemCount} items</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            /* Results when typing */
            <div className="space-y-5">
              {/* Category matches */}
              {matchedCategories.length > 0 && (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#7e7c77] mb-2">
                    Matching Categories
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {matchedCategories.map((cat) => (
                      <button
                        key={cat.id}
                        onClick={() => handleSelectCategory(cat.slug)}
                        className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-[#1a1a24] hover:bg-[#232332] border border-[#2d2d3c] text-xs text-[#dedbd4] hover:text-[#c99558] transition-colors"
                      >
                        <span className="font-medium">{cat.name}</span>
                        <ChevronRight className="w-3.5 h-3.5 text-[#73716d]" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Product matches */}
              {filteredProducts.length > 0 ? (
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#7e7c77] mb-2 flex items-center justify-between">
                    <span>Products ({filteredProducts.length})</span>
                    <button
                      onClick={handleViewAllResults}
                      className="text-xs text-[#c99558] hover:underline flex items-center gap-1 font-normal cursor-pointer"
                    >
                      View full results <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                  <div className="divide-y divide-[#20202c]">
                    {filteredProducts.map((product) => (
                      <button
                        key={product.id}
                        onClick={() => handleSelectProduct(product)}
                        className="w-full flex items-center gap-3.5 py-2.5 px-2 hover:bg-[#181822] rounded-lg text-left transition-colors group"
                      >
                        <img
                          src={product.images[0]}
                          alt={product.name}
                          className="w-14 h-14 rounded-md object-cover shrink-0 border border-[#272734]"
                          referrerPolicy="no-referrer"
                        />
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-[#8c8983] uppercase tracking-wider">
                              {product.categoryName}
                            </span>
                            {product.badge && (
                              <span className="text-[10px] bg-[#c99558]/20 text-[#c99558] px-1.5 py-0.2 rounded font-medium">
                                {product.badge}
                              </span>
                            )}
                          </div>
                          <h4 className="text-sm font-medium text-[#f5f3ef] group-hover:text-[#c99558] transition-colors truncate">
                            {product.name}
                          </h4>
                          <p className="text-xs text-[#8a8882] truncate">{product.shortDescription}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <div className="text-sm font-semibold text-[#f5f3ef]">
                            ৳{product.price.toLocaleString()}
                          </div>
                          {product.originalPrice && (
                            <div className="text-xs text-[#6e6c66] line-through">
                              ৳{product.originalPrice.toLocaleString()}
                            </div>
                          )}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                /* No Results State */
                <div className="text-center py-8">
                  <div className="w-12 h-12 rounded-full bg-[#1c1c25] flex items-center justify-center mx-auto text-[#7d7a74] mb-3">
                    <Search className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-medium text-[#f5f3ef]">No bakes found for "{searchTerm}"</h4>
                  <p className="text-xs text-[#8c8983] mt-1 max-w-sm mx-auto">
                    Try searching for "Chocolate", "Croissant", "Sourdough", "Red Velvet" or browse all products.
                  </p>
                  <button
                    onClick={() => {
                      navigateTo('shop');
                      setIsSearchOpen(false);
                    }}
                    className="mt-4 px-4 py-2 rounded-md bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] text-xs font-semibold transition-colors"
                  >
                    Browse All Products
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
