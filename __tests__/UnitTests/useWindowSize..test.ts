import { useWindowSize } from "Shared/Hooks/useWindowSize";
import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Мокаем window.innerWidth/innerHeight и события resize
function mockWindowSize(width: number, height: number) {
	window.innerWidth = width;
	window.innerHeight = height;
	window.dispatchEvent(new Event("resize"));
}

describe("useWindowSize", () => {
	beforeEach(() => {
		vi.spyOn(window, "requestAnimationFrame").mockImplementation((cb) => {
			cb(0);
			return 0;
		});
	});

	afterEach(() => {
		vi.restoreAllMocks();
	});

	it("should return initial window size and isDesktop flag", () => {
		mockWindowSize(1200, 800); // Десктопный размер

		const { result } = renderHook(() => useWindowSize());

		expect(result.current).toEqual({
			width: 1200,
			height: 800,
			isDesktop: true,
		});
	});

	it("should update size and isDesktop on window resize", () => {
		mockWindowSize(800, 600); // Мобильный размер

		const { result } = renderHook(() => useWindowSize());

		// Первоначальное состояние
		expect(result.current.isDesktop).toBe(false);

		// Меняем размер на десктопный
		act(() => {
			mockWindowSize(1400, 900);
		});

		expect(result.current).toEqual({
			width: 1400,
			height: 900,
			isDesktop: true,
		});
	});

	it("should clean up event listener on unmount", () => {
		const addListenerSpy = vi.spyOn(window, "addEventListener");
		const removeListenerSpy = vi.spyOn(window, "removeEventListener");

		const { unmount } = renderHook(() => useWindowSize());

		expect(addListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));

		unmount();

		expect(removeListenerSpy).toHaveBeenCalledWith("resize", expect.any(Function));
	});
});
