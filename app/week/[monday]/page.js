'use client';
import { use } from 'react';
import { useRouter } from 'next/navigation';
import { useWeekSchedule } from '@/hooks/useSchedule';
import { getMondayOfWeek, formatWeekRange, toDateStr } from '@/lib/greek';
import DayChecklist from '@/components/visits/DayChecklist';

export default function WeekViewPage({ params }) {
  const { monday: rawMonday } = use(params);
  const router = useRouter();

  // Ensure we're always on a Monday
  const monday = getMondayOfWeek(rawMonday);
  const { weekSchedule, loading } = useWeekSchedule(monday);

  function goWeek(offset) {
    const d = new Date(monday + 'T00:00:00');
    d.setDate(d.getDate() + (7 * offset));
    const newMonday = getMondayOfWeek(toDateStr(d));
    router.push(`/week/${newMonday}`);
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto">
      {/* Header with week nav */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={() => goWeek(-1)}
          className="p-2 rounded-xl active:scale-95 transition-transform"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
            {formatWeekRange(monday)}
          </h1>
          {loading ? (
            <div className="skeleton h-4 w-24 mx-auto mt-1" />
          ) : weekSchedule?.routes ? (
            <p className="text-sm font-bold mt-0.5" style={{ color: weekSchedule.routes.color }}>
              {weekSchedule.routes.name}
            </p>
          ) : (
            <p className="text-sm mt-0.5" style={{ color: 'var(--text-muted)' }}>
              Χωρίς διαδρομή
            </p>
          )}
        </div>
        <button
          onClick={() => goWeek(1)}
          className="p-2 rounded-xl active:scale-95 transition-transform"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
        </div>
      ) : weekSchedule?.routes ? (
        <DayChecklist
          date={monday}
          routeId={weekSchedule.routes.id}
          routeColor={weekSchedule.routes.color}
        />
      ) : (
        <div className="card p-10 text-center">
          <p className="text-4xl mb-3">📅</p>
          <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
            Δεν υπάρχει προγραμματισμένη διαδρομή αυτή την εβδομάδα
          </p>
        </div>
      )}
    </div>
  );
}
