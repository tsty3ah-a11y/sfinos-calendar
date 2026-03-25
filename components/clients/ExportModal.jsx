'use client';
import { useState } from 'react';
import { useRoutes } from '@/hooks/useRoutes';
import { getClients } from '@/lib/queries';
import * as XLSX from 'xlsx';

const COLUMNS = [
  { key: 'name', label: 'Όνομα', default: true },
  { key: 'city', label: 'Πόλη', default: true },
  { key: 'address', label: 'Διεύθυνση', default: true },
  { key: 'region', label: 'Περιοχή', default: false },
  { key: 'phone', label: 'Τηλέφωνο', default: true },
  { key: 'mobile', label: 'Κινητό', default: true },
  { key: 'route', label: 'Διαδρομή', default: true },
  { key: 'notes', label: 'Σημειώσεις', default: false },
];

export default function ExportModal({ onClose }) {
  const { routes } = useRoutes();
  const [selectedCols, setSelectedCols] = useState(
    () => new Set(COLUMNS.filter(c => c.default).map(c => c.key))
  );
  const [format, setFormat] = useState('xlsx'); // 'xlsx' | 'csv'
  const [separateSheets, setSeparateSheets] = useState(true);
  const [exporting, setExporting] = useState(false);

  function toggleCol(key) {
    setSelectedCols(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }

  function selectAllCols() {
    setSelectedCols(new Set(COLUMNS.map(c => c.key)));
  }

  function clientToRow(client) {
    const row = {};
    const cols = COLUMNS.filter(c => selectedCols.has(c.key));
    cols.forEach(col => {
      if (col.key === 'route') {
        row[col.label] = client.routes?.name || '';
      } else {
        row[col.label] = client[col.key] || '';
      }
    });
    return row;
  }

  async function handleExport() {
    setExporting(true);
    try {
      const allClients = await getClients({});
      const wb = XLSX.utils.book_new();

      if (format === 'xlsx' && separateSheets && routes.length > 0) {
        // One sheet per route
        for (const route of routes) {
          const routeClients = allClients
            .filter(c => c.route_id === route.id)
            .sort((a, b) => (a.city || '').localeCompare(b.city || '') || (a.name || '').localeCompare(b.name || ''));

          if (routeClients.length === 0) continue;
          const rows = routeClients.map(clientToRow);
          const ws = XLSX.utils.json_to_sheet(rows);

          // Auto-size columns
          const colWidths = Object.keys(rows[0] || {}).map(key => {
            const maxLen = Math.max(
              key.length,
              ...rows.map(r => String(r[key] || '').length)
            );
            return { wch: Math.min(maxLen + 2, 40) };
          });
          ws['!cols'] = colWidths;

          XLSX.utils.book_append_sheet(wb, ws, route.name);
        }
      } else {
        // Single sheet
        const sorted = allClients.sort((a, b) => {
          const rA = a.routes?.name || '';
          const rB = b.routes?.name || '';
          return rA.localeCompare(rB) || (a.city || '').localeCompare(b.city || '') || (a.name || '').localeCompare(b.name || '');
        });
        const rows = sorted.map(clientToRow);
        const ws = XLSX.utils.json_to_sheet(rows);

        const colWidths = Object.keys(rows[0] || {}).map(key => {
          const maxLen = Math.max(
            key.length,
            ...rows.map(r => String(r[key] || '').length)
          );
          return { wch: Math.min(maxLen + 2, 40) };
        });
        ws['!cols'] = colWidths;

        XLSX.utils.book_append_sheet(wb, ws, 'Πελάτες');
      }

      const filename = `VetPlan_Πελάτες_${new Date().toISOString().slice(0, 10)}`;

      if (format === 'csv') {
        XLSX.writeFile(wb, `${filename}.csv`, { bookType: 'csv' });
      } else {
        XLSX.writeFile(wb, `${filename}.xlsx`);
      }

      onClose();
    } catch (e) {
      console.error('Export failed:', e);
    }
    setExporting(false);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      {/* Backdrop */}
      <div className="absolute inset-0" style={{ background: 'rgba(0,0,0,0.5)' }} />

      {/* Modal */}
      <div
        className="relative w-full max-w-lg rounded-t-2xl sm:rounded-2xl p-5 animate-fade-up max-h-[85vh] overflow-y-auto"
        style={{ background: 'var(--bg-primary)' }}
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-lg font-bold" style={{ fontFamily: 'Sora, sans-serif' }}>
            Εξαγωγή Πελατών
          </h3>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center"
            style={{ background: 'var(--bg-secondary)' }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Format picker */}
        <div className="mb-4">
          <p className="text-xs font-bold uppercase tracking-widest mb-2" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Μορφή αρχείου
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setFormat('xlsx')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: format === 'xlsx' ? 'var(--accent)' : 'var(--bg-secondary)',
                color: format === 'xlsx' ? '#fff' : 'var(--text-secondary)',
              }}
            >
              Excel (.xlsx)
            </button>
            <button
              onClick={() => setFormat('csv')}
              className="flex-1 py-2.5 rounded-xl text-sm font-bold transition-all"
              style={{
                background: format === 'csv' ? 'var(--accent)' : 'var(--bg-secondary)',
                color: format === 'csv' ? '#fff' : 'var(--text-secondary)',
              }}
            >
              CSV
            </button>
          </div>
        </div>

        {/* Separate sheets toggle (xlsx only) */}
        {format === 'xlsx' && (
          <div className="mb-4">
            <button
              onClick={() => setSeparateSheets(!separateSheets)}
              className="flex items-center gap-3 w-full py-2"
            >
              <div
                className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                style={{
                  borderColor: separateSheets ? 'var(--accent)' : 'var(--border)',
                  background: separateSheets ? 'var(--accent)' : 'transparent',
                }}
              >
                {separateSheets && (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                )}
              </div>
              <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                Κάθε διαδρομή σε ξεχωριστό φύλλο
              </span>
            </button>
          </div>
        )}

        {/* Column picker */}
        <div className="mb-5">
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
              Στήλες
            </p>
            <button
              onClick={selectAllCols}
              className="text-[11px] font-bold px-2 py-1 rounded-lg"
              style={{ color: 'var(--accent)', background: 'rgba(74,144,217,0.08)' }}
            >
              Όλες
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {COLUMNS.map(col => (
              <button
                key={col.key}
                onClick={() => toggleCol(col.key)}
                className="flex items-center gap-2.5 py-2 px-3 rounded-xl transition-all"
                style={{
                  background: selectedCols.has(col.key) ? 'rgba(74,144,217,0.08)' : 'var(--bg-secondary)',
                }}
              >
                <div
                  className="w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all"
                  style={{
                    borderColor: selectedCols.has(col.key) ? 'var(--accent)' : 'var(--border)',
                    background: selectedCols.has(col.key) ? 'var(--accent)' : 'transparent',
                  }}
                >
                  {selectedCols.has(col.key) && (
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  )}
                </div>
                <span className="text-sm font-semibold" style={{ color: selectedCols.has(col.key) ? 'var(--text-primary)' : 'var(--text-muted)' }}>
                  {col.label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Export button */}
        <button
          onClick={handleExport}
          disabled={exporting || selectedCols.size === 0}
          className="w-full py-3 rounded-xl text-sm font-bold transition-all active:scale-95 disabled:opacity-40"
          style={{ background: 'var(--accent)', color: '#fff' }}
        >
          {exporting ? 'Εξαγωγή...' : `Εξαγωγή ${format === 'xlsx' ? 'Excel' : 'CSV'}`}
        </button>
      </div>
    </div>
  );
}
