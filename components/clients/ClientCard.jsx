'use client';
import Link from 'next/link';

export default function ClientCard({ client, showRoute = true }) {
  const routeColor = client.routes?.color || 'var(--accent)';

  return (
    <Link
      href={`/clients/${client.id}`}
      className="card card-interactive relative block p-4 pl-6"
    >
      <div className="route-strip" style={{ background: routeColor }} />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold truncate" style={{ fontFamily: 'Sora, sans-serif' }}>
            {client.name}
          </h3>
          <p className="text-xs mt-0.5 truncate" style={{ color: 'var(--text-secondary)' }}>
            {client.city}
            {client.address && ` · ${client.address}`}
          </p>
          <div className="flex items-center gap-2 mt-2 flex-wrap">
            {showRoute && client.routes && (
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                style={{ background: `${routeColor}15`, color: routeColor }}
              >
                {client.routes.name}
              </span>
            )}
            {client.notes && (
              <span
                className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md"
                style={{ background: 'rgba(230,126,34,0.1)', color: 'var(--warning)' }}
              >
                Σημ.
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-1.5 flex-shrink-0">
          {client.phone && (
            <a
              href={`tel:${client.phone.replace(/\s/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all active:scale-90"
              style={{ background: 'var(--bg-secondary)' }}
              title={client.phone}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
              </svg>
            </a>
          )}
          {client.mobile && (
            <a
              href={`tel:${client.mobile.replace(/[\s\/;].*/g, '').replace(/\s/g, '')}`}
              onClick={(e) => e.stopPropagation()}
              className="flex items-center justify-center w-9 h-9 rounded-lg transition-all active:scale-90"
              style={{ background: `${routeColor}10` }}
              title={client.mobile}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={routeColor} strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </a>
          )}
        </div>
      </div>
    </Link>
  );
}
