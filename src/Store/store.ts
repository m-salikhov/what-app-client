import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tournamentAPI } from './ToolkitAPIs/tournamentAPI';
import { playModeReducer } from './Slices/PlayModeSlice';
import { userAPI } from './ToolkitAPIs/userAPI';

const rootReducer = combineReducers({
  playModeReducer,
  [tournamentAPI.reducerPath]: tournamentAPI.reducer,
  [userAPI.reducerPath]: userAPI.reducer,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getMidlleware) =>
    getMidlleware().concat(tournamentAPI.middleware, userAPI.middleware),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
