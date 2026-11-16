// Central Configuration for NITAMUN 4.0
// All official dates, links, contacts, forms, and settings are editable centrally here.

export type NavDestinationId = 'home' | 'about' | 'events' | 'committees' | 'registration' | 'contact';

export interface NavDestination {
  id: NavDestinationId;
  label: string;
  shortLabel: string;
  path: string;
  badge?: string;
  description: string;
  iconName: 'Home' | 'Info' | 'Calendar' | 'Users' | 'Ticket' | 'Mail';
}

export interface CommitteeAward {
  title: string;
  count: number;
  description: string;
}

export interface ConferenceConfig {
  name: string;
  edition: string;
  editionRoman: string;
  year: string;
  tagline: string;
  subTagline: string;
  organizer: {
    name: string;
    parentInstitute: string;
    shortInstitute: string;
    location: string;
    chapter: string;
    conferenceMode: string;
  };
  dates: {
    status: 'TBA' | 'CONFIRMED';
    displayDate: string;
    mode: string;
    note: string;
    dayOneDate: string;
    dayTwoDate: string;
  };
  registration: {
    isOpen: boolean;
    statusLabel: string;
    portalUrl: string; // Kept empty / no external link until official link release
    isAwaitingLink: boolean;
    fees: {
      earlyBird: string;
      earlyBirdDeadline: string;
      regular: string;
      regularDeadline: string;
      late: string;
      lateDeadline: string;
    };
    participants: string;
    awardsPerCommittee: CommitteeAward[];
  };
  contacts: {
    email: string;
    phoneSecretariat: string;
    phoneDelegateAffairs: string;
    instagram: string;
    linkedin: string;
    address: string;
  };
  formService: {
    endpoint: string;
    accessKey: string;
    recipientEmail: string;
  };
  sheetDb: {
    apiUrl: string;
  };
  destinations: NavDestination[];
}

export const conferenceConfig: ConferenceConfig = {
  name: "NITAMUN",
  edition: "Fourth Edition",
  editionRoman: "4.0",
  year: "2027",
  tagline: "Beyond Borders. Beyond Perspectives.",
  subTagline: "A flagship online Model United Nations conference bringing together students and working professionals to experience diplomacy, debate, and international relations.",
  organizer: {
    name: "MUNSOC",
    parentInstitute: "National Institute of Technology Agartala",
    shortInstitute: "NIT Agartala",
    location: "NIT Agartala, Tripura, India",
    chapter: "Model United Nations Society, NIT Agartala",
    conferenceMode: "Flagship Online Model United Nations Conference",
  },
  dates: {
    status: "CONFIRMED",
    displayDate: "January 23–24, 2027",
    mode: "Online",
    note: "NITAMUN 4.0 will be conducted entirely online on January 23–24, 2027, convening delegates from across India and worldwide.",
    dayOneDate: "January 23, 2027",
    dayTwoDate: "January 24, 2027",
  },
  registration: {
    isOpen: true,
    statusLabel: "Registration Live",
    portalUrl: "", // Internal delegate registration form enabled
    isAwaitingLink: false,
    fees: {
      earlyBird: "₹400",
      earlyBirdDeadline: "till Nov 30",
      regular: "₹450",
      regularDeadline: "till Jan 10",
      late: "₹500",
      lateDeadline: "after Jan 10",
    },
    participants: "Students and working professionals encouraged to join and experience diplomacy firsthand.",
    awardsPerCommittee: [
      { title: "Best Delegate", count: 1, description: "Highest diplomatic distinction awarded for substantive statesmanship, consensus leadership, and procedural mastery." },
      { title: "High Commendation", count: 1, description: "Conferred for rigorous foreign policy advocacy, persuasive debate, and comprehensive resolution drafting." },
      { title: "Special Mention", count: 1, description: "Recognizing outstanding caucus contribution, strategic alliance-building, and critical inquiry." },
      { title: "Verbal / Honorable Mention", count: 5, description: "Awarded to five distinguished delegates exhibiting sustained engagement and diplomatic acumen." },
    ],
  },
  contacts: {
    email: "munsoc.nita@gmail.com",
    phoneSecretariat: "+91 [CONTACT NUMBER TBA]",
    phoneDelegateAffairs: "+91 [CONTACT NUMBER TBA]",
    instagram: "https://www.instagram.com/munsoc.nita/",
    linkedin: "https://www.linkedin.com/company/munsoc-nita/",
    address: "Model United Nations Society (MUNSOC), National Institute of Technology Agartala, Tripura, India",
  },
  formService: {
    endpoint: "https://api.web3forms.com/submit",
    accessKey: "YOUR_ACCESS_KEY_HERE",
    recipientEmail: "munsoc.nita@gmail.com",
  },
  sheetDb: {
    apiUrl: (import.meta.env.VITE_SHEETDB_API_URL || 'https://sheetdb.io/api/v1/32lxk4x4tllo7').trim(),
  },
  destinations: [
    {
      id: 'home',
      label: 'Home',
      shortLabel: 'Home',
      path: '#/home',
      description: 'NITAMUN 4.0 Identity, Dotted Map & Overview',
      iconName: 'Home',
    },
    {
      id: 'about',
      label: 'About Us',
      shortLabel: 'About Us',
      path: '#/about',
      description: 'Conference Mission, MUNSOC & Vision',
      iconName: 'Info',
    },
    {
      id: 'events',
      label: 'Events',
      shortLabel: 'Events',
      path: '#/events',
      badge: 'Editorial',
      description: 'Important Dates, Fees, Participants & Awards',
      iconName: 'Calendar',
    },
    {
      id: 'committees',
      label: 'Committees',
      shortLabel: 'Committees',
      path: '#/committees',
      badge: '04',
      description: 'UNSC, UNHRC, UNCSW & AIPPM Dossiers',
      iconName: 'Users',
    },
    {
      id: 'registration',
      label: 'Registration',
      shortLabel: 'Registration',
      path: '#/registration',
      badge: 'Delegate',
      description: 'Individual Delegate Track & Fee Tiers',
      iconName: 'Ticket',
    },
    {
      id: 'contact',
      label: 'Contact Us',
      shortLabel: 'Contact Us',
      path: '#/contact',
      description: 'Secretariat Helplines & Inquiry Desk',
      iconName: 'Mail',
    },
  ],
};
