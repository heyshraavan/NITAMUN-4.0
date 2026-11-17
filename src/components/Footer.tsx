import React from 'react';
import { useNavigation } from '../context/NavigationContext';
import { conferenceConfig, NavDestinationId } from '../data/config';
import { ArrowUp, Mail, Globe2 } from 'lucide-react';
import officialEmblem from '../assets/emblem-sm.jpg';
import officialEmblemWebp from '../assets/emblem-sm.webp';

export const Footer: React.FC = () => {
  const { navigateTo } = useNavigation();

  const handleScrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#25231F] text-[#EBE9D8] pt-20 pb-28 sm:pb-24 border-t-2 border-[#CB1B29] overflow-hidden">
      {/* Background Diplomatic Grid Pattern */}
      <div 
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          backgroundImage: 'radial-gradient(#EBE9D8 1px, transparent 1px)',
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-[#EBE9D8]/15">
          {/* Col 1: Identity & Positioning (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-3">
              <div className="official-emblem w-12 h-12 rounded-full overflow-hidden border border-[#CB1B29]/40 bg-[#700F2B] flex items-center justify-center shrink-0 shadow-md">
                <picture className="w-full h-full block">
                  <source srcSet={officialEmblemWebp} type="image/webp" />
                  <img
                    src={officialEmblem}
                    alt="NITAMUN 4.0 Official Emblem"
                    width={48}
                    height={48}
                    loading="lazy"
                    className="w-full h-full object-cover scale-[1.08] !opacity-100"
                  />
                </picture>
              </div>
              <div>
                <span className="font-serif-display text-2xl font-bold tracking-tight text-[#EBE9D8]">
                  {conferenceConfig.name} {conferenceConfig.editionRoman}
                </span>
                <span className="block text-xs font-mono-tech text-[#CB1B29] tracking-wider uppercase">
                  {conferenceConfig.dates.mode} Conference
                </span>
              </div>
            </div>

            <p className="font-serif-display italic text-xl text-[#EBE9D8]/90 max-w-md">
              "{conferenceConfig.tagline}"
            </p>

            <p className="text-sm text-[#EBE9D8]/65 font-body leading-relaxed max-w-md">
              A flagship online Model United Nations conference organised by MUNSOC, 
              National Institute of Technology Agartala. Bringing together students and working professionals 
              to experience diplomacy, debate, and international relations.
            </p>

            <div className="flex items-center gap-4 pt-2">
              {/* Instagram: https://www.instagram.com/munsoc.nita/ */}
              <a
                href={conferenceConfig.contacts.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs border border-[#EBE9D8]/20 flex items-center justify-center text-[#EBE9D8]/80 hover:text-[#CB1B29] hover:border-[#CB1B29] transition-colors"
                aria-label="Instagram @munsoc.nita"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>

              {/* LinkedIn: https://www.linkedin.com/company/munsoc-nita/ */}
              <a
                href={conferenceConfig.contacts.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xs border border-[#EBE9D8]/20 flex items-center justify-center text-[#EBE9D8]/80 hover:text-[#CB1B29] hover:border-[#CB1B29] transition-colors"
                aria-label="LinkedIn MUNSOC NIT Agartala"
              >
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>

              {/* Email: munsoc.nita@gmail.com */}
              <a
                href={`mailto:${conferenceConfig.contacts.email}`}
                className="w-9 h-9 rounded-xs border border-[#EBE9D8]/20 flex items-center justify-center text-[#EBE9D8]/80 hover:text-[#CB1B29] hover:border-[#CB1B29] transition-colors"
                aria-label="Email munsoc.nita@gmail.com"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: The Six Primary Destinations (3 cols) */}
          <div className="lg:col-span-3 space-y-4">
            <h4 className="text-xs font-mono-tech tracking-widest text-[#CB1B29] uppercase">
              // Primary Destinations
            </h4>
            <ul className="space-y-2.5">
              {conferenceConfig.destinations.map((dest, idx) => (
                <li key={dest.id}>
                  <button
                    onClick={() => navigateTo(dest.id as NavDestinationId)}
                    className="text-sm text-[#EBE9D8]/75 hover:text-[#CB1B29] hover:translate-x-1 transition-all flex items-center gap-2 group cursor-pointer text-left"
                  >
                    <span className="font-mono-tech text-[10px] text-[#CB1B29]/60 group-hover:text-[#CB1B29]">
                      0{idx + 1}
                    </span>
                    <span>{dest.label}</span>
                    {dest.badge && (
                      <span className="text-[9px] font-mono-tech px-1.5 py-0.2 rounded-xs bg-[#CB1B29]/20 text-[#CB1B29]">
                        {dest.badge}
                      </span>
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Secretariat & Inquiries (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-mono-tech tracking-widest text-[#CB1B29] uppercase">
              // Secretariat Headquarters &amp; Format
            </h4>

            <div className="space-y-3 text-xs font-mono-tech text-[#EBE9D8]/70">
              <div className="flex items-start gap-2.5">
                <Globe2 className="w-4 h-4 text-[#CB1B29] shrink-0 mt-0.5" />
                <span>
                  {conferenceConfig.organizer.chapter}<br />
                  {conferenceConfig.organizer.parentInstitute}
                </span>
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <Mail className="w-4 h-4 text-[#CB1B29] shrink-0" />
                <a
                  href={`mailto:${conferenceConfig.contacts.email}`}
                  className="hover:text-[#CB1B29] transition-colors"
                >
                  {conferenceConfig.contacts.email}
                </a>
              </div>

              <div className="pt-2 border-t border-[#EBE9D8]/10 space-y-1">
                <div className="text-[11px] text-[#EBE9D8]/50 uppercase">Conference Information:</div>
                <div>Dates: {conferenceConfig.dates.displayDate}</div>
                <div>Mode: Flagship Online Conference</div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => navigateTo('contact')}
                  className="text-[#CB1B29] hover:underline font-semibold flex items-center gap-1.5 uppercase cursor-pointer"
                >
                  Submit Inquiry via Secretariat Desk →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech text-[#EBE9D8]/50">
          <div>
            © {new Date().getFullYear()} {conferenceConfig.name} {conferenceConfig.editionRoman} • {conferenceConfig.organizer.chapter}. All rights reserved.
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[11px] text-[#CB1B29]">
              Designed with Diplomatic Precision
            </span>
            <button
              onClick={handleScrollTop}
              className="group inline-flex items-center gap-2 text-[#EBE9D8]/75 hover:text-[#CB1B29] transition-colors cursor-pointer"
              aria-label="Back to top"
            >
              <span>TOP OF DISCOURSE</span>
              <span className="w-6 h-6 rounded-xs border border-[#EBE9D8]/20 flex items-center justify-center group-hover:border-[#CB1B29] group-hover:-translate-y-0.5 transition-all">
                <ArrowUp className="w-3 h-3" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
