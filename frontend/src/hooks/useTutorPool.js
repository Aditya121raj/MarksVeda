import { useState, useEffect } from 'react';

const API_URL =
  import.meta.env.VITE_API_URL || 'https://marksveda.onrender.com';

/**
 * Fetches tutor pool on mount and returns the list.
 */
export function useTutorPool() {
  const [tutorPool, setTutorPool] = useState([]);

  useEffect(() => {
    const controller = new AbortController();

    fetch(`${API_URL}/api/requests/tutorpool`, {
      signal: controller.signal
    })
      .then(res => res.json())
      .then(data => setTutorPool(data))
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.log(err);
        }
      });

    return () => controller.abort();
  }, []);

  return tutorPool;
}
