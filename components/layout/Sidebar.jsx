'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { todayStr, getMondayOfWeek } from '@/lib/greek';

const navItems = [
  { label: 'Αρχική', href: '/', icon: '⌂' },
  { label: 'Ημερολόγιο', href: '/calendar', icon: '▦' },
  { label: 'Εβδομάδα', href: `/week/${getMondayOfWeek(todayStr())}`, icon: '✓' },
  { label: 'Πελάτες', href: '/clients', icon: '◉' },
  { label: 'Ρυθμίσεις', href: '/settings', icon: '⚙' },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside
      className="hidden md:flex fixed left-0 top-0 bottom-0 w-[220px] flex-col z-40"
      style={{ background: 'var(--bg-card)', borderRight: '1px solid var(--border-light)' }}
    >
      <div className="p-6 pb-4">
        <h1 className="text-xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif', color: 'var(--accent)' }}>
          VetPlan
        </h1>
        <p className="text-xs mt-1" style={{ color: 'var(--text-muted)' }}>Πρόγραμμα Επισκέψεων</p>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {navItems.map((item) => {
          const isActive = item.href === '/'
            ? pathname === '/'
            : item.label === 'Εβδομάδα'
              ? pathname.startsWith('/week')
              : pathname.startsWith(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all"
              style={{
                background: isActive ? 'var(--bg-secondary)' : 'transparent',
                color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                fontFamily: 'Sora, sans-serif',
              }}
            >
              <span className="text-base" style={{ opacity: isActive ? 1 : 0.5 }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 mx-3 mb-4 rounded-xl text-xs" style={{ background: 'var(--bg-secondary)', color: 'var(--text-muted)' }}>
        <p className="font-semibold" style={{ fontFamily: 'Sora, sans-serif' }}>2026</p>
        <p className="mt-1">Κτηνιατρικές Επισκέψεις</p>
      </div>
    </aside>
  );
}
