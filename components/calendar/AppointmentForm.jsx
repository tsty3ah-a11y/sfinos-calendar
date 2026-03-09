'use client';
import { useState, useEffect } from 'react';
import { useClients } from '@/hooks/useClients';

export default function AppointmentForm({ initialData, initialDate, onSave, onCancel, saving }) {
  const { clients } = useClients();
  const [form, setForm] = useState({
    title: initialData?.title || '',
    date: initialData?.appointment_date || initialDate || '',
    time: initialData?.appointment_time?.slice(0, 5) || '',
    durationMinutes: initialData?.duration_minutes || 30,
    clientId: initialData?.client_id || '',
    notes: initialData?.notes || '',
  });
  const [search, setSearch] = useState('');
  const [showClients, setShowClients] = useState(false);

  // If initialData has a client, show name
  const selectedClient = clients.find(c => c.id === form.clientId);

  const filteredClients = search
    ? clients.filter(c => c.name.toLowerCase().includes(search.toLowerCase())).slice(0, 8)
    : clients.slice(0, 8);

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function selectClient(client) {
    update('clientId', client.id);
    if (!form.title) update('title', client.name);
    setSearch('');
    setShowClients(false);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim() || !form.date) return;
    onSave(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Title */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Τίτλος *
        </label>
        <input
          type="text"
          value={form.title}
          onChange={(e) => update('title', e.target.value)}
          placeholder="π.χ. Ραντεβού ΣΕΡΓΙΟΥ"
          required
          className="w-full p-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        />
      </div>

      {/* Date + Time row */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Ημερομηνία *
          </label>
          <input
            type="date"
            value={form.date}
            onChange={(e) => update('date', e.target.value)}
            required
            className="w-full p-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
          />
        </div>
        <div>
          <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Ώρα
          </label>
          <input
            type="time"
            value={form.time}
            onChange={(e) => update('time', e.target.value)}
            className="w-full p-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
            style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
          />
        </div>
      </div>

      {/* Duration */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Διάρκεια (λεπτά)
        </label>
        <div className="flex gap-2">
          {[15, 30, 45, 60, 90].map(d => (
            <button
              key={d}
              type="button"
              onClick={() => update('durationMinutes', d)}
              className="flex-1 py-2 rounded-xl text-xs font-bold transition-all"
              style={{
                background: form.durationMinutes === d ? 'var(--accent)' : 'var(--bg-secondary)',
                color: form.durationMinutes === d ? '#fff' : 'var(--text-secondary)',
              }}
            >
              {d}&#39;
            </button>
          ))}
        </div>
      </div>

      {/* Client link */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Πελάτης (προαιρετικό)
        </label>
        {selectedClient ? (
          <div className="flex items-center gap-2 p-3 rounded-xl" style={{ background: 'var(--bg-secondary)' }}>
            <div className="w-3 h-3 rounded-full" style={{ background: selectedClient.routes?.color || 'var(--accent)' }} />
            <span className="text-sm font-semibold flex-1">{selectedClient.name}</span>
            <button
              type="button"
              onClick={() => { update('clientId', ''); }}
              className="text-xs font-semibold px-2 py-1 rounded-lg"
              style={{ color: 'var(--danger)', background: 'rgba(231,76,60,0.08)' }}
            >
              Αφαίρεση
            </button>
          </div>
        ) : (
          <>
            <input
              type="text"
              value={search}
              onChange={(e) => { setSearch(e.target.value); setShowClients(true); }}
              onFocus={() => setShowClients(true)}
              placeholder="Αναζήτηση πελάτη..."
              className="w-full p-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
            />
            {showClients && filteredClients.length > 0 && (
              <div className="mt-1 rounded-xl overflow-hidden" style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}>
                {filteredClients.map(c => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => selectClient(c)}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-left transition-colors"
                    style={{ borderBottom: '1px solid var(--border-light)' }}
                  >
                    <div className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ background: c.routes?.color || 'var(--accent)' }} />
                    <span className="text-sm font-medium truncate">{c.name}</span>
                    <span className="text-[10px] ml-auto flex-shrink-0" style={{ color: 'var(--text-muted)' }}>{c.city}</span>
                  </button>
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Notes */}
      <div>
        <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
          Σημειώσεις
        </label>
        <textarea
          value={form.notes}
          onChange={(e) => update('notes', e.target.value)}
          placeholder="Προαιρετικές σημειώσεις..."
          rows={2}
          className="w-full p-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)' }}
        />
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-2">
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 p-3.5 rounded-xl text-sm font-semibold active:scale-[0.98] transition-all"
          style={{ background: 'var(--bg-secondary)', color: 'var(--text-secondary)' }}
        >
          Ακύρωση
        </button>
        <button
          type="submit"
          disabled={saving || !form.title.trim() || !form.date}
          className="flex-1 p-3.5 rounded-xl text-sm font-bold active:scale-[0.98] transition-all"
          style={{ background: 'var(--accent)', color: '#fff', opacity: (saving || !form.title.trim() || !form.date) ? 0.5 : 1 }}
        >
          {saving ? 'Αποθήκευση...' : initialData ? 'Αποθήκευση' : 'Προσθήκη'}
        </button>
      </div>
    </form>
  );
}
