'use client';
import { useState, useMemo, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useClients } from '@/hooks/useClients';
import { useVisitsForWeek } from '@/hooks/useVisits';
import { DAYS_SHORT, MONTHS_SHORT, todayStr, toDateStr } from '@/lib/greek';
import { getAppointmentsForWeek, getLastVisitsForClients, getPreviousCycleVisits } from '@/lib/queries';
import NotesBanner from '@/components/notes/NotesBanner';

// Build array of 7 dates for Mon-Sun of the week
function getWeekDays(monday) {
  const days = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday + 'T00:00:00');
    d.setDate(d.getDate() + i);
    days.push(toDateStr(d));
  }
  return days;
}

export default function DayChecklist({ date, routeId, routeColor }) {
  const { clients, loading: clientsLoading } = useClients({ routeId });
  const { visits, loading: visitsLoading, add, remove, updateStatus } = useVisitsForWeek(date);
  const [toggling, setToggling] = useState(null);
  const [pickerFor, setPickerFor] = useState(null); // { clientId, status }
  const pickerRef = useRef(null);
  const [appointments, setAppointments] = useState([]);
  const [lastVisitMap, setLastVisitMap] = useState({}); // client_id -> last visit date (from previous cycles)
  const [prevCycle, setPrevCycle] = useState(null); // { monday, visitedCount, totalClients }

  const weekDays = useMemo(() => getWeekDays(date), [date]);
  const today = todayStr();

  // Fetch appointments for this week
  useEffect(() => {
    if (!date) return;
    getAppointmentsForWeek(date)
      .then(setAppointments)
      .catch(console.error);
  }, [date]);

  // Fetch last visit dates for each client (from previous cycles)
  useEffect(() => {
    if (!clients.length || !date || clientsLoading) return;
    const clientIds = clients.map(c => c.id);
    getLastVisitsForClients(clientIds, date)
      .then(setLastVisitMap)
      .catch(console.error);
  }, [clients, date, clientsLoading]);

  // Fetch previous cycle summary
  useEffect(() => {
    if (!routeId || !date) return;
    getPreviousCycleVisits(routeId, date)
      .then(setPrevCycle)
      .catch(console.error);
  }, [routeId, date]);

  // Map client_id -> visit info { date, status }
  const visitMap = useMemo(() => {
    const map = {};
    visits.forEach(v => {
      map[v.client_id] = { date: v.visit_date, status: v.status || 'completed' };
    });
    return map;
  }, [visits]);

  // Group clients by city
  const grouped = useMemo(() => {
    const groups = {};
    clients.forEach(c => {
      const city = c.city || 'Άγνωστη';
      if (!groups[city]) groups[city] = [];
      groups[city].push(c);
    });
    return groups;
  }, [clients]);

  // Clients with notes
  const clientsWithNotes = useMemo(() => {
    return clients.filter(c => c.notes);
  }, [clients]);

  const totalClients = clients.length;
  const visitedCount = clients.filter(c => visitMap[c.id]?.status === 'completed').length;
  const partialClients = clients.filter(c => visitMap[c.id]?.status === 'partial');
  const partialCount = partialClients.length;
  const progress = totalClients ? Math.round((visitedCount / totalClients) * 100) : 0;

  // Close picker on outside click
  useEffect(() => {
    if (!pickerFor) return;
    function handleClick(e) {
      if (pickerRef.current && !pickerRef.current.contains(e.target)) {
        setPickerFor(null);
      }
    }
    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);
    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [pickerFor]);

  // Full visit checkbox click
  function handleFullCheckClick(clientId) {
    const visit = visitMap[clientId];
    if (visit?.status === 'completed') {
      // Already full — remove entirely
      handleRemove(clientId, visit.date);
    } else if (visit?.status === 'partial') {
      // Upgrade partial -> completed (same date)
      handleUpdateStatus(clientId, visit.date, 'completed');
    } else {
      // No visit — open date picker for full visit
      setPickerFor({ clientId, status: 'completed' });
    }
  }

  // Partial visit checkbox click
  function handlePartialCheckClick(clientId) {
    const visit = visitMap[clientId];
    if (visit?.status === 'partial') {
      // Already partial — remove entirely
      handleRemove(clientId, visit.date);
    } else if (visit?.status === 'completed') {
      // Downgrade completed -> partial (same date)
      handleUpdateStatus(clientId, visit.date, 'partial');
    } else {
      // No visit — open date picker for partial visit
      setPickerFor({ clientId, status: 'partial' });
    }
  }

  async function handleAdd(clientId, visitDate, status) {
    setToggling(clientId);
    setPickerFor(null);
    try {
      await add(clientId, visitDate, status);
    } catch (e) {
      console.error(e);
    }
    setToggling(null);
  }

  async function handleRemove(clientId, visitDate) {
    setToggling(clientId);
    try {
      await remove(clientId, visitDate);
    } catch (e) {
      console.error(e);
    }
    setToggling(null);
  }

  async function handleUpdateStatus(clientId, visitDate, status) {
    setToggling(clientId);
    try {
      await updateStatus(clientId, visitDate, status);
    } catch (e) {
      console.error(e);
    }
    setToggling(null);
  }

  // Format visit date as short day name + date number
  function formatVisitDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
    return `${DAYS_SHORT[dayIdx]} ${d.getDate()}`;
  }

  // Format a date for previous visit display: "5 Μαρ"
  function formatShortDate(dateStr) {
    const d = new Date(dateStr + 'T00:00:00');
    return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]}`;
  }

  const loading = clientsLoading || visitsLoading;

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
      </div>
    );
  }

  if (clients.length === 0) {
    return (
      <div className="card p-8 text-center">
        <p className="text-4xl mb-3">📋</p>
        <p className="text-sm font-semibold" style={{ color: 'var(--text-muted)' }}>
          Δεν υπάρχουν πελάτες σε αυτή τη διαδρομή
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Appointments banner at top */}
      {appointments.length > 0 && (
        <div className="card p-4 space-y-2" style={{ border: '1px solid var(--accent)' }}>
          <div className="flex items-center gap-2 mb-1">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
              <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
            </svg>
            <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
              Ραντεβού Εβδομάδας
            </span>
          </div>
          {appointments.map(a => {
            const d = new Date(a.appointment_date + 'T00:00:00');
            const dayIdx = d.getDay() === 0 ? 6 : d.getDay() - 1;
            return (
              <Link
                key={a.id}
                href="/calendar"
                className="flex items-center gap-2 py-1.5 px-2 rounded-lg"
                style={{ background: 'rgba(74,144,217,0.06)' }}
              >
                <span className="text-[10px] font-bold px-1.5 py-0.5 rounded" style={{ background: 'var(--bg-secondary)', color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
                  {DAYS_SHORT[dayIdx]} {d.getDate()}
                </span>
                {a.appointment_time && (
                  <span className="text-[10px] font-bold" style={{ color: 'var(--text-muted)' }}>
                    {a.appointment_time.slice(0, 5)}
                  </span>
                )}
                <span className="text-xs font-semibold truncate flex-1" style={{ color: 'var(--text-primary)' }}>
                  {a.title}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Notes banner at top — collapsible with read/dismiss */}
      <NotesBanner clients={clientsWithNotes} routeColor={routeColor} />

      {/* Progress header */}
      <div className="card p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
            Πρόοδος Εβδομάδας
          </span>
          <div className="flex items-center gap-2">
            {partialCount > 0 && (
              <span className="text-[11px] font-bold tabular-nums px-1.5 py-0.5 rounded" style={{ color: 'var(--warning, #F59E0B)', background: 'rgba(245,158,11,0.1)', fontFamily: 'Sora, sans-serif' }}>
                {partialCount} εκκρεμεί
              </span>
            )}
            <span className="text-sm font-bold tabular-nums" style={{ color: routeColor, fontFamily: 'Sora, sans-serif' }}>
              {visitedCount}/{totalClients}
            </span>
          </div>
        </div>
        <div className="progress-track">
          <div className="progress-fill" style={{ width: `${progress}%`, background: routeColor }} />
        </div>
        {/* Previous cycle summary */}
        {prevCycle && (
          <div className="flex items-center gap-2 mt-3 pt-3" style={{ borderTop: '1px solid var(--border)' }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2">
              <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            <span className="text-[11px] font-semibold" style={{ color: 'var(--text-muted)' }}>
              Προηγ. κύκλος ({formatShortDate(prevCycle.monday)}):
            </span>
            <span className="text-[11px] font-bold tabular-nums" style={{ color: routeColor }}>
              {prevCycle.visitedCount}/{prevCycle.totalClients}
            </span>
            <div className="flex-1 h-1.5 rounded-full" style={{ background: 'var(--bg-secondary)' }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${prevCycle.totalClients ? Math.round((prevCycle.visitedCount / prevCycle.totalClients) * 100) : 0}%`,
                  background: routeColor,
                  opacity: 0.4,
                }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Partial visits summary */}
      {partialCount > 0 && (
        <div className="card p-4" style={{ border: '1.5px solid var(--warning, #F59E0B)', background: 'rgba(245,158,11,0.06)' }}>
          <div className="flex items-center gap-2 mb-2">
            <span
              className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded"
              style={{ background: 'var(--warning, #F59E0B)', color: '#fff', fontFamily: 'Sora, sans-serif' }}
            >
              ΕΚΚΡΕΜΟΥΝ
            </span>
            <span className="text-xs font-bold" style={{ color: 'var(--warning, #F59E0B)', fontFamily: 'Sora, sans-serif' }}>
              {partialCount} επισκέψ{partialCount === 1 ? 'η' : 'εις'}
            </span>
          </div>
          <div className="space-y-1">
            {partialClients.map(c => (
              <div key={c.id} className="flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full" style={{ background: 'var(--warning, #F59E0B)' }} />
                <span className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                  {c.name}
                </span>
                <span className="text-[10px] font-bold ml-auto flex-shrink-0" style={{ color: 'var(--warning, #F59E0B)' }}>
                  {formatVisitDate(visitMap[c.id].date)}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Client checklist grouped by city */}
      {Object.entries(grouped).map(([city, cityClients]) => (
        <div key={city}>
          <h4
            className="text-[11px] font-bold uppercase tracking-widest mb-2 pl-1"
            style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}
          >
            {city} ({cityClients.length})
          </h4>
          <div className="space-y-1.5">
            {cityClients.map(client => {
              const visit = visitMap[client.id];
              const isCompleted = visit?.status === 'completed';
              const isPartial = visit?.status === 'partial';
              const hasVisit = !!visit;
              const isToggling = toggling === client.id;
              const showPicker = pickerFor?.clientId === client.id;

              return (
                <div key={client.id}>
                  <div
                    className="card relative flex items-center gap-3 p-3.5 pl-5 transition-all"
                    style={{
                      opacity: isToggling ? 0.6 : 1,
                      background: isCompleted
                        ? `${routeColor}08`
                        : isPartial
                          ? 'rgba(245,158,11,0.10)'
                          : 'var(--bg-card)',
                      border: isPartial ? '1.5px solid var(--warning, #F59E0B)' : undefined,
                    }}
                  >
                    <div
                      className="route-strip"
                      style={{
                        background: isPartial ? 'var(--warning, #F59E0B)' : routeColor,
                        opacity: hasVisit ? 1 : 0.2,
                        width: isPartial ? '5px' : undefined,
                      }}
                    />

                    {/* Two checkboxes stacked */}
                    <div className="flex flex-col gap-1.5 flex-shrink-0">
                      {/* Full visit checkbox */}
                      <button
                        onClick={() => handleFullCheckClick(client.id)}
                        disabled={isToggling}
                        className="visit-check"
                        style={isCompleted ? { borderColor: routeColor, background: routeColor } : {}}
                        title="Ολοκληρωμένη επίσκεψη"
                      >
                        {isCompleted && (
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        )}
                      </button>

                      {/* Partial/soft visit checkbox */}
                      <button
                        onClick={() => handlePartialCheckClick(client.id)}
                        disabled={isToggling}
                        className="flex items-center justify-center rounded-md border-2 transition-all"
                        style={{
                          width: '24px',
                          height: '24px',
                          borderColor: isPartial ? 'var(--warning, #F59E0B)' : 'var(--border)',
                          background: isPartial ? 'var(--warning, #F59E0B)' : 'transparent',
                          borderStyle: isPartial ? 'solid' : 'dashed',
                        }}
                        title="Μερική επίσκεψη — χρειάζεται επανέλεγχος"
                      >
                        {isPartial && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3">
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        )}
                      </button>
                    </div>

                    {/* Client info */}
                    <Link href={`/clients/${client.id}`} className="flex-1 min-w-0">
                      <p
                        className="text-sm font-semibold truncate"
                        style={{
                          textDecoration: isCompleted ? 'line-through' : 'none',
                          color: isCompleted ? 'var(--text-muted)' : 'var(--text-primary)',
                        }}
                      >
                        {client.name}
                      </p>
                      <p className="text-xs truncate" style={{ color: 'var(--text-muted)' }}>
                        {client.address || client.city}
                      </p>
                      {/* Show visit date + status */}
                      {isCompleted && (
                        <p className="text-[11px] font-bold mt-0.5" style={{ color: routeColor }}>
                          {formatVisitDate(visit.date)}
                        </p>
                      )}
                      {isPartial && (
                        <div className="flex items-center gap-1.5 mt-1">
                          <span
                            className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded"
                            style={{ background: 'var(--warning, #F59E0B)', color: '#fff', fontFamily: 'Sora, sans-serif' }}
                          >
                            ΕΚΚΡΕΜΕΙ
                          </span>
                          <span className="text-[11px] font-bold" style={{ color: 'var(--warning, #F59E0B)' }}>
                            {formatVisitDate(visit.date)}
                          </span>
                        </div>
                      )}
                      {/* Show last visit from previous cycle if not visited this week */}
                      {!hasVisit && lastVisitMap[client.id] && (
                        <p className="text-[11px] mt-0.5" style={{ color: 'var(--text-muted)' }}>
                          Τελ. επίσκεψη: {formatShortDate(lastVisitMap[client.id])}
                        </p>
                      )}
                      {client.notes && !isCompleted && (
                        <p
                          className="text-[11px] font-semibold mt-1 truncate"
                          style={{ color: 'var(--warning)' }}
                        >
                          📝 {client.notes}
                        </p>
                      )}
                    </Link>

                    {/* Quick call */}
                    <div className="flex gap-1.5 flex-shrink-0">
                      {client.phone && (
                        <a
                          href={`tel:${client.phone.replace(/\s/g, '')}`}
                          className="flex items-center justify-center w-9 h-9 rounded-lg active:scale-90 transition-transform"
                          style={{ background: 'var(--bg-secondary)' }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2.5">
                            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
                          </svg>
                        </a>
                      )}
                      {client.mobile && (
                        <a
                          href={`tel:${client.mobile.replace(/[\s\/;].*/g, '').replace(/\s/g, '')}`}
                          className="flex items-center justify-center w-9 h-9 rounded-lg active:scale-90 transition-transform"
                          style={{ background: `${routeColor}12` }}
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={routeColor} strokeWidth="2.5">
                            <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                            <line x1="12" y1="18" x2="12.01" y2="18" />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Date picker - slides down below the card */}
                  {showPicker && (
                    <div ref={pickerRef} className="card p-3 mt-1 animate-fade-up" style={{ border: `1px solid ${pickerFor.status === 'partial' ? 'var(--warning, #F59E0B)' : routeColor}40` }}>
                      <p className="text-[11px] font-bold uppercase tracking-widest mb-2 text-center" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
                        {pickerFor.status === 'partial' ? 'Μερική επίσκεψη — ημερομηνία' : 'Ημερομηνία επίσκεψης'}
                      </p>
                      <div className="grid grid-cols-7 gap-1.5">
                        {weekDays.map((dayDate, i) => {
                          const d = new Date(dayDate + 'T00:00:00');
                          const isToday = dayDate === today;
                          const pickerColor = pickerFor.status === 'partial' ? 'var(--warning, #F59E0B)' : routeColor;
                          return (
                            <button
                              key={dayDate}
                              type="button"
                              onClick={() => handleAdd(client.id, dayDate, pickerFor.status)}
                              className="flex flex-col items-center py-2 px-1 rounded-xl transition-all active:scale-90"
                              style={{
                                background: isToday ? `${pickerColor}15` : 'var(--bg-secondary)',
                                border: isToday ? `2px solid ${pickerColor}` : '2px solid transparent',
                              }}
                            >
                              <span className="text-[10px] font-bold uppercase" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
                                {DAYS_SHORT[i]}
                              </span>
                              <span className="text-sm font-bold mt-0.5" style={{ color: isToday ? pickerColor : 'var(--text-primary)' }}>
                                {d.getDate()}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
