import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "Store/store";

export const moderateTournamentSelector = (state: RootState) =>
	state.moderateTournamentReducer.tournament;

export const isModeratedSelector = (state: RootState) =>
	state.moderateTournamentReducer.isModerated;

export const moderatedInfoFieldsSelector = (state: RootState) =>
	state.moderateTournamentReducer.moderatedInfoFields;

export const moderatedQuestionsSelector = (state: RootState) =>
	state.moderateTournamentReducer.moderatedQuestions;

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

export const updatedFieldsSelector = createSelector(
	[moderatedInfoFieldsSelector, moderatedQuestionsSelector],
	(moderatedInfoFields, moderatedQuestions) => {
		return { moderatedInfoFields, moderatedQuestions };
	},
);
