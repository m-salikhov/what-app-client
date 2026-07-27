import { useAppDispatch, useAppSelector } from "Shared/Hooks/redux";
import { boardSelector } from "Store/Selectors/WordleSelectors";
import { wordleActions } from "Store/Slices/WordleSlice";
import { useGetRandomWordQuery, useVerifyWordInDBMutation } from "Store/ToolkitAPIs/wordleAPI";
import { getWordToCheck } from "./getWordToCheck";
import { useCallback, useEffect, useRef } from "react";

function normalizeInput(str: string) {
	if (str === "del") return "Backspace";
	if (str === "⏎") return "Enter";
	return str;
}

export function useWordleInput() {
	const dispatch = useAppDispatch();

	const { letters, allowNextLetter, currentLetterNumber, words, result } =
		useAppSelector(boardSelector);
	const { data } = useGetRandomWordQuery(undefined);
	const answer = data?.word;
	const [verifyWordInDB] = useVerifyWordInDBMutation();

	const inputLockedRef = useRef(false);
	const timeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => {
		return () => {
			if (timeoutRef.current !== null) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const handleInput = useCallback(
		async (str: string) => {
			if (inputLockedRef.current) return;

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

					const version = getWordToCheck(letters, currentLetterNumber);

					if (!version || words.includes(version)) {
						return;
					}

					if (version === answer) {
						dispatch(
							wordleActions.setLettersStates({
								answer,
								version,
							}),
						);
						dispatch(wordleActions.setResult("win"));
						return;
					}

					try {
						const { isExist, word } = await verifyWordInDB(version).unwrap();

						if (!isExist) {
							inputLockedRef.current = true;
							dispatch(wordleActions.setWrongWordFlag(true));
							timeoutRef.current = setTimeout(() => {
								dispatch(wordleActions.setWrongWordFlag(false));
								inputLockedRef.current = false;
							}, 500);
							return;
						}

						if (currentLetterNumber === 30) {
							dispatch(wordleActions.setResult("lose"));
						} else {
							dispatch(wordleActions.setAllowNextLetter(true));
							dispatch(
								wordleActions.setLettersStates({
									answer: answer,
									version: word,
								}),
							);
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
		},
		[
			letters,
			allowNextLetter,
			currentLetterNumber,
			words,
			result,
			answer,
			verifyWordInDB,
			dispatch,
		],
	);

	return { handleInput };
}
