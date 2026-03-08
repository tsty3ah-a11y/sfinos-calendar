'use client';
import { useState, useEffect } from 'react';
import { getSchedule, getDaySchedule, getWeekSchedule, getScheduleRange } from '@/lib/queries';
import { todayStr, getMondayOfWeek } from '@/lib/greek';

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

export function useWeekSchedule(dateStr) {
  const [weekSchedule, setWeekSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!dateStr) return;
    setLoading(true);
    getWeekSchedule(dateStr)
      .then(setWeekSchedule)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [dateStr]);

  return { weekSchedule, loading };
}

export function useUpcoming(days = 60) {
  const [upcoming, setUpcoming] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Start from this week's Monday so current week is always included
    const monday = getMondayOfWeek(todayStr());
    const end = new Date(monday + 'T00:00:00');
    end.setDate(end.getDate() + days);
    const endStr = `${end.getFullYear()}-${String(end.getMonth() + 1).padStart(2, '0')}-${String(end.getDate()).padStart(2, '0')}`;

    getScheduleRange(monday, endStr)
      .then(setUpcoming)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [days]);

  return { upcoming, loading };
}
