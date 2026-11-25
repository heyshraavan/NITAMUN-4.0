// SEO Configuration and Structured Data for NITAMUN 4.0
// Official Primary Domain: https://www.nitamun.co.in
// Official Secondary Domain (301 redirect): https://nitamun.co.in

export const PRIMARY_DOMAIN = 'https://www.nitamun.co.in';
export const SECONDARY_DOMAIN = 'https://nitamun.co.in';
export const DEFAULT_OG_IMAGE = `${PRIMARY_DOMAIN}/emblem-circular.png`;

export interface PageMetadata {
  path: string;
  title: string;
  description: string;
  canonical: string;
  ogType: 'website';
  ogTitle: string;
  ogDescription: string;
  ogImage: string;
  twitterTitle: string;
  twitterDescription: string;
  twitterImage: string;
}

export const PAGE_SEO_METADATA: Record<string, PageMetadata> = {
  home: {
    path: '/',
    title: "NITAMUN 4.0 | India's Largest Online Model United Nations",
    description:
      'NITAMUN 4.0 is an online Model United Nations conference organised by the Model United Nations Society (MUNSOC), National Institute of Technology Agartala, on January 23–24, 2027.',
    canonical: `${PRIMARY_DOMAIN}/`,
    ogType: 'website',
    ogTitle: "NITAMUN 4.0 | India's Largest Online Model United Nations",
    ogDescription:
      'NITAMUN 4.0 is an online Model United Nations conference organised by the Model United Nations Society (MUNSOC), National Institute of Technology Agartala, on January 23–24, 2027.',
    ogImage: DEFAULT_OG_IMAGE,
    twitterTitle: "NITAMUN 4.0 | India's Largest Online Model United Nations",
    twitterDescription:
      'NITAMUN 4.0 is an online Model United Nations conference organised by the Model United Nations Society (MUNSOC), National Institute of Technology Agartala, on January 23–24, 2027.',
    twitterImage: DEFAULT_OG_IMAGE,
  },
  about: {
    path: '/about',
    title: 'About Us | NITAMUN 4.0 | MUNSOC NIT Agartala',
    description:
      'Learn about NITAMUN 4.0, organised by the Model United Nations Society (MUNSOC) at National Institute of Technology Agartala. Discover our Secretariat, legacy, and diplomatic vision.',
    canonical: `${PRIMARY_DOMAIN}/about`,
    ogType: 'website',
    ogTitle: 'About Us | NITAMUN 4.0 | MUNSOC NIT Agartala',
    ogDescription:
      'Learn about NITAMUN 4.0, organised by the Model United Nations Society (MUNSOC) at National Institute of Technology Agartala. Discover our Secretariat, legacy, and diplomatic vision.',
    ogImage: DEFAULT_OG_IMAGE,
    twitterTitle: 'About Us | NITAMUN 4.0 | MUNSOC NIT Agartala',
    twitterDescription:
      'Learn about NITAMUN 4.0, organised by the Model United Nations Society (MUNSOC) at National Institute of Technology Agartala. Discover our Secretariat, legacy, and diplomatic vision.',
    twitterImage: DEFAULT_OG_IMAGE,
  },
  events: {
    path: '/events',
    title: 'Events & Schedule | NITAMUN 4.0 Online MUN',
    description:
      'Conference schedule, official dates (January 23–24, 2027), and registration fee structure for NITAMUN 4.0: Early Bird ₹400, Regular ₹450, and Late ₹500.',
    canonical: `${PRIMARY_DOMAIN}/events`,
    ogType: 'website',
    ogTitle: 'Events & Schedule | NITAMUN 4.0 Online MUN',
    ogDescription:
      'Conference schedule, official dates (January 23–24, 2027), and registration fee structure for NITAMUN 4.0: Early Bird ₹400, Regular ₹450, and Late ₹500.',
    ogImage: DEFAULT_OG_IMAGE,
    twitterTitle: 'Events & Schedule | NITAMUN 4.0 Online MUN',
    twitterDescription:
      'Conference schedule, official dates (January 23–24, 2027), and registration fee structure for NITAMUN 4.0: Early Bird ₹400, Regular ₹450, and Late ₹500.',
    twitterImage: DEFAULT_OG_IMAGE,
  },
  committees: {
    path: '/committees',
    title: 'Committees & Agendas | NITAMUN 4.0 Online MUN',
    description:
      'Explore the 4 committees of NITAMUN 4.0: UNSC, UNHRC, UNCSW, and AIPPM. Access committee agendas, executive boards, and background study dossiers.',
    canonical: `${PRIMARY_DOMAIN}/committees`,
    ogType: 'website',
    ogTitle: 'Committees & Agendas | NITAMUN 4.0 Online MUN',
    ogDescription:
      'Explore the 4 committees of NITAMUN 4.0: UNSC, UNHRC, UNCSW, and AIPPM. Access committee agendas, executive boards, and background study dossiers.',
    ogImage: DEFAULT_OG_IMAGE,
    twitterTitle: 'Committees & Agendas | NITAMUN 4.0 Online MUN',
    twitterDescription:
      'Explore the 4 committees of NITAMUN 4.0: UNSC, UNHRC, UNCSW, and AIPPM. Access committee agendas, executive boards, and background study dossiers.',
    twitterImage: DEFAULT_OG_IMAGE,
  },
  registration: {
    path: '/registration',
    title: 'Delegate Registration | NITAMUN 4.0 Online MUN',
    description:
      'Register as a delegate for NITAMUN 4.0 online. Select preferences across UNSC, UNHRC, UNCSW, and AIPPM. Registration tiers: ₹400 Early Bird, ₹450 Regular, ₹500 Late.',
    canonical: `${PRIMARY_DOMAIN}/registration`,
    ogType: 'website',
    ogTitle: 'Delegate Registration | NITAMUN 4.0 Online MUN',
    ogDescription:
      'Register as a delegate for NITAMUN 4.0 online. Select preferences across UNSC, UNHRC, UNCSW, and AIPPM. Registration tiers: ₹400 Early Bird, ₹450 Regular, ₹500 Late.',
    ogImage: DEFAULT_OG_IMAGE,
    twitterTitle: 'Delegate Registration | NITAMUN 4.0 Online MUN',
    twitterDescription:
      'Register as a delegate for NITAMUN 4.0 online. Select preferences across UNSC, UNHRC, UNCSW, and AIPPM. Registration tiers: ₹400 Early Bird, ₹450 Regular, ₹500 Late.',
    twitterImage: DEFAULT_OG_IMAGE,
  },
  contact: {
    path: '/contact',
    title: 'Contact Us | NITAMUN 4.0 Secretariat & Support',
    description:
      'Contact the NITAMUN 4.0 Secretariat at munsoc.nitamun@gmail.com. Reach out to our organizing team for delegate affairs, committee inquiries, and conference support.',
    canonical: `${PRIMARY_DOMAIN}/contact`,
    ogType: 'website',
    ogTitle: 'Contact Us | NITAMUN 4.0 Secretariat & Support',
    ogDescription:
      'Contact the NITAMUN 4.0 Secretariat at munsoc.nitamun@gmail.com. Reach out to our organizing team for delegate affairs, committee inquiries, and conference support.',
    ogImage: DEFAULT_OG_IMAGE,
    twitterTitle: 'Contact Us | NITAMUN 4.0 Secretariat & Support',
    twitterDescription:
      'Contact the NITAMUN 4.0 Secretariat at munsoc.nitamun@gmail.com. Reach out to our organizing team for delegate affairs, committee inquiries, and conference support.',
    twitterImage: DEFAULT_OG_IMAGE,
  },
};

/**
 * Updates DOM title, meta description, canonical, Open Graph, and Twitter card tags dynamically
 */
export function applyPageSeo(destinationId: string): void {
  if (typeof document === 'undefined') return;

  const meta = PAGE_SEO_METADATA[destinationId] || PAGE_SEO_METADATA.home;

  // 1. Title
  document.title = meta.title;

  // Helper to set or create meta tag
  const setMeta = (nameAttr: 'name' | 'property', attrValue: string, content: string) => {
    let el = document.querySelector(`meta[${nameAttr}="${attrValue}"]`) as HTMLMetaElement | null;
    if (!el) {
      el = document.createElement('meta');
      el.setAttribute(nameAttr, attrValue);
      document.head.appendChild(el);
    }
    el.setAttribute('content', content);
  };

  // 2. Standard description
  setMeta('name', 'description', meta.description);

  // 3. Canonical Link (guarantee strictly 1 canonical tag in DOM)
  const canonicalLinks = document.querySelectorAll('link[rel="canonical"]');
  let canonicalEl: HTMLLinkElement;
  if (canonicalLinks.length > 0) {
    canonicalEl = canonicalLinks[0] as HTMLLinkElement;
    for (let i = 1; i < canonicalLinks.length; i++) {
      canonicalLinks[i].remove();
    }
  } else {
    canonicalEl = document.createElement('link');
    canonicalEl.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalEl);
  }
  canonicalEl.setAttribute('href', meta.canonical);

  // 4. Open Graph
  setMeta('property', 'og:title', meta.ogTitle);
  setMeta('property', 'og:description', meta.ogDescription);
  setMeta('property', 'og:url', meta.canonical);
  setMeta('property', 'og:type', meta.ogType);
  setMeta('property', 'og:image', meta.ogImage);

  // 5. Twitter Card
  setMeta('name', 'twitter:title', meta.twitterTitle);
  setMeta('name', 'twitter:description', meta.twitterDescription);
  setMeta('name', 'twitter:url', meta.canonical);
  setMeta('name', 'twitter:image', meta.twitterImage);
}

/**
 * Schema.org Event JSON-LD definition
 */
export const EVENT_JSON_LD = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: 'NITAMUN 4.0',
  alternateName: 'NIT Agartala Model United Nations 4.0',
  description:
    'NITAMUN 4.0 is an online Model United Nations conference organised by the Model United Nations Society (MUNSOC), National Institute of Technology Agartala, on January 23–24, 2027.',
  url: `${PRIMARY_DOMAIN}/`,
  startDate: '2027-01-23',
  endDate: '2027-01-24',
  eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
  eventStatus: 'https://schema.org/EventScheduled',
  location: {
    '@type': 'VirtualLocation',
    url: `${PRIMARY_DOMAIN}/`,
  },
  image: [DEFAULT_OG_IMAGE],
  organizer: {
    '@type': 'Organization',
    name: 'Model United Nations Society, National Institute of Technology Agartala',
    alternateName: 'MUNSOC, NIT Agartala',
    url: `${PRIMARY_DOMAIN}/`,
    logo: DEFAULT_OG_IMAGE,
    email: 'munsoc.nitamun@gmail.com',
    sameAs: [
      'https://www.instagram.com/munsoc.nita/',
      'https://www.linkedin.com/company/munsoc-nita/',
    ],
  },
};
