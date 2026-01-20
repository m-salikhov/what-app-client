import { createContext, type ReactNode, useContext, useLayoutEffect, useState } from "react";
import * as z from "zod";

const ThemeSchema = z.enum(["light", "dark"]);
export type ThemeType = z.infer<typeof ThemeSchema>;

const ThemeContext = createContext<{ theme: ThemeType; changeTheme: () => void }>({
	theme: "light",
	changeTheme: () => {},
});

export function useTheme() {
	return useContext(ThemeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
	const [theme, setTheme] = useState<ThemeType>(() => {
		const savedTheme = ThemeSchema.safeParse(localStorage.getItem("app-theme")).data;
		return savedTheme || "light";
	});

	useLayoutEffect(() => {
		document.documentElement.dataset.theme = theme;
		localStorage.setItem("app-theme", theme);
	}, [theme]);

	function changeTheme() {
		setTheme((prev) => (prev === "light" ? "dark" : "light"));
	}

	return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
}
