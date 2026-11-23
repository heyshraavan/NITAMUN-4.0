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

        {/* 3. Reusable Understated LinkedIn Action */}
        <div className="pt-4 mt-4 border-t border-[#25231F]/10 flex items-center justify-end min-h-[42px]">
          <a
            href={executive.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${executive.name}'s LinkedIn profile`}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-[#EBE9D8] text-[#25231F] hover:bg-[#CB1B29] hover:text-[#EBE9D8] border border-[#25231F]/20 hover:border-[#CB1B29] transition-all text-xs font-mono-tech font-semibold rounded-xs shadow-2xs group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB1B29]"
          >
            <svg
              className="w-3.5 h-3.5 fill-current shrink-0"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74V10.13H5.07v8.37h2.78z" />
            </svg>
            <span>LinkedIn</span>
            <span className="text-[10px] transition-transform duration-200 group-hover/btn:translate-x-0.5">
              ↗
            </span>
          </a>
        </div>
      </div>
    </article>
  );
};
