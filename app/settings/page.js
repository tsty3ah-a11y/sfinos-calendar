'use client';
import { useState, useEffect } from 'react';
import { useRoutes } from '@/hooks/useRoutes';

export default function SettingsPage() {
  const [darkMode, setDarkMode] = useState(false);
  const [calSynced, setCalSynced] = useState(false);
  const { routes } = useRoutes();

  useEffect(() => {
    const saved = localStorage.getItem('vetplan-dark');
    if (saved === 'true') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
    setCalSynced(localStorage.getItem('vetplan-cal-synced') === 'true');
  }, []);

  function toggleDark() {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark', next);
    localStorage.setItem('vetplan-dark', String(next));
  }

  function handleCalendarSync() {
    // webcal:// triggers the device's calendar app to subscribe
    const baseUrl = window.location.origin;
    const webcalUrl = baseUrl.replace(/^https?:\/\//, 'webcal://') + '/api/calendar';
    window.location.href = webcalUrl;
    localStorage.setItem('vetplan-cal-synced', 'true');
    setCalSynced(true);
  }

  function handleCalendarDownload() {
    // Download the .ics file directly
    window.open(`${window.location.origin}/api/calendar`, '_blank');
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

      {/* Calendar sync */}
      <div className="card p-5">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Ημερολόγιο Συσκευής
        </h3>
        <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
          Συνδέστε τα ραντεβού σας με το ημερολόγιο της συσκευής σας (Google Calendar, Apple Calendar κλπ.) για αυτόματες ειδοποιήσεις.
        </p>

        <div className="space-y-2">
          <button
            onClick={handleCalendarSync}
            className="w-full flex items-center gap-3 p-4 rounded-xl active:scale-[0.98] transition-all"
            style={{ background: calSynced ? 'rgba(39,174,96,0.08)' : 'rgba(74,144,217,0.08)' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: calSynced ? 'rgba(39,174,96,0.15)' : 'rgba(74,144,217,0.15)' }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={calSynced ? 'var(--success)' : 'var(--accent)'} strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <div className="flex-1 text-left">
              <p className="text-sm font-bold" style={{ color: calSynced ? 'var(--success)' : 'var(--accent)' }}>
                {calSynced ? 'Συνδεδεμένο' : 'Σύνδεση Ημερολογίου'}
              </p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>
                {calSynced ? 'Πατήστε για επανασύνδεση' : 'Αυτόματος συγχρονισμός ραντεβού'}
              </p>
            </div>
            {calSynced && (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--success)" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </button>

          <button
            onClick={handleCalendarDownload}
            className="w-full flex items-center gap-3 p-3 rounded-xl active:scale-[0.98] transition-all"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--text-secondary)" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" />
            </svg>
            <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
              Λήψη αρχείου .ics
            </span>
          </button>
        </div>

        <p className="text-[11px] mt-3 leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          Μετά τη σύνδεση, το ημερολόγιο της συσκευής θα ανανεώνει αυτόματα τα ραντεβού και θα σας στέλνει ειδοποιήσεις 30 λεπτά πριν.
        </p>
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
            <span className="font-semibold" style={{ color: 'var(--text-primary)' }}>1.1.0</span>
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
