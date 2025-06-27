export function linkBuilder(id: number, title: string, pathname: string) {
  if (pathname.includes('all')) return `/tournament/${id}`;
  if (pathname.includes('playmode')) return `/playmode/${id}/${title}`;
  return '';
}
