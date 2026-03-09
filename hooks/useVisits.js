'use client';
import { useState, useEffect, useCallback } from 'react';
import { getVisits, getVisitsForDate, getVisitsForWeek, addVisit, removeVisit, toggleVisit } from '@/lib/queries';

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

// Fetch all visits for a full week (Mon-Sun)
export function useVisitsForWeek(monday) {
  const [visits, setVisits] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    if (!monday) return;
    setLoading(true);
    getVisitsForWeek(monday)
      .then(setVisits)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [monday]);

  useEffect(() => { refresh(); }, [refresh]);

  const add = useCallback(async (clientId, date) => {
    await addVisit(clientId, date);
    refresh();
  }, [refresh]);

  const remove = useCallback(async (clientId, date) => {
    await removeVisit(clientId, date);
    refresh();
  }, [refresh]);

  return { visits, loading, add, remove, refresh };
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
