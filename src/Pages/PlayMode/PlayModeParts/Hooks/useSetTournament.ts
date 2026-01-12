import { skipToken } from "@reduxjs/toolkit/query";
import { useEffect } from "react";
import { useAppDispatch } from "Shared/Hooks/redux";
import { playModeActions } from "Store/Slices/PlayModeSlice";
import { useGetTournamentQuery } from "Store/ToolkitAPIs/tournamentAPI";

export function useSetTournament(id: string | undefined) {
	const dispatch = useAppDispatch();

	const { data: tournament, isLoading, isSuccess } = useGetTournamentQuery(id ?? skipToken);

	useEffect(() => {
		if (tournament) {
			dispatch(playModeActions.setTournament(tournament));
		}
	}, [tournament, dispatch]);

	return { isLoading, isSuccess };
}
