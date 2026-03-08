'use client';
import Link from 'next/link';
import { useUpcoming } from '@/hooks/useSchedule';
import { formatDayMonth, todayStr } from '@/lib/greek';

export default function UpcomingSchedule() {
  const { upcoming, loading } = useUpcoming(7);
  const today = todayStr();

  if (loading) {
    return (
      <div className="card p-6 space-y-3">
        <div className="skeleton h-5 w-36" />
        {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-12 w-full" />)}
      </div>
    );
  }

  return (
    <div className="card p-6 animate-fade-up" style={{ animationDelay: '0.2s' }}>
      <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--text-muted)' }}>
        Επόμενες Ημέρες
      </h3>

      {upcoming.length === 0 ? (
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>Δεν υπάρχουν προγραμματισμένες</p>
      ) : (
        <div className="space-y-2">
          {upcoming.map((s) => {
            const isToday = s.visit_date === today;
            return (
              <Link
                key={s.id}
                href={`/day/${s.visit_date}`}
                className="flex items-center gap-3 p-3 rounded-xl transition-all hover:scale-[1.01]"
                style={{ background: isToday ? `${s.routes.color}10` : 'var(--bg-secondary)' }}
              >
                <div
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{ background: s.routes.color }}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold" style={{ color: s.routes.color }}>
                    {s.routes.name}
                  </p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                    {isToday ? 'Σήμερα' : formatDayMonth(s.visit_date)}
                  </p>
                </div>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
