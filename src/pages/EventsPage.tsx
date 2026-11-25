import React from 'react';
import { conferenceConfig } from '../data/config';
import { useNavigation } from '../context/NavigationContext';
import { Button } from '../components/Button';
import { Calendar, Globe2, Award, Users, CreditCard } from 'lucide-react';

export const EventsPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="w-full pt-28 sm:pt-36 pb-32 bg-[#EBE9D8] text-[#25231F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header: Editorial Serif Heading */}
        <div className="mb-16 sm:mb-20 max-w-4xl">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29] tracking-widest uppercase mb-3">
            <span>OFFICIAL SCHEDULE &amp; SPECIFICATIONS</span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl font-serif-display font-bold text-[#25231F] tracking-tight leading-[1.05]">
            Events, Dates &amp; Fees
          </h1>

          <div className="flex items-center gap-2 my-5">
            <div className="w-16 h-[2px] bg-[#CB1B29]" />
            <div className="w-2 h-2 rounded-full bg-[#CB1B29]" />
            <div className="w-28 h-[1px] bg-[#25231F]/20" />
          </div>

          <p className="text-base sm:text-xl text-[#25231F]/80 font-body font-light leading-relaxed max-w-2xl">
            Official specifications for {conferenceConfig.name} {conferenceConfig.editionRoman}. 
            Outlining conference dates, delegate registration fee tiers, eligibility, and committee statesmanship awards.
          </p>
        </div>

        {/* =========================================================================
            EXACT FOUR INFORMATION GROUPS (PER SPECIFICATION)
            1. IMPORTANT DATES
            2. REGISTRATION FEES
            3. PARTICIPANTS
            4. AWARDS PER COMMITTEE
            ========================================================================= */}
        <div className="space-y-12 sm:space-y-16">

          {/* -----------------------------------------------------------------------
              GROUP 1: IMPORTANT DATES
              Event: January 23–24, 2027
              Mode: Online
              ----------------------------------------------------------------------- */}
          <div className="p-8 sm:p-12 bg-[#F6F4EB] border border-[#25231F]/15 relative overflow-hidden group hover:border-[#CB1B29] transition-colors shadow-xs">
            <div className="flex items-center justify-between pb-6 border-b border-[#25231F]/10 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center shrink-0">
                  <Calendar className="w-5 h-5 text-[#CB1B29]" />
                </span>
                <div>
                  <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block">
                    CONFERENCE DATES
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                    Important Dates
                  </h2>
                </div>
              </div>
              <span className="hidden sm:inline-block font-mono-tech text-xs text-[#25231F]/50 uppercase">
                STATUS: CONFIRMED
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {/* Event Dates */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono-tech text-[#CB1B29] font-bold uppercase tracking-wider block mb-1">
                    CONFERENCE DATES
                  </span>
                  <div className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F] my-2">
                    {conferenceConfig.dates.displayDate}
                  </div>
                  <p className="text-xs sm:text-sm text-[#25231F]/75 font-body leading-relaxed mt-2">
                    Two days of intensive parliamentary debate, crisis simulations, and draft resolution formulation.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#25231F]/60">
                  SATURDAY &amp; SUNDAY CONCLAVE
                </div>
              </div>

              {/* Mode: Online */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/10 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono-tech text-[#CB1B29] font-bold uppercase tracking-wider block mb-1">
                    CONFERENCE MODE
                  </span>
                  <div className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F] my-2 flex items-center gap-3">
                    <Globe2 className="w-8 h-8 text-[#CB1B29]" />
                    <span>Online</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#25231F]/75 font-body leading-relaxed mt-2">
                    Convened virtually across secured digital chambers, enabling seamless global participation without travel constraints.
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#25231F]/60">
                  DIGITAL ASSEMBLY ACCESS
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              GROUP 2: REGISTRATION FEES
              Early Bird: ₹400 (Until December 15)
              Regular: ₹450 (till Jan 10)
              Late: ₹500 (after Jan 10)
              ----------------------------------------------------------------------- */}
          <div className="p-8 sm:p-12 bg-[#F6F4EB] border border-[#25231F]/15 relative overflow-hidden group hover:border-[#CB1B29] transition-colors shadow-xs">
            <div className="flex items-center justify-between pb-6 border-b border-[#25231F]/10 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-[#CB1B29]" />
                </span>
                <div>
                  <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block">
                    REGISTRATION FEES
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                    Registration Fees
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono-tech text-[#CB1B29] font-bold uppercase">
                INDIVIDUAL DELEGATE TRACK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Early Bird */}
              <div className="p-6 bg-[#EBE9D8] border-2 border-[#CB1B29] flex flex-col justify-between relative shadow-sm">
                <div className="absolute top-3 right-3 text-[10px] font-mono-tech uppercase font-bold px-2 py-0.5 bg-[#CB1B29] text-[#EBE9D8]">
                  RECOMMENDED
                </div>
                <div>
                  <span className="text-xs font-mono-tech text-[#CB1B29] font-bold uppercase tracking-wider block">
                    TIER 01
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#25231F] mt-1 mb-2">
                    Early Bird
                  </h3>
                  <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#CB1B29] my-3">
                    ₹400
                  </div>
                  <div className="inline-block px-2.5 py-1 bg-[#F6F4EB] border border-[#25231F]/15 text-xs font-mono-tech font-bold text-[#25231F]">
                    Until December 15
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#25231F]/70">
                  Priority portfolio matrix consideration.
                </div>
              </div>

              {/* Regular */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono-tech text-[#25231F]/60 font-bold uppercase tracking-wider block">
                    TIER 02
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#25231F] mt-1 mb-2">
                    Regular
                  </h3>
                  <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#25231F] my-3">
                    ₹450
                  </div>
                  <div className="inline-block px-2 py-1 bg-[#F6F4EB] border border-[#25231F]/15 text-xs font-mono-tech font-bold text-[#25231F]">
                    till Jan 10
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#25231F]/70">
                  Standard delegate accreditation phase.
                </div>
              </div>

              {/* Late */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-mono-tech text-[#25231F]/60 font-bold uppercase tracking-wider block">
                    TIER 03
                  </span>
                  <h3 className="font-serif-display text-2xl font-bold text-[#25231F] mt-1 mb-2">
                    Late
                  </h3>
                  <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#25231F] my-3">
                    ₹500
                  </div>
                  <div className="inline-block px-2 py-1 bg-[#F6F4EB] border border-[#25231F]/15 text-xs font-mono-tech font-bold text-[#25231F]">
                    after Jan 10
                  </div>
                </div>
                <div className="mt-6 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#25231F]/70">
                  Final window subject to available portfolios.
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              GROUP 3: PARTICIPANTS
              Students and working professionals encouraged to join and experience diplomacy firsthand.
              ----------------------------------------------------------------------- */}
          <div className="p-8 sm:p-12 bg-[#F6F4EB] border border-[#25231F]/15 relative overflow-hidden group hover:border-[#CB1B29] transition-colors shadow-xs">
            <div className="flex items-center justify-between pb-6 border-b border-[#25231F]/10 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-[#CB1B29]" />
                </span>
                <div>
                  <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block">
                    ELIGIBILITY &amp; PARTICIPANTS
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                    Participants
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono-tech text-[#25231F]/50 uppercase hidden sm:inline-block">
                OPEN ACCREDITATION
              </span>
            </div>

            <div className="p-6 sm:p-8 bg-[#EBE9D8] border-l-4 border-[#CB1B29] space-y-4">
              <p className="font-serif-display text-2xl sm:text-3xl text-[#25231F] leading-snug">
                "{conferenceConfig.registration.participants}"
              </p>
              <p className="text-sm sm:text-base text-[#25231F]/80 font-body leading-relaxed max-w-3xl">
                NITAMUN 4.0 welcomes high school scholars, undergraduate students, postgraduate researchers, 
                and working professionals from all disciplines. Whether you are an experienced MUN delegate seeking 
                rigorous procedural scrutiny or an aspiring leader attending your inaugural conference, our virtual chambers 
                offer an authentic and welcoming crucible of multilateral diplomacy.
              </p>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              GROUP 4: AWARDS PER COMMITTEE
              Best Delegate | 1
              High Commendation | 1
              Special Mention | 1
              Verbal/Honorable Mention | 5
              ----------------------------------------------------------------------- */}
          <div className="p-8 sm:p-12 bg-[#F6F4EB] border border-[#25231F]/15 relative overflow-hidden group hover:border-[#CB1B29] transition-colors shadow-xs">
            <div className="flex items-center justify-between pb-6 border-b border-[#25231F]/10 mb-8">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center shrink-0">
                  <Award className="w-5 h-5 text-[#CB1B29]" />
                </span>
                <div>
                  <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block">
                    COMMITTEE AWARDS
                  </span>
                  <h2 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                    Awards Per Committee
                  </h2>
                </div>
              </div>
              <span className="text-xs font-mono-tech text-[#CB1B29] font-bold uppercase">
                ACROSS ALL 4 COUNCILS
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Best Delegate | 1 */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col justify-between hover:border-[#CB1B29] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-xs text-[#CB1B29] font-bold uppercase">
                      RANK 01
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#CB1B29] text-[#EBE9D8] font-serif-display font-bold text-lg flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#25231F] mb-2">
                    Best Delegate
                  </h3>
                  <p className="text-xs text-[#25231F]/70 font-body leading-relaxed">
                    Highest diplomatic honor awarded for substantive leadership, caucus consensus, and procedural excellence.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#CB1B29] font-bold">
                  Conferred: 1 per committee
                </div>
              </div>

              {/* High Commendation | 1 */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col justify-between hover:border-[#CB1B29] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-xs text-[#CB1B29] font-bold uppercase">
                      RANK 02
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#25231F] text-[#EBE9D8] font-serif-display font-bold text-lg flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#25231F] mb-2">
                    High Commendation
                  </h3>
                  <p className="text-xs text-[#25231F]/70 font-body leading-relaxed">
                    Awarded for persuasive sovereign advocacy, resolution clause authoring, and debate agility.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#CB1B29] font-bold">
                  Conferred: 1 per committee
                </div>
              </div>

              {/* Special Mention | 1 */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col justify-between hover:border-[#CB1B29] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-xs text-[#CB1B29] font-bold uppercase">
                      RANK 03
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#25231F] text-[#EBE9D8] font-serif-display font-bold text-lg flex items-center justify-center">
                      1
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#25231F] mb-2">
                    Special Mention
                  </h3>
                  <p className="text-xs text-[#25231F]/70 font-body leading-relaxed">
                    Recognizing exceptional research, tactical caucus contributions, and crisis interpellations.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#CB1B29] font-bold">
                  Conferred: 1 per committee
                </div>
              </div>

              {/* Verbal / Honorable Mention | 5 */}
              <div className="p-6 bg-[#EBE9D8] border border-[#25231F]/15 flex flex-col justify-between hover:border-[#CB1B29] transition-colors">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-tech text-xs text-[#CB1B29] font-bold uppercase">
                      DISTINCTION
                    </span>
                    <span className="w-8 h-8 rounded-full bg-[#25231F] text-[#EBE9D8] font-serif-display font-bold text-lg flex items-center justify-center">
                      5
                    </span>
                  </div>
                  <h3 className="font-serif-display text-2xl font-bold text-[#25231F] mb-2">
                    Verbal / Honorable Mention
                  </h3>
                  <p className="text-xs text-[#25231F]/70 font-body leading-relaxed">
                    Conferred to five distinguished delegates exhibiting sustained parliamentary engagement and statesmanship.
                  </p>
                </div>
                <div className="mt-6 pt-3 border-t border-[#25231F]/10 text-xs font-mono-tech text-[#CB1B29] font-bold">
                  Conferred: 5 per committee
                </div>
              </div>
            </div>
          </div>

          {/* -----------------------------------------------------------------------
              GROUP 5: TOTAL PRIZE POOL
              Prominent, refined diplomatic announcement block
              ----------------------------------------------------------------------- */}
          <div className="relative p-8 sm:p-12 bg-[#25231F] text-[#EBE9D8] border-2 border-[#CB1B29] shadow-xl overflow-hidden group">
            {/* Background Archival Grid Pattern Accent */}
            <div 
              className="absolute inset-0 opacity-[0.03] pointer-events-none"
              style={{
                backgroundImage: 'radial-gradient(#EBE9D8 1px, transparent 1px)',
                backgroundSize: '20px 20px'
              }}
            />

            {/* Subtle Top Crimson Accent Stripe */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#CB1B29] via-[#EBE9D8]/40 to-[#CB1B29]" />

            <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-10">
              <div className="space-y-3 max-w-2xl">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-2xs bg-[#CB1B29]/20 border border-[#CB1B29]/40 text-xs font-mono-tech tracking-widest uppercase text-[#CB1B29] font-bold">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#CB1B29] animate-pulse" />
                  <span>OFFICIAL DISTINCTION &amp; HONORS</span>
                </div>
                <h2 className="font-serif-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#EBE9D8]">
                  TOTAL PRIZE POOL
                </h2>
                <p className="text-sm sm:text-base text-[#EBE9D8]/75 font-body leading-relaxed">
                  Substantial cumulative monetary honors, cash prizes, and diplomatic laurels awarded across all four committees. Full breakdown and tier disbursement to be officially unveiled by the Secretariat.
                </p>
              </div>

              {/* The "To Be Announced" Badge / Announcement Box */}
              <div className="shrink-0 w-full md:w-auto p-6 sm:p-8 bg-[#EBE9D8] text-[#25231F] border-l-4 border-[#CB1B29] shadow-lg flex flex-col items-start md:items-center justify-center text-center">
                <span className="text-[11px] font-mono-tech uppercase font-bold tracking-widest text-[#CB1B29] block mb-1">
                  STATUS
                </span>
                <span className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F] whitespace-nowrap">
                  To Be Announced
                </span>
                <span className="text-[10px] font-mono-tech uppercase text-[#25231F]/60 mt-1 tracking-wider">
                  Pre-Conference Convocation
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Destination Transition to Registration & Committees */}
        <div className="mt-20 pt-10 border-t border-[#25231F]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono-tech text-[#25231F]/70">
            Next: Explore Committees &amp; Agendas
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="editorial"
              size="md"
              onClick={() => navigateTo('registration')}
            >
              View Registration Details
            </Button>
            <Button
              variant="primary"
              size="md"
              onClick={() => navigateTo('committees')}
              withArrow
            >
              Explore Committees
            </Button>
          </div>
        </div>

      </div>
    </div>
  );
};
