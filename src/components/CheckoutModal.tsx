import React, { useState } from 'react';
import { CartItem, Currency } from '../types';
import { ShieldCheck, CheckCircle2, CreditCard, Download, Sparkles, X } from 'lucide-react';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: Currency;
  onClearCart: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalPKR = items.reduce((acc, item) => acc + item.unitPricePKR * item.quantity, 0);
  const totalUSD = items.reduce((acc, item) => acc + item.unitPriceUSD * item.quantity, 0);

  const [paymentOption, setPaymentOption] = useState<'full' | 'deposit'>('full');
  const [customerName, setCustomerName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [address, setAddress] = useState<string>('');
  const [city, setCity] = useState<string>('Lahore');
  const [country, setCountry] = useState<string>('Pakistan');

  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [orderReceiptCode, setOrderReceiptCode] = useState<string>('');

  const payablePKR = paymentOption === 'deposit' ? Math.round(totalPKR * 0.5) : totalPKR;
  const payableUSD = paymentOption === 'deposit' ? Math.round(totalUSD * 0.5) : totalUSD;

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const code = 'VEL-ORD-' + Math.floor(100000 + Math.random() * 900000);
    setOrderReceiptCode(code);
    setIsSubmitted(true);
    onClearCart();
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl relative my-auto">
        {/* Header */}
        <div className="bg-[#2C241E] text-amber-100 p-5 flex items-center justify-between border-b border-amber-900/30">
          <div>
            <span className="text-amber-300 text-[10px] font-serif uppercase tracking-widest block font-bold">
              Encrypted Luxury Checkout
            </span>
            <h2 className="text-xl font-serif font-bold text-white">
              Complete VELORA Atelier Order
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          {isSubmitted ? (
            /* Order Confirmation View */
            <div className="text-center py-8 space-y-5 animate-in fade-in">
              <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center mx-auto shadow-md">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-extrabold text-[#2C241E]">
                  Order Successfully Placed!
                </h3>
                <p className="text-xs text-stone-600 font-sans">
                  Your luxury order reference is <strong className="text-amber-900 font-mono">{orderReceiptCode}</strong>
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-stone-200 text-xs text-left max-w-lg mx-auto space-y-2">
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Client Name:</span>
                  <span className="font-bold text-stone-900">{customerName}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Delivery Address:</span>
                  <span className="font-bold text-stone-900">{address}, {city}, {country}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Payment Terms:</span>
                  <span className="font-bold text-amber-900">
                    {paymentOption === 'deposit' ? '50% Custom Advance Deposit' : 'Full Payment'}
                  </span>
                </div>
                <div className="flex justify-between pt-1 font-bold text-sm text-stone-900">
                  <span>Amount Paid / Due:</span>
                  <span>{currency === 'PKR' ? `Rs. ${payablePKR.toLocaleString()}` : `$${payableUSD.toLocaleString()}`}</span>
                </div>
              </div>

              <p className="text-xs text-stone-500 font-sans max-w-md mx-auto">
                Our lead senior fashion designer will reach out via WhatsApp (<strong className="text-stone-800">{phone}</strong>) within 2 hours to confirm measurement specifications.
              </p>

              <div className="flex justify-center gap-3">
                <button
                  onClick={() => window.print()}
                  className="bg-white border border-stone-300 text-stone-800 px-5 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-[#2C241E] text-amber-100 px-6 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold"
                >
                  Return to Boutique
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handlePlaceOrder} className="space-y-6">
              {/* Pre-Order Interest Information */}
              <div className="bg-amber-900/10 p-4 rounded-xl border border-amber-800/30 space-y-1">
                <span className="text-xs font-serif font-bold text-amber-950 block uppercase tracking-wider">
                  Official Launch Pre-Order Registration
                </span>
                <p className="text-xs text-stone-600 font-sans">
                  By registering your interest for these preview articles, you will secure priority allocation and receive instant SMS/WhatsApp notification the moment the collection goes live!
                </p>
              </div>

              {/* Shipping Form Inputs */}
              <div className="space-y-3 text-xs">
                <h3 className="font-serif font-bold text-stone-900 uppercase tracking-wider">
                  Client & Shipping Information:
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-serif text-stone-700 block mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. Fatima Tariq"
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="font-serif text-stone-700 block mb-1">WhatsApp / Phone *</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 0000000"
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-serif text-stone-700 block mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="fatima@example.com"
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                    />
                  </div>
                  <div>
                    <label className="font-serif text-stone-700 block mb-1">City *</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      placeholder="Lahore / Karachi / Dubai / London"
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-serif text-stone-700 block mb-1">Shipping Street Address *</label>
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="House / Apartment #, Street Name, Area"
                    className="w-full bg-white border border-stone-300 rounded-lg p-2.5"
                  />
                </div>
              </div>

              {/* Pre-Order Submit */}
              <div className="bg-white p-4 rounded-xl border border-stone-200 flex items-center justify-between">
                <div>
                  <span className="text-xs text-stone-500 font-serif block">Price & Release Date:</span>
                  <span className="text-sm font-serif font-extrabold text-amber-900">
                    Announced on Official Launch (Coming Soon)
                  </span>
                </div>
                <button
                  type="submit"
                  className="bg-[#2C241E] text-amber-100 hover:bg-stone-800 px-6 py-3 rounded-xl text-xs font-serif uppercase tracking-wider font-bold shadow-md transition"
                >
                  Register Pre-Order Interest
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
