'use client';
import { useState } from 'react';
import { useRoutes } from '@/hooks/useRoutes';

const FIELDS = [
  { key: 'name', label: 'Όνομα', required: true, placeholder: 'π.χ. ΠΑΠΑΔΟΠΟΥΛΟΣ ΓΙΩΡΓΟΣ' },
  { key: 'city', label: 'Πόλη', placeholder: 'π.χ. ΑΧΑΡΝΑΙ' },
  { key: 'address', label: 'Διεύθυνση', placeholder: 'π.χ. Λ. ΚΑΡΑΜΑΝΛΗ 106' },
  { key: 'region', label: 'Περιοχή', placeholder: 'π.χ. ΑΤΤΙΚΗΣ' },
  { key: 'phone', label: 'Σταθερό', placeholder: 'π.χ. 210 1234567', type: 'tel' },
  { key: 'mobile', label: 'Κινητό', placeholder: 'π.χ. 6971 234567', type: 'tel' },
  { key: 'notes', label: 'Σημειώσεις', placeholder: 'Προαιρετικές σημειώσεις...', multiline: true },
];

export default function ClientForm({ initialData, initialRouteId, onSave, onCancel, saving }) {
  const { routes } = useRoutes();
  const [form, setForm] = useState({
    name: initialData?.name || '',
    city: initialData?.city || '',
    address: initialData?.address || '',
    region: initialData?.region || '',
    phone: initialData?.phone || '',
    mobile: initialData?.mobile || '',
    notes: initialData?.notes || '',
    routeId: initialData?.route_id || initialRouteId || '',
  });

  function update(key, value) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim() || !form.routeId) return;
    onSave(form);
  }

  const isEdit = !!initialData;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Route selector */}
      {!isEdit && (
        <div>
          <label className="text-xs font-bold uppercase tracking-widest mb-2 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Διαδρομή *
          </label>
          <div className="flex gap-2 flex-wrap">
            {routes.map(r => (
              <button
                key={r.id}
                type="button"
                onClick={() => update('routeId', r.id)}
                className="px-3.5 py-2 rounded-xl text-xs font-bold transition-all"
                style={{
                  background: form.routeId === r.id ? r.color : 'var(--bg-secondary)',
                  color: form.routeId === r.id ? '#fff' : 'var(--text-secondary)',
                  fontFamily: 'Sora, sans-serif',
                }}
              >
                {r.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Fields */}
      {FIELDS.map(f => (
        <div key={f.key}>
          <label className="text-xs font-bold uppercase tracking-widest mb-1.5 block" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            {f.label} {f.required && '*'}
          </label>
          {f.multiline ? (
            <textarea
              value={form[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              rows={3}
              className="w-full p-3 rounded-xl text-sm outline-none resize-none transition-all focus:ring-2"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontFamily: 'Manrope, sans-serif' }}
            />
          ) : (
            <input
              type={f.type || 'text'}
              value={form[f.key]}
              onChange={(e) => update(f.key, e.target.value)}
              placeholder={f.placeholder}
              required={f.required}
              className="w-full p-3 rounded-xl text-sm outline-none transition-all focus:ring-2"
              style={{ background: 'var(--bg-secondary)', color: 'var(--text-primary)', border: '1px solid var(--border)', fontFamily: 'Manrope, sans-serif' }}
            />
          )}
        </div>
      ))}

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
          disabled={saving || !form.name.trim() || !form.routeId}
          className="flex-1 p-3.5 rounded-xl text-sm font-bold active:scale-[0.98] transition-all"
          style={{ background: 'var(--accent)', color: '#fff', opacity: (saving || !form.name.trim() || !form.routeId) ? 0.5 : 1 }}
        >
          {saving ? 'Αποθήκευση...' : isEdit ? 'Αποθήκευση' : 'Προσθήκη'}
        </button>
      </div>
    </form>
  );
}
