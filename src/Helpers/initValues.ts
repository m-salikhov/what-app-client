import { QuestionType } from "../Types/question";
import { TournamentShortType, TournamentType } from "../Types/tournament";
import { UserType } from "../Types/user";

export const initTournamentShort: TournamentShortType = {
  id: 0,
  title: "",
  date: 0,
  tours: 0,
  questionsQuantity: 0,
  uploader: "",
  editors: [],
  dateUpload: 0,
  uploaderUuid: "",
};

export const initTournament: TournamentType = {
  ...initTournamentShort,
  questions: [],
};

export const initUser: UserType = {
  email: "",
  username: "",
  role: "user",
  password: "",
  date: 0,
};

export const initQuestion: QuestionType = {
  type: "regular",
  qNumber: 0,
  tourNumber: 0,
  text: "",
  answer: "",
  source: [],
  author: "",
};
