export interface UserType {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'superuser' | 'admin' | '';
  password?: string;
  date: number;
}

export type getUserType =
  | {
      id: string;
      email?: never;
      username?: never;
    }
  | {
      id?: never;
      email: string;
      username?: never;
    }
  | {
      id?: never;
      email?: never;
      username: string;
    };

export interface Result {
  id: string;
  userId: string;
  date: string;
  tournamentId: number;
  title: string;
  tournamentLength: number;
  resultNumber: number;
}
