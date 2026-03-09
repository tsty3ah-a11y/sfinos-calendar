'use client';
import { useState, useEffect, useCallback } from 'react';
import { getAppointmentsForMonth } from '@/lib/queries';

export function useMonthAppointments(year, month) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(() => {
    setLoading(true);
    getAppointmentsForMonth(year, month)
      .then(setAppointments)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [year, month]);

  useEffect(() => { refresh(); }, [refresh]);

  return { appointments, loading, refresh };
}
