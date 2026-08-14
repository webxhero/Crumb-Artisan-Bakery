import React, { useState, useEffect } from 'react';
import { Search, Heart, ShoppingBag, User, Menu, ChevronDown, Sparkles } from 'lucide-react';
import { useStore, AppRoute } from '../context/StoreContext';
import { CategorySlug } from '../types';

interface HeaderProps {
  onOpenMobileMenu?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenMobileMenu }) => {
  const {
    route,
    routeParam,
    navigateTo,
    cartCount,
    cartSubtotal,
    setIsCartDrawerOpen,
    wishlistCount,
    setIsSearchOpen,
    setIsMobileMenuOpen,
  } = useStore();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isCakesDropdownOpen, setIsCakesDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenMenu = () => {
    if (onOpenMobileMenu) {
      onOpenMobileMenu();
    } else {
      setIsMobileMenuOpen(true);
    }
  };

  const navLinks: { label: string; route: AppRoute; param?: string; isSpecial?: boolean }[] = [
    { label: 'Home', route: 'home' },
    { label: 'Shop All', route: 'shop' },
    { label: 'Pastries', route: 'category', param: 'pastries' },
    { label: 'Croissants', route: 'category', param: 'croissants' },
    { label: 'Artisan Bread', route: 'category', param: 'artisan-bread' },
    { label: 'Cookies', route: 'category', param: 'cookies' },
    { label: 'Gift Boxes', route: 'category', param: 'gift-boxes' },
    { label: 'Offers', route: 'offers', isSpecial: true },
  ];

  const cakeSubCategories = [
    { label: 'Celebration Cakes', param: 'celebration-cakes', desc: 'Custom centerpieces for weddings & galas' },
    { label: 'Birthday Cakes', param: 'birthday-cakes', desc: 'Handcrafted joy for memorable milestones' },
    { label: 'Belgian Chocolate Cakes', param: 'chocolate-cakes', desc: 'Intense single-origin cocoa ganache' },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#0c0c0e]/95 backdrop-blur-md border-b border-[#25252e] py-2.5 sm:py-3 shadow-[0_8px_30px_rgba(0,0,0,0.6)]'
          : 'bg-[#0c0c0e] border-b border-[#1f1f26] py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between gap-2 sm:gap-4">
        {/* Left: Mobile Menu Trigger & Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <button
            type="button"
            onClick={handleOpenMenu}
            className="lg:hidden p-2 rounded-lg text-[#dedbd4] hover:text-[#c99558] hover:bg-[#1a1a22] border border-[#262633] focus:outline-none focus:ring-1 focus:ring-[#c99558] transition-colors shrink-0 cursor-pointer"
            aria-label="Open mobile menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Brand Logo */}
          <button
            onClick={() => navigateTo('home')}
            className="flex items-center gap-2 sm:gap-2.5 text-left group cursor-pointer shrink-0"
          >
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded bg-gradient-to-br from-[#c99558] to-[#96632c] flex items-center justify-center text-[#0c0c0e] font-serif font-bold text-sm sm:text-base shadow-sm border border-[#e2b57e]/30 group-hover:scale-105 transition-transform duration-200 shrink-0">
              V
            </div>
            <div className="min-w-0">
              <span className="font-serif text-base sm:text-lg lg:text-xl font-bold tracking-tight text-[#f5f3ef] block leading-none whitespace-nowrap">
                Velvet <span className="text-[#c99558] font-normal">&</span> Crumb
              </span>
              <span className="hidden sm:block text-[9px] lg:text-[10px] uppercase tracking-[0.18em] text-[#8e8c87] font-sans mt-0.5 whitespace-nowrap">
                Artisan Patisserie • Dhaka
              </span>
            </div>
          </button>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-medium" aria-label="Main Navigation">
          <button
            onClick={() => navigateTo('home')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              route === 'home'
                ? 'text-[#c99558] bg-[#1a1a22]'
                : 'text-[#d6d4cd] hover:text-white hover:bg-[#141418]'
            }`}
          >
            Home
          </button>

          <button
            onClick={() => navigateTo('shop')}
            className={`px-3 py-1.5 rounded-md transition-colors ${
              route === 'shop'
                ? 'text-[#c99558] bg-[#1a1a22]'
                : 'text-[#d6d4cd] hover:text-white hover:bg-[#141418]'
            }`}
          >
            Shop
          </button>

          {/* Cakes Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setIsCakesDropdownOpen(true)}
            onMouseLeave={() => setIsCakesDropdownOpen(false)}
          >
            <button
              onClick={() => navigateTo('category', 'celebration-cakes')}
              className={`flex items-center gap-1 px-3 py-1.5 rounded-md transition-colors ${
                route === 'category' &&
                ['celebration-cakes', 'birthday-cakes', 'chocolate-cakes'].includes(routeParam)
                  ? 'text-[#c99558] bg-[#1a1a22]'
                  : 'text-[#d6d4cd] hover:text-white hover:bg-[#141418]'
              }`}
            >
              <span>Cakes</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isCakesDropdownOpen ? 'rotate-180 text-[#c99558]' : 'text-[#7e7c77]'}`} />
            </button>

            {isCakesDropdownOpen && (
              <div className="absolute left-0 mt-1 w-64 rounded-lg bg-[#141419] border border-[#272732] shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                {cakeSubCategories.map((sub) => (
                  <button
                    key={sub.param}
                    onClick={() => {
                      navigateTo('category', sub.param);
                      setIsCakesDropdownOpen(false);
                    }}
                    className="w-full text-left px-3 py-2.5 rounded-md hover:bg-[#1f1f29] transition-colors group/item block"
                  >
                    <div className="text-sm font-medium text-[#f5f3ef] group-hover/item:text-[#c99558] transition-colors">
                      {sub.label}
                    </div>
                    <div className="text-xs text-[#8c8983] mt-0.5">{sub.desc}</div>
                  </button>
                ))}
              </div>
            )}
          </div>

          {navLinks.slice(2).map((item) => {
            const isActive =
              (item.route === 'category' && route === 'category' && routeParam === item.param) ||
              (item.route === route && !item.param);

            return (
              <button
                key={item.label}
                onClick={() => navigateTo(item.route, item.param)}
                className={`px-3 py-1.5 rounded-md transition-colors relative ${
                  isActive
                    ? 'text-[#c99558] bg-[#1a1a22]'
                    : item.isSpecial
                    ? 'text-[#e6b980] hover:text-[#f8d29d] font-semibold'
                    : 'text-[#d6d4cd] hover:text-white hover:bg-[#141418]'
                }`}
              >
                <span className="flex items-center gap-1">
                  {item.isSpecial && <Sparkles className="w-3 h-3 text-[#c99558]" />}
                  {item.label}
                </span>
              </button>
            );
          })}
        </nav>

        {/* Right: Actions (Search, Wishlist, Account, Cart) */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            className="flex items-center gap-2 p-2 sm:px-3 sm:py-1.5 rounded-md text-[#d6d4cd] hover:text-white hover:bg-[#1a1a22] transition-colors group"
            aria-label="Search bakery products"
          >
            <Search className="w-4 h-4 text-[#a8a69e] group-hover:text-[#c99558] transition-colors" />
            <span className="hidden xl:inline text-xs text-[#82807a]">Search bakes...</span>
            <kbd className="hidden xl:inline text-[10px] text-[#716f6b] bg-[#1a1a22] px-1.5 py-0.5 rounded border border-[#2d2d38]">
              ⌘K
            </kbd>
          </button>

          {/* Account / Track Order */}
          <button
            onClick={() => navigateTo('account')}
            className={`p-2 rounded-md transition-colors ${
              route === 'account'
                ? 'text-[#c99558] bg-[#1a1a22]'
                : 'text-[#d6d4cd] hover:text-white hover:bg-[#1a1a22]'
            }`}
            aria-label="Customer Account & Orders"
          >
            <User className="w-4 h-4" />
          </button>

          {/* Wishlist Button */}
          <button
            onClick={() => navigateTo('wishlist')}
            className={`p-2 rounded-md transition-colors relative ${
              route === 'wishlist'
                ? 'text-[#c99558] bg-[#1a1a22]'
                : 'text-[#d6d4cd] hover:text-white hover:bg-[#1a1a22]'
            }`}
            aria-label={`Wishlist with ${wishlistCount} items`}
          >
            <Heart className={`w-4 h-4 ${wishlistCount > 0 ? 'text-[#c99558] fill-[#c99558]/20' : ''}`} />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#c99558] text-[#0c0c0e] text-[10px] font-bold flex items-center justify-center leading-none">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Trigger */}
          <button
            onClick={() => setIsCartDrawerOpen(true)}
            className="flex items-center gap-2 py-1.5 px-3 rounded-md bg-[#1a1a24] hover:bg-[#232330] border border-[#2b2b38] text-[#f5f3ef] transition-all hover:border-[#c99558]/50 group"
            aria-label={`Open shopping cart with ${cartCount} items`}
          >
            <div className="relative">
              <ShoppingBag className="w-4 h-4 text-[#c99558] group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[#c99558] text-[#0c0c0e] text-[10px] font-bold flex items-center justify-center leading-none">
                  {cartCount}
                </span>
              )}
            </div>
            <span className="hidden sm:inline text-xs font-semibold text-[#f5f3ef]">
              ৳{cartSubtotal.toLocaleString()}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
