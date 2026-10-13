import React from 'react';
import { Phone, MessageCircle, MapPin, Clock, Heart, Shield, Navigation } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface FooterProps {
  info: RestaurantInfo;
  onOpenOwnerSettings: () => void;
}

export const Footer: React.FC<FooterProps> = ({ info, onOpenOwnerSettings }) => {
  const cleanPhone = info.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  return (
    <footer className="bg-stone-950 text-stone-300 pt-16 pb-24 lg:pb-12 border-t border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          
          {/* Col 1: Brand & Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-amber-500 to-amber-700 flex items-center justify-center text-stone-950 font-black text-xl font-heading">
                V
              </div>
              <span className="font-heading font-extrabold text-xl text-white">
                {info.name}
              </span>
            </div>
            
            <p className="text-xs sm:text-sm text-stone-400 leading-relaxed">
              Serving the authentic culinary heritage of Tamil Nadu in Tindivanam. From crispy ghee roasts to slow-cooked aromatic biryanis and highway travel parcels.
            </p>

            <div className="pt-1">
              <span className="inline-block text-[11px] text-amber-300 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full font-semibold">
                Vanakkam • சுவையான உணவு
              </span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-stone-400">
              <li>
                <a href="#menu" className="hover:text-amber-400 transition">
                  Explore Food Menu
                </a>
              </li>
              <li>
                <a href="#specials" className="hover:text-amber-400 transition">
                  Popular Dishes & Biryani
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-amber-400 transition">
                  About Our Restaurant
                </a>
              </li>
              <li>
                <a href="#why-us" className="hover:text-amber-400 transition">
                  NH45 Highway Pit-Stop Advantage
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-amber-400 transition">
                  Location & Map Directions
                </a>
              </li>
              <li>
                <a href="#reservation" className="hover:text-amber-400 transition">
                  Table & Catering Booking
                </a>
              </li>
              <li>
                <a href="#faqs" className="hover:text-amber-400 transition">
                  Local SEO FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Direct Contact */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Direct Contact & Orders
            </h4>
            
            <div className="space-y-3 text-xs sm:text-sm">
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] text-stone-400 block">Phone Call (Direct Line)</span>
                  <a
                    href={`tel:${cleanPhone}`}
                    className="font-bold text-amber-300 hover:underline"
                  >
                    {info.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <MessageCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] text-stone-400 block">WhatsApp Orders & Inquiries</span>
                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Hello Veni's Food Restaurants, I want to inquire about menu and food.")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold text-emerald-300 hover:underline"
                  >
                    +91 {info.phone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div>
                  <span className="text-[11px] text-stone-400 block">Working Hours</span>
                  <span className="text-stone-300 font-medium">{info.openingHours}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Col 4: Location & Highway Stop */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-white uppercase tracking-wider font-heading">
              Restaurant Address
            </h4>
            
            <div className="space-y-2 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-white">{info.addressLine1}</p>
                  <p className="text-stone-400">{info.addressLine2}</p>
                  <p className="text-amber-200">
                    {info.city}, {info.state} - {info.pincode}
                  </p>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href={info.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 bg-stone-850 hover:bg-stone-800 text-stone-200 border border-stone-750 px-3 py-2 rounded-lg text-xs font-semibold transition"
                >
                  <Navigation className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Google Maps</span>
                </a>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenOwnerSettings}
                className="text-[11px] text-stone-400 hover:text-amber-400 underline"
              >
                Restaurant Owner Console (Edit Info)
              </button>
            </div>
          </div>

        </div>

        {/* Local SEO Keywords Bar */}
        <div className="mt-12 pt-8 border-t border-stone-850">
          <p className="text-[11px] text-stone-400 text-center leading-relaxed max-w-4xl mx-auto">
            <strong className="text-stone-300">Popular Searches in Tindivanam:</strong> Restaurants in Tindivanam • Food restaurants in Tindivanam • Best South Indian breakfast Tindivanam • Tindivanam Chicken Biryani • GST Road NH45 traveler food stop • Chettinad restaurant Tindivanam • Family AC restaurant Tindivanam • Tindivanam parcel food delivery • Contact: 6381714029.
          </p>
        </div>

        {/* Copyright & Disclaimer */}
        <div className="mt-6 pt-6 border-t border-stone-850 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-stone-400">
          <p>© {new Date().getFullYear()} {info.name}. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Prepared with fresh spices & authentic care in Tindivanam</span>
          </p>
        </div>

      </div>
    </footer>
  );
};
