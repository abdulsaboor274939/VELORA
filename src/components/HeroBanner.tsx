import React from 'react';
import { HERO_IMAGE } from '../data/products';
import { Sparkles, Scissors, MessageCircle, ArrowRight, Wand2, Heart } from 'lucide-react';
import { CEO_NAME, getWhatsAppUrl } from './WhatsAppFloatingButton';

interface HeroBannerProps {
  onOpenBespokeStudio: () => void;
  onOpenAIStylist: () => void;
  onExploreCatalog: () => void;
  onOpenVipPass?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  onOpenBespokeStudio,
  onOpenAIStylist,
  onExploreCatalog,
  onOpenVipPass,
}) => {
  const handleWhatsAppContact = () => {
    const msg = `Hi! I would like to inquire about the upcoming Velora Femme Couture 16 preview articles.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <section className="relative bg-[#FAF5F0] pt-6 pb-16 overflow-hidden font-sans border-b border-[#E5C5C0]">
      {/* Decorative Orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-[#EAD1D1]/30 rounded-full blur-3xl pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-6 space-y-6 text-[#1F1918] z-10">
            <div className="inline-flex items-center gap-2 bg-[#EAD1D1] border border-[#D9989F] text-[#1F1918] px-4 py-1.5 rounded-full text-xs font-serif tracking-widest uppercase font-bold">
              <Sparkles className="w-3.5 h-3.5 text-[#C47B85]" />
              <span>Velora Femme Couture Preview</span>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-sm tracking-[0.35em] text-[#C47B85] uppercase font-bold block">
                NEW BRAND. TIMELESS YOU.
              </span>
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-[#1F1918]">
                COMING <br />
                <span className="font-cursive text-5xl sm:text-7xl text-[#C47B85] font-normal tracking-normal inline-flex items-center gap-2">
                  <span>Soon</span>
                  <Heart className="w-8 h-8 inline text-[#C47B85] fill-[#C47B85]/20" />
                </span>
              </h1>
            </div>

            <p className="text-stone-700 text-base sm:text-lg font-sans leading-relaxed max-w-xl">
              Elegance is on the way! Discover the 16 signature preview articles crafted in royal cotton silk, slub linen, and hand-embroidered organza. Tap below to chat directly with us on WhatsApp!
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-2">
              <button
                onClick={handleWhatsAppContact}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white px-6 py-3.5 rounded-2xl font-serif text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-lg font-bold group"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>Chat on WhatsApp</span>
              </button>

              <button
                onClick={onOpenBespokeStudio}
                className="bg-[#1F1918] text-amber-100 hover:bg-stone-800 px-6 py-3.5 rounded-2xl font-serif text-xs tracking-wider uppercase flex items-center justify-center gap-2 transition shadow-md font-bold"
              >
                <Scissors className="w-4 h-4 text-[#D9989F]" />
                <span>Bespoke Studio</span>
              </button>

              {onOpenVipPass && (
                <button
                  onClick={onOpenVipPass}
                  className="bg-white border border-[#E5C5C0] text-[#1F1918] hover:border-[#D9989F] px-5 py-3.5 rounded-2xl font-serif text-xs tracking-wider uppercase flex items-center justify-center gap-1.5 transition font-bold"
                >
                  <Sparkles className="w-3.5 h-3.5 text-[#C47B85]" />
                  <span>VIP Pass</span>
                </button>
              )}
            </div>

            {/* Value Highlights (The 4 Poster Pillars) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-[#E5C5C0]">
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E5C5C0] text-center">
                <span className="block font-serif text-xs font-bold text-[#1F1918]">PREMIUM</span>
                <span className="block text-[10px] text-stone-500 font-sans uppercase">Quality Fabrics</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E5C5C0] text-center">
                <span className="block font-serif text-xs font-bold text-[#1F1918]">TIMELESS</span>
                <span className="block text-[10px] text-stone-500 font-sans uppercase">Couture Cuts</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E5C5C0] text-center">
                <span className="block font-serif text-xs font-bold text-[#1F1918]">MADE FOR YOU</span>
                <span className="block text-[10px] text-stone-500 font-sans uppercase">Custom Fit</span>
              </div>
              <div className="bg-white/80 p-2.5 rounded-xl border border-[#E5C5C0] text-center">
                <span className="block font-serif text-xs font-bold text-[#1F1918]">DETAILS</span>
                <span className="block text-[10px] text-stone-500 font-sans uppercase">That Define Us</span>
              </div>
            </div>
          </div>

          {/* Right Image Banner */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-stone-200">
              <img
                src={HERO_IMAGE}
                alt="VELORA Bespoke Luxury Couture Model"
                className="w-full h-[480px] sm:h-[540px] object-cover object-top hover:scale-105 transition duration-700"
                onError={(e) => {
                  const target = e.currentTarget;
                  if (!target.dataset.retried) {
                    target.dataset.retried = 'true';
                    target.src = HERO_IMAGE.startsWith('/') ? HERO_IMAGE.slice(1) : '/' + HERO_IMAGE;
                  }
                }}
              />
              {/* Overlay Badge */}
              <div className="absolute bottom-6 left-6 right-6 bg-[#1F1918]/90 backdrop-blur-md p-4 rounded-2xl border border-[#362A28] shadow-2xl flex items-center justify-between text-white">
                <div>
                  <span className="block font-serif text-xs text-[#D9989F] font-bold uppercase tracking-wider">
                    VELORA FEMME COUTURE
                  </span>
                  <span className="block text-xs font-sans font-medium text-stone-300">
                    CEO {CEO_NAME} • Official Preview
                  </span>
                </div>
                <button
                  onClick={onExploreCatalog}
                  className="bg-[#D9989F] text-[#1F1918] text-xs font-serif font-bold px-3.5 py-2 rounded-xl hover:bg-white transition whitespace-nowrap uppercase tracking-wider"
                >
                  Explore 16 Articles
                </button>
              </div>
            </div>

            {/* Floating Decorative Badge */}
            <div className="hidden sm:flex absolute -top-4 -right-4 bg-[#1F1918] text-amber-100 p-4 rounded-2xl shadow-2xl border border-[#D9989F] flex-col items-center justify-center text-center max-w-[150px] animate-pulse">
              <Heart className="w-5 h-5 text-[#D9989F] fill-[#D9989F] mb-1" />
              <span className="font-serif text-[11px] uppercase tracking-wider font-bold text-white">Elegance On The Way</span>
              <span className="text-[9px] text-stone-400 font-sans">Stay Tuned. ♡</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

