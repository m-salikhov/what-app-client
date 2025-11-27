import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { playModeReducer } from "./Slices/PlayModeSlice";
import { wordleReducer } from "./Slices/WordleSlice";
import { baseApi } from "./ToolkitAPIs/baseApi";

const rootReducer = combineReducers({
	wordleReducer,
	playModeReducer,
	[baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
	return configureStore({
		reducer: rootReducer,
		middleware: (getMidlleware) => getMidlleware().concat(baseApi.middleware),
		preloadedState,
	});
};

export const store = setupStore();

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
