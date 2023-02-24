import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { QuestionType } from "../../Types/question";

interface QuestionsInitialState {
  questions: QuestionType[];
  isSaved: boolean[];
  [key: number]: string;
}

const initialState: QuestionsInitialState = {
  questions: [],
  isSaved: [],
  // rawText: {},
};

export const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    setQuestion(
      state,
      action: PayloadAction<{ numberQuestion: number; q: QuestionType }>
    ) {
      const { numberQuestion, q } = action.payload;
      state.questions[numberQuestion - 1] = {
        ...state.questions[numberQuestion - 1],
        ...q,
      };
      state.isSaved[numberQuestion - 1] = true;
    },
    setInitQuestion(state, action: PayloadAction<QuestionType>) {
      const q = action.payload;
      state.questions[q.qNumber - 1] = q;
    },
    setQuestionField(
      state,
      action: PayloadAction<{
        numberQuestion: number;
        field: string;
        value: string;
      }>
    ) {
      const { numberQuestion, field, value } = action.payload;
      if (field === "add") {
        state.questions[numberQuestion - 1][field] = value;
      }
      if (field === "tourNumber") {
        state.questions[numberQuestion - 1][field] = +value;
      }
      if (field === "type") {
        state.questions[numberQuestion - 1][field] =
          value as QuestionType["type"];
      }
    },
    setRawText(
      state,
      action: PayloadAction<{ numberQuestion: number; text: string }>
    ) {
      const { numberQuestion, text } = action.payload;
      state[numberQuestion] = text;
      state.isSaved[numberQuestion - 1] = false;
    },
    setIsSaved(
      state,
      action: PayloadAction<{ numberQuestion: number; value: boolean }>
    ) {
      const { numberQuestion, value } = action.payload;
      state.isSaved[numberQuestion - 1] = value;
    },
    resetState: () => initialState,
  },
});

export default questionsSlice.reducer;
