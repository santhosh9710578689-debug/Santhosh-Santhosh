import React, { useState } from 'react';
import { Phone, MessageCircle, MapPin, Clock, ShoppingBag, Menu, X, Settings2 } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface HeaderProps {
  info: RestaurantInfo;
  cartCount: number;
  onOpenCart: () => void;
  onOpenOwnerSettings: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  info,
  cartCount,
  onOpenCart,
  onOpenOwnerSettings,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const cleanPhone = info.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  return (
    <header className="sticky top-0 z-40 bg-stone-900 text-stone-100 shadow-xl border-b border-amber-900/40">
      {/* Top Bar for High Conversion & Local Trust */}
      <div className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-700 text-stone-950 text-xs sm:text-sm font-semibold py-1.5 px-4 shadow-inner">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1.5 font-bold tracking-tight">
              <MapPin className="w-3.5 h-3.5" />
              <span>{info.city}, {info.state}</span>
            </span>
            <span className="hidden md:inline text-amber-950/60">•</span>
            <span className="hidden md:flex items-center gap-1 text-stone-900/90 font-medium">
              <Clock className="w-3.5 h-3.5" />
              <span>{info.openingHours}</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            <span className="hidden sm:inline bg-stone-950/20 text-stone-950 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wider">
              NH45 Highway Stop
            </span>
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-1.5 bg-stone-950 text-amber-300 hover:text-white px-2.5 py-0.5 rounded transition text-xs font-bold"
            >
              <Phone className="w-3 h-3" />
              <span>Call: {info.phone}</span>
            </a>
            <button
              onClick={onOpenOwnerSettings}
              title="Store Owner Settings (Edit Details)"
              className="flex items-center gap-1 text-stone-900/80 hover:text-stone-950 p-1 hover:bg-black/10 rounded transition text-xs"
            >
              <Settings2 className="w-3.5 h-3.5" />
              <span className="hidden lg:inline text-[11px]">Owner Settings</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Brand Logo & Name */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-lg bg-gradient-to-br from-amber-500 via-amber-600 to-amber-800 flex items-center justify-center text-stone-950 font-black shadow-md border border-amber-400/40 text-xl font-heading tracking-wider">
              V
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-heading font-extrabold text-lg sm:text-2xl text-amber-100 group-hover:text-amber-400 transition tracking-tight">
                  {info.name}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-amber-300/80 tracking-widest uppercase font-medium">
                Tindivanam • South Indian & Multi-Cuisine
              </p>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-stone-300">
            <a href="#about" className="hover:text-amber-400 transition">About</a>
            <a href="#specials" className="hover:text-amber-400 transition">Popular Dishes</a>
            <a href="#menu" className="hover:text-amber-400 transition">Food Menu</a>
            <a href="#why-us" className="hover:text-amber-400 transition">Highway Travelers</a>
            <a href="#location" className="hover:text-amber-400 transition">Location & Map</a>
            <a href="#reservation" className="hover:text-amber-400 transition">Table / Catering</a>
            <a href="#reviews" className="hover:text-amber-400 transition">Reviews</a>
            <a href="#faqs" className="hover:text-amber-400 transition">FAQs</a>
          </nav>

          {/* Desktop Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello Veni's Food Restaurants, I would like to check today's menu and order food.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-emerald-900/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <MessageCircle className="w-4 h-4 fill-white" />
              <span>WhatsApp</span>
            </a>

            {/* Direct Phone Dial */}
            <a
              href={`tel:${cleanPhone}`}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-lg text-sm font-bold shadow-md hover:shadow-amber-500/30 transition transform hover:-translate-y-0.5 active:translate-y-0"
            >
              <Phone className="w-4 h-4" />
              <span>Call Now</span>
            </a>

            {/* Cart Trigger */}
            <button
              onClick={onOpenCart}
              className="relative flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-3 py-2 rounded-lg text-sm font-semibold transition"
              aria-label="View Order Tray"
            >
              <ShoppingBag className="w-4 h-4 text-amber-400" />
              <span>Tray</span>
              {cartCount > 0 && (
                <span className="bg-amber-500 text-stone-950 text-xs font-black px-1.5 py-0.2 rounded-full animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenCart}
              className="relative p-2 bg-stone-800 text-stone-200 rounded-lg border border-stone-700"
              aria-label="View WhatsApp Order Tray"
            >
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-amber-500 text-stone-950 text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-stone-300 hover:text-white hover:bg-stone-800 rounded-lg"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pt-3 border-t border-stone-800 flex flex-col gap-3 pb-2 text-sm">
            <a
              href="#menu"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded hover:bg-stone-800 text-amber-300 font-semibold flex items-center justify-between"
            >
              <span>Explore Food Menu</span>
              <span className="text-xs bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded">View</span>
            </a>
            <a
              href="#specials"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded hover:bg-stone-800 text-stone-300"
            >
              Popular Dishes & Biryani
            </a>
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded hover:bg-stone-800 text-stone-300"
            >
              About Veni's Food Restaurants
            </a>
            <a
              href="#why-us"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded hover:bg-stone-800 text-stone-300"
            >
              NH45 Highway Traveler Services
            </a>
            <a
              href="#location"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded hover:bg-stone-800 text-stone-300"
            >
              Location & Google Maps
            </a>
            <a
              href="#reservation"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded hover:bg-stone-800 text-stone-300"
            >
              Table Booking & Bulk Catering
            </a>
            <a
              href="#reviews"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded hover:bg-stone-800 text-stone-300"
            >
              Customer Reviews
            </a>
            <a
              href="#faqs"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-1.5 rounded hover:bg-stone-800 text-stone-300"
            >
              Frequently Asked Questions
            </a>

            <div className="grid grid-cols-2 gap-2 pt-2 border-t border-stone-800">
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-1.5 bg-amber-500 text-stone-950 py-2.5 rounded-lg font-bold text-center"
              >
                <Phone className="w-4 h-4" />
                <span>Call {info.phone}</span>
              </a>
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello Veni's Food Restaurants, I want to inquire about menu and food order.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-1.5 bg-emerald-600 text-white py-2.5 rounded-lg font-bold text-center"
              >
                <MessageCircle className="w-4 h-4 fill-white" />
                <span>WhatsApp Order</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
