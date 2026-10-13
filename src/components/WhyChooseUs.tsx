import React from 'react';
import { Car, Clock, ShieldCheck, Heart, Sparkles, Phone, PackageCheck } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface WhyChooseUsProps {
  info: RestaurantInfo;
}

export const WhyChooseUs: React.FC<WhyChooseUsProps> = ({ info }) => {
  return (
    <section id="why-us" className="py-16 sm:py-20 bg-stone-950 text-stone-100 border-b border-stone-800 scroll-mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
            <Car className="w-3.5 h-3.5" />
            <span>NH45 & Tindivanam Local Advantage</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-100 tracking-tight">
            Why Food Lovers & Highway Travelers Choose Us
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Whether you are on a family road trip to Pondicherry / Trichy or living locally in Tindivanam, here is why our dining & takeaway experience stands out.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-950 transition duration-300">
              <PackageCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
              Call-Ahead Highway Parcel
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Driving on NH-45? Call <strong className="text-stone-200">{info.phone}</strong> 20–30 minutes before reaching Tindivanam. Your food will be packed piping hot and ready for quick pickup with zero waiting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-950 transition duration-300">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
              Clean Kitchen & Fresh Oils
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              We strictly adhere to food hygiene norms. Quality oils, fresh meat and farm-sourced vegetables delivered every morning ensure your meal is safe and energizing.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-950 transition duration-300">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
              Open 7 AM Till 11 PM
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              From early morning hot idlis and crisp dosas for office goers and travelers to late night biryanis and Chinese fried rice, we serve satisfying meals throughout the day.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-stone-900 border border-stone-800 hover:border-amber-500/40 transition duration-300 space-y-3 group">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center group-hover:bg-amber-500 group-hover:text-stone-950 transition duration-300">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-bold text-white group-hover:text-amber-400 transition">
              Family & Budget Friendly
            </h3>
            <p className="text-xs text-stone-400 leading-relaxed">
              Wholesome food portions at honest, transparent prices. Enjoy comfortable dining with family, friends, or student study groups without breaking the bank.
            </p>
          </div>

        </div>

        {/* Highway Traveler Callout Banner */}
        <div className="mt-12 rounded-2xl bg-gradient-to-r from-amber-950/80 via-stone-900 to-amber-950/80 border border-amber-600/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
          <div className="space-y-2 text-center md:text-left">
            <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
              Highway Traveler Alert (Chennai • Villupuram • Pondicherry)
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Planning a pitstop at Tindivanam?
            </h3>
            <p className="text-stone-300 text-xs sm:text-sm max-w-xl">
              Don't compromise with stale highway snacks. Call our kitchen line at <strong>{info.phone}</strong> to reserve a table or order fresh travel parcel meals.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={`tel:${info.phone}`}
              className="flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-stone-950 px-5 py-3 rounded-xl font-bold text-sm shadow-md transition"
            >
              <Phone className="w-4 h-4" />
              <span>Call: {info.phone}</span>
            </a>
            <a
              href="#location"
              className="flex items-center gap-2 bg-stone-800 hover:bg-stone-700 text-stone-200 border border-stone-700 px-4 py-3 rounded-xl font-semibold text-sm transition"
            >
              <Car className="w-4 h-4 text-amber-400" />
              <span>View Route</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
