import React, { useEffect } from 'react';
import { lockBackgroundScroll, unlockBackgroundScroll } from '../lib/scroll';
import { X, ShieldCheck, FileText } from 'lucide-react';

interface PolicyModalProps {
  type: 'terms' | 'privacy' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  useEffect(() => {
    if (!type) return;

    lockBackgroundScroll();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      unlockBackgroundScroll();
    };
  }, [type, onClose]);

  if (!type) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 overscroll-contain"
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-2xl max-h-[85vh] overflow-y-auto bg-[#F6F4EB] text-[#25231F] border border-[#25231F]/20 shadow-2xl p-6 sm:p-8 overscroll-contain"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#25231F]/15 mb-6">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xs bg-[#CB1B29]/10 text-[#CB1B29] flex items-center justify-center shrink-0">
              {type === 'terms' ? <FileText className="w-5 h-5" /> : <ShieldCheck className="w-5 h-5" />}
            </span>
            <div>
              <span className="text-[11px] font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block">
                {type === 'terms' ? 'DELEGATE AGREEMENT' : 'DATA GOVERNANCE'}
              </span>
              <h3 id="policy-modal-title" className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                {type === 'terms' ? 'Terms & Conditions' : 'Privacy Policy'}
              </h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-[#25231F]/60 hover:text-[#CB1B29] hover:bg-[#25231F]/5 rounded-xs transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="space-y-4 text-xs sm:text-sm font-body leading-relaxed text-[#25231F]/85">
          {type === 'terms' ? (
            <>
              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  1. Diplomatic Decorum &amp; Code of Conduct
                </h4>
                <p>
                  All participants must uphold the highest standards of parliamentary decorum, diplomatic respect, and intellectual integrity. Harassment, hate speech, or deliberate procedural disruption will result in immediate disqualification without refund.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  2. Portfolio Allocation Policy
                </h4>
                <p>
                  Committee and country portfolio allocations are determined by the Substantive Board based on delegate preference order, past MUN experience, and registration timestamps. The Secretariat’s allocation decision is final.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  3. Non-Transferability
                </h4>
                <p>
                  Allocated delegate portfolios and virtual room credentials are strictly non-transferable and may only be utilized by the accredited individual delegate.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  4. Academic Integrity &amp; Originality
                </h4>
                <p>
                  Working papers, draft resolutions, and position papers must represent the delegate's authentic original research. Plagiarism or unauthorized automated generation without attribution will forfeit eligibility for committee awards.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  5. Online Infrastructure Requirements
                </h4>
                <p>
                  As an online conference, delegates are responsible for securing a stable internet connection, operational microphone, and webcam for verified parliamentary caucuses.
                </p>
              </div>
            </>
          ) : (
            <>
              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  1. Information Collected
                </h4>
                <p>
                  NITAMUN 4.0 collects your full name, email address, phone number, gender, academic affiliation, and past MUN experience solely to process accreditation and allocate portfolios.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  2. Purpose of Processing
                </h4>
                <p>
                  Data is processed strictly for conference administration, session access links, background guide dissemination, and certificate of statesmanship issuance.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  3. Non-Disclosure &amp; Third Parties
                </h4>
                <p>
                  We do not sell, rent, monetize, or disclose your personal information to commercial third parties. Data is accessible solely to authorized members of the MUNSOC Executive Secretariat.
                </p>
              </div>

              <div>
                <h4 className="font-heading font-bold text-[#25231F] text-sm mb-1">
                  4. Communications &amp; Data Retention
                </h4>
                <p>
                  Contact details are utilized exclusively for official conference announcements and post-conference awards dispatch. Delegates may contact the Secretariat at any time to request data removal after the conference conclusion.
                </p>
              </div>
            </>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-4 border-t border-[#25231F]/15 flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#25231F] text-[#EBE9D8] hover:bg-[#CB1B29] transition-colors text-xs font-heading font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};
