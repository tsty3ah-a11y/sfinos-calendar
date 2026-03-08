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
