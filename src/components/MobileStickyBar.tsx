import React from 'react';
import { Phone, MessageCircle, Utensils, Navigation, ShoppingBag } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface MobileStickyBarProps {
  info: RestaurantInfo;
  cartCount: number;
  onOpenCart: () => void;
}

export const MobileStickyBar: React.FC<MobileStickyBarProps> = ({
  info,
  cartCount,
  onOpenCart,
}) => {
  const cleanPhone = info.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-stone-950/95 backdrop-blur-md border-t border-amber-900/40 px-2 py-2 shadow-2xl">
      <div className="grid grid-cols-4 gap-1.5 max-w-md mx-auto text-center">
        
        {/* Call Now */}
        <a
          href={`tel:${cleanPhone}`}
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold transition shadow"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[10px] leading-tight">Call Now</span>
        </a>

        {/* WhatsApp Order */}
        <a
          href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello Veni's Food Restaurants, I want to order food in Tindivanam.")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow"
        >
          <MessageCircle className="w-4 h-4 fill-white mb-0.5" />
          <span className="text-[10px] leading-tight">WhatsApp</span>
        </a>

        {/* Food Menu */}
        <a
          href="#menu"
          className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-200 border border-stone-750 font-medium transition"
        >
          <Utensils className="w-4 h-4 text-amber-400 mb-0.5" />
          <span className="text-[10px] leading-tight">Menu</span>
        </a>

        {/* Order Tray / Directions */}
        {cartCount > 0 ? (
          <button
            onClick={onOpenCart}
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/50 font-bold transition relative"
          >
            <ShoppingBag className="w-4 h-4 mb-0.5" />
            <span className="text-[10px] leading-tight">Tray ({cartCount})</span>
            <span className="absolute top-1 right-2 w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          </button>
        ) : (
          <a
            href={info.googleMapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center justify-center py-1.5 px-1 rounded-xl bg-stone-850 hover:bg-stone-800 text-stone-200 border border-stone-750 font-medium transition"
          >
            <Navigation className="w-4 h-4 text-amber-400 mb-0.5" />
            <span className="text-[10px] leading-tight">Directions</span>
          </a>
        )}

      </div>
    </div>
  );
};
