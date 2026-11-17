import React, { useEffect, Suspense, lazy } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { FloatingNavbar } from './components/FloatingNavbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { initSmoothScroll, destroySmoothScroll } from './lib/scroll';
import { prefetchAllRoutesIdle } from './lib/prefetch';

// Critical Landing Page - imported synchronously for instantaneous LCP & zero CLS
import { HomePage } from './pages/HomePage';

// Subpage Destinations - code-split with lazy loading & background idle prefetch
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then((m) => ({ default: m.EventsPage })));
const CommitteesPage = lazy(() => import('./pages/CommitteesPage').then((m) => ({ default: m.CommitteesPage })));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage').then((m) => ({ default: m.RegistrationPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

/**
 * Editorial Zero-CLS Suspense Stage Fallback
 * Preserves background color, fixed header clearance, and visual tone during chunk loading
 */
const DestinationFallback: React.FC = () => (
  <div
    className="w-full min-h-[70vh] pt-32 sm:pt-40 pb-24 flex items-center justify-center bg-[#EBE9D8]"
    aria-busy="true"
    aria-live="polite"
  >
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-[#25231F]/15 border-t-[#CB1B29] animate-spin" />
      <span className="text-[11px] font-mono-tech uppercase tracking-widest text-[#25231F]/60">
        Loading Destination...
      </span>
    </div>
  </div>
);

const DestinationRenderer: React.FC = () => {
  const { currentDestination } = useNavigation();

  switch (currentDestination) {
    case 'home':
      return <HomePage />;
    case 'about':
      return (
        <Suspense fallback={<DestinationFallback />}>
          <AboutPage />
        </Suspense>
      );
    case 'events':
      return (
        <Suspense fallback={<DestinationFallback />}>
          <EventsPage />
        </Suspense>
      );
    case 'committees':
      return (
        <Suspense fallback={<DestinationFallback />}>
          <CommitteesPage />
        </Suspense>
      );
    case 'registration':
      return (
        <Suspense fallback={<DestinationFallback />}>
          <RegistrationPage />
        </Suspense>
      );
    case 'contact':
      return (
        <Suspense fallback={<DestinationFallback />}>
          <ContactPage />
        </Suspense>
      );
    default:
      return <HomePage />;
  }
};

const MainLayout: React.FC = () => {
  useEffect(() => {
    initSmoothScroll();
    prefetchAllRoutesIdle();
    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#EBE9D8] text-[#25231F] flex flex-col font-body selection:bg-[#CB1B29] selection:text-[#EBE9D8]">
      {/* Desktop Custom Diplomatic Cursor */}
      <CustomCursor />

      {/* Minimal Fixed Top Brand Header */}
      <Header />

      {/* Main Destination Stage */}
      <main className="flex-1 w-full pb-8">
        <DestinationRenderer />
      </main>

      {/* Global Floating Pill Navigation (Accommodating all 6 destinations) */}
      <FloatingNavbar />

      {/* Global Conference Footer (Dark, with 6 destination links) */}
      <Footer />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <NavigationProvider>
      <MainLayout />
    </NavigationProvider>
  );
};

export default App;
