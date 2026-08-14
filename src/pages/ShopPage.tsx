import React, { useState, useMemo, useEffect } from 'react';
import {
  SlidersHorizontal,
  X,
  Star,
  Check,
  ChevronDown,
  ArrowUpDown,
  Search,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { ProductCard } from '../components/ProductCard';
import { CategorySlug, Product } from '../types';

export const ShopPage: React.FC = () => {
  const { routeParam, navigateTo } = useStore();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<CategorySlug>(
    (routeParam as CategorySlug) || 'all'
  );
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(6000);
  const [selectedFlavors, setSelectedFlavors] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [onlyEggless, setOnlyEggless] = useState<boolean>(false);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<
    'featured' | 'bestselling' | 'newest' | 'price-low' | 'price-high' | 'rating'
  >('featured');

  // Mobile filter drawer state
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  // Sync routeParam with selectedCategory when route changes
  useEffect(() => {
    if (routeParam && CATEGORIES.some((c) => c.slug === routeParam)) {
      setSelectedCategory(routeParam as CategorySlug);
    } else if (!routeParam) {
      setSelectedCategory('all');
    }
  }, [routeParam]);

  // Extract all distinct flavors and sizes from the product dataset
  const availableFlavors = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      p.flavors?.forEach((f) => set.add(f.split(' ')[0])); // take main word
    });
    return Array.from(set).slice(0, 8);
  }, []);

  const availableSizes = useMemo(() => {
    const set = new Set<string>();
    PRODUCTS.forEach((p) => {
      p.sizes?.forEach((s) => set.add(s));
    });
    return Array.from(set).slice(0, 8);
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      // Category filter
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false;
      }
      // Price filter
      if (product.price < minPrice || product.price > maxPrice) {
        return false;
      }
      // Eggless filter
      if (onlyEggless && !product.isEgglessOption) {
        return false;
      }
      // In Stock filter
      if (onlyInStock && product.stock <= 0) {
        return false;
      }
      // Rating filter
      if (minRating > 0 && product.rating < minRating) {
        return false;
      }
      // Flavor filter
      if (selectedFlavors.length > 0) {
        const hasFlavor = product.flavors?.some((f) =>
          selectedFlavors.some((sf) => f.toLowerCase().includes(sf.toLowerCase()))
        );
        if (!hasFlavor) return false;
      }
      // Size filter
      if (selectedSizes.length > 0) {
        const hasSize = product.sizes?.some((s) => selectedSizes.includes(s));
        if (!hasSize) return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'bestselling') return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
      if (sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [
    selectedCategory,
    minPrice,
    maxPrice,
    onlyEggless,
    onlyInStock,
    minRating,
    selectedFlavors,
    selectedSizes,
    sortBy,
  ]);

  const activeFiltersCount =
    (selectedCategory !== 'all' ? 1 : 0) +
    (minPrice > 0 || maxPrice < 6000 ? 1 : 0) +
    (onlyEggless ? 1 : 0) +
    (onlyInStock ? 1 : 0) +
    (minRating > 0 ? 1 : 0) +
    selectedFlavors.length +
    selectedSizes.length;

  const resetAllFilters = () => {
    setSelectedCategory('all');
    setMinPrice(0);
    setMaxPrice(6000);
    setSelectedFlavors([]);
    setSelectedSizes([]);
    setOnlyEggless(false);
    setOnlyInStock(false);
    setMinRating(0);
    setSortBy('featured');
    if (routeParam) {
      navigateTo('shop');
    }
  };

  const toggleFlavor = (flavor: string) => {
    setSelectedFlavors((prev) =>
      prev.includes(flavor) ? prev.filter((f) => f !== flavor) : [...prev, flavor]
    );
  };

  const toggleSize = (size: string) => {
    setSelectedSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  // Reusable Filter Controls JSX
  const FilterControls = (
    <div className="space-y-6 text-xs">
      {/* Category List */}
      <div className="space-y-2">
        <div className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
          Categories
        </div>
        <div className="space-y-1">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
              selectedCategory === 'all'
                ? 'bg-[#c99558]/20 text-[#c99558] font-semibold'
                : 'text-[#a8a69e] hover:text-[#f5f3ef] hover:bg-[#161620]'
            }`}
          >
            <span>All Items</span>
            <span className="text-[10px] text-[#6b6964]">{PRODUCTS.length}</span>
          </button>

          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md transition-colors flex items-center justify-between ${
                selectedCategory === cat.slug
                  ? 'bg-[#c99558]/20 text-[#c99558] font-semibold'
                  : 'text-[#a8a69e] hover:text-[#f5f3ef] hover:bg-[#161620]'
              }`}
            >
              <span>{cat.name}</span>
              <span className="text-[10px] text-[#6b6964]">{cat.itemCount}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div className="space-y-2.5 pt-4 border-t border-[#22222e]">
        <div className="flex items-center justify-between">
          <span className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
            Price Range (৳)
          </span>
          <span className="text-xs font-semibold text-[#c99558]">
            ৳{minPrice} - ৳{maxPrice}
          </span>
        </div>
        <div className="space-y-2">
          <input
            type="range"
            min={0}
            max={6000}
            step={100}
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
            className="w-full accent-[#c99558] bg-[#22222e] h-1.5 rounded-lg cursor-pointer"
          />
          <div className="flex items-center justify-between text-[11px] text-[#73716d]">
            <span>৳0</span>
            <span>৳3,000</span>
            <span>৳6,000+</span>
          </div>
        </div>
      </div>

      {/* Dietary & Stock Toggles */}
      <div className="space-y-2.5 pt-4 border-t border-[#22222e]">
        <div className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
          Dietary & Availability
        </div>

        <label className="flex items-center gap-2.5 text-[#dedbd4] cursor-pointer">
          <input
            type="checkbox"
            checked={onlyEggless}
            onChange={(e) => setOnlyEggless(e.target.checked)}
            className="w-4 h-4 rounded bg-[#161620] border-[#303040] text-[#c99558] focus:ring-[#c99558] focus:ring-offset-0"
          />
          <span>100% Eggless Option Available</span>
        </label>

        <label className="flex items-center gap-2.5 text-[#dedbd4] cursor-pointer">
          <input
            type="checkbox"
            checked={onlyInStock}
            onChange={(e) => setOnlyInStock(e.target.checked)}
            className="w-4 h-4 rounded bg-[#161620] border-[#303040] text-[#c99558] focus:ring-[#c99558] focus:ring-offset-0"
          />
          <span>In Stock for Immediate Delivery</span>
        </label>
      </div>

      {/* Flavor Profile */}
      <div className="space-y-2.5 pt-4 border-t border-[#22222e]">
        <div className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
          Flavor Notes
        </div>
        <div className="flex flex-wrap gap-1.5">
          {availableFlavors.map((flavor) => {
            const isSelected = selectedFlavors.includes(flavor);
            return (
              <button
                key={flavor}
                onClick={() => toggleFlavor(flavor)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#c99558] text-[#0c0c0e] border-[#c99558] font-bold'
                    : 'bg-[#15151e] text-[#a8a69e] border-[#252533] hover:border-[#3a3a4d]'
                }`}
              >
                {flavor}
              </button>
            );
          })}
        </div>
      </div>

      {/* Sizes / Formats */}
      <div className="space-y-2.5 pt-4 border-t border-[#22222e]">
        <div className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
          Portion / Size
        </div>
        <div className="flex flex-wrap gap-1.5">
          {availableSizes.map((size) => {
            const isSelected = selectedSizes.includes(size);
            return (
              <button
                key={size}
                onClick={() => toggleSize(size)}
                className={`px-2.5 py-1 rounded-md text-[11px] font-medium border transition-all ${
                  isSelected
                    ? 'bg-[#c99558] text-[#0c0c0e] border-[#c99558] font-bold'
                    : 'bg-[#15151e] text-[#a8a69e] border-[#252533] hover:border-[#3a3a4d]'
                }`}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      {/* Minimum Rating */}
      <div className="space-y-2.5 pt-4 border-t border-[#22222e]">
        <div className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
          Customer Rating
        </div>
        <div className="space-y-1">
          {[4.8, 4.5, 4.0].map((rating) => (
            <button
              key={rating}
              onClick={() => setMinRating(minRating === rating ? 0 : rating)}
              className={`w-full text-left px-2.5 py-1.5 rounded-md flex items-center gap-2 transition-colors ${
                minRating === rating
                  ? 'bg-[#c99558]/20 text-[#c99558] font-semibold'
                  : 'text-[#a8a69e] hover:bg-[#161620]'
              }`}
            >
              <div className="flex items-center gap-1 text-[#c99558]">
                <Star className="w-3.5 h-3.5 fill-current" />
                <span>{rating}+</span>
              </div>
              <span className="text-[11px] text-[#73716d]">Stars & Above</span>
            </button>
          ))}
        </div>
      </div>

      {/* Reset button */}
      {activeFiltersCount > 0 && (
        <div className="pt-2">
          <button
            onClick={resetAllFilters}
            className="w-full py-2 px-3 rounded-lg bg-[#1a1a24] hover:bg-[#252535] text-[#dedbd4] hover:text-[#c99558] border border-[#2b2b3a] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset All Filters ({activeFiltersCount})</span>
          </button>
        </div>
      )}
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header Banner */}
      <div className="space-y-2">
        <nav className="text-xs text-[#787671] flex items-center gap-2">
          <button onClick={() => navigateTo('home')} className="hover:text-[#c99558]">
            Home
          </button>
          <span>/</span>
          <span className="text-[#f5f3ef]">
            {selectedCategory === 'all'
              ? 'All Bakery Items'
              : CATEGORIES.find((c) => c.slug === selectedCategory)?.name || 'Shop'}
          </span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-1">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
              {selectedCategory === 'all'
                ? 'Artisan Bakery Menu'
                : CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
            </h1>
            <p className="text-xs text-[#a8a69e] mt-1">
              Showing {filteredProducts.length} handcrafted products baked fresh in Dhaka
            </p>
          </div>

          {/* Sort Control */}
          <div className="flex items-center gap-3 self-start md:self-auto">
            {/* Mobile filter toggle */}
            <button
              onClick={() => setIsMobileFilterOpen(true)}
              className="lg:hidden py-2 px-3.5 rounded-lg bg-[#181822] hover:bg-[#242432] border border-[#2d2d3e] text-xs font-semibold text-[#f5f3ef] flex items-center gap-2 cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4 text-[#c99558]" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="hidden sm:inline text-xs text-[#8c8983]">Sort by:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#181822] border border-[#2d2d3e] rounded-lg px-3 py-2 text-xs font-medium text-[#f5f3ef] focus:border-[#c99558] focus:outline-none cursor-pointer pr-8"
                >
                  <option value="featured">Featured Masterpieces</option>
                  <option value="bestselling">Most Popular (Bestseller)</option>
                  <option value="newest">Fresh New Additions</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeFiltersCount > 0 && (
          <div className="flex flex-wrap items-center gap-2 pt-3">
            <span className="text-xs text-[#73716d]">Active filters:</span>
            {selectedCategory !== 'all' && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e1e2c] border border-[#333346] text-xs text-[#dedbd4]">
                Category: {CATEGORIES.find((c) => c.slug === selectedCategory)?.name}
                <button
                  onClick={() => setSelectedCategory('all')}
                  className="hover:text-[#ef4444]"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {onlyEggless && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#16291e] border border-[#2b4c37] text-xs text-[#55c786]">
                Eggless Only
                <button onClick={() => setOnlyEggless(false)} className="hover:text-[#ef4444]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {maxPrice < 6000 && (
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e1e2c] border border-[#333346] text-xs text-[#dedbd4]">
                Under ৳{maxPrice}
                <button onClick={() => setMaxPrice(6000)} className="hover:text-[#ef4444]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
            {selectedFlavors.map((flv) => (
              <span
                key={flv}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e1e2c] border border-[#333346] text-xs text-[#dedbd4]"
              >
                {flv}
                <button onClick={() => toggleFlavor(flv)} className="hover:text-[#ef4444]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {selectedSizes.map((sz) => (
              <span
                key={sz}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#1e1e2c] border border-[#333346] text-xs text-[#dedbd4]"
              >
                {sz}
                <button onClick={() => toggleSize(sz)} className="hover:text-[#ef4444]">
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={resetAllFilters}
              className="text-xs text-[#c99558] hover:underline ml-1"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Main Grid + Sidebar Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar (1 Column) */}
        <aside className="hidden lg:block lg:col-span-1 bg-[#101015] border border-[#22222d] rounded-xl p-5 h-fit sticky top-24">
          {FilterControls}
        </aside>

        {/* Product Grid (3 Columns on Desktop) */}
        <div className="lg:col-span-3">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 px-4 bg-[#121217] border border-[#22222d] rounded-2xl space-y-3">
              <div className="w-14 h-14 rounded-full bg-[#1c1c27] flex items-center justify-center mx-auto text-[#73716d]">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-semibold text-[#f5f3ef]">
                No bakes matched your filter criteria
              </h3>
              <p className="text-xs text-[#8c8983] max-w-sm mx-auto">
                Try widening your price range or clearing some of the dietary/flavor filters to explore our full menu.
              </p>
              <button
                onClick={resetAllFilters}
                className="mt-4 px-5 py-2.5 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] text-xs font-semibold transition-all cursor-pointer"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 xl:grid-cols-3 gap-3.5 sm:gap-5">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div
          className="fixed inset-0 z-50 lg:hidden overflow-hidden"
          role="dialog"
          aria-modal="true"
        >
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-xs"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="fixed inset-y-0 right-0 max-w-xs w-full bg-[#0f0f14] border-l border-[#262633] p-5 overflow-y-auto flex flex-col justify-between shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="space-y-6">
              <div className="flex items-center justify-between pb-3 border-b border-[#22222d]">
                <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">Filters</h3>
                <button
                  onClick={() => setIsMobileFilterOpen(false)}
                  className="p-1 rounded text-[#8c8983] hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              {FilterControls}
            </div>

            <div className="pt-6 border-t border-[#22222d] mt-6">
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="w-full py-3 rounded-lg bg-[#c99558] text-[#0c0c0e] font-bold text-xs shadow-md"
              >
                Show {filteredProducts.length} Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
