'use client';
import { useState, useEffect, useCallback } from 'react';
import { getVisits, getVisitsForDate, toggleVisit } from '@/lib/queries';

export function useVisitsForDate(date) {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!date) return;
    setLoading(true);
    getVisitsForDate(date)
      .then(setVisits)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [date]);

  useEffect(() => { refresh(); }, [refresh]);

  const toggle = useCallback(async (clientId) => {
    await toggleVisit(clientId, date);
    refresh();
  }, [date, refresh]);

  return { visits, loading, toggle, refresh };
}

export function useClientVisits(clientId) {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!clientId) return;
    getVisits({ clientId })
      .then(setVisits)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [clientId]);

  return { visits, loading };
}
