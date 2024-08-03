import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type Step = 'START' | 'QUESTION' | 'END_OF_TOUR' | 'END';

export type ResultType = {
  [tourNumber: number]: { num: number; ans: boolean }[];
};

interface PlayModeState {
  step: Step;
  currentQuestionIndex: number;
  result: ResultType;
  answeredCount: number;
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
  answeredCount: 0,
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

      console.log(action.payload);

      let qNumberInTour = qNumber;

      if (!(tourNumber in result) && tourNumber) {
        result[tourNumber] = [];
      }

      //Высчитывает положение вопроса в отдельном туре(кроме первого тура)
      // if (tourNumber > 1) {
      //   let i = tourNumber - 1;
      //   let sumPlayedQ = 0;
      //   while (i > 0) {
      //     sumPlayedQ += result[i].length;
      //     i--;
      //   }
      //   qNumberInTour = qNumber - sumPlayedQ;
      // }

      result[tourNumber].push({
        ans: isAnswered,
        num: qNumber,
      });

      if (isAnswered) {
        state.answeredCount++;
      }
    },

    resetState: () => initialState,
  },
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
