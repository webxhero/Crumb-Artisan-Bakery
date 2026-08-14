import React, { useState } from 'react';
import {
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Truck,
  Sparkles,
  Tag,
  ShieldCheck,
  Check,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DHAKA_DELIVERY_ZONES } from '../data/locations';

export const CartPage: React.FC = () => {
  const {
    cart,
    cartCount,
    cartSubtotal,
    freeDeliveryThreshold,
    progressToFreeDelivery,
    amountNeededForFreeDelivery,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    navigateTo,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    discountAmount,
    couponError,
    selectedZone,
    setSelectedZone,
    deliveryFee,
    orderGrandTotal,
  } = useStore();

  const [couponInput, setCouponInput] = useState('');

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput.trim()) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-[#181824] border border-[#2c2c3e] flex items-center justify-center mx-auto text-[#73716d]">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#f5f3ef]">Your Basket is Empty</h1>
        <p className="text-xs sm:text-sm text-[#a8a69e] max-w-sm mx-auto leading-relaxed">
          Looks like you haven't added any fresh bakes yet. Explore our handcrafted cakes, croissants, and artisan breads.
        </p>
        <div className="pt-4">
          <button
            onClick={() => navigateTo('shop')}
            className="py-3 px-6 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-xs sm:text-sm inline-flex items-center gap-2 shadow-md transition-all cursor-pointer"
          >
            <span>Explore Bakery Menu</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="space-y-1">
        <nav className="text-xs text-[#787670] flex items-center gap-2">
          <button onClick={() => navigateTo('home')} className="hover:text-[#c99558]">
            Home
          </button>
          <span>/</span>
          <span className="text-[#dedbd4]">Shopping Basket</span>
        </nav>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
          Your Shopping Basket ({cartCount} {cartCount === 1 ? 'item' : 'items'})
        </h1>
      </div>

      {/* Free Delivery Meter */}
      <div className="p-4 bg-[#14141c] border border-[#242434] rounded-xl text-xs space-y-2">
        <div className="flex items-center justify-between font-medium">
          <span className="flex items-center gap-2 text-[#dedbd4]">
            <Truck className="w-4 h-4 text-[#c99558]" />
            {amountNeededForFreeDelivery === 0 ? (
              <span className="text-[#38b273] font-semibold">
                Congratulations! You’ve unlocked Free Express Delivery across Dhaka.
              </span>
            ) : (
              <span>
                Add <strong className="text-[#c99558]">৳{amountNeededForFreeDelivery.toLocaleString()}</strong> more to your basket for free delivery
              </span>
            )}
          </span>
          <span className="text-[#8c8983]">
            ৳{cartSubtotal.toLocaleString()} / ৳{freeDeliveryThreshold.toLocaleString()}
          </span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#20202c] overflow-hidden">
          <div
            className={`h-full transition-all duration-500 rounded-full ${
              amountNeededForFreeDelivery === 0 ? 'bg-[#38b273]' : 'bg-[#c99558]'
            }`}
            style={{ width: `${progressToFreeDelivery}%` }}
          />
        </div>
      </div>

      {/* 2-Column Cart Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Cart Table (8 cols on lg) */}
        <div className="lg:col-span-8 space-y-4">
          <div className="bg-[#111116] border border-[#242432] rounded-xl overflow-hidden shadow-md divide-y divide-[#1e1e28]">
            {/* Desktop Table Header */}
            <div className="hidden sm:grid grid-cols-12 gap-4 p-4 text-xs font-semibold uppercase tracking-wider text-[#73716d] bg-[#161620]">
              <div className="col-span-6">Product Details</div>
              <div className="col-span-2 text-center">Unit Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-right">Line Total</div>
            </div>

            {/* Cart Items */}
            {cart.map((item) => (
              <div key={item.cartItemId} className="p-4 sm:p-5 flex flex-col sm:grid sm:grid-cols-12 gap-4 items-center">
                {/* Product details */}
                <div className="sm:col-span-6 flex items-center gap-3.5 w-full">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover bg-[#1c1c24] border border-[#292938] shrink-0"
                    referrerPolicy="no-referrer"
                  />
                  <div className="min-w-0 space-y-1">
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#c99558] block">
                      {item.product.categoryName}
                    </span>
                    <h3 className="text-sm font-semibold text-[#f5f3ef] leading-snug line-clamp-1">
                      {item.product.name}
                    </h3>

                    {/* Variations */}
                    <div className="flex flex-wrap gap-1.5 pt-0.5">
                      {item.selectedOptions.size && (
                        <span className="text-[10px] bg-[#1a1a24] text-[#a8a69e] border border-[#2b2b3a] px-2 py-0.5 rounded">
                          {item.selectedOptions.size}
                        </span>
                      )}
                      {item.selectedOptions.flavor && (
                        <span className="text-[10px] bg-[#1a1a24] text-[#a8a69e] border border-[#2b2b3a] px-2 py-0.5 rounded">
                          {item.selectedOptions.flavor}
                        </span>
                      )}
                      {item.selectedOptions.isEggless && (
                        <span className="text-[10px] bg-[#16291e] text-[#55c786] border border-[#264731] px-2 py-0.5 rounded">
                          Eggless
                        </span>
                      )}
                    </div>

                    {/* Cake message preview */}
                    {item.selectedOptions.cakeMessage && (
                      <div className="text-[11px] text-[#c99558] bg-[#181612] border border-[#3b2e1d] px-2 py-0.5 rounded line-clamp-1">
                        💬 "{item.selectedOptions.cakeMessage}"
                      </div>
                    )}
                  </div>
                </div>

                {/* Unit Price */}
                <div className="sm:col-span-2 text-center hidden sm:block">
                  <span className="text-xs text-[#dedbd4] font-medium">
                    ৳{item.unitPrice.toLocaleString()}
                  </span>
                </div>

                {/* Quantity Control */}
                <div className="sm:col-span-2 flex items-center justify-between sm:justify-center w-full sm:w-auto">
                  <div className="flex items-center border border-[#2c2c3b] rounded-lg bg-[#161622] overflow-hidden">
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, -1)}
                      className="px-2.5 py-1 text-xs text-[#a8a69e] hover:bg-[#20202c] transition-colors"
                      aria-label="Decrease quantity"
                    >
                      -
                    </button>
                    <span className="px-2.5 text-xs font-bold text-[#f5f3ef]">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => updateCartQuantity(item.cartItemId, 1)}
                      className="px-2.5 py-1 text-xs text-[#a8a69e] hover:bg-[#20202c] transition-colors"
                      aria-label="Increase quantity"
                    >
                      +
                    </button>
                  </div>

                  {/* Mobile delete button */}
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="sm:hidden text-[#73716d] hover:text-[#ef4444] p-1"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Line total & remove */}
                <div className="sm:col-span-2 flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
                  <span className="text-sm font-bold text-[#f5f3ef] font-sans">
                    ৳{(item.unitPrice * item.quantity).toLocaleString()}
                  </span>
                  <button
                    onClick={() => removeFromCart(item.cartItemId)}
                    className="hidden sm:block text-[#6b6964] hover:text-[#ef4444] p-1 rounded transition-colors"
                    aria-label="Remove item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Action Row */}
          <div className="flex items-center justify-between pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="text-xs text-[#dedbd4] hover:text-[#c99558] flex items-center gap-1.5 font-semibold transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Continue Browsing Bakery</span>
            </button>

            <button
              onClick={clearCart}
              className="text-xs text-[#73716d] hover:text-[#ef4444] underline cursor-pointer"
            >
              Empty Basket
            </button>
          </div>
        </div>

        {/* Right Column: Order Summary & Dhaka Estimator (4 cols on lg) */}
        <div className="lg:col-span-4 space-y-5">
          <div className="bg-[#111116] border border-[#242432] rounded-xl p-5 sm:p-6 shadow-xl space-y-5">
            <h2 className="font-serif text-lg font-bold text-[#f5f3ef] pb-3 border-b border-[#22222e]">
              Order Summary
            </h2>

            {/* Dhaka Delivery Zone Estimator */}
            <div className="space-y-2 text-xs">
              <label className="font-semibold text-[#dedbd4] block">
                Estimated Delivery Destination:
              </label>
              <select
                value={selectedZone.id}
                onChange={(e) => {
                  const z = DHAKA_DELIVERY_ZONES.find((zone) => zone.id === e.target.value);
                  if (z) setSelectedZone(z);
                }}
                className="w-full bg-[#161620] border border-[#2c2c3d] rounded-lg px-3 py-2 text-xs text-[#dedbd4] focus:border-[#c99558] focus:outline-none cursor-pointer"
              >
                {DHAKA_DELIVERY_ZONES.map((zone) => (
                  <option key={zone.id} value={zone.id}>
                    {zone.name} (৳{zone.deliveryFee} standard)
                  </option>
                ))}
              </select>
              <span className="text-[11px] text-[#73716d] block">
                Estimated arrival: {selectedZone.estimatedHours}
              </span>
            </div>

            {/* Promo Code Box */}
            <div className="pt-2 border-t border-[#20202c] space-y-2">
              <label className="text-xs font-semibold text-[#dedbd4] block">
                Promotional Coupon:
              </label>
              {!appliedCoupon ? (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. VELVET15"
                    className="flex-1 bg-[#161620] border border-[#2b2b3a] rounded-lg px-3 py-2 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:border-[#c99558] focus:outline-none uppercase"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 rounded-lg bg-[#242434] hover:bg-[#303046] text-xs font-semibold text-[#dedbd4] hover:text-[#c99558] transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              ) : (
                <div className="flex items-center justify-between p-2.5 rounded-lg bg-[#1b1812] border border-[#3d2e1d] text-xs">
                  <div className="flex items-center gap-2 text-[#c99558] font-semibold">
                    <Tag className="w-3.5 h-3.5" />
                    <span>{appliedCoupon.code} Applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-[#8c8983] hover:text-[#ef4444] underline cursor-pointer"
                  >
                    Remove
                  </button>
                </div>
              )}
              {couponError && <p className="text-[11px] text-[#ef4444]">{couponError}</p>}
            </div>

            {/* Calculations Breakdown */}
            <div className="space-y-2.5 text-xs text-[#a8a69e] pt-3 border-t border-[#20202c]">
              <div className="flex justify-between">
                <span>Cart Subtotal</span>
                <span className="text-[#f5f3ef] font-semibold">৳{cartSubtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#c99558]">
                  <span>Coupon Discount ({appliedCoupon?.code})</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Delivery ({selectedZone.name})</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#38b273] font-semibold">FREE</span>
                  ) : (
                    `৳${deliveryFee.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#f5f3ef] pt-3 border-t border-[#242434]">
                <span>Grand Total</span>
                <span className="text-xl text-[#c99558] font-sans">
                  ৳{orderGrandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-3.5 px-4 rounded-xl bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-sm flex items-center justify-center gap-2 shadow-lg transition-all active:scale-98 cursor-pointer"
            >
              <span>Proceed to Secure Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Trust Badges */}
            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#73716d]">
              <ShieldCheck className="w-3.5 h-3.5 text-[#c99558]" />
              <span>SSL Secured & Verified Bangladesh Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
