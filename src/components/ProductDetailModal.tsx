import React, { useState } from 'react';
import { DressProduct, Currency } from '../types';
import { Scissors, ShoppingBag, Heart, Check, Truck, Shield, Ruler, Sparkles, X } from 'lucide-react';

interface ProductDetailModalProps {
  product: DressProduct | null;
  currency: Currency;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: DressProduct, selectedSize: string, selectedColor: string) => void;
  onCustomizeProduct: (product: DressProduct) => void;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  currency,
  isOpen,
  onClose,
  onAddToCart,
  onCustomizeProduct,
  isWishlisted,
  onToggleWishlist,
}) => {
  if (!isOpen || !product) return null;

  const [activeImg, setActiveImg] = useState<string>(product.image);
  const [selectedSize, setSelectedSize] = useState<string>(product.availableSizes[1] || 'M');
  const [selectedColor, setSelectedColor] = useState<string>(product.colors[0]?.name || 'Standard');
  const [showSizeGuide, setShowSizeGuide] = useState<boolean>(false);
  const [added, setAdded] = useState<boolean>(false);

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/80 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 overflow-y-auto">
      <div className="bg-[#FAF8F5] border border-stone-300 rounded-2xl w-full max-w-4xl overflow-hidden shadow-2xl relative my-auto">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/80 hover:bg-white text-stone-800 p-2 rounded-full shadow-md transition"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-12 max-h-[85vh] overflow-y-auto">
          {/* Gallery Column (5 cols) */}
          <div className="md:col-span-5 p-4 sm:p-6 bg-stone-100 flex flex-col space-y-3">
            <div className="relative aspect-[3/4] rounded-xl overflow-hidden bg-white border border-stone-200 shadow-xs">
              <img
                src={activeImg}
                alt={product.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover object-top"
              />
            </div>

            {/* Thumbnail Carousel */}
            {product.galleryImages.length > 1 && (
              <div className="flex items-center gap-2 overflow-x-auto pb-1">
                {product.galleryImages.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImg(imgUrl)}
                    className={`w-16 h-20 rounded-lg overflow-hidden border-2 transition ${
                      activeImg === imgUrl ? 'border-amber-900 shadow-md' : 'border-stone-300 opacity-70'
                    }`}
                  >
                    <img src={imgUrl} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column (7 cols) */}
          <div className="md:col-span-7 p-6 sm:p-8 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-serif uppercase tracking-widest text-amber-900 font-bold">
                    {product.category.toUpperCase()} • VELORA ATELIER
                  </span>
                  <div className="flex items-center gap-1 text-amber-800 text-xs font-bold">
                    <span>★ {product.rating}</span>
                    <span className="text-stone-400">({product.reviewsCount} reviews)</span>
                  </div>
                </div>

                <h2 className="font-serif text-2xl font-extrabold text-[#2C241E]">
                  {product.title}
                </h2>

                <div className="mt-2 flex items-center gap-3">
                  <span className="inline-block bg-amber-900/10 text-amber-900 px-3.5 py-1 rounded-full font-serif text-sm font-extrabold uppercase tracking-widest border border-amber-900/20">
                    Coming Soon
                  </span>
                  <span className="text-xs text-stone-500 font-sans">
                    Price Announced Upon Official Collection Launch
                  </span>
                </div>
              </div>

              <p className="text-xs text-stone-600 font-sans leading-relaxed">
                {product.description}
              </p>

              {/* Specs Box */}
              <div className="bg-white p-3.5 rounded-xl border border-stone-200 text-xs space-y-2">
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Fabric Composition:</span>
                  <span className="font-bold text-stone-800">{product.fabric}</span>
                </div>
                <div className="flex justify-between border-b border-stone-100 pb-1">
                  <span className="text-stone-500">Handcraft Technique:</span>
                  <span className="font-bold text-stone-800">{product.embroideryType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Estimated Delivery:</span>
                  <span className="font-bold text-amber-900">{product.deliveryDays}</span>
                </div>
              </div>

              {/* Color Options */}
              <div>
                <label className="text-xs font-serif font-bold text-stone-800 block mb-2">
                  Select Shade: <span className="text-amber-900 font-normal">{selectedColor}</span>
                </label>
                <div className="flex items-center gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      className={`p-1 rounded-full border-2 transition ${
                        selectedColor === c.name ? 'border-amber-900 scale-110' : 'border-stone-300'
                      }`}
                      title={c.name}
                    >
                      <span className="block w-5 h-5 rounded-full" style={{ backgroundColor: c.hex }} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Options */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-serif font-bold text-stone-800">
                    Select International Size:
                  </label>
                  <button
                    onClick={() => setShowSizeGuide(!showSizeGuide)}
                    className="text-[11px] text-amber-900 font-serif underline flex items-center gap-1"
                  >
                    <Ruler className="w-3 h-3" />
                    <span>Size Guide Chart</span>
                  </button>
                </div>

                <div className="grid grid-cols-5 gap-2">
                  {product.availableSizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`py-2 text-xs font-bold font-serif rounded-lg border transition ${
                        selectedSize === sz
                          ? 'bg-[#2C241E] text-amber-100 border-[#2C241E]'
                          : 'bg-white text-stone-800 border-stone-300 hover:border-stone-400'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>

                {/* Size Guide Modal Popup */}
                {showSizeGuide && (
                  <div className="mt-3 bg-amber-900/10 p-3 rounded-xl border border-amber-800/20 text-[11px] space-y-1">
                    <span className="font-bold text-amber-950 font-serif block">VELORA Standard Size Table (Inches):</span>
                    <p className="text-stone-700">S: Bust 34" • Waist 27" • Hips 37"</p>
                    <p className="text-stone-700">M: Bust 36" • Waist 29" • Hips 39"</p>
                    <p className="text-stone-700">L: Bust 39" • Waist 32" • Hips 42"</p>
                  </div>
                )}
              </div>
            </div>

            {/* CTAs */}
            <div className="space-y-3 pt-4 border-t border-stone-200">
              <div className="flex gap-3">
                <button
                  onClick={handleAdd}
                  className="flex-1 bg-[#2C241E] text-amber-100 hover:bg-stone-800 py-3 rounded-xl text-xs font-serif uppercase tracking-wider font-bold flex items-center justify-center gap-2 shadow-md transition"
                >
                  <Sparkles className="w-4 h-4 text-amber-300" />
                  <span>{added ? 'Pre-Order Registered!' : 'Register Pre-Order Interest'}</span>
                </button>

                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-3 rounded-xl border transition ${
                    isWishlisted ? 'bg-rose-800 text-white border-rose-800' : 'bg-white border-stone-300 text-stone-700'
                  }`}
                  title="Wishlist"
                >
                  <Heart className="w-5 h-5 fill-current" />
                </button>
              </div>

              {/* Customize in Studio Button */}
              {product.customisable && (
                <button
                  onClick={() => {
                    onClose();
                    onCustomizeProduct(product);
                  }}
                  className="w-full bg-[#2C241E] text-amber-100 hover:bg-stone-900 py-3 rounded-xl text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm transition"
                >
                  <Scissors className="w-4 h-4 text-amber-300" />
                  <span>Customize This Dress in Bespoke Studio</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
