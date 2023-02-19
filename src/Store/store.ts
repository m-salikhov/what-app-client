import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import tournamentReducer from "./reducers/TournamentSlice";
import questionsReducer from "./reducers/QuestionsSlice";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userReducer,
  tournamentReducer,
  questionsReducer,
});

export const store = configureStore({
  reducer: rootReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
// export type AppThunk<ReturnType = void> = ThunkAction<
//   ReturnType,
//   RootState,
//   unknown,
//   Action<string>
// >;
