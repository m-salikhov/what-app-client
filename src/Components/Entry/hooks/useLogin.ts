import { useAppDispatch } from '../../../Hooks/redux';
import { useLoginMutation, userAPI } from '../../../Store/userAPI';

export function useLogin(email: string, password: string) {
  const [loginFunc, { isSuccess, error, isLoading, reset }] = useLoginMutation({
    fixedCacheKey: 'login',
  });

  const dispatch = useAppDispatch();

  async function login() {
    await loginFunc({ email, password })
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('getUserLogfirst', undefined, data)))
      .catch(() => {});

    reset();
    localStorage.setItem('rememberMe', 'yes');
  }

  return { isSuccess, error, isLoading, login };
}
