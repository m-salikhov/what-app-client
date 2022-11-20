import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { initTournamentShort } from "../../Helpers/initValues";
import { TournamentShortType, TournamentType } from "../../Types/tournament";

interface TournamentState {
  tournamentShort: TournamentShortType;
  tournaments: TournamentType[];
  tournament?: TournamentType;
}

const initialState: TournamentState = {
  tournamentShort: initTournamentShort,
  tournament: undefined,
  tournaments: [],
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTournamentId(state, action: PayloadAction<TournamentShortType>) {
      state.tournamentShort = action.payload;
    },
  },
});

export default tournamentSlice.reducer;
