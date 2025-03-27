
import { useState, useEffect } from 'react';

// Hook to check if the current device is mobile
export function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, [breakpoint]);

  return isMobile;
}

// Simple media query hook
export function useMediaQuery(query = '(max-width: 768px)') {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    
    // Initial check
    setMatches(media.matches);
    
    // Update state when media query match status changes
    const listener = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    
    // Add event listener (with compatibility check for older browsers)
    if (media.addEventListener) {
      media.addEventListener('change', listener);
    } else {
      // @ts-ignore - For older browsers
      media.addListener(listener);
    }
    
    // Clean up
    return () => {
      if (media.removeEventListener) {
        media.removeEventListener('change', listener);
      } else {
        // @ts-ignore - For older browsers
        media.removeListener(listener);
      }
    };
  }, [query]);

  return matches;
}

export default useMediaQuery;
