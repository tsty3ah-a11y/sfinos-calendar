'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ClientList from '@/components/clients/ClientList';
import ClientForm from '@/components/clients/ClientForm';
import { createClient } from '@/lib/queries';

export default function ClientsPage() {
  const router = useRouter();
  const [showAdd, setShowAdd] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleCreate(form) {
    setSaving(true);
    try {
      const client = await createClient({
        routeId: form.routeId,
        name: form.name.trim(),
        region: form.region.trim() || null,
        address: form.address.trim() || null,
        city: form.city.trim() || null,
        phone: form.phone.trim() || null,
        mobile: form.mobile.trim() || null,
        notes: form.notes.trim() || null,
      });
      setShowAdd(false);
      router.push(`/clients/${client.id}`);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-5">
        <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
          Πελάτες
        </h1>
        {!showAdd && (
          <button
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold active:scale-95 transition-all"
            style={{ background: 'var(--accent)', color: '#fff' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
            </svg>
            Νέος
          </button>
        )}
      </div>

      {showAdd && (
        <div className="card p-5 mb-5 animate-fade-up">
          <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
            Νέος Πελάτης
          </h3>
          <ClientForm
            onSave={handleCreate}
            onCancel={() => setShowAdd(false)}
            saving={saving}
          />
        </div>
      )}

      <ClientList />
    </div>
  );
}
