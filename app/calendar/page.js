'use client';
import MonthGrid from '@/components/calendar/MonthGrid';

export default function CalendarPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-6" style={{ fontFamily: 'Sora, sans-serif' }}>
        Ημερολόγιο
      </h1>
      <div className="card p-5">
        <MonthGrid />
      </div>
    </div>
  );
}
