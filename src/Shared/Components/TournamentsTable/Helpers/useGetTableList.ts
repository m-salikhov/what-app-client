import { useMemo } from "react";
import { linkBuilder } from "Shared/Helpers/linkBuilder";
import {
	tournamentAPI,
	useGetTournamentsLastShortQuery,
	useLazySearchQuery,
} from "Store/ToolkitAPIs/tournamentAPI";
import { getDifficultyClass } from "./getDifficultyClass";
import { useLocation } from "react-router-dom";
import { useTheme } from "Shared/Context/ThemeContext";
import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";
import { useDispatch } from "react-redux";

export type EnrichedTournamentType = TournamentShortType & {
	eternalLink: string;
	background: string;
};

export function useGetTableList(amount: number, currentPage: number) {
	const { theme } = useTheme();
	const { pathname } = useLocation();
	const dispatch = useDispatch();

	const clearSearchResult = () => {
		dispatch(tournamentAPI.util.resetApiState());
		// dispatch(tournamentAPI.util.invalidateTags(["search"]));
	};

	const {
		data,
		isFetching: paginationFetching,
		isError: paginationError,
		isSuccess: paginationSuccess,
		isLoading: paginationLoading,
	} = useGetTournamentsLastShortQuery({
		amount,
		page: currentPage,
		withSkip: true,
	});

	const [
		trigger,
		{
			data: searchList,
			isFetching: searchFetching,
			isError: searchError,
			isSuccess: searchSuccess,
		},
	] = useLazySearchQuery();

	const resultPagination = useMemo(() => {
		if (!data) return [];

		return data.tournaments.map((t) => ({
			...t,
			eternalLink: linkBuilder(t.id, pathname),
			background: getDifficultyClass(t.difficulty, theme),
		}));
	}, [data, pathname, theme]);

	const resultSearch = useMemo(() => {
		if (!searchList) return [];

		console.log("searchList memo");

		return searchList.map((t) => ({
			...t,
			eternalLink: linkBuilder(t.id, pathname),
			background: getDifficultyClass(t.difficulty, theme),
		}));
	}, [searchList, pathname, theme]);

	const tournaments = searchList ? resultSearch : resultPagination;

	return {
		tournaments,

		pageCount: data?.pageCount ?? 1,
		searchByTitle: (str: string) => trigger({ title: str }),

		clearSearchResult,

		queryState: {
			isFetching: paginationFetching || searchFetching,
			isError: paginationError || searchError,
			isSuccess: paginationSuccess || searchSuccess,
			isLoading: paginationLoading,
			searchSuccess,
			paginationSuccess,
		},
	};
}
