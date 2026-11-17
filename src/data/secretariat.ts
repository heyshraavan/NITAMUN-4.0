import dattatreyaWebp from '../assets/secretariat/dattatreya-datta.webp';
import dattatreyaJpg from '../assets/secretariat/dattatreya-datta.jpg';
import sreejanWebp from '../assets/secretariat/sreejan-das.webp';
import sreejanJpg from '../assets/secretariat/sreejan-das.jpg';
import dweepWebp from '../assets/secretariat/dweep-sutradhar.webp';
import dweepJpg from '../assets/secretariat/dweep-sutradhar.jpg';
import sumitWebp from '../assets/secretariat/sumit-paul.webp';
import sumitJpg from '../assets/secretariat/sumit-paul.jpg';

// Secretariat Departmental Leads / USG photographic assets
import piyushWebp from '../assets/secretariat/piyush-raj.webp';
import piyushJpg from '../assets/secretariat/piyush-raj.jpg';
import caraWebp from '../assets/secretariat/cara-lixon.webp';
import caraJpg from '../assets/secretariat/cara-lixon.jpg';
import souradeepWebp from '../assets/secretariat/souradeep-das.webp';
import souradeepJpg from '../assets/secretariat/souradeep-das.jpg';
import eventsOpsWebp from '../assets/secretariat/usg-events-operations.webp';
import eventsOpsJpg from '../assets/secretariat/usg-events-operations.jpg';
import delegateAffairsWebp from '../assets/secretariat/usg-delegate-affairs.webp';
import delegateAffairsJpg from '../assets/secretariat/usg-delegate-affairs.jpg';
import outreachWebp from '../assets/secretariat/usg-outreach.webp';
import outreachJpg from '../assets/secretariat/usg-outreach.jpg';

export interface ExecutiveProfile {
  id: string;
  number: string;
  name: string;
  designation: string;
  department: string;
  linkedInUrl: string;
  imageWebp: string;
  imageJpg: string;
  objectPosition: string;
}

export interface SecretariatMember {
  id: string;
  designation: string; // Exact designation e.g. "USG Finance", "USG Events and Operations"
  name: string; // Full name of the Secretariat member
  department: string;
  linkedInUrl?: string; // Optional: subtle LinkedIn profile link
  imageWebp: string;
  imageJpg: string;
  objectPosition?: string;
  category: 'USG' | 'Core Member';
}

/**
 * Tier 1: The Executives
 * Four principal senior executives of NITAMUN 4.0.
 * Visually dominant, senior leadership showcase.
 */
export const principalExecutives: ExecutiveProfile[] = [
  {
    id: 'dattatreya-datta',
    number: '01',
    name: 'Dattatreya Datta',
    designation: 'Secretary General',
    department: 'Executive Leadership',
    linkedInUrl: 'https://www.linkedin.com/in/dattatreya-datta-322585324/',
    imageWebp: dattatreyaWebp,
    imageJpg: dattatreyaJpg,
    objectPosition: 'center 20%',
  },
  {
    id: 'sreejan-das',
    number: '02',
    name: 'Sreejan Das',
    designation: 'Deputy Secretary General',
    department: 'Executive Leadership',
    linkedInUrl: 'https://www.linkedin.com/in/sreejan-das-396b0631b/',
    imageWebp: sreejanWebp,
    imageJpg: sreejanJpg,
    objectPosition: 'center 15%',
  },
  {
    id: 'dweep-sutradhar',
    number: '03',
    name: 'Dweep Sutradhar',
    designation: "Chargé d'affaires",
    department: 'External & Diplomatic Affairs',
    linkedInUrl: 'https://www.linkedin.com/in/dweep-sutradhar-5090591b7/',
    imageWebp: dweepWebp,
    imageJpg: dweepJpg,
    objectPosition: 'center 30%',
  },
  {
    id: 'sumit-paul',
    number: '04',
    name: 'Sumit Paul',
    designation: 'Chief of Staff',
    department: 'Administration & Operations',
    linkedInUrl: 'https://www.linkedin.com/in/sumit-paul-990729316/',
    imageWebp: sumitWebp,
    imageJpg: sumitJpg,
    objectPosition: 'center 18%',
  },
];

/**
 * Tier 2: The Secretariat
 * Under Secretary Generals (USGs) and Core Members.
 * Both groups share the identical visual importance and card hierarchy.
 * All six members arranged in ONE horizontal row on desktop.
 */
export const underSecretaryGenerals: SecretariatMember[] = [
  {
    id: 'usg-finance',
    designation: 'USG Finance',
    name: 'Piyush Raj',
    department: 'Finance & Treasury',
    linkedInUrl: undefined, // Not provided
    imageWebp: piyushWebp,
    imageJpg: piyushJpg,
    objectPosition: 'center top',
    category: 'USG',
  },
  {
    id: 'usg-graphics',
    designation: 'USG Graphics',
    name: 'Cara Lixon',
    department: 'Design & Creative Media',
    linkedInUrl: 'https://www.linkedin.com/in/caralixon/',
    imageWebp: caraWebp,
    imageJpg: caraJpg,
    objectPosition: 'center top',
    category: 'USG',
  },
  {
    id: 'usg-technical',
    designation: 'USG Technical',
    name: 'Souradeep Das',
    department: 'Technology & Web Systems',
    linkedInUrl: 'https://www.linkedin.com/in/souradeep-das-7261b0384/',
    imageWebp: souradeepWebp,
    imageJpg: souradeepJpg,
    objectPosition: 'center 10%',
    category: 'USG',
  },
  {
    id: 'usg-events-operations',
    designation: 'USG Events and Operations',
    name: 'Sayan Sutradhar',
    department: 'Logistics & Operations',
    linkedInUrl: 'https://www.linkedin.com/in/sayan2006/',
    imageWebp: eventsOpsWebp,
    imageJpg: eventsOpsJpg,
    objectPosition: 'center top',
    category: 'USG',
  },
  {
    id: 'usg-delegate-affairs',
    designation: 'USG Delegate Affairs',
    name: 'Apoorva Singh',
    department: 'Delegate Relations & Affairs',
    linkedInUrl: 'https://www.linkedin.com/in/apoorva-singh-020540374/',
    imageWebp: delegateAffairsWebp,
    imageJpg: delegateAffairsJpg,
    objectPosition: 'center 80%',
    category: 'USG',
  },
  {
    id: 'usg-outreach',
    designation: 'USG Institutional and Corporate Outreach',
    name: 'Shivani Tiwari',
    department: 'Institutional & Corporate Outreach',
    linkedInUrl: 'https://www.linkedin.com/in/shivani-tiwari-965871256/',
    imageWebp: outreachWebp,
    imageJpg: outreachJpg,
    objectPosition: 'center 15%',
    category: 'USG',
  },
];

/**
 * Future Core Members storage.
 * Core Members will automatically populate into the exact same Secretariat grid
 * with the exact same compact card hierarchy as USGs.
 */
export const coreMembers: SecretariatMember[] = [];

/**
 * Unified Secretariat roster: USGs and Core Members as peers.
 */
export const secretariatMembers: SecretariatMember[] = [
  ...underSecretaryGenerals,
  ...coreMembers,
];

// Alias for backwards compatibility with any previous consumers
export const additionalSecretariatMembers = secretariatMembers;
