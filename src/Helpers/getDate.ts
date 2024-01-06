export function getDate(date: Date | string | number) {
  if (typeof date !== 'object') {
    date = new Date(+date);
  }
  return date.toLocaleDateString();
}

export function getDateYYYY_MM_DD(value: number) {
  let date = new Date(value);
  let year = date.getFullYear();
  let month = ('0' + (date.getMonth() + 1)).slice(-2);
  let day = ('0' + date.getDate()).slice(-2);

  return `${year}-${month}-${day}`;
}
