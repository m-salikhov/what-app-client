import { useSearchParams } from "react-router-dom";
import { tournamentAPI, useLazySearchQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { store } from "Store/store";

export function useSearchByTitle() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchString = searchParams.get("search") || "";

	const [trigger, { data: tournamentsSearched, ...searchState }] = useLazySearchQuery();

	function handleSearch(value: string) {
		if (value === searchString) return;
		if (value === "") {
			setSearchParams((prev) => {
				const params = new URLSearchParams(prev);
				params.delete("search");
				return params;
			});

			store.dispatch(
				tournamentAPI.util.upsertQueryData("search", { title: searchString }, undefined),
			);

			return;
		}

		setSearchParams({ search: value });

		if (value.length > 1) {
			trigger({ title: value });
		}
	}

	return {
		tournamentsSearched,
		handleSearch,
		searchState,
	};
}
