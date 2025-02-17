import { useLazyLogoutQuery, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { useAppDispatch } from './redux';
import { UserType } from 'Common/Types/user';

export const initUser: UserType = {
  id: '',
  email: '',
  username: '',
  role: '',
  date: 0,
};

export function useLogout() {
  const [triggerLogoutQuery] = useLazyLogoutQuery();
  const dispatch = useAppDispatch();

  const logout = () => {
    localStorage.removeItem('rememberMe');
    dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, initUser));
    triggerLogoutQuery(undefined);
  };

  return logout;
}
