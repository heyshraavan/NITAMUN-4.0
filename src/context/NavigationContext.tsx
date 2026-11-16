import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NavDestinationId, conferenceConfig } from '../data/config';
import { scrollToTop } from '../lib/scroll';

interface NavigationContextType {
  currentDestination: NavDestinationId;
  navigateTo: (destination: NavDestinationId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

const validDestinations: NavDestinationId[] = [
  'home',
  'about',
  'events',
  'committees',
  'registration',
  'contact',
];

function getDestinationFromHash(): NavDestinationId {
  if (typeof window === 'undefined') return 'home';
  const hash = window.location.hash.replace(/^#\/?/, '').toLowerCase();
  if (validDestinations.includes(hash as NavDestinationId)) {
    return hash as NavDestinationId;
  }
  return 'home';
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDestination, setCurrentDestination] = useState<NavDestinationId>(getDestinationFromHash);

  const navigateTo = useCallback((destination: NavDestinationId) => {
    setCurrentDestination(destination);
    window.location.hash = `#/${destination}`;

    // Update document title for editorial polish
    const targetConfig = conferenceConfig.destinations.find((d) => d.id === destination);
    if (targetConfig) {
      document.title = `${conferenceConfig.name} ${conferenceConfig.editionRoman} — ${targetConfig.label} | ${conferenceConfig.tagline}`;
    }

    // Scroll cleanly to the top of the destination and recalculate triggers
    scrollToTop();
  }, []);

  // Listen to browser forward/back buttons
  useEffect(() => {
    const handleHashChange = () => {
      const dest = getDestinationFromHash();
      setCurrentDestination(dest);
      scrollToTop();
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <NavigationContext.Provider value={{ currentDestination, navigateTo }}>
      {children}
    </NavigationContext.Provider>
  );
};

export function useNavigation(): NavigationContextType {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
}
