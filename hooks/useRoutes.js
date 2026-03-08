'use client';
import { useState, useEffect } from 'react';
import { getRoutes } from '@/lib/queries';

export function useRoutes() {
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getRoutes().then(setRoutes).catch(console.error).finally(() => setLoading(false));
  }, []);

  return { routes, loading };
}
