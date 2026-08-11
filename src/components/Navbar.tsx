import React, { useState } from 'react';
import { ShoppingBag, Sparkles, Search, Heart, Clock, Menu, X, MessageCircle, Scissors, Eye, Award } from 'lucide-react';
import { Currency } from '../types';
import { getWhatsAppUrl } from './WhatsAppFloatingButton';

interface NavbarProps {
  currency: Currency;
  setCurrency: (c: Currency) => void;
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenBespokeStudio: () => void;
  onOpenAIStylist: () => void;
  onOpenConsultation: () => void;
  onOpenOrderTracker: () => void;
  onOpenFabricSwatch?: () => void;
  onOpenVipPass?: () => void;
  activeSection: string;
  setActiveSection: (section: string) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currency,
  setCurrency,
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenBespokeStudio,
  onOpenAIStylist,
  onOpenConsultation,
  onOpenOrderTracker,
  onOpenFabricSwatch,
  onOpenVipPass,
  activeSection,
  setActiveSection,
  searchQuery,
  setSearchQuery,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const handleWhatsAppClick = () => {
    const msg = `Hi! I want to inquire about Velora Femme Couture coming soon collection.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  const navItems = [
    { id: 'collections', label: '16 Preview Articles' },
    { id: 'custom-studio', label: 'Bespoke Customizer', badge: 'New' },
    { id: 'fabric-swatch', label: 'Fabric Inspector' },
    { id: 'vip-pass', label: 'VIP Pass' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#FAF5F0]/95 backdrop-blur-md border-b border-[#E5C5C0] transition-all font-sans">
      {/* Announcement Bar */}
      <div className="bg-[#1F1918] text-[#FAF5F0] py-1.5 px-4 text-xs tracking-wider text-center font-serif flex items-center justify-between border-b border-[#362A28]">
        <div className="hidden sm:flex items-center gap-2 text-stone-300">
          <Sparkles className="w-3.5 h-3.5 text-[#D9989F]" />
          <span>VELORA FEMME COUTURE • Exclusive Haute Preview</span>
        </div>

        <div className="mx-auto sm:mx-0 flex items-center gap-4">
          <button 
            onClick={handleWhatsAppClick}
            className="hover:text-emerald-400 transition flex items-center gap-1.5 text-emerald-400 font-sans font-bold"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-emerald-400 text-[#1F1918]" />
            <span>Chat on WhatsApp</span>
          </button>
          <span className="opacity-40">|</span>
          <button 
            onClick={onOpenAIStylist}
            className="hover:text-[#D9989F] transition flex items-center gap-1 font-sans text-amber-200"
          >
            <Sparkles className="w-3 h-3 text-[#D9989F] animate-pulse" />
            <span>AI Stylist</span>
          </button>
        </div>

        <div className="hidden md:flex items-center gap-3">
          <span className="text-[11px] text-stone-400">Currency:</span>
          <div className="flex border border-stone-700 rounded overflow-hidden">
            <button
              onClick={() => setCurrency('PKR')}
              className={`px-2 py-0.5 text-[10px] font-sans transition ${currency === 'PKR' ? 'bg-[#D9989F] text-[#1F1918] font-bold' : 'text-stone-300 hover:text-white'}`}
            >
              PKR (Rs)
            </button>
            <button
              onClick={() => setCurrency('USD')}
              className={`px-2 py-0.5 text-[10px] font-sans transition ${currency === 'USD' ? 'bg-[#D9989F] text-[#1F1918] font-bold' : 'text-stone-300 hover:text-white'}`}
            >
              USD ($)
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="lg:hidden p-2 text-[#1F1918] hover:text-stone-950 focus:outline-none"
          aria-label="Toggle Navigation Menu"
        >
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>

        {/* Brand Logo */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSection('home')}
            className="text-left group"
          >
            <span className="block font-serif text-2xl sm:text-3xl font-extrabold tracking-[0.2em] text-[#1F1918] uppercase group-hover:text-[#C47B85] transition">
              VELORA
            </span>
            <span className="block text-[9px] tracking-[0.35em] text-[#C47B85] font-serif uppercase font-semibold">
              FEMME COUTURE
            </span>
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-8 font-serif text-sm tracking-widest uppercase">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === 'custom-studio') {
                  onOpenBespokeStudio();
                } else if (item.id === 'fabric-swatch' && onOpenFabricSwatch) {
                  onOpenFabricSwatch();
                } else if (item.id === 'vip-pass' && onOpenVipPass) {
                  onOpenVipPass();
                } else {
                  setActiveSection(item.id);
                  const el = document.getElementById(item.id);
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className={`relative py-1 text-[#1F1918] hover:text-[#C47B85] transition font-serif font-bold text-xs tracking-[0.18em] ${
                activeSection === item.id ? 'text-[#C47B85] font-extrabold' : ''
              }`}
            >
              {item.label}
              {item.badge && (
                <span className="absolute -top-3 -right-6 bg-[#C47B85] text-white text-[9px] font-sans px-1.5 py-0.2 rounded-full tracking-normal capitalize font-bold shadow-xs">
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Quick Search Toggle */}
          <div className="relative hidden sm:block">
            {isSearchOpen ? (
              <div className="flex items-center bg-white border border-[#E5C5C0] rounded-full px-3 py-1 shadow-xs animate-in fade-in">
                <Search className="w-3.5 h-3.5 text-stone-400 mr-2" />
                <input
                  type="text"
                  placeholder="Search 16 articles, fabrics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-36 md:w-48 text-xs bg-transparent focus:outline-none text-[#1F1918]"
                  autoFocus
                />
                <button
                  onClick={() => setIsSearchOpen(false)}
                  className="text-stone-400 hover:text-stone-600 ml-1"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#1F1918] hover:text-[#C47B85] transition rounded-full hover:bg-[#EAD1D1]/40"
                title="Search Store"
              >
                <Search className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* WhatsApp Direct Header Button */}
          <button
            onClick={handleWhatsAppClick}
            className="hidden md:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3.5 py-1.5 rounded-full text-xs font-serif font-bold transition shadow-sm"
            title="Chat on WhatsApp"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white" />
            <span>WhatsApp</span>
          </button>

          {/* Bespoke Studio CTA */}
          <button
            onClick={onOpenBespokeStudio}
            className="hidden sm:flex items-center gap-1.5 bg-[#1F1918] text-amber-100 hover:bg-stone-800 px-4 py-2 rounded-full text-xs font-serif tracking-wider uppercase transition shadow-sm"
          >
            <Scissors className="w-3.5 h-3.5 text-[#D9989F]" />
            <span>Bespoke Customizer</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-[#1F1918] hover:text-[#C47B85] transition rounded-full hover:bg-[#EAD1D1]/40"
            title="Wishlist"
          >
            <Heart className="w-5 h-5" />
            {wishlistCount > 0 && (
              <span className="absolute top-1 right-1 bg-[#C47B85] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold font-sans">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer */}
          <button
            onClick={onOpenCart}
            className="relative p-2.5 bg-[#1F1918] text-amber-100 hover:bg-stone-800 transition rounded-full shadow-sm flex items-center justify-center"
            title="Pre-Order Bag"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#D9989F] text-[#1F1918] text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold font-sans shadow-xs">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-[#E5C5C0] bg-[#FAF5F0] px-4 py-6 shadow-xl animate-in slide-in-from-top duration-200">
          <div className="space-y-4 font-serif text-sm uppercase tracking-wider">
            {/* Direct WhatsApp Callout Mobile */}
            <button
              onClick={handleWhatsAppClick}
              className="w-full bg-[#25D366] text-white py-3 rounded-xl text-xs font-serif font-bold uppercase tracking-wider flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Chat on WhatsApp</span>
            </button>

            <button
              onClick={() => {
                setActiveSection('collections');
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-[#1F1918] border-b border-[#E5C5C0]"
            >
              16 Preview Articles
            </button>

            <button
              onClick={() => {
                onOpenBespokeStudio();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-[#C47B85] font-bold border-b border-[#E5C5C0] flex items-center justify-between"
            >
              <span>Bespoke Customizer</span>
              <span className="bg-[#C47B85] text-white text-[10px] px-2 py-0.5 rounded-full font-sans uppercase">
                Custom Outfit
              </span>
            </button>

            {onOpenFabricSwatch && (
              <button
                onClick={() => {
                  onOpenFabricSwatch();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-[#1F1918] border-b border-[#E5C5C0]"
              >
                Fabric Swatch Inspector
              </button>
            )}

            {onOpenVipPass && (
              <button
                onClick={() => {
                  onOpenVipPass();
                  setIsMobileMenuOpen(false);
                }}
                className="block w-full text-left py-2 text-[#1F1918] border-b border-[#E5C5C0]"
              >
                Generate Official VIP Pass
              </button>
            )}

            <button
              onClick={() => {
                onOpenAIStylist();
                setIsMobileMenuOpen(false);
              }}
              className="block w-full text-left py-2 text-[#1F1918] border-b border-[#E5C5C0] flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-[#C47B85]" />
              <span>VELORA AI Stylist Assistant</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

