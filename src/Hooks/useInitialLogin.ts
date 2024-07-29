import { useInitialLoginQuery } from '../Store/userAPI';

export function useInitialLogin() {
  const flag = localStorage.getItem('rememberMe');

  useInitialLoginQuery(undefined, { skip: Boolean(!flag) });
}
