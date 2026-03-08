'use client';
import WeekCard from '@/components/dashboard/WeekCard';
import Stats from '@/components/dashboard/Stats';
import CycleProgress from '@/components/dashboard/CycleProgress';
import UpcomingSchedule from '@/components/dashboard/UpcomingSchedule';

export default function DashboardPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-5">
      <div>
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
          Καλημέρα 👋
        </h1>
        <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
          Πρόγραμμα επισκέψεων κτηνιατρείων
        </p>
      </div>

      <Stats />
      <WeekCard />
      <CycleProgress />
      <UpcomingSchedule />
    </div>
  );
}
