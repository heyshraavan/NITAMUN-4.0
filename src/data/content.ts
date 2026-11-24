// Editorial Content for NITAMUN 4.0
// Fully editable content layer separating data from UI components.

export interface StatisticItem {
  id: string;
  value: string;
  label: string;
  isPlaceholder?: boolean;
  subtext?: string;
}

export interface ExperienceStage {
  step: string;
  title: string;
  subtitle: string;
  description: string;
  diplomaticFocus: string;
  quote: string;
  iconName: string;
}

export interface CommitteeItem {
  id: string;
  acronym: string;
  name: string;
  type: string;
  delegationType: string;
  agenda: {
    status: 'TBA' | 'CONFIRMED';
    title: string;
    description: string;
  };
  overview: string;
  mandate: string;
  expectedOutcomes: string[];
  backgroundGuideStatus: 'Coming Soon' | 'Available';
  backgroundGuideLink?: string;
}

export interface SecretariatMember {
  id: string;
  name: string;
  role: string;
  department: string;
  message?: string;
  isPlaceholder: boolean;
}

export interface WhyParticipateItem {
  id: string;
  title: string;
  category: string;
  description: string;
  stat?: string;
  iconName: 'Scale' | 'Globe' | 'Award' | 'Briefcase' | 'Users';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Participation' | 'Committees' | 'Format';
}

/* =========================================================================
   STATISTICS (GLOBAL & HOME)
   ========================================================================= */
export const statisticsData: StatisticItem[] = [
  {
    id: "stat-edition",
    value: "04",
    label: "Edition",
    isPlaceholder: false,
    subtext: "Fourth Edition",
  },
  {
    id: "stat-mode",
    value: "Online",
    label: "Conference Format",
    isPlaceholder: false,
    subtext: "Convened Digitally Worldwide",
  },
  {
    id: "stat-committees",
    value: "04",
    label: "Simulation Councils",
    isPlaceholder: false,
    subtext: "UNSC, UNHRC, UNCSW & AIPPM",
  },
  {
    id: "stat-delegates",
    value: "Open",
    label: "Participation Cohort",
    isPlaceholder: false,
    subtext: "Students & Working Professionals",
  },
];

/* =========================================================================
   ABOUT CONTENT (DESTINATION 2: ABOUT US)
   ========================================================================= */
export const aboutUsContent = {
  eyebrow: "ORGANISER PROFILE & DIPLOMATIC VISION",
  headline: "An online Model United Nations conference where ideas cross borders and perspectives challenge conventions.",
  overview:
    "NITAMUN 4.0 is an online Model United Nations conference organised by the Model United Nations Society (MUNSOC) of the National Institute of Technology Agartala. Convened entirely online, NITAMUN 4.0 brings together students and working professionals to experience diplomacy, debate, and international relations.",
  munsocNarrative:
    "Founded as an intellectual crucible within NIT Agartala, MUNSOC has fostered a community of debaters, policy analysts, and multilateral thinkers. The society organises year-round parliamentary workshops, training caucuses, and crisis simulations, bringing together collegiate scholars, school debaters, and working professionals from across the globe.",
  facultyAdvisor: {
    label: "FACULTY ADVISOR",
    name: "Dr. Gyanabati Khuraijam",
    designation: "Associate Professor · Head of Department",
    department: "Department of Management, Humanities & Social Sciences, NIT Agartala",
    acknowledgement:
      "MUNSOC, NIT Agartala, is grateful for her continued guidance and support. Her academic experience and encouragement have been valuable in helping the society organise its activities and provide students with opportunities for learning, discussion and engagement beyond the classroom.",
    academicInterests: [
      "Commonwealth Literature",
      "Indian Writing in English",
      "Gender Studies",
      "Postcolonial Studies",
      "Women Studies",
      "Communication",
      "Soft Skills",
    ],
    linkedInUrl: "https://www.linkedin.com/in/dr-gyanabati-khuraijam-ab517798/",
  },
  mission:
    "To create a platform where students engage with global issues, develop informed perspectives, and strengthen their skills in diplomacy, negotiation and public speaking through meaningful debate and discussion.",
  objectives: [
    {
      number: "01",
      title: "Geopolitical Rigour",
      description: "Ensuring online committee simulations adhere strictly to authentic United Nations charters, precedent treaties, and verified diplomatic protocols.",
    },
    {
      number: "02",
      title: "Intellectual Sovereignty",
      description: "Challenging delegates to inhabit unfamiliar sovereign worldviews, setting aside personal convictions to represent national interests authentically.",
    },
    {
      number: "03",
      title: "Pragmatic Consensus",
      description: "Guiding the transition of impassioned floor speeches into actionable, clause-by-clause draft resolutions and binding multilateral agreements.",
    },
    {
      number: "04",
      title: "Inclusive Access",
      description: "Connecting scholars, students, and working professionals across diverse geographic regions through an accessible, high-caliber virtual forum.",
    },
  ],
  whyParticipate: [
    {
      id: "why-1",
      title: "Executive Board Excellence",
      category: "Substantive Quality",
      description: "Our committees are adjudicated by seasoned Executive Board members with deep circuit experience and rigorous procedural expertise.",
      iconName: "Scale",
    },
    {
      id: "why-2",
      title: "Diverse Delegate Cohort",
      category: "Global Network",
      description: "Engage with students and working professionals from diverse academic disciplines and industries worldwide.",
      iconName: "Globe",
    },
    {
      id: "why-3",
      title: "Prestige & Recognition",
      category: "Awards & CV",
      description: "Official certificates of statesmanship and merit awards: Best Delegate, High Commendation, Special Mention, and Verbal Mentions.",
      iconName: "Award",
    },
    {
      id: "why-4",
      title: "Multilateral Statecraft",
      category: "Diplomatic Skills",
      description: "Master unmoderated caucus lobbying, cross-table bloc formation, and the fine art of diplomatic compromise in virtual chambers.",
      iconName: "Briefcase",
    },
    {
      id: "why-5",
      title: "Seamless Digital Experience",
      category: "Online Infrastructure",
      description: "Curated virtual committee rooms, real-time crisis bulletins, and structured digital resolution drafting sessions.",
      iconName: "Users",
    },
  ] as WhyParticipateItem[],
};

/* =========================================================================
   COMMITTEES (DESTINATION 4: COMMITTEES)
   ========================================================================= */
export const committeesData: CommitteeItem[] = [
  {
    id: "unsc",
    acronym: "UNSC",
    name: "United Nations Security Council",
    type: "Continuous Crisis / Specialized Agency",
    delegationType: "Single Delegate (P5 & Elected Members)",
    agenda: {
      status: "TBA",
      title: "TO BE ANNOUNCED",
      description: "Official agenda text to be released by the Executive Board prior to accreditation.",
    },
    overview:
      "The pre-eminent organ tasked with the maintenance of international peace and security under the UN Charter. Featuring legally binding resolutions, presidential statements, and rapid, high-stakes continuous crisis updates that test tactical statecraft under immense pressure.",
    mandate: "Charter of the United Nations (Chapter VI & VII Enforcement Powers), UN Peacekeeping Directives.",
    expectedOutcomes: ["Binding UN Security Council Resolutions", "Presidential Statements", "Emergency Crisis Directives"],
    backgroundGuideStatus: "Coming Soon",
  },
  {
    id: "unhrc",
    acronym: "UNHRC",
    name: "United Nations Human Rights Council",
    type: "Conventional General Assembly Body",
    delegationType: "Single Delegate",
    agenda: {
      status: "TBA",
      title: "TO BE ANNOUNCED",
      description: "Official agenda item to be released by the Executive Board prior to accreditation.",
    },
    overview:
      "Responsible for strengthening the promotion and protection of human rights globally. Delegates tackle urgent humanitarian imperatives, examining state accountability, refugee protections, civil liberties, and institutional equity across jurisdictions.",
    mandate: "Universal Declaration of Human Rights (UDHR), International Covenant on Civil and Political Rights (ICCPR).",
    expectedOutcomes: ["Universal Periodic Review Recommendations", "Human Rights Draft Resolutions", "Fact-Finding Directives"],
    backgroundGuideStatus: "Coming Soon",
  },
  {
    id: "uncsw",
    acronym: "UNCSW",
    name: "United Nations Commission on the Status of Women",
    type: "Functional Commission of ECOSOC",
    delegationType: "Single Delegate",
    agenda: {
      status: "TBA",
      title: "TO BE ANNOUNCED",
      description: "Official agenda item to be released by the Executive Board prior to accreditation.",
    },
    overview:
      "The principal global intergovernmental body dedicated exclusively to the promotion of gender equality and the empowerment of women. Delegates debate socio-economic barriers, institutional equity, maternal health protections, and legislative parity across emerging economies.",
    mandate: "Beijing Declaration and Platform for Action, CEDAW Convention, Sustainable Development Goal 5.",
    expectedOutcomes: ["Agreed Conclusions (AC)", "Action Plans for Legislative Parity", "Regional Policy Directives"],
    backgroundGuideStatus: "Coming Soon",
  },
  {
    id: "aippm",
    acronym: "AIPPM",
    name: "All India Political Parties Meet",
    type: "Specialized Indian Parliamentary Simulation",
    delegationType: "Single Representative (Indian Political Leaders)",
    agenda: {
      status: "TBA",
      title: "TO BE ANNOUNCED",
      description: "Official agenda item to be released by the Executive Board prior to accreditation.",
    },
    overview:
      "A high-octane parliamentary forum capturing the vibrancy, ideological friction, and constitutional debates of Indian politics. Representatives articulate political party lines, cross-examine national policies, and negotiate bipartisan legislative consensus.",
    mandate: "Constitution of India, Parliamentary Conventions, Lok Sabha & Rajya Sabha Rules of Procedure.",
    expectedOutcomes: ["Joint Parliamentary Communiqué", "Private Member Recommendations", "National Policy Revisions"],
    backgroundGuideStatus: "Coming Soon",
  },
];

/* =========================================================================
   SECRETARIAT (LEADERSHIP PROFILES)
   ========================================================================= */
export const secretariatData: SecretariatMember[] = [
  {
    id: "sec-sg",
    name: "[NAME PLACEHOLDER — EDITABLE]",
    role: "Secretary-General",
    department: "Executive Secretariat",
    message: "Welcoming delegates to an intellectually demanding online edition dedicated to genuine diplomatic empathy and rigor.",
    isPlaceholder: true,
  },
  {
    id: "sec-dsg",
    name: "[NAME PLACEHOLDER — EDITABLE]",
    role: "Deputy Secretary-General",
    department: "Executive Secretariat",
    message: "Guiding institutional coherence, academic consistency, and delegate care across all four councils.",
    isPlaceholder: true,
  },
  {
    id: "sec-dg",
    name: "[NAME PLACEHOLDER — EDITABLE]",
    role: "Director-General",
    department: "Operations & Digital Infrastructure",
    message: "Ensuring an effortless virtual conference infrastructure from inaugural plenary to the closing gavel strike.",
    isPlaceholder: true,
  },
  {
    id: "sec-cd",
    name: "[NAME PLACEHOLDER — EDITABLE]",
    role: "Charge d'Affaires",
    department: "Institutional Relations",
    message: "Fostering partnerships with educational institutions, professional networks, and international diplomatic societies.",
    isPlaceholder: true,
  },
  {
    id: "sec-usg-sub",
    name: "[NAME PLACEHOLDER — EDITABLE]",
    role: "USG Substantive Affairs",
    department: "Substantive Board",
    message: "Crafting authoritative background dossiers, procedural guidelines, and continuous crisis architectures.",
    isPlaceholder: true,
  },
  {
    id: "sec-usg-del",
    name: "[NAME PLACEHOLDER — EDITABLE]",
    role: "USG Delegate Affairs",
    department: "Delegate Experience",
    message: "Your primary point of contact for portfolio allocations, queries, and virtual room orientations.",
    isPlaceholder: true,
  },
];

/* =========================================================================
   CONFERENCE EXPERIENCE (5-STAGE HORIZONTAL STORYTELLING ANIMATION)
   Preserved exactly per user instruction
   ========================================================================= */
export const experienceStages: ExperienceStage[] = [
  {
    step: "01",
    title: "Research & Sovereign Representation",
    subtitle: "The Foundation of Statecraft",
    description:
      "Diplomacy begins with thorough research. Delegates examine treaties, resolutions, and geopolitical contexts to understand their country's stance, mastering procedural rules to represent their assigned portfolio with precision.",
    diplomaticFocus: "Treaty analysis, country dossiers, and Rules of Procedure (RoP).",
    quote: "To speak for a nation, one must first understand its responsibilities and interests.",
    iconName: "Search",
  },
  {
    step: "02",
    title: "Debate & Caucus Negotiation",
    subtitle: "The Crucible of Ideas",
    description:
      "From formal speeches on the General Speakers List to dynamic moderated caucuses, delegates test ideas under scrutiny. In unmoderated caucuses, regional blocs form and strategic compromises are negotiated to build consensus.",
    diplomaticFocus: "Persuasive oratory, caucus diplomacy, and cross-bloc negotiation.",
    quote: "In multilateral chambers, enduring agreements are forged through dialogue and constructive compromise.",
    iconName: "Mic",
  },
  {
    step: "03",
    title: "Resolution & Consensus",
    subtitle: "The Sovereign Document",
    description:
      "The culmination of committee sessions: translating debate into actionable policy. Delegates author working papers, debate line-by-line amendments, and navigate roll-call voting to adopt comprehensive resolutions.",
    diplomaticFocus: "Working papers, draft resolutions, amendments, and voting procedure.",
    quote: "A resolution reflects the collective will of nations united in purposeful action.",
    iconName: "FileCheck",
  },
];

/* =========================================================================
   FAQ
   ========================================================================= */
export const faqData: FAQItem[] = [
  {
    id: "faq-01",
    question: "What is NITAMUN 4.0?",
    answer:
      "NITAMUN 4.0 is the fourth edition of the annual Model United Nations conference organised by MUNSOC, the Model United Nations Society of the National Institute of Technology Agartala. It simulates high-level international multilateral bodies and parliamentary forums in an online format, offering delegates a premier platform to practice diplomacy, debate pressing global dilemmas, and draft actionable resolutions.",
    category: "General",
  },
  {
    id: "faq-02",
    question: "What is the mode and dates of the conference?",
    answer:
      "NITAMUN 4.0 is conducted entirely online on January 23–24, 2027. Participants can join the virtual committee chambers remotely from anywhere in India or internationally.",
    category: "Format",
  },
  {
    id: "faq-03",
    question: "Who is eligible to participate in NITAMUN 4.0?",
    answer:
      "Participation is open to school scholars, undergraduate students, postgraduate scholars, and working professionals. Anyone with an interest in international relations, public policy, or debate is warmly encouraged to apply.",
    category: "Participation",
  },
  {
    id: "faq-04",
    question: "What are the registration fees and deadlines?",
    answer:
      "Registration is for individual delegates with tiered fees: Early Bird is ₹400 (till Nov 30), Regular is ₹450 (till Jan 10), and Late is ₹500 (after Jan 10). The official registration link will be published soon by the Secretariat.",
    category: "Participation",
  },
  {
    id: "faq-05",
    question: "What awards are conferred per committee?",
    answer:
      "Each of the four simulation committees confers: Best Delegate (1), High Commendation (1), Special Mention (1), and Verbal/Honorable Mentions (5), accompanied by official digital certificates of statesmanship.",
    category: "Committees",
  },
  {
    id: "faq-06",
    question: "Do I need prior Model UN experience?",
    answer:
      "No prior MUN experience is required. While seasoned debaters will appreciate our substantive scrutiny, first-time participants will receive comprehensive Background Guides, Rules of Procedure (RoP) manuals, and orientation before committee sessions commence.",
    category: "General",
  },
];

/* =========================================================================
   COMPATIBILITY EXPORTS FOR HOME SECTIONS
   ========================================================================= */
export const aboutContent = {
  eyebrow: "THE ONLINE CONFERENCE",
  headline: "Where diplomacy transcends borders and perspectives challenge convention.",
  leadParagraph:
    "NITAMUN 4.0 is an online Model United Nations conference organised by MUNSOC, National Institute of Technology Agartala. Bringing together students and working professionals to experience diplomacy, debate, and international relations.",
  bodyParagraph:
    "Convened virtually on January 23–24, 2027, NITAMUN 4.0 enables delegates worldwide to connect seamlessly, debate pressing geopolitical issues under authentic UN procedures, and negotiate binding consensus across four specialized councils.",
  pillars: [
    {
      title: "Geopolitical Rigour",
      description: "Authentic UN committee simulations adhering strictly to established rules of procedure and international conventions.",
    },
    {
      title: "Intellectual Sovereignty",
      description: "Delegates represent foreign policies authentically without ideological preconceptions.",
    },
    {
      title: "Consensus Building",
      description: "Transforming impassioned rhetoric into pragmatic, clause-by-clause draft resolutions.",
    },
  ],
};
