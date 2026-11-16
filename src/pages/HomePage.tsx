import React from 'react';
import { Hero } from '../sections/Hero';
import { Experience } from '../sections/Experience';
import { committeesData, statisticsData } from '../data/content';
import { conferenceConfig } from '../data/config';
import { useNavigation } from '../context/NavigationContext';
import { Button } from '../components/Button';
import { ArrowRight, Compass, Calendar, Users, Sparkles } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="w-full">
      {/* 1. Animated Hero Section with World Map Canvas */}
      <Hero />

      {/* 2. Conference Experience Section (5-Stage Horizontal Storytelling Animation Preserved) */}
      <Experience />

      {/* 3. Conference Highlights & Quick Gateways Section */}
      <section className="relative py-20 sm:py-28 bg-[#EBE9D8] border-b border-[#25231F]/15">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Eyebrow & Editorial Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono-tech text-[#CB1B29] tracking-widest uppercase mb-2">
                <span>[ 01 // OVERVIEW & DESTINATIONS ]</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-serif-display font-bold text-[#25231F] leading-tight">
                Diplomatic Highlights & Portals
              </h2>
              <p className="text-base sm:text-lg text-[#25231F]/75 font-body max-w-2xl mt-3">
                Explore the primary destinations of NITAMUN 4.0. From the official editorial events and committee dossiers to registration details and secretariat helplines.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="editorial"
                size="md"
                onClick={() => navigateTo('about')}
                withArrow
              >
                Learn About MUNSOC
              </Button>
            </div>
          </div>

          {/* Quick Gateways: 3 Major Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {/* Gateway 1: About Us */}
            <div className="p-8 bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all flex flex-col justify-between group hover:shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center mb-6 group-hover:bg-[#CB1B29] transition-colors">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold block mb-1">
                  DESTINATION 02
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F] mb-3">
                  About NITAMUN & MUNSOC
                </h3>
                <p className="text-sm text-[#25231F]/75 font-body leading-relaxed mb-6">
                  Discover the founding vision, our institutional mission at NIT Agartala, and the core objectives governing our online diplomatic simulations.
                </p>
              </div>
              <button
                onClick={() => navigateTo('about')}
                className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#CB1B29] uppercase tracking-wider hover:underline cursor-pointer group-hover:translate-x-1 transition-transform"
              >
                <span>Read Full Mission</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Gateway 2: Events & Timeline */}
            <div className="p-8 bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all flex flex-col justify-between group hover:shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center mb-6 group-hover:bg-[#CB1B29] transition-colors">
                  <Calendar className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold block mb-1">
                  DESTINATION 03
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F] mb-3">
                  Important Dates & Fees
                </h3>
                <p className="text-sm text-[#25231F]/75 font-body leading-relaxed mb-6">
                  Check confirmed event dates ({conferenceConfig.dates.displayDate}), delegate fee tiers (₹400 / ₹450 / ₹500), participant criteria, and awards per committee.
                </p>
              </div>
              <button
                onClick={() => navigateTo('events')}
                className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#CB1B29] uppercase tracking-wider hover:underline cursor-pointer group-hover:translate-x-1 transition-transform"
              >
                <span>View Event Specifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Gateway 3: Committees */}
            <div className="p-8 bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all flex flex-col justify-between group hover:shadow-lg">
              <div>
                <div className="w-10 h-10 rounded-xs bg-[#25231F] text-[#EBE9D8] flex items-center justify-center mb-6 group-hover:bg-[#CB1B29] transition-colors">
                  <Users className="w-5 h-5" />
                </div>
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold block mb-1">
                  DESTINATION 04
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F] mb-3">
                  The 4 Simulation Councils
                </h3>
                <p className="text-sm text-[#25231F]/75 font-body leading-relaxed mb-6">
                  Review mandates, agendas, and background dossiers for UNSC, UNHRC, UNCSW, and AIPPM. Discover which dais suits your diplomatic style.
                </p>
              </div>
              <button
                onClick={() => navigateTo('committees')}
                className="inline-flex items-center gap-2 text-xs font-heading font-bold text-[#CB1B29] uppercase tracking-wider hover:underline cursor-pointer group-hover:translate-x-1 transition-transform"
              >
                <span>Inspect Council Dossiers</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Quick Committee Grid Preview */}
          <div className="pt-12 border-t border-[#25231F]/15">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-mono-tech uppercase text-[#CB1B29] font-bold">
                  SIMULATION COUNCILS // 04 DAIS
                </span>
                <h3 className="font-serif-display text-2xl sm:text-3xl font-bold text-[#25231F]">
                  Four Theatres of Statecraft
                </h3>
              </div>
              <button
                onClick={() => navigateTo('committees')}
                className="text-xs font-mono-tech uppercase text-[#CB1B29] hover:underline font-bold flex items-center gap-1 cursor-pointer"
              >
                View Detailed Matrices →
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {committeesData.map((c) => (
                <div
                  key={c.id}
                  onClick={() => navigateTo('committees')}
                  className="p-6 bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all cursor-pointer group hover:-translate-y-1"
                >
                  <span className="font-mono-tech text-xs text-[#CB1B29] font-bold px-2 py-0.5 bg-[#CB1B29]/10">
                    {c.acronym}
                  </span>
                  <h4 className="font-serif-display text-xl font-bold text-[#25231F] group-hover:text-[#CB1B29] transition-colors mt-3 mb-2">
                    {c.name}
                  </h4>
                  <p className="text-xs text-[#25231F]/70 font-body line-clamp-3 mb-4">
                    {c.overview}
                  </p>
                  <span className="text-[11px] font-mono-tech text-[#CB1B29] group-hover:underline flex items-center gap-1">
                    Examine Agenda →
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Key Statistics Bar */}
          <div className="mt-16 pt-12 border-t border-[#25231F]/15 grid grid-cols-2 lg:grid-cols-4 gap-6">
            {statisticsData.map((stat) => (
              <div key={stat.id} className="p-6 bg-[#F6F4EB] border border-[#25231F]/15">
                <div className="font-serif-display text-4xl sm:text-5xl font-bold text-[#25231F]">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-heading font-semibold text-[#25231F]">
                  {stat.label}
                </div>
                {stat.subtext && (
                  <div className="mt-1 text-xs font-mono-tech text-[#25231F]/60">
                    {stat.subtext}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Closing Call To Action to Register */}
      <section className="relative py-24 sm:py-32 bg-[#25231F] text-[#EBE9D8] overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xs bg-[#CB1B29]/20 border border-[#CB1B29]/40 text-xs font-mono-tech text-[#CB1B29] uppercase tracking-widest">
            <Sparkles className="w-3.5 h-3.5" />
            <span>JOIN THE FOURTH EDITION // ONLINE</span>
          </div>

          <h2 className="font-serif-display text-4xl sm:text-6xl font-bold text-[#EBE9D8]">
            "Your voice belongs at the table."
          </h2>

          <p className="font-serif-display italic text-2xl text-[#CB1B29]">
            Step into the conversation. Challenge perspectives. Shape the dialogue.
          </p>

          <p className="text-sm sm:text-base text-[#EBE9D8]/75 font-body max-w-xl mx-auto">
            Convened digitally worldwide on {conferenceConfig.dates.displayDate}. Open to students and working professionals.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              variant="primary"
              size="lg"
              onClick={() => navigateTo('registration')}
              withArrow
            >
              View Registration Details
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigateTo('contact')}
              className="border-[#EBE9D8]/30 text-[#EBE9D8] hover:border-[#CB1B29] hover:text-[#CB1B29]"
            >
              Contact Secretariat
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
