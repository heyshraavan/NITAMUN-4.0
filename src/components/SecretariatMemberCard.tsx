import React from 'react';
import { SecretariatMember } from '../data/secretariat';

export interface SecretariatMemberCardProps {
  member: SecretariatMember;
}

export const SecretariatMemberCard: React.FC<SecretariatMemberCardProps> = ({ member }) => {
  return (
    <article
      className="secretariat-card-item group relative bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-2xs hover:shadow-md select-none rounded-xs h-full"
      aria-label={`${member.name}, ${member.designation}`}
    >
      {/* Top Subtle Crimson Indicator on Card Hover */}
      <div className="absolute top-0 left-0 right-0 h-0.5 bg-[#CB1B29] opacity-0 group-hover:opacity-100 transition-opacity z-20" />

      {/* 1. Compact Portrait Photograph Container (Aspect 4/5, clean and unobstructed, no corner badges) */}
      <div className="relative w-full aspect-[4/5] bg-[#25231F]/5 overflow-hidden border-b border-[#25231F]/10">
        {member.imageWebp && member.imageJpg ? (
          <picture className="w-full h-full block">
            <source srcSet={member.imageWebp} type="image/webp" />
            <img
              src={member.imageJpg}
              alt={`Portrait of ${member.name}`}
              width={260}
              height={325}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              style={{ objectPosition: member.objectPosition || 'center top' }}
            />
          </picture>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-[#25231F]/5">
            <span className="text-[9px] font-mono-tech text-[#25231F]/40 uppercase tracking-wider">
              Photo Pending
            </span>
          </div>
        )}

        {/* Subtle Vignette on Hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#25231F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
      </div>

      {/* 2. Compact Member Information Block */}
      <div className="p-3 xl:p-3.5 flex-1 flex flex-col justify-between bg-[#F6F4EB]">
        <div>
          {/* Designation (Fixed height container for 100% uniform vertical rhythm across all 6 columns) */}
          <div className="h-9 xl:h-10 text-[10px] xl:text-[11px] font-mono-tech uppercase font-bold text-[#CB1B29] tracking-wider leading-snug line-clamp-2 mb-1">
            {member.designation}
          </div>

          {/* Full Name (Fixed height container ensuring identical baseline) */}
          <h5 className="h-6 sm:h-7 flex items-center font-serif-display text-base xl:text-lg font-bold text-[#25231F] leading-tight truncate group-hover:text-[#CB1B29] transition-colors">
            {member.name}
          </h5>

          {/* Department */}
          <div className="h-5 flex items-center text-[10px] xl:text-[11px] font-mono-tech text-[#25231F]/60 uppercase tracking-tight mt-0.5 truncate">
            {member.department}
          </div>
        </div>

        {/* 3. Restrained LinkedIn Action / Internal Registry Indicator */}
        <div className="pt-2.5 mt-2.5 border-t border-[#25231F]/10 flex items-center justify-center min-h-[30px]">
          {member.linkedInUrl ? (
            <a
              href={member.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Visit LinkedIn profile of ${member.name}`}
              className="w-full inline-flex items-center justify-center gap-1.5 py-1 px-2 bg-[#EBE9D8] text-[#25231F] hover:bg-[#CB1B29] hover:text-[#EBE9D8] border border-[#25231F]/20 hover:border-[#CB1B29] transition-all text-[10px] font-mono-tech font-semibold rounded-xs shadow-2xs group/btn focus:outline-none focus-visible:ring-2 focus-visible:ring-[#CB1B29]"
            >
              <svg
                className="w-2.5 h-2.5 fill-current shrink-0"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.4 1.4 0 1 0 0-2.8 1.4 1.4 0 0 0 0 2.8m1.39 9.74V10.13H5.07v8.37h2.78z" />
              </svg>
              <span>LinkedIn</span>
              <span className="text-[8px] transition-transform duration-200 group-hover/btn:translate-x-0.5">
                ↗
              </span>
            </a>
          ) : (
            <div className="w-full text-center py-1 px-2 text-[10px] font-mono-tech text-[#25231F]/40 uppercase tracking-tight">
              Internal Registry
            </div>
          )}
        </div>
      </div>
    </article>
  );
};
