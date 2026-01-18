import { useMemo, useState } from "react";
import { linkBuilder } from "Shared/Helpers/linkBuilder";
import {
	useGetTournamentsLastShortQuery,
	useLazySearchQuery,
} from "Store/ToolkitAPIs/tournamentAPI";
import { getDifficultyClass } from "./getDifficultyClass";
import { useLocation } from "react-router-dom";
import { useTheme } from "Shared/Context/ThemeContext";
import type { TournamentShortType } from "Shared/Schemas/TournamentSchema";

export type EnrichedTournamentType = TournamentShortType & {
	eternalLink: string;
	background: string;
};

export function useGetTableList(amount: number, currentPage: number) {
	const { theme } = useTheme();
	const { pathname } = useLocation();
	const [showSearchResult, setShowSearchResult] = useState(false);

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

	const hideSearchResult = () => {
		setShowSearchResult(false);
	};

	async function handleSearch(filterString: string) {
		if (filterString.length > 1) {
			await trigger({ title: filterString });
			setShowSearchResult(true);
		}
	}

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

		setShowSearchResult(true);

		return searchList.map((t) => ({
			...t,
			eternalLink: linkBuilder(t.id, pathname),
			background: getDifficultyClass(t.difficulty, theme),
		}));
	}, [searchList, pathname, theme]);

	const tournaments = showSearchResult ? resultSearch : resultPagination;

	return {
		tournaments,

		pageCount: data?.pageCount ?? 1,
		searchByTitle: (str: string) => trigger({ title: str }),

		hideSearchResult,
		handleSearch,
		showSearchResult,

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
