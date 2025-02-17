import { TournamentShortType } from './tournament';

interface SourceType {
  id: number;
  link: string;
}

export interface QuestionType {
  id: number;
  type: 'regular' | 'double' | 'triple' | 'other' | 'outside';
  qNumber: number;
  tourNumber: number;
  add?: string;
  text: string;
  answer: string;
  alterAnswer?: string;
  comment?: string;
  source: SourceType[];
  author: string;
  tournament?: TournamentShortType;
}
