export function formatDateRange(start: string, end?: string): string {
  const startDate = new Date(start);
  const endDate = end ? new Date(end) : undefined;
  const dateFormat = new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric", year: "numeric" });
  const timeFormat = new Intl.DateTimeFormat("en-US", { hour: "numeric", minute: "2-digit" });
  if (!endDate) return `${dateFormat.format(startDate)}, ${timeFormat.format(startDate)}`;
  if (startDate.toDateString() === endDate.toDateString()) {
    return `${dateFormat.format(startDate)}, ${timeFormat.format(startDate)}–${timeFormat.format(endDate)}`;
  }
  return `${dateFormat.format(startDate)}–${dateFormat.format(endDate)}`;
}
