import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "Store/store";

export const moderateTournamentSelector = (state: RootState) =>
	state.moderateTournamentReducer.tournament;

export const moderateInfoSelector = createSelector([moderateTournamentSelector], (tournament) => {
	const { questions: _, ...info } = tournament;
	return info;
});

export const moderateQuestionsSelector = createSelector(
	[moderateTournamentSelector],
	(tournament) => {
		return tournament.questions;
	},
);
