import { useLogoutMutation, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { useAppDispatch } from './redux';

export function useLogout() {
  const dispatch = useAppDispatch();

  const [logoutMutation, { isLoading }] = useLogoutMutation();

  const logout = async () => {
    localStorage.removeItem('rememberMe');

    await logoutMutation(undefined);

    await dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, undefined));
  };

  return logout;
}
