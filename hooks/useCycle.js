'use client';
import { useState, useEffect } from 'react';
import { getCurrentCycle, getCycleProgress } from '@/lib/queries';

export function useCurrentCycle() {
  const [cycle, setCycle] = useState(null);
  const [progress, setProgress] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCurrentCycle()
      .then(async (c) => {
        setCycle(c);
        if (c) {
          const p = await getCycleProgress(c.id);
          setProgress(p);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return { cycle, progress, loading };
}
