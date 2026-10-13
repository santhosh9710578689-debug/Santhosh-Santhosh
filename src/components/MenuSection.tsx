import React, { useState, useMemo } from 'react';
import { Search, Plus, MessageCircle, Flame, Sparkles, Filter, Check } from 'lucide-react';
import { MenuItem, RestaurantInfo } from '../types';
import { MENU_CATEGORIES } from '../data/restaurantData';

interface MenuSectionProps {
  items: MenuItem[];
  info: RestaurantInfo;
  onAddToCart: (item: MenuItem) => void;
  cartItemIds: Set<string>;
}

export const MenuSection: React.FC<MenuSectionProps> = ({
  items,
  info,
  onAddToCart,
  cartItemIds,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All Items');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [dietFilter, setDietFilter] = useState<'all' | 'veg' | 'non-veg'>('all');

  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      // Category match
      if (selectedCategory !== 'All Items' && item.category !== selectedCategory) {
        return false;
      }
      // Diet match
      if (dietFilter === 'veg' && !item.isVeg) return false;
      if (dietFilter === 'non-veg' && item.isVeg) return false;

      // Search match
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const matchesName = item.name.toLowerCase().includes(query);
        const matchesTamil = item.tamilName?.toLowerCase().includes(query) || false;
        const matchesDesc = item.description.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        return matchesName || matchesTamil || matchesDesc || matchesCategory;
      }

      return true;
    });
  }, [items, selectedCategory, dietFilter, searchQuery]);

  return (
    <section id="menu" className="py-16 sm:py-20 bg-stone-900 text-stone-100 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Freshly Cooked • Authentic Flavours</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-100 tracking-tight">
            Our Delicious Restaurant Menu
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            From piping hot morning tiffin to rich evening biryanis and Chinese stir-fries, discover the best of South Indian and multi-cuisine in Tindivanam.
          </p>
        </div>

        {/* Filter Controls: Search & Dietary Switch */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
          
          {/* Search Box */}
          <div className="md:col-span-7 relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search dishes (e.g. Biryani, Dosa, Parotta, Chicken 65, Coffee)..."
              className="w-full bg-stone-800 text-stone-100 pl-11 pr-4 py-2.5 rounded-xl border border-stone-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 text-sm placeholder:text-stone-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-stone-400 hover:text-white bg-stone-700 px-2 py-0.5 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Diet Filter Buttons */}
          <div className="md:col-span-5 flex items-center justify-start md:justify-end gap-2 text-xs font-semibold">
            <span className="text-stone-400 mr-1 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" /> Filter:
            </span>
            <button
              onClick={() => setDietFilter('all')}
              className={`px-3 py-2 rounded-lg transition ${
                dietFilter === 'all'
                  ? 'bg-amber-500 text-stone-950 font-bold'
                  : 'bg-stone-800 text-stone-300 hover:bg-stone-750'
              }`}
            >
              All Items
            </button>
            <button
              onClick={() => setDietFilter('veg')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                dietFilter === 'veg'
                  ? 'bg-emerald-600 text-white font-bold'
                  : 'bg-stone-800 text-emerald-400 hover:bg-stone-750'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-emerald-300 inline-block"></span>
              <span>Pure Veg</span>
            </button>
            <button
              onClick={() => setDietFilter('non-veg')}
              className={`px-3 py-2 rounded-lg transition flex items-center gap-1.5 ${
                dietFilter === 'non-veg'
                  ? 'bg-red-700 text-white font-bold'
                  : 'bg-stone-800 text-red-400 hover:bg-stone-750'
              }`}
            >
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 ring-2 ring-red-300 inline-block"></span>
              <span>Non-Veg</span>
            </button>
          </div>

        </div>

        {/* Category Horizontal Scroll Tab Bar */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar border-b border-stone-800">
          {MENU_CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`whitespace-nowrap px-4 py-2 rounded-lg text-xs sm:text-sm font-semibold transition ${
                  isActive
                    ? 'bg-amber-500 text-stone-950 shadow-md shadow-amber-500/20'
                    : 'text-stone-300 hover:text-white hover:bg-stone-800'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Menu Items Grid */}
        <div className="mt-8">
          {filteredItems.length === 0 ? (
            <div className="text-center py-12 bg-stone-800/40 rounded-2xl border border-stone-800">
              <p className="text-stone-400 text-base">No dishes found matching your current filter.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All Items');
                  setSearchQuery('');
                  setDietFilter('all');
                }}
                className="mt-3 text-xs text-amber-400 underline font-semibold"
              >
                Reset filters to view all dishes
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredItems.map((item) => {
                const isInCart = cartItemIds.has(item.id);
                const quickOrderText = encodeURIComponent(
                  `Hello Veni's Food Restaurants, I want to order "${item.name}" (₹${item.price}) for takeaway/delivery in Tindivanam.`
                );

                return (
                  <div
                    key={item.id}
                    className="bg-stone-800/80 rounded-2xl overflow-hidden border border-stone-700/60 hover:border-amber-500/50 transition duration-300 flex flex-col justify-between group shadow-lg"
                  >
                    <div>
                      {/* Image Thumbnail with Badges */}
                      <div className="relative h-48 overflow-hidden bg-stone-900">
                        <img
                          src={item.imageUrl}
                          alt={item.name}
                          loading="lazy"
                          onError={(e) => {
                            // Fallback to high reliability dish image if network issue occurs
                            (e.currentTarget as HTMLImageElement).src = item.isVeg
                              ? 'https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=700&q=80'
                              : 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=700&q=80';
                          }}
                          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent opacity-60"></div>
                        
                        {/* Food Badges */}
                        <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                          {/* FSSAI Veg / Non-Veg Indicator */}
                          <span
                            className={`p-1 rounded bg-stone-900/90 border ${
                              item.isVeg ? 'border-emerald-500' : 'border-red-600'
                            } flex items-center justify-center`}
                            title={item.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                          >
                            <span
                              className={`w-2.5 h-2.5 rounded-full ${
                                item.isVeg ? 'bg-emerald-500' : 'bg-red-600'
                              }`}
                            ></span>
                          </span>

                          {item.isBestseller && (
                            <span className="bg-amber-500 text-stone-950 text-[10px] font-black uppercase px-2 py-0.5 rounded shadow">
                              Bestseller
                            </span>
                          )}

                          {item.isSpecial && (
                            <span className="bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded shadow flex items-center gap-1">
                              <Flame className="w-3 h-3" /> Special
                            </span>
                          )}
                        </div>

                        {/* Price Tag Overlay */}
                        <div className="absolute bottom-3 right-3 bg-stone-950/90 border border-amber-500/40 text-amber-400 font-extrabold text-base px-2.5 py-1 rounded-lg shadow">
                          ₹{item.price}
                        </div>
                      </div>

                      {/* Content Info */}
                      <div className="p-4 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-bold text-base text-stone-100 group-hover:text-amber-400 transition leading-snug">
                              {item.name}
                            </h3>
                            {item.tamilName && (
                              <p className="text-xs text-amber-300/80 font-tamil-ornament">
                                {item.tamilName}
                              </p>
                            )}
                          </div>
                        </div>

                        <p className="text-xs text-stone-400 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Action Footer */}
                    <div className="p-4 pt-0 grid grid-cols-2 gap-2 mt-2 border-t border-stone-700/50">
                      {/* Add to WhatsApp Order Tray */}
                      <button
                        onClick={() => onAddToCart(item)}
                        className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold transition ${
                          isInCart
                            ? 'bg-amber-500/20 text-amber-400 border border-amber-500/40'
                            : 'bg-amber-500 hover:bg-amber-400 text-stone-950 shadow-sm'
                        }`}
                      >
                        {isInCart ? (
                          <>
                            <Check className="w-3.5 h-3.5" />
                            <span>Added</span>
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" />
                            <span>Add to Tray</span>
                          </>
                        )}
                      </button>

                      {/* Quick WhatsApp Order */}
                      <a
                        href={`https://wa.me/${cleanWhatsapp}?text=${quickOrderText}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1 bg-emerald-600 hover:bg-emerald-500 text-white py-2 px-3 rounded-xl text-xs font-bold transition shadow-sm"
                        title="Order this dish directly on WhatsApp"
                      >
                        <MessageCircle className="w-3.5 h-3.5 fill-white" />
                        <span>Order Now</span>
                      </a>
                    </div>

                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Clear Notice / Customization Information */}
        <div className="mt-12 p-4 sm:p-5 rounded-2xl bg-stone-850 border border-amber-900/30 text-stone-300 text-xs sm:text-sm flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="font-bold text-amber-400">
              📌 Need special dietary options or bulk orders?
            </p>
            <p className="text-stone-400">
              Menu prices and items shown represent our daily favorites. Call <strong className="text-stone-200">{info.phone}</strong> or send a message on WhatsApp for custom spice levels, Jain options, or party catering.
            </p>
          </div>
          <a
            href={`tel:${info.phone}`}
            className="shrink-0 bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 px-4 py-2 rounded-xl font-bold text-xs"
          >
            Call Chef / Counter
          </a>
        </div>

      </div>
    </section>
  );
};
