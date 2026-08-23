import { useGetTournamentsLastShortQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

export function usePaginationTournaments(amount: number) {
	const [searchParams, setSearchParams] = useSearchParams();
	const currentPage = Number(searchParams.get("page") || "1");

	const { data, ...rest } = useGetTournamentsLastShortQuery({
		amount,
		page: currentPage,
		withSkip: true,
	});

	const handlePageChange = (newPage: number) => {
		if (newPage === currentPage) return;
		setSearchParams({ page: String(newPage) });
	};

	const pageCount = data?.pageCount ?? 1;
	const hasMorePage = data?.hasMorePage ?? false;
	const count = data?.count ?? 0;

	const tournamentsPaginated = data?.tournaments || [];

	useEffect(() => {
		if (pageCount !== 1 && currentPage > pageCount) {
			setSearchParams((prev) => ({ ...prev, page: String(pageCount) }));
		}

		if (!currentPage || currentPage < 1) {
			setSearchParams((prev) => ({ ...prev, page: "1" }));
		}
	}, [pageCount, setSearchParams, currentPage]);

	return {
		tournamentsPaginated,
		pageCount,
		hasMorePage,
		count,
		currentPage,
		handlePageChange,
		...rest,
	};
}
