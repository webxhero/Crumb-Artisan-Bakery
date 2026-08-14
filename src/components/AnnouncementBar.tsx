import React, { useState } from 'react';
import { X, Sparkles, Truck, Clock } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);
  const { navigateTo } = useStore();

  if (!isVisible) return null;

  return (
    <aside
      aria-label="Announcement"
      className="bg-[#18181f] text-[#dedbd4] border-b border-[#292934] text-xs py-2 px-4 relative z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Left item: subtle trust badge */}
        <div className="hidden md:flex items-center gap-2 text-[#a8a69e]">
          <Clock className="w-3.5 h-3.5 text-[#c99558]" />
          <span>Fresh batches baked at 5:00 AM daily</span>
        </div>

        {/* Center item: Main offer */}
        <div className="flex-1 text-center flex items-center justify-center gap-2">
          <Sparkles className="w-3.5 h-3.5 text-[#c99558] shrink-0" />
          <span>
            Complimentary artisan delivery across Dhaka on orders over{' '}
            <strong className="text-[#f5f3ef] font-semibold">৳1,500</strong>. Use code{' '}
            <button
              onClick={() => navigateTo('offers')}
              className="text-[#c99558] hover:text-[#dcab6e] font-semibold underline underline-offset-2 ml-1 cursor-pointer transition-colors"
            >
              VELVET15
            </button>{' '}
            for 15% off!
          </span>
        </div>

        {/* Right item: Express dispatch & close */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-1.5 text-[#a8a69e]">
            <Truck className="w-3.5 h-3.5 text-[#c99558]" />
            <span>Dhaka same-day express</span>
          </div>

          <button
            onClick={() => setIsVisible(false)}
            className="text-[#7e7c77] hover:text-[#f5f3ef] p-1 rounded transition-colors focus:outline-none"
            aria-label="Close promotional bar"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};
