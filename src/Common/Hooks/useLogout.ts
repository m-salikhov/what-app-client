import { initUser } from 'Common/Helpers/initValues';
import { useLazyLogoutQuery, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { useAppDispatch } from './redux';

export function useLogout() {
  const [triggerLogoutQuery] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('rememberMe');
    dispatch(userAPI.util.upsertQueryData('initialLogin', undefined, initUser));
    triggerLogoutQuery(undefined);
  };

  return logout;
}
