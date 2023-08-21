import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface TournamentState {
  id: number;
  title: string;
  date: number;
  tours: number;
  questionsQuantity: number;
  editors: string[];
  editorsString: string;
  link: string;
}

const initialState: TournamentState = {
  id: 0,
  title: "",
  date: 0,
  tours: 0,
  questionsQuantity: 0,
  editors: [""],
  editorsString: "",
  link: "",
};

export const tournamentSlice = createSlice({
  name: "tournament",
  initialState,
  reducers: {
    setTitle(state, action: PayloadAction<string>) {
      state.title = action.payload;
    },
    setNumberField(
      state,
      action: PayloadAction<{
        field: "date" | "tours" | "questionsQuantity";
        value: number;
      }>
    ) {
      state[action.payload.field] = action.payload.value;
    },
    // setQuestion(state, action: PayloadAction<QuestionType>) {
    //   state.questions = [...state.questions, action.payload];
    // },
    setEditors(state, action: PayloadAction<string>) {
      state.editorsString = action.payload;
      let arr = action.payload.split(",");
      let arrRes = arr.map((s) => s.trim());
      state.editors = arrRes;
    },
    resetState: () => initialState,
  },
});

export default tournamentSlice.reducer;
