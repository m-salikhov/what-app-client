import { QuestionType } from "./question";

export interface TournamentType {
  id?: number;
  title: string;
  date: number;
  tours: number;
  questionsQuantity: number;
  questions: QuestionType[];
  editors: string[];
  uploader: string;
  dateUpload: number;
  uploaderUuid: string;
}

export type TournamentShortType = Omit<TournamentType, "questions">;
