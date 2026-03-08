'use client';
import { useCurrentCycle } from '@/hooks/useCycle';
import { formatDateGreek } from '@/lib/greek';

export default function CycleProgress() {
  const { cycle, progress, loading } = useCurrentCycle();

  if (loading) {
    return (
      <div className="card p-6 space-y-4">
        <div className="skeleton h-5 w-40" />
        {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton h-10 w-full" />)}
      </div>
    );
  }

  if (!cycle) {
    return (
      <div className="card p-6">
        <p style={{ color: 'var(--text-muted)' }}>Δεν υπάρχει ενεργός κύκλος</p>
      </div>
    );
  }

  return (
    <div className="card p-6 animate-fade-up" style={{ animationDelay: '0.1s' }}>
      <div className="flex items-center justify-between mb-1">
        <h3 className="text-sm font-bold uppercase tracking-widest" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--text-muted)' }}>
          Κύκλος {cycle.cycle_number}
        </h3>
        <span className="text-xs" style={{ color: 'var(--text-muted)' }}>
          {formatDateGreek(cycle.start_date)} — {formatDateGreek(cycle.end_date)}
        </span>
      </div>

      <div className="space-y-4 mt-5">
        {progress.map(({ route, totalClients, visitedClients, progress: pct }) => (
          <div key={route.id}>
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-sm font-semibold" style={{ color: route.color }}>
                {route.name}
              </span>
              <span className="text-xs tabular-nums" style={{ color: 'var(--text-secondary)' }}>
                {visitedClients}/{totalClients}
              </span>
            </div>
            <div className="progress-track">
              <div className="progress-fill" style={{ width: `${pct}%`, background: route.color }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
