import { useGetUserLogfirstQuery } from '../Store/userAPI';

export function useInitLogin() {
  const flag = localStorage.getItem('rememberMe');

  const { data: currentUser } = useGetUserLogfirstQuery(undefined, { skip: Boolean(!flag) });

  return currentUser;
}
