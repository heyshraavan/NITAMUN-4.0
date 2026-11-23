import React from 'react';
import { aboutUsContent } from '../data/content';
import { SectionHeading } from '../components/SectionHeading';
import { conferenceConfig } from '../data/config';
import { useNavigation } from '../context/NavigationContext';
import { Button } from '../components/Button';
import { ExecutiveLeadership } from '../components/ExecutiveLeadership';
import { Scale, Globe, Award, Briefcase, Users, ShieldCheck } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useNavigation();

  const getPillarIcon = (iconName: string) => {
    switch (iconName) {
      case 'Scale':
        return <Scale className="w-5 h-5 text-[#CB1B29]" />;
      case 'Globe':
        return <Globe className="w-5 h-5 text-[#CB1B29]" />;
      case 'Award':
        return <Award className="w-5 h-5 text-[#CB1B29]" />;
      case 'Briefcase':
        return <Briefcase className="w-5 h-5 text-[#CB1B29]" />;
      case 'Users':
        return <Users className="w-5 h-5 text-[#CB1B29]" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-[#CB1B29]" />;
    }
  };

  return (
    <div className="w-full pt-28 sm:pt-36 pb-32 bg-[#EBE9D8] text-[#25231F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 1. Page Header */}
        <SectionHeading
          sectionNumber="02"
          eyebrow="ABOUT US & INSTITUTIONAL PROFILE"
          title="Where Diplomacy Meets Rigour"
          titleAccent="NITAMUN & MUNSOC"
          subtitle="Explore the vision, mission, methodology, and leadership driving the Fourth Edition of Model United Nations at the National Institute of Technology Agartala."
        />

        {/* 2. Dual Narrative: About NITAMUN 4.0 & MUNSOC */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start mb-24">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-8 bg-[#F6F4EB] border-l-4 border-[#CB1B29] space-y-4">
              <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider">
                ABOUT THE CONFERENCE
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                {conferenceConfig.name} {conferenceConfig.editionRoman} — Online Edition
              </h3>
              <p className="text-base sm:text-lg text-[#25231F]/85 font-body leading-relaxed">
                {aboutUsContent.overview}
              </p>
            </div>

            <div className="p-8 bg-[#F6F4EB] border border-[#25231F]/15 space-y-4">
              <span className="text-xs font-mono-tech uppercase text-[#25231F]/60 font-bold tracking-wider">
                HOST SOCIETY
              </span>
              <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                MUNSOC — NIT Agartala Chapter
              </h3>
              <p className="text-base text-[#25231F]/80 font-body leading-relaxed">
                {aboutUsContent.munsocNarrative}
              </p>
              <div className="pt-2 text-xs font-mono-tech text-[#25231F]/60">
                ORGANISER: Model United Nations Society, National Institute of Technology Agartala
              </div>
            </div>
          </div>

          {/* Right Column: Vision & Mission Statement Box */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-8 bg-[#25231F] text-[#EBE9D8] border border-[#EBE9D8]/15 space-y-6 shadow-xl">
              <div>
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block mb-2">
                  OUR GUIDING VISION
                </span>
                <h4 className="font-serif-display text-2xl font-bold text-[#EBE9D8] mb-3">
                  Empowered Multilateral Statecraft
                </h4>
                <p className="text-sm font-body text-[#EBE9D8]/80 leading-relaxed">
                  {aboutUsContent.vision}
                </p>
              </div>

              <div className="pt-6 border-t border-[#EBE9D8]/15">
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-wider block mb-2">
                  OUR MISSION
                </span>
                <p className="text-sm font-body text-[#EBE9D8]/80 leading-relaxed">
                  {aboutUsContent.mission}
                </p>
              </div>

              <div className="pt-4 flex items-center justify-between text-xs font-mono-tech text-[#EBE9D8]/50">
                <span>ONLINE SIMULATION PROTOCOL</span>
                <span className="text-[#CB1B29]">NIT AGARTALA</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3. The Four Core Conference Objectives */}
        <div className="mb-24">
          <div className="mb-10">
            <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block">
              METHODOLOGY &amp; STANDARDS
            </span>
            <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F] mt-1">
              Core Conference Objectives
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aboutUsContent.objectives.map((obj) => (
              <div
                key={obj.number}
                className="p-6 bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all flex flex-col justify-between group"
              >
                <div>
                  <span className="font-serif-display text-4xl font-bold text-[#CB1B29] block mb-3">
                    {obj.number}
                  </span>
                  <h4 className="font-serif-display text-xl font-bold text-[#25231F] mb-2 group-hover:text-[#CB1B29] transition-colors">
                    {obj.title}
                  </h4>
                  <p className="text-xs text-[#25231F]/75 font-body leading-relaxed">
                    {obj.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Why Participate in NITAMUN (5 Pillars) */}
        <div className="mb-24 p-8 sm:p-12 bg-[#F6F4EB] border border-[#25231F]/15">
          <div className="max-w-3xl mb-12">
            <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold tracking-widest block">
              WHY DELEGATES PARTICIPATE
            </span>
            <h3 className="font-serif-display text-3xl sm:text-4xl font-bold text-[#25231F] mt-1">
              Why Delegates Choose NITAMUN
            </h3>
            <p className="text-sm text-[#25231F]/70 font-body mt-2">
              From substantive scrutiny to global peer networking, discover how our online conference elevates your diplomatic profile.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {aboutUsContent.whyParticipate.map((item) => (
              <div
                key={item.id}
                className="p-5 bg-[#EBE9D8] border border-[#25231F]/10 hover:border-[#CB1B29] transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-9 h-9 rounded-xs bg-[#F6F4EB] border border-[#25231F]/15 flex items-center justify-center mb-4">
                    {getPillarIcon(item.iconName)}
                  </div>
                  <span className="text-[10px] font-mono-tech text-[#CB1B29] uppercase font-bold block mb-1">
                    {item.category}
                  </span>
                  <h4 className="font-serif-display text-lg font-bold text-[#25231F] mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-[#25231F]/75 font-body leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 5. Executive Secretariat Leadership Showcase */}
        <ExecutiveLeadership />

        {/* Bottom Navigation CTA */}
        <div className="mt-20 pt-10 border-t border-[#25231F]/15 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs font-mono-tech text-[#25231F]/70">
            Next: Important Dates &amp; Registration Fees
          </div>
          <Button
            variant="primary"
            size="md"
            onClick={() => navigateTo('events')}
            withArrow
          >
            Proceed to Events &amp; Fees
          </Button>
        </div>
      </div>
    </div>
  );
};
