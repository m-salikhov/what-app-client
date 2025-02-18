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
