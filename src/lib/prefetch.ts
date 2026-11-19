/**
 * Prefetching utilities for route chunks
 * Loads non-critical destination bundles during idle time or on navigation hover
 */

const routeImportMap: Record<string, () => Promise<unknown>> = {
  about: () => import('../pages/AboutPage'),
  events: () => import('../pages/EventsPage'),
  committees: () => import('../pages/CommitteesPage'),
  registration: () => import('../pages/RegistrationPage'),
  contact: () => import('../pages/ContactPage'),
};

const prefetchedRoutes = new Set<string>();

export const prefetchRoute = (destination: string): void => {
  if (prefetchedRoutes.has(destination)) return;
  const loader = routeImportMap[destination];
  if (loader) {
    prefetchedRoutes.add(destination);
    loader().catch(() => {
      prefetchedRoutes.delete(destination);
    });
  }
};

export const prefetchAllRoutesIdle = (): void => {
  const prefetchRemaining = () => {
    Object.keys(routeImportMap).forEach((route) => {
      prefetchRoute(route);
    });
  };

  if (typeof window !== 'undefined') {
    const schedule = () => {
      if ('requestIdleCallback' in window) {
        (window as Window & { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
          prefetchRemaining,
          { timeout: 8000 }
        );
      } else {
        setTimeout(prefetchRemaining, 6000);
      }
    };

    if (document.readyState === 'complete') {
      setTimeout(schedule, 2000);
    } else {
      window.addEventListener('load', () => setTimeout(schedule, 2000), { once: true });
    }
  }
};
