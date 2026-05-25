import { useState, useEffect } from 'react';

/**
 * Fetches /api/requests/tutorpool on mount and returns the list.
 * Cancels the in-flight request on unmount to prevent memory leaks.
 */
export function useTutorPool() {
  const [tutorPool, setTutorPool] = useState([]);

  useEffect(() => {
    const controller = new AbortController();
    fetch('/api/requests/tutorpool', { signal: controller.signal })
      .then(res => res.json())
      .then(data => setTutorPool(data))
      .catch(err => {
        if (err.name !== 'AbortError') {
          // silently ignore in production; extend with logging if needed
        }
      });
    return () => controller.abort();
  }, []);

  return tutorPool;
}
