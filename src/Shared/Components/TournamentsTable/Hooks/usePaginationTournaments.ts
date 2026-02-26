import { useGetTournamentsLastShortQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { useEnrichTournaments } from "./useEnrichTournaments";

export function usePaginationTournaments(amount: number, currentPage: number) {
	const { data, ...rest } = useGetTournamentsLastShortQuery({
		amount,
		page: currentPage,
		withSkip: true,
	});

	const pageCount = data?.pageCount ?? 1;
	const hasMorePage = data?.hasMorePage ?? false;
	const count = data?.count ?? 0;

	const tournamentsPaginated = useEnrichTournaments(data?.tournaments || []);

	return { tournamentsPaginated, pageCount, hasMorePage, count, ...rest };
}
