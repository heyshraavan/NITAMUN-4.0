import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
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

  return typeof document !== 'undefined' && createPortal(
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-[#25231F]/80 backdrop-blur-sm animate-in fade-in duration-200 min-h-screen min-h-[100dvh]"
      style={{
        paddingTop: 'calc(0.75rem + env(safe-area-inset-top, 0px))',
        paddingBottom: 'calc(0.75rem + env(safe-area-inset-bottom, 0px))',
        paddingLeft: 'calc(0.75rem + env(safe-area-inset-left, 0px))',
        paddingRight: 'calc(0.75rem + env(safe-area-inset-right, 0px))',
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="policy-modal-title"
      onClick={onClose}
    >
      <div
        data-lenis-prevent
        className="relative w-full max-w-2xl bg-[#F6F4EB] text-[#25231F] border border-[#25231F]/20 shadow-2xl flex flex-col rounded-xs overflow-hidden max-h-[calc(100vh-1.5rem)] max-h-[calc(100dvh-1.5rem)]"
        style={{
          maxHeight: 'calc(100dvh - 1.5rem)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header — FIXED (flex-shrink-0) */}
        <div className="flex-shrink-0 flex items-start justify-between p-5 sm:p-6 pb-4 border-b border-[#25231F]/15 bg-[#EBE9D8]">
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

        {/* Content — SCROLLABLE (flex-1 min-h-0) with native touch scrolling */}
        <div
          data-lenis-prevent
          className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-6 space-y-4 text-xs sm:text-sm font-body leading-relaxed text-[#25231F]/85 overscroll-contain"
          style={{
            WebkitOverflowScrolling: 'touch',
            touchAction: 'pan-y',
          }}
        >
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

        {/* Footer — FIXED (flex-shrink-0) */}
        <div className="flex-shrink-0 p-4 sm:p-5 border-t border-[#25231F]/15 bg-[#EBE9D8] flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2 bg-[#25231F] text-[#EBE9D8] hover:bg-[#CB1B29] transition-colors text-xs font-heading font-semibold uppercase tracking-wider rounded-xs cursor-pointer"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
