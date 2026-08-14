import React, { useEffect, useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Sparkles, Truck, Check, Tag } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const CartDrawer: React.FC = () => {
  const {
    isCartDrawerOpen,
    setIsCartDrawerOpen,
    cart,
    cartCount,
    cartSubtotal,
    freeDeliveryThreshold,
    progressToFreeDelivery,
    amountNeededForFreeDelivery,
    updateCartQuantity,
    removeFromCart,
    navigateTo,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    couponError,
  } = useStore();

  const [couponCodeInput, setCouponCodeInput] = useState('');

  useEffect(() => {
    if (isCartDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isCartDrawerOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isCartDrawerOpen) {
        setIsCartDrawerOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isCartDrawerOpen, setIsCartDrawerOpen]);

  if (!isCartDrawerOpen) return null;

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponCodeInput.trim()) {
      applyCoupon(couponCodeInput);
      setCouponCodeInput('');
    }
  };

  const handleGoToCheckout = () => {
    setIsCartDrawerOpen(false);
    navigateTo('checkout');
  };

  const handleGoToCart = () => {
    setIsCartDrawerOpen(false);
    navigateTo('cart');
  };

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Shopping Cart Drawer"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
        onClick={() => setIsCartDrawerOpen(false)}
      />

      {/* Drawer Panel */}
      <div className="fixed inset-y-0 right-0 max-w-md w-full bg-[#101014] border-l border-[#272734] shadow-2xl flex flex-col z-10 animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-[#20202b] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#c99558]" />
            <h2 className="font-serif text-lg font-bold text-[#f5f3ef]">
              Your Basket ({cartCount} {cartCount === 1 ? 'item' : 'items'})
            </h2>
          </div>
          <button
            onClick={() => setIsCartDrawerOpen(false)}
            className="p-1.5 rounded-md text-[#8c8983] hover:text-[#f5f3ef] hover:bg-[#1a1a22] transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Meter */}
        <div className="p-3.5 bg-[#16161e] border-b border-[#22222d] text-xs">
          <div className="flex items-center justify-between mb-1.5 font-medium">
            <span className="flex items-center gap-1.5 text-[#dedbd4]">
              <Truck className="w-3.5 h-3.5 text-[#c99558]" />
              {amountNeededForFreeDelivery === 0 ? (
                <span className="text-[#38b273] font-semibold">
                  You’ve unlocked Free Express Delivery!
                </span>
              ) : (
                <span>
                  Add <strong className="text-[#c99558]">৳{amountNeededForFreeDelivery.toLocaleString()}</strong> more for free Dhaka delivery
                </span>
              )}
            </span>
            <span className="text-[11px] text-[#8c8983]">
              ৳{cartSubtotal.toLocaleString()} / ৳{freeDeliveryThreshold.toLocaleString()}
            </span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-[#242430] overflow-hidden">
            <div
              className={`h-full transition-all duration-500 rounded-full ${
                amountNeededForFreeDelivery === 0 ? 'bg-[#38b273]' : 'bg-[#c99558]'
              }`}
              style={{ width: `${progressToFreeDelivery}%` }}
            />
          </div>
        </div>

        {/* Cart Item List / Empty State */}
        {cart.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-16 h-16 rounded-full bg-[#181822] flex items-center justify-center text-[#73716d] mb-4">
              <ShoppingBag className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl font-semibold text-[#f5f3ef]">Your basket is empty</h3>
            <p className="text-xs text-[#8c8983] max-w-xs mt-1.5 leading-relaxed">
              Explore our freshly baked artisanal cakes, croissants, and gourmet pastries baked fresh daily.
            </p>
            <button
              onClick={() => {
                setIsCartDrawerOpen(false);
                navigateTo('shop');
              }}
              className="mt-6 py-2.5 px-5 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
            >
              <span>Explore Bakery Menu</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-[#1e1e28]">
            {cart.map((item) => (
              <div key={item.cartItemId} className="py-3.5 flex gap-3.5 group">
                <img
                  src={item.product.images[0]}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-lg object-cover bg-[#1c1c24] border border-[#272734] shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-1">
                    <h4 className="text-sm font-medium text-[#f5f3ef] leading-snug line-clamp-1">
                      {item.product.name}
                    </h4>
                    <button
                      onClick={() => removeFromCart(item.cartItemId)}
                      className="text-[#6b6964] hover:text-[#ef4444] p-0.5 rounded transition-colors"
                      aria-label={`Remove ${item.product.name} from basket`}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Variation tags */}
                  <div className="flex flex-wrap gap-1 mt-1">
                    {item.selectedOptions.size && (
                      <span className="text-[10px] bg-[#1a1a24] text-[#a8a69e] border border-[#2a2a38] px-1.5 py-0.2 rounded">
                        {item.selectedOptions.size}
                      </span>
                    )}
                    {item.selectedOptions.flavor && (
                      <span className="text-[10px] bg-[#1a1a24] text-[#a8a69e] border border-[#2a2a38] px-1.5 py-0.2 rounded">
                        {item.selectedOptions.flavor}
                      </span>
                    )}
                    {item.selectedOptions.isEggless && (
                      <span className="text-[10px] bg-[#16291e] text-[#55c786] border border-[#264731] px-1.5 py-0.2 rounded">
                        Eggless
                      </span>
                    )}
                  </div>

                  {/* Piped Message Preview */}
                  {item.selectedOptions.cakeMessage && (
                    <div className="mt-1 text-[11px] text-[#c99558] bg-[#1a1815] border border-[#3b2d1d] px-2 py-0.5 rounded line-clamp-1">
                      💬 "{item.selectedOptions.cakeMessage}"
                    </div>
                  )}

                  {/* Quantity & Price Row */}
                  <div className="flex items-center justify-between mt-2.5">
                    <div className="flex items-center border border-[#2c2c3b] rounded-md bg-[#14141c] overflow-hidden">
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, -1)}
                        className="px-2 py-1 text-xs text-[#a8a69e] hover:bg-[#20202c] transition-colors"
                        aria-label="Decrease quantity"
                      >
                        -
                      </button>
                      <span className="px-2 text-xs font-semibold text-[#f5f3ef]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateCartQuantity(item.cartItemId, 1)}
                        className="px-2 py-1 text-xs text-[#a8a69e] hover:bg-[#20202c] transition-colors"
                        aria-label="Increase quantity"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="text-xs font-bold text-[#f5f3ef]">
                        ৳{(item.unitPrice * item.quantity).toLocaleString()}
                      </div>
                      {item.quantity > 1 && (
                        <div className="text-[10px] text-[#716f6b]">
                          ৳{item.unitPrice.toLocaleString()} each
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer with totals and checkout */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 border-t border-[#20202b] bg-[#0c0c0f] space-y-3">
            {/* Quick Promo code */}
            {!appliedCoupon ? (
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <input
                  type="text"
                  value={couponCodeInput}
                  onChange={(e) => setCouponCodeInput(e.target.value)}
                  placeholder="Promo code (e.g. VELVET15)"
                  className="flex-1 bg-[#161620] border border-[#2a2a38] rounded-lg px-3 py-1.5 text-xs text-[#f5f3ef] placeholder-[#66645e] focus:border-[#c99558] focus:outline-none uppercase"
                />
                <button
                  type="submit"
                  className="px-3 py-1.5 rounded-lg bg-[#242432] hover:bg-[#303042] text-xs font-medium text-[#dedbd4] hover:text-[#c99558] transition-colors cursor-pointer"
                >
                  Apply
                </button>
              </form>
            ) : (
              <div className="flex items-center justify-between p-2 rounded-lg bg-[#1a1712] border border-[#3b2e1c] text-xs">
                <span className="flex items-center gap-1.5 text-[#c99558] font-medium">
                  <Tag className="w-3.5 h-3.5" />
                  {appliedCoupon.code} applied (-৳{discountAmount.toLocaleString()})
                </span>
                <button
                  onClick={removeCoupon}
                  className="text-xs text-[#8c8983] hover:text-[#ef4444] underline cursor-pointer"
                >
                  Remove
                </button>
              </div>
            )}
            {couponError && <p className="text-[11px] text-[#ef4444]">{couponError}</p>}

            {/* Calculations */}
            <div className="space-y-1.5 text-xs text-[#a8a69e] pt-1">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#f5f3ef] font-semibold">৳{cartSubtotal.toLocaleString()}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-[#c99558]">
                  <span>Discount</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between text-[11px]">
                <span>Dhaka Delivery</span>
                <span>
                  {amountNeededForFreeDelivery === 0 ? (
                    <span className="text-[#38b273] font-semibold">FREE</span>
                  ) : (
                    'Calculated at checkout'
                  )}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#f5f3ef] pt-1.5 border-t border-[#1f1f2a]">
                <span>Estimated Total</span>
                <span className="text-base text-[#c99558]">
                  ৳{(cartSubtotal - discountAmount).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Buttons */}
            <div className="grid grid-cols-2 gap-2 pt-1">
              <button
                onClick={handleGoToCart}
                className="py-2.5 px-3 rounded-lg bg-[#181822] hover:bg-[#222230] text-[#dedbd4] border border-[#2b2b3a] text-xs font-semibold text-center transition-colors cursor-pointer"
              >
                View Full Cart
              </button>

              <button
                onClick={handleGoToCheckout}
                className="py-2.5 px-3 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] text-xs font-bold flex items-center justify-center gap-1.5 shadow-md transition-all active:scale-98 cursor-pointer"
              >
                <span>Checkout</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
