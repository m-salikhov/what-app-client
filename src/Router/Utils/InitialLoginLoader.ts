import { ErrorServerSchema } from 'src/Shared/Types/errorServer';
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
  } catch (error_) {
    const { data: error } = ErrorServerSchema.safeParse(error_);

    if (error && error.data.message === 'Unauthorized') {
      localStorage.removeItem('rememberMe');
    }
  }

  return null;
}
