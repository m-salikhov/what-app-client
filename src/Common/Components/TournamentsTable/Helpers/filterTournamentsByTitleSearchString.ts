import { TournamentShortType } from 'Common/Types/tournament';

export function filterTournamentsByTitleSearchString(tournaments: TournamentShortType[], searchString: string) {
  if (searchString.length > 1) {
    return tournaments.filter((t) => t.title.toLowerCase().includes(searchString.toLowerCase()));
  } else return tournaments;
}
