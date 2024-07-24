import { useAppDispatch } from '../../../Hooks/redux';
import { useLoginMutation, userAPI } from '../../../Store/userAPI';

export function useLogin() {
  const [loginFunc, { isSuccess, error, isLoading, reset }] = useLoginMutation({
    fixedCacheKey: 'login',
  });

  const dispatch = useAppDispatch();

  async function login(email: string, password: string) {
    await loginFunc({ email, password })
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('initialLogin', undefined, data)))
      .then(() => {
        localStorage.setItem('rememberMe', 'yes');
      })
      .catch(() => {});

    reset();
  }

  return { isSuccess, error, isLoading, login };
}
