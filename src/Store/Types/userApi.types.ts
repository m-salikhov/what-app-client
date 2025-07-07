export interface UserLogin {
  email: string;
  password: string;
}

export interface UserReg {
  email: string;
  username: string;
  role: 'user' | 'superuser' | 'admin' | '';
  password: string;
}
