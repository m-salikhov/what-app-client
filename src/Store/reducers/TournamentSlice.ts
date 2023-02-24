import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../../Types/question";
import { TournamentType } from "../../Types/tournament";

const initialState = {
  title: "",
  date: 0,
  tours: 0,
  questionsQuantity: 0,
  editors: [""],
  editorsString: "",
};

type State = keyof typeof initialState;

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
