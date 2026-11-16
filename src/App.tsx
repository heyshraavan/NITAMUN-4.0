import React, { useEffect, Suspense, lazy } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { FloatingNavbar } from './components/FloatingNavbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { initSmoothScroll, destroySmoothScroll } from './lib/scroll';

// Lazy-loaded Destination Pages for optimal code splitting & fast initial paint
const HomePage = lazy(() => import('./pages/HomePage').then((m) => ({ default: m.HomePage })));
const AboutPage = lazy(() => import('./pages/AboutPage').then((m) => ({ default: m.AboutPage })));
const EventsPage = lazy(() => import('./pages/EventsPage').then((m) => ({ default: m.EventsPage })));
const CommitteesPage = lazy(() => import('./pages/CommitteesPage').then((m) => ({ default: m.CommitteesPage })));
const RegistrationPage = lazy(() => import('./pages/RegistrationPage').then((m) => ({ default: m.RegistrationPage })));
const ContactPage = lazy(() => import('./pages/ContactPage').then((m) => ({ default: m.ContactPage })));

const DestinationLoadingFallback: React.FC = () => (
  <div className="min-h-[70vh] flex items-center justify-center">
    <div className="flex items-center gap-2.5 px-4 py-2 bg-[#F6F4EB] border border-[#25231F]/15 rounded-full text-xs font-mono-tech text-[#CB1B29] shadow-xs">
      <span className="w-2 h-2 rounded-full bg-[#CB1B29] animate-pulse" />
      <span className="tracking-widest uppercase font-semibold">SYNCHRONIZING CHAMBER...</span>
    </div>
  </div>
);

const DestinationRenderer: React.FC = () => {
  const { currentDestination } = useNavigation();

  return (
    <Suspense fallback={<DestinationLoadingFallback />}>
      {(() => {
        switch (currentDestination) {
          case 'home':
            return <HomePage />;
          case 'about':
            return <AboutPage />;
          case 'events':
            return <EventsPage />;
          case 'committees':
            return <CommitteesPage />;
          case 'registration':
            return <RegistrationPage />;
          case 'contact':
            return <ContactPage />;
          default:
            return <HomePage />;
        }
      })()}
    </Suspense>
  );
};

const MainLayout: React.FC = () => {
  useEffect(() => {
    initSmoothScroll();
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
