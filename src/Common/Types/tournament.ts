import { QuestionType } from './question';

interface EditorType {
  name: string;
  id: number;
}

export interface TournamentType {
  id: number;
  title: string;
  date: number;
  tours: number;
  questionsQuantity: number;
  questions: QuestionType[];
  editors: EditorType[];
  uploader: string;
  dateUpload: number;
  uploaderUuid: string;
  link: string;
}

export type TournamentShortType = Omit<TournamentType, 'questions'>;
