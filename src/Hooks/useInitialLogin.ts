import { useInitialLoginQuery } from '../Store/userAPI';

export function useInitialLogin() {
  const flag = localStorage.getItem('rememberMe');

  const { data: currentUser } = useInitialLoginQuery(undefined, { skip: Boolean(!flag) });

  return currentUser;
}
