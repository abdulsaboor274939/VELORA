import React, { useState, useEffect } from 'react';
import { 
  CustomOutfitConfig, 
  SilhouetteType, 
  FabricType, 
  NecklineType, 
  SleeveStyle, 
  EmbroideryStyle, 
  DupattaOption, 
  BottomStyle, 
  Currency 
} from '../types';
import { COLOR_PALETTES, FABRIC_OPTIONS } from '../data/products';
import { Scissors, Sparkles, CheckCircle2, RotateCcw, ShoppingBag, Ruler, FileText, DollarSign, Calendar, Upload } from 'lucide-react';

interface BespokeStudioProps {
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (customConfig: CustomOutfitConfig) => void;
  initialPreset?: Partial<CustomOutfitConfig>;
}

export const BespokeStudio: React.FC<BespokeStudioProps> = ({
  currency,
  isOpen,
  onClose,
  onAddToCart,
  initialPreset,
}) => {
  const [step, setStep] = useState<number>(1);

  // Config State
  const [silhouette, setSilhouette] = useState<SilhouetteType>(initialPreset?.silhouette || 'maxi_gown');
  const [fabric, setFabric] = useState<FabricType>(initialPreset?.fabric || 'raw_silk');
  const [selectedColor, setSelectedColor] = useState<{ name: string; hex: string }>(
    initialPreset?.colorName ? { name: initialPreset.colorName, hex: initialPreset.colorHex || '#8B0000' } : COLOR_PALETTES[0]
  );
  const [neckline, setNeckline] = useState<NecklineType>(initialPreset?.neckline || 'v_neck_embellished');
  const [sleeveStyle, setSleeveStyle] = useState<SleeveStyle>(initialPreset?.sleeveStyle || 'full_fitted');
  const [embroideryStyle, setEmbroideryStyle] = useState<EmbroideryStyle>(initialPreset?.embroideryStyle || 'heavy_zardozi');
  const [dupattaOption, setDupattaOption] = useState<DupattaOption>(initialPreset?.dupattaOption || 'matching_heavy');
  const [bottomStyle, setBottomStyle] = useState<BottomStyle>(initialPreset?.bottomStyle || 'flared_lehenga');
  
  // Sizing
  const [sizeType, setSizeType] = useState<'standard' | 'custom_measurements'>('standard');
  const [standardSize, setStandardSize] = useState<string>('M');
  const [measurements, setMeasurements] = useState({
    chest: 36,
    waist: 29,
    hips: 39,
    shoulder: 14.5,
    dressLength: 54,
    armLength: 22,
    unit: 'inches' as const,
  });

  const [specialNotes, setSpecialNotes] = useState<string>('');
  const [eventDate, setEventDate] = useState<string>('');
  const [isSaved, setIsSaved] = useState<boolean>(false);

  // Synchronize initialPreset when provided
  useEffect(() => {
    if (initialPreset) {
      if (initialPreset.silhouette) setSilhouette(initialPreset.silhouette);
      if (initialPreset.fabric) setFabric(initialPreset.fabric);
      if (initialPreset.colorName && initialPreset.colorHex) {
        setSelectedColor({ name: initialPreset.colorName, hex: initialPreset.colorHex });
      }
      if (initialPreset.neckline) setNeckline(initialPreset.neckline);
      if (initialPreset.sleeveStyle) setSleeveStyle(initialPreset.sleeveStyle);
      if (initialPreset.embroideryStyle) setEmbroideryStyle(initialPreset.embroideryStyle);
    }
  }, [initialPreset]);

  // Price Calculation Engine
  const calculatePrice = () => {
    let base = 85000;
    if (silhouette === 'bridal_lehenga') base = 220000;
    if (silhouette === 'maxi_gown') base = 125000;
    if (silhouette === 'anarkali') base = 98000;
    if (silhouette === 'draped_saree') base = 110000;
    if (silhouette === 'fusion_set') base = 90000;

    const fabObj = FABRIC_OPTIONS.find((f) => f.id === fabric);
    const fabMult = fabObj ? fabObj.priceMultiplier : 1.15;

    let embMult = 1.0;
    if (embroideryStyle === 'heavy_zardozi') embMult = 1.4;
    if (embroideryStyle === 'crystal_sequins') embMult = 1.25;
    if (embroideryStyle === 'subtle_gotapatti') embMult = 1.15;

    let dupExtra = dupattaOption === 'matching_heavy' ? 18000 : dupattaOption === 'scalloped_border' ? 12000 : 0;

    const totalPKR = Math.round(base * fabMult * embMult + dupExtra);
    const totalUSD = Math.round(totalPKR / 280);

    return { totalPKR, totalUSD };
  };

  const { totalPKR, totalUSD } = calculatePrice();

  const handleAddToCart = () => {
    const config: CustomOutfitConfig = {
      silhouette,
      fabric,
      colorName: selectedColor.name,
      colorHex: selectedColor.hex,
      neckline,
      sleeveStyle,
      embroideryStyle,
      dupattaOption,
      bottomStyle,
      sizeType,
      standardSize,
      measurements,
      specialNotes,
      eventDate,
      estimatedPricePKR: totalPKR,
      estimatedPriceUSD: totalUSD,
      designCode: 'VEL-CUSTOM-' + Math.floor(100000 + Math.random() * 900000),
    };

    onAddToCart(config);
    setIsSaved(true);
    setTimeout(() => {
      setIsSaved(false);
      onClose();
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4">
      <div className="bg-[#FAF8F5] border border-[#E8E1D7] rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
        {/* Studio Header */}
        <div className="bg-[#2C241E] text-amber-100 p-4 sm:p-6 flex items-center justify-between border-b border-amber-900/30">
          <div>
            <div className="flex items-center gap-2 text-amber-300 text-xs font-serif uppercase tracking-widest mb-1">
              <Scissors className="w-4 h-4 text-amber-300" />
              <span>VELORA Atelier Studio</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-white tracking-tight">
              Bespoke Dress Customizer
            </h2>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          >
            ✕
          </button>
        </div>

        {/* Studio Progress Bar */}
        <div className="bg-[#EFEADF] px-4 py-3 border-b border-stone-300 flex items-center justify-between text-xs font-serif overflow-x-auto">
          {[
            { id: 1, name: '1. Silhouette & Fabric' },
            { id: 2, name: '2. Color & Neckline' },
            { id: 3, name: '3. Embroidery & Dupatta' },
            { id: 4, name: '4. Sizing & Measurements' },
            { id: 5, name: '5. Review & Quote' },
          ].map((s) => (
            <button
              key={s.id}
              onClick={() => setStep(s.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-medium transition whitespace-nowrap ${
                step === s.id
                  ? 'bg-amber-900 text-amber-50 font-bold shadow-xs'
                  : step > s.id
                  ? 'text-stone-800 hover:bg-stone-200'
                  : 'text-stone-500 hover:text-stone-800'
              }`}
            >
              {step > s.id && <CheckCircle2 className="w-3.5 h-3.5 text-amber-800" />}
              <span>{s.name}</span>
            </button>
          ))}
        </div>

        {/* Studio Main Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 flex-1 overflow-y-auto">
          {/* Left Visual Interactive Canvas (4 cols) */}
          <div className="lg:col-span-5 bg-[#F2EDE4] p-6 border-r border-stone-300 flex flex-col items-center justify-between">
            <div className="w-full text-center space-y-1 mb-3">
              <span className="text-[11px] font-serif uppercase tracking-widest text-amber-900 font-bold">
                Live Outfit Preview
              </span>
              <p className="text-xs text-stone-600 font-sans">
                {silhouette.replace('_', ' ').toUpperCase()} • {selectedColor.name}
              </p>
            </div>

            {/* Interactive Visual SVG Outfit Canvas */}
            <div className="relative w-full max-w-[260px] h-[340px] bg-white rounded-xl shadow-md border border-stone-200 p-4 flex items-center justify-center overflow-hidden">
              <svg viewBox="0 0 200 320" className="w-full h-full drop-shadow-md transition-all duration-500">
                <defs>
                  <linearGradient id="fabricGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor={selectedColor.hex} stopOpacity="0.9" />
                    <stop offset="100%" stopColor={selectedColor.hex} stopOpacity="1" />
                  </linearGradient>
                  <pattern id="embroideryPattern" width="20" height="20" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="1.5" fill="#D4AF37" />
                    <path d="M 10 5 L 12 10 L 10 15 L 8 10 Z" fill="#E6C280" opacity="0.6" />
                  </pattern>
                </defs>

                {/* Dress Silhouette Base */}
                {/* Bodice */}
                <path
                  d="M 65 50 L 135 50 L 145 120 L 55 120 Z"
                  fill="url(#fabricGradient)"
                  stroke="#1C1917"
                  strokeWidth="1.5"
                />

                {/* Neckline Overlay */}
                {neckline === 'sweetheart' && (
                  <path d="M 65 50 Q 80 70 100 60 Q 120 70 135 50" fill="none" stroke="#D4AF37" strokeWidth="2.5" />
                )}
                {neckline === 'v_neck_embellished' && (
                  <path d="M 70 50 L 100 90 L 130 50" fill="none" stroke="#D4AF37" strokeWidth="3" />
                )}
                {neckline === 'high_neck_mandarin' && (
                  <rect x="80" y="42" width="40" height="10" rx="3" fill={selectedColor.hex} stroke="#D4AF37" strokeWidth="2" />
                )}

                {/* Sleeves Overlay */}
                {sleeveStyle === 'full_fitted' && (
                  <>
                    <path d="M 65 50 L 40 140 L 52 142 L 70 90" fill="url(#fabricGradient)" stroke="#1C1917" strokeWidth="1" />
                    <path d="M 135 50 L 160 140 L 148 142 L 130 90" fill="url(#fabricGradient)" stroke="#1C1917" strokeWidth="1" />
                  </>
                )}
                {sleeveStyle === 'bell_organza' && (
                  <>
                    <path d="M 65 50 L 25 145 L 50 150 L 70 90" fill="url(#fabricGradient)" opacity="0.75" stroke="#D4AF37" strokeWidth="1" />
                    <path d="M 135 50 L 175 145 L 150 150 L 130 90" fill="url(#fabricGradient)" opacity="0.75" stroke="#D4AF37" strokeWidth="1" />
                  </>
                )}

                {/* Skirt / Bottom Silhouette */}
                {silhouette === 'bridal_lehenga' && (
                  <path d="M 55 120 Q 100 130 145 120 L 180 290 Q 100 310 20 290 Z" fill="url(#fabricGradient)" stroke="#1C1917" strokeWidth="1.5" />
                )}
                {silhouette === 'maxi_gown' && (
                  <path d="M 55 120 Q 100 125 145 120 L 170 300 Q 100 315 30 300 Z" fill="url(#fabricGradient)" stroke="#1C1917" strokeWidth="1.5" />
                )}
                {silhouette === 'anarkali' && (
                  <path d="M 55 120 Q 100 125 145 120 L 185 280 Q 100 305 15 280 Z" fill="url(#fabricGradient)" stroke="#1C1917" strokeWidth="1.5" />
                )}
                {(silhouette === 'raw_silk_suit' || silhouette === 'fusion_set' || silhouette === 'draped_saree') && (
                  <path d="M 55 120 Q 100 125 145 120 L 160 270 Q 100 280 40 270 Z" fill="url(#fabricGradient)" stroke="#1C1917" strokeWidth="1.5" />
                )}

                {/* Embroidery Highlights */}
                {(embroideryStyle === 'heavy_zardozi' || embroideryStyle === 'crystal_sequins') && (
                  <path d="M 55 120 Q 100 125 145 120 L 175 285 Q 100 305 25 285 Z" fill="url(#embroideryPattern)" opacity="0.45" />
                )}

                {/* Dupatta drape representation */}
                {dupattaOption !== 'none' && (
                  <path d="M 40 60 Q 90 140 160 180" fill="none" stroke="#E6C280" strokeWidth="4" strokeDasharray="4 2" opacity="0.8" />
                )}
              </svg>

              {/* Color Swatch Badge */}
              <div
                className="absolute top-3 right-3 w-6 h-6 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: selectedColor.hex }}
                title={selectedColor.name}
              />
            </div>

            {/* Price Preview Card */}
            <div className="w-full bg-white p-4 rounded-xl shadow-xs border border-stone-200 mt-4 space-y-2">
              <div className="flex items-center justify-between text-xs text-stone-500 font-sans">
                <span>Customization Estimate:</span>
                <span className="text-[10px] bg-amber-100 text-amber-900 px-2 py-0.5 rounded font-bold uppercase">
                  Tailored To Order
                </span>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="font-serif text-lg font-extrabold text-amber-950 uppercase tracking-widest">
                  Coming Soon
                </span>
              </div>
              <p className="text-[11px] text-stone-500 italic">
                Includes custom master fitting, fabric, hand embroidery & luxury gift box.
              </p>
            </div>
          </div>

          {/* Right Configuration Forms (7 cols) */}
          <div className="lg:col-span-7 p-6 space-y-6">
            {/* STEP 1: Silhouette & Fabric */}
            {step === 1 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Select Outfit Silhouette
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Choose the base structure for your bespoke VELORA dress.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {[
                      { id: 'bridal_lehenga', label: 'Royal Bridal Lehenga', desc: 'Heavy flared skirt + choli' },
                      { id: 'maxi_gown', label: 'Floor Maxi Gown', desc: 'Flowing evening silhouette' },
                      { id: 'anarkali', label: 'Flared Anarkali', desc: 'Traditional 16-panel gown' },
                      { id: 'raw_silk_suit', label: 'Raw Silk 3-Piece Suit', desc: 'Classic shirt + pants' },
                      { id: 'draped_saree', label: 'Draped Saree Dress', desc: 'Modern pre-stitched saree' },
                      { id: 'fusion_set', label: 'Indo-Western Fusion', desc: 'Contemporary cape set' },
                    ].map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setSilhouette(item.id as SilhouetteType)}
                        className={`p-3 rounded-xl border text-left transition ${
                          silhouette === item.id
                            ? 'border-amber-800 bg-amber-900/10 ring-2 ring-amber-800/20'
                            : 'border-stone-300 hover:border-stone-400 bg-white'
                        }`}
                      >
                        <span className="block font-serif text-xs font-bold text-stone-900">
                          {item.label}
                        </span>
                        <span className="block text-[10px] text-stone-500 mt-1">{item.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Fabric Selector */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Choose Fabric Quality
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    We use 100% pure silk, velvet, and handloom organza.
                  </p>

                  <div className="space-y-2">
                    {FABRIC_OPTIONS.map((f) => (
                      <button
                        key={f.id}
                        onClick={() => setFabric(f.id as FabricType)}
                        className={`w-full p-3 rounded-xl border text-left flex items-center justify-between transition ${
                          fabric === f.id
                            ? 'border-amber-800 bg-amber-900/10 ring-2 ring-amber-800/20'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <div>
                          <span className="font-serif text-xs font-bold text-stone-900 block">
                            {f.name}
                          </span>
                          <span className="text-[11px] text-stone-500 font-sans block">{f.textureDesc}</span>
                        </div>
                        {fabric === f.id && <CheckCircle2 className="w-4 h-4 text-amber-900 shrink-0 ml-2" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2: Color Palette & Neckline */}
            {step === 2 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Select Color Palette
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Pick a curated VELORA luxury shade or specify a custom RGB/Hex color.
                  </p>

                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-4">
                    {COLOR_PALETTES.map((c) => (
                      <button
                        key={c.name}
                        onClick={() => setSelectedColor(c)}
                        className={`p-2.5 rounded-xl border flex items-center gap-2 transition ${
                          selectedColor.name === c.name
                            ? 'border-amber-900 bg-amber-900/10 ring-2 ring-amber-800/30'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <span
                          className="w-5 h-5 rounded-full border border-stone-300 shrink-0"
                          style={{ backgroundColor: c.hex }}
                        />
                        <span className="text-xs font-serif font-medium text-stone-800 truncate">
                          {c.name}
                        </span>
                      </button>
                    ))}
                  </div>

                  {/* Custom Color Input */}
                  <div className="bg-white p-3 rounded-xl border border-stone-200 flex items-center gap-3">
                    <span className="text-xs text-stone-600 font-serif">Custom Hex Shade:</span>
                    <input
                      type="color"
                      value={selectedColor.hex}
                      onChange={(e) => setSelectedColor({ name: 'Custom Hex', hex: e.target.value })}
                      className="w-8 h-8 rounded border border-stone-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={selectedColor.hex}
                      onChange={(e) => setSelectedColor({ name: 'Custom Shade', hex: e.target.value })}
                      className="text-xs font-mono uppercase bg-stone-100 border border-stone-300 rounded px-2 py-1 w-24"
                    />
                  </div>
                </div>

                {/* Neckline Selection */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Bodice & Neckline Cut
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'v_neck_embellished', label: 'Embellished V-Neck' },
                      { id: 'sweetheart', label: 'Sweetheart Neckline' },
                      { id: 'high_neck_mandarin', label: 'High Neck Mandarin' },
                      { id: 'boat_neck', label: 'Classy Boat Neck' },
                      { id: 'square_cut', label: 'Royal Square Cut' },
                      { id: 'off_shoulder', label: 'Draped Off-Shoulder' },
                    ].map((n) => (
                      <button
                        key={n.id}
                        onClick={() => setNeckline(n.id as NecklineType)}
                        className={`p-3 rounded-xl border text-center transition ${
                          neckline === n.id
                            ? 'border-amber-800 bg-amber-900/10 font-bold text-amber-950'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                        }`}
                      >
                        <span className="text-xs font-serif">{n.label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sleeves Selection */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Sleeve Style
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
                    {[
                      { id: 'full_fitted', label: 'Fitted Full Sleeves' },
                      { id: 'bell_organza', label: 'Flared Organza Bell' },
                      { id: 'cape_sleeves', label: 'Floor Cape Sleeves' },
                      { id: 'three_quarter', label: '3/4 Classic Sleeves' },
                      { id: 'sleeveless', label: 'Modern Sleeveless' },
                    ].map((sl) => (
                      <button
                        key={sl.id}
                        onClick={() => setSleeveStyle(sl.id as SleeveStyle)}
                        className={`p-3 rounded-xl border text-center transition ${
                          sleeveStyle === sl.id
                            ? 'border-amber-800 bg-amber-900/10 font-bold text-amber-950'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                        }`}
                      >
                        <span className="text-xs font-serif">{sl.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Embroidery & Dupatta */}
            {step === 3 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Embroidery & Handcrafting
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Stitched by senior artisans with gold Zardozi, dabka, and crystals.
                  </p>

                  <div className="space-y-3">
                    {[
                      { id: 'heavy_zardozi', title: 'Heavy Royal Zardozi & Metallic Dabka', desc: 'Full metallic handwork with 3D floral motifs and real gold zari thread.' },
                      { id: 'crystal_sequins', title: 'Swarovski Crystal & Mirror Sequins', desc: 'Sparkling reflective crystals paired with silver cut-dana detailing.' },
                      { id: 'subtle_gotapatti', title: 'Subtle Gota Patti & Tilla Work', desc: 'Elegant traditional thread tilla borders with delicate gota highlights.' },
                      { id: 'minimalist_piping', title: 'Minimalist Metallic Piping', desc: 'Sleek, modern finish with hand-piped golden edges.' },
                    ].map((emb) => (
                      <button
                        key={emb.id}
                        onClick={() => setEmbroideryStyle(emb.id as EmbroideryStyle)}
                        className={`w-full p-3.5 rounded-xl border text-left transition ${
                          embroideryStyle === emb.id
                            ? 'border-amber-800 bg-amber-900/10 ring-2 ring-amber-800/20'
                            : 'border-stone-200 hover:border-stone-300 bg-white'
                        }`}
                      >
                        <span className="font-serif text-xs font-bold text-stone-900 block">
                          {emb.title}
                        </span>
                        <span className="text-[11px] text-stone-500 block mt-0.5">{emb.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Dupatta */}
                <div className="pt-4 border-t border-stone-200">
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Dupatta Style
                  </h3>
                  <div className="grid grid-cols-2 gap-3 pt-2">
                    {[
                      { id: 'matching_heavy', label: 'Matching Heavy Embellished Dupatta' },
                      { id: 'scalloped_border', label: 'Scalloped Border Sheer Dupatta' },
                      { id: 'sheer_contrast', label: 'Contrast Shade Organza Dupatta' },
                      { id: 'none', label: 'No Dupatta (Shirt/Gown Only)' },
                    ].map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setDupattaOption(d.id as DupattaOption)}
                        className={`p-3 rounded-xl border text-center transition ${
                          dupattaOption === d.id
                            ? 'border-amber-800 bg-amber-900/10 font-bold text-amber-950'
                            : 'border-stone-200 hover:border-stone-300 bg-white text-stone-800'
                        }`}
                      >
                        <span className="text-xs font-serif">{d.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 4: Sizing & Measurements */}
            {step === 4 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Sizing & Custom Fitting
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Choose standard international sizing or enter your exact body measurements.
                  </p>

                  <div className="flex bg-stone-200 p-1 rounded-xl mb-4">
                    <button
                      onClick={() => setSizeType('standard')}
                      className={`flex-1 py-2 text-xs font-serif rounded-lg transition ${
                        sizeType === 'standard' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Standard Sizing
                    </button>
                    <button
                      onClick={() => setSizeType('custom_measurements')}
                      className={`flex-1 py-2 text-xs font-serif rounded-lg transition ${
                        sizeType === 'custom_measurements' ? 'bg-white font-bold text-stone-900 shadow-xs' : 'text-stone-600'
                      }`}
                    >
                      Custom Measurements (Inches)
                    </button>
                  </div>

                  {sizeType === 'standard' ? (
                    <div className="grid grid-cols-5 gap-3">
                      {['XS', 'S', 'M', 'L', 'XL'].map((s) => (
                        <button
                          key={s}
                          onClick={() => setStandardSize(s)}
                          className={`p-3 rounded-xl border font-bold text-sm transition ${
                            standardSize === s
                              ? 'border-amber-900 bg-amber-900 text-white'
                              : 'border-stone-200 bg-white text-stone-800 hover:border-stone-300'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-white p-4 rounded-xl border border-stone-200">
                      <div>
                        <label className="text-[11px] font-serif text-stone-600 block mb-1">Bust / Chest (in)</label>
                        <input
                          type="number"
                          value={measurements.chest}
                          onChange={(e) => setMeasurements({ ...measurements, chest: Number(e.target.value) })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-serif text-stone-600 block mb-1">Waist (in)</label>
                        <input
                          type="number"
                          value={measurements.waist}
                          onChange={(e) => setMeasurements({ ...measurements, waist: Number(e.target.value) })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-serif text-stone-600 block mb-1">Hips (in)</label>
                        <input
                          type="number"
                          value={measurements.hips}
                          onChange={(e) => setMeasurements({ ...measurements, hips: Number(e.target.value) })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-serif text-stone-600 block mb-1">Shoulder (in)</label>
                        <input
                          type="number"
                          value={measurements.shoulder}
                          onChange={(e) => setMeasurements({ ...measurements, shoulder: Number(e.target.value) })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-serif text-stone-600 block mb-1">Dress Length (in)</label>
                        <input
                          type="number"
                          value={measurements.dressLength}
                          onChange={(e) => setMeasurements({ ...measurements, dressLength: Number(e.target.value) })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-serif text-stone-600 block mb-1">Arm Length (in)</label>
                        <input
                          type="number"
                          value={measurements.armLength}
                          onChange={(e) => setMeasurements({ ...measurements, armLength: Number(e.target.value) })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Additional Event Date & Notes */}
                <div className="pt-4 border-t border-stone-200 space-y-3">
                  <div>
                    <label className="text-xs font-serif text-stone-800 block mb-1">
                      Event Date (Required for timely dispatch):
                    </label>
                    <input
                      type="date"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-serif text-stone-800 block mb-1">
                      Special Design Instructions or Custom Requests:
                    </label>
                    <textarea
                      rows={2}
                      value={specialNotes}
                      onChange={(e) => setSpecialNotes(e.target.value)}
                      placeholder="e.g., 'Please add extra lining in sleeves and keep neckline modest...'"
                      className="w-full bg-white border border-stone-300 rounded-lg p-2.5 text-xs text-stone-800"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* STEP 5: Review & Quote Summary */}
            {step === 5 && (
              <div className="space-y-6 animate-in fade-in">
                <div>
                  <h3 className="font-serif text-lg font-bold text-stone-900 mb-1">
                    Review Custom Dress Specification
                  </h3>
                  <p className="text-xs text-stone-500 mb-4">
                    Your custom outfit specification has been prepared by VELORA Atelier.
                  </p>

                  <div className="bg-white p-4 rounded-xl border border-stone-200 space-y-3 text-xs">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Silhouette:</span>
                      <span className="font-bold text-stone-900 uppercase">{silhouette.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Fabric Quality:</span>
                      <span className="font-bold text-stone-900">{FABRIC_OPTIONS.find((f) => f.id === fabric)?.name}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Selected Shade:</span>
                      <div className="flex items-center gap-1.5 font-bold text-stone-900">
                        <span className="w-3.5 h-3.5 rounded-full border border-stone-300" style={{ backgroundColor: selectedColor.hex }} />
                        <span>{selectedColor.name} ({selectedColor.hex})</span>
                      </div>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Neckline & Sleeves:</span>
                      <span className="font-bold text-stone-900">{neckline.replace('_', ' ')} / {sleeveStyle.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Handwork Level:</span>
                      <span className="font-bold text-stone-900">{embroideryStyle.replace('_', ' ')}</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500">Sizing Option:</span>
                      <span className="font-bold text-stone-900">
                        {sizeType === 'standard' ? `Standard Size ${standardSize}` : 'Tailored Custom Body Measurements'}
                      </span>
                    </div>
                    {eventDate && (
                      <div className="flex justify-between py-1 border-b border-stone-100">
                        <span className="text-stone-500">Target Function Date:</span>
                        <span className="font-bold text-amber-900">{eventDate}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="bg-amber-900/10 border border-amber-800/30 p-4 rounded-xl flex items-center justify-between">
                  <div>
                    <span className="text-xs text-amber-900 font-serif block">Custom Price Quote:</span>
                    <span className="text-lg font-serif font-extrabold text-amber-950 uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </div>
                  <span className="text-[11px] text-amber-900 font-sans font-medium">
                    Dispatch: Upon Collection Release
                  </span>
                </div>
              </div>
            )}

            {/* Step Navigation Controls */}
            <div className="pt-6 border-t border-stone-200 flex items-center justify-between">
              {step > 1 ? (
                <button
                  onClick={() => setStep(step - 1)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-xs font-serif hover:bg-stone-100 transition"
                >
                  ← Previous Step
                </button>
              ) : <div />}

              {step < 5 ? (
                <button
                  onClick={() => setStep(step + 1)}
                  className="px-6 py-2.5 bg-[#2C241E] text-amber-100 hover:bg-amber-950 rounded-lg text-xs font-serif uppercase tracking-wider transition"
                >
                  Next Step →
                </button>
              ) : (
                <button
                  onClick={handleAddToCart}
                  disabled={isSaved}
                  className="px-6 py-3 bg-amber-900 text-white hover:bg-amber-950 rounded-xl text-xs font-serif uppercase tracking-wider flex items-center gap-2 shadow-lg transition"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>{isSaved ? 'Custom Outfit Added!' : 'Add Custom Dress to Cart'}</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
