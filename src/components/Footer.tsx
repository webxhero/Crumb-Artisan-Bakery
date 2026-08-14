import React from 'react';
import { ArrowUp, Phone, Mail, MapPin, Clock, Instagram, Facebook, Heart, ShieldCheck } from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { CATEGORIES } from '../data/categories';

export const Footer: React.FC = () => {
  const { navigateTo } = useStore();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#08080a] border-t border-[#1a1a24] text-[#a8a69e] pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10">
          {/* Column 1: Brand Info (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-md bg-gradient-to-br from-[#c99558] to-[#96632c] flex items-center justify-center text-[#0c0c0e] font-serif font-bold text-lg">
                V
              </div>
              <span className="font-serif text-2xl font-bold text-[#f5f3ef]">
                Velvet <span className="text-[#c99558]">&</span> Crumb
              </span>
            </div>

            <p className="text-xs text-[#8c8983] leading-relaxed max-w-sm">
              Dhaka’s premier artisan bakery & patisserie. We honor European baking traditions using single-origin Belgian cocoa, Isigny French butter, and 36-hour slow-fermented wild sourdough starters. Handcrafted fresh every morning.
            </p>

            {/* Direct Contact info */}
            <div className="space-y-2 pt-2 text-xs">
              <div className="flex items-center gap-2.5 text-[#dedbd4]">
                <Phone className="w-3.5 h-3.5 text-[#c99558]" />
                <span>Hotline & WhatsApp: +880 1700-112233</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#dedbd4]">
                <Mail className="w-3.5 h-3.5 text-[#c99558]" />
                <span>concierge@velvetandcrumb.com</span>
              </div>
              <div className="flex items-start gap-2.5 text-[#dedbd4]">
                <MapPin className="w-3.5 h-3.5 text-[#c99558] shrink-0 mt-0.5" />
                <span>Road 45, Gulshan-2 Artisan Studio, Dhaka-1212</span>
              </div>
              <div className="flex items-center gap-2.5 text-[#8c8983]">
                <Clock className="w-3.5 h-3.5 text-[#c99558]" />
                <span>Baking & Delivery: 8:00 AM - 10:00 PM Daily</span>
              </div>
            </div>
          </div>

          {/* Column 2: Bakery Menu */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
              Bakery Shop
            </h4>
            <ul className="space-y-2 text-xs">
              {CATEGORIES.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => navigateTo('category', cat.slug)}
                    className="hover:text-[#c99558] transition-colors"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
              <li>
                <button
                  onClick={() => navigateTo('offers')}
                  className="text-[#c99558] hover:underline transition-colors"
                >
                  Special Offers & Hampers
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('delivery')} className="hover:text-[#c99558] transition-colors">
                  Dhaka Delivery Zones & Fees
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('faq')} className="hover:text-[#c99558] transition-colors">
                  FAQs & Custom Cake Orders
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#c99558] transition-colors">
                  Track Order & History
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('refunds')} className="hover:text-[#c99558] transition-colors">
                  Freshness Guarantee & Returns
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#c99558] transition-colors">
                  Contact Concierge
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Brand & Legal */}
          <div className="space-y-3">
            <h4 className="font-serif text-sm font-semibold text-[#f5f3ef] uppercase tracking-wider">
              The Atelier
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#c99558] transition-colors">
                  Our Philosophy & Story
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('privacy')} className="hover:text-[#c99558] transition-colors">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('terms')} className="hover:text-[#c99558] transition-colors">
                  Terms & Conditions
                </button>
              </li>
            </ul>

            {/* Social Icons */}
            <div className="pt-2">
              <div className="text-[11px] text-[#73716d] mb-2 uppercase tracking-wider font-semibold">
                Follow Our Bakes
              </div>
              <div className="flex items-center gap-2.5">
                <a
                  href="#instagram"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://instagram.com', '_blank');
                  }}
                  className="w-8 h-8 rounded-lg bg-[#14141c] hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] border border-[#272736] flex items-center justify-center transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-4 h-4" />
                </a>
                <a
                  href="#facebook"
                  onClick={(e) => {
                    e.preventDefault();
                    window.open('https://facebook.com', '_blank');
                  }}
                  className="w-8 h-8 rounded-lg bg-[#14141c] hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] border border-[#272736] flex items-center justify-center transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Dhaka Trust Banner */}
        <div className="pt-8 border-t border-[#181822] flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="text-[#73716d] text-[11px] uppercase tracking-wider font-medium mr-1">
              Accepted in Bangladesh:
            </span>
            <span className="px-2.5 py-1 rounded bg-[#e2136e]/15 text-[#e2136e] border border-[#e2136e]/30 font-bold text-[11px]">
              bKash
            </span>
            <span className="px-2.5 py-1 rounded bg-[#f7941d]/15 text-[#f7941d] border border-[#f7941d]/30 font-bold text-[11px]">
              Nagad
            </span>
            <span className="px-2.5 py-1 rounded bg-[#1a1f71]/20 text-[#60a5fa] border border-[#1a1f71]/40 font-bold text-[11px]">
              VISA / Mastercard
            </span>
            <span className="px-2.5 py-1 rounded bg-[#1f2937] text-[#dedbd4] border border-[#374151] text-[11px] font-medium">
              Cash on Delivery (COD)
            </span>
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-xs text-[#a8a69e] hover:text-[#c99558] transition-colors group cursor-pointer"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>

        {/* Bottom copyright */}
        <div className="pt-4 border-t border-[#14141c] text-center text-[11px] text-[#6b6964] flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>© {new Date().getFullYear()} Velvet & Crumb Patisserie Ltd. All rights reserved.</span>
          <span className="flex items-center gap-1">
            Handcrafted with passion in Dhaka <Heart className="w-3 h-3 text-[#c99558] fill-[#c99558]" />
          </span>
        </div>
      </div>
    </footer>
  );
};
