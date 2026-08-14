import React, { useState } from 'react';
import {
  ArrowRight,
  Sparkles,
  Award,
  Clock,
  ShieldCheck,
  Truck,
  Star,
  CheckCircle2,
  ChevronRight,
  Heart,
  Eye,
  ShoppingBag,
  Send,
  Gift,
  Coffee,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import { REVIEWS } from '../data/reviews';
import { ProductCard } from '../components/ProductCard';

export const HomePage: React.FC = () => {
  const { navigateTo, openQuickView, addToast } = useStore();
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  const featuredProducts = PRODUCTS.filter((p) => p.isFeatured).slice(0, 8);
  const bestsellerProducts = PRODUCTS.filter((p) => p.isBestseller).slice(0, 4);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) {
      addToast('Invalid email address', 'Please enter a valid email to subscribe', 'error');
      return;
    }
    setIsSubscribing(true);
    setTimeout(() => {
      setIsSubscribing(false);
      setNewsletterSuccess(true);
      addToast('Welcome to Velvet & Crumb!', 'Check your inbox for a 10% welcome voucher.', 'success');
      setNewsletterEmail('');
    }, 600);
  };

  const instagramShots = [
    {
      img: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      caption: 'Tempering Belgian chocolate ganache for our Noir Truffle tiers.',
      likes: '1.2k',
    },
    {
      img: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      caption: 'Fresh out of the deck oven: 72-hour Isigny butter croissants at 6:30 AM.',
      likes: '2.4k',
    },
    {
      img: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
      caption: 'Custom anniversary berry tiers heading out to Gulshan-2.',
      likes: '980',
    },
    {
      img: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
      caption: 'Blistered wild sourdough batard with our 8-year mother levain.',
      likes: '1.5k',
    },
    {
      img: 'https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80',
      caption: 'Pistachio, dark chocolate, and salted caramel macarons packed in luxury boxes.',
      likes: '3.1k',
    },
    {
      img: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
      caption: 'Giant molten chocolate chunk cookies with flaky Maldon sea salt.',
      likes: '2.8k',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* 1. HERO SECTION */}
      <section className="relative min-h-[580px] lg:min-h-[640px] flex items-center overflow-hidden border-b border-[#1f1f2a]">
        {/* Background Image with Dark Vignette Gradient */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1920&q=85"
            alt="Artisan bakery kitchen with fresh bread and pastries"
            className="w-full h-full object-cover object-center scale-105 filter brightness-45 contrast-110"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0c0e] via-[#0c0c0e]/85 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-transparent to-black/40" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
            {/* Left Column: Copy & Actions */}
            <div className="lg:col-span-7 space-y-6">
              {/* Subtle Eyebrow */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181822]/90 backdrop-blur-md border border-[#333345] text-xs text-[#dedbd4]">
                <span className="w-2 h-2 rounded-full bg-[#c99558] animate-pulse" />
                <span className="font-medium">Dhaka’s Premier Artisan Patisserie</span>
              </div>

              {/* Main Headline */}
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#f5f3ef] leading-[1.1]">
                Crafted Fresh.{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c99558] via-[#e6b980] to-[#f4d1a5]">
                  Baked Beautifully.
                </span>
              </h1>

              {/* Supporting Copy */}
              <p className="text-base sm:text-lg text-[#c2bfb6] leading-relaxed max-w-xl font-normal">
                Handcrafted celebration cakes, 72-hour Isigny butter croissants, and stone-hearth sourdough. Prepared fresh each morning in Gulshan with pure European ingredients.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <button
                  onClick={() => navigateTo('shop')}
                  className="py-3.5 px-6 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-sm flex items-center gap-2.5 shadow-[0_8px_25px_rgba(201,149,88,0.3)] transition-all active:scale-98 cursor-pointer"
                >
                  <span>Shop Fresh Bakes</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => navigateTo('category', 'celebration-cakes')}
                  className="py-3.5 px-6 rounded-lg bg-[#181824]/90 hover:bg-[#252535] text-[#dedbd4] hover:text-white border border-[#333346] text-sm font-semibold transition-all backdrop-blur-xs cursor-pointer"
                >
                  Custom Celebration Cakes
                </button>
              </div>

              {/* Trust Highlights Row */}
              <div className="pt-6 border-t border-[#262636] grid grid-cols-3 gap-3 text-xs text-[#a8a69e]">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c99558] shrink-0" />
                  <span>5:00 AM Daily Bake</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#c99558] shrink-0" />
                  <span>100% Belgian Cocoa</span>
                </div>
                <div className="flex items-center gap-2">
                  <Truck className="w-4 h-4 text-[#c99558] shrink-0" />
                  <span>Same-Day Dhaka Delivery</span>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Image Showcase */}
            <div className="lg:col-span-5 relative">
              {/* Warm Ambient Glow Behind the Card */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-[#c99558]/25 via-[#e6b980]/15 to-transparent rounded-3xl blur-2xl -z-10" />

              {/* Showcase Image Frame */}
              <div className="relative rounded-2xl overflow-hidden border border-[#3a3a4c] bg-[#121218] shadow-[0_25px_60px_rgba(0,0,0,0.7)] group">
                <div className="aspect-[4/3] sm:aspect-[1/1] lg:aspect-[4/5] relative overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1000&q=85"
                    alt="Signature Belgian Noir Truffle Cake with Gold Flakes"
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    referrerPolicy="no-referrer"
                  />
                  {/* Subtle Gradient Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e]/90 via-[#0c0c0e]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

                  {/* Top Floating Badge */}
                  <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#0c0c0e]/80 backdrop-blur-md border border-[#3d3d52] text-[11px] font-semibold text-[#e6b980]">
                      <Sparkles className="w-3.5 h-3.5 text-[#c99558]" />
                      <span>Chef's Master Signature</span>
                    </span>
                    <span className="px-2.5 py-1 rounded-md bg-[#c99558] text-[#0c0c0e] font-bold text-[11px] uppercase tracking-wider shadow-md">
                      Bestseller
                    </span>
                  </div>

                  {/* Bottom Product Info Card Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-[#15151e]/90 backdrop-blur-md border border-[#2d2d3e] space-y-2.5">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h3 className="font-serif text-base font-bold text-[#f5f3ef] line-clamp-1">
                          Signature Belgian Noir Truffle Cake
                        </h3>
                        <p className="text-[11px] text-[#9e9b93] line-clamp-1">
                          70% Callebaut dark chocolate & 24k edible gold leaf
                        </p>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-serif text-base font-bold text-[#c99558]">
                          ৳2,450
                        </div>
                        <div className="flex items-center gap-1 text-[11px] text-[#e6b980] justify-end">
                          <Star className="w-3 h-3 fill-[#c99558] text-[#c99558]" />
                          <span>4.95 (142)</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-1 border-t border-[#262634]">
                      <button
                        onClick={() => openQuickView(PRODUCTS[0])}
                        className="flex-1 py-2 px-3 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Quick View</span>
                      </button>
                      <button
                        onClick={() => navigateTo('product', PRODUCTS[0].slug)}
                        className="py-2 px-3 rounded-lg bg-[#222230] hover:bg-[#2c2c3e] text-[#dedbd4] hover:text-white border border-[#38384c] text-xs font-semibold flex items-center justify-center gap-1 transition-all cursor-pointer"
                      >
                        <span>Details</span>
                        <ChevronRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY EXPLORER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold block mb-1">
              Curated Collections
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
              Explore Our Bakery Categories
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-[#c99558] hover:text-[#dcab6e] font-semibold flex items-center gap-1 group cursor-pointer"
          >
            <span>View All ({PRODUCTS.length} Products)</span>
            <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3.5 sm:gap-4">
          {CATEGORIES.map((category) => (
            <button
              key={category.id}
              onClick={() => navigateTo('category', category.slug)}
              className="group relative rounded-xl overflow-hidden bg-[#131318] border border-[#22222d] hover:border-[#3d3d52] transition-all duration-300 text-left cursor-pointer flex flex-col aspect-[4/5]"
            >
              <div className="relative w-full h-full overflow-hidden bg-[#181822]">
                <img
                  src={category.image}
                  alt={category.name}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0e] via-[#0c0c0e]/40 to-transparent" />
              </div>

              <div className="absolute inset-x-0 bottom-0 p-3.5 z-10">
                <span className="text-[10px] text-[#c99558] uppercase font-semibold tracking-wider block">
                  {category.itemCount} items
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-[#f5f3ef] group-hover:text-[#c99558] transition-colors leading-snug">
                  {category.name}
                </h3>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* 3. FRESH FROM THE OVEN (FEATURED PRODUCTS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c99558] font-semibold mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Selections</span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
              Fresh From The Oven
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-[#dedbd4] hover:text-[#c99558] font-medium flex items-center gap-1 cursor-pointer"
          >
            <span>See full menu</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {featuredProducts.map((product, idx) => (
            <ProductCard key={product.id} product={product} priority={idx < 4} />
          ))}
        </div>
      </section>

      {/* 4. PROMOTIONAL BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#181822] via-[#1b1926] to-[#121217] border border-[#2e2b3d] p-6 sm:p-10 lg:p-12 flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#c99558]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-4 max-w-xl text-center lg:text-left z-10">
            <span className="inline-block px-3 py-1 rounded-full bg-[#c99558]/20 text-[#e6b980] border border-[#c99558]/30 text-xs font-semibold uppercase tracking-wider">
              Limited Celebration Offer
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-[#f5f3ef] leading-snug">
              Sweet Moments Deserve Something Special
            </h2>
            <p className="text-xs sm:text-sm text-[#b8b5ac] leading-relaxed">
              Enjoy <strong className="text-[#f5f3ef]">15% off</strong> on all artisan celebration cakes and luxury gift hampers this week. Includes complimentary custom message piping and temperature-controlled Dhaka express delivery.
            </p>
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-3">
              <button
                onClick={() => navigateTo('offers')}
                className="py-3 px-6 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Claim Offer Code: VELVET15</span>
              </button>
              <button
                onClick={() => navigateTo('category', 'celebration-cakes')}
                className="py-3 px-5 rounded-lg bg-[#222230] hover:bg-[#2c2c3e] text-[#dedbd4] text-xs sm:text-sm font-semibold border border-[#37374a] transition-all cursor-pointer"
              >
                Browse Cakes
              </button>
            </div>
          </div>

          <div className="relative w-full lg:w-96 aspect-[4/3] rounded-xl overflow-hidden border border-[#353348] shadow-2xl shrink-0">
            <img
              src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80"
              alt="Celebration Chocolate Truffle Cake with Gold Leaf"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute bottom-3 left-3 bg-[#0c0c0e]/85 backdrop-blur-md px-3 py-1.5 rounded-lg text-xs font-semibold text-[#f5f3ef] border border-[#2b2b38]">
              Signature Noir Truffle Tier
            </div>
          </div>
        </div>
      </section>

      {/* 5. BESTSELLERS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold block mb-1">
              Customer Favorites
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
              Our Bestsellers
            </h2>
          </div>
          <button
            onClick={() => navigateTo('shop')}
            className="text-xs text-[#c99558] hover:text-[#dcab6e] font-semibold flex items-center gap-1 cursor-pointer"
          >
            <span>Explore all bestsellers</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 sm:gap-6">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. BRAND STORY (EDITORIAL SPLIT LAYOUT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center bg-[#111116] border border-[#22222e] rounded-2xl p-6 sm:p-10 lg:p-12">
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#181824] border border-[#2b2b3a] text-xs text-[#c99558] font-medium">
              <Award className="w-3.5 h-3.5" />
              <span>The Atelier Philosophy</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef] leading-tight">
              Baked With Passion, <br className="hidden sm:inline" />
              Crafted Without Compromise.
            </h2>

            <p className="text-xs sm:text-sm text-[#a8a69e] leading-relaxed">
              At Velvet & Crumb, baking is an art form rooted in patience. Every croissant undergoes a strict 72-hour slow cold fermentation to develop deep buttery honeycombs using pure 84% Isigny French butter.
            </p>

            <p className="text-xs sm:text-sm text-[#a8a69e] leading-relaxed">
              Our sourdough loaves are fired on stone hearths powered solely by wild yeast starter cultivated over eight years. From dark single-origin Callebaut ganaches to hand-piped celebratory cakes, every creation leaves our kitchen ready to turn ordinary days into memorable occasions.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-3 text-xs">
              <div className="p-3 rounded-lg bg-[#16161f] border border-[#262634]">
                <div className="font-serif text-2xl font-bold text-[#c99558]">72h</div>
                <div className="text-[#8c8983] mt-0.5 font-medium">Cold dough lamination for unmatched flakiness</div>
              </div>
              <div className="p-3 rounded-lg bg-[#16161f] border border-[#262634]">
                <div className="font-serif text-2xl font-bold text-[#c99558]">100%</div>
                <div className="text-[#8c8983] mt-0.5 font-medium">Single-origin cocoa & pure Normandy butter</div>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={() => navigateTo('about')}
                className="text-xs text-[#c99558] hover:text-[#dcab6e] font-semibold underline underline-offset-4 flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read our complete story and meet our chef patissier</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-6 relative aspect-square sm:aspect-[4/3] rounded-xl overflow-hidden border border-[#2a2a38] shadow-2xl">
            <img
              src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1000&q=80"
              alt="Artisan baker laminating dough"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-[#0e0e14]/90 backdrop-blur-md border border-[#272736] text-xs">
              <span className="text-[#c99558] font-bold">Gulshan Kitchen Master Deck:</span> Fresh batches pulled hot twice daily at 8:00 AM & 3:00 PM.
            </div>
          </div>
        </div>
      </section>

      {/* 7. WHY CHOOSE US (4 TRUST PILLARS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold block">
            The Velvet & Crumb Standard
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
            Why Discerning Food Lovers Choose Us
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-xl bg-[#131318] border border-[#22222d] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#1c1c27] text-[#c99558] flex items-center justify-center border border-[#2b2b3c]">
              <Clock className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#f5f3ef]">Freshly Baked Daily</h3>
            <p className="text-xs text-[#8c8983] leading-relaxed">
              We never hold yesterday's bakes. Our ovens fire at 5:00 AM so your morning croissants and afternoon cakes arrive at peak aroma.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#131318] border border-[#22222d] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#1c1c27] text-[#c99558] flex items-center justify-center border border-[#2b2b3c]">
              <Award className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#f5f3ef]">Noble Ingredients</h3>
            <p className="text-xs text-[#8c8983] leading-relaxed">
              Single-origin 70% Belgian chocolate, Bourbon vanilla pods from Madagascar, and pure grass-fed dairy butter with no synthetic additives.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#131318] border border-[#22222d] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#1c1c27] text-[#c99558] flex items-center justify-center border border-[#2b2b3c]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#f5f3ef]">Chilled Safe Packaging</h3>
            <p className="text-xs text-[#8c8983] leading-relaxed">
              Every delicate tier and pastry is stabilized in custom shock-absorbing ventilated boxes with cooling inserts to preserve structural perfection.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-[#131318] border border-[#22222d] space-y-2.5">
            <div className="w-10 h-10 rounded-lg bg-[#1c1c27] text-[#c99558] flex items-center justify-center border border-[#2b2b3c]">
              <Truck className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-semibold text-[#f5f3ef]">Trained Handlers</h3>
            <p className="text-xs text-[#8c8983] leading-relaxed">
              Our dedicated delivery fleet handles each order with white-glove care across all Dhaka zones including Gulshan, Banani, Dhanmondi, and Uttara.
            </p>
          </div>
        </div>
      </section>

      {/* 8. SEASONAL CELEBRATION SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-[#131319] border border-[#272736] p-6 sm:p-8 lg:p-10 space-y-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#c99558] font-semibold mb-1">
                <Gift className="w-3.5 h-3.5" />
                <span>Festive & Milestones</span>
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
                Special Celebration Hampers & Gift Boxes
              </h2>
            </div>
            <button
              onClick={() => navigateTo('category', 'gift-boxes')}
              className="py-2 px-4 rounded-lg bg-[#1f1f2c] hover:bg-[#2a2a3c] text-[#dedbd4] text-xs font-semibold border border-[#353548] transition-colors self-start md:self-auto cursor-pointer"
            >
              View All Gift Boxes
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
            <div className="p-4 rounded-xl bg-[#0e0e12] border border-[#242432] flex flex-col justify-between space-y-4">
              <img
                src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
                alt="Luxury Grand Hamper"
                className="w-full aspect-[4/3] rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#c99558] font-bold uppercase tracking-wider">Corporate & Weddings</span>
                <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">Royal Velvet Grand Hamper</h3>
                <p className="text-xs text-[#8c8983]">Includes 0.5kg Noir Truffle, 6 macarons, 4 cookies, and calligraphy card.</p>
                <div className="text-sm font-bold text-[#f5f3ef] pt-1">৳4,950</div>
              </div>
              <button
                onClick={() => navigateTo('product', 'royal-velvet-gold-grand-gift-hamper')}
                className="w-full py-2 rounded-lg bg-[#1e1e2b] hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] text-xs font-semibold transition-all cursor-pointer"
              >
                Order Hamper
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0e0e12] border border-[#242432] flex flex-col justify-between space-y-4">
              <img
                src="https://images.unsplash.com/photo-1569864358642-9d1684040f43?auto=format&fit=crop&w=600&q=80"
                alt="French Macaron Box"
                className="w-full aspect-[4/3] rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#c99558] font-bold uppercase tracking-wider">Sweet Gestures</span>
                <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">French Macaron Jewel Box (12 pcs)</h3>
                <p className="text-xs text-[#8c8983]">Pistachio, Raspberry Rose, Dark Truffle, and Salted Caramel in ribboned tin.</p>
                <div className="text-sm font-bold text-[#f5f3ef] pt-1">৳1,650</div>
              </div>
              <button
                onClick={() => navigateTo('product', 'french-macaron-jewel-assortment-12')}
                className="w-full py-2 rounded-lg bg-[#1e1e2b] hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] text-xs font-semibold transition-all cursor-pointer"
              >
                Order Macarons
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#0e0e12] border border-[#242432] flex flex-col justify-between space-y-4">
              <img
                src="https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80"
                alt="NYC Cookie Tin"
                className="w-full aspect-[4/3] rounded-lg object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#c99558] font-bold uppercase tracking-wider">Tea Time Favorites</span>
                <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">NYC Chunky Cookie Box (6 pcs)</h3>
                <p className="text-xs text-[#8c8983]">Giant 130g molten cookies with roasted walnuts and Maldon flaky sea salt.</p>
                <div className="text-sm font-bold text-[#f5f3ef] pt-1">৳950</div>
              </div>
              <button
                onClick={() => navigateTo('product', 'nyc-style-chunky-choc-chip-cookies')}
                className="w-full py-2 rounded-lg bg-[#1e1e2b] hover:bg-[#c99558] text-[#dedbd4] hover:text-[#0c0c0e] text-xs font-semibold transition-all cursor-pointer"
              >
                Order Cookies
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 9. TESTIMONIALS & REVIEWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="flex items-center justify-center gap-1 text-[#c99558]">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-4 h-4 fill-current" />
            ))}
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
            Loved By Dhaka’s Connoisseurs
          </h2>
          <p className="text-xs text-[#8c8983]">
            Over 2,400+ verified celebration orders delivered with a 4.93/5 average satisfaction rating.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.slice(0, 3).map((review) => (
            <div
              key={review.id}
              className="p-5 sm:p-6 rounded-xl bg-[#131318] border border-[#242430] flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#c99558]">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-current" />
                    ))}
                  </div>
                  <span className="text-[11px] text-[#73716d]">{review.date}</span>
                </div>

                <p className="text-xs text-[#dedbd4] leading-relaxed italic">
                  "{review.comment}"
                </p>
              </div>

              <div className="pt-3 border-t border-[#22222d] flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  {review.avatar && (
                    <img
                      src={review.avatar}
                      alt={review.author}
                      className="w-8 h-8 rounded-full object-cover border border-[#2d2d3c]"
                      referrerPolicy="no-referrer"
                    />
                  )}
                  <div>
                    <div className="text-xs font-semibold text-[#f5f3ef] flex items-center gap-1">
                      <span>{review.author}</span>
                      {review.verified && (
                        <CheckCircle2 className="w-3 h-3 text-[#38b273]" />
                      )}
                    </div>
                    {review.productName && (
                      <div className="text-[10px] text-[#8c8983] truncate max-w-[170px]">
                        Purchased: {review.productName}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. INSTAGRAM / DAILY BAKES GALLERY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 gap-3">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#c99558] font-semibold block mb-1">
              Live From Our Kitchen
            </span>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
              Follow Our Daily Bakes @velvetandcrumb
            </h2>
          </div>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noreferrer"
            className="text-xs text-[#c99558] hover:underline flex items-center gap-1 font-semibold"
          >
            <span>Follow on Instagram</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramShots.map((item, idx) => (
            <div
              key={idx}
              className="group relative aspect-square rounded-xl overflow-hidden bg-[#161620] border border-[#242432]"
            >
              <img
                src={item.img}
                alt={item.caption}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-3 flex flex-col justify-between text-left">
                <p className="text-[10px] text-[#f5f3ef] leading-snug line-clamp-3">
                  {item.caption}
                </p>
                <div className="flex items-center gap-1 text-[11px] text-[#c99558] font-semibold">
                  <Heart className="w-3 h-3 fill-current" />
                  <span>{item.likes}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 11. NEWSLETTER */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-2xl bg-gradient-to-b from-[#181822] to-[#111116] border border-[#2b2b3a] p-8 sm:p-12 text-center space-y-4 shadow-2xl">
          <div className="w-12 h-12 rounded-full bg-[#c99558]/20 text-[#c99558] flex items-center justify-center mx-auto">
            <Sparkles className="w-6 h-6" />
          </div>

          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#f5f3ef]">
            Fresh Offers, Straight From The Oven
          </h2>

          <p className="text-xs sm:text-sm text-[#a8a69e] max-w-md mx-auto leading-relaxed">
            Subscribe to receive secret weekend cake drops, seasonal Eid pre-orders, and an instant{' '}
            <strong className="text-[#f5f3ef]">10% off welcome voucher</strong> for your first order.
          </p>

          {newsletterSuccess ? (
            <div className="p-4 rounded-xl bg-[#16291e] border border-[#2b4c37] text-xs text-[#55c786] font-medium max-w-md mx-auto flex items-center justify-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>Thank you! We've sent your 10% promo code to your email.</span>
            </div>
          ) : (
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2.5 max-w-md mx-auto pt-2">
              <input
                type="email"
                value={newsletterEmail}
                onChange={(e) => setNewsletterEmail(e.target.value)}
                placeholder="Enter your email address..."
                required
                className="flex-1 bg-[#0d0d12] border border-[#2b2b3a] rounded-lg px-4 py-3 text-xs sm:text-sm text-[#f5f3ef] placeholder-[#6b6964] focus:border-[#c99558] focus:outline-none"
              />
              <button
                type="submit"
                disabled={isSubscribing}
                className="py-3 px-6 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] text-xs sm:text-sm font-bold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98 disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubscribing ? 'Joining...' : 'Join Our List'}</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          )}

          <p className="text-[10px] text-[#6e6c66] pt-1">
            No spam ever. Unsubscribe anytime with a single click.
          </p>
        </div>
      </section>
    </div>
  );
};
