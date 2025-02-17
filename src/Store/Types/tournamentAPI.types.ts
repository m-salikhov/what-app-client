import { TournamentShortType } from 'Shared/Types/tournament';

export interface TournamentsLastShort {
  tournaments: TournamentShortType[];
  count: number;
  pageCount: number;
  hasMorePage: boolean;
}
