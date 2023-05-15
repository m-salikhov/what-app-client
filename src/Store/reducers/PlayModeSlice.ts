import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initTournament } from "../../Helpers/initValues";
import { TournamentType } from "../../Types/tournament";
import { _axios } from "../../Helpers/_axios";

export type Step = "START" | "QUESTION" | "END_OF_TOUR" | "END";

export type ResultType = {
  [tourNumber: number]: { num: number; ans: boolean }[];
};

interface InitState {
  step: Step;
  t: TournamentType;
  qCounter: number;
  result: ResultType;
  answeredCount: number;
}

const initialState: InitState = {
  step: "START",
  t: initTournament,
  qCounter: 0,
  result: [],
  answeredCount: 0,
};

export const getTournamentById = createAsyncThunk(
  "t/fetchById",
  async (id: string) => {
    const t = await _axios
      .get<TournamentType>(`/tournaments/${id}`)
      .then((res) => res.data);
    return t;
  }
);

export const playModeSlice = createSlice({
  name: "playModeSlice",
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
    setResult(state, action: PayloadAction<boolean>) {
      const { tourNumber, qNumber } = state.t.questions[state.qCounter];
      let qNumberInTour = qNumber;

      if (typeof state.result[tourNumber] === "undefined") {
        state.result[tourNumber] = [];
      }

      //Высчитывает положение вопроса в отдельном туре(кроме первого тура)
      if (tourNumber > 1) {
        let i = tourNumber - 1;
        let sumPlayedQ = 0;
        while (i > 0) {
          sumPlayedQ = sumPlayedQ + state.result[i].length;
          i--;
        }
        qNumberInTour = qNumber - sumPlayedQ;
      }

      state.result[tourNumber][qNumberInTour - 1] = {
        ans: action.payload,
        num: qNumber,
      };

      if (action.payload) {
        state.answeredCount++;
      }
    },

    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder.addCase(getTournamentById.fulfilled, (state, action) => {
      state.t = action.payload;
    });
  },
});

export default playModeSlice.reducer;
