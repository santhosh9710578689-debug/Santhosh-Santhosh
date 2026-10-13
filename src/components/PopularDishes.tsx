import React from 'react';
import { Flame, Star, MessageCircle, Plus } from 'lucide-react';
import { POPULAR_SPECIALS } from '../data/restaurantData';
import { MenuItem, RestaurantInfo } from '../types';

interface PopularDishesProps {
  info: RestaurantInfo;
  onAddToCart: (item: MenuItem) => void;
}

export const PopularDishes: React.FC<PopularDishesProps> = ({ info, onAddToCart }) => {
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section id="specials" className="py-16 bg-stone-950 text-stone-100 border-b border-stone-850 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full mb-2">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>Customer Favorites & Signatures</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Chef's Popular Dishes in Tindivanam
            </h2>
            <p className="text-stone-400 text-sm mt-1 max-w-xl">
              Hand-picked specials that have made Veni's Food Restaurants a preferred stop for both Tindivanam residents and NH-45 travelers.
            </p>
          </div>

          <a
            href="#menu"
            className="text-xs sm:text-sm font-bold text-amber-400 hover:text-amber-300 underline underline-offset-4 self-start md:self-auto"
          >
            Explore All 25+ Dishes →
          </a>
        </div>

        {/* 4 Specials Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {POPULAR_SPECIALS.map((dish) => {
            const quickOrderMsg = encodeURIComponent(
              `Hello Veni's Food Restaurants, I would like to order "${dish.name}" (₹${dish.price}) from your popular dishes menu.`
            );

            // Construct MenuItem format for cart addition
            const asMenuItem: MenuItem = {
              id: dish.id,
              name: dish.name,
              category: 'Popular Specials',
              price: dish.price,
              description: dish.highlight,
              isVeg: dish.isVeg,
              isBestseller: true,
              imageUrl: dish.image,
            };

            return (
              <div
                key={dish.id}
                className="bg-stone-900 rounded-2xl overflow-hidden border border-stone-800 hover:border-amber-500/50 transition-all duration-300 flex flex-col justify-between group shadow-xl"
              >
                <div>
                  {/* Image Banner */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={dish.image}
                      alt={dish.name}
                      loading="lazy"
                      onError={(e) => {
                        (e.currentTarget as HTMLImageElement).src = dish.isVeg
                          ? 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=800&q=80'
                          : 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80';
                      }}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-75"></div>

                    {/* Badge */}
                    <div className="absolute top-3 left-3 bg-stone-950/90 border border-amber-500/40 text-amber-300 text-[10px] font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
                      {dish.badge}
                    </div>

                    {/* Veg/Non-Veg + Spice meter */}
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <span
                        className={`p-1 rounded bg-stone-900/90 border ${
                          dish.isVeg ? 'border-emerald-500' : 'border-red-600'
                        } flex items-center justify-center`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full ${
                            dish.isVeg ? 'bg-emerald-500' : 'bg-red-600'
                          }`}
                        />
                      </span>
                      <span className="text-[11px] text-stone-200 bg-black/60 px-2 py-0.5 rounded flex items-center gap-1">
                        <Flame className="w-3 h-3 text-amber-500" />
                        <span>{dish.spiceLevel}</span>
                      </span>
                    </div>

                    {/* Price */}
                    <div className="absolute bottom-3 right-3 bg-amber-500 text-stone-950 font-black text-sm px-2.5 py-0.5 rounded-lg">
                      ₹{dish.price}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="p-4 space-y-2">
                    <h3 className="font-bold text-base text-stone-100 group-hover:text-amber-400 transition leading-snug">
                      {dish.name}
                    </h3>
                    <p className="text-xs text-stone-400 leading-relaxed">
                      {dish.highlight}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2 border-t border-stone-800">
                  <button
                    onClick={() => onAddToCart(asMenuItem)}
                    className="flex items-center justify-center gap-1 bg-stone-800 hover:bg-stone-750 text-stone-200 py-2 rounded-xl text-xs font-semibold transition"
                  >
                    <Plus className="w-3.5 h-3.5 text-amber-400" />
                    <span>Add to Tray</span>
                  </button>

                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${quickOrderMsg}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 rounded-xl text-xs font-bold transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Order</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
