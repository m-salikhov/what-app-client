import { useGetCurrentUserQuery } from 'Store/ToolkitAPIs/userAPI';

export function useInitialLogin() {
  const flag = localStorage.getItem('rememberMe');

  const {
    isError,
    data: currentUser,
    isLoading,
    error,
    refetch,
    isFetching,
    isSuccess,
  } = useGetCurrentUserQuery(undefined, { skip: Boolean(!flag) });

  if (isError) localStorage.removeItem('rememberMe');

  return { currentUser, isLoading, error, refetch, isFetching, isSuccess };
}
