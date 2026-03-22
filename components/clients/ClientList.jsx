'use client';
import { useState, useMemo, useCallback } from 'react';
import { useClients, useCities } from '@/hooks/useClients';
import { useRoutes } from '@/hooks/useRoutes';
import { deleteClients, updateClientsRoute } from '@/lib/queries';
import ClientCard from './ClientCard';
import SearchBar from './SearchBar';

export default function ClientList() {
  const [search, setSearch] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  // Multi-select state
  const [selectMode, setSelectMode] = useState(false);
  const [selected, setSelected] = useState(new Set());
  const [bulkAction, setBulkAction] = useState(null); // 'route' | 'delete'
  const [targetRoute, setTargetRoute] = useState('');
  const [processing, setProcessing] = useState(false);

  const { routes } = useRoutes();
  const { clients, loading, refresh } = useClients({
    routeId: routeFilter || undefined,
    city: cityFilter || undefined,
    search: search || undefined,
  });
  const cities = useCities(routeFilter || undefined);

  const toggleSelect = useCallback((id) => {
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const selectAll = useCallback(() => {
    setSelected(new Set(clients.map(c => c.id)));
  }, [clients]);

  const clearSelection = useCallback(() => {
    setSelected(new Set());
    setBulkAction(null);
    setTargetRoute('');
  }, []);

  const exitSelectMode = useCallback(() => {
    setSelectMode(false);
    clearSelection();
  }, [clearSelection]);

  async function handleBulkRoute() {
    if (!targetRoute || selected.size === 0) return;
    setProcessing(true);
    try {
      await updateClientsRoute([...selected], targetRoute);
      exitSelectMode();
      refresh();
    } catch (e) {
      console.error(e);
    }
    setProcessing(false);
  }

  async function handleBulkDelete() {
    if (selected.size === 0) return;
    setProcessing(true);
    try {
      await deleteClients([...selected]);
      exitSelectMode();
      refresh();
    } catch (e) {
      console.error(e);
    }
    setProcessing(false);
  }

  // Group by city
  const grouped = useMemo(() => {
    const groups = {};
    clients.forEach(c => {
      const city = c.city || 'Άγνωστη';
      if (!groups[city]) groups[city] = [];
      groups[city].push(c);
    });
    return groups;
  }, [clients]);

  return (
    <div className="space-y-4">
      <SearchBar value={search} onChange={setSearch} placeholder="Αναζήτηση πελάτη..." />

      {/* Filters */}
      <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
        <button
          onClick={() => { setRouteFilter(''); setCityFilter(''); }}
          className="flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
          style={{
            background: !routeFilter ? 'var(--text-primary)' : 'var(--bg-secondary)',
            color: !routeFilter ? 'var(--bg-primary)' : 'var(--text-secondary)',
            fontFamily: 'Sora, sans-serif',
          }}
        >
          Όλες
        </button>
        {routes.map(r => (
          <button
            key={r.id}
            onClick={() => { setRouteFilter(r.id === routeFilter ? '' : r.id); setCityFilter(''); }}
            className="flex-shrink-0 px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
            style={{
              background: routeFilter === r.id ? r.color : 'var(--bg-secondary)',
              color: routeFilter === r.id ? '#fff' : 'var(--text-secondary)',
              fontFamily: 'Sora, sans-serif',
            }}
          >
            {r.name}
          </button>
        ))}
      </div>

      {/* City filter */}
      {cities.length > 0 && (
        <div className="flex gap-2 overflow-x-auto pb-1 -mx-1 px-1" style={{ scrollbarWidth: 'none' }}>
          <button
            onClick={() => setCityFilter('')}
            className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
            style={{
              background: !cityFilter ? 'var(--accent)' : 'var(--bg-secondary)',
              color: !cityFilter ? '#fff' : 'var(--text-muted)',
            }}
          >
            Όλες οι πόλεις
          </button>
          {cities.map(city => (
            <button
              key={city}
              onClick={() => setCityFilter(city === cityFilter ? '' : city)}
              className="flex-shrink-0 px-3 py-1.5 rounded-lg text-[11px] font-semibold transition-all"
              style={{
                background: cityFilter === city ? 'var(--accent)' : 'var(--bg-secondary)',
                color: cityFilter === city ? '#fff' : 'var(--text-muted)',
              }}
            >
              {city}
            </button>
          ))}
        </div>
      )}

      {/* Results count + Select mode toggle */}
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
          {clients.length} πελάτες
        </p>
        {!selectMode ? (
          <button
            onClick={() => setSelectMode(true)}
            className="text-xs font-bold px-3 py-1.5 rounded-lg transition-all"
            style={{ color: 'var(--accent)', background: 'rgba(74,144,217,0.08)' }}
          >
            Επιλογή
          </button>
        ) : (
          <div className="flex items-center gap-2">
            <button
              onClick={selectAll}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
              style={{ color: 'var(--accent)', background: 'rgba(74,144,217,0.08)' }}
            >
              Όλους
            </button>
            <button
              onClick={clearSelection}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
              style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}
            >
              Κανέναν
            </button>
            <button
              onClick={exitSelectMode}
              className="text-[11px] font-bold px-2.5 py-1 rounded-lg"
              style={{ color: 'var(--danger, #e74c3c)', background: 'rgba(231,76,60,0.08)' }}
            >
              Ακύρωση
            </button>
          </div>
        )}
      </div>

      {/* Bulk action bar — fixed at bottom when items selected */}
      {selectMode && selected.size > 0 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up"
          style={{ background: 'var(--bg-primary)', borderTop: '1px solid var(--border)' }}
        >
          <div className="max-w-2xl mx-auto">
            <p className="text-xs font-bold mb-3" style={{ color: 'var(--text-primary)', fontFamily: 'Sora, sans-serif' }}>
              {selected.size} επιλεγμένοι
            </p>

            {!bulkAction && (
              <div className="flex gap-2">
                <button
                  onClick={() => setBulkAction('route')}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all active:scale-95"
                  style={{ background: 'var(--accent)', color: '#fff' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9" />
                    <path d="M13.73 21a2 2 0 01-3.46 0" />
                  </svg>
                  Αλλαγή Διαδρομής
                </button>
                <button
                  onClick={() => setBulkAction('delete')}
                  className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl text-sm font-bold transition-all active:scale-95"
                  style={{ background: 'var(--danger, #e74c3c)', color: '#fff' }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                  </svg>
                  Διαγραφή
                </button>
              </div>
            )}

            {/* Route picker */}
            {bulkAction === 'route' && (
              <div className="space-y-3">
                <p className="text-xs font-semibold" style={{ color: 'var(--text-secondary)' }}>
                  Μετακίνηση σε:
                </p>
                <div className="flex gap-2 flex-wrap">
                  {routes.map(r => (
                    <button
                      key={r.id}
                      onClick={() => setTargetRoute(r.id)}
                      className="px-4 py-2.5 rounded-xl text-xs font-bold transition-all"
                      style={{
                        background: targetRoute === r.id ? r.color : 'var(--bg-secondary)',
                        color: targetRoute === r.id ? '#fff' : 'var(--text-secondary)',
                        fontFamily: 'Sora, sans-serif',
                        border: targetRoute === r.id ? 'none' : '1px solid var(--border)',
                      }}
                    >
                      {r.name}
                    </button>
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => { setBulkAction(null); setTargetRoute(''); }}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                  >
                    Πίσω
                  </button>
                  <button
                    onClick={handleBulkRoute}
                    disabled={!targetRoute || processing}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-40"
                    style={{ background: 'var(--accent)', color: '#fff' }}
                  >
                    {processing ? 'Αποθήκευση...' : 'Εφαρμογή'}
                  </button>
                </div>
              </div>
            )}

            {/* Delete confirmation */}
            {bulkAction === 'delete' && (
              <div className="space-y-3">
                <p className="text-xs font-semibold" style={{ color: 'var(--danger, #e74c3c)' }}>
                  Διαγραφή {selected.size} πελατών; Αυτή η ενέργεια δεν αναιρείται.
                </p>
                <div className="flex gap-2">
                  <button
                    onClick={() => setBulkAction(null)}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold"
                    style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
                  >
                    Πίσω
                  </button>
                  <button
                    onClick={handleBulkDelete}
                    disabled={processing}
                    className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-40"
                    style={{ background: 'var(--danger, #e74c3c)', color: '#fff' }}
                  >
                    {processing ? 'Διαγραφή...' : 'Επιβεβαίωση'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Client list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}
        </div>
      ) : (
        <div className="space-y-6" style={{ paddingBottom: selectMode && selected.size > 0 ? '160px' : '0' }}>
          {Object.entries(grouped).map(([city, cityClients]) => (
            <div key={city}>
              <h4
                className="text-xs font-bold uppercase tracking-widest mb-2 pl-1"
                style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}
              >
                {city} ({cityClients.length})
              </h4>
              <div className="space-y-2">
                {cityClients.map(client => (
                  <ClientCard
                    key={client.id}
                    client={client}
                    showRoute={!routeFilter}
                    selectMode={selectMode}
                    isSelected={selected.has(client.id)}
                    onToggleSelect={() => toggleSelect(client.id)}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
