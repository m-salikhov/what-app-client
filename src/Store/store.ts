import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import playModeReducer from "./reducers/PlayModeSlice";

const rootReducer = combineReducers({
  userReducer,
  playModeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
