import React, { useState } from 'react';
import { DressProduct, DressCategory, Currency, CustomOutfitConfig } from '../types';
import { FEATURED_PRODUCTS } from '../data/products';
import { Sparkles, Eye, Scissors, Heart, Filter, Search, Check } from 'lucide-react';

interface ProductCatalogProps {
  currency: Currency;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onSelectProduct: (product: DressProduct) => void;
  onAddToCart: (product: DressProduct, selectedSize: string, selectedColor: string) => void;
  onCustomizeProduct: (product: DressProduct) => void;
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  currency,
  searchQuery,
  setSearchQuery,
  onSelectProduct,
  onAddToCart,
  onCustomizeProduct,
  wishlistIds,
  onToggleWishlist,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<DressCategory>('all');
  const [selectedFabricFilter, setSelectedFabricFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories: { id: DressCategory; label: string }[] = [
    { id: 'all', label: 'All 16 Preview Articles' },
    { id: 'ready-to-wear', label: 'Ready-to-Wear Pret' },
    { id: 'festive', label: 'Festive & Fusion Sets' },
    { id: 'formal', label: 'Formal Evening & Gowns' },
  ];

  // Filtering Logic
  const filteredProducts = FEATURED_PRODUCTS.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch =
      searchQuery === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.articleCode && product.articleCode.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.fabric.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesFabric =
      selectedFabricFilter === 'all' || product.fabric.toLowerCase().includes(selectedFabricFilter.toLowerCase());

    return matchesCategory && matchesSearch && matchesFabric;
  }).sort((a, b) => {
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="collections" className="py-16 bg-[#FAF8F5] min-h-[600px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Section Header */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-1.5 text-amber-900 text-xs font-serif uppercase tracking-widest bg-amber-900/10 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>VELORA Atelier Collections</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-extrabold text-[#2C241E] tracking-tight">
            Handcrafted Female Designer Dresses
          </h2>
          <p className="text-stone-600 text-sm font-sans">
            Explore our ready-to-wear signature designs or choose any outfit to customize fabric, color, neckline, and embroidery to your preference.
          </p>
        </div>

        {/* Category Navigation Bar */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto pb-2 border-b border-stone-200 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-xs font-serif uppercase tracking-wider transition whitespace-nowrap ${
                selectedCategory === cat.id
                  ? 'bg-[#2C241E] text-amber-100 font-bold shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-200/60'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters & Sorting Subbar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-stone-200 shadow-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Filter className="w-4 h-4 text-stone-500" />
            <span className="text-xs font-serif font-bold text-stone-800">Filter Fabric:</span>
            <select
              value={selectedFabricFilter}
              onChange={(e) => setSelectedFabricFilter(e.target.value)}
              className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 focus:outline-none text-stone-800"
            >
              <option value="all">All Pure Fabrics</option>
              <option value="silk">Pure Raw Silk</option>
              <option value="organza">Glass Organza</option>
              <option value="velvet">Plush Velvet</option>
              <option value="chiffon">Chiffon</option>
            </select>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <span className="text-xs font-serif text-stone-500">Sort By:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="text-xs bg-stone-50 border border-stone-300 rounded-lg px-3 py-1.5 focus:outline-none text-stone-800"
            >
              <option value="featured">All 16 Articles (Sequential)</option>
              <option value="rating">Top Rated Previews</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-stone-200 space-y-3">
            <p className="text-stone-500 text-sm font-serif">No dresses match your selected search or filter criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedFabricFilter('all');
                setSearchQuery('');
              }}
              className="text-xs text-amber-900 font-bold underline font-sans"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlistIds.includes(product.id);

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl overflow-hidden border border-stone-200/80 shadow-sm hover:shadow-xl transition duration-300 flex flex-col group"
                >
                  {/* Image Container */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-700"
                      onError={(e) => {
                        const target = e.currentTarget;
                        if (!target.dataset.retried) {
                          target.dataset.retried = 'true';
                          if (product.image.startsWith('/')) {
                            target.src = product.image.slice(1);
                          } else {
                            target.src = '/' + product.image;
                          }
                        }
                      }}
                    />

                    {/* Badges */}
                    {product.tag && (
                      <span className="absolute top-3 left-3 bg-[#2C241E]/90 text-amber-200 text-[10px] font-serif uppercase tracking-widest px-2.5 py-1 rounded-md shadow-xs">
                        {product.tag}
                      </span>
                    )}

                    {/* Wishlist Button */}
                    <button
                      onClick={() => onToggleWishlist(product.id)}
                      className={`absolute top-3 right-3 p-2.5 rounded-full shadow-md transition ${
                        isWishlisted
                          ? 'bg-rose-800 text-white'
                          : 'bg-white/80 text-stone-700 hover:bg-white hover:text-rose-700'
                      }`}
                      title={isWishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
                    >
                      <Heart className="w-4 h-4 fill-current" />
                    </button>

                    {/* Overlay Action CTAs */}
                    <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition duration-300 flex gap-2">
                      <button
                        onClick={() => onSelectProduct(product)}
                        className="flex-1 bg-white/90 backdrop-blur-xs text-stone-900 hover:bg-white py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Eye className="w-3.5 h-3.5 text-stone-700" />
                        <span>Quick View</span>
                      </button>

                      <button
                        onClick={() => onCustomizeProduct(product)}
                        className="flex-1 bg-[#2C241E] text-amber-100 hover:bg-amber-950 py-2.5 rounded-xl text-xs font-serif uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-md"
                      >
                        <Scissors className="w-3.5 h-3.5 text-amber-300" />
                        <span>Customize</span>
                      </button>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] text-stone-500 font-sans">
                        <span>{product.fabric}</span>
                        <span className="text-amber-800 font-bold">★ {product.rating}</span>
                      </div>

                      <h3
                        onClick={() => onSelectProduct(product)}
                        className="font-serif text-base font-bold text-stone-900 hover:text-amber-900 transition line-clamp-1 cursor-pointer"
                      >
                        {product.title}
                      </h3>

                      <p className="text-xs text-stone-600 line-clamp-2 font-sans leading-relaxed">
                        {product.description}
                      </p>
                    </div>

                    {/* Color Swatches */}
                    <div className="flex items-center gap-1.5 pt-1">
                      <span className="text-[10px] text-stone-400 font-sans mr-1">Shades:</span>
                      {product.colors.map((c) => (
                        <span
                          key={c.name}
                          className="w-3.5 h-3.5 rounded-full border border-stone-300"
                          style={{ backgroundColor: c.hex }}
                          title={c.name}
                        />
                      ))}
                    </div>

                    {/* Coming Soon & Action Footer */}
                    <div className="pt-3 border-t border-stone-100 flex items-center justify-between">
                      <div>
                        {product.articleCode && (
                          <span className="block text-[11px] font-mono font-semibold text-stone-400">
                            {product.articleCode}
                          </span>
                        )}
                        <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-900/10 text-amber-900 text-xs font-serif font-bold uppercase tracking-wider">
                          Coming Soon
                        </span>
                      </div>

                      <button
                        onClick={() => onSelectProduct(product)}
                        className="bg-[#2C241E] hover:bg-stone-800 text-amber-100 px-3.5 py-2 rounded-lg text-xs font-serif uppercase tracking-wider font-bold transition shadow-xs"
                      >
                        Register Interest
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};
