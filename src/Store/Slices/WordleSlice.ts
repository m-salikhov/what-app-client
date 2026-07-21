import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface LetterState {
	className: "in-place" | "out-of-place" | "miss";
	value: string;
}

export interface WordleState {
	currentLetterNumber: number;
	currentRowNumber: number;
	letters: string[];
	allowNextLetter: boolean;
	usedWords: string[];
	letterState: LetterState[];
	wrongWordFlag: boolean;
	result: "win" | "lose" | null;
	isGameOver: boolean;
}

const initialState: WordleState = {
	currentLetterNumber: 0,
	currentRowNumber: 0,
	letters: [],
	allowNextLetter: true,
	usedWords: [],
	letterState: [],
	wrongWordFlag: false,
	result: null,
	isGameOver: false,
};

const WordleSlice = createSlice({
	name: "wordleSlice",
	initialState,

	reducers: {
		setLetters(state, action: PayloadAction<string>) {
			const letter = action.payload.toUpperCase();

			if (letter === "DEL" || letter === "BACKSPACE") {
				if (state.currentRowNumber === state.usedWords.length) {
					return;
				} else if (
					state.letters.length > 0 &&
					Math.ceil(state.currentLetterNumber / 5) === state.currentRowNumber
				) {
					state.letters.pop();
					state.allowNextLetter = true;
					state.currentLetterNumber--;
					return;
				} else return;
			}

			if (state.letters.length === 30 || state.result !== null) {
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

		setLettersStates(state, action: PayloadAction<{ answer: string; version: string }>) {
			const { answer, version } = action.payload;

			const states: LetterState[] = Array(version.length);

			const hash = new Map<string, number>();
			for (const l of answer) hash.set(l, (hash.get(l) ?? 0) + 1);

			for (let i = 0; i < version.length; i++) {
				const letter = version[i];

				if (!hash.has(letter)) states[i] = { value: letter, className: "miss" };

				if (version[i] === answer[i]) {
					states[i] = { value: letter, className: "in-place" };
					hash.set(letter, (hash.get(letter) ?? 0) - 1);
				}
			}

			for (let i = 0; i < version.length; i++) {
				const letter = version[i];

				if (hash.has(letter) && letter !== answer[i]) {
					const count = hash.get(letter) ?? 0;

					if (count > 0) {
						states[i] = { value: letter, className: "out-of-place" };
						hash.set(letter, (hash.get(letter) ?? 0) - 1);
					} else states[i] = { value: letter, className: "miss" };
				}
			}

			state.letterState.push(...states);

			state.usedWords.push(version);
		},

		setWrongWordFlag(state, action: PayloadAction<boolean>) {
			state.wrongWordFlag = action.payload;
		},

		setResult(state, action: PayloadAction<"win" | "lose">) {
			state.allowNextLetter = false;
			state.result = action.payload;
		},

		setIsGameOver(state, action: PayloadAction<boolean>) {
			state.isGameOver = action.payload;
		},

		resetState: () => initialState,
	},
});

export const { reducer: wordleReducer, actions: wordleActions } = WordleSlice;
