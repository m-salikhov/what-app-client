import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';

export function filterTournaments(tournaments: TournamentShortType[], searchString: string) {
  return searchString.length > 1 ? tournaments.filter((t) => t.title.toLowerCase().includes(searchString.toLowerCase())) : tournaments;
}
