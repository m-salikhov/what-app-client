import { useAppDispatch } from '../../../Hooks/redux';
import {
  userAPI,
  useRegistrationMutation,
} from '../../../Store/ToolkitAPIs/userAPI';
import { FormUser } from '../../../Types/user';

export function useRegistration() {
  const [registrationFunc, { error, isLoading, isSuccess, reset }] =
    useRegistrationMutation();

  const dispatch = useAppDispatch();

  async function registration(formUser: FormUser) {
    await registrationFunc(formUser)
      .unwrap()
      .then((data) =>
        dispatch(userAPI.util.upsertQueryData('initialLogin', undefined, data))
      )
      .then(() => {
        localStorage.setItem('rememberMe', 'yes');
      })
      .catch(() => {});
  }

  return { isSuccess, error, isLoading, registration, reset };
}
