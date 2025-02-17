import { useAppDispatch } from 'Shared/Hooks/redux';
import { useLoginMutation, userAPI } from 'Store/ToolkitAPIs/userAPI';
import { LoginType } from '../Schema/EntrySchema';
import { useState } from 'react';

export function useLogin() {
  const [loginFunc, { isSuccess, isLoading }] = useLoginMutation();
  const [error, setError] = useState(undefined);

  const dispatch = useAppDispatch();

  async function login(user: LoginType) {
    await loginFunc(user)
      .unwrap()
      .then((data) => dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, data)))
      .then(() => {
        localStorage.setItem('rememberMe', 'yes');
      })
      .catch((e) => {
        setError(e);
      });
  }

  return { isSuccess, error, isLoading, login };
}
