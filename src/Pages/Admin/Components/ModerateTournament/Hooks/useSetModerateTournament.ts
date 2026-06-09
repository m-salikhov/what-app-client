import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useAppDispatch } from "Shared/Hooks/redux";
import { moderateTournamentActions } from "Store/Slices/ModerateTournamentSlice";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";

export function useSetModerateTournament(id: string | undefined) {
	const dispatch = useAppDispatch();

	const { data: tournament, isError, isFetching } = useGetTournamentQuery(id ?? skipToken);

	useEffect(() => {
		if (tournament) {
			dispatch(moderateTournamentActions.setTournament(tournament));
		}
	}, [tournament, dispatch]);

	return { isFetching, isError };
}
