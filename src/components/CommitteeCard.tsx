import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { CommitteeItem } from '../data/content';
import { Button } from './Button';
import { CommitteeInsignia } from './CommitteeInsignia';
import { useNavigation } from '../context/NavigationContext';
import { lockBackgroundScroll, unlockBackgroundScroll } from '../lib/scroll';
import { ArrowUpRight, X } from 'lucide-react';

export interface CommitteeCardProps {
  committee: CommitteeItem;
  index: number;
}

export const CommitteeCard: React.FC<CommitteeCardProps> = ({
  committee,
  index,
}) => {
  const { navigateTo } = useNavigation();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!isModalOpen) return;

    lockBackgroundScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsModalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockBackgroundScroll();
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="group relative bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] p-6 sm:p-8 flex flex-col justify-between transition-all duration-400 hover:shadow-xl hover:-translate-y-1.5 rounded-xs overflow-hidden">
        {/* Subtle top crimson hairline accent expanding on hover */}
        <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-[#CB1B29] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

        {/* Oversized Translucent Committee Insignia Watermark */}
        <div className="absolute -bottom-10 -right-10 w-56 h-56 text-[#25231F]/5 group-hover:text-[#CB1B29]/15 group-hover:scale-108 group-hover:rotate-2 transition-all duration-500 pointer-events-none select-none">
          <CommitteeInsignia id={committee.id} size="100%" />
        </div>

        {/* Background Numeric Index */}
        <div className="absolute top-4 right-6 text-5xl font-serif-display font-bold text-[#25231F]/5 group-hover:text-[#CB1B29]/10 transition-colors pointer-events-none select-none">
          0{index + 1}
        </div>

        <div className="relative z-10">
          {/* Top Row: Acronym Badge & Council Type */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="font-mono-tech text-xs text-[#CB1B29] font-bold px-2.5 py-0.5 bg-[#CB1B29]/10 border border-[#CB1B29]/25 uppercase tracking-wide">
              {committee.acronym}
            </span>
            <span className="text-[11px] font-mono-tech text-[#25231F]/60 uppercase text-right font-medium">
              {committee.type.split('/')[0].trim()}
            </span>
          </div>

          {/* Committee Full Name */}
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F] group-hover:text-[#CB1B29] transition-colors leading-snug mb-3">
            {committee.name}
          </h3>

          {/* Agenda Status Box */}
          <div className="my-4 p-3.5 bg-[#EBE9D8]/80 border-l-3 border-[#CB1B29] text-xs shadow-2xs">
            <div className="font-mono-tech text-[10px] text-[#CB1B29] font-bold tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29] animate-pulse" />
              <span>OFFICIAL AGENDA</span>
            </div>
            <p className="font-serif-display text-xl sm:text-2xl font-bold text-[#25231F] tracking-tight">
              TO BE ANNOUNCED
            </p>
          </div>

          {/* Short Description */}
          <p className="text-sm text-[#25231F]/75 font-body leading-relaxed mb-6">
            {committee.overview}
          </p>
        </div>

        {/* Bottom Actions: Delegation format & Explore CTA */}
        <div className="relative z-10 pt-4 border-t border-[#25231F]/10 flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono-tech text-[#25231F]/60 uppercase tracking-wide">
            {committee.delegationType}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xs bg-[#25231F] hover:bg-[#CB1B29] text-[#EBE9D8] text-xs font-heading font-semibold uppercase tracking-wider transition-colors cursor-pointer group/btn"
          >
            <span>Explore Council</span>
            <ArrowUpRight className="w-3.5 h-3.5 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>

      {/* Expanded Modal / Diplomatic Dossier View — Rendered via Portal directly into document.body */}
      {isModalOpen && typeof document !== 'undefined' && createPortal(
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#25231F]/80 backdrop-blur-sm animate-in fade-in duration-200 min-h-screen min-h-[100dvh]"
          style={{
            paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))',
            paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
            paddingLeft: 'calc(0.75rem + env(safe-area-inset-left, 0px))',
            paddingRight: 'calc(0.75rem + env(safe-area-inset-right, 0px))',
          }}
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${committee.id}`}
        >
          <div
            data-lenis-prevent
            className="relative w-full max-w-2xl bg-[#EBE9D8] border-2 border-[#25231F]/30 shadow-2xl flex flex-col rounded-xs overflow-hidden max-h-[calc(100vh-1.5rem)] max-h-[calc(100dvh-1.5rem)]"
            style={{
              maxHeight: 'calc(100dvh - 1.5rem)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Archival Header Banner */}
            <div className="flex-shrink-0 px-4 sm:px-6 py-1.5 bg-[#25231F] text-[#EBE9D8] text-[10px] font-mono-tech tracking-widest uppercase flex items-center justify-between border-b border-[#CB1B29]/40">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29]" />
                COMMITTEE DOSSIER • NITAMUN 4.0
              </span>
              <span className="text-[#CB1B29] font-bold">REF: NITAMUN-4.0/{committee.acronym}</span>
            </div>

            {/* Modal Header — FIXED (flex-shrink-0), stays visible & accessible at all times */}
            <div className="flex-shrink-0 p-5 sm:p-6 border-b border-[#25231F]/15 bg-[#F6F4EB] relative flex items-start gap-4 pr-14 sm:pr-16">
              {/* Committee Insignia Crest Seal */}
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xs border border-[#CB1B29]/30 bg-[#EBE9D8] p-1.5 flex items-center justify-center text-[#CB1B29] shrink-0 shadow-xs">
                <CommitteeInsignia id={committee.id} size="100%" />
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2 text-xs font-mono-tech text-[#CB1B29] mb-1">
                  <span className="font-bold px-2 py-0.5 bg-[#CB1B29] text-[#EBE9D8] rounded-2xs">
                    {committee.acronym}
                  </span>
                  <span className="text-[#25231F]/60 text-[10px] sm:text-[11px] uppercase tracking-wider">
                    {committee.type}
                  </span>
                </div>
                <h3 id={`modal-title-${committee.id}`} className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F] leading-tight">
                  {committee.name}
                </h3>
                <p className="text-xs font-mono-tech text-[#25231F]/70 mt-1">
                  Matrix: {committee.delegationType}
                </p>
              </div>

              {/* Close Button — Permanently accessible in header */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 sm:top-5 sm:right-5 p-2 rounded-xs border border-[#25231F]/20 text-[#25231F] hover:text-[#EBE9D8] hover:bg-[#CB1B29] hover:border-[#CB1B29] bg-[#EBE9D8] transition-colors cursor-pointer"
                aria-label="Close dossier"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Scrollable Substantive Dossier Sections — flex-1 min-h-0 with native touch scrolling */}
            <div
              data-lenis-prevent
              className="relative flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-6 text-sm text-[#25231F] overscroll-contain bg-[#EBE9D8]"
              style={{
                WebkitOverflowScrolling: 'touch',
                touchAction: 'pan-y',
              }}
            >
              {/* Background Watermark Insignia inside Dossier */}
              <div className="absolute right-4 bottom-6 w-72 h-72 text-[#25231F]/4 pointer-events-none select-none">
                <CommitteeInsignia id={committee.id} size="100%" />
              </div>

              {/* Section 1: Official Committee Agenda */}
              <div className="relative z-10 p-6 sm:p-8 bg-[#F6F4EB] border-l-4 border-[#CB1B29] shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-mono-tech uppercase font-bold text-[#CB1B29] tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#CB1B29] animate-pulse" />
                    OFFICIAL COMMITTEE AGENDA
                  </h4>
                  <span className="text-[10px] font-mono-tech uppercase px-2.5 py-0.5 rounded-2xs bg-[#CB1B29]/10 text-[#CB1B29] font-bold border border-[#CB1B29]/25">
                    STATUS: TBA
                  </span>
                </div>
                <div className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#25231F]">
                  TO BE ANNOUNCED
                </div>
                <p className="text-xs sm:text-sm font-mono-tech text-[#25231F]/65 pt-1 border-t border-[#25231F]/10">
                  The substantive agenda and consultative debate topics will be formally unveiled by the Executive Board prior to delegate accreditation.
                </p>
              </div>

              {/* Section 2: Portfolio Matrix */}
              <div className="relative z-10 p-6 sm:p-8 bg-[#F6F4EB] border-l-4 border-[#25231F] shadow-xs space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-xs font-mono-tech uppercase font-bold text-[#25231F]/70 tracking-widest flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-[#25231F]/40" />
                    PORTFOLIO MATRIX
                  </h4>
                  <span className="text-[10px] font-mono-tech uppercase px-2.5 py-0.5 rounded-2xs bg-[#25231F]/10 text-[#25231F] font-bold border border-[#25231F]/20">
                    STATUS: TBA
                  </span>
                </div>
                <div className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#25231F]">
                  TO BE ANNOUNCED
                </div>
                <p className="text-xs sm:text-sm font-mono-tech text-[#25231F]/65 pt-1 border-t border-[#25231F]/10">
                  Country matrix, sovereign representations, and specialized character allocations will be published alongside committee accreditation guidelines.
                </p>
              </div>
            </div>

            {/* Modal Footer Actions — FIXED (flex-shrink-0), always visible and accessible */}
            <div className="flex-shrink-0 p-4 sm:p-5 border-t border-[#25231F]/15 bg-[#F6F4EB] flex items-center justify-between gap-3">
              <div className="hidden sm:block text-xs font-mono-tech text-[#25231F]/60">
                Accreditation Protocol
              </div>
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close Dossier
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setIsModalOpen(false);
                    navigateTo('registration');
                  }}
                  withArrow
                >
                  Apply for {committee.acronym}
                </Button>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
};
