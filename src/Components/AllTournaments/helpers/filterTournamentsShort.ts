import { TournamentShortType } from "../../../Types/tournament";

function filterTournamentsShort(tournaments: TournamentShortType[], searchString: string) {
  if (searchString.length > 1) {
    return tournaments.filter((t) => t.title.toLowerCase().includes(searchString.toLowerCase()));
  } else return tournaments;
}

export default filterTournamentsShort;
