import { wordleActions } from 'Store/Slices/WordleSlice';
import { store } from 'Store/store';
import { wordleAPI } from 'Store/ToolkitAPIs/wordleAPI';

export async function wordleLoader() {
  store.dispatch(wordleActions.resetState());

  await store.dispatch(wordleAPI.endpoints.getRandomWord.initiate(undefined, { forceRefetch: true }));

  return null;
}
