import React, { useState } from 'react';
import { X, Award, Sparkles, MessageCircle, Copy, Check, Download, Heart } from 'lucide-react';
import { CEO_NAME, getWhatsAppUrl } from './WhatsAppFloatingButton';

interface VipPassModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VipPassModal: React.FC<VipPassModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [userName, setUserName] = useState('');
  const [phone, setPhone] = useState('');
  const [isGenerated, setIsGenerated] = useState(false);
  const [passCode, setPassCode] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName || !phone) return;

    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const code = `VELORA-VIP-${randomNum}`;
    setPassCode(code);
    setIsGenerated(true);
  };

  const handleWhatsAppShare = () => {
    const msg = `Hi CEO ${CEO_NAME}! I generated my Official VIP Launch Pass [Code: ${passCode}] under name "${userName}" (Phone: ${phone}). Please confirm my priority reservation for the upcoming Velora collection!`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(passCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F1918]/80 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-[#FAF5F0] rounded-3xl max-w-lg w-full border border-[#E5C5C0] shadow-2xl overflow-hidden relative">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-stone-700 p-2 rounded-full transition shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {!isGenerated ? (
          <div className="p-8 space-y-6 text-center">
            <div className="inline-flex items-center gap-2 bg-[#EAD1D1] text-[#1F1918] px-3.5 py-1 rounded-full text-xs font-serif font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#C47B85]" />
              <span>Official Executive VIP Privilege</span>
            </div>

            <div className="space-y-2">
              <h3 className="font-serif text-3xl font-extrabold text-[#1F1918]">
                Get Your VIP Launch Access Pass
              </h3>
              <p className="text-xs text-stone-600 leading-relaxed max-w-sm mx-auto">
                Issued personally by Founder & CEO <strong>{CEO_NAME}</strong>. Unlock 15-minute priority early booking window before the public collection launch!
              </p>
            </div>

            <form onSubmit={handleGenerate} className="space-y-4 text-left">
              <div>
                <label className="text-xs font-serif font-bold text-stone-700 block mb-1">
                  Full Name:
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Fatima Ali"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="w-full bg-white border border-[#E5C5C0] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1918] focus:outline-none focus:border-[#D9989F]"
                />
              </div>

              <div>
                <label className="text-xs font-serif font-bold text-stone-700 block mb-1">
                  WhatsApp Phone Number:
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +92 300 1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-white border border-[#E5C5C0] rounded-xl px-3.5 py-2.5 text-xs text-[#1F1918] focus:outline-none focus:border-[#D9989F]"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#1F1918] hover:bg-stone-800 text-amber-100 py-3.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition shadow-lg flex items-center justify-center gap-2"
              >
                <Award className="w-4 h-4 text-[#D9989F]" />
                <span>Generate Official VIP Pass</span>
              </button>
            </form>
          </div>
        ) : (
          <div className="p-8 space-y-6 text-center">
            {/* VIP Pass Card Graphic */}
            <div className="bg-[#1F1918] text-[#FAF5F0] rounded-2xl p-6 border-2 border-[#D9989F] shadow-2xl relative overflow-hidden space-y-4">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#D9989F]/20 rounded-full blur-2xl pointer-events-none"></div>

              <div className="flex items-center justify-between border-b border-[#362A28] pb-3">
                <div className="text-left">
                  <span className="font-serif text-lg font-extrabold tracking-widest text-white uppercase block">
                    VELORA
                  </span>
                  <span className="text-[9px] tracking-widest text-[#D9989F] uppercase block font-serif">
                    FEMME COUTURE
                  </span>
                </div>
                <div className="bg-[#D9989F] text-[#1F1918] px-2.5 py-1 rounded text-[10px] font-mono font-bold uppercase tracking-wider">
                  VIP PASS
                </div>
              </div>

              <div className="py-2 text-left space-y-1">
                <span className="text-[10px] text-stone-400 font-serif uppercase tracking-widest block">
                  PASS HOLDER:
                </span>
                <h4 className="font-serif text-xl font-bold text-amber-100">
                  {userName}
                </h4>
                <p className="text-[11px] text-stone-400 font-mono">
                  Registered: {phone}
                </p>
              </div>

              <div className="bg-[#2A2220] p-3 rounded-xl border border-[#362A28] flex items-center justify-between">
                <div className="text-left">
                  <span className="text-[9px] font-mono text-stone-400 uppercase block">VIP REGISTRATION CODE:</span>
                  <span className="font-mono text-sm font-extrabold text-[#D9989F] tracking-widest">
                    {passCode}
                  </span>
                </div>
                <button
                  onClick={handleCopyCode}
                  className="text-xs bg-stone-800 hover:bg-stone-700 text-stone-300 px-2.5 py-1.5 rounded-lg transition flex items-center gap-1"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>

              <div className="pt-2 border-t border-[#362A28] flex items-center justify-between text-[10px] text-stone-400">
                <span className="font-serif italic">Verified by CEO {CEO_NAME}</span>
                <span className="font-cursive text-xl text-[#D9989F]">Eman Mustufa</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-2">
              <button
                onClick={handleWhatsAppShare}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow-lg"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Confirm Pass on WhatsApp</span>
              </button>

              <button
                onClick={() => setIsGenerated(false)}
                className="text-xs text-stone-500 hover:text-stone-800 font-serif underline transition block mx-auto"
              >
                Generate Another VIP Pass
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
