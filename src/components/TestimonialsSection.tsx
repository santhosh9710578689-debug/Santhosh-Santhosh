import React from 'react';
import { Star, MessageSquareQuote, CheckCircle2, Info, ThumbsUp } from 'lucide-react';
import { Testimonial, RestaurantInfo } from '../types';

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
  info: RestaurantInfo;
}

export const TestimonialsSection: React.FC<TestimonialsSectionProps> = ({
  testimonials,
  info,
}) => {
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  return (
    <section id="reviews" className="py-16 sm:py-20 bg-stone-900 text-stone-100 scroll-mt-20 border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
            <ThumbsUp className="w-3.5 h-3.5" />
            <span>Customer Experiences</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-stone-100 tracking-tight">
            What Diners Say About {info.name}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base">
            Feedback from Tindivanam residents, local students, and travelers stopping along the GST Road (NH45).
          </p>
        </div>

        {/* Transparent Compliance & Placeholder Notice */}
        <div className="mt-8 max-w-2xl mx-auto p-3.5 rounded-xl bg-stone-850 border border-stone-750 text-xs text-stone-400 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-stone-300">Notice for Store Owner:</strong> The reviews below represent typical guest experiences. Once your Google Business profile is live, you can replace these placeholders with direct Google Reviews.
          </span>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((test) => (
            <div
              key={test.id}
              className="bg-stone-850 rounded-2xl p-6 border border-stone-750 shadow-xl flex flex-col justify-between space-y-4 hover:border-amber-500/40 transition duration-300"
            >
              <div className="space-y-3">
                {/* Star rating */}
                <div className="flex items-center gap-1">
                  {[...Array(test.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                  <span className="text-xs text-stone-400 ml-1 font-bold">5.0 / 5.0</span>
                </div>

                {/* Comment */}
                <p className="text-sm text-stone-200 leading-relaxed italic">
                  "{test.comment}"
                </p>
              </div>

              {/* Author Info */}
              <div className="pt-3 border-t border-stone-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white">{test.name}</h4>
                  <p className="text-xs text-amber-400/90">{test.role}</p>
                </div>
                <span className="text-[10px] text-stone-500 bg-stone-900 px-2 py-0.5 rounded border border-stone-800">
                  {test.source}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Customer Review Invitation */}
        <div className="mt-12 text-center">
          <p className="text-xs sm:text-sm text-stone-400">
            Dined with us recently or ordered a parcel? We’d love to hear your feedback!
          </p>
          <a
            href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Vanakkam, I would like to share feedback about my food order from Veni's Food Restaurants.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 bg-stone-800 hover:bg-stone-750 text-amber-400 border border-stone-700 px-4 py-2 rounded-xl text-xs font-bold transition"
          >
            <MessageSquareQuote className="w-4 h-4" />
            <span>Send Us Your Feedback on WhatsApp</span>
          </a>
        </div>

      </div>
    </section>
  );
};
