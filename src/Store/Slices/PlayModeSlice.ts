import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type Step = "START" | "QUESTION" | "END_OF_TOUR" | "END";

export interface PlayModeState {
	step: Step;
	currentQuestionIndex: number;
	currentTourNumber: number;
	result: ResultElementClientType[];
	totalAnsweredCount: number;
	totalQuestionsCount: number;
	selectedResultQuestionNumber: number;
	withTimer: boolean;
	questionTime: number;
	answerTime: number;
}
// seconds
const defaultQuestionTimer = 15;
const defaultAnswerTimer = 30;

const initialState: PlayModeState = {
	step: "START",
	currentQuestionIndex: 0,
	currentTourNumber: 0,
	result: [],
	totalAnsweredCount: 0,
	totalQuestionsCount: 0,
	selectedResultQuestionNumber: 0,
	withTimer: true,
	questionTime: defaultQuestionTimer,
	answerTime: defaultAnswerTimer,
};

interface setResultAction {
	isAnswered: boolean;
	qNumber: number;
	tourNumber: number;
}

const playModeSlice = createSlice({
	name: "playModeSlice",
	initialState,
	reducers: {
		setStep(state, action: PayloadAction<Step>) {
			state.step = action.payload;
		},

		setCurrentTourNumber(state, action: PayloadAction<number>) {
			state.currentTourNumber = action.payload;
		},

		currentQuestionIndexIncrement(state) {
			state.currentQuestionIndex++;
		},

		setResult(state, action: PayloadAction<setResultAction>) {
			const { isAnswered, qNumber, tourNumber } = action.payload;

			state.result.push({
				ans: isAnswered,
				num: qNumber,
				tour: tourNumber,
			});

			state.totalQuestionsCount++;

			if (isAnswered) {
				state.totalAnsweredCount++;
			}
		},

		setSelectedResultQuestionNumber(state, action: PayloadAction<number>) {
			if (state.selectedResultQuestionNumber !== action.payload) {
				state.selectedResultQuestionNumber = action.payload;
			}
		},

		setWithTimer(state) {
			state.withTimer = !state.withTimer;
		},

		setQuestionTimer(state, action: PayloadAction<number>) {
			state.questionTime = Number.isNaN(action.payload) ? defaultQuestionTimer : action.payload;
		},

		setAnswerTimer(state, action: PayloadAction<number>) {
			state.answerTime = Number.isNaN(action.payload) ? defaultAnswerTimer : action.payload;
		},

		resetState: () => initialState,
	},
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
