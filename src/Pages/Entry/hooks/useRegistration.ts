import { useAppDispatch } from 'Shared/Hooks/redux';
import { useRegistrationMutation, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { RegistrationType } from '../Schema/EntrySchema';

export function useRegistration() {
  const [registrationFunc, { isLoading, isSuccess, error }] = useRegistrationMutation();

  const dispatch = useAppDispatch();

  async function registration(user: RegistrationType) {
    const { confirmPassword, ...userData } = user;

    await registrationFunc(userData)
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, data)))
      .then(() => {
        localStorage.setItem('rememberMe', 'yes');
      })
      .catch(() => {});
  }

  return { isSuccess, error, isLoading, registration };
}
