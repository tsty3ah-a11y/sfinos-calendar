'use client';
import Link from 'next/link';
import { useWeekSchedule } from '@/hooks/useSchedule';
import { todayStr, getMondayOfWeek, formatWeekRange } from '@/lib/greek';

export default function WeekCard() {
  const today = todayStr();
  const monday = getMondayOfWeek(today);
  const { weekSchedule, loading } = useWeekSchedule(today);

  if (loading) {
    return <div className="card p-6"><div className="skeleton h-24 w-full" /></div>;
  }

  return (
    <Link href={`/week/${monday}`} className="card card-interactive block p-6 relative overflow-hidden animate-fade-up">
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
  );
}
