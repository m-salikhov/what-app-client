export interface UserType {
  id: string;
  email: string;
  username: string;
  role: 'user' | 'superuser' | 'admin' | '';
  password?: string;
  date: number;
}

export interface UserAuth {
  email: string;
  password: string;
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

export interface FormUser {
  email: string;
  username: string;
  role: string;
  password: string;
  passRepeat: string;
}

export interface Result {
  id: string;
  userId: string;
  date: string;
  tournamentId: number;
  title: string;
  tournamentLength: number;
  resultNumber: number;
}
