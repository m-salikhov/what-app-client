import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';

export function linkBuilder(tournament: TournamentShortType, pathname: string) {
  if (pathname.includes('all')) {
    return `/tournament/${tournament.id}`;
  }
  if (pathname.includes('playmode')) {
    return `/playmode/${tournament.id}/${tournament.title}`;
  } else return '';
}
