import React, { useState } from 'react';
import { FAQItem } from '../data/content';
import { ChevronDown } from 'lucide-react';

export interface FAQAccordionProps {
  items: FAQItem[];
}

export const FAQAccordion: React.FC<FAQAccordionProps> = ({ items }) => {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id || null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(items.map((item) => item.category)))];

  const filteredItems =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  const toggleItem = (id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Category Filter Pills */}
      <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#25231F]/10">
        <span className="text-xs font-mono-tech uppercase text-[#25231F]/50 mr-2">
          Filter Topics:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1 text-xs font-mono-tech uppercase tracking-wider transition-all rounded-xs cursor-pointer ${
              selectedCategory === cat
                ? 'bg-[#CB1B29] text-[#EBE9D8] font-semibold'
                : 'bg-[#F6F4EB] text-[#25231F]/70 border border-[#25231F]/15 hover:border-[#CB1B29] hover:text-[#CB1B29]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Accordion List */}
      <div className="space-y-3">
        {filteredItems.map((item, index) => {
          const isOpen = openId === item.id;
          return (
            <div
              key={item.id}
              className={`border transition-all duration-300 ${
                isOpen
                  ? 'bg-[#F6F4EB] border-[#CB1B29] shadow-xs'
                  : 'bg-[#EBE9D8]/60 border-[#25231F]/15 hover:border-[#25231F]/30 hover:bg-[#F6F4EB]/70'
              }`}
            >
              <button
                onClick={() => toggleItem(item.id)}
                className="w-full p-5 sm:p-6 text-left flex items-start justify-between gap-4 cursor-pointer focus:outline-none"
                aria-expanded={isOpen}
                aria-controls={`faq-answer-${item.id}`}
              >
                <div className="flex items-start gap-3.5">
                  <span className="font-mono-tech text-xs text-[#CB1B29] font-bold mt-1">
                    0{index + 1}
                  </span>
                  <div>
                    <h3 className="font-serif-display text-xl sm:text-2xl font-bold text-[#25231F] leading-snug">
                      {item.question}
                    </h3>
                    <span className="inline-block mt-1 text-[10px] font-mono-tech uppercase text-[#25231F]/50 px-1.5 py-0.2 bg-[#25231F]/5">
                      {item.category}
                    </span>
                  </div>
                </div>

                <div
                  className={`w-7 h-7 rounded-xs border border-[#25231F]/20 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#CB1B29] border-[#CB1B29] text-[#EBE9D8]' : 'text-[#25231F]'
                  }`}
                >
                  <ChevronDown className="w-4 h-4" />
                </div>
              </button>

              {isOpen && (
                <div
                  id={`faq-answer-${item.id}`}
                  className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#25231F]/80 font-body leading-relaxed border-t border-[#25231F]/10 animate-in fade-in duration-200"
                >
                  <p>{item.answer}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
