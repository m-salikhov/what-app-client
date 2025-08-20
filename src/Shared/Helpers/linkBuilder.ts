export function linkBuilder(id: number, pathname: string): string {
  //определяем куда должна вести ссылка. игровой режим или страница турнира
  const to = pathname.includes('playmode') ? 'playmode' : 'tournament';

  if (to === 'tournament') return `/tournament/${id}`;
  if (to === 'playmode') return `/playmode/${id}`;
  return '';
}
