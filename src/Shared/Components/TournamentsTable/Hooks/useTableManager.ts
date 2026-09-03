import { useEnrichTournaments } from "./useEnrichTournaments";
import { usePaginationTournaments } from "./usePaginationTournaments";
import { useSearchByTitle } from "./useSearchByTitle";
import { useSortTournaments } from "./useSortTournaments";

export function useTableManager(amountTournamentsOnPage: number) {
	const {
		tournamentsPaginated,
		pageCount,
		isFetching: paginationFetching,
		isError: paginationError,
		isSuccess: paginationSuccess,
		isLoading: paginationLoading,
		currentPage,
		handlePageChange,
	} = usePaginationTournaments(amountTournamentsOnPage);

	const {
		tournamentsSearched,
		handleSearch,
		searchString,

		searchState: {
			isFetching: searchFetching,
			isError: searchError,
			isSuccess: searchSuccess,
			isLoading: searchLoading,
		},
	} = useSearchByTitle();

	const tournaments = Array.isArray(tournamentsSearched)
		? tournamentsSearched
		: tournamentsPaginated;
	const showSearchResult = Array.isArray(tournamentsSearched);

	const { tournamentsSorted, sortTournaments, sortField, sortDirection } =
		useSortTournaments(tournaments);

	const enrichedTournaments = useEnrichTournaments(
		tournamentsSorted,
		currentPage,
		amountTournamentsOnPage,
	);

	return {
		pageCount,
		handleSearch,
		currentPage,
		handlePageChange,
		showSearchResult,
		searchString,

		queryState: {
			isFetching: paginationFetching || searchFetching,
			isError: paginationError || searchError,
			isSuccess: paginationSuccess || searchSuccess,
			isLoading: paginationLoading || searchLoading,
			searchSuccess,
			paginationSuccess,
		},

		enrichedTournaments,
		sortTournaments,
		sortField,
		sortDirection,
	};
}
