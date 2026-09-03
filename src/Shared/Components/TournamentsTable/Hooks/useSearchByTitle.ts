import { useSearchParams } from "react-router-dom";
import { tournamentAPI, useLazySearchQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { store } from "Store/store";
import { useCallback, useEffect } from "react";

export function useSearchByTitle() {
	const [searchParams, setSearchParams] = useSearchParams();
	const searchString = searchParams.get("search") || "";

	const [trigger, { data: tournamentsSearched, ...searchState }] = useLazySearchQuery();

	const handleSearch = useCallback(
		(value: string) => {
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
			}

			if (value.length > 1) {
				setSearchParams({ search: value });
				trigger({ title: value });
			}
		},
		[searchString, setSearchParams, trigger],
	);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <только первый рендер>
	useEffect(() => {
		if (searchString) {
			trigger({ title: searchString });
		}
	}, []);

	return {
		tournamentsSearched,
		handleSearch,
		searchState,
		searchString,
	};
}
