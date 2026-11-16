# NITAMUN 4.0

> **"Beyond Borders. Beyond Perspectives."**  
> Official website and delegate interface for the fourth edition of NITAMUN, organised by the **Model United Nations Society (MUNSOC)** at the **National Institute of Technology Agartala**.

[![React](https://img.shields.io/badge/React-19.0-61DAFB?logo=react&logoColor=black)](#tech-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?logo=typescript&logoColor=white)](#tech-stack)
[![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?logo=vite&logoColor=white)](#tech-stack)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white)](#tech-stack)

---

## About the Website

The **NITAMUN 4.0** website serves as the primary digital gateway, information repository, and accreditation interface for the conference. Convened **online** on **January 23–24, 2027**, the platform provides delegates and participants with:

- Official conference timelines, fee tiers, and participation guidelines.
- Substantive council dossiers, agendas, and procedural mandates.
- An interactive five-stage exploration of the Model UN diplomatic process.
- A centralized inquiry desk and secretariat contact interface.
- A responsive, accessible single-page application (SPA) built with React, TypeScript, and Vite.

The visual direction follows an editorial diplomatic aesthetic: Warm Ivory canvas (`#EBE9D8`), Deep Charcoal typography (`#25231F`), and Crimson accents (`#CB1B29`), paired with classical display serifs (`Instrument Serif`, `Cormorant Garamond`) and modern grotesques (`Inter`, `Manrope`, `IBM Plex Mono`).

---

## Features

### Six Primary Destinations
The application architecture is organized into six distinct destinations managed via client-side hash routing (`NavigationContext`):

1. **Home (`#/home`)**
   - Balanced two-column hero composition pairing editorial typography with the official circular emblem.
   - Interactive background world map with diplomatic connection arcs and active node pulses.
   - Pinned five-stage horizontal storytelling experience traversing the anatomy of multilateral diplomacy.
   - Key highlights and strategic entry gateways to other destinations.

2. **About Us (`#/about`)**
   - Institutional profile of MUNSOC and NIT Agartala.
   - Conference vision, mission, and the four institutional objectives.
   - "Why Participate" overview highlighting substantive quality, diverse cohorts, and recognition.

3. **Events (`#/events`)**
   - Curated into four official information groups:
     - **Important Dates**: January 23–24, 2027 (Online Format).
     - **Registration Fees**: Early Bird (₹400), Regular (₹450), and Late (₹500).
     - **Participants**: Students and working professionals are encouraged to participate.
     - **Awards Per Committee**: Best Delegate (1), High Commendation (1), Special Mention (1), and Verbal Mentions (5).

4. **Committees (`#/committees`)**
   - Detailed committee dossiers for four simulation councils:
     - **UNSC** — United Nations Security Council (Continuous Crisis / Specialized Agency)
     - **UNHRC** — United Nations Human Rights Council (General Assembly Body)
     - **UNCSW** — United Nations Commission on the Status of Women (Functional Commission of ECOSOC)
     - **AIPPM** — All India Political Parties Meet (Specialized Indian Parliamentary Simulation)
   - Interactive modal drawers detailing mandates, agenda overviews, and expected resolution outcomes.

5. **Registration (`#/registration`)**
   - Single accreditation track: **Individual Delegate only**.
   - Transparent fee tier breakdown with deadline milestones.
   - Clear status indicator displaying **"Registration Link Coming Soon"** pending official release (no unofficial external links).

6. **Contact Us (`#/contact`)**
   - Secretariat inquiry desk with one-click email copy to clipboard.
   - Contact form with client-side validation, Web3Forms support, and a pre-filled `mailto:` fallback if unconfigured.
   - Categorized and searchable FAQ accordion covering General, Format, Participation, and Committees topics.

### Navigation & Global Interface
- **Sticky Header**: Top bar featuring the official circular emblem and wordmark linking to Home, active destination pill indicator, and responsive mobile drawer.
- **Floating Dock Navbar**: Centered bottom pill default-styled with **icons only** in deep charcoal and a crimson active dot; smoothly expands on hover to display destination labels.
- **Footer**: Three-column editorial footer with institutional credentials, verified social links, and padding to prevent dock collision.

### Motion Design & Accessibility
- **GSAP & ScrollTrigger**: Entrance reveals, parallax depth effects, and desktop horizontal pinned track traversal.
- **Lenis Smooth Scroll**: Hardware-accelerated smooth scrolling synchronized with ScrollTrigger updates.
- **Reduced Motion**: Comprehensive `@media (prefers-reduced-motion: reduce)` support in CSS and programmatic checks in JavaScript (`checkReducedMotion`).
- **Hardware-Accelerated Cursor**: Custom desktop cursor follower utilizing direct DOM matrix transforms via `requestAnimationFrame` (0 React state re-renders during pointer moves).
- **Focus Indicators**: High-contrast focus rings (`outline: 2px solid #CB1B29`) across all interactive elements for keyboard navigation.

### Official Favicon Suite
Multi-platform icon suite generated directly from the authentic NITAMUN 4.0 logo with an anti-aliased circular alpha mask:
- `favicon.ico` (multi-resolution container: 16×16, 32×32, 48×48)
- `favicon.svg` (scalable SVG container)
- `favicon-16x16.png`, `favicon-32x32.png`, `favicon-48x48.png`
- `apple-touch-icon.png` (180×180 for iOS Safari)
- `android-chrome-192x192.png`, `android-chrome-512x512.png`
- `site.webmanifest` (Web App Manifest with institutional metadata)

---

## Tech Stack

| Technology | Category | Purpose in Project |
| :--- | :--- | :--- |
| **React 19** | UI Library | Component hierarchy, hooks, route-level code splitting via `React.lazy` and `Suspense` |
| **TypeScript 5** | Language | Type safety, interface contracts for configuration, content, and council agendas |
| **Vite 6** | Build Tool | Development server with HMR, optimized Rollup bundling, asset pipeline |
| **Tailwind CSS 4** | Styling | Utility styling via `@tailwindcss/vite`, CSS design tokens, custom font definitions |
| **GSAP 3** | Motion | Entrance timeline sequencing, parallax scroll effects, pinned horizontal scroll |
| **Lenis** | Motion | Smooth scrolling integrated with GSAP ScrollTrigger updates |
| **Lucide React** | Icons | Diplomatic and interface iconography |
| **sharp** | Build / Utility | High-performance image processing for multi-resolution favicon generation |
| **clsx & tailwind-merge** | Utility | Deterministic conditional className combination |

---

## Project Structure

```text
NITAMUN-4.0/
├── public/                     # Static public assets served directly
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── emblem.jpg              # Official NITAMUN 4.0 diplomatic emblem
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   ├── favicon.ico             # Multi-resolution ICO (16, 32, 48)
│   ├── favicon.svg             # Scalable SVG favicon
│   └── site.webmanifest        # Web App Manifest
├── src/
│   ├── assets/                 # Bundled graphic assets
│   │   └── emblem.jpg          # High-resolution official emblem
│   ├── components/             # Reusable UI components
│   │   ├── AnimatedText.tsx    # Split-text entrance animation
│   │   ├── Button.tsx          # Editorial and primary CTA buttons
│   │   ├── CommitteeCard.tsx   # Council card with interactive dossier modal
│   │   ├── CustomCursor.tsx    # RAF-driven desktop pointer follower
│   │   ├── FAQAccordion.tsx    # Accessible categorized inquiry accordion
│   │   ├── FloatingNavbar.tsx  # Expandable bottom dock navigation
│   │   ├── Footer.tsx          # Editorial site footer
│   │   ├── Header.tsx          # Persistent top header with mobile drawer
│   │   ├── SectionHeading.tsx  # Standardized editorial section headers
│   │   ├── StatusBadge.tsx     # Pulsing live status indicator badge
│   │   └── WorldMap.tsx        # Dotted cartographic map with SVG connection arcs
│   ├── context/
│   │   └── NavigationContext.tsx # Centralized client-side destination routing
│   ├── data/
│   │   ├── config.ts           # Central configuration (dates, fees, links, contacts)
│   │   └── content.ts          # Substantive content (committees, stages, FAQs, about)
│   ├── hooks/
│   │   ├── useReducedMotion.ts # Detects system accessibility motion preferences
│   │   └── useScrollProgress.ts# Tracks scroll percentages for animations
│   ├── lib/
│   │   ├── animations.ts       # GSAP helper functions and motion guards
│   │   ├── scroll.ts           # Lenis initialization and scroll synchronization
│   │   └── utils.ts            # ClassName merging utilities
│   ├── pages/                  # Route-level lazy-loaded destinations
│   │   ├── AboutPage.tsx       # Destination 02: About Us
│   │   ├── CommitteesPage.tsx  # Destination 04: Committees
│   │   ├── ContactPage.tsx     # Destination 06: Contact Us
│   │   ├── EventsPage.tsx      # Destination 03: Events, Dates & Fees
│   │   ├── HomePage.tsx        # Destination 01: Home
│   │   └── RegistrationPage.tsx# Destination 05: Delegate Registration
│   ├── sections/               # Home-specific composite sections
│   │   ├── Experience.tsx      # 5-stage horizontal pinned storytelling section
│   │   └── Hero.tsx            # Two-column hero with parallel emblem & map canvas
│   ├── styles/
│   │   └── index.css           # Tailwind CSS imports, color tokens, font utilities
│   ├── App.tsx                 # Root application wrapper with Suspense boundaries
│   ├── main.tsx                # React entry point
│   └── vite-env.d.ts           # Vite TypeScript environment declarations
├── index.html                  # HTML5 document template with complete SEO & touch metadata
├── package.json                # Project dependencies, scripts, and engine metadata
├── tsconfig.json               # TypeScript compiler options
├── tsconfig.node.json          # Node configuration for build tools
└── vite.config.ts              # Vite bundler, plugins, aliases, and Rollup chunking
```

### Important Files
- **`src/data/config.ts`**: Centralized configuration containing official dates, registration status, fee tiers, contact emails, social channels, and destination route definitions.
- **`src/data/content.ts`**: Substantive content repository storing committee mandates, agendas, the 5-stage experience narrative, FAQ items, and institutional overview text.
- **`src/context/NavigationContext.tsx`**: Provides application-wide destination routing via browser hash synchronization (`#/home`, `#/about`, etc.), programmatic transitions, and scroll resets.

---

## Getting Started

### Prerequisites
- **Node.js**: `v18.0.0` or higher (tested on Node.js `v24.x`)
- **Package Manager**: `npm` (v9 or higher)

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/souradeep-das-04/NITAMUN-4.0.git
   ```
2. Navigate into the cloned project directory:
   ```bash
   cd NITAMUN-4.0
   ```
3. Install project dependencies:
   ```bash
   npm install
   ```
4. Start the local development server:
   ```bash
   npm run dev
   ```
5. Open your browser and navigate to `http://localhost:5173/`.

---

## Available Scripts

In the project directory, you can execute:

| Command | Action | Description |
| :--- | :--- | :--- |
| `npm run dev` | `vite` | Starts the Vite development server with Hot Module Replacement (HMR). |
| `npm run build` | `tsc -b && vite build` | Type-checks the entire TypeScript codebase and compiles static assets into `dist/`. |
| `npm run preview` | `vite preview` | Runs a local web server serving the production build from `dist/` for pre-deployment verification. |

---

## Conference Information

| Parameter | Official Details |
| :--- | :--- |
| **Conference** | NITAMUN 4.0 (Fourth Edition) |
| **Dates** | **January 23–24, 2027** |
| **Format** | **Online** (Convened digitally) |
| **Organiser** | Model United Nations Society (MUNSOC), NIT Agartala |
| **Institution** | National Institute of Technology Agartala, Tripura, India |
| **Committees** | UNSC, UNHRC, UNCSW, AIPPM |
| **Eligibility** | Students and working professionals are encouraged to participate |
| **Registration Track** | Individual Delegates only |
| **Registration Fees** | Early Bird: ₹400 (till Nov 30) • Regular: ₹450 (till Jan 10) • Late: ₹500 (after Jan 10) |
| **Registration Status** | **Awaiting Official Release** (*Registration Link Coming Soon*) |

---

## Screenshots

<!--
Optional Section: Add screenshots of the website once preview environments are deployed.
Example:
![NITAMUN 4.0 Hero Section](public/screenshots/hero-desktop.png)
![NITAMUN 4.0 Events & Fees](public/screenshots/events-desktop.png)
-->

*Screenshots will be added upon deployment of official conference preview environments.*

---

## Contact & Official Channels

For communications and delegate inquiries:

- **Official Secretariat Email**: [munsoc.nita@gmail.com](mailto:munsoc.nita@gmail.com)
- **Instagram**: [@munsoc.nita](https://www.instagram.com/munsoc.nita/)
- **LinkedIn**: [MUNSOC NIT Agartala](https://www.linkedin.com/company/munsoc-nita/)
- **Location**: National Institute of Technology Agartala, Tripura, India

---

## Credits & Institutional Governance

- **Organising Body**: Model United Nations Society (MUNSOC)
- **Parent Institution**: National Institute of Technology Agartala (NIT Agartala)
