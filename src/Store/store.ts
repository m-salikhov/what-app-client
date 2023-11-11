import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import { tournamentAPI } from "./tournamentAPI";
import playModeReducer from "./reducers/PlayModeSlice";
import { userAPI } from "./userAPI";

const rootReducer = combineReducers({
  userReducer,
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
