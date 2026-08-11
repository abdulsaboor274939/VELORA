import React, { useState } from 'react';
import { MessageCircle, X, Sparkles, Send, PhoneCall } from 'lucide-react';

interface WhatsAppFloatingButtonProps {
  phoneNumber?: string;
  ceoName?: string;
}

export const WHATSAPP_NUMBER = '923713508765';
export const CEO_NAME = 'EMAN MUSTUFA';

export const getWhatsAppUrl = (message: string = 'Hi! I want to inquire about Velora Femme Couture coming soon collection.') => {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
};

export const WhatsAppFloatingButton: React.FC<WhatsAppFloatingButtonProps> = ({
  ceoName = CEO_NAME,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [customMsg, setCustomMsg] = useState('');

  const quickMessages = [
    `Hi! I want to register for the Velora Femme Couture coming soon collection.`,
    `Hello! Can you share details about the 16 preview articles?`,
    `Hi! I would like to order a custom bespoke outfit.`,
    `Please notify me on WhatsApp when Velora collection officially launches!`,
  ];

  const handleSend = (msgText: string) => {
    if (!msgText.trim()) return;
    const url = getWhatsAppUrl(msgText);
    window.open(url, '_blank');
    setIsOpen(false);
  };

  const handleDirectClick = () => {
    const url = getWhatsAppUrl();
    window.open(url, '_blank');
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Quick Chat Popup */}
      {isOpen && (
        <div className="mb-4 w-80 sm:w-96 bg-[#FAF5F0] rounded-2xl shadow-2xl border border-[#E5C5C0] overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-[#1F1918] text-[#FAF5F0] p-4 flex items-center justify-between border-b border-[#362A28]">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-[#D9989F] text-[#1F1918] flex items-center justify-center font-serif font-bold text-lg border-2 border-amber-200 shadow-xs">
                  EM
                </div>
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-[#1F1918] rounded-full"></span>
              </div>
              <div>
                <h4 className="font-serif text-sm font-bold tracking-wide text-white flex items-center gap-1.5">
                  <span>Velora Concierge</span>
                  <span className="text-[9px] bg-[#D9989F]/30 text-amber-200 px-1.5 py-0.5 rounded font-sans uppercase tracking-wider">
                    Official
                  </span>
                </h4>
                <p className="text-[10px] text-emerald-400 flex items-center gap-1">
                  <span>Online on WhatsApp</span> • <span>Instant Chat</span>
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-stone-400 hover:text-white p-1 rounded-full transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="p-4 space-y-3 max-h-80 overflow-y-auto">
            <div className="bg-white p-3 rounded-xl border border-[#E5C5C0] text-xs text-[#1F1918] space-y-1 shadow-xs">
              <p className="font-serif font-bold text-stone-800 flex items-center gap-1">
                <span>Velora Executive Concierge</span> 💖
              </p>
              <p className="text-stone-600 leading-relaxed text-[11px]">
                Welcome to <strong>Velora Femme Couture</strong>. Tap any quick option below to open direct WhatsApp chat with us instantly!
              </p>
            </div>

            {/* Quick Presets */}
            <div className="space-y-1.5">
              <span className="text-[10px] font-serif font-bold uppercase tracking-widest text-[#C47B85] block">
                Quick WhatsApp Inquiry:
              </span>
              {quickMessages.map((msg, index) => (
                <button
                  key={index}
                  onClick={() => handleSend(msg)}
                  className="w-full text-left bg-white hover:bg-[#F5EBE6] text-[#1F1918] border border-[#E5C5C0] hover:border-[#D9989F] p-2.5 rounded-xl text-xs font-sans transition flex items-center justify-between group shadow-xs"
                >
                  <span className="line-clamp-2 pr-2">{msg}</span>
                  <Send className="w-3.5 h-3.5 text-[#C47B85] group-hover:translate-x-0.5 transition shrink-0" />
                </button>
              ))}
            </div>

            {/* Custom Input */}
            <div className="pt-2">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(customMsg);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={customMsg}
                  onChange={(e) => setCustomMsg(e.target.value)}
                  placeholder="Type custom message..."
                  className="flex-1 bg-white border border-[#E5C5C0] rounded-xl px-3 py-2 text-xs text-[#1F1918] placeholder-stone-400 focus:outline-none focus:border-[#D9989F]"
                />
                <button
                  type="submit"
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 py-2 rounded-xl text-xs font-serif font-bold transition flex items-center justify-center shrink-0 shadow-sm"
                >
                  <Send className="w-3.5 h-3.5" />
                </button>
              </form>
            </div>
          </div>

          {/* Footer Callout */}
          <div className="bg-[#F5EBE6] px-4 py-2 text-center text-[10px] text-stone-600 border-t border-[#E5C5C0] flex items-center justify-center gap-1.5">
            <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
            <span>Tap to open direct WhatsApp Chat</span>
          </div>
        </div>
      )}

      {/* Main Floating Trigger Button */}
      <button
        onClick={handleDirectClick}
        className="relative group bg-[#25D366] hover:bg-[#20bd5a] text-white p-3.5 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 flex items-center gap-2 border-2 border-white"
        aria-label="Direct WhatsApp Chat"
      >
        <MessageCircle className="w-6 h-6 fill-white text-[#25D366]" />
        
        {/* Pulsing Ring */}
        <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-white"></span>
        </span>

        {/* Label on Hover / Desktop */}
        <span className="hidden sm:inline-block font-serif text-xs font-extrabold uppercase tracking-wider pr-1">
          WhatsApp
        </span>
      </button>
    </div>
  );
};
