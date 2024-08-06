import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Step = 'START' | 'QUESTION' | 'END_OF_TOUR' | 'END';

export type ResultType = {
  [tourNumber: number]: { num: number; ans: boolean }[];
};

export interface PlayModeState {
  step: Step;
  currentQuestionIndex: number;
  result: ResultType;
  totalAnsweredCount: number;
  totalQuestionsCount: number;
}

interface setResultAction {
  isAnswered: boolean;
  qNumber: number;
  tourNumber: number;
}

const initialState: PlayModeState = {
  step: 'START',
  currentQuestionIndex: 0,
  result: {},
  totalAnsweredCount: 0,
  totalQuestionsCount: 0,
};

const playModeSlice = createSlice({
  name: 'playModeSlice',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },

    currentQuestionIndexIncrement(state) {
      state.currentQuestionIndex++;
    },

    setResult(state, action: PayloadAction<setResultAction>) {
      const { isAnswered, qNumber, tourNumber } = action.payload;
      const { result } = state;

      if (!(tourNumber in result) && tourNumber) {
        result[tourNumber] = [];
      }

      result[tourNumber].push({
        ans: isAnswered,
        num: qNumber,
      });

      state.totalQuestionsCount++;

      if (isAnswered) {
        state.totalAnsweredCount++;
      }
    },

    resetState: () => initialState,
  },
});

export const { reducer: playModeReducer, actions: playModeActions } =
  playModeSlice;
