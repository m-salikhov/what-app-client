import { TournamentShortType } from 'Shared/Schemas/TournamentSchema';

export interface TournamentsLastShort {
  tournaments: TournamentShortType[];
  count: number;
  pageCount: number;
  hasMorePage: boolean;
}
