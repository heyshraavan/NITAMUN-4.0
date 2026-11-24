import React from 'react';
import { committeesData } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { CommitteeCard } from '../components/CommitteeCard';
import { useNavigation } from '../context/NavigationContext';
import { Button } from '../components/Button';
import { BookOpen, AlertCircle } from 'lucide-react';

export const CommitteesPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="w-full pt-28 sm:pt-36 pb-32 bg-[#EBE9D8] text-[#25231F] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <SectionHeading
          sectionNumber="04"
          eyebrow="CHAMBERS OF DELIBERATION"
          title="The Four Committees"
          titleAccent="NITAMUN 4.0 Councils"
          subtitle="Explore the councils simulating continuous crisis statecraft, universal humanitarian protections, socioeconomic gender equity, and dynamic Indian parliamentary politics."
        />

        {/* Substantive Guidance Callout */}
        <div className="mb-12 p-4 bg-[#F6F4EB] border-l-3 border-[#CB1B29] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono-tech text-[#25231F]">
          <div className="flex items-center gap-2">
            <AlertCircle className="w-4 h-4 text-[#CB1B29] shrink-0" />
            <span>Official committee agendas, study guides, and portfolio allocations will be released prior to conference accreditation.</span>
          </div>
          <button
            onClick={() => navigateTo('registration')}
            className="text-[#CB1B29] hover:underline font-bold uppercase tracking-wider shrink-0 cursor-pointer"
          >
            Apply for Delegation →
          </button>
        </div>

        {/* 2x2 Grid of Committee Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 mb-20">
          {committeesData.map((committee, index) => (
            <CommitteeCard
              key={committee.id}
              committee={committee}
              index={index}
            />
          ))}
        </div>

        {/* Substantive Rules & Preparation Notice */}
        <div className="p-8 sm:p-10 bg-[#F6F4EB] border border-[#25231F]/15 mb-16 space-y-6">
          <div className="flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29] uppercase font-bold">
            <BookOpen className="w-4 h-4" />
            <span>RULES OF PROCEDURE &amp; PREPARATION GUIDELINES</span>
          </div>

          <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
            Preparing for Your Portfolio
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-mono-tech text-[#25231F]/80">
            <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10">
              <span className="font-bold text-[#CB1B29] block mb-1">Position Papers</span>
              Mandatory for Best Delegate consideration. Outlines historical sovereign stance, treaty precedents, and proposed operative solutions.
            </div>
            <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10">
              <span className="font-bold text-[#CB1B29] block mb-1">Rules of Procedure</span>
              UN councils follow UNA-USA / UN4MUN parliamentary rules; AIPPM follows Indian Parliamentary Conventions and Lok Sabha rules.
            </div>
            <div className="p-4 bg-[#EBE9D8] border border-[#25231F]/10">
              <span className="font-bold text-[#CB1B29] block mb-1">Background Guides</span>
              Comprehensive study dossiers curated by the Executive Board to be downloaded directly through the delegate portal.
            </div>
          </div>
        </div>

        {/* Bottom Destination Transition */}
        <div className="pt-10 border-t border-[#25231F]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono-tech text-[#25231F]/70">
            Next: Delegate Registration &amp; Fees
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigateTo('registration')}
            withArrow
          >
            Proceed to Registration
          </Button>
        </div>
      </div>
    </div>
  );
};
