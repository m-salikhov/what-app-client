import { type AppStore, type RootState, setupStore } from "Store/store";
import type { RenderOptions } from "@testing-library/react";
import { render } from "@testing-library/react";
import type React from "react";
import type { PropsWithChildren } from "react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
	preloadedState?: Partial<RootState>;
	store?: AppStore;
}

export function renderWithProviders(
	component: React.ReactElement,
	{
		preloadedState = {},
		// Automatically create a store instance if no store was passed in
		store = setupStore(preloadedState),
		...renderOptions
	}: ExtendedRenderOptions = {},
) {
	function Wrapper({ children }: PropsWithChildren): React.JSX.Element {
		return (
			<MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
				<Provider store={store}>{children}</Provider>
			</MemoryRouter>
		);
	}

	return { store, ...render(component, { wrapper: Wrapper, ...renderOptions }) };
}
