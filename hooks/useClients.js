'use client';
import { useState, useEffect, useCallback } from 'react';
import { getClients, getCities } from '@/lib/queries';

export function useClients({ routeId, city, search } = {}) {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    getClients({ routeId, city, search })
      .then(setClients)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [routeId, city, search]);

  useEffect(() => { refresh(); }, [refresh]);

  return { clients, loading, refresh };
}

export function useCities(routeId) {
  const [cities, setCities] = useState([]);

  useEffect(() => {
    getCities(routeId).then(setCities).catch(console.error);
  }, [routeId]);

  return cities;
}
