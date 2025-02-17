import { ErrorServerSchema } from 'src/Shared/Types/errorServer';
import { store } from 'Store/store';
import { userAPI } from 'Store/ToolkitAPIs/userAPI';

export async function initialLoginLoader() {
  const flag = localStorage.getItem('rememberMe');

  if (!flag) return null;

  try {
    await store.dispatch(userAPI.endpoints.getCurrentUser.initiate(undefined));
  } catch (e) {
    const { data: error } = ErrorServerSchema.safeParse(e);

    if (error && error.data.message === 'Unauthorized') {
      localStorage.removeItem('rememberMe');
    }
  }

  return null;
}
