import { QuestionType } from 'Common/Types/question';
import { TournamentShortType, TournamentType } from 'Common/Types/tournament';
import { UserType } from 'Common/Types/user';

export const initTournamentShort: TournamentShortType = {
  id: 0,
  title: '',
  date: 0,
  tours: 0,
  questionsQuantity: 0,
  uploader: '',
  editors: [],
  dateUpload: 0,
  uploaderUuid: '',
  link: '',
};

export const initTournament: TournamentType = {
  ...initTournamentShort,
  questions: [],
};

export const initUser: UserType = {
  id: '',
  email: '',
  username: '',
  role: '',
  date: 0,
};

export const initFormUser = {
  email: '',
  username: '',
  role: 'user',
  password: '',
  passRepeat: '',
};

export const initQuestion: QuestionType = {
  id: 0,
  type: 'regular',
  qNumber: 0,
  tourNumber: 0,
  text: '',
  answer: '',
  source: [],
  author: '',
};
