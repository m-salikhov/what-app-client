import { useAppDispatch } from 'Common/Hooks/redux';
import { useRegistrationMutation, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { useState } from 'react';
import { RegistrationType } from '../Schema/EntrySchema';

export function useRegistration() {
  const [registrationFunc, { isLoading, isSuccess }] = useRegistrationMutation();

  const [error, setError] = useState(undefined);

  const dispatch = useAppDispatch();

  async function registration(user: RegistrationType) {
    const { confirmPassword, ...userData } = user;

    await registrationFunc(userData)
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('initialLogin', undefined, data)))
      .then(() => {
        localStorage.setItem('rememberMe', 'yes');
      })
      .catch((e) => {
        setError(e);
      });
  }

  return { isSuccess, error, isLoading, registration };
}
