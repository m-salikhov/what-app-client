import { userAPI } from 'Store/ToolkitAPIs/userAPI';
import { useAppDispatch } from './redux';

export function useLogout() {
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('rememberMe');

    dispatch(userAPI.endpoints.logout.initiate(undefined));
    dispatch(userAPI.util.resetApiState());
    dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, undefined));
  };

  return logout;
}
