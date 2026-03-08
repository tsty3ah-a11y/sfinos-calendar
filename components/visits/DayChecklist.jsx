'use client';
import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { useClients } from '@/hooks/useClients';
import { useVisitsForDate } from '@/hooks/useVisits';

export default function DayChecklist({ date, routeId, routeColor }) {
  const { clients, loading: clientsLoading } = useClients({ routeId });
  const { visits, loading: visitsLoading, toggle } = useVisitsForDate(date);
  const [toggling, setToggling] = useState(null);

  const visitedIds = useMemo(() => {
    return new Set(visits.map(v => v.client_id));
  }, [visits]);

  // Group clients by city
  const grouped = useMemo(() => {
    const groups = {};
    clients.forEach(c => {
      const city = c.city || 'Άγνωστη';
      if (!groups[city]) groups[city] = [];
      groups[city].push(c);
    });
    return groups;
  }, [clients]);

  // Clients with notes — shown as a banner at the top
  const clientsWithNotes = useMemo(() => {
    return clients.filter(c => c.notes);
  }, [clients]);

  const totalClients = clients.length;
  const visitedCount = clients.filter(c => visitedIds.has(c.id)).length;
  const progress = totalClients ? Math.round((visitedCount / totalClients) * 100) : 0;

  async function handleToggle(clientId) {
    setToggling(clientId);
    try {
      await toggle(clientId);
    } catch (e) {
      console.error(e);
    }
    setToggling(null);
  }

  const loading = clientsLoading || visitsLoading;

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
          Δεν υπάρχουν πελάτες σε αυτή τη διαδρομή
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Notes banner at top */}
      {clientsWithNotes.length > 0 && (
        <div className="card p-4 space-y-2" style={{ background: 'var(--warning-bg, #FFF8E1)', border: '1px solid var(--warning, #F59E0B)' }}>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base">📝</span>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--warning, #F59E0B)', fontFamily: 'Sora, sans-serif' }}>
              Σημειώσεις
            </span>
          </div>
          {clientsWithNotes.map(c => (
            <Link key={c.id} href={`/clients/${c.id}`} className="flex items-start gap-2 py-1.5 px-2 rounded-lg transition-colors" style={{ background: 'rgba(245,158,11,0.08)' }}>
              <span className="text-xs font-bold flex-shrink-0" style={{ color: routeColor }}>{c.name}:</span>
              <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{c.notes}</span>
            </Link>
          ))}
        </div>
      )}

      {/* Progress header */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Πρόοδος Εβδομάδας
          </span>
          <span className="text-sm font-bold tabular-nums" style={{ color: routeColor, fontFamily: 'Sora, sans-serif' }}>
            {visitedCount}/{totalClients}
          </span>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%`, background: routeColor }} />
        </div>
      </div>

      {/* Client checklist grouped by city */}
      {Object.entries(grouped).map(([city, cityClients]) => (
        <div key={city}>
          <h4
            className="text-[11px] font-bold uppercase tracking-widest mb-2 pl-1"
            style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}
          >
            {city} ({cityClients.length})
          </h4>
          <div className="space-y-1.5">
            {cityClients.map(client => {
              const isVisited = visitedIds.has(client.id);
              const isToggling = toggling === client.id;

              return (
                <div
                  key={client.id}
                  className="card relative flex items-center gap-3 p-3.5 pl-5 transition-all"
                  style={{
                    opacity: isToggling ? 0.6 : 1,
                    background: isVisited ? `${routeColor}08` : 'var(--bg-card)',
                  }}
                >
                  <div className="route-strip" style={{ background: routeColor, opacity: isVisited ? 1 : 0.2 }} />

                  {/* Check button */}
                  <button
                    onClick={() => handleToggle(client.id)}
                    disabled={isToggling}
                    className="visit-check"
                    style={isVisited ? { borderColor: routeColor, background: routeColor } : {}}
                  >
                    {isVisited && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    )}
                  </button>

                  {/* Client info */}
                  <Link href={`/clients/${client.id}`} className="flex-1 min-w-0">
                    <p
                      className="text-sm font-semibold truncate"
                      style={{
                        textDecoration: isVisited ? 'line-through' : 'none',
                        color: isVisited ? 'var(--text-muted)' : 'var(--text-primary)',
                      }}
                    >
                      {client.name}
                    </p>
                    <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                      {client.address || client.city}
                    </p>
                    {client.notes && (
                      <p
                        className="text-[11px] font-semibold mt-1 truncate"
                        style={{ color: 'var(--warning)' }}
                      >
                        📝 {client.notes}
                      </p>
                    )}
                  </Link>

                  {/* Quick call */}
                  <div className="flex gap-1.5 flex-shrink-0">
                    {client.phone && (
                      <a
                        href={`tel:${client.phone.replace(/\s/g, '')}`}
                        className="flex items-center justify-center w-9 h-9 rounded-lg active:scale-90 transition-transform"
                        style={{ background: 'var(--bg-secondary)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                        </svg>
                      </a>
                    )}
                    {client.mobile && (
                      <a
                        href={`tel:${client.mobile.replace(/[\s\/;].*/g, '').replace(/\s/g, '')}`}
                        className="flex items-center justify-center w-9 h-9 rounded-lg active:scale-90 transition-transform"
                        style={{ background: `${routeColor}12` }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={routeColor} strokeWidth="2.5">
                          <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                          <line x1="12" y1="18" x2="12.01" y2="18" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
