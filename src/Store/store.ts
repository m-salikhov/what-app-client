import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/UserSlice";
import tournametReducer from "./reducers/TournamentSlice";

import { combineReducers } from "redux";

const rootReducer = combineReducers({
  userReducer,
  tournametReducer,
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
