import { createSelector } from 'reselect';
import { RootState } from 'Store/store';

export const allowNextLetterSelector = (state: RootState) => state.wordleReducer.allowNextLetter;
export const currentRowNumberSelector = (state: RootState) => state.wordleReducer.currentRowNumber;
export const currentLetterNumberSelector = (state: RootState) => state.wordleReducer.currentLetterNumber;
export const lettersSelector = (state: RootState) => state.wordleReducer.letters;
export const wrongWordFlagSelector = (state: RootState) => state.wordleReducer.wrongWordFlag;
export const resultSelector = (state: RootState) => state.wordleReducer.result;
export const wordsSelector = (state: RootState) => state.wordleReducer.words;
export const letterStateSelector = (state: RootState) => state.wordleReducer.letterState;

export const boardSelector = createSelector(
  [allowNextLetterSelector, currentLetterNumberSelector, lettersSelector, resultSelector, wordsSelector],
  (allowNextLetter, currentLetterNumber, letters, result, words) => ({
    allowNextLetter,
    currentLetterNumber,
    letters,
    result,
    words,
  })
);
