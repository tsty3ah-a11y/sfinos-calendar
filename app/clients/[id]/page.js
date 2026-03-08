'use client';
import { use, useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { getClient, updateClientNotes } from '@/lib/queries';
import { useClientVisits } from '@/hooks/useVisits';
import { formatDateGreek } from '@/lib/greek';

export default function ClientDetailPage({ params }) {
  const { id } = use(params);
  const router = useRouter();
  const [client, setClient] = useState(null);
  const [loading, setLoading] = useState(true);
  const { visits, loading: visitsLoading } = useClientVisits(id);

  // Notes editing
  const [editingNotes, setEditingNotes] = useState(false);
  const [notesValue, setNotesValue] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const notesRef = useRef(null);

  useEffect(() => {
    getClient(id)
      .then((c) => {
        setClient(c);
        setNotesValue(c.notes || '');
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  useEffect(() => {
    if (editingNotes && notesRef.current) {
      notesRef.current.focus();
    }
  }, [editingNotes]);

  async function saveNotes() {
    setSavingNotes(true);
    try {
      const updated = await updateClientNotes(id, notesValue || null);
      setClient(prev => ({ ...prev, notes: updated.notes }));
      setEditingNotes(false);
    } catch (e) {
      console.error(e);
    }
    setSavingNotes(false);
  }

  if (loading) {
    return (
      <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-4">
        <div className="skeleton h-8 w-32" />
        <div className="skeleton h-48 rounded-xl" />
        <div className="skeleton h-32 rounded-xl" />
      </div>
    );
  }

  if (!client) {
    return (
      <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto">
        <p style={{ color: 'var(--text-muted)' }}>Ο πελάτης δεν βρέθηκε</p>
      </div>
    );
  }

  const routeColor = client.routes?.color || 'var(--accent)';

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-4 animate-fade-up">
      {/* Back button */}
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-sm font-medium mb-2 active:scale-95 transition-transform"
        style={{ color: 'var(--text-secondary)' }}
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polyline points="15 18 9 12 15 6" />
        </svg>
        Πίσω
      </button>

      {/* Client header */}
      <div className="card relative overflow-hidden p-6 pl-7">
        <div className="route-strip" style={{ background: routeColor }} />
        <div
          className="absolute -right-6 -top-6 w-32 h-32 rounded-full"
          style={{ background: routeColor, opacity: 0.08 }}
        />
        <span
          className="inline-block text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md mb-3"
          style={{ background: `${routeColor}15`, color: routeColor, fontFamily: 'Sora, sans-serif' }}
        >
          {client.routes?.name}
        </span>
        <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
          {client.name}
        </h1>
        {client.city && (
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>{client.city}</p>
        )}
        {client.region && (
          <p className="text-xs mt-0.5" style={{ color: 'var(--text-muted)' }}>{client.region}</p>
        )}
      </div>

      {/* Notes */}
      <div className="card p-5">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Σημειώσεις
          </h3>
          {!editingNotes ? (
            <button
              onClick={() => setEditingNotes(true)}
              className="text-xs font-semibold px-2.5 py-1 rounded-lg active:scale-95 transition-all"
              style={{ color: 'var(--accent)', background: 'rgba(74,144,217,0.08)' }}
            >
              {client.notes ? 'Επεξεργασία' : '+ Προσθήκη'}
            </button>
          ) : (
            <div className="flex gap-2">
              <button
                onClick={() => { setEditingNotes(false); setNotesValue(client.notes || ''); }}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg active:scale-95 transition-all"
                style={{ color: 'var(--text-muted)', background: 'var(--bg-secondary)' }}
              >
                Ακύρωση
              </button>
              <button
                onClick={saveNotes}
                disabled={savingNotes}
                className="text-xs font-semibold px-2.5 py-1 rounded-lg active:scale-95 transition-all"
                style={{ color: '#fff', background: 'var(--success)', opacity: savingNotes ? 0.6 : 1 }}
              >
                {savingNotes ? 'Αποθ...' : 'Αποθήκευση'}
              </button>
            </div>
          )}
        </div>

        {editingNotes ? (
          <textarea
            ref={notesRef}
            value={notesValue}
            onChange={(e) => setNotesValue(e.target.value)}
            placeholder="Γράψτε σημειώσεις εδώ..."
            rows={4}
            className="w-full p-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
            style={{
              background: 'var(--bg-secondary)',
              color: 'var(--text-primary)',
              border: '1px solid var(--border)',
              fontFamily: 'Manrope, sans-serif',
            }}
          />
        ) : client.notes ? (
          <div
            className="p-3 rounded-xl text-sm whitespace-pre-wrap leading-relaxed"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          >
            {client.notes}
          </div>
        ) : (
          <p className="text-sm py-2" style={{ color: 'var(--text-muted)' }}>
            Δεν υπάρχουν σημειώσεις
          </p>
        )}
      </div>

      {/* Contact info */}
      <div className="card p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Στοιχεία Επικοινωνίας
        </h3>

        {client.address && (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(client.address + ', ' + (client.city || ''))}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-3 rounded-xl active:scale-[0.98] transition-all"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${routeColor}15` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={routeColor} strokeWidth="2">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                <circle cx="12" cy="10" r="3" />
              </svg>
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium">{client.address}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Χάρτης →</p>
            </div>
          </a>
        )}

        {client.phone && (
          <a
            href={`tel:${client.phone.replace(/\s/g, '')}`}
            className="flex items-center gap-3 p-3 rounded-xl active:scale-[0.98] transition-all"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(74,144,217,0.12)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">{client.phone}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Σταθερό</p>
            </div>
          </a>
        )}

        {client.mobile && (
          <a
            href={`tel:${client.mobile.replace(/[\s\/;].*/g, '').replace(/\s/g, '')}`}
            className="flex items-center gap-3 p-3 rounded-xl active:scale-[0.98] transition-all"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: `${routeColor}12` }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={routeColor} strokeWidth="2">
                <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                <line x1="12" y1="18" x2="12.01" y2="18" />
              </svg>
            </div>
            <div>
              <p className="text-sm font-medium">{client.mobile}</p>
              <p className="text-xs" style={{ color: 'var(--text-muted)' }}>Κινητό</p>
            </div>
          </a>
        )}
      </div>

      {/* Visit history */}
      <div className="card p-5">
        <h3 className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Ιστορικό Επισκέψεων
        </h3>

        {visitsLoading ? (
          <div className="space-y-2">
            {[1, 2, 3].map(i => <div key={i} className="skeleton h-10 w-full" />)}
          </div>
        ) : visits.length === 0 ? (
          <p className="text-sm text-center py-4" style={{ color: 'var(--text-muted)' }}>
            Δεν υπάρχουν καταγεγραμμένες επισκέψεις
          </p>
        ) : (
          <div className="space-y-1">
            {visits.map(v => (
              <div
                key={v.id}
                className="flex items-center gap-3 p-3 rounded-xl"
                style={{ background: 'var(--bg-secondary)' }}
              >
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{
                    background: v.status === 'completed' ? 'var(--success)' :
                                v.status === 'missed' ? 'var(--danger)' : 'var(--warning)'
                  }}
                />
                <span className="text-sm font-medium flex-1">
                  {formatDateGreek(v.visit_date)}
                </span>
                <span
                  className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
                  style={{
                    background: v.status === 'completed' ? 'rgba(39,174,96,0.1)' :
                                v.status === 'missed' ? 'rgba(231,76,60,0.1)' : 'rgba(230,126,34,0.1)',
                    color: v.status === 'completed' ? 'var(--success)' :
                           v.status === 'missed' ? 'var(--danger)' : 'var(--warning)',
                  }}
                >
                  {v.status === 'completed' ? 'Ολοκληρώθηκε' :
                   v.status === 'missed' ? 'Αναπάντητη' : 'Αναβλήθηκε'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
