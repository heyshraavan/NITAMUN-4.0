import React from 'react';
import { conferenceConfig } from '../data/config';
import { SectionHeading } from '../components/SectionHeading';
import { useNavigation } from '../context/NavigationContext';
import { Button } from '../components/Button';
import { StatusBadge } from '../components/StatusBadge';
import { CheckCircle2, Clock, ShieldCheck, AlertCircle, Sparkles, Mail } from 'lucide-react';

export const RegistrationPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="w-full pt-28 sm:pt-36 pb-32 bg-[#EBE9D8] text-[#25231F] min-h-screen">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <SectionHeading
          sectionNumber="05"
          eyebrow="DELEGATE ACCREDITATION & ADMISSIONS"
          title="Delegate Registration"
          titleAccent="NITAMUN 4.0 Online"
          subtitle="Accreditation is open exclusively for individual delegates. High school scholars, undergraduate scholars, postgraduate researchers, and working professionals are warmly invited to apply."
        />

        {/* Live Status Banner — Clearly marked as awaiting official registration link */}
        <div className="mb-12 p-5 bg-[#F6F4EB] border-l-4 border-[#CB1B29] shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-3">
            <StatusBadge label={conferenceConfig.registration.statusLabel} isPulsing />
            <span className="text-[#25231F]/80 uppercase font-semibold">
              OFFICIAL REGISTRATION PORTAL AWAITING RELEASE
            </span>
          </div>
          <div className="flex items-center gap-2 text-[#CB1B29] font-bold">
            <Clock className="w-3.5 h-3.5" />
            <span>EARLY BIRD DEADLINE: NOV 30, 2025</span>
          </div>
        </div>

        {/* Single Track: Individual Delegate Registration Card */}
        <div className="mb-16 p-8 sm:p-12 bg-[#F6F4EB] border border-[#25231F]/15 relative overflow-hidden shadow-sm">
          {/* Track Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-[#25231F]/10 mb-8">
            <div>
              <span className="font-mono-tech text-xs text-[#CB1B29] font-bold uppercase tracking-wider block mb-1">
                SINGLE ACCREDITATION TRACK
              </span>
              <h2 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F]">
                Individual Delegate Registration
              </h2>
            </div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#CB1B29]/10 text-[#CB1B29] text-xs font-mono-tech font-bold uppercase rounded-xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              ONLINE DELEGATE PASS
            </span>
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-[#25231F]/85 font-body leading-relaxed mb-8 max-w-3xl">
            Represent a sovereign member state portfolio across the United Nations Security Council (UNSC), 
            United Nations Human Rights Council (UNHRC), United Nations Commission on the Status of Women (UNCSW), 
            or an Indian political dignitary in the All India Political Parties Meet (AIPPM).
          </p>

          {/* Entitlements */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 text-xs font-mono-tech text-[#25231F]/85">
            <div className="flex items-start gap-2.5 p-3.5 bg-[#EBE9D8] border border-[#25231F]/10">
              <CheckCircle2 className="w-4 h-4 text-[#CB1B29] shrink-0 mt-0.5" />
              <span>Full 2-Day Virtual Chamber Access across all sessions ({conferenceConfig.dates.displayDate})</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-[#EBE9D8] border border-[#25231F]/10">
              <CheckCircle2 className="w-4 h-4 text-[#CB1B29] shrink-0 mt-0.5" />
              <span>Digital Delegate Dossier, Study Background Guides &amp; Procedure Manuals</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-[#EBE9D8] border border-[#25231F]/10">
              <CheckCircle2 className="w-4 h-4 text-[#CB1B29] shrink-0 mt-0.5" />
              <span>Eligibility for Committee Awards (Best Delegate, High Commendation, etc.)</span>
            </div>
            <div className="flex items-start gap-2.5 p-3.5 bg-[#EBE9D8] border border-[#25231F]/10">
              <CheckCircle2 className="w-4 h-4 text-[#CB1B29] shrink-0 mt-0.5" />
              <span>Official Digital Certificate of Statesmanship issued by MUNSOC NIT Agartala</span>
            </div>
          </div>

          {/* Fee Tiers Display */}
          <div className="mb-10 pt-6 border-t border-[#25231F]/10">
            <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block mb-4">
              // REGISTRATION FEE TIERS
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#EBE9D8] border-2 border-[#CB1B29]">
                <span className="text-[11px] font-mono-tech text-[#CB1B29] font-bold uppercase block">TIER 1</span>
                <div className="font-serif-display text-3xl font-bold text-[#CB1B29] my-1">
                  {conferenceConfig.registration.fees.earlyBird}
                </div>
                <div className="text-xs font-mono-tech font-semibold text-[#25231F]">
                  Early Bird ({conferenceConfig.registration.fees.earlyBirdDeadline})
                </div>
              </div>

              <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/15">
                <span className="text-[11px] font-mono-tech text-[#25231F]/60 font-bold uppercase block">TIER 2</span>
                <div className="font-serif-display text-3xl font-bold text-[#25231F] my-1">
                  {conferenceConfig.registration.fees.regular}
                </div>
                <div className="text-xs font-mono-tech font-semibold text-[#25231F]">
                  Regular ({conferenceConfig.registration.fees.regularDeadline})
                </div>
              </div>

              <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/15">
                <span className="text-[11px] font-mono-tech text-[#25231F]/60 font-bold uppercase block">TIER 3</span>
                <div className="font-serif-display text-3xl font-bold text-[#25231F] my-1">
                  {conferenceConfig.registration.fees.late}
                </div>
                <div className="text-xs font-mono-tech font-semibold text-[#25231F]">
                  Late ({conferenceConfig.registration.fees.lateDeadline})
                </div>
              </div>
            </div>
          </div>

          {/* Registration Action Area — Strictly awaiting official link, not pointing to Unstop or external */}
          <div className="p-6 bg-[#25231F] text-[#EBE9D8] text-center space-y-4">
            <div className="inline-flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29] uppercase tracking-wider">
              <AlertCircle className="w-4 h-4" />
              <span>AWAITING OFFICIAL REGISTRATION LINK RELEASE</span>
            </div>

            <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#EBE9D8]">
              Official Registration Link Coming Soon
            </h3>

            <p className="text-xs sm:text-sm font-body text-[#EBE9D8]/75 max-w-lg mx-auto">
              The Secretariat will publish the official delegate application link shortly. 
              No third-party portals or unofficial forms are active at this time.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <button
                disabled
                className="px-6 py-3 rounded-xs font-heading font-semibold text-xs uppercase tracking-wider bg-[#CB1B29]/40 text-[#EBE9D8]/70 border border-[#CB1B29]/60 cursor-not-allowed select-none"
              >
                Registration Link Coming Soon
              </button>
              <Button
                variant="outline"
                size="md"
                onClick={() => navigateTo('contact')}
                className="border-[#EBE9D8]/30 text-[#EBE9D8] hover:border-[#CB1B29] hover:text-[#CB1B29]"
              >
                Inquire with Secretariat
              </Button>
            </div>
          </div>
        </div>

        {/* Eligibility & Participation Criteria */}
        <div className="p-8 bg-[#F6F4EB] border border-[#25231F]/15 mb-16 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29] uppercase font-bold tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>PARTICIPATION CRITERIA &amp; GUIDELINES</span>
          </div>

          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
            Who Can Participate?
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs font-mono-tech text-[#25231F]/80">
            <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10 space-y-2">
              <span className="font-bold text-[#CB1B29] block">ACADEMIC COHORT</span>
              <p className="leading-relaxed">
                Open to school debaters (Grade 9 and above), undergraduate students across engineering, law, liberal arts, and sciences, as well as postgraduate scholars.
              </p>
            </div>

            <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10 space-y-2">
              <span className="font-bold text-[#CB1B29] block">WORKING PROFESSIONALS</span>
              <p className="leading-relaxed">
                Working professionals and industry practitioners passionate about international diplomacy, geopolitics, and multilateral governance are encouraged to participate.
              </p>
            </div>

            <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10 space-y-2">
              <span className="font-bold text-[#CB1B29] block">PORTFOLIO ALLOCATION</span>
              <p className="leading-relaxed">
                Portfolios are allocated by the Substantive Board on the basis of past MUN experience, preference order, and timely registration.
              </p>
            </div>

            <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10 space-y-2">
              <span className="font-bold text-[#CB1B29] block">POSITION PAPERS</span>
              <p className="leading-relaxed">
                Position papers are mandatory for delegates seeking Best Delegate or High Commendation consideration and must follow official UN citation formats.
              </p>
            </div>
          </div>
        </div>

        {/* Contact Assistance */}
        <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono-tech">
          <div className="flex items-center gap-2.5 text-[#25231F]/80">
            <Mail className="w-4 h-4 text-[#CB1B29]" />
            <span>Need assistance or have registration queries? Email us at {conferenceConfig.contacts.email}</span>
          </div>
          <button
            onClick={() => navigateTo('contact')}
            className="text-[#CB1B29] hover:underline font-bold uppercase shrink-0 cursor-pointer"
          >
            Secretariat Help Desk →
          </button>
        </div>

      </div>
    </div>
  );
};
