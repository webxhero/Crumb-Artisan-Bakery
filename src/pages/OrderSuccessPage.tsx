import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import {
  CheckCircle2,
  Package,
  Truck,
  Printer,
  Phone,
  ArrowRight,
  Sparkles,
  Clock,
  MapPin,
} from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const OrderSuccessPage: React.FC = () => {
  const { latestOrder, navigateTo } = useStore();

  useEffect(() => {
    // Launch celebratory confetti
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#c99558', '#f5f3ef', '#38b273', '#e6b980'],
      });
    } catch (e) {
      // ignore
    }
  }, []);

  const order = latestOrder || {
    id: 'ord-demo-1',
    orderNumber: 'VC-89421',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    items: [],
    subtotal: 3200,
    discount: 480,
    deliveryFee: 0,
    total: 2720,
    address: {
      fullName: 'Samira Anjum',
      phone: '+880 1711-223344',
      email: 'samira@example.com',
      area: 'Gulshan-2',
      city: 'Dhaka',
      fullAddress: 'House 14, Road 45, Gulshan-2, Dhaka-1212',
    },
    deliveryMethod: 'express-today',
    deliveryDate: new Date().toISOString().split('T')[0],
    deliverySlot: 'Evening (4:00 PM - 7:00 PM)',
    paymentMethod: 'bkash',
    paymentStatus: 'verified',
    orderStatus: 'received',
  };

  const steps = [
    { label: 'Order Confirmed', time: 'Just now', done: true, current: false },
    { label: 'Kitchen Master Bake', time: 'In progress', done: false, current: true },
    { label: 'Chilled Pack & Quality Check', time: 'Pending', done: false, current: false },
    { label: 'Chauffeur Dispatch', time: 'Scheduled', done: false, current: false },
    { label: 'Delivered Fresh', time: order.deliverySlot || 'Evening', done: false, current: false },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Celebration Header */}
      <div className="text-center space-y-3">
        <div className="w-16 h-16 rounded-full bg-[#16291e] border-2 border-[#38b273] text-[#38b273] flex items-center justify-center mx-auto shadow-xl">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#c99558]/20 border border-[#c99558]/30 text-xs text-[#e6b980] font-semibold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Fresh Artisanal Order Confirmed</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#f5f3ef]">
          Thank You, {order.address?.fullName}!
        </h1>

        <p className="text-xs sm:text-sm text-[#a8a69e] max-w-lg mx-auto leading-relaxed">
          We’ve received your order <strong className="text-[#f5f3ef]">#{order.orderNumber}</strong>. Our chef patissier has queued your bakes for small-batch crafting.
        </p>
      </div>

      {/* Live Baking & Delivery Progress Tracker */}
      <div className="p-6 rounded-2xl bg-[#111116] border border-[#242432] space-y-6 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#20202c]">
          <div>
            <h2 className="font-serif text-base font-bold text-[#f5f3ef]">Live Order Progress</h2>
            <p className="text-xs text-[#73716d]">Estimated Delivery: {order.deliveryDate} ({order.deliverySlot})</p>
          </div>
          <span className="self-start sm:self-auto px-3 py-1 rounded-full bg-[#38b273]/20 border border-[#38b273]/30 text-xs text-[#55c786] font-semibold">
            Status: Kitchen Preparing
          </span>
        </div>

        {/* Progress steps */}
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
          {steps.map((step, idx) => (
            <div key={idx} className="relative flex sm:flex-col items-center sm:text-center gap-3 sm:gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                  step.done
                    ? 'bg-[#38b273] text-[#0c0c0e]'
                    : step.current
                    ? 'bg-[#c99558] text-[#0c0c0e] ring-4 ring-[#c99558]/20 animate-pulse'
                    : 'bg-[#1a1a24] text-[#6b6964] border border-[#2d2d3e]'
                }`}
              >
                {step.done ? '✓' : idx + 1}
              </div>
              <div className="space-y-0.5 text-left sm:text-center">
                <div className={`text-xs font-semibold ${step.current ? 'text-[#c99558]' : 'text-[#dedbd4]'}`}>
                  {step.label}
                </div>
                <div className="text-[10px] text-[#73716d]">{step.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary & Delivery Details Card */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Delivery Details */}
        <div className="p-5 rounded-xl bg-[#111116] border border-[#242432] space-y-3 text-xs">
          <h3 className="font-serif text-base font-bold text-[#f5f3ef] flex items-center gap-2">
            <MapPin className="w-4 h-4 text-[#c99558]" />
            Delivery Destination
          </h3>
          <div className="space-y-1 text-[#dedbd4]">
            <p><strong className="text-[#8c8983]">Recipient:</strong> {order.address?.fullName}</p>
            <p><strong className="text-[#8c8983]">Contact Phone:</strong> {order.address?.phone}</p>
            <p><strong className="text-[#8c8983]">Address:</strong> {order.address?.fullAddress}</p>
            <p><strong className="text-[#8c8983]">Zone:</strong> {order.address?.area}, Dhaka</p>
            {order.address?.orderNotes && (
              <p><strong className="text-[#8c8983]">Notes:</strong> {order.address.orderNotes}</p>
            )}
          </div>
        </div>

        {/* Payment & Schedule */}
        <div className="p-5 rounded-xl bg-[#111116] border border-[#242432] space-y-3 text-xs">
          <h3 className="font-serif text-base font-bold text-[#f5f3ef] flex items-center gap-2">
            <Clock className="w-4 h-4 text-[#c99558]" />
            Schedule & Payment
          </h3>
          <div className="space-y-1 text-[#dedbd4]">
            <p><strong className="text-[#8c8983]">Delivery Date:</strong> {order.deliveryDate}</p>
            <p><strong className="text-[#8c8983]">Slot Window:</strong> {order.deliverySlot}</p>
            <p><strong className="text-[#8c8983]">Payment Method:</strong> {order.paymentMethod?.toUpperCase()}</p>
            <p><strong className="text-[#8c8983]">Payment Status:</strong> <span className="text-[#38b273] font-semibold">{order.paymentStatus?.toUpperCase()}</span></p>
            <p><strong className="text-[#8c8983]">Total Amount:</strong> <span className="text-sm font-bold text-[#c99558]">৳{order.total?.toLocaleString()}</span></p>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
        <button
          onClick={() => window.print()}
          className="py-3 px-5 rounded-lg bg-[#1a1a24] hover:bg-[#252535] text-[#dedbd4] text-xs font-semibold border border-[#2e2e3e] flex items-center gap-2 transition-colors cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Print Receipt</span>
        </button>

        <button
          onClick={() => navigateTo('shop')}
          className="py-3 px-6 rounded-lg bg-[#c99558] hover:bg-[#dcab6e] text-[#0c0c0e] font-bold text-xs flex items-center gap-2 transition-all shadow-md cursor-pointer"
        >
          <span>Continue Shopping</span>
          <ArrowRight className="w-4 h-4" />
        </button>

        <a
          href="https://wa.me/8801700112233"
          target="_blank"
          rel="noreferrer"
          className="py-3 px-5 rounded-lg bg-[#16291e] hover:bg-[#203c2b] text-[#55c786] text-xs font-semibold border border-[#2b4c37] flex items-center gap-2 transition-colors"
        >
          <Phone className="w-4 h-4" />
          <span>WhatsApp Concierge (+880 1700-112233)</span>
        </a>
      </div>
    </div>
  );
};
