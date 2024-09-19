import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface LetterState {
  letterNumber: number;
  class: 'in-place' | 'out-of-place' | 'miss';
}

export interface WordleState {
  currentLetterNumber: number;
  currentRowNumber: number;
  letters: string[];
  allowNextLetter: boolean;
  words: string[];
  letterState: LetterState[];
}

const initialState: WordleState = {
  currentLetterNumber: 0,
  currentRowNumber: 0,
  letters: [],
  allowNextLetter: true,
  words: [],
  letterState: [],
};

const WordleSlice = createSlice({
  name: 'wordleSlice',
  initialState,

  reducers: {
    setLetters(state, action: PayloadAction<string>) {
      const letter = action.payload.toUpperCase();

      if (letter === 'DEL' || letter === 'BACKSPACE') {
        if (state.currentRowNumber === state.words.length) {
          return;
        } else if (
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
      } else return;

      if (!(state.currentLetterNumber % 5)) {
        state.allowNextLetter = false;
      }

      const r = Math.ceil(state.currentLetterNumber / 5);
      if (r !== state.currentRowNumber) state.currentRowNumber = r;
    },

    setAllowNextLetter(state, action: PayloadAction<boolean>) {
      state.allowNextLetter = action.payload;
    },

    setWords(state, action: PayloadAction<{ answer: string; word: string }>) {
      const { answer, word } = action.payload;

      const states: LetterState[] = [];

      for (let i = 0; i < 5; i++) {
        const elem = word[i];

        if (!answer.includes(elem)) {
          states.push({
            letterNumber: state.currentLetterNumber - 4 + i,
            class: 'miss',
          });
        } else if (elem === answer[i]) {
          states.push({
            letterNumber: state.currentLetterNumber - 4 + i,
            class: 'in-place',
          });
        } else {
          const regex = new RegExp(elem, 'g');

          const l1 = [...answer.matchAll(regex)].length;

          const wordEntry = [...word.matchAll(regex)];
          const l2 = wordEntry.length;

          if (l1 >= l2) {
            states.push({
              letterNumber: state.currentLetterNumber - 4 + i,
              class: 'out-of-place',
            });
          } else {
            let iWordEntry = wordEntry.findIndex((v) => v.index == i);

            if (iWordEntry < l1) {
              if (iWordEntry < wordEntry.length - 1) {
                let flag: boolean = false;
                for (let index = iWordEntry + 1; index < 5; index++) {
                  word[index] === elem && answer[index] === elem
                    ? (flag = true)
                    : null;
                }

                if (flag) {
                  states.push({
                    letterNumber: state.currentLetterNumber - 4 + i,
                    class: 'miss',
                  });
                } else {
                  states.push({
                    letterNumber: state.currentLetterNumber - 4 + i,
                    class: 'out-of-place',
                  });
                }
              }
            } else {
              states.push({
                letterNumber: state.currentLetterNumber - 4 + i,
                class: 'miss',
              });
            }
          }
        }
      }

      state.letterState.push(...states);

      state.words.push(word);
    },

    resetState: () => initialState,
  },
});

export const { reducer: wordleReducer, actions: wordleActions } = WordleSlice;
