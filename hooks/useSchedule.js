'use client';
import { useState, useEffect } from 'react';
import { getSchedule, getDaySchedule, getScheduleRange } from '@/lib/queries';
import { todayStr } from '@/lib/greek';

export function useMonthSchedule(year, month) {
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getSchedule(year, month)
      .then(setSchedule)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [year, month]);

  return { schedule, loading };
}

export function useDaySchedule(date) {
  const [daySchedule, setDaySchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!date) return;
    setLoading(true);
    getDaySchedule(date)
      .then(setDaySchedule)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [date]);

  return { daySchedule, loading };
}

export function useUpcoming(days = 5) {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() + days);
    const startStr = todayStr();
    const endStr = end.toISOString().split('T')[0];

    getScheduleRange(startStr, endStr)
      .then(setUpcoming)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [days]);

  return { upcoming, loading };
}
