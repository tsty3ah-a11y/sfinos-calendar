'use client';
import { useState, useEffect } from 'react';
import { useRoutes } from '@/hooks/useRoutes';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const { routes } = useRoutes();

  useEffect(() => {
    const saved = localStorage.getItem('vetplan-dark');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('vetplan-dark', String(next));
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-5 animate-fade-up">
      <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
        Ρυθμίσεις
      </h1>

      {/* Theme */}
      <div className="card p-5">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Εμφάνιση
        </h3>
        <button
          onClick={toggleDark}
          className="flex items-center justify-between w-full p-3 rounded-xl"
          style={{ background: 'var(--bg-secondary)' }}
        >
          <div className="flex items-center gap-3">
            <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
            <span className="text-sm font-medium">
              {darkMode ? 'Σκοτεινό Θέμα' : 'Φωτεινό Θέμα'}
            </span>
          </div>
          <div
            className="relative w-12 h-7 rounded-full transition-all"
            style={{ background: darkMode ? 'var(--accent)' : 'var(--border)' }}
          >
            <div
              className="absolute top-0.5 w-6 h-6 rounded-full shadow-md transition-all"
              style={{
                background: 'var(--bg-card)',
                left: darkMode ? '22px' : '2px',
              }}
            />
          </div>
        </button>
      </div>

      {/* Routes overview */}
      <div className="card p-5">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Διαδρομές
        </h3>
        <div className="space-y-2">
          {routes.map(r => (
            <div
              key={r.id}
              className="flex items-center gap-3 p-3 rounded-xl"
              style={{ background: 'var(--bg-secondary)' }}
            >
              <div className="w-4 h-4 rounded-full" style={{ background: r.color }} />
              <span className="text-sm font-semibold" style={{ color: r.color }}>{r.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* App info */}
      <div className="card p-5">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Πληροφορίες
        </h3>
        <div className="space-y-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
          <div className="flex justify-between">
            <span>Εφαρμογή</span>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>VetPlan</span>
          </div>
          <div className="flex justify-between">
            <span>Έκδοση</span>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>1.0.0</span>
          </div>
          <div className="flex justify-between">
            <span>Έτος</span>
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>2026</span>
          </div>
        </div>
      </div>
    </div>
  );
}
