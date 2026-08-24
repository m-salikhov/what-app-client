import { useMemo } from "react";
import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";
import { useLocation } from "react-router-dom";
import { useTheme, type ThemeType } from "Shared/Context/ThemeContext";

export type EnrichedTournamentType = TournamentShortType & {
	eternalLink: string;
	background: string;
	tableIndex: number;
};

export function useEnrichTournaments(
	tournaments: TournamentShortType[] | undefined,
	currentPage: number,
	amountTournamentsOnPage: number,
) {
	const { theme } = useTheme();
	const { pathname } = useLocation();

	// biome-ignore lint/correctness/useExhaustiveDependencies: <изменение страницы не должно триггерить хук>
	const enrichedTournaments: EnrichedTournamentType[] | undefined = useMemo(() => {
		if (!tournaments) return undefined;

		if (tournaments.length === 0) return [];

		return tournaments.map((tournament, i) => ({
			...tournament,
			eternalLink: `${pathname}/${tournament.id}`,
			background: getDifficultyClass(tournament.difficulty, theme),
			tableIndex: i + 1 + (currentPage - 1) * amountTournamentsOnPage,
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
