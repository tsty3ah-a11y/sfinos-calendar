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
  return date.toISOString().split('T')[0];
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

// Get Friday of the week
export function getFridayOfWeek(dateStr) {
  const monday = getMondayOfWeek(dateStr);
  const d = new Date(monday + 'T00:00:00');
  d.setDate(d.getDate() + 4);
  return toDateStr(d);
}

// Format week range: "2 - 6 Μαρ 2026"
export function formatWeekRange(mondayStr) {
  const mon = new Date(mondayStr + 'T00:00:00');
  const fri = new Date(mondayStr + 'T00:00:00');
  fri.setDate(fri.getDate() + 4);

  if (mon.getMonth() === fri.getMonth()) {
    return `${mon.getDate()} - ${fri.getDate()} ${MONTHS_SHORT[mon.getMonth()]} ${mon.getFullYear()}`;
  }
  return `${mon.getDate()} ${MONTHS_SHORT[mon.getMonth()]} - ${fri.getDate()} ${MONTHS_SHORT[fri.getMonth()]} ${mon.getFullYear()}`;
}
