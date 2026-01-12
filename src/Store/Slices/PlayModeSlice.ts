import type { ResultElementClientType } from "Shared/Schemas/ResultSchema";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { QuestionType, TournamentType } from "Shared/Schemas/TournamentSchema";

export type Step = "START" | "QUESTION" | "END_OF_TOUR" | "END";

export interface PlayModeState {
	step: Step;
	// currentQuestionIndex: number;
	result: ResultElementClientType[];
	totalAnsweredCount: number;
	totalQuestionsCount: number;
	selectedResultQuestionNumber: number;

	// timer options
	withTimer: boolean;
	questionTime: number;
	answerTime: number;

	// new variant
	questions: QuestionType[];
	tournamentInfo: Omit<TournamentType, "questions">;
	tourEndQuestionIndexes: number[];
	currentQuestionIndex: number;
	tournamentEndQuestionIndex: number;
	currentTourNumber: number;
}
// seconds
const defaultQuestionTimer = 15;
const defaultAnswerTimer = 30;

const initialState: PlayModeState = {
	step: "START",
	result: [],
	totalAnsweredCount: 0,
	totalQuestionsCount: 0,
	selectedResultQuestionNumber: 0,

	// timer options
	withTimer: true,
	questionTime: defaultQuestionTimer,
	answerTime: defaultAnswerTimer,

	// new variant
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

		// new variant
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

		setStep(state) {
			const isEndOfTournament = state.currentQuestionIndex === state.tournamentEndQuestionIndex;
			const isEndOfTour = state.tourEndQuestionIndexes.includes(state.currentQuestionIndex);

			switch (state.step) {
				case "START":
					state.step = "QUESTION";
					state.currentQuestionIndex = 0;
					state.currentTourNumber = 1;
					break;
				case "QUESTION":
					if (!isEndOfTour && !isEndOfTournament) {
						state.currentQuestionIndex += 1;
					} else if (isEndOfTour) {
						state.step = "END_OF_TOUR";
					} else if (isEndOfTournament) {
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
	},
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
