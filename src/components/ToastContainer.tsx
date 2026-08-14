import React from 'react';
import { CheckCircle2, AlertCircle, Info, AlertTriangle, X } from 'lucide-react';
import { useStore } from '../context/StoreContext';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useStore();

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      aria-atomic="true"
      className="fixed bottom-4 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none px-4 sm:px-0"
    >
      {toasts.map((toast) => {
        let Icon = CheckCircle2;
        let iconColor = 'text-[#38b273]';
        let borderColor = 'border-[#2c3d33]';

        if (toast.type === 'error') {
          Icon = AlertCircle;
          iconColor = 'text-[#ef4444]';
          borderColor = 'border-[#4a2626]';
        } else if (toast.type === 'warning') {
          Icon = AlertTriangle;
          iconColor = 'text-[#eab308]';
          borderColor = 'border-[#42391e]';
        } else if (toast.type === 'info') {
          Icon = Info;
          iconColor = 'text-[#60a5fa]';
          borderColor = 'border-[#223348]';
        }

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto bg-[#14141a] text-[#f5f3ef] border ${borderColor} rounded-lg p-3.5 shadow-2xl flex items-start gap-3 animate-in slide-in-from-bottom-3 duration-200`}
            role="status"
          >
            <Icon className={`w-5 h-5 ${iconColor} shrink-0 mt-0.5`} />
            <div className="flex-1 min-w-0">
              <h5 className="text-sm font-semibold text-[#f5f3ef] leading-snug">{toast.title}</h5>
              {toast.message && <p className="text-xs text-[#a8a69e] mt-0.5 leading-relaxed">{toast.message}</p>}
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-[#7d7a74] hover:text-[#f5f3ef] p-0.5 rounded transition-colors"
              aria-label="Dismiss toast"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};
