import React, { useEffect } from 'react';
import { NavigationProvider, useNavigation } from './context/NavigationContext';
import { Header } from './components/Header';
import { FloatingNavbar } from './components/FloatingNavbar';
import { Footer } from './components/Footer';
import { CustomCursor } from './components/CustomCursor';
import { initSmoothScroll, destroySmoothScroll } from './lib/scroll';

// Destination Pages - imported directly for instant zero-CLS page transitions
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { EventsPage } from './pages/EventsPage';
import { CommitteesPage } from './pages/CommitteesPage';
import { RegistrationPage } from './pages/RegistrationPage';
import { ContactPage } from './pages/ContactPage';

const DestinationRenderer: React.FC = () => {
  const { currentDestination } = useNavigation();

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
