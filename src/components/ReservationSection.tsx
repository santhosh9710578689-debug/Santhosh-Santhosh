import React, { useState } from 'react';
import { Calendar, Users, Clock, MessageCircle, Phone, CheckCircle2, Sparkles } from 'lucide-react';
import { RestaurantInfo, ReservationData } from '../types';

interface ReservationSectionProps {
  info: RestaurantInfo;
}

export const ReservationSection: React.FC<ReservationSectionProps> = ({ info }) => {
  const [formData, setFormData] = useState<ReservationData>({
    name: '',
    phone: '',
    guests: '2 to 4 People',
    date: '',
    time: '01:00 PM',
    serviceType: 'Dine-In Table',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');
  const cleanPhone = info.phone.replace(/[^0-9]/g, '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.phone) {
      alert('Please provide your name and contact phone number.');
      return;
    }

    let message = `🛎️ *BOOKING / CATERING INQUIRY - ${info.name.toUpperCase()}*\n`;
    message += `📍 Tindivanam, Tamil Nadu\n`;
    message += `------------------------------------\n`;
    message += `*Service:* ${formData.serviceType}\n`;
    message += `*Customer:* ${formData.name}\n`;
    message += `*Phone:* ${formData.phone}\n`;
    message += `*Guests / Quantity:* ${formData.guests}\n`;
    if (formData.date) message += `*Date:* ${formData.date}\n`;
    message += `*Preferred Time:* ${formData.time}\n`;
    if (formData.notes) message += `*Special Requirements:* ${formData.notes}\n`;
    message += `------------------------------------\n`;
    message += `Please confirm table availability / catering quote. Thank you!`;

    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${cleanWhatsapp}?text=${encoded}`;

    window.open(url, '_blank', 'noopener,noreferrer');
    setSubmitted(true);
  };

  return (
    <section id="reservation" className="py-16 sm:py-20 bg-stone-950 text-stone-100 scroll-mt-20 border-b border-stone-850">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Info & Catering Details */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Table Booking & Bulk Orders</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Reserve a Table or Order Bulk Catering in Tindivanam
            </h2>

            <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
              Planning a family birthday party, college celebration, tour bus stopover, or office lunch? Let our culinary team take care of hot, flavorful meals with zero hassle.
            </p>

            <div className="space-y-3.5 pt-2 text-xs sm:text-sm text-stone-300">
              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Family & AC Dining Comfort</strong>
                  <span>Reserve ahead during weekend rush or highway peak travel hours.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Bulk Biryani & Tiffin Catering</strong>
                  <span>Special packaging in food-grade buckets & thermal casseroles for functions in Tindivanam.</span>
                </div>
              </div>

              <div className="flex items-start gap-3 p-3 rounded-xl bg-stone-900 border border-stone-800">
                <CheckCircle2 className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Direct Kitchen Coordinator</strong>
                  <span>Speak directly to counter at <strong>{info.phone}</strong> for customized menu quotes.</span>
                </div>
              </div>
            </div>

            {/* Direct Dial Banner */}
            <div className="p-4 rounded-xl bg-amber-950/40 border border-amber-800/40 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs text-amber-300 block">Urgent Booking or Group Order?</span>
                <span className="text-sm font-bold text-white">Call {info.phone} directly</span>
              </div>
              <a
                href={`tel:${cleanPhone}`}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-3.5 py-2 rounded-lg font-bold text-xs shrink-0 transition"
              >
                Call Now
              </a>
            </div>

          </div>

          {/* Right Form Card */}
          <div className="lg:col-span-7">
            <div className="bg-stone-900 rounded-2xl p-6 sm:p-8 border border-stone-750 shadow-2xl">
              
              <div className="mb-6">
                <h3 className="text-xl font-bold text-white font-heading">
                  Quick Inquiry / Reservation Form
                </h3>
                <p className="text-xs text-stone-400 mt-1">
                  Fill in your details below and send instantly to our WhatsApp desk.
                </p>
              </div>

              {submitted && (
                <div className="mb-6 p-4 rounded-xl bg-emerald-950/60 border border-emerald-600/50 text-emerald-300 text-xs flex items-center justify-between">
                  <span>✓ Inquiry sent to WhatsApp! Our team will respond shortly.</span>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="text-white underline font-bold"
                  >
                    New inquiry
                  </button>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                
                {/* Service Type Selection */}
                <div>
                  <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2">
                    Service Required
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
                    {(['Dine-In Table', 'Parcel Pre-Order', 'Party / Bulk Catering'] as const).map(
                      (type) => (
                        <button
                          key={type}
                          type="button"
                          onClick={() => setFormData({ ...formData, serviceType: type })}
                          className={`p-2.5 rounded-xl border text-center transition font-semibold ${
                            formData.serviceType === type
                              ? 'bg-amber-500 text-stone-950 border-amber-400 shadow'
                              : 'bg-stone-800 text-stone-300 border-stone-700 hover:bg-stone-750'
                          }`}
                        >
                          {type}
                        </button>
                      )
                    )}
                  </div>
                </div>

                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs text-stone-300 block mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Santhosh"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full bg-stone-850 border border-stone-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">Contact Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 9876543210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full bg-stone-850 border border-stone-700 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                {/* Date, Time & Guests */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="text-xs text-stone-300 block mb-1">Preferred Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full bg-stone-850 border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">Preferred Time</label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full bg-stone-850 border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="08:00 AM">08:00 AM (Breakfast)</option>
                      <option value="09:30 AM">09:30 AM (Breakfast)</option>
                      <option value="12:30 PM">12:30 PM (Lunch)</option>
                      <option value="01:30 PM">01:30 PM (Lunch)</option>
                      <option value="05:30 PM">05:30 PM (Evening Tiffin)</option>
                      <option value="07:30 PM">07:30 PM (Dinner)</option>
                      <option value="09:00 PM">09:00 PM (Dinner)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-xs text-stone-300 block mb-1">No. of Guests / Packs</label>
                    <select
                      value={formData.guests}
                      onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                      className="w-full bg-stone-850 border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                    >
                      <option value="1 to 2 People">1 - 2 People</option>
                      <option value="3 to 5 People">3 - 5 People</option>
                      <option value="6 to 10 People">6 - 10 People</option>
                      <option value="11 to 25 People (Group)">11 - 25 People (Group)</option>
                      <option value="25+ People (Party / Catering)">25+ People (Party / Catering)</option>
                    </select>
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="text-xs text-stone-300 block mb-1">
                    Special Food Requests / Preferred Dishes
                  </label>
                  <textarea
                    rows={2}
                    placeholder="e.g. Chicken Biryani for 10 people, vegetarian tiffin combo, parcel packing for onward journey to Puducherry..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full bg-stone-850 border border-stone-700 rounded-xl p-3 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                {/* Submit to WhatsApp */}
                <button
                  type="submit"
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/50 transition transform hover:-translate-y-0.5 active:translate-y-0 text-sm"
                >
                  <MessageCircle className="w-5 h-5 fill-white" />
                  <span>Send Inquiry to WhatsApp (+91 {info.phone})</span>
                </button>

              </form>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
