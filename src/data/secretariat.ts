import dattatreyaWebp from '../assets/secretariat/dattatreya-datta.webp';
import dattatreyaJpg from '../assets/secretariat/dattatreya-datta.jpg';
import sreejanWebp from '../assets/secretariat/sreejan-das.webp';
import sreejanJpg from '../assets/secretariat/sreejan-das.jpg';
import dweepWebp from '../assets/secretariat/dweep-sutradhar.webp';
import dweepJpg from '../assets/secretariat/dweep-sutradhar.jpg';
import sumitWebp from '../assets/secretariat/sumit-paul.webp';
import sumitJpg from '../assets/secretariat/sumit-paul.jpg';

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
  name: string;
  role: string;
  department: string;
  linkedInUrl?: string;
  imageWebp?: string;
  imageJpg?: string;
}

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

// Tier 2: Additional Secretariat Members (reserved for future expansion)
export const additionalSecretariatMembers: SecretariatMember[] = [];
