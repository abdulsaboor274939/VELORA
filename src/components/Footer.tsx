import React, { useState } from 'react';
import { Sparkles, Phone, Mail, MapPin, Send, Scissors, Award, MessageCircle, Heart } from 'lucide-react';
import { CEO_NAME, getWhatsAppUrl } from './WhatsAppFloatingButton';

interface FooterProps {
  onOpenBespokeStudio: () => void;
  onOpenAIStylist: () => void;
  onOpenConsultation: () => void;
  onOpenOrderTracker: () => void;
  onOpenFabricSwatch?: () => void;
  onOpenVipPass?: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenBespokeStudio,
  onOpenAIStylist,
  onOpenConsultation,
  onOpenOrderTracker,
  onOpenFabricSwatch,
  onOpenVipPass,
}) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setSubscribed(true);

    const msg = `Hi CEO ${CEO_NAME}! I subscribed to Velora launch newsletter with email: ${newsletterEmail}`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const handleWhatsAppContact = () => {
    const msg = `Hi CEO ${CEO_NAME}! I want to get in touch with Velora Femme Couture executive office.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <footer className="bg-[#1F1918] text-[#FAF5F0] pt-16 pb-12 border-t border-[#362A28] font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 pb-12 border-b border-[#362A28]">
          
          {/* Col 1: Brand Info & CEO Name */}
          <div className="lg:col-span-2 space-y-4">
            <div className="space-y-1">
              <span className="font-serif text-3xl font-extrabold tracking-[0.2em] text-white uppercase block">
                VELORA
              </span>
              <span className="text-[10px] tracking-[0.35em] text-[#D9989F] uppercase block font-serif font-bold">
                FEMME COUTURE
              </span>
              <p className="text-xs text-stone-300 font-serif font-medium pt-1">
                Founder & CEO: <strong className="text-white underline">{CEO_NAME}</strong>
              </p>
            </div>

            <p className="text-xs text-stone-400 leading-relaxed max-w-sm">
              An exclusive haute couture fashion brand presenting 16 signature preview articles. Premium quality, timeless designs, made for you.
            </p>

            {/* Direct WhatsApp Callout */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <button
                onClick={handleWhatsAppContact}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-serif font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition flex items-center gap-2 shadow-md"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={onOpenBespokeStudio}
                className="bg-stone-800 hover:bg-stone-700 text-amber-100 text-xs font-serif font-bold uppercase tracking-wider px-4 py-2.5 rounded-xl transition flex items-center gap-1.5 border border-stone-700"
              >
                <Scissors className="w-3.5 h-3.5 text-[#D9989F]" />
                <span>Bespoke Customizer</span>
              </button>
            </div>
          </div>

          {/* Col 2: Quick Features & Tools */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D9989F]">
              Atelier Features
            </h4>
            <ul className="space-y-2 text-xs text-stone-400 font-serif">
              <li>
                <button onClick={onOpenBespokeStudio} className="hover:text-[#D9989F] transition">
                  Bespoke Outfit Customizer
                </button>
              </li>
              {onOpenFabricSwatch && (
                <li>
                  <button onClick={onOpenFabricSwatch} className="hover:text-[#D9989F] transition">
                    Fabric Swatch Inspector
                  </button>
                </li>
              )}
              {onOpenVipPass && (
                <li>
                  <button onClick={onOpenVipPass} className="hover:text-[#D9989F] transition">
                    VIP Early Access Pass
                  </button>
                </li>
              )}
              <li>
                <button onClick={onOpenAIStylist} className="hover:text-[#D9989F] transition">
                  AI Fashion Consultant
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Executive Contact */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D9989F]">
              Executive Contact
            </h4>
            <ul className="space-y-2 text-xs text-stone-400">
              <li className="flex items-center gap-2 cursor-pointer" onClick={handleWhatsAppContact}>
                <MessageCircle className="w-3.5 h-3.5 text-[#25D366] shrink-0 fill-[#25D366]" />
                <span className="text-emerald-400 font-bold hover:underline">WhatsApp Direct Chat</span>
              </li>
              <li className="flex items-start gap-2">
                <Award className="w-3.5 h-3.5 text-[#D9989F] shrink-0 mt-0.5" />
                <span>CEO Office: {CEO_NAME}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-3.5 h-3.5 text-[#D9989F] shrink-0 mt-0.5" />
                <span>Gulberg III, Lahore & DHA, Karachi</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Stay Tuned Newsletter */}
          <div className="space-y-3">
            <h4 className="font-serif text-xs font-bold uppercase tracking-widest text-[#D9989F]">
              Stay Tuned. ♡
            </h4>
            <p className="text-xs text-stone-400">
              Subscribe to get launch updates directly on WhatsApp & Email.
            </p>

            {subscribed ? (
              <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-xs text-emerald-300 font-serif">
                ✨ VIP Subscription confirmed with CEO office!
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <input
                  type="email"
                  required
                  placeholder="Enter email address..."
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="w-full bg-[#2A2220] border border-[#362A28] rounded-xl p-2.5 text-xs text-white placeholder-stone-500 focus:outline-none focus:border-[#D9989F]"
                />
                <button
                  type="submit"
                  className="w-full bg-[#D9989F] text-[#1F1918] hover:bg-white py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>

        </div>

        {/* Bottom Bar with CEO Credit */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-stone-500 space-y-2 sm:space-y-0">
          <p>© {new Date().getFullYear()} VELORA FEMME COUTURE. CEO: <strong>{CEO_NAME}</strong>. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span onClick={handleWhatsAppContact} className="hover:text-emerald-400 cursor-pointer">WhatsApp Chat</span>
            <span>•</span>
            <span className="hover:text-[#D9989F] cursor-pointer">@veloracouture</span>
            <span>•</span>
            <span className="hover:text-[#D9989F] cursor-pointer">Global Express Shipping</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

