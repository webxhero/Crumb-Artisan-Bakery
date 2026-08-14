import React, { useEffect } from 'react';
import { StoreProvider, useStore } from './context/StoreContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { MobileMenu } from './components/MobileMenu';
import { SearchModal } from './components/SearchModal';
import { QuickViewModal } from './components/QuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { ToastContainer } from './components/ToastContainer';
import { Footer } from './components/Footer';

// Pages
import { HomePage } from './pages/HomePage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { WishlistPage } from './pages/WishlistPage';
import { AccountPage } from './pages/AccountPage';
import {
  AboutPage,
  OffersPage,
  DeliveryInfoPage,
  FaqPage,
  ContactPage,
  PoliciesPage,
} from './pages/SupportingPages';

const AppContent: React.FC = () => {
  const { route } = useStore();

  // Scroll to top whenever the route changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [route]);

  const renderCurrentPage = () => {
    switch (route) {
      case 'home':
        return <HomePage />;
      case 'shop':
      case 'category':
        return <ShopPage />;
      case 'product':
        return <ProductDetailPage />;
      case 'cart':
        return <CartPage />;
      case 'checkout':
        return <CheckoutPage />;
      case 'order-success':
        return <OrderSuccessPage />;
      case 'wishlist':
        return <WishlistPage />;
      case 'account':
        return <AccountPage />;
      case 'offers':
        return <OffersPage />;
      case 'about':
        return <AboutPage />;
      case 'delivery':
        return <DeliveryInfoPage />;
      case 'faq':
        return <FaqPage />;
      case 'contact':
        return <ContactPage />;
      case 'privacy':
        return <PoliciesPage type="privacy" />;
      case 'terms':
        return <PoliciesPage type="terms" />;
      case 'refunds':
        return <PoliciesPage type="refunds" />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#f4f2ee] flex flex-col font-sans selection:bg-[#c99558] selection:text-[#0c0c0e]">
      {/* Top Banner */}
      <AnnouncementBar />

      {/* Main Header & Navigation */}
      <Header />

      {/* Main Page Body */}
      <main className="flex-1 w-full">{renderCurrentPage()}</main>

      {/* Footer */}
      <Footer />

      {/* Global Interactive Overlays */}
      <MobileMenu />
      <SearchModal />
      <QuickViewModal />
      <CartDrawer />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <StoreProvider>
      <AppContent />
    </StoreProvider>
  );
}
