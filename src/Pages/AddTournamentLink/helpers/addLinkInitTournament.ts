import { TournamentType } from 'Shared/Schemas/TournamentSchema';

export const addLinkInitTournament: TournamentType = {
  id: 0,
  uploaderUuid: '',
  uploader: '',
  title: '',
  link: '',
  date: 0,
  tours: 0,
  questionsQuantity: 0,
  difficulty: 0,
  status: 'draft',
  dateUpload: 0,
  editors: [],
  questions: [],
};
