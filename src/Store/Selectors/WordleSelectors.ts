import { RootState } from 'Store/store';

export const allowNextLetterW = (state: RootState) => state.wordleReducer.allowNextLetter;
export const currentRowNumberW = (state: RootState) => state.wordleReducer.currentRowNumber;
export const currentLetterNumberW = (state: RootState) => state.wordleReducer.currentLetterNumber;
export const lettersW = (state: RootState) => state.wordleReducer.letters;
export const wrongWordFlagW = (state: RootState) => state.wordleReducer.wrongWordFlag;
export const resultW = (state: RootState) => state.wordleReducer.result;
export const wordsW = (state: RootState) => state.wordleReducer.words;
export const letterStateW = (state: RootState) => state.wordleReducer.letterState;

export const board = (state: RootState) => ({
  allowNextLetter: allowNextLetterW(state),
  currentLetterNumber: currentLetterNumberW(state),
  letters: lettersW(state),
  result: resultW(state),
  words: wordsW(state),
});