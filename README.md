# NITAMUN 4.0

> **Beyond Borders. Beyond Perspectives.**  
> Official web platform and delegate interface for the fourth edition of NITAMUN, organised by the **Model United Nations Society (MUNSOC)** at the **National Institute of Technology Agartala**.

[![React](https://img.shields.io/badge/React-19.0.0-61DAFB?logo=react&logoColor=black)](#technology-stack)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7.2-3178C6?logo=typescript&logoColor=white)](#technology-stack)
[![Vite](https://img.shields.io/badge/Vite-6.2.0-646CFF?logo=vite&logoColor=white)](#technology-stack)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0.9-06B6D4?logo=tailwindcss&logoColor=white)](#technology-stack)
[![GSAP](https://img.shields.io/badge/GSAP-3.12.7-88CE02?logo=greensock&logoColor=white)](#technology-stack)
[![Lenis](https://img.shields.io/badge/Lenis-1.1.20-black)](#technology-stack)

---

## Project Overview

- **Project Name:** NITAMUN 4.0 (Fourth Edition)
- **Organised By:** Model United Nations Society (MUNSOC), National Institute of Technology Agartala
- **Tagline:** Beyond Borders. Beyond Perspectives.
- **Conference Dates:** January 23–24, 2027
- **Conference Mode:** Online Conference (Convened digitally worldwide)
- **Official Inquiries:** munsoc.nitamun@gmail.com

NITAMUN 4.0 serves as the primary digital portal, substantive repository, and delegate accreditation interface for the conference. Designed with an editorial diplomatic aesthetic—Warm Ivory canvas (`#EBE9D8`), Deep Charcoal typography (`#25231F`), and Crimson accents (`#CB1B29`), paired with classical serifs and modern grotesques—the platform provides an authentic, accessible, and high-performance user experience across all devices.

---

## Technology Stack

The project utilizes a modern frontend architecture with strict dependency boundaries:

| Technology | Version | Purpose in Project |
| :--- | :--- | :--- |
| **React** | `19.0.0` | Declarative UI layer, concurrent rendering, and route-level code splitting via `React.lazy` and `Suspense` |
| **TypeScript** | `~5.7.2` | Static type checking and strict interface contracts across configuration, committees, and registration payloads |
| **Vite** | `^6.2.0` | Development server with instant HMR and optimized production Rollup bundling |
| **Tailwind CSS** | `^4.0.9` | High-performance CSS engine via `@tailwindcss/vite` using native CSS variables and responsive design tokens |
| **GSAP** | `^3.12.7` | Professional animation engine driving entrance reveals, parallax scroll effects, and pinned horizontal transitions |
| **ScrollTrigger** | `^3.12.7` | Scroll position synchronization with GSAP timelines |
| **Lenis** | `^1.1.20` | Hardware-accelerated smooth scrolling synchronized with ScrollTrigger and modal scroll locks |
| **Lucide React** | `^1.16.0` | Lightweight, accessible SVG iconography |
| **clsx & tailwind-merge** | `^2.1.1` / `^3.0.2` | Deterministic conditional className merging |
| **sharp** | `^0.35.5` | Asset processing utility for multi-resolution images and favicons (dev-only) |

---

## Features

### 1. Six Dedicated Destinations (SPA Client Routing)
Managed via `NavigationContext` with URL hash synchronization (`#/home`, `#/about`, `#/events`, `#/committees`, `#/registration`, `#/contact`):

- **Home (`#/home`):**
  - Two-column hero with the official circular emblem, golden shimmer sweep, and dynamic astrolabe orbits.
  - Interactive background world map with diplomatic connection arcs and active node pulses.
  - Pinned 3-stage horizontal narrative (`Experience.tsx`) covering the progression of model diplomacy on desktop, adapting gracefully to vertical flow on mobile.
  - Highlights grid with quick gateways to other conference pillars and conference statistics.
- **About Us (`#/about`):**
  - Institutional profile of MUNSOC and National Institute of Technology Agartala.
  - Conference vision, mission statement, and the four core institutional objectives.
  - Five pillars explaining why delegates choose NITAMUN.
  - Comprehensive two-tier Secretariat leadership showcase.
- **Events (`#/events`):**
  - **Important Dates:** January 23–24, 2027 (Confirmed Online Conclave).
  - **Registration Fees:** Early Bird (₹400, until December 15), Regular (₹450, till Jan 10), Late (₹500, after Jan 10).
  - **Participants:** Open accreditation welcoming students and working professionals.
  - **Awards Per Committee:** Best Delegate (1), High Commendation (1), Special Mention (1), Verbal/Honorable Mention (5).
  - **Total Prize Pool:** Prominent diplomatic distinction announcement block.
- **Committees (`#/committees`):**
  - Four simulation councils:
    - **UNSC** — United Nations Security Council (Continuous Crisis / Specialized Agency)
    - **UNHRC** — United Nations Human Rights Council (General Assembly Body)
    - **UNCSW** — United Nations Commission on the Status of Women (Functional Commission of ECOSOC)
    - **AIPPM** — All India Political Parties Meet (Specialized Indian Parliamentary Simulation)
  - Interactive substantive dossier modals with full background scroll lock, touch-friendly scrolling, and Escape key dismissal.
- **Registration (`#/registration`):**
  - Single delegate track: Individual Delegate.
  - Real-time client-side validation, duplicate committee preference prevention, and automatic portfolio choice resetting.
  - Direct integration with **SheetDB (Google Sheets)** for live submission tracking with timestamping and error resilience.
  - Smooth automatic scrolling to the first invalid input on validation failures.
- **Contact Us (`#/contact`):**
  - Direct Secretariat phone numbers with clickable `tel:` links:
    - `+91 91012 05308`
    - `+91 70671 64917`
    - `+91 7005789121`
    - `+91 9774550462`
  - Secretariat inquiry desk with direct SheetDB integration and one-click email copying.
  - Categorized FAQ accordion covering format, eligibility, fees, and committees.

### 2. Secretariat Leadership Architecture
- **Tier 1: Principal Executives:**
  - Four senior leadership cards: Secretary General, Deputy Secretary General, Chargé d'affaires, Chief of Staff.
  - Dedicated brand icon actions for each executive in strict order: **WhatsApp** (`wa.me`), **Instagram**, and **LinkedIn**.
- **Tier 2: Secretariat & Operations:**
  - 13 uniform profile cards for Under Secretary Generals (USGs) and Core Members sharing equal visual importance.

### 3. Motion, Scrolling & Accessibility
- **Synchronized Scrolling:** Lenis smooth scrolling integrated with GSAP ScrollTrigger updates.
- **Background Scroll Locking:** Centralized reference-counted scroll locking (`lockBackgroundScroll` / `unlockBackgroundScroll`) that prevents background jumping when opening drawers or dossier modals.
- **Modal Isolation:** All scrollable modals feature `data-lenis-prevent` and `overscroll-contain` with native touch momentum (`-webkit-overflow-scrolling: touch`).
- **Keyboard Navigation:** Full Escape key handling on modals and mobile drawer, logical tab order, and high-contrast visible focus rings (`outline: 2px solid #CB1B29`).
- **Reduced Motion:** Automatic adaptation via `@media (prefers-reduced-motion: reduce)` in CSS and `checkReducedMotion()` in GSAP animations.

---

## Project Structure

```text
NITAMUN-4.0/
├── public/                       # Static public assets served at root
│   ├── android-chrome-192x192.png
│   ├── android-chrome-512x512.png
│   ├── apple-touch-icon.png
│   ├── emblem-circular.png       # Master circular emblem (transparent PNG)
│   ├── emblem-circular.webp      # Optimized circular emblem (WebP)
│   ├── favicon-16x16.png
│   ├── favicon-32x32.png
│   ├── favicon-48x48.png
│   ├── favicon.ico               # Multi-resolution ICO container
│   ├── favicon.svg               # Scalable vector favicon
│   ├── robots.txt                # Search engine crawler instructions
│   ├── site.webmanifest          # PWA & Web App Manifest
│   ├── sitemap.xml               # XML Sitemap
│   └── _headers                  # Security & caching headers
├── src/
│   ├── assets/                   # Bundled graphics and photographs
│   │   ├── emblem-circular.png   # Bundled circular emblem PNG
│   │   ├── emblem-circular.webp  # Bundled circular emblem WebP
│   │   └── secretariat/          # Executive and Secretariat portraits (WebP + JPG)
│   ├── components/               # Reusable UI components
│   │   ├── AnimatedText.tsx      # Editorial text animation
│   │   ├── Button.tsx            # Accessible button with auto-wrapping & arrow support
│   │   ├── CommitteeCard.tsx     # Council card with substantive dossier modal
│   │   ├── CommitteeInsignia.tsx # Vector insignia watermarks for committees
│   │   ├── CustomCursor.tsx      # Desktop RAF matrix cursor follower
│   │   ├── ExecutiveCard.tsx     # Principal executive card with social icon buttons
│   │   ├── ExecutiveLeadership.tsx # Secretariat section renderer
│   │   ├── FAQAccordion.tsx      # Searchable, accessible FAQ accordion
│   │   ├── FloatingNavbar.tsx    # Expandable floating dock navigation
│   │   ├── Footer.tsx            # Global 3-column diplomatic footer
│   │   ├── Header.tsx            # Sticky header with circular emblem & mobile drawer
│   │   ├── PolicyModal.tsx       # Terms & Conditions / Privacy Policy modal
│   │   ├── PortfolioAutocomplete.tsx # Searchable portfolio selector
│   │   ├── SecretariatMemberCard.tsx # Uniform USG and Core Member card
│   │   ├── SectionHeading.tsx    # Editorial section title component
│   │   ├── StatusBadge.tsx       # Pulsing status indicator
│   │   └── WorldMap.tsx          # Dotted cartographic map with SVG connection arcs
│   ├── context/
│   │   └── NavigationContext.tsx # Centralized client-side destination routing
│   ├── data/
│   │   ├── config.ts             # Central configuration (dates, fees, links, contacts)
│   │   ├── content.ts            # Substantive content (committees, stages, FAQs, about)
│   │   ├── portfolios.ts         # Portfolio country matrices per committee
│   │   └── secretariat.ts        # Executive and Secretariat rosters and links
│   ├── hooks/
│   │   ├── useReducedMotion.ts   # Accessibility reduced motion hook
│   │   └── useScrollProgress.ts  # Scroll tracking hook
│   ├── lib/
│   │   ├── animations.ts         # GSAP helper functions and motion checks
│   │   ├── prefetch.ts           # Route chunk idle prefetching
│   │   ├── scroll.ts             # Lenis smooth scroll and background scroll locks
│   │   └── utils.ts              # ClassName merging utility
│   ├── pages/                    # Route-level lazy-loaded destinations
│   │   ├── AboutPage.tsx         # Destination 02: About Us & Secretariat
│   │   ├── CommitteesPage.tsx    # Destination 04: Committees & Dossiers
│   │   ├── ContactPage.tsx       # Destination 06: Contact Us & Inquiries
│   │   ├── EventsPage.tsx        # Destination 03: Events, Dates & Fees
│   │   ├── HomePage.tsx          # Destination 01: Home
│   │   └── RegistrationPage.tsx  # Destination 05: Delegate Registration Form
│   ├── sections/                 # Home page specific sections
│   │   ├── Experience.tsx        # Pinned 3-stage diplomatic journey
│   │   └── Hero.tsx              # Two-column hero with emblem & world map
│   ├── styles/
│   │   └── index.css             # Tailwind CSS tokens, typography, and utility classes
│   ├── App.tsx                   # Main layout with Suspense fallback and prefetching
│   ├── main.tsx                  # React application entry point
│   └── vite-env.d.ts             # Vite client environment declarations
├── index.html                    # HTML document with critical Hero shell & LCP preload
├── package.json                  # Dependencies, scripts, and project metadata
├── tsconfig.json                 # TypeScript compiler configuration
├── tsconfig.node.json            # Node TypeScript configuration
└── vite.config.ts                # Vite build and Rollup chunking configuration
```

---

## Local Development

### Prerequisites
- **Node.js:** `v20.x` LTS recommended (`v18.0.0` or higher supported)
- **Package Manager:** `npm` (`v9.x` or higher)

### Setup & Commands

1. **Clone the repository:**
   ```bash
   git clone https://github.com/souradeep-das-04/NITAMUN-4.0.git
   cd "NITAMUN 4.0"
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start local development server:**
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Run TypeScript type validation:**
   ```bash
   npx tsc -b
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```
   Compiles type-checked, minified, fingerprinted static bundles into `dist/`.

6. **Preview production build locally:**
   ```bash
   npm run preview
   ```
   Serves the generated `dist/` directory at `http://localhost:4173/`.

---

## Environment Configuration

The application uses client-side Vite environment variables. All variables exposed to the browser must be prefixed with `VITE_`.

| Variable | Description | Default Fallback |
| :--- | :--- | :--- |
| `VITE_BASE_PATH` | Base path for GitHub Pages deployment (e.g. `/NITAMUN-4.0/`) | `/` |
| `VITE_SHEETDB_API_URL` | SheetDB API endpoint for delegate registration submissions | `https://sheetdb.io/api/v1/32lxk4x4tllo7` |
| `VITE_SHEETDB_INQUIRY_API_URL` | SheetDB API endpoint for Secretariat inquiry submissions | `https://sheetdb.io/api/v1/s0lfoie3eqpyp` |

Create a `.env` file in the project root if you wish to override the defaults locally:

```bash
cp .env.example .env
```

> **Security Note:** Never place secret credentials, private database passwords, or service-role keys in `.env` files, as any `VITE_` variables are bundled directly into client-side JavaScript.

---

## Deployment

### Vercel Deployment (Primary)
The repository is optimized for deployment on Vercel:
- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Root Directory:** `./`
- **Node.js Version:** `20.x`

### GitHub Pages Deployment (Automated Workflow)
Continuous deployment to GitHub Pages is configured via `.github/workflows/deploy.yml`:
- Triggered automatically on pushes to branch `main`.
- Automatically sets `VITE_BASE_PATH: /NITAMUN-4.0/`.
- Executes `npm ci` and `npm run build`, uploading the resulting `dist/` artifact to GitHub Pages.

---

## Project Maintenance Guide

### 1. Updating Executive & Secretariat Photographs
1. Place the optimized `.webp` and fallback `.jpg` images in `src/assets/secretariat/`.
2. Follow standard aspect ratio `4:5` (recommended `480×600` for Executives, `260×325` for Secretariat).
3. Import the assets in `src/data/secretariat.ts` and update the `imageWebp`, `imageJpg`, and `objectPosition` properties on the respective member object.

### 2. Updating Secretariat Social Media Links
In `src/data/secretariat.ts`:
- Update `whatsAppUrl` (format: `https://wa.me/91XXXXXXXXXX`).
- Update `instagramUrl` (format: `https://www.instagram.com/username/`).
- Update `linkedInUrl` (format: `https://www.linkedin.com/in/username/`).

### 3. Updating Committee Information & Agendas
In `src/data/content.ts`:
- Update `committeesData` array with updated `agenda`, `overview`, and council details.
- To update portfolio matrices for the registration dropdowns, edit `src/data/portfolios.ts`.

### 4. Updating Registration Fees & Deadlines
In `src/data/config.ts`:
- Update `conferenceConfig.registration.fees` with updated amounts and deadline strings.
- Changes reflect automatically across Home, Events, and Registration pages.

### 5. Updating Contact Details & Helplines
In `src/data/config.ts`:
- Update `conferenceConfig.contacts.phoneNumbers` and `conferenceConfig.contacts.email`.
- In `src/pages/ContactPage.tsx`, update `SECRETARIAT_PHONE_NUMBERS`.

---

## Changelog

### November 24, 2026 — Comprehensive Engineering Audit & Production Hardening
- **Multi-Device Responsiveness:**
  - Audited all 6 routes across viewports from 320×568 (small mobile) through 1920×1080 (large desktop).
  - Enhanced `Button.tsx` with `max-w-full text-center` and flex wrapping to guarantee zero text overflow on narrow 320px screens.
- **Scroll Synchronization & Scroll-Lock Integrity:**
  - Verified Lenis smooth scrolling with GSAP ScrollTrigger updates.
  - Verified background scroll locking (`lockBackgroundScroll`) across committee dossier modals, terms/privacy modals, and navigation drawers.
  - Ensured all modals utilize `data-lenis-prevent`, `overscroll-contain`, and native `-webkit-overflow-scrolling: touch`.
- **Form Validation & Interaction Improvements:**
  - Improved `RegistrationPage.tsx` validation: eliminated asynchronous state race condition on submit, ensuring immediate smooth scroll to the first invalid form field.
  - Verified duplicate submission guards (`isSubmitting`) and timestamping on both registration and inquiry forms.
- **Security & Git Hygiene Hardening:**
  - Conducted `npm audit` with 0 vulnerabilities detected.
  - Confirmed 0 instances of `dangerouslySetInnerHTML` or `eval` in the codebase.
  - Verified all `target="_blank"` anchor tags include `rel="noopener noreferrer"`.
  - Staged removal of accidental tracking of `dist/`, `tsconfig.tsbuildinfo`, and scratch analysis files from Git index without deleting local files.
  - Enhanced `.gitignore` to strictly ignore `.env.*`, private keys (`*.pem`, `*.key`), and debug logs.
- **Secretariat Social Icons:**
  - Integrated 3 compact brand icon buttons (WhatsApp, Instagram, LinkedIn) into all four Executive Board cards.
- **Documentation Overhaul:**
  - Rewrote `README.md` to provide comprehensive, accurate documentation covering architecture, scripts, maintenance guides, and deployment workflows.
