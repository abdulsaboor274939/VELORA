import React, { useState } from 'react';
import { X, ZoomIn, Sparkles, MessageCircle, Check, Info } from 'lucide-react';
import { CEO_NAME, getWhatsAppUrl } from './WhatsAppFloatingButton';

interface FabricSwatchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FabricSwatchModal: React.FC<FabricSwatchModalProps> = ({
  isOpen,
  onClose,
}) => {
  const fabricTypes = [
    {
      id: 'cotton-silk',
      name: 'Royal Raw Cotton Silk',
      weight: '120 GSM',
      breathability: 'High (Ideal for All Seasons)',
      drape: 'Structured Fluidity',
      image: 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?auto=format&fit=crop&q=80&w=800',
      description: 'Handwoven blend of natural organic cotton fibers and pure Mulberry silk. Offers soft breathable sheen without clinginess.',
      care: 'Dry clean recommended or gentle handwash in cold water.',
    },
    {
      id: 'slub-linen',
      name: 'Textured Slub Linen',
      weight: '140 GSM',
      breathability: 'Very High',
      drape: 'Relaxed Tailored',
      image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&q=80&w=800',
      description: 'Luxe slub textured weave with distinctive tactile yarn depth. Gives timeless cottagecore drape to flared dresses.',
      care: 'Cold gentle wash. Cool iron while damp.',
    },
    {
      id: 'organza',
      name: 'Glass Organza Pret',
      weight: '60 GSM',
      breathability: 'Airy & Sheer',
      drape: 'Crisp Ethereal Flare',
      image: 'https://images.unsplash.com/photo-1528459801416-a9e53bbf4e17?auto=format&fit=crop&q=80&w=800',
      description: 'Ultra-lightweight crisp organza with subtle iridescent luster. Crafted for layered sleeves, dupattas, and gheras.',
      care: 'Strict dry clean only.',
    },
    {
      id: 'jacquard',
      name: 'Embossed Gold Jacquard',
      weight: '180 GSM',
      breathability: 'Medium',
      drape: 'Regal Sculpted Structure',
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      description: 'Intricately woven brocade jacquard featuring raised metallic threadwork. Provides formal stiffness to corset bodices.',
      care: 'Dry clean only.',
    },
  ];

  const [selectedFabric, setSelectedFabric] = useState(fabricTypes[0]);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!isOpen) return null;

  const handleInquireFabric = () => {
    const msg = `Hi CEO ${CEO_NAME}! I want to inquire about custom fabric swatch details for "${selectedFabric.name}" from Velora Atelier.`;
    window.open(getWhatsAppUrl(msg), '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#1F1918]/70 backdrop-blur-md flex items-center justify-center p-4 font-sans animate-in fade-in duration-200">
      <div className="bg-[#FAF5F0] rounded-3xl max-w-3xl w-full border border-[#E5C5C0] shadow-2xl overflow-hidden relative">
        
        {/* Header */}
        <div className="bg-[#1F1918] text-[#FAF5F0] p-6 flex items-center justify-between border-b border-[#362A28]">
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#D9989F]" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white uppercase tracking-wider">
                Velora Fabric Swatch Inspector
              </h3>
              <p className="text-xs text-stone-400">
                Curated by CEO <strong>{CEO_NAME}</strong> • Tactile Material Guide
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-stone-400 hover:text-white p-1.5 rounded-full transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Swatch Selector */}
          <div className="md:col-span-4 space-y-2">
            <span className="text-[10px] font-serif uppercase tracking-widest text-[#C47B85] font-bold block">
              Select Signature Weave:
            </span>
            <div className="space-y-2">
              {fabricTypes.map((fabric) => (
                <button
                  key={fabric.id}
                  onClick={() => {
                    setSelectedFabric(fabric);
                    setIsZoomed(false);
                  }}
                  className={`w-full text-left p-3 rounded-2xl border transition flex items-center gap-3 ${
                    selectedFabric.id === fabric.id
                      ? 'bg-white border-[#D9989F] shadow-md ring-2 ring-[#D9989F]/20'
                      : 'bg-[#F5EBE6] border-[#E5C5C0] hover:bg-white'
                  }`}
                >
                  <img
                    src={fabric.image}
                    alt={fabric.name}
                    className="w-10 h-10 rounded-xl object-cover border border-[#E5C5C0]"
                  />
                  <div>
                    <h5 className="font-serif text-xs font-bold text-[#1F1918]">
                      {fabric.name}
                    </h5>
                    <span className="text-[10px] text-stone-500 font-mono">
                      {fabric.weight}
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Swatch Preview & Zoom */}
          <div className="md:col-span-8 space-y-4">
            <div className="relative group rounded-2xl overflow-hidden border-2 border-[#E5C5C0] bg-stone-900 h-64 shadow-inner">
              <img
                src={selectedFabric.image}
                alt={selectedFabric.name}
                className={`w-full h-full object-cover transition-transform duration-500 ${
                  isZoomed ? 'scale-150 cursor-zoom-out' : 'scale-100 cursor-zoom-in'
                }`}
                onClick={() => setIsZoomed(!isZoomed)}
              />

              <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-[10px] font-mono flex items-center gap-1.5 pointer-events-none">
                <ZoomIn className="w-3.5 h-3.5 text-[#D9989F]" />
                <span>{isZoomed ? 'Zoomed 150%' : 'Click to Inspect Texture'}</span>
              </div>

              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-4 text-white">
                <h4 className="font-serif text-base font-bold text-amber-100">
                  {selectedFabric.name}
                </h4>
                <div className="flex items-center gap-4 text-[11px] text-stone-300 font-sans mt-0.5">
                  <span>Weight: <strong>{selectedFabric.weight}</strong></span>
                  <span>Breathability: <strong>{selectedFabric.breathability}</strong></span>
                </div>
              </div>
            </div>

            {/* Description & Care Details */}
            <div className="bg-white p-4 rounded-2xl border border-[#E5C5C0] space-y-2 text-xs text-[#1F1918]">
              <p className="leading-relaxed text-stone-700">
                {selectedFabric.description}
              </p>
              <div className="pt-2 border-t border-stone-100 flex items-center justify-between text-[11px] text-stone-500">
                <span className="flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-[#C47B85]" />
                  <span>Care: {selectedFabric.care}</span>
                </span>
                <span className="font-serif font-bold text-[#C47B85] uppercase tracking-wider">
                  Verified Premium Quality
                </span>
              </div>
            </div>

            {/* WhatsApp Inquiry Button */}
            <button
              onClick={handleInquireFabric}
              className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white py-3 rounded-2xl text-xs font-serif uppercase tracking-wider font-bold transition flex items-center justify-center gap-2 shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>Inquire Fabric Swatch on WhatsApp</span>
            </button>

          </div>

        </div>

      </div>
    </div>
  );
};
