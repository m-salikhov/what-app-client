import { cleanup } from "@testing-library/react";
import { afterAll, afterEach, beforeAll, vi } from "vitest";
import { server } from "./mocks/node";
import "@testing-library/jest-dom";
import { SpinnerMock } from "./mocks/SpinnerMock";

// нужен так как библиотека jsdom не поддерживает react-loader-spinner
vi.mock("../src/Shared/Components/Spinner/Spinner", () => {
	return {
		// Если Spinner — именованный экспорт
		Spinner: SpinnerMock,
	};
});

beforeAll(() => server.listen());
afterEach(() => {
	server.resetHandlers();
	cleanup();
});
afterAll(() => server.close());
