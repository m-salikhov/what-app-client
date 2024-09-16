import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface WordleState {
  currentLetterNumber: number;
  currentRowNumber: number;
  letters: string[];
  allowNextLetter: boolean;
}

const initialState: WordleState = {
  currentLetterNumber: 0,
  currentRowNumber: 0,
  letters: [],
  allowNextLetter: true,
};

const WordleSlice = createSlice({
  name: 'wordleSlice',
  initialState,

  reducers: {
    setLetters(state, action: PayloadAction<string>) {
      const letter = action.payload.toUpperCase();

      if (letter === 'DEL' || letter === 'BACKSPACE') {
        if (
          state.letters.length &&
          Math.ceil(state.currentLetterNumber / 5) == state.currentRowNumber
        ) {
          state.letters.pop();
          state.allowNextLetter = true;
          state.currentLetterNumber--;
          return;
        } else return;
      }

      if (state.letters.length === 30) {
        return;
      }

      if (/^[А-ЯЁ]$/.test(letter)) {
        state.letters.push(letter);
        state.currentLetterNumber++;
      }

      if (!(state.currentLetterNumber % 5)) {
        state.allowNextLetter = false;
      }

      const r = Math.ceil(state.currentLetterNumber / 5);
      if (r !== state.currentRowNumber) state.currentRowNumber = r;
    },

    setAllowNextLetter(state, action: PayloadAction<boolean>) {
      state.allowNextLetter = action.payload;
    },

    resetState: () => initialState,
  },
});

export const { reducer: wordleReducer, actions: wordleActions } = WordleSlice;
