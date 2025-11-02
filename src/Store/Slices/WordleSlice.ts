import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

type ClassName = "in-place" | "out-of-place" | "miss";

export interface LetterState {
	className: ClassName;
	value: string;
}

export interface WordleState {
	currentLetterNumber: number;
	currentRowNumber: number;
	letters: string[];
	allowNextLetter: boolean;
	words: string[];
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
	words: [],
	letterState: [],
	wrongWordFlag: false,
	result: null,
	isGameOver: false,
};

function pushState(value: string, className: ClassName, states: LetterState[]) {
	states.push({ value, className });
}

const WordleSlice = createSlice({
	name: "wordleSlice",
	initialState,

	reducers: {
		setLetters(state, action: PayloadAction<string>) {
			const letter = action.payload.toUpperCase();

			if (letter === "DEL" || letter === "BACKSPACE") {
				if (state.currentRowNumber === state.words.length) {
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

		setWords(state, action: PayloadAction<{ answer: string; version: string }>) {
			const { answer, version } = action.payload;

			const states: LetterState[] = [];

			for (let i = 0; i < 5; i++) {
				const value = version[i];

				if (!answer.includes(value)) {
					pushState(value, "miss", states);
				} else if (value === answer[i]) {
					pushState(value, "in-place", states);
				} else {
					const regex = new RegExp(value, "g");
					const answerEntries = [...answer.matchAll(regex)].map((v) => v.index);
					const versionEntries = [...version.matchAll(regex)].map((v) => v.index);

					if (answerEntries.length >= versionEntries.length) {
						pushState(value, "out-of-place", states);
					} else if (versionEntries.indexOf(i) + 1 > answerEntries.length) {
						pushState(value, "miss", states);
					} else if (answerEntries.length === 1) {
						versionEntries.includes(answerEntries[0])
							? pushState(value, "miss", states)
							: pushState(value, "out-of-place", states);
					} else if (answerEntries.length === 2) {
						if (versionEntries.indexOf(i) === 0) {
							versionEntries.filter((v) => answerEntries.includes(v)).length === 2
								? pushState(value, "miss", states)
								: pushState(value, "out-of-place", states);
						} else if (versionEntries.indexOf(i) === 1) {
							answerEntries.includes(versionEntries[2])
								? pushState(value, "miss", states)
								: pushState(value, "out-of-place", states);
						}
					}
				}
			}

			state.letterState.push(...states);

			state.words.push(version);
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
