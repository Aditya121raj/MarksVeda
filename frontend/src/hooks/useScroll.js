import { useState, useEffect } from 'react';

/**
 * Returns true when window.scrollY exceeds the given threshold (default 40px).
 * Uses a ref-based guard to avoid extra setState calls when value hasn't changed.
 */
export function useScroll(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    let current = false;
    const handleScroll = () => {
      const next = window.scrollY > threshold;
      if (next !== current) {
        current = next;
        setScrolled(next);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold]);

  return scrolled;
}
