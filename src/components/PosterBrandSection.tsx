import React from 'react';
import { Shirt, Leaf, Scissors, Sparkles, MessageCircle, Heart, Award, ArrowUpRight } from 'lucide-react';
import { CEO_NAME, getWhatsAppUrl } from './WhatsAppFloatingButton';

interface PosterBrandSectionProps {
  onOpenPreOrderRegister?: () => void;
}

export const PosterBrandSection: React.FC<PosterBrandSectionProps> = ({
  onOpenPreOrderRegister,
}) => {
  const handleWhatsAppContact = () => {
    const message = `Hello CEO ${CEO_NAME}! I visited Velora Femme Couture online poster showcase and would like to learn more about the upcoming launch.`;
    window.open(getWhatsAppUrl(message), '_blank');
  };

  return (
    <section className="relative py-16 bg-[#FAF5F0] overflow-hidden font-sans border-y border-[#E5C5C0]">
      {/* Background Decorative Soft Rose Orbs */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#EAD1D1]/40 rounded-full blur-3xl -z-0 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#DFB8B8]/30 rounded-full blur-3xl -z-0 pointer-events-none transform -translate-x-1/3 translate-y-1/3"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Replicated Poster Card Design */}
          <div className="lg:col-span-6 bg-[#FAF5F0] border-2 border-[#E3CBC6] rounded-3xl p-8 sm:p-12 shadow-xl relative text-center space-y-6">
            
            {/* Top Floating Badge like the Poster Circular Badge */}
            <div className="absolute -top-6 right-6 bg-[#EAD1D1]/90 backdrop-blur-md border border-[#D9989F] px-4 py-2 rounded-full shadow-lg text-xs font-serif text-[#1F1918] flex items-center gap-1.5 animate-pulse-slow">
              <span className="font-bold tracking-wider">VELORA BEAUTIFUL IS COMING</span>
              <Heart className="w-3.5 h-3.5 text-[#C47B85] fill-[#C47B85]" />
            </div>

            {/* Brand Title */}
            <div className="space-y-1 pt-2">
              <h2 className="font-serif text-4xl sm:text-5xl font-extrabold tracking-[0.2em] text-[#1F1918] uppercase">
                Velora
              </h2>
              <p className="font-serif text-xs sm:text-sm tracking-[0.35em] text-[#C47B85] uppercase font-bold">
                FEMME COUTURE
              </p>
              <div className="flex items-center justify-center gap-2 pt-1 text-[#C47B85]">
                <span className="h-px w-8 bg-[#D9989F]"></span>
                <Heart className="w-2.5 h-2.5 fill-[#C47B85]" />
                <span className="h-px w-8 bg-[#D9989F]"></span>
              </div>
            </div>

            {/* Sub-slogan */}
            <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.25em] font-semibold text-stone-600">
              NEW BRAND. TIMELESS YOU.
            </p>

            {/* Huge Coming Soon Header with Cursive Overlay */}
            <div className="relative py-4 my-2">
              <h3 className="font-serif text-4xl sm:text-6xl font-extrabold tracking-widest text-[#1F1918]">
                COMING
              </h3>
              <div className="font-cursive text-5xl sm:text-7xl text-[#C47B85] -mt-6 sm:-mt-8 transform -rotate-6 font-normal drop-shadow-xs flex items-center justify-center gap-2">
                <span>Soon</span>
                <Heart className="w-7 h-7 inline-block text-[#C47B85] stroke-1" />
              </div>
            </div>

            <p className="font-serif text-xs sm:text-sm uppercase tracking-[0.3em] font-bold text-stone-700 border-y border-[#E5C5C0] py-2">
              ♥ ELEGANCE IS ON THE WAY ♥
            </p>

            {/* The 4 Value Pillars from Poster */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center border-b border-[#E5C5C0] pb-6">
              <div className="space-y-2 p-2 rounded-xl bg-white/60 border border-[#E5C5C0]">
                <Shirt className="w-5 h-5 mx-auto text-[#C47B85]" />
                <span className="block font-serif text-[11px] font-bold uppercase tracking-wider text-[#1F1918]">
                  PREMIUM QUALITY
                </span>
              </div>

              <div className="space-y-2 p-2 rounded-xl bg-white/60 border border-[#E5C5C0]">
                <Leaf className="w-5 h-5 mx-auto text-[#C47B85]" />
                <span className="block font-serif text-[11px] font-bold uppercase tracking-wider text-[#1F1918]">
                  TIMELESS DESIGNS
                </span>
              </div>

              <div className="space-y-2 p-2 rounded-xl bg-white/60 border border-[#E5C5C0]">
                <Scissors className="w-5 h-5 mx-auto text-[#C47B85]" />
                <span className="block font-serif text-[11px] font-bold uppercase tracking-wider text-[#1F1918]">
                  MADE FOR YOU
                </span>
              </div>

              <div className="space-y-2 p-2 rounded-xl bg-white/60 border border-[#E5C5C0]">
                <Sparkles className="w-5 h-5 mx-auto text-[#C47B85]" />
                <span className="block font-serif text-[11px] font-bold uppercase tracking-wider text-[#1F1918]">
                  DETAILS THAT DEFINE US
                </span>
              </div>
            </div>

            {/* Brush Stroke Banner */}
            <div className="bg-[#EAD1D1]/70 py-2 px-6 rounded-2xl border border-[#D9989F]/50 inline-block">
              <span className="font-cursive text-3xl text-[#1F1918] block">
                Stay Tuned. ♡
              </span>
            </div>

            {/* Social & CEO Footer */}
            <div className="text-xs text-stone-600 space-y-1">
              <p className="font-serif uppercase tracking-widest text-[10px] text-stone-500 font-bold">
                FOLLOW US & BE THE FIRST TO KNOW
              </p>
              <p className="font-serif font-bold text-sm text-[#1F1918]">
                @veloracouture
              </p>
            </div>
          </div>

          {/* Right Column: CEO Spotlight & Direct WhatsApp Executive Channel */}
          <div className="lg:col-span-6 space-y-8">
            {/* CEO Badge */}
            <div className="inline-flex items-center gap-2 bg-[#EAD1D1]/60 border border-[#D9989F] px-4 py-1.5 rounded-full text-xs font-serif font-bold text-[#1F1918] tracking-wider uppercase">
              <Award className="w-4 h-4 text-[#C47B85]" />
              <span>OFFICIAL BRAND STATEMENT</span>
            </div>

            <div className="space-y-3">
              <h3 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#1F1918] leading-tight">
                Leadership & Vision Behind <br />
                <span className="font-cursive text-4xl sm:text-5xl text-[#C47B85] font-normal">
                  Velora Femme Couture
                </span>
              </h3>
              <p className="text-stone-700 text-sm sm:text-base leading-relaxed">
                "At Velora, we believe true luxury lies in the harmony of royal craftsmanship, breathable comfort, and bespoke individuality. Each of our 16 upcoming debut articles has been meticulously sculpted to celebrate feminine grace and timeless elegance."
              </p>
            </div>

            {/* CEO Signature Card */}
            <div className="bg-white p-6 rounded-2xl border border-[#E5C5C0] shadow-md flex items-center justify-between gap-4">
              <div className="space-y-1">
                <span className="text-[10px] font-serif uppercase tracking-widest text-[#C47B85] font-bold block">
                  FOUNDER & CHIEF EXECUTIVE OFFICER
                </span>
                <h4 className="font-serif text-xl font-extrabold text-[#1F1918] tracking-wide">
                  {CEO_NAME}
                </h4>
                <p className="text-xs text-stone-500">
                  Velora Femme Couture • Haute Couture & Atelier
                </p>
              </div>

              {/* Handcrafted Cursive Signature */}
              <div className="text-right border-l border-[#E5C5C0] pl-4">
                <span className="font-cursive text-3xl text-[#C47B85] block">
                  Eman Mustufa
                </span>
                <span className="text-[9px] font-mono text-stone-400 uppercase tracking-widest">
                  Signed & Verified
                </span>
              </div>
            </div>

            {/* Direct WhatsApp Callout Button */}
            <div className="bg-[#1F1918] text-[#FAF5F0] p-6 rounded-2xl border border-[#362A28] shadow-xl space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <span className="text-[10px] font-serif uppercase tracking-widest text-[#D9989F] font-bold block">
                    EXECUTIVE DIRECT LINE
                  </span>
                  <h4 className="font-serif text-lg font-bold text-white flex items-center gap-2 mt-0.5">
                    <span>Direct WhatsApp Concierge</span>
                  </h4>
                </div>
                <span className="bg-[#25D366]/20 text-[#25D366] px-2.5 py-1 rounded-full text-[10px] font-serif uppercase font-bold border border-[#25D366]/30">
                  Instant Connect
                </span>
              </div>

              <p className="text-xs text-stone-300 leading-relaxed">
                Have questions regarding custom measurements, launch day priority reservation, or trade inquiries? Tap below to open instant WhatsApp chat with our executive office directly.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleWhatsAppContact}
                  className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 px-5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow-md group"
                >
                  <MessageCircle className="w-4 h-4 fill-white" />
                  <span>Chat on WhatsApp</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition" />
                </button>

                {onOpenPreOrderRegister && (
                  <button
                    onClick={onOpenPreOrderRegister}
                    className="bg-stone-800 hover:bg-stone-700 text-amber-100 py-3 px-5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold transition flex items-center justify-center gap-1.5 border border-stone-700"
                  >
                    <span>Register Pre-Order</span>
                  </button>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
