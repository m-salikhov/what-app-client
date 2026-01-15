import type { ThemeType } from "Shared/Context/ThemeContext";

export function getDifficultyClass(difficulty: number, theme: ThemeType): string {
	if (difficulty > 0 && difficulty < 3) {
		return theme === "light" ? "difficultyLowLight" : "difficultyLowDark";
	}

	if (difficulty >= 3 && difficulty < 4) {
		return theme === "light" ? "difficultyMediumLight" : "difficultyMediumDark";
	}

	if (difficulty >= 4 && difficulty < 5) {
		return theme === "light" ? "difficultyHighLight" : "difficultyHighDark";
	}

	if (difficulty >= 5 && difficulty < 6) {
		return theme === "light" ? "difficultyVeryHighLight" : "difficultyVeryHighDark";
	}

	if (difficulty >= 6) {
		return theme === "light" ? "difficultyExtremeLight" : "difficultyExtremeDark";
	}

	return "difficultyNone";
}
