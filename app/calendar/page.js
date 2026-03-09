'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import MonthGrid from '@/components/calendar/MonthGrid';
import AppointmentForm from '@/components/calendar/AppointmentForm';
import { getAppointments, createAppointment, updateAppointment, deleteAppointment } from '@/lib/queries';
import { formatDayMonth, todayStr, getMondayOfWeek } from '@/lib/greek';
import { useDaySchedule } from '@/hooks/useSchedule';

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState(todayStr());
  const [dayAppts, setDayAppts] = useState([]);
  const [loadingAppts, setLoadingAppts] = useState(false);
  const [showAdd, setShowAdd] = useState(false);
  const [editingAppt, setEditingAppt] = useState(null);
  const [saving, setSaving] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);
  const { daySchedule } = useDaySchedule(selectedDate);

  // Fetch appointments for selected day
  useEffect(() => {
    if (!selectedDate) return;
    setLoadingAppts(true);
    getAppointments({ startDate: selectedDate, endDate: selectedDate })
      .then(setDayAppts)
      .catch(console.error)
      .finally(() => setLoadingAppts(false));
  }, [selectedDate, refreshKey]);

  function handleDaySelect(date) {
    setSelectedDate(date);
    setShowAdd(false);
    setEditingAppt(null);
  }

  async function handleCreate(form) {
    setSaving(true);
    try {
      await createAppointment({
        clientId: form.clientId || null,
        title: form.title.trim(),
        date: form.date,
        time: form.time || null,
        durationMinutes: form.durationMinutes,
        notes: form.notes.trim() || null,
      });
      setShowAdd(false);
      setRefreshKey(k => k + 1);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  }

  async function handleUpdate(form) {
    setSaving(true);
    try {
      await updateAppointment(editingAppt.id, {
        clientId: form.clientId || null,
        title: form.title.trim(),
        date: form.date,
        time: form.time || null,
        durationMinutes: form.durationMinutes,
        notes: form.notes.trim() || null,
      });
      setEditingAppt(null);
      setRefreshKey(k => k + 1);
    } catch (e) {
      console.error(e);
    }
    setSaving(false);
  }

  async function handleDelete(id) {
    try {
      await deleteAppointment(id);
      setRefreshKey(k => k + 1);
    } catch (e) {
      console.error(e);
    }
  }

  function formatTime(timeStr) {
    if (!timeStr) return '';
    return timeStr.slice(0, 5);
  }

  return (
    <div className="px-4 py-6 md:px-8 md:py-8 max-w-2xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold tracking-tight" style={{ fontFamily: 'Sora, sans-serif' }}>
        Ημερολόγιο
      </h1>

      <div className="card p-5">
        <MonthGrid onDaySelect={handleDaySelect} selectedDate={selectedDate} />
      </div>

      {/* Selected day detail */}
      {selectedDate && (
        <div className="space-y-3 animate-fade-up">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)', fontFamily: 'Sora, sans-serif' }}>
              {formatDayMonth(selectedDate)}
            </h2>
            {!showAdd && !editingAppt && (
              <button
                onClick={() => setShowAdd(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold active:scale-95 transition-all"
                style={{ background: 'var(--accent)', color: '#fff' }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" />
                </svg>
                Ραντεβού
              </button>
            )}
          </div>

          {/* Route for this day (if scheduled) */}
          {daySchedule?.routes && (
            <Link
              href={`/week/${getMondayOfWeek(selectedDate)}`}
              className="card p-3.5 relative pl-6 flex items-center gap-3"
            >
              <div className="route-strip" style={{ background: daySchedule.routes.color }} />
              <div className="w-3 h-3 rounded-full" style={{ background: daySchedule.routes.color }} />
              <span className="text-sm font-bold" style={{ color: daySchedule.routes.color }}>
                {daySchedule.routes.name}
              </span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--text-muted)" strokeWidth="2" className="ml-auto">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </Link>
          )}

          {/* Add form */}
          {showAdd && (
            <div className="card p-5 animate-fade-up">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
                Νέο Ραντεβού
              </h3>
              <AppointmentForm
                initialDate={selectedDate}
                onSave={handleCreate}
                onCancel={() => setShowAdd(false)}
                saving={saving}
              />
            </div>
          )}

          {/* Edit form */}
          {editingAppt && (
            <div className="card p-5 animate-fade-up">
              <h3 className="text-sm font-bold uppercase tracking-widest mb-4" style={{ color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
                Επεξεργασία Ραντεβού
              </h3>
              <AppointmentForm
                initialData={editingAppt}
                onSave={handleUpdate}
                onCancel={() => setEditingAppt(null)}
                saving={saving}
              />
            </div>
          )}

          {/* Appointments list */}
          {loadingAppts ? (
            <div className="space-y-2">
              {[1, 2].map(i => <div key={i} className="skeleton h-16 rounded-xl" />)}
            </div>
          ) : dayAppts.length > 0 ? (
            <div className="space-y-2">
              {dayAppts.map(appt => (
                <div key={appt.id} className="card relative p-4 pl-6 overflow-hidden">
                  <div className="route-strip" style={{ background: appt.clients?.routes?.color || 'var(--warning)' }} />
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        {appt.appointment_time && (
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md" style={{ background: 'var(--bg-secondary)', color: 'var(--accent)', fontFamily: 'Sora, sans-serif' }}>
                            {formatTime(appt.appointment_time)}
                          </span>
                        )}
                        <h4 className="text-sm font-bold truncate">{appt.title}</h4>
                      </div>
                      {appt.clients && (
                        <Link href={`/clients/${appt.clients.id}`} className="text-xs font-medium mt-1 inline-block" style={{ color: appt.clients.routes?.color || 'var(--accent)' }}>
                          {appt.clients.name} {appt.clients.city && `· ${appt.clients.city}`}
                        </Link>
                      )}
                      {appt.notes && (
                        <p className="text-xs mt-1 truncate" style={{ color: 'var(--text-muted)' }}>{appt.notes}</p>
                      )}
                      {appt.duration_minutes && (
                        <p className="text-[10px] mt-1" style={{ color: 'var(--text-muted)' }}>{appt.duration_minutes} λεπτά</p>
                      )}
                    </div>
                    <div className="flex gap-1.5 flex-shrink-0">
                      <button
                        onClick={() => { setEditingAppt(appt); setShowAdd(false); }}
                        className="w-8 h-8 rounded-lg flex items-center justify-center active:scale-90 transition-all"
                        style={{ background: 'var(--bg-secondary)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--accent)" strokeWidth="2">
                          <path d="M12 20h9" /><path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => handleDelete(appt.id)}
                        className="w-8 h-8 rounded-lg flex items-center justify-center active:scale-90 transition-all"
                        style={{ background: 'rgba(231,76,60,0.08)' }}
                      >
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--danger)" strokeWidth="2">
                          <polyline points="3 6 5 6 21 6" /><path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : !showAdd && !editingAppt ? (
            <div className="card p-6 text-center">
              <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
                Κανένα ραντεβού
              </p>
            </div>
          ) : null}
        </div>
      )}
    </div>
  );
}
