'use client';

export default function SearchBar({ value, onChange, placeholder = 'Αναζήτηση...' }) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3.5 top-1/2 -translate-y-1/2"
        width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="var(--text-muted)" strokeWidth="2"
      >
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full pl-11 pr-4 py-3 text-sm rounded-xl outline-none transition-all focus:ring-2"
        style={{
          background: 'var(--bg-secondary)',
          color: 'var(--text-primary)',
          border: '1px solid var(--border-light)',
          fontFamily: 'Manrope, sans-serif',
        }}
      />
    </div>
  );
}
