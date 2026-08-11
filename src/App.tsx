import React, { useState } from 'react';
import { Currency, DressProduct, CustomOutfitConfig, CartItem } from './types';
import { Navbar } from './components/Navbar';
import { LaunchCountdownBar } from './components/LaunchCountdownBar';
import { HeroBanner } from './components/HeroBanner';
import { PosterBrandSection } from './components/PosterBrandSection';
import { ProductCatalog } from './components/ProductCatalog';
import { ProductDetailModal } from './components/ProductDetailModal';
import { BespokeStudio } from './components/BespokeStudio';
import { AIStylistModal } from './components/AIStylistModal';
import { CraftsmanshipShowcase } from './components/CraftsmanshipShowcase';
import { ConsultationModal } from './components/ConsultationModal';
import { OrderTrackerModal } from './components/OrderTrackerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { FabricSwatchModal } from './components/FabricSwatchModal';
import { VipPassModal } from './components/VipPassModal';
import { WhatsAppFloatingButton } from './components/WhatsAppFloatingButton';
import { Footer } from './components/Footer';

export default function App() {
  const [currency, setCurrency] = useState<Currency>('PKR');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [wishlistIds, setWishlistIds] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeSection, setActiveSection] = useState<string>('home');

  // Modals state
  const [isBespokeStudioOpen, setIsBespokeStudioOpen] = useState<boolean>(false);
  const [bespokePreset, setBespokePreset] = useState<Partial<CustomOutfitConfig> | undefined>(undefined);
  const [selectedProduct, setSelectedProduct] = useState<DressProduct | null>(null);
  const [isAIStylistOpen, setIsAIStylistOpen] = useState<boolean>(false);
  const [isConsultationOpen, setIsConsultationOpen] = useState<boolean>(false);
  const [isOrderTrackerOpen, setIsOrderTrackerOpen] = useState<boolean>(false);
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [isFabricSwatchOpen, setIsFabricSwatchOpen] = useState<boolean>(false);
  const [isVipPassOpen, setIsVipPassOpen] = useState<boolean>(false);

  // Wishlist handler
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
  };

  // Add standard product to cart
  const handleAddToCart = (product: DressProduct, selectedSize: string, selectedColor: string) => {
    const newItem: CartItem = {
      id: `item-${Date.now()}-${Math.random()}`,
      product,
      quantity: 1,
      selectedSize,
      selectedColor,
      isCustom: false,
      unitPricePKR: product.pricePKR,
      unitPriceUSD: product.priceUSD,
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Add custom bespoke dress to cart
  const handleAddCustomToCart = (customConfig: CustomOutfitConfig) => {
    const newItem: CartItem = {
      id: `custom-${Date.now()}-${Math.random()}`,
      customConfig,
      quantity: 1,
      selectedSize: customConfig.sizeType === 'standard' ? customConfig.standardSize : 'Custom Tailored',
      selectedColor: customConfig.colorName,
      isCustom: true,
      unitPricePKR: customConfig.estimatedPricePKR,
      unitPriceUSD: customConfig.estimatedPriceUSD,
    };

    setCartItems((prev) => [...prev, newItem]);
  };

  // Open Bespoke Studio pre-filled with existing dress attributes
  const handleCustomizeProduct = (product: DressProduct) => {
    let sil: any = 'maxi_gown';
    if (product.category === 'bridal') sil = 'bridal_lehenga';
    if (product.category === 'ready-to-wear') sil = 'anarkali';
    if (product.category === 'velvet') sil = 'maxi_gown';

    let fab: any = 'raw_silk';
    if (product.fabric.toLowerCase().includes('velvet')) fab = 'royal_velvet';
    if (product.fabric.toLowerCase().includes('organza')) fab = 'organza';
    if (product.fabric.toLowerCase().includes('chiffon')) fab = 'pure_chiffon';

    setBespokePreset({
      silhouette: sil,
      fabric: fab,
      colorName: product.colors[0]?.name || 'Royal Crimson',
      colorHex: product.colors[0]?.hex || '#8B0000',
    });

    setIsBespokeStudioOpen(true);
  };

  // Cart actions
  const handleUpdateQuantity = (itemId: string, newQty: number) => {
    if (newQty <= 0) {
      setCartItems((prev) => prev.filter((item) => item.id !== itemId));
    } else {
      setCartItems((prev) =>
        prev.map((item) => (item.id === itemId ? { ...item, quantity: newQty } : item))
      );
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  return (
    <div className="min-h-screen bg-[#FAF5F0] text-[#1F1918] font-sans antialiased selection:bg-[#D9989F]/30 selection:text-[#1F1918]">
      {/* Launch Day Live Countdown Bar */}
      <LaunchCountdownBar />

      {/* Header Navbar */}
      <Navbar
        currency={currency}
        setCurrency={setCurrency}
        cartCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => {
          const firstWishlisted = wishlistIds[0];
          if (firstWishlisted) {
            const prod = selectedProduct || null;
            if (prod) setSelectedProduct(prod);
          }
        }}
        onOpenBespokeStudio={() => {
          setBespokePreset(undefined);
          setIsBespokeStudioOpen(true);
        }}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenFabricSwatch={() => setIsFabricSwatchOpen(true)}
        onOpenVipPass={() => setIsVipPassOpen(true)}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Main Page Layout */}
      <main>
        {/* Hero Section */}
        <HeroBanner
          onOpenBespokeStudio={() => {
            setBespokePreset(undefined);
            setIsBespokeStudioOpen(true);
          }}
          onOpenAIStylist={() => setIsAIStylistOpen(true)}
          onExploreCatalog={() => {
            const el = document.getElementById('collections');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenVipPass={() => setIsVipPassOpen(true)}
        />

        {/* Poster Replicated Brand Showcase & CEO Spotlight */}
        <PosterBrandSection
          onOpenPreOrderRegister={() => setIsCheckoutOpen(true)}
        />

        {/* Collections Catalog Grid */}
        <ProductCatalog
          currency={currency}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onSelectProduct={(product) => setSelectedProduct(product)}
          onAddToCart={handleAddToCart}
          onCustomizeProduct={handleCustomizeProduct}
          wishlistIds={wishlistIds}
          onToggleWishlist={handleToggleWishlist}
        />

        {/* Artisan Heritage & Craftsmanship Section */}
        <CraftsmanshipShowcase />
      </main>

      {/* Footer */}
      <Footer
        onOpenBespokeStudio={() => {
          setBespokePreset(undefined);
          setIsBespokeStudioOpen(true);
        }}
        onOpenAIStylist={() => setIsAIStylistOpen(true)}
        onOpenConsultation={() => setIsConsultationOpen(true)}
        onOpenOrderTracker={() => setIsOrderTrackerOpen(true)}
        onOpenFabricSwatch={() => setIsFabricSwatchOpen(true)}
        onOpenVipPass={() => setIsVipPassOpen(true)}
      />

      {/* Floating Direct WhatsApp Button (+92 371 3508765) */}
      <WhatsAppFloatingButton />

      {/* MODALS & DRAWERS */}
      {/* 1. Bespoke Custom Dress Studio */}
      <BespokeStudio
        currency={currency}
        isOpen={isBespokeStudioOpen}
        onClose={() => setIsBespokeStudioOpen(false)}
        onAddToCart={handleAddCustomToCart}
        initialPreset={bespokePreset}
      />

      {/* 2. Product Detail Quick View */}
      <ProductDetailModal
        product={selectedProduct}
        currency={currency}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onCustomizeProduct={handleCustomizeProduct}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onToggleWishlist={handleToggleWishlist}
      />

      {/* 3. AI Stylist Modal */}
      <AIStylistModal
        isOpen={isAIStylistOpen}
        onClose={() => setIsAIStylistOpen(false)}
        onOpenBespokeWithPreset={(preset) => {
          setBespokePreset(preset);
          setIsBespokeStudioOpen(true);
        }}
      />

      {/* 4. Consultation Booking Modal */}
      <ConsultationModal
        isOpen={isConsultationOpen}
        onClose={() => setIsConsultationOpen(false)}
      />

      {/* 5. Order Progress Tracker */}
      <OrderTrackerModal
        isOpen={isOrderTrackerOpen}
        onClose={() => setIsOrderTrackerOpen(false)}
      />

      {/* 6. Shopping Cart Slide-Over Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        currency={currency}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenCheckout={() => setIsCheckoutOpen(true)}
        onOpenBespokeStudio={() => setIsBespokeStudioOpen(true)}
      />

      {/* 7. Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        currency={currency}
        onClearCart={() => setCartItems([])}
      />

      {/* 8. Fabric Swatch Inspector Modal */}
      <FabricSwatchModal
        isOpen={isFabricSwatchOpen}
        onClose={() => setIsFabricSwatchOpen(false)}
      />

      {/* 9. VIP Early Access Pass Generator */}
      <VipPassModal
        isOpen={isVipPassOpen}
        onClose={() => setIsVipPassOpen(false)}
      />
    </div>
  );
}

