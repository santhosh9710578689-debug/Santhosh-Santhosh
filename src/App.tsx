import React, { useState, useEffect, useMemo } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { PopularDishes } from './components/PopularDishes';
import { MenuSection } from './components/MenuSection';
import { AboutSection } from './components/AboutSection';
import { WhyChooseUs } from './components/WhyChooseUs';
import { LocationSection } from './components/LocationSection';
import { ReservationSection } from './components/ReservationSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { FaqSection } from './components/FaqSection';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { OwnerCustomizerModal } from './components/OwnerCustomizerModal';
import { MobileStickyBar } from './components/MobileStickyBar';
import { DEFAULT_RESTAURANT_INFO, INITIAL_MENU_ITEMS, TESTIMONIALS_DATA } from './data/restaurantData';
import { RestaurantInfo, MenuItem, CartItem } from './types';
import { CheckCircle2 } from 'lucide-react';

export default function App() {
  // Restaurant Info with LocalStorage persistence
  const [info, setInfo] = useState<RestaurantInfo>(() => {
    try {
      const saved = localStorage.getItem('veni_restaurant_info');
      return saved ? JSON.parse(saved) : DEFAULT_RESTAURANT_INFO;
    } catch {
      return DEFAULT_RESTAURANT_INFO;
    }
  });

  // Menu items with LocalStorage persistence and version sync
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const storedVersion = localStorage.getItem('veni_menu_version');
      const saved = localStorage.getItem('veni_menu_items');
      
      // If version updated or not set to v2, synchronize initial items with new accurate images
      if (storedVersion !== 'v2' || !saved) {
        localStorage.setItem('veni_menu_version', 'v2');
        
        if (saved) {
          // Preserve any custom dishes added by the user
          const parsed: MenuItem[] = JSON.parse(saved);
          const customDishes = parsed.filter(item => item.id.startsWith('custom-'));
          const merged = [...INITIAL_MENU_ITEMS, ...customDishes];
          localStorage.setItem('veni_menu_items', JSON.stringify(merged));
          return merged;
        }

        localStorage.setItem('veni_menu_items', JSON.stringify(INITIAL_MENU_ITEMS));
        return INITIAL_MENU_ITEMS;
      }
      
      return JSON.parse(saved);
    } catch {
      return INITIAL_MENU_ITEMS;
    }
  });

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('veni_cart_items');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Drawer / Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isOwnerModalOpen, setIsOwnerModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('veni_restaurant_info', JSON.stringify(info));
    } catch (e) {
      console.error(e);
    }
  }, [info]);

  useEffect(() => {
    try {
      localStorage.setItem('veni_menu_items', JSON.stringify(menuItems));
    } catch (e) {
      console.error(e);
    }
  }, [menuItems]);

  useEffect(() => {
    try {
      localStorage.setItem('veni_cart_items', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Cart Handlers
  const handleAddToCart = (item: MenuItem) => {
    setCart((prev) => {
      const existing = prev.find((c) => c.item.id === item.id);
      if (existing) {
        return prev.map((c) =>
          c.item.id === item.id ? { ...c, quantity: c.quantity + 1 } : c
        );
      }
      return [...prev, { item, quantity: 1 }];
    });
    showToast(`Added "${item.name}" to WhatsApp order tray!`);
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((c) => {
          if (c.item.id === id) {
            const nextQty = c.quantity + delta;
            return nextQty > 0 ? { ...c, quantity: nextQty } : null;
          }
          return c;
        })
        .filter((c): c is CartItem => c !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    setCart((prev) => prev.filter((c) => c.item.id !== id));
  };

  const handleClearCart = () => {
    setCart([]);
  };

  // Owner Management
  const handleSaveInfo = (newInfo: RestaurantInfo) => {
    setInfo(newInfo);
    showToast('Restaurant info updated successfully!');
  };

  const handleResetDefaults = () => {
    if (confirm('Reset restaurant details and menu items to standard defaults?')) {
      setInfo(DEFAULT_RESTAURANT_INFO);
      setMenuItems(INITIAL_MENU_ITEMS);
      localStorage.removeItem('veni_restaurant_info');
      localStorage.removeItem('veni_menu_items');
      showToast('Reset to default restaurant data.');
    }
  };

  const handleAddCustomDish = (newItem: MenuItem) => {
    setMenuItems((prev) => [newItem, ...prev]);
    showToast(`"${newItem.name}" added to menu!`);
  };

  const handleDeleteDish = (id: string) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
    setCart((prev) => prev.filter((c) => c.item.id !== id));
    showToast('Dish removed from menu.');
  };

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartItemIds = useMemo(() => {
    return new Set(cart.map((c) => c.item.id));
  }, [cart]);

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed top-16 right-4 z-50 bg-amber-500 text-stone-950 font-bold px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2 text-xs sm:text-sm animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-stone-950" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Main Header */}
      <Header
        info={info}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenOwnerSettings={() => setIsOwnerModalOpen(true)}
      />

      {/* Hero Section */}
      <main className="flex-1">
        <Hero
          info={info}
          onOpenCart={() => setIsCartOpen(true)}
        />

        {/* Popular Dishes / Chef Signatures */}
        <PopularDishes
          info={info}
          onAddToCart={handleAddToCart}
        />

        {/* Full Interactive Menu */}
        <MenuSection
          items={menuItems}
          info={info}
          onAddToCart={handleAddToCart}
          cartItemIds={cartItemIds}
        />

        {/* About Restaurant & Food Heritage */}
        <AboutSection info={info} />

        {/* Why Choose Us & Highway Traveler Stop */}
        <WhyChooseUs info={info} />

        {/* Google Maps Location & Directions */}
        <LocationSection
          info={info}
          onOpenOwnerSettings={() => setIsOwnerModalOpen(true)}
        />

        {/* Table Reservation & Bulk Catering Inquiries */}
        <ReservationSection info={info} />

        {/* Customer Testimonials & Reviews */}
        <TestimonialsSection
          testimonials={TESTIMONIALS_DATA}
          info={info}
        />

        {/* Local SEO FAQs */}
        <FaqSection info={info} />
      </main>

      {/* Footer */}
      <Footer
        info={info}
        onOpenOwnerSettings={() => setIsOwnerModalOpen(true)}
      />

      {/* Mobile Sticky Bar for Call & WhatsApp Touch Conversions */}
      <MobileStickyBar
        info={info}
        cartCount={cartCount}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* WhatsApp Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        info={info}
      />

      {/* Owner Customizer Modal */}
      <OwnerCustomizerModal
        isOpen={isOwnerModalOpen}
        onClose={() => setIsOwnerModalOpen(false)}
        info={info}
        onSaveInfo={handleSaveInfo}
        onResetDefaults={handleResetDefaults}
        menuItems={menuItems}
        onAddCustomDish={handleAddCustomDish}
        onDeleteDish={handleDeleteDish}
      />

    </div>
  );
}
