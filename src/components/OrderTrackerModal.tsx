import React, { useState } from 'react';
import { Search, Clock, CheckCircle2, Circle, Truck, PackageCheck, Scissors, X } from 'lucide-react';

interface OrderTrackerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const OrderTrackerModal: React.FC<OrderTrackerModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const [orderInput, setOrderInput] = useState<string>('VEL-8921');
  const [loading, setLoading] = useState<boolean>(false);
  const [orderData, setOrderData] = useState<any | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleTrack = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!orderInput.trim()) return;

    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch(`/api/track-order/${encodeURIComponent(orderInput.trim())}`);
      const data = await res.json();

      if (data.success && data.order) {
        setOrderData(data.order);
      } else {
        setErrorMsg('Order ID not found.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to fetch order status.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl relative my-auto">
        {/* Header */}
        <div className="bg-[#2C241E] text-amber-100 p-5 flex items-center justify-between border-b border-amber-900/30">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-300" />
            <h2 className="text-xl font-serif font-bold text-white">
              Bespoke Order Progress Tracker
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Order Search Bar */}
          <form onSubmit={handleTrack} className="flex gap-2">
            <input
              type="text"
              value={orderInput}
              onChange={(e) => setOrderInput(e.target.value)}
              placeholder="Enter Order Code (e.g. VEL-8921)"
              className="flex-1 bg-white border border-stone-300 rounded-xl px-4 py-2.5 text-xs text-stone-900 focus:outline-none focus:ring-2 focus:ring-amber-900/20"
            />
            <button
              type="submit"
              disabled={loading}
              className="bg-amber-900 text-white px-5 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold hover:bg-amber-950 transition flex items-center gap-1.5"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Track</span>
            </button>
          </form>

          {/* Preset order chips */}
          <div className="flex items-center gap-2 text-xs text-stone-500 font-sans">
            <span>Try sample codes:</span>
            <button
              onClick={() => {
                setOrderInput('VEL-8921');
                setTimeout(() => handleTrack(), 100);
              }}
              className="text-amber-900 font-bold hover:underline"
            >
              VEL-8921
            </button>
            <span>•</span>
            <button
              onClick={() => {
                setOrderInput('VEL-9104');
                setTimeout(() => handleTrack(), 100);
              }}
              className="text-amber-900 font-bold hover:underline"
            >
              VEL-9104
            </button>
          </div>

          {orderData && (
            <div className="space-y-6 animate-in fade-in">
              {/* Summary Card */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-2">
                <div className="flex items-center justify-between text-xs border-b border-stone-100 pb-2">
                  <div>
                    <span className="text-stone-400 font-sans block">Client Name:</span>
                    <strong className="text-stone-900 font-serif">{orderData.customerName}</strong>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 font-sans block">Order Code:</span>
                    <strong className="text-amber-900 font-mono">{orderData.orderId}</strong>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <div>
                    <span className="text-stone-500 font-sans block">{orderData.dressTitle}</span>
                    <span className="text-[11px] text-amber-900 font-serif font-bold">Current Stage: {orderData.status}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-stone-400 font-sans block text-[10px]">Est. Delivery:</span>
                    <span className="text-xs font-bold text-stone-800">{orderData.estimatedDeliveryDate}</span>
                  </div>
                </div>

                {/* Progress bar line */}
                <div className="w-full bg-stone-100 h-2 rounded-full overflow-hidden mt-3">
                  <div
                    className="bg-amber-900 h-full transition-all duration-500"
                    style={{ width: `${orderData.progressPercentage}%` }}
                  />
                </div>
              </div>

              {/* Step Milestones Checklist */}
              <div className="space-y-3">
                <span className="text-xs font-serif font-bold text-stone-800 uppercase tracking-wider block">
                  Production Milestones:
                </span>

                <div className="space-y-2">
                  {orderData.milestones.map((ms: any, idx: number) => (
                    <div
                      key={idx}
                      className={`p-3 rounded-xl border flex items-center justify-between text-xs transition ${
                        ms.completed ? 'bg-emerald-50/60 border-emerald-200 text-emerald-950' : 'bg-white border-stone-200 text-stone-500'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        {ms.completed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-700 shrink-0" />
                        ) : (
                          <Circle className="w-4 h-4 text-stone-300 shrink-0" />
                        )}
                        <span className={`font-serif ${ms.completed ? 'font-bold' : ''}`}>{ms.step}</span>
                      </div>
                      <span className="text-[10px] font-sans text-stone-500">{ms.date}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
