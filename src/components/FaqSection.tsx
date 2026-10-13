import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { FAQS_DATA } from '../data/restaurantData';
import { RestaurantInfo } from '../types';

interface FaqSectionProps {
  info: RestaurantInfo;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ info }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const cleanPhone = info.phone.replace(/[^0-9]/g, '');
  const cleanWhatsapp = info.whatsapp.replace(/[^0-9]/g, '');

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faqs" className="py-16 sm:py-20 bg-stone-950 text-stone-100 scroll-mt-20 border-b border-stone-850">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-950/60 border border-amber-800/40 px-3 py-1 rounded-full">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Customer Guide & Local SEO</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-100 tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-stone-300 text-sm">
            Everything you need to know about dining, ordering, and finding Veni's Food Restaurants in Tindivanam.
          </p>
        </div>

        {/* FAQs Accordion */}
        <div className="space-y-3">
          {FAQS_DATA.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className="rounded-2xl bg-stone-900 border border-stone-800 overflow-hidden transition"
              >
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-bold text-sm sm:text-base text-stone-200 hover:text-amber-400 transition"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>
                  <ChevronDown
                    className={`w-5 h-5 text-amber-400 shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs sm:text-sm text-stone-400 leading-relaxed border-t border-stone-800/60 animate-fadeIn">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="mt-10 p-5 rounded-2xl bg-stone-900 border border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="font-bold text-white text-sm">Still have questions or special requirements?</h4>
            <p className="text-xs text-stone-400 mt-0.5">
              Our front counter staff at Tindivanam will be happy to assist you immediately.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href={`tel:${cleanPhone}`}
              className="bg-amber-500 hover:bg-amber-400 text-stone-950 px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call: {info.phone}</span>
            </a>
            <a
              href={`https://wa.me/${cleanWhatsapp}?text=${encodeURIComponent("Vanakkam, I have an inquiry about Veni's Food Restaurants.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white" />
              <span>WhatsApp</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};
