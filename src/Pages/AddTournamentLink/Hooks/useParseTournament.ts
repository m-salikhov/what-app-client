import { useParseLinkMutation } from "Store/ToolkitAPIs/tournamentAPI";
import type { Dispatch } from "react";
import type { Action } from "../Reducer/reducer";

export function useParseTournament() {
	const [
		parseTournament,
		{
			isLoading: isLoadingParse,
			error: errorOnParse,
			reset: resetParseState,
			isSuccess: isSuccessParse,
		},
	] = useParseLinkMutation();

	const handleParseLink = async (dispatch: Dispatch<Action>, link: string) => {
		try {
			const data = await parseTournament({ link }).unwrap();

			dispatch({ type: "loaded", payload: data });
		} catch (_error) {}
	};

	return {
		isLoadingParse,
		errorOnParse,
		isSuccessParse,
		handleParseLink,
		resetParseState,
	};
}
