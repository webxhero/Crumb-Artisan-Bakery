import React, { useState } from 'react';
import {
  User,
  Package,
  MapPin,
  Clock,
  Award,
  ChevronRight,
  ShieldCheck,
  Phone,
  LogOut,
  ShoppingBag,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AccountPage: React.FC = () => {
  const { orders, navigateTo } = useStore();
  const [activeTab, setActiveTab] = useState<'orders' | 'profile' | 'addresses'>('orders');

  const demoOrders = [
    {
      id: 'ord-101',
      orderNumber: 'VC-89421',
      date: 'May 12, 2026',
      total: 3450,
      status: 'Kitchen Baking',
      itemsCount: 3,
      itemsSummary: 'Noir Truffle Cake (1 KG), French Croissants (4 pcs)',
    },
    {
      id: 'ord-100',
      orderNumber: 'VC-77219',
      date: 'Apr 28, 2026',
      total: 1650,
      status: 'Delivered',
      itemsCount: 1,
      itemsSummary: 'French Macaron Jewel Box (12 pcs)',
    },
  ];

  const allOrders = orders.length > 0 ? orders : demoOrders;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Profile Header Card */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-[#181824] via-[#15151e] to-[#101015] border border-[#2c2c3e] flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c99558] to-[#8f5d27] flex items-center justify-center text-[#0c0c0e] font-serif font-bold text-2xl shadow-lg">
            SA
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="font-serif text-2xl font-bold text-[#f5f3ef]">Samira Anjum</h1>
              <span className="px-2.5 py-0.5 rounded-full bg-[#c99558]/20 text-[#e6b980] border border-[#c99558]/30 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
                <Award className="w-3 h-3" /> Gold Connoisseur
              </span>
            </div>
            <p className="text-xs text-[#a8a69e]">samira.anjum@gmail.com • +880 1711-223344</p>
            <p className="text-[11px] text-[#73716d]">Member since January 2024 • Preferred Area: Gulshan-2, Dhaka</p>
          </div>
        </div>

        <div className="flex items-center gap-3 self-stretch md:self-auto">
          <div className="p-3 rounded-xl bg-[#0e0e14] border border-[#242432] text-center flex-1 md:flex-initial">
            <div className="text-[10px] uppercase text-[#73716d] font-bold">Reward Points</div>
            <div className="text-lg font-bold text-[#c99558]">480 pts</div>
          </div>
          <div className="p-3 rounded-xl bg-[#0e0e14] border border-[#242432] text-center flex-1 md:flex-initial">
            <div className="text-[10px] uppercase text-[#73716d] font-bold">Total Bakes</div>
            <div className="text-lg font-bold text-[#f5f3ef]">12 orders</div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#242432] gap-6 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveTab('orders')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'orders' ? 'text-[#c99558]' : 'text-[#8c8983] hover:text-[#dedbd4]'
          }`}
        >
          My Orders & Live Tracking
          {activeTab === 'orders' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />}
        </button>

        <button
          onClick={() => setActiveTab('addresses')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'addresses' ? 'text-[#c99558]' : 'text-[#8c8983] hover:text-[#dedbd4]'
          }`}
        >
          Saved Dhaka Addresses
          {activeTab === 'addresses' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />}
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`pb-3 transition-colors relative ${
            activeTab === 'profile' ? 'text-[#c99558]' : 'text-[#8c8983] hover:text-[#dedbd4]'
          }`}
        >
          Loyalty & Profile Settings
          {activeTab === 'profile' && <span className="absolute bottom-0 inset-x-0 h-0.5 bg-[#c99558]" />}
        </button>
      </div>

      {/* Orders Tab */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {allOrders.map((ord: any) => (
            <div
              key={ord.id}
              className="p-5 rounded-xl bg-[#111116] border border-[#242432] space-y-3 shadow-md"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1e1e28]">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-[#f5f3ef]">#{ord.orderNumber}</span>
                    <span className="text-xs text-[#73716d]">• {ord.date}</span>
                  </div>
                  <div className="text-xs text-[#a8a69e]">
                    {ord.itemsSummary || `${ord.items?.length || 1} handcrafted items`}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded-full bg-[#c99558]/15 border border-[#c99558]/30 text-[#c99558] font-semibold text-xs">
                    {ord.status || 'Kitchen Baking'}
                  </span>
                  <span className="font-bold text-sm text-[#f5f3ef] font-sans">
                    ৳{ord.total?.toLocaleString()}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-[#8c8983]">
                <span>Delivering to Gulshan-2 via Express Chilled Delivery</span>
                <button
                  onClick={() => navigateTo('order-success')}
                  className="text-[#c99558] hover:underline font-semibold flex items-center gap-1"
                >
                  <span>Track Status</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Addresses Tab */}
      {activeTab === 'addresses' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-5 rounded-xl bg-[#111116] border border-[#242432] space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#c99558]/20 text-[#c99558] text-[10px] font-bold uppercase">
                Default Primary
              </span>
              <span className="text-xs font-semibold text-[#f5f3ef]">Home</span>
            </div>
            <p className="text-xs text-[#dedbd4] leading-relaxed">
              House 14, Apt 5B, Road 45, Gulshan-2, Dhaka-1212
            </p>
            <div className="text-[11px] text-[#8c8983]">Contact: +880 1711-223344</div>
          </div>

          <div className="p-5 rounded-xl bg-[#111116] border border-[#242432] space-y-3">
            <div className="flex items-center justify-between">
              <span className="px-2 py-0.5 rounded bg-[#1f1f2c] text-[#a8a69e] text-[10px] font-bold uppercase">
                Work / Studio
              </span>
              <span className="text-xs font-semibold text-[#f5f3ef]">Office</span>
            </div>
            <p className="text-xs text-[#dedbd4] leading-relaxed">
              Floor 9, Lotus Kamal Tower, 57 Joar Shahara, Gulshan North, Dhaka
            </p>
            <div className="text-[11px] text-[#8c8983]">Contact: +880 1711-223344</div>
          </div>
        </div>
      )}

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="max-w-xl p-6 rounded-xl bg-[#111116] border border-[#242432] space-y-4 text-xs">
          <h3 className="font-serif text-lg font-bold text-[#f5f3ef]">Loyalty Privileges</h3>
          <p className="text-[#a8a69e] leading-relaxed">
            As a <strong>Gold Connoisseur</strong>, you receive complimentary birthday cake delivery, 5% automatic discount on all custom celebration cakes, and priority queue during Eid and festive periods.
          </p>
          <div className="pt-2">
            <button
              onClick={() => navigateTo('offers')}
              className="py-2.5 px-4 rounded-lg bg-[#c99558] text-[#0c0c0e] font-bold text-xs"
            >
              View Exclusive Member Offers
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
