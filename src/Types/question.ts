import { TournamentType } from "./tournament";

export interface QuestionType {
  id?: number;
  type: "regular" | "double" | "triple" | "other" | "outside";
  // номер в турнире
  qNumber: number;
  // номер тура
  tourNumber: number;
  // раздатка
  add?: string;
  text: string;
  answer: string;
  alterAnswer?: string;
  comment?: string;
  source?: string[];
  author: string;
  tournament?: TournamentType;
}
