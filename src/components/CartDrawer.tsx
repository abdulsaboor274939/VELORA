import React from 'react';
import { CartItem, Currency } from '../types';
import { ShoppingBag, Trash2, Scissors, ArrowRight, ShieldCheck, X } from 'lucide-react';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onUpdateQuantity: (itemId: string, qty: number) => void;
  onRemoveItem: (itemId: string) => void;
  onOpenCheckout: () => void;
  onOpenBespokeStudio: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onUpdateQuantity,
  onRemoveItem,
  onOpenCheckout,
  onOpenBespokeStudio,
}) => {
  if (!isOpen) return null;

  const totalPKR = items.reduce((acc, item) => acc + item.unitPricePKR * item.quantity, 0);
  const totalUSD = items.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-stone-900/80 backdrop-blur-xs">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FAF8F5] border-l border-stone-300 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-6 bg-[#2C241E] text-amber-100 flex items-center justify-between border-b border-amber-900/30">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-300" />
              <h2 className="font-serif text-lg font-bold text-white tracking-tight">
                Your Atelier Bag ({items.length})
              </h2>
            </div>
            <button
              onClick={onClose}
              className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-stone-200 text-stone-500 rounded-full flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-serif text-lg font-bold text-stone-800">Your bag is empty</h3>
                <p className="text-xs text-stone-500 font-sans max-w-xs mx-auto">
                  Explore our ready-to-wear collections or build a custom dress tailored to your exact measurements.
                </p>
                <button
                  onClick={() => {
                    onClose();
                    onOpenBespokeStudio();
                  }}
                  className="bg-amber-900 text-white px-5 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold shadow-md hover:bg-amber-950 transition"
                >
                  Start Custom Studio
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs flex gap-3 relative"
                >
                  {/* Item Image or Custom Badge */}
                  <div className="w-20 h-24 bg-stone-100 rounded-xl overflow-hidden shrink-0 border border-stone-200 relative">
                    {item.product ? (
                      <img
                        src={item.product.image}
                        alt=""
                        className="w-full h-full object-cover object-top"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (!target.dataset.retried && item.product) {
                            target.dataset.retried = 'true';
                            const img = item.product.image;
                            target.src = img.startsWith('/') ? img.slice(1) : '/' + img;
                          }
                        }}
                      />
                    ) : (
                      <div className="w-full h-full bg-[#2C241E] text-amber-100 p-2 flex flex-col items-center justify-center text-center">
                        <Scissors className="w-6 h-6 text-amber-300 mb-1" />
                        <span className="text-[9px] font-serif uppercase tracking-widest font-bold">Bespoke</span>
                      </div>
                    )}
                  </div>

                  {/* Item Details */}
                  <div className="flex-1 space-y-1 text-xs">
                    <div className="flex justify-between pr-6">
                      <h4 className="font-serif font-bold text-stone-900 line-clamp-1">
                        {item.product ? item.product.title : 'Custom VELORA Bespoke Outfit'}
                      </h4>
                    </div>

                    {item.isCustom && item.customConfig ? (
                      <div className="text-[10px] text-stone-500 space-y-0.5 font-sans">
                        <p>Silhouette: <span className="text-stone-800 font-bold uppercase">{item.customConfig.silhouette.replace('_', ' ')}</span></p>
                        <p>Fabric: <span className="text-stone-800 font-bold">{item.customConfig.fabric.replace('_', ' ')}</span></p>
                        <div className="flex items-center gap-1">
                          <span>Shade:</span>
                          <span className="w-2.5 h-2.5 rounded-full border border-stone-300" style={{ backgroundColor: item.customConfig.colorHex }} />
                          <span className="text-stone-800 font-bold">{item.customConfig.colorName}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[10px] text-stone-500 font-sans">
                        Size: <strong className="text-stone-800">{item.selectedSize}</strong> • Color: <strong className="text-stone-800">{item.selectedColor}</strong>
                      </p>
                    )}

                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center border border-stone-300 rounded-lg overflow-hidden bg-stone-50">
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                          className="px-2 py-0.5 text-stone-700 hover:bg-stone-200"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold font-sans">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                          className="px-2 py-0.5 text-stone-700 hover:bg-stone-200"
                        >
                          +
                        </button>
                      </div>

                    <span className="inline-block px-2 py-0.5 rounded bg-amber-900/10 text-amber-900 font-serif font-bold text-[11px] uppercase tracking-wider">
                      Coming Soon
                    </span>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="absolute top-3 right-3 text-stone-400 hover:text-rose-700 p-1"
                      title="Remove Item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Cart Footer */}
          {items.length > 0 && (
            <div className="p-6 bg-white border-t border-stone-200 space-y-4">
              <div className="space-y-1.5 text-xs">
                <div className="flex justify-between text-stone-500">
                  <span>Collection Launch Status:</span>
                  <span className="text-amber-900 font-bold uppercase font-serif">Coming Soon</span>
                </div>
                <div className="flex justify-between text-stone-500">
                  <span>Worldwide Express Delivery:</span>
                  <span className="text-emerald-800 font-bold">Complimentary</span>
                </div>
                <div className="flex justify-between font-serif text-sm font-extrabold text-[#2C241E] pt-2 border-t border-stone-200">
                  <span>Price:</span>
                  <span className="text-amber-900">Announced on Launch</span>
                </div>
              </div>

              <button
                onClick={() => {
                  onClose();
                  onOpenCheckout();
                }}
                className="w-full bg-[#2C241E] text-amber-100 hover:bg-amber-950 py-3.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-lg transition"
              >
                <span>Register Pre-Order Interest</span>
                <ArrowRight className="w-4 h-4 text-amber-300" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
