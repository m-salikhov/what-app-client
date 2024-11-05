import { useAppDispatch } from '../../../Hooks/redux';
import { useLoginMutation, userAPI } from '../../../Store/ToolkitAPIs/userAPI';
import { FormUser } from '../../../Common/Types/user';

export function useLogin() {
  const [loginFunc, { isSuccess, error, isLoading, reset }] = useLoginMutation();

  const dispatch = useAppDispatch();

  async function login(formUser: FormUser) {
    const { email, password } = formUser;

    await loginFunc({ email, password })
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('initialLogin', undefined, data)))
      .then(() => {
        localStorage.setItem('rememberMe', 'yes');
      })
      .catch(() => {});

    reset();
  }

  return { isSuccess, error, isLoading, login, reset };
}
