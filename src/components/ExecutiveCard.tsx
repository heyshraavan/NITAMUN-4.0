import React from 'react';
import { ExecutiveProfile } from '../data/secretariat';

export interface ExecutiveCardProps {
  executive: ExecutiveProfile;
}

export const ExecutiveCard: React.FC<ExecutiveCardProps> = ({ executive }) => {
  return (
    <article
      className="executive-card-item group relative bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-xl select-none rounded-xs h-full"
      aria-labelledby={`exec-name-${executive.id}`}
    >
      {/* Top Hairline Crimson Accent Indicator on Card Hover */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#CB1B29] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      {/* 1. Large Portrait Photograph Container (Aspect 4/5, clean and unobstructed) */}
      <div className="relative w-full aspect-[4/5] bg-[#25231F]/5 overflow-hidden border-b border-[#25231F]/10">
        {/* Clean WebP with JPG fallback */}
        <picture className="w-full h-full block">
          <source srcSet={executive.imageWebp} type="image/webp" />
          <img
            src={executive.imageJpg}
            alt={`Official portrait of ${executive.name}`}
            width={480}
            height={600}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
            style={{ objectPosition: executive.objectPosition }}
          />
        </picture>

        {/* Delicate Vignette overlay for subtle depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* 2. Executive Details & Leadership Profile */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between bg-[#F6F4EB]">
        <div>
          {/* Official Designation (Strict uniform height for vertical alignment) */}
          <div className="h-5 sm:h-6 flex items-center text-xs font-mono-tech uppercase font-bold text-[#CB1B29] tracking-wider mb-1 line-clamp-1">
            {executive.designation}
          </div>

          {/* Executive Full Name (Strict uniform height for vertical alignment) */}
          <h4
            id={`exec-name-${executive.id}`}
            className="h-10 sm:h-12 flex items-center font-serif-display text-2xl font-bold text-[#25231F] leading-tight tracking-tight group-hover:text-[#CB1B29] transition-colors"
          >
            {executive.name}
          </h4>

          {/* Department / Scope of Responsibility */}
          <div className="h-5 flex items-center text-[11px] font-mono-tech text-[#25231F]/60 uppercase tracking-wide mt-1 truncate">
            {executive.department}
          </div>
        </div>

        {/* 3. Executive Social Links: WhatsApp, Instagram, LinkedIn */}
        <div className="pt-4 mt-4 border-t border-[#25231F]/10 flex items-center justify-end gap-2 min-h-[42px]">
          {/* 1. WhatsApp */}
          <a
            href={executive.whatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Chat with ${executive.name} on WhatsApp`}
            title={`WhatsApp: ${executive.name}`}
            className="w-8 h-8 rounded-xs bg-[#EBE9D8] text-[#25231F]/80 hover:bg-[#CB1B29] hover:text-[#EBE9D8] border border-[#25231F]/20 hover:border-[#CB1B29] transition-all flex items-center justify-center shadow-2xs group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB1B29]"
          >
            <svg
              className="w-3.5 h-3.5 fill-current shrink-0 transition-transform duration-200 group-hover/btn:scale-110"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24zm4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.03-1.25-.75-.67-1.26-1.5-1.41-1.75-.15-.25-.02-.39.11-.51.11-.11.25-.29.37-.44.13-.14.17-.25.25-.42.08-.17.04-.31-.02-.44-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.23.9 2.43 1.03 2.6.13.17 1.77 2.7 4.29 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.29z" />
            </svg>
          </a>

          {/* 2. Instagram */}
          <a
            href={executive.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${executive.name}'s Instagram profile`}
            title={`Instagram: ${executive.name}`}
            className="w-8 h-8 rounded-xs bg-[#EBE9D8] text-[#25231F]/80 hover:bg-[#CB1B29] hover:text-[#EBE9D8] border border-[#25231F]/20 hover:border-[#CB1B29] transition-all flex items-center justify-center shadow-2xs group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB1B29]"
          >
            <svg
              className="w-3.5 h-3.5 fill-current shrink-0 transition-transform duration-200 group-hover/btn:scale-110"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          </a>

          {/* 3. LinkedIn */}
          <a
            href={executive.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${executive.name}'s LinkedIn profile`}
            title={`LinkedIn: ${executive.name}`}
            className="w-8 h-8 rounded-xs bg-[#EBE9D8] text-[#25231F]/80 hover:bg-[#CB1B29] hover:text-[#EBE9D8] border border-[#25231F]/20 hover:border-[#CB1B29] transition-all flex items-center justify-center shadow-2xs group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB1B29]"
          >
            <svg
              className="w-3.5 h-3.5 fill-current shrink-0 transition-transform duration-200 group-hover/btn:scale-110"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74V10.13H5.07v8.37h2.78z" />
            </svg>
          </a>
        </div>
      </div>
    </article>
  );
};
