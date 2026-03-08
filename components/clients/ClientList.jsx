'use client';
import { useState, useMemo } from 'react';
import { useClients, useCities } from '@/hooks/useClients';
import { useRoutes } from '@/hooks/useRoutes';
import ClientCard from './ClientCard';
import SearchBar from './SearchBar';

export default function ClientList() {
  const [search, setSearch] = useState('');
  const [routeFilter, setRouteFilter] = useState('');
  const [cityFilter, setCityFilter] = useState('');

  const { routes } = useRoutes();
  const { clients, loading } = useClients({
    routeId: routeFilter || undefined,
    city: cityFilter || undefined,
    search: search || undefined,
  });
  const cities = useCities(routeFilter || undefined);

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

      {/* Results count */}
      <p className="text-xs font-semibold" style={{ color: 'var(--text-muted)' }}>
        {clients.length} πελάτες
      </p>

      {/* Client list */}
      {loading ? (
        <div className="space-y-3">
          {[1, 2, 3, 4, 5].map(i => <div key={i} className="skeleton h-20 rounded-xl" />)}
        </div>
      ) : (
        <div className="space-y-6">
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
                  <ClientCard key={client.id} client={client} showRoute={!routeFilter} />
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
