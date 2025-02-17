import { useAppDispatch } from 'Shared/Hooks/redux';
import { useLoginMutation, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { LoginType } from '../Schema/EntrySchema';

export function useLogin() {
  const [loginFunc, { isSuccess, isLoading, error }] = useLoginMutation();

  const dispatch = useAppDispatch();

  async function login(user: LoginType) {
    await loginFunc(user)
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, data)))
      .then(() => {
        localStorage.setItem('rememberMe', 'yes');
      })
      .catch(() => {});
  }

  return { isSuccess, error, isLoading, login };
}
