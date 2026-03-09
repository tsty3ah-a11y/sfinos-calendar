'use client';
import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';

const STORAGE_KEY = 'vetplan-read-notes';

function getReadNotes() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch { return {}; }
}

function setReadNote(clientId, isRead) {
  const map = getReadNotes();
  if (isRead) {
    map[clientId] = Date.now();
  } else {
    delete map[clientId];
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(map));
}

export default function NotesBanner({ clients, routeColor, defaultCollapsed = true }) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);
  const [readMap, setReadMap] = useState({});

  // Load read state from localStorage
  useEffect(() => {
    setReadMap(getReadNotes());
  }, []);

  const handleToggleRead = useCallback((e, clientId) => {
    e.preventDefault();
    e.stopPropagation();
    const isCurrentlyRead = !!readMap[clientId];
    setReadNote(clientId, !isCurrentlyRead);
    setReadMap(prev => {
      const next = { ...prev };
      if (isCurrentlyRead) {
        delete next[clientId];
      } else {
        next[clientId] = Date.now();
      }
      return next;
    });
  }, [readMap]);

  if (!clients || clients.length === 0) return null;

  const unreadClients = clients.filter(c => !readMap[c.id]);
  const readClients = clients.filter(c => readMap[c.id]);
  const unreadCount = unreadClients.length;

  return (
    <div
      className="card overflow-hidden"
      style={{ background: 'var(--warning-bg, #FFF8E1)', border: '1px solid var(--warning, #F59E0B)' }}
    >
      {/* Header — always visible, tappable to collapse/expand */}
      <button
        type="button"
        onClick={() => setCollapsed(prev => !prev)}
        className="w-full flex items-center gap-2 p-4 pb-2 text-left"
      >
        <span className="text-base">📝</span>
        <span
          className="text-xs font-bold uppercase tracking-widest flex-1"
          style={{ color: 'var(--warning, #F59E0B)', fontFamily: 'Sora, sans-serif' }}
        >
          Σημειώσεις
        </span>
        {unreadCount > 0 && (
          <span
            className="text-[10px] font-bold px-1.5 py-0.5 rounded-full"
            style={{ background: 'var(--warning, #F59E0B)', color: '#fff' }}
          >
            {unreadCount}
          </span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="var(--warning, #F59E0B)"
          strokeWidth="2.5"
          style={{
            transition: 'transform 0.2s ease',
            transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Collapsed summary */}
      {collapsed && unreadCount > 0 && (
        <p className="px-4 pb-3 text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
          {unreadCount} σημείωσ{unreadCount === 1 ? 'η' : 'εις'} — πατήστε για ανάπτυξη
        </p>
      )}
      {collapsed && unreadCount === 0 && (
        <p className="px-4 pb-3 text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
          Όλες διαβάστηκαν ✓
        </p>
      )}

      {/* Expanded notes list */}
      {!collapsed && (
        <div className="px-4 pb-3 space-y-1.5">
          {/* Unread notes first */}
          {unreadClients.map(c => (
            <div key={c.id} className="flex items-start gap-2 py-1.5 px-2 rounded-lg" style={{ background: 'rgba(245,158,11,0.08)' }}>
              <button
                type="button"
                onClick={(e) => handleToggleRead(e, c.id)}
                className="flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                style={{ borderColor: 'var(--warning, #F59E0B)', background: 'transparent' }}
                title="Σημείωση ως διαβασμένη"
              />
              <Link href={`/clients/${c.id}`} className="flex-1 min-w-0">
                <span className="text-xs font-bold" style={{ color: routeColor }}>{c.name}: </span>
                <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{c.notes}</span>
              </Link>
            </div>
          ))}

          {/* Read notes — dimmed */}
          {readClients.length > 0 && (
            <>
              {readClients.map(c => (
                <div key={c.id} className="flex items-start gap-2 py-1.5 px-2 rounded-lg opacity-40">
                  <button
                    type="button"
                    onClick={(e) => handleToggleRead(e, c.id)}
                    className="flex-shrink-0 mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors"
                    style={{ borderColor: 'var(--warning, #F59E0B)', background: 'var(--warning, #F59E0B)' }}
                    title="Επαναφορά σημείωσης"
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </button>
                  <Link href={`/clients/${c.id}`} className="flex-1 min-w-0">
                    <span className="text-xs font-bold" style={{ color: routeColor }}>{c.name}: </span>
                    <span className="text-xs line-through" style={{ color: 'var(--text-muted)' }}>{c.notes}</span>
                  </Link>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </div>
  );
}
