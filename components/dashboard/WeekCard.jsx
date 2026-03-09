'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useWeekSchedule } from '@/hooks/useSchedule';
import { todayStr, getMondayOfWeek, formatWeekRange, DAYS_SHORT, toDateStr } from '@/lib/greek';
import { getClientsWithNotes, getAppointmentsForWeek } from '@/lib/queries';

export default function WeekCard() {
  const today = todayStr();
  const monday = getMondayOfWeek(today);
  const { weekSchedule, loading } = useWeekSchedule(today);
  const [notes, setNotes] = useState([]);
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    if (weekSchedule?.routes?.id) {
      getClientsWithNotes(weekSchedule.routes.id)
        .then(setNotes)
        .catch(console.error);
    }
  }, [weekSchedule]);

  useEffect(() => {
    getAppointmentsForWeek(monday)
      .then(setAppointments)
      .catch(console.error);
  }, [monday]);

  if (loading) {
    return <div className="card p-6"><div className="skeleton h-24 w-full" /></div>;
  }

  function formatApptDay(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const idx = d.getDay() === 0 ? 6 : d.getDay() - 1;
    return `${DAYS_SHORT[idx]} ${d.getDate()}`;
  }

  function formatTime(t) {
    return t ? t.slice(0, 5) : '';
  }

  return (
    <div className="space-y-3 animate-fade-up">
      <Link href={`/week/${monday}`} className="card card-interactive block p-6 relative overflow-hidden">
        {weekSchedule?.routes && (
          <div className="route-strip" style={{ background: weekSchedule.routes.color }} />
        )}
        <div className="pl-3">
          <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Αυτή την Εβδομάδα
          </p>
          <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
            {formatWeekRange(monday)}
          </p>
          {weekSchedule?.routes ? (
            <>
              <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif', color: weekSchedule.routes.color }}>
                {weekSchedule.routes.name}
              </h2>
              <p className="text-sm mt-2" style={{ color: 'var(--text-secondary)' }}>
                Πατήστε για να δείτε τους πελάτες →
              </p>
            </>
          ) : (
            <h2 className="text-xl font-bold" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--text-muted)' }}>
              Καμία διαδρομή
            </h2>
          )}
        </div>

        {weekSchedule?.routes && (
          <div
            className="absolute -right-4 -top-4 w-28 h-28 rounded-full opacity-10"
            style={{ background: weekSchedule.routes.color }}
          />
        )}
      </Link>

      {/* Appointments for this week */}
      {appointments.length > 0 && (
        <div className="card p-4" style={{ border: '1px solid var(--accent)' }}>
          <div className="flex items-center gap-2 mb-2">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
              Ραντεβού Εβδομάδας
            </span>
          </div>
          <div className="space-y-1.5">
            {appointments.map(a => (
              <Link
                key={a.id}
                href="/calendar"
                className="flex items-center gap-2 py-1.5 px-2 rounded-lg"
                style={{ background: 'rgba(74,144,217,0.06)' }}
              >
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)', color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
                  {formatApptDay(a.appointment_date)}
                </span>
                {a.appointment_time && (
                  <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                    {formatTime(a.appointment_time)}
                  </span>
                )}
                <span className="text-xs font-semibold truncate flex-1" style={{ color: 'var(--text-primary)' }}>
                  {a.title}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Notes for this week's route */}
      {notes.length > 0 && (
        <div className="card p-4" style={{ background: 'var(--warning-bg)', border: '1px solid var(--warning)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-base">📝</span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--warning)', fontFamily: 'Sora, sans-serif' }}>
              Σημειώσεις
            </span>
          </div>
          <div className="space-y-1.5">
            {notes.map(c => (
              <Link key={c.id} href={`/clients/${c.id}`} className="flex items-start gap-2 py-1 px-2 rounded-lg" style={{ background: 'rgba(230,126,34,0.08)' }}>
                <span className="text-xs font-bold flex-shrink-0" style={{ color: 'var(--text-primary)' }}>{c.name}:</span>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{c.notes}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
