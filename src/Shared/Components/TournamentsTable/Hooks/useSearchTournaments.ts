import { useState } from "react";
import { useLazySearchQuery } from "Store/ToolkitAPIs/tournamentAPI";
import { useEnrichTournaments } from "./useEnrichTournaments";

export function useSearchTournaments() {
	const [showSearchResult, setShowSearchResult] = useState(false);

	const [trigger, { data, ...searchState }] = useLazySearchQuery();

	async function handleSearch(searchString: string) {
		if (searchString.length > 1) {
			await trigger({ title: searchString });
			setShowSearchResult(true);
		}
	}

	const hideSearchResult = () => {
		setShowSearchResult(false);
	};

	const tournamentsSearched = useEnrichTournaments(data || []);

	return {
		tournamentsSearched,
		handleSearch,
		hideSearchResult,
		showSearchResult,
		searchState,
	};
}
