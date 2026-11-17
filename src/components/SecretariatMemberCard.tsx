import React from 'react';
import { SecretariatMember } from '../data/secretariat';

export interface SecretariatMemberCardProps {
  member: SecretariatMember;
}

export const SecretariatMemberCard: React.FC<SecretariatMemberCardProps> = ({ member }) => {
  return (
    <div className="p-4 sm:p-5 bg-[#F6F4EB] border border-[#25231F]/15 hover:border-[#CB1B29] transition-all flex flex-col justify-between rounded-xs group">
      <div>
        <div className="text-[11px] font-mono-tech uppercase font-bold text-[#CB1B29] mb-1">
          {member.role}
        </div>
        <div className="text-[10px] font-mono-tech text-[#25231F]/60 uppercase mb-1.5">
          {member.department}
        </div>
        <h5 className="font-serif-display text-lg font-bold text-[#25231F] group-hover:text-[#CB1B29] transition-colors">
          {member.name}
        </h5>
      </div>

      {member.linkedInUrl && (
        <div className="pt-3 mt-3 border-t border-[#25231F]/10 flex justify-end">
          <a
            href={member.linkedInUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${member.name}'s LinkedIn profile`}
            className="text-[11px] font-mono-tech text-[#25231F]/70 hover:text-[#CB1B29] inline-flex items-center gap-1 transition-colors"
          >
            <span>LinkedIn</span>
            <span>↗</span>
          </a>
        </div>
      )}
    </div>
  );
};
