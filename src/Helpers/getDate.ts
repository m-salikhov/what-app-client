export function getDate(date: Date | string | number) {
  if (typeof date !== "object") {
    date = new Date(+date);
  }
  return date.toLocaleDateString();
}
