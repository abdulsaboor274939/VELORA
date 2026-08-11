import React from 'react';
import { Sparkles, Scissors, Award, Gem, ShieldCheck, HeartHandshake } from 'lucide-react';

export const CraftsmanshipShowcase: React.FC = () => {
  const craftFeatures = [
    {
      icon: <Gem className="w-6 h-6 text-amber-800" />,
      title: 'Zardozi & Metallic Dabka',
      desc: 'Hand-sewn by heritage artisans using real gold & silver zari wires, Swarovski crystals, and cut-dana beads.',
    },
    {
      icon: <Scissors className="w-6 h-6 text-amber-800" />,
      title: 'Bespoke Master Cutters',
      desc: 'Every custom dress pattern is drafted manually to ensure body contouring and structured flare.',
    },
    {
      icon: <Award className="w-6 h-6 text-amber-800" />,
      title: '100% Pure Silk & Organza',
      desc: 'Sourced directly from certified handloom weavers in raw silk, micro-velvet 9000, and glass organza.',
    },
    {
      icon: <HeartHandshake className="w-6 h-6 text-amber-800" />,
      title: 'Dedicated Client Care',
      desc: 'Progress updates with photos during cutting, embroidery, and trial stages before dispatch.',
    },
  ];

  return (
    <section id="craftsmanship" className="py-20 bg-[#FAF8F5] border-t border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-amber-900 text-xs font-serif uppercase tracking-widest bg-amber-900/10 px-3.5 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Artisan Heritage</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C241E]">
            The Art of VELORA Haute Couture
          </h2>
          <p className="text-stone-600 text-sm font-sans">
            Every stitch tells a story of passion, tradition, and timeless elegance. We bridge centuries of Pakistani and South Asian craftsmanship with modern luxury.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {craftFeatures.map((item, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl border border-stone-200/80 shadow-xs hover:shadow-md transition space-y-3"
            >
              <div className="p-3 bg-amber-900/10 rounded-xl w-fit">{item.icon}</div>
              <h3 className="font-serif text-base font-bold text-stone-900">{item.title}</h3>
              <p className="text-xs text-stone-600 font-sans leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Story Banner */}
        <div className="bg-[#2C241E] text-amber-50 rounded-3xl p-8 sm:p-12 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border border-amber-900/30">
          <div className="lg:col-span-8 space-y-4">
            <span className="text-amber-300 font-serif text-xs uppercase tracking-widest block font-bold">
              Custom Bridal & Couture Guarantee
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white">
              Have a custom outfit photo or sketch? We recreate it flawlessly.
            </h3>
            <p className="text-amber-100/80 text-xs sm:text-sm font-sans leading-relaxed">
              Send us your inspiration image, select your fabric preference, and our master fashion designers will prepare a 3D sketch and quote within 24 hours.
            </p>
          </div>
          <div className="lg:col-span-4 flex justify-start lg:justify-end">
            <a
              href="https://wa.me/923000000000?text=Hello%20VELORA%20Atelier!%20I%20want%20to%20discuss%20a%20custom%20outfit%20design."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-amber-300 text-stone-950 hover:bg-amber-400 font-serif text-xs uppercase tracking-widest px-6 py-4 rounded-full font-bold shadow-lg transition"
            >
              WhatsApp Atelier Designer
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
