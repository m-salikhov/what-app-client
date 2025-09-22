import type { ThemeType } from "Shared/Context/ThemeContext";

export function getDifficultyBGC(difficulty: number, theme: ThemeType) {
	if (difficulty < 3 && difficulty > 0) {
		return theme === "light" ? "#68E449" : "#76f956";
	}

	if (difficulty >= 3 && difficulty < 4) {
		return theme === "light" ? "#A7F594" : "#9affab";
	}

	if (difficulty >= 4 && difficulty < 5) {
		return theme === "light" ? "#EAF582" : "#f1fb93";
	}

	if (difficulty >= 5 && difficulty < 6) {
		return theme === "light" ? "#ffc2c2" : "#cc5b44";
	}

	if (difficulty >= 6) {
		return theme === "light" ? "#ffaa99" : "#be4f38";
	}

	return "";
}
