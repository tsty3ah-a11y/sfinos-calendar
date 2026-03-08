'use client';
import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useMonthSchedule } from '@/hooks/useSchedule';
import { MONTHS, DAYS_SHORT, todayStr, getMondayOfWeek } from '@/lib/greek';

export default function MonthGrid() {
  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1);
  const { schedule, loading } = useMonthSchedule(year, month);
  const router = useRouter();
  const todayString = todayStr();

  const scheduleMap = useMemo(() => {
    const map = {};
    schedule.forEach(s => { map[s.visit_date] = s; });
    return map;
  }, [schedule]);

  const days = useMemo(() => {
    const firstDay = new Date(year, month - 1, 1);
    const lastDay = new Date(year, month, 0);
    const daysInMonth = lastDay.getDate();

    // Monday=0 based offset
    let startOffset = firstDay.getDay() - 1;
    if (startOffset < 0) startOffset = 6;

    const cells = [];
    for (let i = 0; i < startOffset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) {
      const dateStr = `${year}-${String(month).padStart(2, '0')}-${String(d).padStart(2, '0')}`;
      cells.push(dateStr);
    }
    return cells;
  }, [year, month]);

  function prevMonth() {
    if (month === 1) { setYear(y => y - 1); setMonth(12); }
    else setMonth(m => m - 1);
  }

  function nextMonth() {
    if (month === 12) { setYear(y => y + 1); setMonth(1); }
    else setMonth(m => m + 1);
  }

  return (
    <div className="animate-fade-up">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-6">
        <button onClick={prevMonth} className="p-2 rounded-xl active:scale-95 transition-transform" style={{ background: 'var(--bg-secondary)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2"><polyline points="15 18 9 12 15 6" /></svg>
        </button>
        <h2 className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>
          {MONTHS[month - 1]} {year}
        </h2>
        <button onClick={nextMonth} className="p-2 rounded-xl active:scale-95 transition-transform" style={{ background: 'var(--bg-secondary)' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--text-primary)" strokeWidth="2"><polyline points="9 18 15 12 9 6" /></svg>
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {DAYS_SHORT.map(d => (
          <div key={d} className="text-center text-[10px] font-bold uppercase tracking-wider py-1" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            {d}
          </div>
        ))}
      </div>

      {/* Day cells */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((dateStr, i) => {
          if (!dateStr) return <div key={`empty-${i}`} />;

          const dayNum = parseInt(dateStr.split('-')[2]);
          const entry = scheduleMap[dateStr];
          const isToday = dateStr === todayString;
          const d = new Date(dateStr + 'T00:00:00');
          const isWeekend = d.getDay() === 0 || d.getDay() === 6;

          return (
            <button
              key={dateStr}
              onClick={() => router.push(`/week/${getMondayOfWeek(dateStr)}`)}
              className="relative flex flex-col items-center justify-center rounded-xl transition-all active:scale-90"
              style={{
                aspectRatio: '1',
                background: entry ? `${entry.routes.color}15` : isToday ? 'var(--bg-secondary)' : 'transparent',
                border: isToday ? '2px solid var(--accent)' : '2px solid transparent',
              }}
            >
              <span
                className="text-sm font-semibold tabular-nums"
                style={{
                  fontFamily: 'Sora, sans-serif',
                  color: entry ? entry.routes.color : isWeekend ? 'var(--text-muted)' : 'var(--text-primary)',
                }}
              >
                {dayNum}
              </span>
              {entry && (
                <div
                  className="w-1.5 h-1.5 rounded-full mt-0.5"
                  style={{ background: entry.routes.color }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      {loading ? (
        <div className="mt-4 skeleton h-6 w-48" />
      ) : (
        <div className="flex flex-wrap gap-3 mt-6">
          {[...new Map(schedule.map(s => [s.routes.name, s.routes])).values()].map(route => (
            <div key={route.name} className="flex items-center gap-1.5">
              <div className="w-2.5 h-2.5 rounded-full" style={{ background: route.color }} />
              <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
                {route.name}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
