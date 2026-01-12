import type { RootState } from "Store/store";
import { createSelector } from "@reduxjs/toolkit";

export const answerTimerSelector = (state: RootState) => state.playModeReducer.answerTime;
export const questionTimerSelector = (state: RootState) => state.playModeReducer.questionTime;
export const withTimerSelector = (state: RootState) => state.playModeReducer.withTimer;

export const selectedResultQuestionNumberSelector = (state: RootState) =>
	state.playModeReducer.selectedResultQuestionNumber;

export const tournamentInfoSelector = (state: RootState) => state.playModeReducer.tournamentInfo;
export const questionsSelector = (state: RootState) => state.playModeReducer.questions;
export const tourEndQuestionIndexesSelector = (state: RootState) =>
	state.playModeReducer.tourEndQuestionIndexes;
export const tournamentEndQuestionIndexSelector = (state: RootState) =>
	state.playModeReducer.tournamentEndQuestionIndex;
export const currentQuestionIndexSelector = (state: RootState) =>
	state.playModeReducer.currentQuestionIndex;
export const stepSelector = (state: RootState) => state.playModeReducer.step;
export const currentTourNumberSelector = (state: RootState) =>
	state.playModeReducer.currentTourNumber;
export const resultSelector = (state: RootState) => state.playModeReducer.result;

export const timerOptions = createSelector(
	[withTimerSelector, answerTimerSelector, questionTimerSelector],
	(withTimer, answerTimer, questionTimer) => ({
		withTimer,
		answerTimer,
		questionTimer,
	}),
);

export const currentQuestionSelector = createSelector(
	[questionsSelector, currentQuestionIndexSelector],
	(questions, currentQuestionIndex) => questions[currentQuestionIndex],
);

export const currentTourRangeSelector = createSelector(
	[currentTourNumberSelector, questionsSelector],
	(currentTourNumber, questions) => {
		if (!currentTourNumber) return { first: 0, last: 0 };

		const first = questions.findIndex((v) => v.tourNumber === currentTourNumber);
		const last = questions.findLastIndex((v) => v.tourNumber === currentTourNumber);
		return { first, last };
	},
);
