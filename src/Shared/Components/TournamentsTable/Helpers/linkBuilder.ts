export function linkBuilder(id: number, title: string, pathname: string) {
  if (pathname.includes('all')) {
    return `/tournament/${id}`;
  }
  return pathname.includes('playmode') ? `/playmode/${id}/${title}` : '';
}
