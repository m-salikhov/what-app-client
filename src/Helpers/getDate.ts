export function getDate(date: Date | string | number) {
  if (typeof date !== 'object') {
    date = new Date(+date);
  }
  return date.toLocaleDateString();
}

export function getDateYYYY_MM_DD(value: number) {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = ('0' + (date.getMonth() + 1)).slice(-2);
  const day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
