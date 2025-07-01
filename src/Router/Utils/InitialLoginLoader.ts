import { store } from 'Store/store';
import { userAPI } from 'Store/ToolkitAPIs/userAPI';

export async function initialLoginLoader() {
  const rememberMeFlag = localStorage.getItem('rememberMe');

  if (!rememberMeFlag) {
    await store.dispatch(userAPI.util.upsertQueryData('getCurrentUser', undefined, undefined));
    return null;
  }

  try {
    await store.dispatch(userAPI.endpoints.getCurrentUser.initiate(undefined));
  } catch (error) {
    throw error;
  }

  return null;
}
