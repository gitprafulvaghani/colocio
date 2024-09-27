export function isEmpty(obj: Record<string, unknown>): boolean {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}

export function calculateDaysDifference(
  date1: Date,
  date2: Date
): number {
  const diffInMilliseconds = Math.abs(date2.getTime() - date1.getTime());
  const diffInDays = Math.floor(
    diffInMilliseconds / (1000 * 60 * 60 * 24)
  );
  return diffInDays;
}
