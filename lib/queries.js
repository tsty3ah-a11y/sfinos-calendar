import { supabase } from './supabase';
import { getMondayOfWeek, toDateStr } from './greek';

// ── Routes ──────────────────────────────────────────
export async function getRoutes() {
  const { data, error } = await supabase
    .from('routes')
    .select('*')
    .order('display_order');
  if (error) throw error;
  return data;
}

// ── Clients ─────────────────────────────────────────
export async function getClients({ routeId, city, search } = {}) {
  let query = supabase
    .from('clients')
    .select('*, routes(name, color)')
    .eq('is_active', true)
    .order('city')
    .order('name');

  if (routeId) query = query.eq('route_id', routeId);
  if (city) query = query.eq('city', city);
  if (search) query = query.ilike('name', `%${search}%`);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getClient(id) {
  const { data, error } = await supabase
    .from('clients')
    .select('*, routes(name, color)')
    .eq('id', id)
    .single();
  if (error) throw error;
  return data;
}

export async function updateClientNotes(clientId, notes) {
  const { data, error } = await supabase
    .from('clients')
    .update({ notes })
    .eq('id', clientId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

export async function updateClientRoute(clientId, routeId) {
  const { data, error } = await supabase
    .from('clients')
    .update({ route_id: routeId })
    .eq('id', clientId)
    .select('*, routes(name, color)')
    .single();
  if (error) throw error;
  return data;
}

export async function createClient({ routeId, name, region, address, city, phone, mobile, notes }) {
  const { data, error } = await supabase
    .from('clients')
    .insert({ route_id: routeId, name, region, address, city, phone, mobile, notes: notes || null })
    .select('*, routes(name, color)')
    .single();
  if (error) throw error;
  return data;
}

export async function updateClientDetails(clientId, { name, region, address, city, phone, mobile }) {
  const { data, error } = await supabase
    .from('clients')
    .update({ name, region, address, city, phone, mobile })
    .eq('id', clientId)
    .select('*, routes(name, color)')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteClient(clientId) {
  const { error } = await supabase
    .from('clients')
    .delete()
    .eq('id', clientId);
  if (error) throw error;
}

export async function getCities(routeId) {
  let query = supabase
    .from('clients')
    .select('city')
    .eq('is_active', true)
    .not('city', 'is', null);

  if (routeId) query = query.eq('route_id', routeId);

  const { data, error } = await query;
  if (error) throw error;
  const unique = [...new Set(data.map(d => d.city))].sort();
  return unique;
}

// ── Schedule ────────────────────────────────────────
export async function getSchedule(year, month) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`;

  const { data, error } = await supabase
    .from('schedule')
    .select('*, routes(name, color)')
    .gte('visit_date', startDate)
    .lt('visit_date', endDate)
    .order('visit_date');
  if (error) throw error;
  return data;
}

export async function getScheduleRange(startDate, endDate) {
  const { data, error } = await supabase
    .from('schedule')
    .select('*, routes(name, color)')
    .gte('visit_date', startDate)
    .lte('visit_date', endDate)
    .order('visit_date');
  if (error) throw error;
  return data;
}

export async function getDaySchedule(date) {
  const { data, error } = await supabase
    .from('schedule')
    .select('*, routes(id, name, color)')
    .eq('visit_date', date)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// Get the schedule entry for the week containing the given date
// Schedule entries are on Mondays, so we find the Monday of the week
export async function getWeekSchedule(dateStr) {
  const monday = getMondayOfWeek(dateStr);

  const { data, error } = await supabase
    .from('schedule')
    .select('*, routes(id, name, color)')
    .eq('visit_date', monday)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// Get clients with notes for a given route
export async function getClientsWithNotes(routeId) {
  const { data, error } = await supabase
    .from('clients')
    .select('id, name, notes, city')
    .eq('route_id', routeId)
    .eq('is_active', true)
    .not('notes', 'is', null)
    .neq('notes', '')
    .order('name');
  if (error) throw error;
  return data;
}

// ── Cycles ──────────────────────────────────────────
export async function getCycles(year) {
  const { data, error } = await supabase
    .from('cycles')
    .select('*')
    .eq('year', year)
    .order('cycle_number');
  if (error) throw error;
  return data;
}

export async function getCurrentCycle() {
  const today = toDateStr(new Date());
  const { data, error } = await supabase
    .from('cycles')
    .select('*')
    .lte('start_date', today)
    .gte('end_date', today)
    .single();
  if (error && error.code !== 'PGRST116') throw error;
  return data;
}

// ── Visits ──────────────────────────────────────────
export async function getVisits({ clientId, startDate, endDate } = {}) {
  let query = supabase
    .from('visits')
    .select('*, clients(name, city, route_id, routes(name, color))')
    .order('visit_date', { ascending: false });

  if (clientId) query = query.eq('client_id', clientId);
  if (startDate) query = query.gte('visit_date', startDate);
  if (endDate) query = query.lte('visit_date', endDate);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getVisitsForDate(date) {
  const { data, error } = await supabase
    .from('visits')
    .select('*, clients(name, city)')
    .eq('visit_date', date)
    .order('created_at');
  if (error) throw error;
  return data;
}

// Get all visits for a week (Monday to Sunday)
export async function getVisitsForWeek(monday) {
  const sun = new Date(monday + 'T00:00:00');
  sun.setDate(sun.getDate() + 6);
  const sundayStr = toDateStr(sun);

  const { data, error } = await supabase
    .from('visits')
    .select('*, clients(name, city)')
    .gte('visit_date', monday)
    .lte('visit_date', sundayStr)
    .order('created_at');
  if (error) throw error;
  return data;
}

// Add a visit on a specific date
export async function addVisit(clientId, date) {
  const { data, error } = await supabase
    .from('visits')
    .insert({ client_id: clientId, visit_date: date, status: 'completed' })
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Remove a visit by client + date
export async function removeVisit(clientId, date) {
  const { error } = await supabase
    .from('visits')
    .delete()
    .eq('client_id', clientId)
    .eq('visit_date', date);
  if (error) throw error;
}

export async function toggleVisit(clientId, date) {
  // Check if visit exists
  const { data: existing } = await supabase
    .from('visits')
    .select('id')
    .eq('client_id', clientId)
    .eq('visit_date', date)
    .single();

  if (existing) {
    const { error } = await supabase
      .from('visits')
      .delete()
      .eq('id', existing.id);
    if (error) throw error;
    return null;
  } else {
    const { data, error } = await supabase
      .from('visits')
      .insert({ client_id: clientId, visit_date: date, status: 'completed' })
      .select()
      .single();
    if (error) throw error;
    return data;
  }
}

export async function updateVisitStatus(visitId, status) {
  const { data, error } = await supabase
    .from('visits')
    .update({ status })
    .eq('id', visitId)
    .select()
    .single();
  if (error) throw error;
  return data;
}

// Get the most recent visit for each client in a route (excluding a specific week)
export async function getLastVisitsForClients(clientIds, excludeMonday) {
  if (!clientIds || clientIds.length === 0) return [];

  // Calculate the week range to exclude
  const sun = new Date(excludeMonday + 'T00:00:00');
  sun.setDate(sun.getDate() + 6);
  const excludeSunday = toDateStr(sun);

  // Get all visits for these clients, ordered by date desc
  const { data, error } = await supabase
    .from('visits')
    .select('client_id, visit_date')
    .in('client_id', clientIds)
    .eq('status', 'completed')
    .order('visit_date', { ascending: false });
  if (error) throw error;

  // Filter out visits in the excluded week, and pick the most recent per client
  const lastVisitMap = {};
  for (const v of (data || [])) {
    if (v.visit_date >= excludeMonday && v.visit_date <= excludeSunday) continue;
    if (!lastVisitMap[v.client_id]) {
      lastVisitMap[v.client_id] = v.visit_date;
    }
  }
  return lastVisitMap;
}

// Get previous cycle summary for a route (visits from last scheduled occurrence)
export async function getPreviousCycleVisits(routeId, currentMonday) {
  // Find the previous schedule entry for this route (before current monday)
  const { data: prevSchedules, error: schedErr } = await supabase
    .from('schedule')
    .select('visit_date')
    .eq('route_id', routeId)
    .lt('visit_date', currentMonday)
    .order('visit_date', { ascending: false })
    .limit(1);
  if (schedErr) throw schedErr;
  if (!prevSchedules || prevSchedules.length === 0) return null;

  const prevMonday = prevSchedules[0].visit_date;
  const prevSun = new Date(prevMonday + 'T00:00:00');
  prevSun.setDate(prevSun.getDate() + 6);
  const prevSundayStr = toDateStr(prevSun);

  // Get clients in this route
  const { data: clients, error: clErr } = await supabase
    .from('clients')
    .select('id')
    .eq('route_id', routeId)
    .eq('is_active', true);
  if (clErr) throw clErr;
  const clientIds = clients.map(c => c.id);
  if (clientIds.length === 0) return null;

  // Count visits in the previous week
  const { data: visits, error: visErr } = await supabase
    .from('visits')
    .select('client_id')
    .in('client_id', clientIds)
    .gte('visit_date', prevMonday)
    .lte('visit_date', prevSundayStr)
    .eq('status', 'completed');
  if (visErr) throw visErr;

  const uniqueVisited = new Set((visits || []).map(v => v.client_id));

  return {
    monday: prevMonday,
    visitedCount: uniqueVisited.size,
    totalClients: clientIds.length,
  };
}

// ── Stats ───────────────────────────────────────────
export async function getCycleProgress(cycleId) {
  const { data: cycle } = await supabase
    .from('cycles')
    .select('*')
    .eq('id', cycleId)
    .single();

  if (!cycle) return [];

  const { data: routes } = await supabase.from('routes').select('*').order('display_order');
  const results = [];

  for (const route of routes) {
    const { count: totalClients } = await supabase
      .from('clients')
      .select('*', { count: 'exact', head: true })
      .eq('route_id', route.id)
      .eq('is_active', true);

    const { data: visitedClients } = await supabase
      .from('visits')
      .select('client_id')
      .gte('visit_date', cycle.start_date)
      .lte('visit_date', cycle.end_date)
      .eq('status', 'completed')
      .in('client_id',
        (await supabase.from('clients').select('id').eq('route_id', route.id).eq('is_active', true))
          .data?.map(c => c.id) || []
      );

    const uniqueVisited = new Set(visitedClients?.map(v => v.client_id) || []);

    results.push({
      route,
      totalClients: totalClients || 0,
      visitedClients: uniqueVisited.size,
      progress: totalClients ? Math.round((uniqueVisited.size / totalClients) * 100) : 0,
    });
  }

  return results;
}

export async function getDashboardStats() {
  const today = toDateStr(new Date());
  const year = new Date().getFullYear();

  const { count: totalClients } = await supabase
    .from('clients')
    .select('*', { count: 'exact', head: true })
    .eq('is_active', true);

  const { count: visitsThisYear } = await supabase
    .from('visits')
    .select('*', { count: 'exact', head: true })
    .gte('visit_date', `${year}-01-01`)
    .eq('status', 'completed');

  const { count: visitsThisMonth } = await supabase
    .from('visits')
    .select('*', { count: 'exact', head: true })
    .gte('visit_date', `${year}-${String(new Date().getMonth() + 1).padStart(2, '0')}-01`)
    .eq('status', 'completed');

  return {
    totalClients: totalClients || 0,
    visitsThisYear: visitsThisYear || 0,
    visitsThisMonth: visitsThisMonth || 0,
  };
}

// ── Appointments ─────────────────────────────────────
export async function getAppointments({ startDate, endDate, clientId } = {}) {
  let query = supabase
    .from('appointments')
    .select('*, clients(id, name, city, route_id, routes(name, color))')
    .order('appointment_date')
    .order('appointment_time');

  if (startDate) query = query.gte('appointment_date', startDate);
  if (endDate) query = query.lte('appointment_date', endDate);
  if (clientId) query = query.eq('client_id', clientId);

  const { data, error } = await query;
  if (error) throw error;
  return data;
}

export async function getAppointmentsForWeek(monday) {
  const sun = new Date(monday + 'T00:00:00');
  sun.setDate(sun.getDate() + 6);
  const sundayStr = toDateStr(sun);

  const { data, error } = await supabase
    .from('appointments')
    .select('*, clients(id, name, city, route_id, routes(name, color))')
    .gte('appointment_date', monday)
    .lte('appointment_date', sundayStr)
    .order('appointment_date')
    .order('appointment_time');
  if (error) throw error;
  return data;
}

export async function getAppointmentsForMonth(year, month) {
  const startDate = `${year}-${String(month).padStart(2, '0')}-01`;
  const endDate = month === 12
    ? `${year + 1}-01-01`
    : `${year}-${String(month + 1).padStart(2, '0')}-01`;

  const { data, error } = await supabase
    .from('appointments')
    .select('*, clients(id, name, city, route_id, routes(name, color))')
    .gte('appointment_date', startDate)
    .lt('appointment_date', endDate)
    .order('appointment_date')
    .order('appointment_time');
  if (error) throw error;
  return data;
}

export async function createAppointment({ clientId, title, date, time, durationMinutes, reminderMinutes, notes }) {
  const { data, error } = await supabase
    .from('appointments')
    .insert({
      client_id: clientId || null,
      title,
      appointment_date: date,
      appointment_time: time || null,
      duration_minutes: durationMinutes || 30,
      reminder_minutes: reminderMinutes ?? 30,
      notes: notes || null,
    })
    .select('*, clients(id, name, city, route_id, routes(name, color))')
    .single();
  if (error) throw error;
  return data;
}

export async function updateAppointment(id, { clientId, title, date, time, durationMinutes, reminderMinutes, notes }) {
  const { data, error } = await supabase
    .from('appointments')
    .update({
      client_id: clientId || null,
      title,
      appointment_date: date,
      appointment_time: time || null,
      duration_minutes: durationMinutes || 30,
      reminder_minutes: reminderMinutes ?? 30,
      notes: notes || null,
    })
    .eq('id', id)
    .select('*, clients(id, name, city, route_id, routes(name, color))')
    .single();
  if (error) throw error;
  return data;
}

export async function deleteAppointment(id) {
  const { error } = await supabase
    .from('appointments')
    .delete()
    .eq('id', id);
  if (error) throw error;
}

// Get ALL appointments (for ICS feed)
export async function getAllAppointments() {
  const { data, error } = await supabase
    .from('appointments')
    .select('*, clients(name, city)')
    .order('appointment_date')
    .order('appointment_time');
  if (error) throw error;
  return data;
}
