import {
  useGetCurrentUserQuery,
  useLoginMutation,
  useLogoutMutation,
  userAPI,
  useRegistrationMutation,
} from 'Store/ToolkitAPIs/userAPI';
import { useAppDispatch } from '../Hooks/redux';
import { LoginType, RegistrationType } from 'src/Pages/Entry/Schema/EntrySchema';

export function useAuth() {
  const dispatch = useAppDispatch();

  const { data: user } = useGetCurrentUserQuery(undefined);

  const [logout] = useLogoutMutation();
  const [login, loginState] = useLoginMutation();
  const [registration, registrationState] = useRegistrationMutation();

  const handleLogin = async (credentials: LoginType) => {
    try {
      const data = await login(credentials).unwrap();
      dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, data));
      localStorage.setItem('rememberMe', 'yes');
    } catch (e) {}
  };

  const handleRegistration = async (user: RegistrationType) => {
    const { confirmPassword, ...userData } = user;
    try {
      const data = await registration(userData).unwrap();
      dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, data));
      localStorage.setItem('rememberMe', 'yes');
    } catch (e) {}
  };

  const handleLogout = async () => {
    try {
      localStorage.removeItem('rememberMe');

      await logout(undefined);

      dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, undefined));
    } catch (err) {
      console.error(err);
    }
  };

  return {
    user,
    handleLogout,
    handleLogin,
    loginState,
    handleRegistration,
    registrationState,
  };
}
