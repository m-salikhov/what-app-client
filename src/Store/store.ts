import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tournamentAPI } from './ToolkitAPIs/tournamentAPI';
import { playModeReducer } from './Slices/PlayModeSlice';
import { userAPI } from './ToolkitAPIs/userAPI';
import { wordleAPI } from './ToolkitAPIs/wordleAPI';
import { wordleReducer } from './Slices/WordleSlice';

const rootReducer = combineReducers({
  wordleReducer,
  playModeReducer,
  [tournamentAPI.reducerPath]: tournamentAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
  [wordleAPI.reducerPath]: wordleAPI.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getMidlleware) =>
      getMidlleware().concat(tournamentAPI.middleware, userAPI.middleware, wordleAPI.middleware),
    preloadedState,
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
