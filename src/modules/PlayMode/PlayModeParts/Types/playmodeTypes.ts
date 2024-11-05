import { TournamentType } from '../../../../Common/Types/tournament';

export interface StepProps {
  tournament: TournamentType;
}

export enum StepPM {
  START = 'START',
  QUESTION = 'QUESTION',
  END_OF_TOUR = 'END_OF_TOUR',
  END = 'END',
}
