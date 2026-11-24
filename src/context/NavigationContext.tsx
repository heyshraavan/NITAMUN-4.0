import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { NavDestinationId } from '../data/config';
import { scrollToTop } from '../lib/scroll';
import { applyPageSeo } from '../data/seo';

interface NavigationContextType {
  currentDestination: NavDestinationId;
  navigateTo: (destination: NavDestinationId) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const validDestinations: NavDestinationId[] = [
  'home',
  'about',
  'events',
  'committees',
  'registration',
  'contact',
];

/**
 * Returns normalized base URL from Vite (e.g. '/' or '/NITAMUN-4.0')
 */
export function getBaseUrl(): string {
  const base = import.meta.env.BASE_URL || '/';
  if (base.length > 1 && base.endsWith('/')) {
    return base.slice(0, -1);
  }
  return base;
}

/**
 * Maps a destination ID to its clean canonical path relative to current base
 */
export function getPathForDestination(dest: NavDestinationId): string {
  const base = getBaseUrl();
  const root = base === '/' ? '' : base;
  if (dest === 'home') {
    return root === '' ? '/' : `${root}/`;
  }
  return `${root}/${dest}`;
}

interface ParsedDestination {
  destination: NavDestinationId;
  shouldReplaceUrl?: string;
}

/**
 * Parses current window URL (supporting clean paths, legacy hash routes, and GitHub Pages 404 query redirects)
 */
export function getDestinationFromUrl(): ParsedDestination {
  if (typeof window === 'undefined') return { destination: 'home' };

  // 1. Backward compatibility: handle legacy hash links (e.g. #/about, #about, #/events)
  if (window.location.hash) {
    const rawHash = window.location.hash.replace(/^#\/?/, '').toLowerCase().trim();
    const hashSegment = rawHash.split('/')[0].split('?')[0];
    if (validDestinations.includes(hashSegment as NavDestinationId)) {
      const dest = hashSegment as NavDestinationId;
      const cleanPath = getPathForDestination(dest);
      return { destination: dest, shouldReplaceUrl: cleanPath };
    }
  }

  // 2. GitHub Pages SPA redirect query fallback (e.g. ?/about or ?/committees)
  if (window.location.search && window.location.search.startsWith('?/')) {
    const rawQuery = window.location.search.slice(2).split('&')[0];
    const querySegment = rawQuery.replace(/^\/+/, '').split('/')[0].toLowerCase().trim();
    if (validDestinations.includes(querySegment as NavDestinationId)) {
      const dest = querySegment as NavDestinationId;
      const cleanPath = getPathForDestination(dest);
      return { destination: dest, shouldReplaceUrl: cleanPath };
    }
  }

  // 3. Browser pathname routing
  const base = getBaseUrl();
  let pathname = window.location.pathname;

  // Strip base path prefix if present
  if (base !== '/' && pathname.startsWith(base)) {
    pathname = pathname.slice(base.length);
  }

  // Strip leading and trailing slashes
  const segment = pathname.replace(/^\/+|\/+$/g, '').toLowerCase().trim();

  if (!segment || segment === 'home') {
    return { destination: 'home' };
  }

  if (validDestinations.includes(segment as NavDestinationId)) {
    return { destination: segment as NavDestinationId };
  }

  return { destination: 'home' };
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentDestination, setCurrentDestination] = useState<NavDestinationId>(() => {
    const parsed = getDestinationFromUrl();
    return parsed.destination;
  });

  const navigateTo = useCallback((destination: NavDestinationId) => {
    setCurrentDestination(destination);
    const targetPath = getPathForDestination(destination);

    // Update browser history with clean path
    if (typeof window !== 'undefined' && window.location.pathname !== targetPath) {
      window.history.pushState(null, '', targetPath);
    }

    // Apply complete SEO metadata (title, meta description, canonical, OG, Twitter)
    applyPageSeo(destination);

    // Scroll cleanly to top of destination and recalculate triggers
    scrollToTop();
  }, []);

  // Listen to browser forward/back buttons (popstate) and hash changes
  useEffect(() => {
    // Initial mount check for legacy hash / SPA query redirect
    const initial = getDestinationFromUrl();
    if (initial.shouldReplaceUrl && typeof window !== 'undefined') {
      window.history.replaceState(null, '', initial.shouldReplaceUrl);
    }
    applyPageSeo(initial.destination);

    const handlePopState = () => {
      const parsed = getDestinationFromUrl();
      setCurrentDestination(parsed.destination);
      if (parsed.shouldReplaceUrl) {
        window.history.replaceState(null, '', parsed.shouldReplaceUrl);
      }
      applyPageSeo(parsed.destination);
      scrollToTop();
    };

    const handleHashChange = () => {
      const parsed = getDestinationFromUrl();
      setCurrentDestination(parsed.destination);
      if (parsed.shouldReplaceUrl) {
        window.history.replaceState(null, '', parsed.shouldReplaceUrl);
      }
      applyPageSeo(parsed.destination);
      scrollToTop();
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
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
