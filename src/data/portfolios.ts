// Centralized Committee & Portfolio Configuration for NITAMUN 4.0
// Official Committees:
// 1. UNSC  | United Nations Security Council
// 2. UNHRC | United Nations Human Rights Council
// 3. UNCSW | United Nations Commission on the Status of Women
// 4. AIPPM | All India Political Parties Meet

export type CommitteeId = 'UNSC' | 'UNHRC' | 'UNCSW' | 'AIPPM';

export interface CommitteePortfolioData {
  id: CommitteeId;
  name: string;
  fullName: string;
  portfolioType: 'Country' | 'Political Dignitary';
  portfolios: string[];
}

export const COMMITTEE_PORTFOLIOS: Record<CommitteeId, CommitteePortfolioData> = {
  UNSC: {
    id: 'UNSC',
    name: 'UNSC',
    fullName: 'United Nations Security Council',
    portfolioType: 'Country',
    portfolios: [
      // Permanent Five (P5)
      'United States of America (P5)',
      'Russian Federation (P5)',
      'People’s Republic of China (P5)',
      'United Kingdom (P5)',
      'French Republic (P5)',
      // Non-Permanent & Key Regional Powers
      'Republic of India',
      'Federal Republic of Germany',
      'Japan',
      'Federative Republic of Brazil',
      'Republic of South Africa',
      'Islamic Republic of Pakistan',
      'State of Israel',
      'Islamic Republic of Iran',
      'Kingdom of Saudi Arabia',
      'Republic of Turkey',
      'Ukraine',
      'Republic of Korea',
      'Democratic People’s Republic of Korea',
      'United Arab Emirates',
      'Swiss Confederation',
      'Commonwealth of Australia',
      'Canada',
      'Arab Republic of Egypt',
      'Republic of Indonesia',
      'United Mexican States',
      'Argentine Republic',
      'Kingdom of Norway',
      'Republic of Poland',
      'Socialist Republic of Vietnam',
      'State of Qatar',
    ],
  },
  UNHRC: {
    id: 'UNHRC',
    name: 'UNHRC',
    fullName: 'United Nations Human Rights Council',
    portfolioType: 'Country',
    portfolios: [
      'United States of America',
      'United Kingdom',
      'French Republic',
      'Federal Republic of Germany',
      'Republic of India',
      'Japan',
      'Federative Republic of Brazil',
      'Republic of South Africa',
      'Republic of Indonesia',
      'United Mexican States',
      'Argentine Republic',
      'Kingdom of Belgium',
      'Republic of Chile',
      'Republic of Costa Rica',
      'Kingdom of Morocco',
      'Republic of Kenya',
      'People’s Democratic Republic of Algeria',
      'People’s Republic of Bangladesh',
      'Republic of Ghana',
      'Kyrgyz Republic',
      'State of Qatar',
      'Romania',
      'Georgia',
      'Republic of Maldives',
      'Kingdom of the Netherlands',
      'Swiss Confederation',
      'Canada',
      'Commonwealth of Australia',
      'Kingdom of Spain',
      'Italian Republic',
    ],
  },
  UNCSW: {
    id: 'UNCSW',
    name: 'UNCSW',
    fullName: 'United Nations Commission on the Status of Women',
    portfolioType: 'Country',
    portfolios: [
      'United States of America',
      'Republic of India',
      'Kingdom of Sweden',
      'Kingdom of Norway',
      'Canada',
      'Commonwealth of Australia',
      'New Zealand',
      'Kingdom of Denmark',
      'Kingdom of Spain',
      'Federative Republic of Brazil',
      'United Mexican States',
      'Republic of South Africa',
      'Republic of Kenya',
      'Federal Republic of Nigeria',
      'People’s Republic of Bangladesh',
      'Arab Republic of Egypt',
      'Republic of the Philippines',
      'Republic of Colombia',
      'Republic of Austria',
      'Swiss Confederation',
      'Republic of Iceland',
      'Republic of Finland',
      'Federal Republic of Germany',
      'French Republic',
      'United Kingdom',
      'Japan',
      'Republic of Korea',
      'Republic of Indonesia',
      'Republic of Rwanda',
      'Kingdom of the Netherlands',
    ],
  },
  AIPPM: {
    id: 'AIPPM',
    name: 'AIPPM',
    fullName: 'All India Political Parties Meet',
    portfolioType: 'Political Dignitary',
    portfolios: [
      'Prime Minister (Leader of the House)',
      'Minister of Home Affairs',
      'Minister of Defence',
      'Minister of External Affairs',
      'Minister of Finance & Corporate Affairs',
      'Leader of Opposition (Lok Sabha)',
      'Leader of Opposition (Rajya Sabha)',
      'Minister of Road Transport & Highways',
      'Minister of Railways, I&B, Electronics & IT',
      'Minister of Commerce & Industry',
      'Minister of Law & Justice',
      'Minister of Education',
      'Minister of Environment, Forest & Climate Change',
      'Minister of Health & Family Welfare',
      'Minister of Parliamentary Affairs',
      'Senior Representative (Indian National Congress)',
      'Senior Representative (All India Trinamool Congress)',
      'Senior Representative (Dravida Munnetra Kazhagam)',
      'Senior Representative (Samajwadi Party)',
      'Senior Representative (Aam Aadmi Party)',
      'Senior Representative (Telugu Desam Party)',
      'Senior Representative (Janata Dal - United)',
      'Senior Representative (Shiv Sena - Shinde)',
      'Senior Representative (Shiv Sena - UBT)',
      'Senior Representative (NCP - Sharadchandra Pawar)',
      'Senior Representative (YSR Congress Party)',
      'Senior Representative (Biju Janata Dal)',
      'Senior Representative (CPI-M)',
      'Independent Member of Parliament',
      'Constitutional / Legal Expert Delegate',
    ],
  },
};

export const AVAILABLE_COMMITTEES: CommitteeId[] = ['UNSC', 'UNHRC', 'UNCSW', 'AIPPM'];

export function getPortfoliosForCommittee(committee: string): string[] {
  if (!committee) return [];
  const found = COMMITTEE_PORTFOLIOS[committee as CommitteeId];
  return found ? found.portfolios : [];
}
