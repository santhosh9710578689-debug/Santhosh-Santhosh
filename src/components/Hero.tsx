import React from 'react';
import { Phone, MessageCircle, MapPin, ArrowRight, Utensils, Star, ShieldCheck } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface HeroProps {
  info: RestaurantInfo;
  onOpenCart: () => void;
}

export const Hero: React.FC<HeroProps> = ({ info, onOpenCart }) => {
  const cleanPhone = info.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section className="relative overflow-hidden bg-stone-950 text-stone-100 pt-8 pb-16 lg:py-20">
      {/* Subtle Background Pattern & Ambient Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-amber-600 blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-red-800 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Headline, Copy & CTAs */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Local Trust Badge */}
            <div className="inline-flex items-center gap-2 bg-amber-950/70 border border-amber-600/40 px-3.5 py-1.5 rounded-full text-xs font-semibold text-amber-300">
              <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>Tindivanam's Trusted Food Destination • NH45 Highway Junction</span>
            </div>

            {/* Main Headline */}
            <div className="space-y-2">
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-stone-100 tracking-tight leading-[1.15]">
                Taste the Authentic Flavours of <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-200 to-amber-500 font-tamil-ornament">{info.name}</span>
              </h1>
              <p className="text-amber-400/90 font-medium text-base sm:text-lg">
                Fresh Tiffin • Signature Dum Biryani • Chettinad Gravies • Parottas & Tandoori
              </p>
            </div>

            {/* Value Proposition Description */}
            <p className="text-stone-300 text-sm sm:text-base leading-relaxed max-w-2xl">
              Welcome to <strong>Veni's Food Restaurants</strong> in Tindivanam, Tamil Nadu. Whether you are a local family enjoying dinner, students grabbing a quick evening bite, or travelers passing through the Chennai-Trichy-Puducherry highway, we serve wholesome, delicious meals prepared daily with aromatic spices and genuine hospitality.
            </p>

            {/* Prominent Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
              {/* WhatsApp Order Button */}
              <a
                href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Vanakkam Veni's Food Restaurants! I would like to place a food order / inquire about menu specials.")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-emerald-950/40 hover:shadow-emerald-900/60 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <MessageCircle className="w-5 h-5 fill-white" />
                <span>Order on WhatsApp</span>
              </a>

              {/* View Menu Button */}
              <a
                href="#menu"
                className="flex items-center justify-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-6 py-3.5 rounded-xl font-bold text-base shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Utensils className="w-5 h-5" />
                <span>View Full Menu</span>
                <ArrowRight className="w-4 h-4 ml-0.5" />
              </a>

              {/* Call Direct Button */}
              <a
                href={`tel:${cleanPhone}`}
                className="flex items-center justify-center gap-2 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700 hover:border-amber-500/60 px-5 py-3.5 rounded-xl font-semibold text-base transition"
              >
                <Phone className="w-5 h-5 text-amber-400" />
                <span>Call {info.phone}</span>
              </a>
            </div>

            {/* Quick Highway / Service Notice */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-stone-800/80 text-xs text-stone-300">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-amber-400 shrink-0" />
                <span>100% Fresh Daily Food</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Quick Highway Parcel</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Tindivanam Center</span>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase & Appetizing Imagery */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Main Food Feature Card */}
              <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-amber-900/40 bg-stone-900">
                <img
                  src="https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=900&q=80"
                  alt="Aromatic Dum Biryani at Veni's Food Restaurants Tindivanam"
                  className="w-full h-72 sm:h-80 object-cover transform hover:scale-105 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent"></div>
                
                <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="text-xs uppercase font-extrabold tracking-wider bg-amber-500 text-stone-950 px-2 py-0.5 rounded">
                      Speciality
                    </span>
                    <h3 className="text-xl font-bold text-white mt-1">
                      Aromatic Seeraga Samba & Basmati Biryani
                    </h3>
                    <p className="text-xs text-stone-300">
                      Cooked with tender chicken, boiled egg & rich brinjal salna
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-amber-300 block">Starting from</span>
                    <span className="text-2xl font-black text-amber-400">₹140</span>
                  </div>
                </div>
              </div>

              {/* Overlapping Secondary Card: Morning/Evening Tiffin */}
              <div className="mt-4 grid grid-cols-2 gap-3">
                <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1668236543090-82eba5ee5976?auto=format&fit=crop&w=500&q=80"
                    alt="Crispy Ghee Roast Dosa at Veni's Food Restaurants"
                    className="w-full h-28 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 to-transparent flex items-end p-2.5">
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Hot Ghee Roast Dosa</p>
                      <p className="text-[10px] text-amber-300">With 3 fresh chutneys</p>
                    </div>
                  </div>
                </div>

                <div className="relative rounded-xl overflow-hidden border border-stone-800 bg-stone-900 group">
                  <img
                    src="https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=80"
                    alt="Spicy Chicken 65 at Veni's Food Restaurants Tindivanam"
                    className="w-full h-28 object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 to-transparent flex items-end p-2.5">
                    <div>
                      <p className="text-xs font-bold text-white leading-tight">Crispy Chicken 65</p>
                      <p className="text-[10px] text-amber-300">Spicy starters & fries</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Quick Action Badge */}
              <div className="absolute -bottom-4 right-4 bg-stone-900/95 border border-amber-500/40 rounded-xl p-3 shadow-xl backdrop-blur-md hidden sm:flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  ⚡
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Quick Highway Takeaway</p>
                  <p className="text-[11px] text-stone-400">Order ahead at 6381714029</p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
