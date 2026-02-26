import { useMemo } from "react";
import { linkBuilder } from "Shared/Helpers/linkBuilder";
import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";
import { useLocation } from "react-router-dom";
import { useTheme, type ThemeType } from "Shared/Context/ThemeContext";

export type EnrichedTournamentType = TournamentShortType & {
	eternalLink: string;
	background: string;
};

export function useEnrichTournaments(tournaments: TournamentShortType[]) {
	const { theme } = useTheme();
	const { pathname } = useLocation();

	const enrichedTournaments: EnrichedTournamentType[] = useMemo(() => {
		if (!tournaments.length) return [];

		return tournaments.map((tournament) => ({
			...tournament,
			eternalLink: linkBuilder(tournament.id, pathname),
			background: getDifficultyClass(tournament.difficulty, theme),
		}));
	}, [tournaments, pathname, theme]);

	return enrichedTournaments;
}

function getDifficultyClass(difficulty: number, theme: ThemeType): string {
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
