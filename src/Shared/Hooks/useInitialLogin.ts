import { useGetCurrentUserQuery } from 'Store/ToolkitAPIs/userAPI';

export function useInitialLogin() {
  const { data: currentUser, ...rest } = useGetCurrentUserQuery(undefined);

  if (rest.isError) localStorage.removeItem('rememberMe');

  return { currentUser, ...rest };
}
