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
  selectedResultQuestionNumber: number;
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
  selectedResultQuestionNumber: 0,
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

    setSelectedResultQuestionNumber(state, action: PayloadAction<number>) {
      if (state.selectedResultQuestionNumber !== action.payload) {
        state.selectedResultQuestionNumber = action.payload;
      }
    },

    setWithTimer(state) {
      state.withTimer = !state.withTimer;
    },

    setQuestionTimer(state, action: PayloadAction<number>) {
      state.questionTimer = isNaN(action.payload) ? 15 : action.payload;
    },

    setAnswerTimer(state, action: PayloadAction<number>) {
      state.answerTimer = isNaN(action.payload) ? 30 : action.payload;
    },

    resetState: () => initialState,
  },
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
