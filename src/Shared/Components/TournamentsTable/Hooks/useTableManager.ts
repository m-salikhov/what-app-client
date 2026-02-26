import { usePaginationTournaments } from "./usePaginationTournaments";
import { useSearchTournaments } from "./useSearchTournaments";
import { useSortTournaments } from "./useSortTournaments";

export function useTableManager(amount: number, currentPage: number) {
	const {
		tournamentsPaginated,
		pageCount,
		isFetching: paginationFetching,
		isError: paginationError,
		isSuccess: paginationSuccess,
		isLoading: paginationLoading,
	} = usePaginationTournaments(amount, currentPage);

	const {
		tournamentsSearched,
		hideSearchResult,
		handleSearch,
		showSearchResult,
		searchState: { isFetching: searchFetching, isError: searchError, isSuccess: searchSuccess },
	} = useSearchTournaments();

	const tournaments = showSearchResult ? tournamentsSearched : tournamentsPaginated;

	const { tournamentsSorted, sortTournaments, sortField, sortDirection } =
		useSortTournaments(tournaments);

	return {
		pageCount,
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

		tournamentsSorted,
		sortTournaments,
		sortField,
		sortDirection,
	};
}
