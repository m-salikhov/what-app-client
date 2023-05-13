import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import tournamentReducer from "./reducers/TournamentSlice";
import playModeReducer from "./reducers/PlayModeSlice";
import questionsReducer from "./reducers/QuestionsSlice";

const rootReducer = combineReducers({
  userReducer,
  tournamentReducer,
  questionsReducer,
  playModeReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
