'use client';
import { useState, useEffect } from 'react';
import { getDashboardStats } from '@/lib/queries';

export default function Stats() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDashboardStats().then(setStats).catch(console.error).finally(() => setLoading(false));
  }, []);

  const items = [
    { label: 'Πελάτες', value: stats?.totalClients || 0, color: 'var(--accent)' },
    { label: 'Επισκέψεις Μήνα', value: stats?.visitsThisMonth || 0, color: 'var(--success)' },
    { label: 'Επισκέψεις Έτους', value: stats?.visitsThisYear || 0, color: 'var(--warning)' },
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-3 gap-3">
        {[1, 2, 3].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-3 animate-fade-up" style={{ animationDelay: '0.05s' }}>
      {items.map((item) => (
        <div key={item.label} className="card p-4 text-center">
          <p className="text-2xl font-bold tabular-nums" style={{ fontFamily: 'Sora, sans-serif', color: item.color }}>
            {item.value}
          </p>
          <p className="text-[10px] font-semibold uppercase tracking-wider mt-1" style={{ color: 'var(--text-muted)' }}>
            {item.label}
          </p>
        </div>
      ))}
    </div>
  );
}
