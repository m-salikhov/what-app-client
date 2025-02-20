import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ResultElementClientType } from 'Shared/Schemas/ResultSchema';

export type Step = 'START' | 'QUESTION' | 'END_OF_TOUR' | 'END';

export interface PlayModeState {
  step: Step;
  currentQuestionIndex: number;
  currentTourNumber: number;
  result: ResultElementClientType[];
  totalAnsweredCount: number;
  totalQuestionsCount: number;
  selectedResultQuestion: number;
  withTimer: boolean;
  questionTimer: number;
  answerTimer: number;
}

const initialState: PlayModeState = {
  step: 'START',
  currentQuestionIndex: 0,
  currentTourNumber: 0,
  result: [],
  totalAnsweredCount: 0,
  totalQuestionsCount: 0,
  selectedResultQuestion: 0,
  withTimer: true,
  questionTimer: 15,
  answerTimer: 30,
};

interface setResultAction {
  isAnswered: boolean;
  qNumber: number;
  tourNumber: number;
}

const playModeSlice = createSlice({
  name: 'playModeSlice',
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

    setSelectedResultQuestion(state, action: PayloadAction<number>) {
      if (state.selectedResultQuestion !== action.payload) {
        state.selectedResultQuestion = action.payload;
      }
    },

    setWithTimer(state) {
      state.withTimer = !state.withTimer;
    },

    setQuestionTimer(state, action: PayloadAction<number>) {
      if (isNaN(action.payload)) {
        state.questionTimer = 15;
      } else state.questionTimer = action.payload;
    },

    setAnswerTimer(state, action: PayloadAction<number>) {
      if (isNaN(action.payload)) {
        state.answerTimer = 30;
      } else state.answerTimer = action.payload;
    },

    resetState: () => initialState,
  },
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
