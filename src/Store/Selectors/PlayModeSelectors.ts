import type { RootState } from "Store/store";
import { createSelector } from "@reduxjs/toolkit";

export const answerTimerPM = (state: RootState) => state.playModeReducer.answerTime;

export const questionTimerPM = (state: RootState) => state.playModeReducer.questionTime;
export const resultPM = (state: RootState) => state.playModeReducer.result;
export const selectedResultQuestionNumberPM = (state: RootState) =>
	state.playModeReducer.selectedResultQuestionNumber;
export const totalAnsweredCountPM = (state: RootState) => state.playModeReducer.totalAnsweredCount;
export const withTimerPM = (state: RootState) => state.playModeReducer.withTimer;
export const totalQuestionsCountPM = (state: RootState) =>
	state.playModeReducer.totalQuestionsCount;

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

export const timerOptions = createSelector(
	[withTimerPM, answerTimerPM, questionTimerPM],
	(withTimer, answerTimer, questionTimer) => ({
		withTimer,
		answerTimer,
		questionTimer,
	}),
);

export const finalResult = createSelector(
	[totalAnsweredCountPM, totalQuestionsCountPM, resultPM],
	(totalAnsweredCount, totalQuestionsCount, result) => ({
		totalAnsweredCount,
		totalQuestionsCount,
		result,
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
