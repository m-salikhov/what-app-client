import { TournamentShortType } from '../../Common/Types/tournament';

export interface TournamentsLastShort {
  tournaments: TournamentShortType[];
  count: number;
  pageCount: number;
  hasMorePage: boolean;
}
