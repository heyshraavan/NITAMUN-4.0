import React, { useState } from 'react';
import { CommitteeItem } from '../data/content';
import { Button } from './Button';
import { useNavigation } from '../context/NavigationContext';
import { ArrowUpRight, BookOpen, FileText, CheckCircle2, X } from 'lucide-react';

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

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isModalOpen) {
        setIsModalOpen(false);
      }
    };
    if (isModalOpen) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="group relative bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] p-6 sm:p-8 flex flex-col justify-between transition-all duration-400 hover:shadow-lg hover:-translate-y-1">
        {/* Background diplomatic watermark */}
        <div className="absolute top-4 right-4 text-6xl font-serif-display font-bold text-[#25231F]/5 group-hover:text-[#CB1B29]/10 transition-colors pointer-events-none select-none">
          0{index + 1}
        </div>

        <div>
          {/* Top Row: Acronym & Council Type */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <span className="font-mono-tech text-xs text-[#CB1B29] font-bold px-2 py-0.5 bg-[#CB1B29]/10 border border-[#CB1B29]/20 uppercase">
              {committee.acronym}
            </span>
            <span className="text-[11px] font-mono-tech text-[#25231F]/60 uppercase text-right">
              {committee.type.split('/')[0]}
            </span>
          </div>

          {/* Committee Full Name */}
          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F] group-hover:text-[#CB1B29] transition-colors leading-snug mb-3">
            {committee.name}
          </h3>

          {/* Agenda Placeholder Box */}
          <div className="my-4 p-3 bg-[#EBE9D8]/70 border-l-2 border-[#CB1B29] text-xs">
            <div className="font-mono-tech text-[10px] text-[#CB1B29] font-semibold tracking-wider uppercase mb-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29]" />
              Agenda Deliberation // [STATUS: {committee.agenda.status}]
            </div>
            <p className="font-mono-tech text-[#25231F]/80 text-[11px] leading-relaxed">
              {committee.agenda.title}
            </p>
          </div>

          {/* Short Description */}
          <p className="text-sm text-[#25231F]/75 font-body leading-relaxed mb-6">
            {committee.overview}
          </p>
        </div>

        {/* Bottom Actions: Delegation format & Explore CTA */}
        <div className="pt-4 border-t border-[#25231F]/10 flex items-center justify-between gap-3">
          <div className="text-[11px] font-mono-tech text-[#25231F]/60">
            {committee.delegationType}
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 text-xs font-heading font-semibold text-[#CB1B29] hover:underline uppercase tracking-wider cursor-pointer group-hover:translate-x-0.5 transition-transform"
          >
            Explore Council
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Expanded Modal / Dossier View */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#25231F]/70 backdrop-blur-sm animate-in fade-in duration-200"
          onClick={() => setIsModalOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`modal-title-${committee.id}`}
        >
          <div
            className="relative w-full max-w-2xl bg-[#EBE9D8] border-2 border-[#CB1B29] p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 rounded-xs border border-[#25231F]/20 text-[#25231F] hover:text-[#CB1B29] hover:border-[#CB1B29] transition-colors cursor-pointer"
              aria-label="Close dossier"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Dossier Header */}
            <div className="space-y-2 border-b border-[#25231F]/15 pb-4 mb-6">
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29]">
                <span className="font-bold px-2 py-0.5 bg-[#CB1B29]/15 border border-[#CB1B29]/30">
                  {committee.acronym}
                </span>
                <span>// COMMITTEE DOSSIER & MANDATE</span>
              </div>
              <h3 id={`modal-title-${committee.id}`} className="font-serif-display text-3xl font-bold text-[#25231F]">
                {committee.name}
              </h3>
              <p className="text-xs font-mono-tech text-[#25231F]/70">
                Classification: {committee.type} • Matrix: {committee.delegationType}
              </p>
            </div>

            {/* Substantive Sections */}
            <div className="space-y-6 text-sm text-[#25231F]">
              {/* Agenda Box */}
              <div className="p-4 bg-[#F6F4EB] border-l-3 border-[#CB1B29]">
                <h4 className="text-xs font-mono-tech uppercase font-bold text-[#CB1B29] mb-1">
                  Official Committee Agenda [PLACEHOLDER]
                </h4>
                <p className="font-mono-tech text-xs text-[#25231F] font-medium leading-relaxed">
                  {committee.agenda.title}
                </p>
                <p className="text-xs text-[#25231F]/70 mt-2 font-body italic">
                  {committee.agenda.description}
                </p>
              </div>

              {/* Mandate & Legal Framework */}
              <div>
                <h4 className="text-xs font-mono-tech uppercase font-bold text-[#25231F]/70 mb-2 flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[#CB1B29]" />
                  Charter & Legal Mandate
                </h4>
                <p className="text-sm font-body text-[#25231F]/80 leading-relaxed bg-[#F6F4EB] p-3 border border-[#25231F]/10">
                  {committee.mandate}
                </p>
              </div>

              {/* Expected Outcomes */}
              <div>
                <h4 className="text-xs font-mono-tech uppercase font-bold text-[#25231F]/70 mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[#CB1B29]" />
                  Simulated Instruments & Outcomes
                </h4>
                <ul className="space-y-2">
                  {committee.expectedOutcomes.map((outcome, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs font-mono-tech text-[#25231F]/85">
                      <CheckCircle2 className="w-3.5 h-3.5 text-[#CB1B29] shrink-0 mt-0.5" />
                      <span>{outcome}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Background Guide Notice */}
              <div className="p-3 bg-[#CB1B29]/8 border border-[#CB1B29]/30 flex items-center justify-between text-xs font-mono-tech">
                <span className="text-[#CB1B29]">Background Guide:</span>
                <span className="font-bold text-[#25231F]">{committee.backgroundGuideStatus} (To be uploaded by Substantive Board)</span>
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="mt-8 pt-4 border-t border-[#25231F]/15 flex items-center justify-end gap-3">
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
      )}
    </>
  );
};
