import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || supabaseUrl.includes('xxxx')) {
    return new Response('Supabase not configured', { status: 500 });
  }

  const supabase = createClient(supabaseUrl, supabaseKey);

  const { data: appointments, error } = await supabase
    .from('appointments')
    .select('*, clients(name, city)')
    .order('appointment_date')
    .order('appointment_time');

  if (error) {
    return new Response('Error fetching appointments', { status: 500 });
  }

  const now = new Date();
  const stamp = now.toISOString().replace(/[-:]/g, '').replace(/\.\d{3}/, '');

  let ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//VetPlan//Appointments//EL',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'X-WR-CALNAME:VetPlan Ραντεβού',
    'X-WR-TIMEZONE:Europe/Athens',
    // Timezone definition
    'BEGIN:VTIMEZONE',
    'TZID:Europe/Athens',
    'BEGIN:STANDARD',
    'DTSTART:19701025T040000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=10',
    'TZOFFSETFROM:+0300',
    'TZOFFSETTO:+0200',
    'TZNAME:EET',
    'END:STANDARD',
    'BEGIN:DAYLIGHT',
    'DTSTART:19700329T030000',
    'RRULE:FREQ=YEARLY;BYDAY=-1SU;BYMONTH=3',
    'TZOFFSETFROM:+0200',
    'TZOFFSETTO:+0300',
    'TZNAME:EEST',
    'END:DAYLIGHT',
    'END:VTIMEZONE',
  ];

  for (const appt of appointments) {
    const dateStr = appt.appointment_date.replace(/-/g, '');

    let dtStart, dtEnd;
    if (appt.appointment_time) {
      const timeStr = appt.appointment_time.replace(/:/g, '').slice(0, 4) + '00';
      dtStart = `DTSTART;TZID=Europe/Athens:${dateStr}T${timeStr}`;

      // Calculate end time
      const [h, m] = appt.appointment_time.split(':').map(Number);
      const dur = appt.duration_minutes || 30;
      const endMinutes = h * 60 + m + dur;
      const eh = String(Math.floor(endMinutes / 60) % 24).padStart(2, '0');
      const em = String(endMinutes % 60).padStart(2, '0');
      dtEnd = `DTEND;TZID=Europe/Athens:${dateStr}T${eh}${em}00`;
    } else {
      // All-day event
      dtStart = `DTSTART;VALUE=DATE:${dateStr}`;
      const nextDay = new Date(appt.appointment_date + 'T00:00:00');
      nextDay.setDate(nextDay.getDate() + 1);
      const nextStr = nextDay.toISOString().split('T')[0].replace(/-/g, '');
      dtEnd = `DTEND;VALUE=DATE:${nextStr}`;
    }

    const summary = escapeIcs(appt.title);
    const location = appt.clients?.city ? escapeIcs(appt.clients.city) : '';
    const description = [
      appt.clients?.name ? `Πελάτης: ${appt.clients.name}` : '',
      appt.clients?.city ? `Πόλη: ${appt.clients.city}` : '',
      appt.notes || '',
    ].filter(Boolean).join('\\n');

    ics.push(
      'BEGIN:VEVENT',
      `UID:${appt.id}@vetplan`,
      `DTSTAMP:${stamp}`,
      dtStart,
      dtEnd,
      `SUMMARY:${summary}`,
    );
    if (location) ics.push(`LOCATION:${location}`);
    if (description) ics.push(`DESCRIPTION:${escapeIcs(description)}`);
    // Reminder
    const reminderMin = appt.reminder_minutes ?? 30;
    if (reminderMin > 0) {
      ics.push(
        'BEGIN:VALARM',
        `TRIGGER:-PT${reminderMin}M`,
        'ACTION:DISPLAY',
        `DESCRIPTION:${summary}`,
        'END:VALARM',
      );
    }
    ics.push('END:VEVENT');
  }

  ics.push('END:VCALENDAR');

  return new Response(ics.join('\r\n'), {
    headers: {
      'Content-Type': 'text/calendar; charset=utf-8',
      'Content-Disposition': 'attachment; filename="vetplan.ics"',
      'Cache-Control': 'no-cache, no-store, must-revalidate',
    },
  });
}

function escapeIcs(str) {
  return str.replace(/\\/g, '\\\\').replace(/;/g, '\\;').replace(/,/g, '\\,').replace(/\n/g, '\\n');
}
