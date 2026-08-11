import React, { useState } from 'react';
import { Sparkles, Wand2, Send, Scissors, Bot, User, RefreshCw, X } from 'lucide-react';

interface AIStylistModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenBespokeWithPreset: (preset: any) => void;
}

export const AIStylistModal: React.FC<AIStylistModalProps> = ({
  isOpen,
  onClose,
  onOpenBespokeWithPreset,
}) => {
  if (!isOpen) return null;

  const [prompt, setPrompt] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('Barat Wedding Function');
  const [bodyType, setBodyType] = useState<string>('Hourglass / Tall');
  const [preferredColors, setPreferredColors] = useState<string>('Royal Red or Gold');
  const [budget, setBudget] = useState<string>('Rs. 150,000 - 250,000');
  
  const [loading, setLoading] = useState<boolean>(false);
  const [responseMarkdown, setResponseMarkdown] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const presetQueries = [
    'Suggest an outdoor sunset Barat bridal outfit',
    'Recommend a velvet gown for a winter gala evening',
    'Best organza pret outfit for a Mehndi dance ceremony',
    'Suggest pastel shades for a modern Walima reception',
  ];

  const handleConsult = async (queryText?: string) => {
    const finalPrompt = queryText || prompt || 'Suggest a custom outfit for my event.';
    setLoading(true);
    setErrorMsg(null);

    try {
      const res = await fetch('/api/ai-stylist', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          occasion,
          bodyType,
          preferredColors,
          budget,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setResponseMarkdown(data.stylistReply);
      } else {
        setErrorMsg(data.error || 'Stylist consultation failed.');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to connect to VELORA AI Stylist service.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl w-full max-w-3xl overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-[#2C241E] text-amber-100 p-5 flex items-center justify-between border-b border-amber-900/30">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-900/40 rounded-xl border border-amber-500/30">
              <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            </div>
            <div>
              <h2 className="text-xl font-serif font-bold text-white">
                VELORA AI Atelier Stylist
              </h2>
              <p className="text-xs text-amber-200/80 font-sans">
                Personalized fashion advice powered by Gemini AI
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-2 rounded-full hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {!responseMarkdown ? (
            <div className="space-y-5">
              {/* Preset Prompts */}
              <div>
                <span className="text-xs font-serif font-bold text-stone-800 block mb-2">
                  Quick Style Inspirations:
                </span>
                <div className="flex flex-wrap gap-2">
                  {presetQueries.map((q, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setPrompt(q);
                        handleConsult(q);
                      }}
                      className="text-xs bg-white border border-stone-300 hover:border-amber-900 hover:bg-amber-50/50 text-stone-800 px-3 py-1.5 rounded-full transition"
                    >
                      ✨ {q}
                    </button>
                  ))}
                </div>
              </div>

              {/* Form Controls */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-white p-4 rounded-xl border border-stone-200">
                <div>
                  <label className="text-[11px] font-serif text-stone-600 block mb-1">
                    Occasion / Event:
                  </label>
                  <input
                    type="text"
                    value={occasion}
                    onChange={(e) => setOccasion(e.target.value)}
                    placeholder="e.g. Wedding, Gala, Reception"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif text-stone-600 block mb-1">
                    Color Preferences:
                  </label>
                  <input
                    type="text"
                    value={preferredColors}
                    onChange={(e) => setPreferredColors(e.target.value)}
                    placeholder="e.g. Emerald, Champagne, Pastel"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-serif text-stone-600 block mb-1">
                    Body Type / Height:
                  </label>
                  <input
                    type="text"
                    value={bodyType}
                    onChange={(e) => setBodyType(e.target.value)}
                    placeholder="e.g. Petite, Tall, Hourglass"
                    className="w-full bg-stone-50 border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
              </div>

              {/* Custom Prompt Text Area */}
              <div>
                <label className="text-xs font-serif font-bold text-stone-800 block mb-1">
                  Describe what you want to wear or ask any fashion question:
                </label>
                <textarea
                  rows={3}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="e.g., 'I am attending a autumn evening wedding in Lahore. I love high neck gowns in raw silk with gold zardozi. What do you suggest?'"
                  className="w-full bg-white border border-stone-300 rounded-xl p-3 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-amber-900/20"
                />
              </div>

              {errorMsg && (
                <div className="bg-rose-50 text-rose-800 border border-rose-200 p-3 rounded-xl text-xs">
                  {errorMsg}
                </div>
              )}

              {/* Submit Button */}
              <button
                onClick={() => handleConsult()}
                disabled={loading}
                className="w-full bg-[#2C241E] text-amber-100 hover:bg-stone-900 py-3.5 rounded-xl text-xs font-serif uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md transition"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-amber-300" />
                    <span>Consulting Senior Atelier Stylist...</span>
                  </>
                ) : (
                  <>
                    <Wand2 className="w-4 h-4 text-amber-300" />
                    <span>Generate AI Styling Advice</span>
                  </>
                )}
              </button>
            </div>
          ) : (
            /* AI Response Output */
            <div className="space-y-6 animate-in fade-in">
              <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-amber-900 font-serif font-bold text-xs uppercase border-b border-stone-100 pb-3">
                  <Bot className="w-4 h-4" />
                  <span>VELORA Senior Stylist Recommendation:</span>
                </div>

                <div className="text-stone-800 text-xs font-sans leading-relaxed whitespace-pre-line space-y-2">
                  {responseMarkdown}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBespokeWithPreset({
                      silhouette: 'bridal_lehenga',
                      fabric: 'raw_silk',
                      colorName: 'Royal Crimson',
                      colorHex: '#8B0000',
                      embroideryStyle: 'heavy_zardozi',
                    });
                  }}
                  className="w-full sm:flex-1 bg-amber-900 text-white hover:bg-amber-950 py-3 rounded-xl text-xs font-serif uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md"
                >
                  <Scissors className="w-4 h-4" />
                  <span>Open Preset in Bespoke Studio</span>
                </button>

                <button
                  onClick={() => setResponseMarkdown(null)}
                  className="w-full sm:w-auto bg-stone-200 text-stone-800 hover:bg-stone-300 px-5 py-3 rounded-xl text-xs font-serif uppercase tracking-wider"
                >
                  Ask Another Question
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
