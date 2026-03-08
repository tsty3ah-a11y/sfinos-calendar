'use client';
import Link from 'next/link';
import { useDaySchedule } from '@/hooks/useSchedule';
import { formatDayMonth, todayStr } from '@/lib/greek';

export default function TodayCard() {
  const today = todayStr();
  const { daySchedule, loading } = useDaySchedule(today);

  if (loading) {
    return <div className="card p-6"><div className="skeleton h-24 w-full" /></div>;
  }

  return (
    <Link href={`/day/${today}`} className="card card-interactive block p-6 relative overflow-hidden animate-fade-up">
      {daySchedule?.routes && (
        <div className="route-strip" style={{ background: daySchedule.routes.color }} />
      )}
      <div className="pl-3">
        <p className="text-xs font-semibold uppercase tracking-widest mb-1" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Σήμερα
        </p>
        <p className="text-sm mb-3" style={{ color: 'var(--text-secondary)' }}>
          {formatDayMonth(today)}
        </p>
        {daySchedule?.routes ? (
          <>
            <h2 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif', color: daySchedule.routes.color }}>
              {daySchedule.routes.name}
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

      {daySchedule?.routes && (
        <div
          className="absolute -right-4 -top-4 w-28 h-28 rounded-full opacity-10"
          style={{ background: daySchedule.routes.color }}
        />
      )}
    </Link>
  );
}
