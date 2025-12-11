import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./mocks/node";
import "@testing-library/jest-dom";
import { SpinnerMock } from "./mocks/SpinnerMock";

// нужен так как библиотека jsdom не поддерживает react-loader-spinner
vi.mock("../src/Shared/Components/Spinner/Spinner", () => {
	return {
		Spinner: SpinnerMock,
	};
});

globalThis.ResizeObserver = class ResizeObserver {
	observe = vi.fn();
	unobserve = vi.fn();
	disconnect = vi.fn();
};

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	cleanup();
});
afterAll(() => server.close());
