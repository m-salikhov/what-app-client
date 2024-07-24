import { useLazyLogoutQuery, userAPI } from '../Store/userAPI';
import { useAppDispatch } from './redux';

export function useLogout() {
  const [triggerLogoutQuery] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('rememberMe');
    dispatch(userAPI.util.resetApiState());
    triggerLogoutQuery(undefined);
  };

  return logout;
}
