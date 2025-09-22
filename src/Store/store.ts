import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playModeReducer } from "./Slices/PlayModeSlice";
import { wordleReducer } from "./Slices/WordleSlice";
import { tournamentAPI } from "./ToolkitAPIs/tournamentAPI";
import { userAPI } from "./ToolkitAPIs/userAPI";
import { wordleAPI } from "./ToolkitAPIs/wordleAPI";

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

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
