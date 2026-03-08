'use client';
import ClientList from '@/components/clients/ClientList';

export default function ClientsPage() {
  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold tracking-tight mb-5" style={{ fontFamily: 'Sora, sans-serif' }}>
        Πελάτες
      </h1>
      <ClientList />
    </div>
  );
}
