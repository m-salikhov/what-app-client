import { useInitialLoginQuery } from '../../Store/ToolkitAPIs/userAPI';

export function useInitialLogin() {
  const flag = localStorage.getItem('rememberMe');

  useInitialLoginQuery(undefined, { skip: Boolean(!flag) });
}
