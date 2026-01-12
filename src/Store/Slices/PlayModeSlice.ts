import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuestionType, TournamentType } from "Shared/Schemas/TournamentSchema";

export type Step = "START" | "QUESTION" | "END_OF_TOUR" | "END";

export interface PlayModeState {
	step: Step;
	result: ResultElementClientType[];
	selectedResultQuestionNumber: number;
	questions: QuestionType[];
	tournamentInfo: Omit<TournamentType, "questions">;
	tourEndQuestionIndexes: number[];
	currentQuestionIndex: number;
	tournamentEndQuestionIndex: number;
	currentTourNumber: number;

	// timer options
	withTimer: boolean;
	questionTime: number;
	answerTime: number;
}

// seconds
const defaultQuestionTime = 15;
const defaultAnswerTime = 30;

const initialState: PlayModeState = {
	step: "START",
	result: [],
	selectedResultQuestionNumber: 0,
	questions: [],
	tournamentInfo: {
		id: 0,
		uploaderUuid: "",
		uploader: "",
		title: "",
		link: "",
		date: "",
		tours: 0,
		questionsQuantity: 0,
		difficulty: 0,
		status: "draft",
		dateUpload: "",
		editors: [],
	},
	tourEndQuestionIndexes: [],
	currentQuestionIndex: -1,
	tournamentEndQuestionIndex: -1,
	currentTourNumber: 0,

	// timer options
	withTimer: true,
	questionTime: defaultQuestionTime,
	answerTime: defaultAnswerTime,
};

const playModeSlice = createSlice({
	name: "playModeSlice",
	initialState,
	reducers: {
		setTournament(state, action: PayloadAction<TournamentType>) {
			const { questions, ...tournamentInfo } = action.payload;

			state.tournamentInfo = tournamentInfo;
			state.questions = questions.filter((q) => q.type !== "outside");
			state.tournamentEndQuestionIndex = state.questions.length - 1;

			const tourEndQuestionIndexes: number[] = [];
			state.questions.forEach((q, i) => {
				const nextQuestionTourNumber = state.questions[i + 1]?.tourNumber;

				if (nextQuestionTourNumber && q.tourNumber !== nextQuestionTourNumber) {
					tourEndQuestionIndexes.push(i);
				}
			});

			state.tourEndQuestionIndexes = tourEndQuestionIndexes;
		},

		setResult(state, action: PayloadAction<boolean>) {
			state.result.push({
				ans: action.payload,
				num: state.questions[state.currentQuestionIndex].qNumber,
				tour: state.questions[state.currentQuestionIndex].tourNumber,
			});
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
			state.questionTime = Number.isNaN(action.payload) ? defaultQuestionTime : action.payload;
		},

		setAnswerTimer(state, action: PayloadAction<number>) {
			state.answerTime = Number.isNaN(action.payload) ? defaultAnswerTime : action.payload;
		},

		setStep(state) {
			const isLastQuestionInTour = state.tourEndQuestionIndexes.includes(
				state.currentQuestionIndex,
			);
			const isLastQuestionInTournament =
				state.currentQuestionIndex === state.tournamentEndQuestionIndex;

			switch (state.step) {
				case "START":
					state.step = "QUESTION";
					state.currentQuestionIndex = 0;
					state.currentTourNumber = 1;
					break;
				case "QUESTION":
					if (!isLastQuestionInTour && !isLastQuestionInTournament) {
						state.currentQuestionIndex += 1;
					} else if (isLastQuestionInTour) {
						state.step = "END_OF_TOUR";
					} else if (isLastQuestionInTournament) {
						state.step = "END";
					}
					break;
				case "END_OF_TOUR":
					state.step = "QUESTION";
					state.currentQuestionIndex += 1;
					state.currentTourNumber += 1;
					break;
				default:
					break;
			}
		},

		resetState: () => initialState,
	},
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
