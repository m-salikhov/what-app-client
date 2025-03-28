import { useLazyLogoutQuery, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { useAppDispatch } from './redux';

export function useLogout() {
  const [triggerLogoutQuery] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();

  const logout = () => {
    dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, undefined));
    triggerLogoutQuery(undefined);
    localStorage.removeItem('rememberMe');
  };

  return logout;
}
