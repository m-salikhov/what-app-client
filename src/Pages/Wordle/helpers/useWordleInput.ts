import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import { boardSelector } from "Store/Selectors/WordleSelectors";
import { wordleActions } from "Store/Slices/WordleSlice";
import { useGetRandomWordQuery, useVerifyWordInDBMutation } from "Store/ToolkitAPIs/wordleAPI";
import { getWordToCheck } from "./getWordToCheck";

function normalizeInput(str: string) {
	if (str === "del") return "Backspace";
	if (str === "⏎") return "Enter";
	return str;
}

export function useWordleInput() {
	const dispatch = useAppDispatch();

	const { letters, allowNextLetter, currentLetterNumber, words, result } =
		useAppSelector(boardSelector);
	const { data: answer } = useGetRandomWordQuery(undefined);
	const [verifyWordInDB] = useVerifyWordInDBMutation();

	async function handleInput(str: string) {
		const normalizedInput = normalizeInput(str);

		if (result || !answer) {
			return;
		}

		switch (normalizedInput) {
			case "Backspace":
				dispatch(wordleActions.setLetters(normalizedInput));
				break;

			case "Enter": {
				if (allowNextLetter) return;

				const word = getWordToCheck(letters, currentLetterNumber);

				if (!word || words.includes(word)) {
					return;
				}

				if (word === answer.word) {
					dispatch(
						wordleActions.setWords({
							answer: answer.word,
							version: word,
						}),
					);
					dispatch(wordleActions.setResult("win"));
					dispatch(wordleActions.setIsGameOver(true));
					return;
				}

				try {
					const data = await verifyWordInDB(word).unwrap();

					if (data.isExist && currentLetterNumber === 30) {
						dispatch(wordleActions.setResult("lose"));
						dispatch(wordleActions.setIsGameOver(true));
					} else if (data.isExist) {
						dispatch(wordleActions.setAllowNextLetter(true));
						dispatch(
							wordleActions.setWords({
								answer: answer.word,
								version: data.word,
							}),
						);
					} else {
						dispatch(wordleActions.setWrongWordFlag(true));
						setTimeout(() => {
							dispatch(wordleActions.setWrongWordFlag(false));
						}, 500);
					}
				} catch (err) {
					console.log(err);
				}

				break;
			}

			default:
				if (!allowNextLetter) return;
				dispatch(wordleActions.setLetters(normalizedInput));
		}
	}

	return { handleInput };
}
