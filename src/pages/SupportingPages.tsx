import React, { useState } from 'react';
import {
  Award,
  Clock,
  ShieldCheck,
  Truck,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  Copy,
  Check,
  ChevronDown,
  Gift,
  Heart,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { DHAKA_DELIVERY_ZONES } from '../data/locations';
import { COUPONS } from '../data/coupons';

/* =========================================================================
   ABOUT US PAGE
   ========================================================================= */
export const AboutPage: React.FC = () => {
  const { navigateTo } = useStore();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center space-y-4 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold">
          The Velvet & Crumb Atelier
        </span>
        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-[#f5f3ef] leading-tight">
          Where European Tradition Meets Dhaka Sophistication
        </h1>
        <p className="text-xs sm:text-sm text-[#a8a69e] leading-relaxed">
          Founded in 2021 in Gulshan, Velvet & Crumb was born out of an uncompromising obsession with pure butter lamination, natural sourdough fermentation, and single-origin chocolate.
        </p>
      </div>

      {/* Hero Split Image */}
      <div className="relative aspect-[16/9] rounded-2xl overflow-hidden border border-[#272736] shadow-2xl">
        <img
          src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1600&q=80"
          alt="Bakery kitchen interior"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/90 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-[#dedbd4]">
          <span className="font-serif text-lg font-bold text-[#f5f3ef]">
            Gulshan-2 Artisan Studio & Master Kitchen
          </span>
          <span className="text-[#c99558]">Baking fresh daily from 5:00 AM</span>
        </div>
      </div>

      {/* Philosophy Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#1c1c28] text-[#c99558] flex items-center justify-center font-serif font-bold text-lg">
            72h
          </div>
          <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">The 72-Hour Lamination</h3>
          <p className="text-xs text-[#8c8983] leading-relaxed">
            Our viennoiserie dough undergoes slow cold retardation over three days using 84% butterfat French Isigny butter, resulting in unmatched honeycombs and delicate flakes.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#1c1c28] text-[#c99558] flex items-center justify-center font-serif font-bold text-lg">
            8yr
          </div>
          <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">Wild Mother Levain</h3>
          <p className="text-xs text-[#8c8983] leading-relaxed">
            No commercial baker's yeast is added to our country sourdoughs. Every loaf is leavened naturally using our 8-year-old starter nurtured with stone-ground whole wheat.
          </p>
        </div>

        <div className="p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-3">
          <div className="w-10 h-10 rounded-lg bg-[#1c1c28] text-[#c99558] flex items-center justify-center font-serif font-bold text-lg">
            70%
          </div>
          <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">Single-Origin Callebaut</h3>
          <p className="text-xs text-[#8c8983] leading-relaxed">
            Our ganaches, truffles, and brownies are made with certified sustainable Belgian chocolate, rich in natural cocoa butter and free of hydrogenated palm oils.
          </p>
        </div>
      </div>

      {/* Sourcing & Chef bio */}
      <div className="p-8 rounded-2xl bg-[#13131a] border border-[#262634] grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-4 aspect-square rounded-xl overflow-hidden border border-[#333346]">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=600&q=80"
            alt="Executive Chef Patissier"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="md:col-span-8 space-y-4">
          <span className="text-xs text-[#c99558] uppercase tracking-widest font-semibold">
            The Culinary Team
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
            Crafted Under the Vision of Chef Farhan Rahman
          </h2>
          <p className="text-xs sm:text-sm text-[#a8a69e] leading-relaxed">
            Trained at the prestigious École Ducasse in Paris, Chef Farhan brought traditional French viennoiserie techniques back to Dhaka to elevate local bakery benchmarks.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('shop')}
              className="py-2.5 px-5 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-xs cursor-pointer"
            >
              Explore Our Creations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   OFFERS & PROMOTIONS PAGE
   ========================================================================= */
export const OffersPage: React.FC = () => {
  const { applyCoupon, navigateTo, addToast } = useStore();
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const handleCopy = (code: string) => {
    navigator.clipboard?.writeText(code);
    setCopiedCode(code);
    applyCoupon(code);
    addToast('Coupon Applied!', `Code ${code} has been applied to your basket.`, 'success');
    setTimeout(() => setCopiedCode(null), 2500);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold">
          Exclusive Promos & Discounts
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
          Active Bakery Vouchers & Offers
        </h1>
        <p className="text-xs sm:text-sm text-[#a8a69e]">
          Apply these limited-time promotional codes at checkout for savings on celebration cakes, fresh viennoiserie, and delivery.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {COUPONS.map((coupon) => (
          <div
            key={coupon.code}
            className="p-6 rounded-2xl bg-[#111116] border border-[#242432] flex flex-col justify-between space-y-4 hover:border-[#38384d] transition-all"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-[#c99558]/20 text-[#e6b980] border border-[#c99558]/30 text-xs font-bold font-mono">
                  {coupon.code}
                </span>
                <span className="text-xs text-[#38b273] font-medium">Active</span>
              </div>
              <h3 className="font-serif text-xl font-bold text-[#f5f3ef] pt-1">
                {coupon.discountType === 'percentage'
                  ? `${coupon.discountValue}% Off Your Entire Order`
                  : `৳${coupon.discountValue} Flat Discount`}
              </h3>
              <p className="text-xs text-[#8c8983]">{coupon.description}</p>
              <div className="text-[11px] text-[#73716d]">
                Min. order: ৳{coupon.minSpend.toLocaleString()}
              </div>
            </div>

            <button
              onClick={() => handleCopy(coupon.code)}
              className={`w-full py-2.5 rounded-lg text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                copiedCode === coupon.code
                  ? 'bg-[#16291e] text-[#38b273] border border-[#2b4c37]'
                  : 'bg-[#1e1e2b] hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] border border-[#2e2e3e]'
              }`}
            >
              {copiedCode === coupon.code ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Code Applied to Basket!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  <span>Copy & Apply Code</span>
                </>
              )}
            </button>
          </div>
        ))}
      </div>

      {/* Free Delivery Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181824] to-[#121218] border border-[#2e2e42] flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="space-y-1 text-center sm:text-left">
          <div className="font-serif text-lg font-bold text-[#f5f3ef]">
            Always Free Delivery Over ৳1,500
          </div>
          <p className="text-xs text-[#a8a69e]">
            Automatic free temperature-controlled delivery across all zones in Dhaka when your cart reaches ৳1,500.
          </p>
        </div>
        <button
          onClick={() => navigateTo('shop')}
          className="py-2.5 px-5 rounded-lg bg-[#c99558] text-[#0c0c0e] font-bold text-xs whitespace-nowrap cursor-pointer"
        >
          Shop Now
        </button>
      </div>
    </div>
  );
};

/* =========================================================================
   DELIVERY INFORMATION PAGE
   ========================================================================= */
export const DeliveryInfoPage: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold">
          Dhaka Logistics & Handling
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
          Dhaka Delivery Coverage & Schedule
        </h1>
        <p className="text-xs sm:text-sm text-[#a8a69e]">
          Every bake is dispatched from our Gulshan master kitchen in insulated containers with temperature monitoring.
        </p>
      </div>

      {/* Coverage Table */}
      <div className="bg-[#111116] border border-[#242432] rounded-2xl overflow-hidden shadow-xl divide-y divide-[#1e1e28]">
        <div className="grid grid-cols-12 p-4 text-xs font-bold uppercase tracking-wider text-[#73716d] bg-[#161620]">
          <div className="col-span-5">Dhaka Neighborhood / Zone</div>
          <div className="col-span-4">Estimated Transit Time</div>
          <div className="col-span-3 text-right">Standard Fee</div>
        </div>

        {DHAKA_DELIVERY_ZONES.map((zone) => (
          <div key={zone.id} className="grid grid-cols-12 p-4 text-xs items-center text-[#dedbd4]">
            <div className="col-span-5 font-semibold text-[#f5f3ef] flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 text-[#c99558] shrink-0" />
              <span>{zone.name}</span>
            </div>
            <div className="col-span-4 text-[#8c8983]">{zone.estimatedHours}</div>
            <div className="col-span-3 text-right font-bold text-[#c99558] font-sans">
              ৳{zone.deliveryFee}
            </div>
          </div>
        ))}
      </div>

      {/* Cut-off info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs text-[#a8a69e]">
        <div className="p-5 rounded-xl bg-[#111116] border border-[#242432] space-y-2">
          <h3 className="font-serif text-base font-bold text-[#f5f3ef]">Same-Day Express Cut-off</h3>
          <p className="leading-relaxed">
            Orders for same-day evening delivery must be confirmed before <strong>2:00 PM</strong>. Orders placed after 2:00 PM will be queued for the following morning’s 8:00 AM bake cycle.
          </p>
        </div>

        <div className="p-5 rounded-xl bg-[#111116] border border-[#242432] space-y-2">
          <h3 className="font-serif text-base font-bold text-[#f5f3ef]">Celebration Cake Notice</h3>
          <p className="leading-relaxed">
            Multi-tiered and customized fondant celebration cakes require at least <strong>24 hours advance notice</strong> to ensure proper structural setting and hand piping.
          </p>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   FAQ PAGE
   ========================================================================= */
export const FaqPage: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How far in advance should I order custom celebration cakes?',
      a: 'For signature celebration cakes (such as our Noir Truffle or Red Velvet), same-day delivery is available if ordered before 2:00 PM. For multi-tiered custom wedding or milestone cakes, we recommend ordering 24 to 48 hours in advance.',
    },
    {
      q: 'Do you offer 100% eggless cakes and pastries?',
      a: 'Yes! We have dedicated eggless variations for our most popular celebration cakes, chocolate brownies, and tea cakes. Look for the "Eggless Option" tag on the shop page.',
    },
    {
      q: 'How do you keep cakes safe from melting in Dhaka traffic?',
      a: 'All cake deliveries travel in custom thermal-insulated structural boxes with chilled gel packs and non-slip stabilizing bases. Our delivery fleet is trained exclusively in pastry handling.',
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bKash, Nagad, all local/international VISA & Mastercard debit/credit cards, and Cash on Delivery (COD).',
    },
    {
      q: 'How should I store my pastries and sourdough bread?',
      a: 'Cakes should be refrigerated between 4°C to 8°C and enjoyed within 3 days. Sourdough bread should be stored cut-side down in a paper or linen bread bag at room temperature—never refrigerate bread as it accelerates staling.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="text-center space-y-3">
        <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold">
          Got Questions?
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-[#a8a69e]">
          Everything you need to know about our ingredients, ordering, and delivery.
        </p>
      </div>

      <div className="space-y-3">
        {faqs.map((faq, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="rounded-xl bg-[#111116] border border-[#242432] overflow-hidden transition-colors"
            >
              <button
                onClick={() => setOpenIdx(isOpen ? null : idx)}
                className="w-full p-4 text-left font-serif text-base font-semibold text-[#f5f3ef] flex items-center justify-between gap-4 cursor-pointer"
              >
                <span>{faq.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-[#c99558] transition-transform duration-200 ${
                    isOpen ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-4 pb-4 text-xs sm:text-sm text-[#a8a69e] leading-relaxed border-t border-[#1a1a24] pt-3">
                  {faq.a}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* =========================================================================
   CONTACT & STUDIO LOCATION PAGE
   ========================================================================= */
export const ContactPage: React.FC = () => {
  const { addToast } = useStore();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    addToast('Message Dispatched', 'Our concierge will call or reply within 30 minutes.', 'success');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold">
          Concierge & Studio
        </span>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
          Contact Our Bakery Team
        </h1>
        <p className="text-xs sm:text-sm text-[#a8a69e]">
          Need a bespoke wedding tier or corporate gifting consultation? We’re here to help.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-[#111116] border border-[#242432] space-y-4 text-xs">
            <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">Gulshan Atelier</h3>
            <div className="space-y-3 text-[#dedbd4]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#c99558] shrink-0 mt-0.5" />
                <span>Road 45, Gulshan-2 Artisan Studio, Dhaka-1212, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#c99558] shrink-0" />
                <span>Hotline & WhatsApp: +880 1700-112233</span>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#c99558] shrink-0" />
                <span>concierge@velvetandcrumb.com</span>
              </div>
              <div className="flex items-center gap-3">
                <Clock className="w-4 h-4 text-[#c99558] shrink-0" />
                <span>Daily Kitchen & Delivery: 8:00 AM - 10:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-7">
          <form
            onSubmit={handleSubmit}
            className="p-6 rounded-2xl bg-[#111116] border border-[#242432] space-y-4 text-xs"
          >
            <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">Send an Inquiry</h3>
            {submitted ? (
              <div className="p-6 rounded-xl bg-[#16291e] border border-[#2b4c37] text-center space-y-2 text-[#55c786]">
                <div className="font-bold text-sm">Thank you for reaching out!</div>
                <p className="text-xs text-[#a8a69e]">Our head baker will review your request shortly.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="font-semibold text-[#dedbd4]">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Nadia Ahmed"
                      className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3 py-2 text-xs text-[#f5f3ef] focus:border-[#c99558] focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="font-semibold text-[#dedbd4]">Mobile Number</label>
                    <input
                      type="tel"
                      required
                      placeholder="+880 17XXXXXXXX"
                      className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3 py-2 text-xs text-[#f5f3ef] focus:border-[#c99558] focus:outline-none"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#dedbd4]">Inquiry Type</label>
                  <select className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg px-3 py-2 text-xs text-[#f5f3ef] focus:border-[#c99558] focus:outline-none">
                    <option>Custom Multi-Tier Wedding Cake</option>
                    <option>Corporate Bulk Gifting Hamper</option>
                    <option>Catering & Event Viennoiserie</option>
                    <option>General Feedback / Order Inquiry</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="font-semibold text-[#dedbd4]">Message Details</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your event date, expected guest count, flavor preferences..."
                    className="w-full bg-[#161620] border border-[#2d2d3e] rounded-lg p-3 text-xs text-[#f5f3ef] focus:border-[#c99558] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="py-3 px-6 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-xs transition-all cursor-pointer"
                >
                  Send Message
                </button>
              </>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

/* =========================================================================
   POLICIES (TERMS / PRIVACY / REFUNDS) PAGE
   ========================================================================= */
export const PoliciesPage: React.FC<{ type: 'privacy' | 'terms' | 'refunds' }> = ({ type }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-xs sm:text-sm text-[#a8a69e] leading-relaxed">
      <h1 className="font-serif text-3xl font-bold text-[#f5f3ef] pb-2 border-b border-[#242432]">
        {type === 'privacy' && 'Privacy Policy'}
        {type === 'terms' && 'Terms of Service'}
        {type === 'refunds' && 'Freshness Guarantee & Return Policy'}
      </h1>

      {type === 'refunds' && (
        <div className="space-y-4">
          <p>
            At Velvet & Crumb, we guarantee that every item delivered is freshly prepared on the day of dispatch. Due to the perishable nature of bakery goods, return requests must be reported within <strong>2 hours</strong> of receipt upon inspection.
          </p>
          <p>
            If any item arrives compromised in transit or does not meet our structural standard, our concierge will issue an immediate replacement or full refund to your original payment method (bKash/Nagad/Card).
          </p>
        </div>
      )}

      {type === 'privacy' && (
        <div className="space-y-4">
          <p>
            We take your privacy seriously. All personal customer data, contact numbers, and delivery locations are encrypted and used solely for fulfilling your bakery orders and providing order status updates. We never share customer information with third-party advertisers.
          </p>
        </div>
      )}

      {type === 'terms' && (
        <div className="space-y-4">
          <p>
            By ordering from Velvet & Crumb Patisserie Ltd, you agree that delivery times in Dhaka are subject to traffic conditions, though we make every effort to fulfill orders within the chosen time slot window. Prices are listed in Bangladeshi Taka (৳ BDT) inclusive of all applicable VAT.
          </p>
        </div>
      )}
    </div>
  );
};
