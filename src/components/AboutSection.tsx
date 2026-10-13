import React from 'react';
import { UtensilsCrossed, HeartHandshake, Sparkles, Coffee, ShieldCheck, MapPin } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface AboutSectionProps {
  info: RestaurantInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ info }) => {
  return (
    <section id="about" className="py-16 sm:py-20 bg-stone-900 text-stone-100 scroll-mt-20 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Grid */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative">
              <div className="rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80"
                  alt="Authentic South Indian hospitality at Veni's Food Restaurants"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>

              {/* Decorative Floater */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-stone-950 border border-amber-500/40 rounded-2xl p-4 shadow-xl max-w-xs">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-xl bg-amber-500/20 text-amber-400">
                    <HeartHandshake className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-white">Genuine Tamil Hospitality</h4>
                    <p className="text-xs text-stone-400">Vanakkam! Serving food with heart & tradition.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Text Content */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Tradition • Taste • Freshness</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-100 tracking-tight leading-tight">
              Welcome to <span className="text-amber-400">{info.name}</span>, Tindivanam
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Located in the vibrant crossroads of <strong>Tindivanam, Tamil Nadu</strong>, <strong>Veni's Food Restaurants</strong> was founded with a simple culinary promise: to serve food that tastes like honest, comforting homestyle cooking, infused with the rich spice traditions of Tamil Nadu and modern multi-cuisine favorites.
            </p>

            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed">
              Whether you are craving crispy dosas roasted in fragrant ghee at dawn, a hearty afternoon dum biryani with brinjal salna, or sizzling chicken 65 and fluffy parottas for dinner, our kitchen operates on strict standards of freshness, hygiene, and authentic flavors.
            </p>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-850 border border-stone-800 flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
                  <UtensilsCrossed className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Authentic Spices & Oils</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Fresh ground black pepper, dry red chillies, and quality oils without shortcuts or artificial colors.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-850 border border-stone-800 flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
                  <Coffee className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Pure Tiffin & Filter Coffee</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Traditional morning & evening tiffin with freshly made idli batter and Kumbakonam degree filter coffee.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-850 border border-stone-800 flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Hygiene & Family Dining</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Clean, comfortable seating for families, students, and traveling tour groups.
                  </p>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-stone-850 border border-stone-800 flex items-start gap-3">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-lg shrink-0 mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-white">Tindivanam Highway Hub</h4>
                  <p className="text-xs text-stone-400 mt-0.5">
                    Effortless parking access for travelers driving on NH-45 between Chennai and Trichy / Puducherry.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-2 flex items-center gap-4 text-xs sm:text-sm text-stone-300">
              <span>Have dietary inquiries or group bookings?</span>
              <a
                href={`tel:${info.phone}`}
                className="text-amber-400 font-bold hover:underline"
              >
                Call: {info.phone}
              </a>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
