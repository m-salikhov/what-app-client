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

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getMidlleware) =>
    getMidlleware().concat(
      tournamentAPI.middleware,
      userAPI.middleware,
      wordleAPI.middleware
    ),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
