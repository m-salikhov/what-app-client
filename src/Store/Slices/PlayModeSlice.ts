import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Step = 'START' | 'QUESTION' | 'END_OF_TOUR' | 'END';

export type ResultType = {
  [tourNumber: number]: { num: number; ans: boolean }[];
};

export interface PlayModeState {
  step: Step;
  currentQuestionIndex: number;
  currentTourNumber: number;
  result: ResultType;
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
  result: {},
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

    setSelectedResultQuestion(state, action: PayloadAction<number>) {
      if (state.selectedResultQuestion !== action.payload) {
        state.selectedResultQuestion = action.payload;
      }
    },

    setWithTimer(state) {
      state.withTimer = !state.withTimer;
    },

    setQuestionTimer(state, action: PayloadAction<number>) {
      state.questionTimer = action.payload;
    },

    setAnswerTimer(state, action: PayloadAction<number>) {
      state.answerTimer = action.payload;
    },

    resetState: () => initialState,
  },
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
