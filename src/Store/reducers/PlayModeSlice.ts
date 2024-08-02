import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { initTournament } from '../../Helpers/initValues';
import { TournamentType } from '../../Types/tournament';
import { _axios } from '../../Helpers/_axios';

export type Step = 'START' | 'QUESTION' | 'END_OF_TOUR' | 'END';

export type ResultType = {
  [tourNumber: number]: { num: number; ans: boolean }[];
};

interface PlayModeState {
  step: Step;
  t: TournamentType;
  qCounter: number;
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
  t: initTournament,
  qCounter: 0,
  result: [],
  answeredCount: 0,
};

const playModeSlice = createSlice({
  name: 'playModeSlice',
  initialState,
  reducers: {
    setStep(state, action: PayloadAction<Step>) {
      state.step = action.payload;
    },
    setT(state, action: PayloadAction<TournamentType>) {
      state.t = action.payload;
    },
    qCounterIncrement(state) {
      state.qCounter++;
    },
    setResult(state, action: PayloadAction<setResultAction>) {
      const { isAnswered, qNumber, tourNumber } = action.payload;

      let qNumberInTour = qNumber;

      if (typeof state.result[tourNumber] === 'undefined') {
        state.result[tourNumber] = [];
      }

      //Высчитывает положение вопроса в отдельном туре(кроме первого тура)
      if (tourNumber > 1) {
        let i = tourNumber - 1;
        let sumPlayedQ = 0;
        while (i > 0) {
          sumPlayedQ += state.result[i].length;
          i--;
        }
        qNumberInTour = qNumber - sumPlayedQ;
      }

      state.result[tourNumber][qNumberInTour - 1] = {
        ans: isAnswered,
        num: qNumber,
      };

      if (isAnswered) {
        state.answeredCount++;
      }
    },

    resetState: () => initialState,
  },
});

export const { reducer: playModeReducer, actions: playModeActions } = playModeSlice;
