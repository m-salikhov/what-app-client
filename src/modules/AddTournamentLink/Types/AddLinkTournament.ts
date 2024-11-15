export interface AddLinkQuestion {
  id: number;
  type: 'regular' | 'double' | 'triple' | 'other' | 'outside';
  qNumber: number;
  tourNumber: number;
  add?: string;
  text: string;
  answer: string;
  alterAnswer?: string;
  comment?: string;
  source: string[];
  author: string;
}

export interface AddLinkTournament {
  id: number;
  title: string;
  date: number;
  tours: number;
  questionsQuantity: number;
  questions: AddLinkQuestion[];
  editors: string[];
  uploader: string;
  dateUpload: number;
  uploaderUuid: string;
  link: string;
}
