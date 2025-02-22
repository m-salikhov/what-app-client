import { useLazyLogoutQuery, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { useAppDispatch } from './redux';
import { UserType } from 'Shared/Schemas/UserSchema';

export const initUser: UserType = {
  id: '',
  email: '',
  username: '',
  role: 'user',
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
