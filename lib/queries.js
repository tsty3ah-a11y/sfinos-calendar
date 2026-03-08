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
