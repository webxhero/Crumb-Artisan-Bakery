import React, { useEffect } from 'react';
import { X, ChevronRight, Heart, User, Sparkles, MapPin, Phone, Clock, ShoppingBag } from 'lucide-react';
import { useStore, AppRoute } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';

interface MobileMenuProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const {
    navigateTo,
    route,
    routeParam,
    wishlistCount,
    cartCount,
    isMobileMenuOpen,
    setIsMobileMenuOpen,
  } = useStore();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isMobileMenuOpen;
  const onClose = propOnClose || (() => setIsMobileMenuOpen(false));

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleNav = (targetRoute: AppRoute, param?: string) => {
    navigateTo(targetRoute, param);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Navigation Menu">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 animate-in fade-in"
        onClick={onClose}
      />

      {/* Slide-in Drawer */}
      <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#0f0f13] border-r border-[#262633] text-[#dedbd4] shadow-2xl flex flex-col z-10 animate-in slide-in-from-left duration-300">
        {/* Header */}
        <div className="p-4 border-b border-[#22222d] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-[#c99558] to-[#96632c] flex items-center justify-center text-[#0c0c0e] font-serif font-bold text-base">
              V
            </div>
            <div>
              <span className="font-serif text-lg font-bold text-[#f5f3ef] block leading-none">
                Velvet <span className="text-[#c99558] font-normal">&</span> Crumb
              </span>
              <span className="text-[9px] uppercase tracking-widest text-[#82807a]">Artisan Bakery</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md text-[#a8a69e] hover:text-white hover:bg-[#1a1a22] transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Action Pills */}
        <div className="grid grid-cols-2 gap-2 p-3 border-b border-[#22222d] bg-[#14141a]">
          <button
            onClick={() => handleNav('wishlist')}
            className="flex items-center justify-center gap-2 p-2 rounded-md bg-[#1c1c24] border border-[#2b2b38] text-xs font-medium text-[#dedbd4] hover:text-[#c99558] transition-colors"
          >
            <Heart className="w-3.5 h-3.5 text-[#c99558]" />
            <span>Wishlist ({wishlistCount})</span>
          </button>

          <button
            onClick={() => handleNav('account')}
            className="flex items-center justify-center gap-2 p-2 rounded-md bg-[#1c1c24] border border-[#2b2b38] text-xs font-medium text-[#dedbd4] hover:text-[#c99558] transition-colors"
          >
            <User className="w-3.5 h-3.5 text-[#c99558]" />
            <span>Account</span>
          </button>
        </div>

        {/* Scrollable Categories & Navigation */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Main Links */}
          <div className="space-y-1">
            <button
              onClick={() => handleNav('home')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                route === 'home' ? 'text-[#c99558] bg-[#1c1c25]' : 'text-[#dedbd4] hover:bg-[#1a1a22]'
              }`}
            >
              Home
            </button>

            <button
              onClick={() => handleNav('shop')}
              className={`w-full text-left px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                route === 'shop' ? 'text-[#c99558] bg-[#1c1c25]' : 'text-[#dedbd4] hover:bg-[#1a1a22]'
              }`}
            >
              All Bakery Products
            </button>

            <button
              onClick={() => handleNav('offers')}
              className="w-full text-left px-3 py-2 rounded-md text-sm font-medium text-[#e6b980] hover:bg-[#1a1a22] flex items-center justify-between"
            >
              <span className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#c99558]" />
                Special Offers & Hampers
              </span>
              <span className="text-[10px] bg-[#c99558]/20 text-[#c99558] px-1.5 py-0.5 rounded font-bold">
                15% OFF
              </span>
            </button>
          </div>

          {/* Category List */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#7e7c77] font-semibold px-3 mb-2">
              Explore Collections
            </div>
            <div className="space-y-1">
              {CATEGORIES.map((cat) => {
                const isActive = route === 'category' && routeParam === cat.slug;
                return (
                  <button
                    key={cat.id}
                    onClick={() => handleNav('category', cat.slug)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                      isActive
                        ? 'text-[#c99558] bg-[#1c1c25] font-medium'
                        : 'text-[#bbb8af] hover:text-white hover:bg-[#171720]'
                    }`}
                  >
                    <span>{cat.name}</span>
                    <ChevronRight className="w-3.5 h-3.5 text-[#5e5c57]" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* Information Links */}
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#7e7c77] font-semibold px-3 mb-2">
              Bakery Information
            </div>
            <div className="space-y-1 text-sm text-[#a8a69e]">
              <button onClick={() => handleNav('about')} className="w-full text-left px-3 py-1.5 hover:text-white block">
                Our Story & Philosophy
              </button>
              <button onClick={() => handleNav('delivery')} className="w-full text-left px-3 py-1.5 hover:text-white block">
                Dhaka Delivery Areas & Times
              </button>
              <button onClick={() => handleNav('faq')} className="w-full text-left px-3 py-1.5 hover:text-white block">
                FAQs & Custom Orders
              </button>
              <button onClick={() => handleNav('contact')} className="w-full text-left px-3 py-1.5 hover:text-white block">
                Contact & Kitchen Location
              </button>
            </div>
          </div>
        </div>

        {/* Footer info in menu */}
        <div className="p-4 border-t border-[#22222d] bg-[#0c0c0f] space-y-2 text-xs text-[#8e8c86]">
          <div className="flex items-center gap-2">
            <Phone className="w-3.5 h-3.5 text-[#c99558]" />
            <span>Hotline: +880 1700-112233</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-3.5 h-3.5 text-[#c99558]" />
            <span>Gulshan-2 Artisan Kitchen, Dhaka</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-3.5 h-3.5 text-[#c99558]" />
            <span>Daily: 8:00 AM - 10:00 PM</span>
          </div>
        </div>
      </div>
    </div>
  );
};
