export const MONTHS = [
  'Ιανουάριος', 'Φεβρουάριος', 'Μάρτιος', 'Απρίλιος',
  'Μάιος', 'Ιούνιος', 'Ιούλιος', 'Αύγουστος',
  'Σεπτέμβριος', 'Οκτώβριος', 'Νοέμβριος', 'Δεκέμβριος'
];

export const MONTHS_SHORT = [
  'Ιαν', 'Φεβ', 'Μαρ', 'Απρ', 'Μαΐ', 'Ιουν',
  'Ιουλ', 'Αυγ', 'Σεπ', 'Οκτ', 'Νοε', 'Δεκ'
];

export const DAYS = ['Δευτέρα', 'Τρίτη', 'Τετάρτη', 'Πέμπτη', 'Παρασκευή', 'Σάββατο', 'Κυριακή'];
export const DAYS_SHORT = ['Δε', 'Τρ', 'Τε', 'Πε', 'Πα', 'Σα', 'Κυ'];

export function formatDateGreek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return `${d.getDate()} ${MONTHS_SHORT[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatDayMonth(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const dayOfWeek = d.getDay();
  const greekDay = dayOfWeek === 0 ? DAYS[6] : DAYS[dayOfWeek - 1];
  return `${greekDay}, ${d.getDate()} ${MONTHS[d.getMonth()]}`;
}

export function isWeekend(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  return d.getDay() === 0 || d.getDay() === 6;
}

export function toDateStr(date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function todayStr() {
  return toDateStr(new Date());
}

// Get Monday of the week containing the given date
export function getMondayOfWeek(dateStr) {
  const d = new Date(dateStr + 'T00:00:00');
  const day = d.getDay();
  const diff = day === 0 ? 6 : day - 1; // Sunday=6 offset, Mon=0, Tue=1...
  d.setDate(d.getDate() - diff);
  return toDateStr(d);
}

// Get Sunday of the week
export function getSundayOfWeek(dateStr) {
  const monday = getMondayOfWeek(dateStr);
  const d = new Date(monday + 'T00:00:00');
  d.setDate(d.getDate() + 6);
  return toDateStr(d);
}

// Format week range: "2 - 8 Μαρ 2026" (Monday to Sunday)
export function formatWeekRange(mondayStr) {
  const mon = new Date(mondayStr + 'T00:00:00');
  const sun = new Date(mondayStr + 'T00:00:00');
  sun.setDate(sun.getDate() + 6);

  if (mon.getMonth() === sun.getMonth()) {
    return `${mon.getDate()} - ${sun.getDate()} ${MONTHS_SHORT[mon.getMonth()]} ${mon.getFullYear()}`;
  }
  return `${mon.getDate()} ${MONTHS_SHORT[mon.getMonth()]} - ${sun.getDate()} ${MONTHS_SHORT[sun.getMonth()]} ${mon.getFullYear()}`;
}
