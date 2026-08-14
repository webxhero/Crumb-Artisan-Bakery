import React, { useState } from 'react';
import {
  ShieldCheck,
  Truck,
  CheckCircle2,
  Lock,
  ArrowLeft,
  Sparkles,
  Phone,
  CreditCard,
  Building,
  Calendar,
  Clock,
  AlertCircle,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DHAKA_DELIVERY_ZONES, DELIVERY_TIME_SLOTS } from '../data/locations';

export const CheckoutPage: React.FC = () => {
  const {
    cart,
    cartSubtotal,
    discountAmount,
    deliveryFee,
    orderGrandTotal,
    appliedCoupon,
    selectedZone,
    setSelectedZone,
    placeOrder,
    navigateTo,
    addToast,
  } = useStore();

  // Form states
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  // Delivery options
  const [deliveryMethod, setDeliveryMethod] = useState<'express-today' | 'scheduled' | 'standard'>('express-today');
  const [deliveryDate, setDeliveryDate] = useState<string>(() => {
    const today = new Date();
    return today.toISOString().split('T')[0];
  });
  const [deliverySlot, setDeliverySlot] = useState<string>(DELIVERY_TIME_SLOTS[0]);

  // Payment method
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash' | 'nagad' | 'card'>('cod');
  const [bkashNumber, setBkashNumber] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-16 text-center space-y-4">
        <h1 className="font-serif text-2xl font-bold text-[#f5f3ef]">Your basket is empty</h1>
        <p className="text-xs text-[#8c8983]">Add items to your basket before proceeding to checkout.</p>
        <button
          onClick={() => navigateTo('shop')}
          className="py-2.5 px-5 rounded-lg bg-[#c99558] text-[#0c0c0e] font-semibold text-xs cursor-pointer"
        >
          Explore Bakery
        </button>
      </div>
    );
  }

  const validateForm = () => {
    const errs: { [key: string]: string } = {};
    if (!fullName.trim()) errs.fullName = 'Full name is required';
    if (!phone.trim()) {
      errs.phone = 'Mobile number is required';
    } else if (phone.replace(/\D/g, '').length < 10) {
      errs.phone = 'Please enter a valid 11-digit Bangladesh phone number';
    }
    if (!email.trim() || !email.includes('@')) {
      errs.email = 'Valid email is required for invoice & updates';
    }
    if (!address.trim()) {
      errs.address = 'Detailed street address, house & road number required';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      addToast('Please complete all required fields', 'Check highlighted form errors', 'error');
      return;
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);

      const placed = placeOrder({
        items: cart,
        subtotal: cartSubtotal,
        discount: discountAmount,
        deliveryFee,
        total: orderGrandTotal,
        couponCode: appliedCoupon?.code,
        address: {
          fullName,
          phone,
          email,
          area: selectedZone.name,
          city: 'Dhaka',
          fullAddress: address,
          postalCode,
          orderNotes,
        },
        deliveryMethod,
        deliveryDate,
        deliverySlot,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'verified',
        orderStatus: 'received',
      });

      addToast('Order Placed Successfully!', `Order #${placed.orderNumber} is being prepared.`, 'success');
      navigateTo('order-success');
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-[#20202c]">
        <div className="space-y-1">
          <nav className="text-xs text-[#73716d] flex items-center gap-2">
            <button onClick={() => navigateTo('cart')} className="hover:text-[#c99558] flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Back to Basket
            </button>
            <span>/</span>
            <span className="text-[#dedbd4]">Checkout</span>
          </nav>
          <h1 className="font-serif text-3xl font-bold text-[#f5f3ef]">
            Express Bakery Checkout
          </h1>
        </div>
        <div className="hidden sm:flex items-center gap-2 text-xs text-[#38b273] bg-[#16291e] border border-[#2b4c37] px-3 py-1.5 rounded-full font-medium">
          <Lock className="w-3.5 h-3.5" />
          <span>256-Bit SSL Encrypted</span>
        </div>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Customer & Delivery Details (7 cols on lg) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Section 1: Customer Contact */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#f5f3ef] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c99558] text-[#0c0c0e] text-xs font-bold flex items-center justify-center">
                1
              </span>
              Customer Contact Information
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2 space-y-1">
                <label className="font-semibold text-[#dedbd4] block">
                  Full Name <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Samira Anjum"
                  className={`w-full bg-[#161620] border rounded-lg px-3.5 py-2.5 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:outline-none ${
                    errors.fullName ? 'border-[#ef4444]' : 'border-[#2d2d3e] focus:border-[#c99558]'
                  }`}
                />
                {errors.fullName && <p className="text-[11px] text-[#ef4444]">{errors.fullName}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#dedbd4] block">
                  Phone Number (Dhaka) <span className="text-[#ef4444]">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-2.5 text-xs text-[#73716d]">+880</span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="17XXXXXXXX"
                    className={`w-full bg-[#161620] border rounded-lg pl-14 pr-3 py-2.5 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:outline-none ${
                      errors.phone ? 'border-[#ef4444]' : 'border-[#2d2d3e] focus:border-[#c99558]'
                    }`}
                  />
                </div>
                {errors.phone && <p className="text-[11px] text-[#ef4444]">{errors.phone}</p>}
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#dedbd4] block">
                  Email Address <span className="text-[#ef4444]">*</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="samira@example.com"
                  className={`w-full bg-[#161620] border rounded-lg px-3.5 py-2.5 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:outline-none ${
                    errors.email ? 'border-[#ef4444]' : 'border-[#2d2d3e] focus:border-[#c99558]'
                  }`}
                />
                {errors.email && <p className="text-[11px] text-[#ef4444]">{errors.email}</p>}
              </div>
            </div>
          </div>

          {/* Section 2: Delivery Address in Dhaka */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#f5f3ef] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c99558] text-[#0c0c0e] text-xs font-bold flex items-center justify-center">
                2
              </span>
              Dhaka Delivery Address
            </h2>

            <div className="space-y-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#dedbd4] block">
                  Delivery Zone / Area <span className="text-[#ef4444]">*</span>
                </label>
                <select
                  value={selectedZone.id}
                  onChange={(e) => {
                    const z = DHAKA_DELIVERY_ZONES.find((zone) => zone.id === e.target.value);
                    if (z) setSelectedZone(z);
                  }}
                  className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f3ef] focus:border-[#c99558] focus:outline-none cursor-pointer"
                >
                  {DHAKA_DELIVERY_ZONES.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.name} — ৳{zone.deliveryFee} fee ({zone.estimatedHours})
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#dedbd4] block">
                  House, Road, Apartment & Street Details <span className="text-[#ef4444]">*</span>
                </label>
                <textarea
                  rows={2}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="House 42, Apt 5B, Road 11, Block C, Gulshan-1"
                  className={`w-full bg-[#161620] border rounded-lg p-3 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:outline-none ${
                    errors.address ? 'border-[#ef4444]' : 'border-[#2d2d3e] focus:border-[#c99558]'
                  }`}
                />
                {errors.address && <p className="text-[11px] text-[#ef4444]">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="font-semibold text-[#dedbd4] block">Postal Code (Optional)</label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="1212"
                    className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:border-[#c99558] focus:outline-none"
                  />
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#dedbd4] block">Delivery Notes / Gate Code</label>
                  <input
                    type="text"
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                    placeholder='e.g. "Leave with lobby security"'
                    className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f3ef] placeholder-[#66645f] focus:border-[#c99558] focus:outline-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Delivery Timing */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#f5f3ef] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c99558] text-[#0c0c0e] text-xs font-bold flex items-center justify-center">
                3
              </span>
              Preferred Delivery Schedule
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="space-y-1">
                <label className="font-semibold text-[#dedbd4] block">Delivery Date:</label>
                <input
                  type="date"
                  value={deliveryDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setDeliveryDate(e.target.value)}
                  className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f3ef] focus:border-[#c99558] focus:outline-none cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <label className="font-semibold text-[#dedbd4] block">Time Window Slot:</label>
                <select
                  value={deliverySlot}
                  onChange={(e) => setDeliverySlot(e.target.value)}
                  className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3.5 py-2.5 text-xs text-[#f5f3ef] focus:border-[#c99558] focus:outline-none cursor-pointer"
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

          {/* Section 4: Payment Method */}
          <div className="p-5 sm:p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-4">
            <h2 className="font-serif text-lg font-bold text-[#f5f3ef] flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-[#c99558] text-[#0c0c0e] text-xs font-bold flex items-center justify-center">
                4
              </span>
              Payment Method
            </h2>

            <div className="space-y-3">
              {/* Cash On Delivery */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'bg-[#181824] border-[#c99558] text-[#f5f3ef]'
                    : 'bg-[#13131a] border-[#262634] text-[#a8a69e] hover:border-[#3a3a4d]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-0.5 accent-[#c99558]"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-sm text-[#f5f3ef] flex items-center justify-between">
                    <span>Cash On Delivery (COD)</span>
                    <span className="text-[11px] text-[#c99558] font-normal">Standard</span>
                  </div>
                  <p className="text-[#8c8983] mt-0.5">
                    Pay with cash directly to our white-glove delivery rider upon inspecting your fresh bakes.
                  </p>
                </div>
              </label>

              {/* bKash */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'bkash'
                    ? 'bg-[#181824] border-[#e2136e] text-[#f5f3ef]'
                    : 'bg-[#13131a] border-[#262634] text-[#a8a69e] hover:border-[#3a3a4d]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="bkash"
                  checked={paymentMethod === 'bkash'}
                  onChange={() => setPaymentMethod('bkash')}
                  className="mt-0.5 accent-[#e2136e]"
                />
                <div className="flex-1 text-xs space-y-2">
                  <div className="font-bold text-sm text-[#f5f3ef] flex items-center justify-between">
                    <span>bKash Online Payment</span>
                    <span className="px-2 py-0.5 rounded bg-[#e2136e]/20 text-[#e2136e] font-bold text-[10px]">
                      Instant Verification
                    </span>
                  </div>
                  <p className="text-[#8c8983]">
                    Seamless payment via your registered bKash wallet.
                  </p>
                  {paymentMethod === 'bkash' && (
                    <div className="pt-2 p-3 rounded-lg bg-[#0e0e14] border border-[#2b2b3a] space-y-2">
                      <label className="text-[11px] font-semibold text-[#dedbd4] block">
                        Your bKash Account Number:
                      </label>
                      <input
                        type="tel"
                        value={bkashNumber}
                        onChange={(e) => setBkashNumber(e.target.value)}
                        placeholder="017XXXXXXXX"
                        className="w-full bg-[#161620] border border-[#2d2d3e] rounded-md px-3 py-1.5 text-xs text-[#f5f3ef] focus:border-[#e2136e] focus:outline-none"
                      />
                      <span className="text-[10px] text-[#73716d] block">
                        Demo Mode: Instant simulated verification on place order.
                      </span>
                    </div>
                  )}
                </div>
              </label>

              {/* Nagad */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'nagad'
                    ? 'bg-[#181824] border-[#f7941d] text-[#f5f3ef]'
                    : 'bg-[#13131a] border-[#262634] text-[#a8a69e] hover:border-[#3a3a4d]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="nagad"
                  checked={paymentMethod === 'nagad'}
                  onChange={() => setPaymentMethod('nagad')}
                  className="mt-0.5 accent-[#f7941d]"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-sm text-[#f5f3ef] flex items-center justify-between">
                    <span>Nagad Direct Wallet</span>
                    <span className="px-2 py-0.5 rounded bg-[#f7941d]/20 text-[#f7941d] font-bold text-[10px]">
                      Verified
                    </span>
                  </div>
                  <p className="text-[#8c8983] mt-0.5">Pay via Postal Department Nagad Gateway.</p>
                </div>
              </label>

              {/* Card / SSLCommerz */}
              <label
                className={`flex items-start gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                  paymentMethod === 'card'
                    ? 'bg-[#181824] border-[#60a5fa] text-[#f5f3ef]'
                    : 'bg-[#13131a] border-[#262634] text-[#a8a69e] hover:border-[#3a3a4d]'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value="card"
                  checked={paymentMethod === 'card'}
                  onChange={() => setPaymentMethod('card')}
                  className="mt-0.5 accent-[#60a5fa]"
                />
                <div className="flex-1 text-xs">
                  <div className="font-bold text-sm text-[#f5f3ef] flex items-center justify-between">
                    <span>Credit / Debit Card (VISA, Mastercard)</span>
                    <span className="text-[10px] text-[#60a5fa]">SSLCommerz 3D Secure</span>
                  </div>
                  <p className="text-[#8c8983] mt-0.5">
                    All local and international Bangladeshi cards supported.
                  </p>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Form: Order Summary & Place Order Button (5 cols on lg) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#111116] border border-[#242432] rounded-xl p-5 sm:p-6 shadow-2xl space-y-5 sticky top-24">
            <h2 className="font-serif text-lg font-bold text-[#f5f3ef] pb-3 border-b border-[#22222e]">
              Order Summary ({cart.length} items)
            </h2>

            {/* Line items preview */}
            <div className="max-h-60 overflow-y-auto divide-y divide-[#1e1e28] pr-1">
              {cart.map((item) => (
                <div key={item.cartItemId} className="py-2.5 flex items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="w-10 h-10 rounded-md object-cover bg-[#1c1c24] border border-[#292938] shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="min-w-0">
                      <h4 className="font-semibold text-[#f5f3ef] truncate">{item.product.name}</h4>
                      <div className="text-[10px] text-[#8c8983]">
                        {item.quantity}x • {item.selectedOptions.size || 'Standard'}
                      </div>
                    </div>
                  </div>
                  <div className="text-right font-bold text-[#f5f3ef] shrink-0 font-sans">
                    ৳{(item.unitPrice * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            {/* Financial breakdown */}
            <div className="space-y-2 text-xs text-[#a8a69e] pt-3 border-t border-[#20202c]">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="text-[#f5f3ef] font-semibold">৳{cartSubtotal.toLocaleString()}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-[#c99558]">
                  <span>Discount ({appliedCoupon?.code})</span>
                  <span>-৳{discountAmount.toLocaleString()}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>Dhaka Delivery ({selectedZone.name})</span>
                <span>
                  {deliveryFee === 0 ? (
                    <span className="text-[#38b273] font-semibold">FREE</span>
                  ) : (
                    `৳${deliveryFee.toLocaleString()}`
                  )}
                </span>
              </div>

              <div className="flex justify-between text-base font-bold text-[#f5f3ef] pt-3 border-t border-[#242434]">
                <span>Total Due</span>
                <span className="text-2xl text-[#c99558] font-sans">
                  ৳{orderGrandTotal.toLocaleString()}
                </span>
              </div>
            </div>

            {/* Place Order CTA */}
            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 px-6 rounded-xl bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-sm flex items-center justify-center gap-2 shadow-xl transition-all active:scale-98 disabled:opacity-50 cursor-pointer"
            >
              {isProcessing ? (
                <span>Confirming Order...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Place Order • ৳{orderGrandTotal.toLocaleString()}</span>
                </>
              )}
            </button>

            <div className="text-center text-[11px] text-[#73716d] space-y-1">
              <p>By placing your order, you agree to Velvet & Crumb Terms of Service.</p>
              <p className="text-[#a8a69e]">Freshness and on-time temperature-controlled arrival guaranteed.</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};
