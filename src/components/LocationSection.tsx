import React from 'react';
import { MapPin, Navigation, Phone, MessageCircle, Clock, ExternalLink, HelpCircle, Edit3 } from 'lucide-react';
import { RestaurantInfo } from '../types';

interface LocationSectionProps {
  info: RestaurantInfo;
  onOpenOwnerSettings: () => void;
}

export const LocationSection: React.FC<LocationSectionProps> = ({ info, onOpenOwnerSettings }) => {
  const cleanPhone = info.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  // Embed URL for Tindivanam, Tamil Nadu
  const mapEmbedUrl =
    "https://maps.google.com/maps?q=Tindivanam%2C%20Tamil%20Nadu%20604001&t=&z=14&ie=UTF8&iwloc=&output=embed";

  return (
    <section id="location" className="py-16 sm:py-20 bg-stone-900 text-stone-100 scroll-mt-20 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
            <MapPin className="w-3.5 h-3.5" />
            <span>Find Us in Tindivanam</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-100 tracking-tight">
            Restaurant Location & Directions
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Easily accessible from Tindivanam Town, Bus Stand, and the Chennai-Trichy NH-45 Highway Junction.
          </p>
        </div>

        {/* Location Layout */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Address & Quick Contact Card (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Main Address Card */}
            <div className="p-6 rounded-2xl bg-stone-850 border border-stone-750 shadow-xl space-y-5">
              <div>
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-amber-400 uppercase tracking-widest">
                    Restaurant Address
                  </span>
                  <button
                    onClick={onOpenOwnerSettings}
                    className="text-[11px] text-stone-400 hover:text-amber-300 flex items-center gap-1 bg-stone-800 hover:bg-stone-750 px-2 py-0.5 rounded transition"
                    title="Customize address in Owner Settings"
                  >
                    <Edit3 className="w-3 h-3" />
                    <span>Edit Address</span>
                  </button>
                </div>
                <h3 className="text-2xl font-bold text-white mt-1 font-heading">
                  {info.name}
                </h3>
              </div>

              {/* Address details */}
              <div className="space-y-2 text-sm text-stone-300 border-l-2 border-amber-500 pl-4 py-1">
                <p className="font-semibold text-amber-200">
                  {info.addressLine1}
                </p>
                <p className="text-stone-300">{info.addressLine2}</p>
                <p className="text-stone-200 font-medium">
                  {info.city}, {info.state} - {info.pincode}, India
                </p>
                <p className="text-xs text-stone-400 pt-1">
                  Landmark: {info.landmark}
                </p>
              </div>

              {/* Exact Address Note */}
              <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-900/50 text-xs text-amber-300/90 flex items-start gap-2">
                <HelpCircle className="w-4 h-4 shrink-0 text-amber-400 mt-0.5" />
                <span>
                  <strong>Note for Visitors:</strong> Exact street number/building name is currently set as a placeholder. You can reach the restaurant by calling <strong>{info.phone}</strong> for instant directions!
                </span>
              </div>

              {/* Operating Hours Breakdown */}
              <div className="space-y-2.5 pt-2 border-t border-stone-750 text-xs text-stone-300">
                <div className="flex items-center justify-between font-semibold text-white">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5 text-amber-400" />
                    <span>Operating Hours</span>
                  </span>
                  <span className="text-emerald-400">Open 7 Days a Week</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                  <div className="bg-stone-900 p-2 rounded-lg border border-stone-800">
                    <span className="text-amber-400 font-bold block">Breakfast / Tiffin</span>
                    <span>{info.breakfastHours}</span>
                  </div>
                  <div className="bg-stone-900 p-2 rounded-lg border border-stone-800">
                    <span className="text-amber-400 font-bold block">Meals & Biryani</span>
                    <span>{info.lunchHours}</span>
                  </div>
                  <div className="bg-stone-900 p-2 rounded-lg border border-stone-800 col-span-2">
                    <span className="text-amber-400 font-bold block">Evening Tiffin & Dinner</span>
                    <span>{info.dinnerHours}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2.5 pt-2">
                <a
                  href={info.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition text-sm"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Driving Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 ml-1" />
                </a>

                <div className="grid grid-cols-2 gap-2">
                  <a
                    href={`tel:${cleanPhone}`}
                    className="bg-stone-800 hover:bg-stone-750 text-stone-200 border border-stone-700 py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs transition"
                  >
                    <Phone className="w-3.5 h-3.5 text-amber-400" />
                    <span>Call: {info.phone}</span>
                  </a>

                  <a
                    href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Vanakkam, I am near Tindivanam. Could you share your exact location landmark?")}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-emerald-600 hover:bg-emerald-500 text-white py-2.5 px-3 rounded-xl flex items-center justify-center gap-1.5 font-bold text-xs transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5 fill-white" />
                    <span>Ask on WhatsApp</span>
                  </a>
                </div>
              </div>

            </div>

          </div>

          {/* Interactive Google Map Embed (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="rounded-2xl overflow-hidden border border-stone-750 shadow-2xl bg-stone-950 relative h-[420px] sm:h-[480px]">
              <iframe
                title="Google Maps Location of Tindivanam, Tamil Nadu"
                src={mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full grayscale-[20%] contrast-[1.1]"
              />

              {/* Floating Overlay Badge on Map */}
              <div className="absolute top-4 left-4 bg-stone-950/90 backdrop-blur-md border border-amber-500/40 rounded-xl p-3 shadow-xl max-w-xs text-xs text-stone-200">
                <div className="flex items-center gap-2 text-amber-400 font-bold mb-1">
                  <MapPin className="w-4 h-4" />
                  <span>Veni's Food Restaurants</span>
                </div>
                <p className="text-stone-400 text-[11px]">
                  Tindivanam, Tamil Nadu (NH45 Junction)
                </p>
                <a
                  href={info.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 inline-flex items-center gap-1 text-[11px] text-amber-300 font-bold hover:underline"
                >
                  <span>Open Full Screen Map</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Travel Distance & Route Guide */}
            <div className="p-4 rounded-xl bg-stone-850 border border-stone-800 text-xs text-stone-300 grid grid-cols-1 sm:grid-cols-3 gap-3 text-center">
              <div>
                <span className="text-stone-400 block">From Chennai (Airport/Tambaram)</span>
                <span className="font-bold text-white">~105 km via GST Road (NH45)</span>
              </div>
              <div>
                <span className="text-stone-400 block">From Puducherry (Pondy)</span>
                <span className="font-bold text-white">~38 km via Tindivanam-Pondy Rd</span>
              </div>
              <div>
                <span className="text-stone-400 block">From Villupuram Junction</span>
                <span className="font-bold text-white">~35 km via NH45 Highway</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
